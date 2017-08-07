import { bot } from '../initBot';

import * as Data from '../data';

import { SendMessageOptions } from "../bot/SendMessageOptions";
import { Message } from "../bot/Message";
import { InlineKeyboardMarkup } from "../bot/InlineKeyboardMarkup";
import { InlineKeyboardButton } from "../bot/InlineKeyboardButton";

import * as Core from '../core';
import { University } from "../core/contracts";

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
            });
        };

        export const sendConfirmAttendeeMessage = (msg: Message) => {
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
            });

            bot.on('callback_query', (msg: Message) => {
                console.log('Callback recieved');
                console.log(JSON.stringify(msg));
                console.log(JSON.stringify(msg));
            });
        }
    }
}

attendee_registration.eventHandlers.listen();