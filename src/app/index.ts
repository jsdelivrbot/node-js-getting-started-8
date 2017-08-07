import { bot } from '../initBot';

import * as Data from '../data';

import { Message } from "../bot/Message";
import { ReplyKeyboardMarkup } from "../bot/ReplyKeyboardMarkup";
import { SendMessageOptions } from "../bot/SendMessageOptions";
import { Chat } from "../bot/Chat";
import { Chat as ChatModel } from '../core/contracts';
import { KeyboardButton } from "../bot/KeyboardButton";

import * as Core from '../core';

import { studentRegistration } from './student-registration';

export namespace index {

    namespace reply_markups {

        export const EstudianteBtn: KeyboardButton = {
            text: 'Estudiante'
        };

        export const ProfesorBtn: KeyboardButton = {
            text: 'Profesor'
        };

        const keyboard: Array<Array<KeyboardButton>> = [
            [EstudianteBtn, ProfesorBtn]
        ];

        export const start_markup = {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: keyboard,
        } as ReplyKeyboardMarkup;
    }

    export namespace messages {

        const messageOptions = {
            parse_mode: 'HTML',
            reply_markup: reply_markups.start_markup
        } as SendMessageOptions;

        export const sendStartMessage = (msg: Message) => {
            bot.sendMessage(
                msg.chat.id,
                `Hola <b>${msg.from.first_name}</b>, escoge tu perfil`,
                messageOptions
            );
        };
    }

    export namespace eventHandlers {

        export const listen = () => {

            bot.onText(/^\/start$/, (msg: Message, match: any) => {
                //let chat: ChatModel | null = Data.Chats.saveChatState('ad');

                Data.Chats.saveChatState(msg, Core.Constants.ChatStatus.START).then(() => {
                    index.messages.sendStartMessage(msg);
                });

            });

            bot.on('message', (msg: Message) => {

                if (!msg.text) {
                    return;
                }

                if (msg.text.indexOf(reply_markups.EstudianteBtn.text) === 0) {
                    studentRegistration.messages.sendStudentMessage(msg);
                } if (msg.text.indexOf(reply_markups.ProfesorBtn.text) === 0) {
                    console.log("Profesor profile")
                }
            });
        }
    }
}

index.eventHandlers.listen();