import { InlineKeyboardButton } from '../../bot/InlineKeyboardButton';
import { Message } from "../../bot/Message";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { bot } from '../../initBot';
import * as Data from '../../data';
import * as Core from '../../core';

import { Chat as ChatModel } from "../../core/contracts";
import { Status, Commands } from "../../core";

export namespace Student {

    export enum Options {
        Asistencia = '📝 Ingresar mi asistencia',
        MisDatos = '⚙️ Mis Datos',
        Volver = 'Volver'
    }

    export const sendMessage = (msg: Message) => {
        Data.Chats.saveState(msg, Core.Constants.Chat.Status.StudentRegistration.Student).then(() => {
            const messageOptions = {
                parse_mode: 'HTML',
                reply_markup: {
                    resize_keyboard: true,
                    one_time_keyboard: true,
                    keyboard: [
                        //[{ text: Options.Asistencia }],
                        [{ text: Options.MisDatos }],
                        [{ text: Options.Volver }]
                    ],
                } as ReplyKeyboardMarkup
            } as SendMessageOptions;

            bot.sendMessage(
                msg.chat.id,
                `¿Que quieres hacer?`,
                messageOptions
            );
        });
    };
}
