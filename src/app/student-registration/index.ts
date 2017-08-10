import { bot } from '../../initBot';

import { Chat } from "../../bot/Chat";
import { Chat as ChatModel } from '../../core/contracts';
import { Message } from "../../bot/Message";
import { SendMessageOptions } from "../../bot/SendMessageOptions";
import { KeyboardButton } from "../../bot/KeyboardButton";
import { ReplyKeyboardMarkup } from "../../bot/ReplyKeyboardMarkup";

import { index } from '../index';

import * as Data from '../../data';
import * as Core from '../../core';

import { Student as StudentImpl } from './student';
import { MisDatos as MisDatosImpl } from './mis-datos';

import { AttendanceRegistration as AttendanceRegistrationImpl } from '../attendance-registration';

export namespace StudentRegistration {

    export namespace Student {
        export const Options = StudentImpl.Options;
        export const sendMessage = (msg: Message) => {
            StudentImpl.sendMessage(msg);
        }
        export const hello = () => {
            console.log("hello");
        }
    }

    export namespace eventHandlers {

        export const listen = () => {

            bot.on('message', (msg: Message) => {

                if (!msg.text) {
                    return;
                }

                if (msg.text.indexOf(StudentImpl.Options.MisDatos) === 0) {
                    MisDatosImpl.sendMessage(msg);
                }  
                else if (msg.text.indexOf(StudentImpl.Options.Asistencia) === 0) {
                    AttendanceRegistrationImpl.Attendance.sendMessage(msg);
                } 
                if (msg.text.indexOf(StudentImpl.Options.Volver) === 0) {
                    index.messages.sendStartMessage(msg);
                }
            });            
        }
    }
}

StudentRegistration.eventHandlers.listen();