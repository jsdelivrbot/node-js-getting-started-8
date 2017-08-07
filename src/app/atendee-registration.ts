import { ReplyKeyboardMarkup } from "../bot/ReplyKeyboardMarkup";

namespace reply_markups {

    export namespace StudentRegistration {

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