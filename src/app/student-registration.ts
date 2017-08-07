import { bot } from '../initBot';

import { Chat } from "../bot/Chat";
import { Chat as ChatModel } from '../core/contracts';
import { Message } from "../bot/Message";
import { SendMessageOptions } from "../bot/SendMessageOptions";
import { KeyboardButton } from "../bot/KeyboardButton";
import { ReplyKeyboardMarkup } from "../bot/ReplyKeyboardMarkup";

import { index } from './index';
import { attendee_registration } from './attendee-registration';

import * as Data from '../data';

export namespace studentRegistration {

    export namespace reply_markups {

        export const misDatosBtn: KeyboardButton = {
            text: 'Mis datos'
        };

        export const asistenciaBtn: KeyboardButton = {
            text: 'Registrar asistencia'
        };

        export const volverBtn: KeyboardButton = {
            text: 'Volver'
        };

        const keyboard: Array<Array<KeyboardButton>> = [
            [misDatosBtn],
            [asistenciaBtn],
            [volverBtn]
        ];

        export const student_markups = {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: keyboard,
        } as ReplyKeyboardMarkup;
    }

    export namespace messages {

        const messageOptions = {
            parse_mode: 'HTML',
            reply_markup: reply_markups.student_markups
        } as SendMessageOptions;

        export const sendStudentMessage = (msg: Message) => {
            bot.sendMessage(
                msg.chat.id,
                `¿Que quieres hacer?`,
                messageOptions
            );
        };
    }

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('message', (msg: Message) => {

                if (!msg.text) {
                    return;
                }

                if (msg.text.indexOf(reply_markups.misDatosBtn.text) === 0) {
                    console.log("mis datos btn")
                } else if (msg.text.indexOf(reply_markups.asistenciaBtn.text) === 0) {
                    attendee_registration.messages.sendAttendeeMessage(msg);
                } if (msg.text.indexOf(reply_markups.volverBtn.text) === 0) {
                    index.messages.sendStartMessage(msg);
                }
            });
        }
    }
}

studentRegistration.eventHandlers.listen();