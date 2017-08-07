import {
    Chat
} from '../core/contracts';
import { Message } from "../bot/Message";

import { dataBase } from "../initDatabase";

export namespace Chats {

    //declare const dataBase: any;

    export const saveChatState = (msg: Message, appState: string): Promise<any> => {
        return dataBase.ref('chats/' + msg.chat.id).set({
            state: appState
        });
    }

    export const getChat = (msg: Message): Promise<Chat> => {
        return dataBase.ref('chats/' + msg.chat.id).once('value')
            .then((snapshot: any) => {
                return snapshot.val().state;
            })
            .catch((error: any) => {
                console.log("Chats/getChatState" + error);
            });
    }
}