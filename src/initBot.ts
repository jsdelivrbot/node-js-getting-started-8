console.log('initializing bot...');

import {
  TelegramBot as TelegramBotModel
} from './bot/TelegramBot';

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '444579962:AAHlIwzdlqufOBz_gLoPL3kkHYr-FPc2xoM';

// Create a bot that uses 'polling' to fetch new updates
const prodOptions = {
  webHook: {
    port: process.env.PORT || 5000
  }
};

const devOptions = {
  polling: true
};

export const bot:TelegramBotModel = new TelegramBot(token, devOptions);

const url = 'https://evening-headland-56271.herokuapp.com/dist/index.js';

//bot.setWebHook(`${url}/bot${token}`);