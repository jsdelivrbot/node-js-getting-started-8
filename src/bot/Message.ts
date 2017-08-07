/**
 * @author Jose Ubaldo Carvajal <joseucarvajal@gmail.com>
 * See {@link https://core.telegram.org/bots/api#message}
 */

import { User } from "./User";
import { Chat } from "./Chat";

export interface Message {
    message_id:number;
    from:User;
    chat:Chat;
}