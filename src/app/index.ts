import {
    ReplyKeyboardMarkup
} from '../bot/contracts';

import {
    bot,
    dataBase
} from '../index';
import { Message } from "../bot/Message";

namespace reply_markups {

    export namespace index {

        export const keyBoardOptions = {
            Estudiante: 'Estudiante',
            Profesor: 'Profesor',
        };

        const reply_markup = {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: [
                [keyBoardOptions.Estudiante, keyBoardOptions.Profesor]
            ],
        } as ReplyKeyboardMarkup;
    }
}

bot.on("asdf", (msg:Message)=>{
    
});