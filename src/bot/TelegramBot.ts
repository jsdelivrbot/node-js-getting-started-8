import { InlineKeyboardMarkup } from "./InlineKeyboardMarkup";
import { SendMessageOptions } from "./SendMessageOptions";

declare class TelegramBot {

    constructor(token: string, opts?: any);

    /**
     * https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#TelegramBot+sendMessage
     * https://core.telegram.org/bots/api#message
     * @param chatId 
     * @param text 
     * @param options 
     */
    sendMessage(chatId: number | string, text: string, options?: SendMessageOptions): Promise<any>;
}