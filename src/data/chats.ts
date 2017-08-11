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
        
        let newChat:any = new Object();
        newChat[msg.chat.id] = {
            state: "",
            command: "",
            username: msg.chat.username
        };

        return dataBase.ref('profejosebot-94c5e').child('chats').setValue([newChat]);
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