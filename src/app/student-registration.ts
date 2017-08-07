import { ReplyKeyboardMarkup } from "../bot/ReplyKeyboardMarkup";

namespace reply_markups {

    export namespace StudentRegistration {

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