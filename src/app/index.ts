import {
    bot,
    dataBase
} from '../initBot';

import * as Data from '../data';

import { Message } from "../bot/Message";
import { ReplyKeyboardMarkup } from "../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../bot/SendMessageOptions";
import { Chat } from "../bot/Chat";
import { Chat as ChatModel } from '../core/contracts';
import { KeyboardButton } from "../bot/KeyboardButton";

import { Messages as StudentMessages } from './student-registration';

export namespace ReplyMarkups {

    export namespace Index {

        export const EstudianteBtn: KeyboardButton = {
            text: 'Estudiante'
        };

        export const ProfesorBtn: KeyboardButton = {
            text: 'Profesor'
        };

        export const keyboard: Array<Array<KeyboardButton>> = [
            [EstudianteBtn],
            [ProfesorBtn]
        ];

        export const start_markup = {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: keyboard,
        } as ReplyKeyboardMarkup;
    }
}

export namespace Messages {

    export namespace Index {

        const messageOptions = {
            parse_mode: 'HTML',
            reply_markup: ReplyMarkups.Index.start_markup
        } as SendMessageOptions;

        export const sendStartMessage = (msg: Message) => {
            bot.sendMessage(
                msg.chat.id,
                `Hola <b>${msg.from.first_name}</b>, escoja su perfil`,
                messageOptions
            );
        };
    }
}

bot.onText(/^\/start$/, (msg: Message, match: any) => {
    let chat: ChatModel | null = Data.Chats.getById('ad');
    Messages.Index.sendStartMessage(msg);
});

bot.on('message', (msg: Message) => {

    if (!msg.text) {
        return;
    }

    if (msg.text.indexOf(ReplyMarkups.Index.EstudianteBtn.text) === 0) {
        StudentMessages.StudentRegistration.sendStudentMessage(msg)
    } if (msg.text.indexOf(ReplyMarkups.Index.ProfesorBtn.text) === 0) {
        console.log("Profesor profile")
    }
});