import { InlineKeyboardMarkup } from "./InlineKeyboardMarkup";
import { ReplyKeyboardMarkup } from "./ReplyKeyboardMarkup";

export interface SendMessageOptions {
    reply_markup: ReplyKeyboardMarkup | InlineKeyboardMarkup;
    parse_mode:string;
}