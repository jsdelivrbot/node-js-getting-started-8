import { InlineKeyboardButton } from '../../bot/InlineKeyboardButton';
import { Message } from "../../bot/Message";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { bot } from '../../initBot';
import * as Data from '../../data';
import * as Core from '../../core';
import { University } from "../../core/contracts";
import { InlineKeyboardMarkup } from "../../bot/InlineKeyboardMarkup";

export namespace AttendanceConfirmation {

    export const sendMessage = (msg: Message) => {

        const messageOptions = {
            parse_mode: 'HTML'
        } as SendMessageOptions;

        bot.sendMessage(
            msg.chat.id,
            `He registrado tu asistencia satisfactoriamente.`,
            messageOptions
        );
    };
}