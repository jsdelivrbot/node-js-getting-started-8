/**
 * @author Jose Ubaldo Carvajal <joseucarvajal@gmail.com>
 * @author Luis Felipe Mejia Castrillon <luisfe_617@outlook.com>
 * See {@link https://core.telegram.org/bots/api#replykeyboardmarkup}
 */

import { KeyboardButton } from "./KeyboardButton";

export interface ReplyKeyboardMarkup {
    keyboard: Array<Array<any>>
    resize_keyboard: boolean;
    one_time_keyboard: boolean;
}