import { Message } from "../../bot/Message";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { bot } from '../../initBot';
import * as Data from '../../data';
import {
    Status,
    Commands
} from '../../core';
import { ApiMessage } from "../../api/ApiMessage";
import { Chat as ChatModel, Student as StudentModel } from "../../core/contracts";

import { Student } from "./student";

export namespace MisDatos {

    export enum Options {
        ActualizarMiCodigo = '🗝 Actualizar mi código',
        ActualizarMiEmail = '📨 Actualizar mi email',
        Volver = 'Volver'
    }

    export const sendMessage = (msg: Message) => {
        Data.Chats.saveState(msg, Status.StudentRegistration.MisDatos).then(() => {
            const messageOptions = {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: Options.ActualizarMiCodigo,
                                callback_data: Options.ActualizarMiCodigo
                            }
                        ],
                        [
                            {
                                text: Options.ActualizarMiEmail,
                                callback_data: Options.ActualizarMiEmail
                            }
                        ],
                        [
                            {
                                text: Options.Volver,
                                callback_data: Options.Volver,
                            }
                        ]
                    ],
                } as ReplyKeyboardMarkup
            } as SendMessageOptions;

            Data.Students.saveStudentName(msg).then(() => {
                bot.sendMessage(
                    msg.chat.id,
                    `¿Qué dato deseas actualizar?`,
                    messageOptions
                );
            });
        });
    };

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('callback_query', (msg: ApiMessage) => {

                if (!msg.data) {
                    return;
                }

                if (msg.data.indexOf(Options.ActualizarMiCodigo) === 0) {
                    onActualizarMiCodigo(msg);
                }
                else if (msg.data.indexOf(Options.ActualizarMiEmail) === 0) {
                    onActualizarMiEmail(msg);
                }
                else if (msg.data.indexOf(Options.Volver) === 0) {
                    onVolver(msg);
                }
            });

            bot.on('message', (msg: Message) => {

                if (!msg.text) {
                    return;
                }

                Data.Chats.getChat(msg).then((chat: ChatModel) => {
                    if (chat.state == Status.StudentRegistration.MisDatos
                        && chat.command == Commands.StudentRegistration.MisDatos.ActualizarMiCodigo) {
                        actualizarMiCodigo(msg);
                    }
                    else if (chat.state == Status.StudentRegistration.MisDatos
                        && chat.command == Commands.StudentRegistration.MisDatos.ActualizarMiEmail) {
                        actualizarMiEmail(msg);
                    }
                });
            });
        }

        const onActualizarMiCodigo = (msg: ApiMessage) => {
            Data.Chats.saveCommand(msg.message, Commands.StudentRegistration.MisDatos.ActualizarMiCodigo).then(() => {
                bot.sendMessage(msg.message.chat.id, 'Ingresa tu código');
            });
        }

        const onActualizarMiEmail = (msg: ApiMessage) => {
            Data.Chats.saveCommand(msg.message, Commands.StudentRegistration.MisDatos.ActualizarMiEmail).then(() => {
                bot.sendMessage(msg.message.chat.id, 'Ingresa tu email');
            });
        }

        const onVolver = (msg: ApiMessage) => {
            Data.Students.getStudentByChatId(msg.message).then(
                (student: StudentModel) => {
                    Student.sendMessage({
                        chat: {
                            id: msg.message.chat.id
                        },
                        from: {
                            first_name: student.nombre
                        }
                    } as Message);
                }
            );
        }

        const actualizarMiCodigo = (msg: Message) => {
            Data.Students.saveStudentCode(msg, msg.text).then(() => {
                bot.sendMessage(msg.chat.id, "Has actualizado tu código satisfactoriamente");
            });
        }
        
        const actualizarMiEmail = (msg: Message) => {
            Data.Students.saveStudentEmail(msg, msg.text).then(() => {
                bot.sendMessage(msg.chat.id, "Has actualizado tu email satisfactoriamente");
            });
        }
    }
}

MisDatos.eventHandlers.listen();