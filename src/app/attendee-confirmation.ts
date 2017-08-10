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
import { StudentRegistration } from "./student-registration";

export namespace attendee_confirmation {

    export namespace messages {

        const messageOptions = {
            parse_mode: 'HTML'
        } as SendMessageOptions;

        export const sendAttendeeConfirmationMessage = (msg: Message) => {

            bot.sendMessage(
                msg.chat.id,
                `He registrado tu asistencia satisfactoriamente.`,
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
            });
        }
    }
}

attendee_confirmation.eventHandlers.listen();