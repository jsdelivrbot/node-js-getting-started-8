import {
    Chat
} from '../core/contracts';
import { Message } from "../bot/Message";

import { dataBase } from "../initDatabase";

export namespace Chats {

    export const saveState = (msg: Message, state: string): Promise<any> => {
        return dataBase.ref('chats/' + msg.chat.id + '/state').set(state);
    }

    export const saveCommand = (msg: Message, command: string): Promise<any> => {
        return dataBase.ref('chats/' + msg.chat.id + '/command').set(command);
    }

    export const saveUserName = (msg: Message): Promise<any> => {
        return dataBase.ref('chats/' + msg.chat.id + '/username').set(msg.chat.username);
    }

    export const saveNewUserConfiguration = (msg: Message): Promise<any> => {
        return dataBase.ref('chats/' + msg.chat.id).set({
            state: "",
            command: "",
            username: msg.chat.username != undefined ? msg.chat.username : "",
        });
    }

    export const getChat = (msg: Message): Promise<Chat> => {
        return dataBase.ref('chats/' + msg.chat.id).once('value')
            .then((snapshot: any) => {
                return snapshot.val();
            })
            .catch((error: any) => {
                console.log("Chats/getChatState" + error);
            });
    }
}