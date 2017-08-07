import { ReplyKeyboardMarkup } from "./contracts";
import { InlineKeyboardMarkup } from "./InlineKeyboardMarkup";

export interface SendMessageOptions {
    reply_markup: ReplyKeyboardMarkup | InlineKeyboardMarkup;
}