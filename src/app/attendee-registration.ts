import { bot } from '../initBot';

import * as Data from '../data';

import { SendMessageOptions } from "../bot/SendMessageOptions";
import { Message } from "../bot/Message";
import { InlineKeyboardMarkup } from "../bot/InlineKeyboardMarkup";
import { InlineKeyboardButton } from "../bot/InlineKeyboardButton";

import * as Core from '../core';
import { University } from "../core/contracts";
import {
    attendee_location
} from './attendee-location';

export namespace attendee_registration {

    export namespace messages {

        const messageOptions = {
            parse_mode: 'HTML'
        } as SendMessageOptions;

        export const sendAttendeeMessage = (msg: Message) => {

            Data.Universities.getAllUniversities().then((universitiesList: Array<University>) => {

                if (!universitiesList ||
                    universitiesList.length == 0) {
                    return;
                }

                bot.sendMessage(
                    msg.chat.id,
                    `Selecciona la asignatura que deseas registrar.`,
                    messageOptions
                );

                attendee_location.messages.sendAttendeeLocationMessage(msg);
            });
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

attendee_registration.eventHandlers.listen();