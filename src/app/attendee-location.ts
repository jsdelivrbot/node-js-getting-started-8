import { bot } from '../initBot';

import * as Data from '../data';

import { SendMessageOptions } from "../bot/SendMessageOptions";
import { Message } from "../bot/Message";
import { InlineKeyboardMarkup } from "../bot/InlineKeyboardMarkup";
import { InlineKeyboardButton } from "../bot/InlineKeyboardButton";

import * as Core from '../core';
import { University } from "../core/contracts";
import { KeyboardButton } from "../bot/KeyboardButton";
import { ReplyKeyboardMarkup } from "../bot/ReplyKeyboardMarkup";
import { studentRegistration } from "./student-registration";
import { attendee_confirmation } from "./attendee-confirmation";

export namespace attendee_location {

    export namespace reply_markups {

        export const confirmarAsistenciaBtn: KeyboardButton = {
            text: 'Confirmar asistencia',
            request_location: true
        };

        export const volverBtn: KeyboardButton = {
            text: 'Volver'
        };

        const keyboard: Array<Array<KeyboardButton>> = [
            [confirmarAsistenciaBtn, volverBtn]
        ];

        export const start_markup = {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: keyboard,
        } as ReplyKeyboardMarkup;
    }

    export namespace messages {

        const messageOptions = {
            parse_mode: 'HTML',
            reply_markup: reply_markups.start_markup
        } as SendMessageOptions;

        export const sendAttendeeLocationMessage = (msg: Message) => {

            bot.sendMessage(
                msg.chat.id,
                `Ahora confirma tu asistencia.`,
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

                if (msg.text.indexOf(reply_markups.volverBtn.text) === 0) {
                    studentRegistration.messages.sendStudentMessage(msg);
                }
            });

            bot.on('location', (msg: Message) => {

                console.log('location received');
                console.log(JSON.stringify(msg));

                attendee_confirmation.messages.sendAttendeeConfirmationMessage(msg);
            });
        }
    }
}

attendee_location.eventHandlers.listen();