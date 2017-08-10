import { Message } from "../../bot/Message";
import { SendMessageOptions } from "../../bot/SendMessageOptions";

import { bot } from '../../initBot';
import * as Data from '../../data';
import { University } from "../../core/contracts";

import {
    AttendanceLocation as AttendanceLocationImpl
} from './attendance-location';

export namespace Attendance {

    export const sendMessage = (msg: Message) => {

        const messageOptions = {
            parse_mode: 'HTML'
        } as SendMessageOptions;

        Data.Universities.getAllUniversities().then((universitiesList: Array<University>) => {

            if (!universitiesList ||
                universitiesList.length == 0) {
                return;
            }

            bot.sendMessage(
                msg.chat.id,
                `Selecciona la asignatura que deseas registrar.`,
                messageOptions
            );

            AttendanceLocationImpl.sendMessage(msg);
        });
    };
}
