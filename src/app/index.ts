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

namespace reply_markups {

    export namespace index {

        const keyBoardOptions = {
            Estudiante: 'Estudiante',
            Profesor: 'Profesor',
        };

        export const reply_markup = {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: [
                [keyBoardOptions.Estudiante, keyBoardOptions.Profesor]
            ],
        } as ReplyKeyboardMarkup;
    }
}

bot.onText(/^\/start$/, (msg: Message, match: any) => {

    let messageOptions = {
        parse_mode: 'HTML',
        reply_markup: reply_markups.index.reply_markup
    } as SendMessageOptions;

    let chat: ChatModel | null = Data.Chats.getById('ad');

    bot.sendMessage(
        msg.chat.id,
        `Hola <b>${msg.from.first_name}</b>, escoje tu categoria`,
        messageOptions
    );
});