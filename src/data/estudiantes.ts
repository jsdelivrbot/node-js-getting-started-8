import {
    Student
} from '../core/contracts';

import { dataBase } from "../initDatabase";
import { Message } from "../bot/Message";

export namespace Students {

    export const saveStudentCode = (msg: Message, codigo: string): Promise<any> => {
        return dataBase.ref('estudiantes/' + msg.chat.id + '/codigo').set(codigo);
    };

    export const saveStudentEmail = (msg: Message, email: string): Promise<any> => {
        return dataBase.ref('estudiantes/' + msg.chat.id + '/email').set(email);
    };
}