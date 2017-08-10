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
import { Chat as ChatModel } from "../../core/contracts";

import { Student } from "./student";

export namespace MisDatos {

    export enum Options {
        ActualizarMiCodigo = '🗝 Actualizar mi código',
        ActualizarMiEmail = '📨 Actualizar mi correo',
        Volver = 'Volver'
    }

    export const sendMessage = (msg: Message) => {
        Data.Chats.saveState(msg, Status.StudentRegistration.MisDatos).then(() => {
            const messageOptions = {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: Options.ActualizarMiEmail,
                                callback_data: Options.ActualizarMiEmail
                            }
                        ],
                        [
                            {
                                text: Options.ActualizarMiCodigo,
                                callback_data: Options.ActualizarMiCodigo
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
                    Data.Chats.saveCommand(msg.message, Commands.StudentRegistration.MisDatos.ActualizarMiCodigo).then(() => {
                        bot.sendMessage(msg.message.chat.id, 'Ingresa tu código');
                    });
                }

                if (msg.data.indexOf(Options.ActualizarMiEmail) === 0) {
                    Data.Chats.saveCommand(msg.message, Commands.StudentRegistration.MisDatos.ActualizarMiEmail).then(() => {
                        bot.sendMessage(msg.message.chat.id, 'Ingresa tu correo');
                    });
                }

                if (msg.data.indexOf(Options.Volver) === 0) {
                    Data.Chats.saveCommand(msg.message, Commands.StudentRegistration.Student.MostrarMenu).then(() => {
                        Student.sendMessage(msg.message);
                    });
                }
            });

            bot.on('message', (msg: Message) => {

                if (!msg.text) {
                    return;
                }

                Data.Chats.getChat(msg).then((chat: ChatModel) => {

                    if (chat.state == Status.StudentRegistration.MisDatos
                        && chat.command == Commands.StudentRegistration.MisDatos.ActualizarMiCodigo) {
                        Data.Students.saveStudentCode(msg, msg.text).then(() => {
                            bot.sendMessage(msg.chat.id, "He actualizado tu código satisfactoriamente");
                        });
                    }

                    if (chat.state == Status.StudentRegistration.MisDatos
                        && chat.command == Commands.StudentRegistration.MisDatos.ActualizarMiEmail) {
                        Data.Students.saveStudentEmail(msg, msg.text).then(() => {
                            bot.sendMessage(msg.chat.id, "He actualizado tu correo satisfactoriamente");
                        });
                    }

                });
            });
        }
    }
}

MisDatos.eventHandlers.listen();