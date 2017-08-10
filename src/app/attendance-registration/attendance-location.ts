import { InlineKeyboardButton } from '../../bot/InlineKeyboardButton';
import { Message } from "../../bot/Message";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { bot } from '../../initBot';
import * as Data from '../../data';
import * as Core from '../../core';
import { University } from "../../core/contracts";
import { InlineKeyboardMarkup } from "../../bot/InlineKeyboardMarkup";

export namespace AttendanceLocation {

    export enum Options {
        ConfirmarAsistencia = '✅ Confirmar mi asistencia',
        Volver = 'Volver'
    }

    export const sendMessage = (msg: Message) => {

        const messageOptions = {
            parse_mode: 'HTML',
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: [
                    [{
                        text: Options.ConfirmarAsistencia,
                        request_location: true
                    }],
                    [{ text: Options.Volver }]
                ]
            }
        } as SendMessageOptions;

        bot.sendMessage(
            msg.chat.id,
            `Ahora confirma tu asistencia.`,
            messageOptions
        );
    };
}