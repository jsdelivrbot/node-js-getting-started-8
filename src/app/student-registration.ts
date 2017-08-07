import {
    bot,
    dataBase
} from '../initBot';

import { Chat } from "../bot/Chat";
import { Chat as ChatModel } from '../core/contracts';
import { Message } from "../bot/Message";
import { SendMessageOptions } from "../bot/SendMessageOptions";
import { KeyboardButton } from "../bot/KeyboardButton";
import { ReplyKeyboardMarkup } from "../bot/ReplyKeyboardMarkup";

import * as Data from '../data';

export namespace ReplyMarkups {

    export namespace StudentRegistration {

        export const MisDatos: KeyboardButton = {
            text: 'Mis datos'
        };

        export const Asistencia: KeyboardButton = {
            text: 'Registrar asistencia'
        };

        export const Volver: KeyboardButton = {
            text: 'Volver'
        };

        const keyboard: Array<Array<KeyboardButton>> = [
            [MisDatos],
            [Asistencia],
            [Volver]
        ];

        export const student_markups = {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: keyboard,
        } as ReplyKeyboardMarkup;
    }
}

export namespace Messages {

    export namespace StudentRegistration {

        const messageOptions = {
            parse_mode: 'HTML',
            reply_markup: ReplyMarkups.StudentRegistration.student_markups
        } as SendMessageOptions;

        export const sendStudentMessage = (msg: Message) => {
            bot.sendMessage(
                msg.chat.id,
                `Hola <b>${msg.from.first_name}</b>, escoja su perfil`,
                messageOptions
            );
        };
    }
}