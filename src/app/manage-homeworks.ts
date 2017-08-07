import { bot } from '../initBot'
import * as Data from '../data';

import { Message } from "../bot/Message";
import { Chat as ChatModel } from '../core/contracts';

import { ReplyKeyboardMarkup } from "../bot/ReplyKeyboardMarkup";

import {
    index
} from './index';

export namespace manageHomeworks {

    namespace reply_markups {

    }

    export namespace eventHandlers {

        export const listen = () => {
            bot.on('message', (msg: Message) => {

                if (!msg.text) {
                    return;
                }

                if (msg.text.indexOf(index.reply_markups.ProfesorBtn.text) === 0) {
                    console.log("Profesor profile manage-homeworks")
                }
            });
        }
    }
}

manageHomeworks.eventHandlers.listen();