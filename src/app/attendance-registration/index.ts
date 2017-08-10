import { bot } from '../../initBot';

import { Message } from "../../bot/Message";

import * as Data from '../../data';
import * as Core from '../../core';

import { Attendance as AttendanceImpl } from './attendance';
import { AttendanceLocation as AttendanceLocationImpl } from './attendance-location';
import { AttendanceConfirmation as AttendanceConfirmationImpl } from "./attendance-confirmation";

export namespace AttendanceRegistration {

    export namespace Attendance {
        export const sendMessage = (msg: Message) => {
            AttendanceImpl.sendMessage(msg);
        }
    }

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('message', (msg: Message) => {

                if (!msg.text) {
                    return;
                }
            });
            
            bot.on('location', (msg: Message) => {
                AttendanceConfirmationImpl.sendMessage(msg);
            });
        }
    }
}

AttendanceRegistration.eventHandlers.listen();