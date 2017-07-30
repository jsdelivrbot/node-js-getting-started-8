'use strict'

const Telegram = require('telegram-node-bot');
const TextCommand = Telegram.TextCommand;
const tg = new Telegram.Telegram('447133612:AAG96SqODQfDB9sXv9YB9GLdWEg15BxekPQ', {
  webAdmin: {
    port: process.env.PORT || 5000
  }
});

class LabController extends Telegram.TelegramBaseController {

  getNumericValueFromCommand(comandValue) {
    return comandValue.split(' ').slice(1).join(' ')
  }

  /**
   * @param {Scope} $
   */
  startHandler($) {
    console.log($);
    let chatId = $.chat.id;
    let fromId = $.from.id;
    console.log();
    console.log('chat id: ' + $.chat.id);
    console.log('from id: ' + $.from.id);
    $.sendMessage('Se ha recibido el comando c');
  }

  get routes() {
    return {
      'startCommand': 'startHandler',
    }
  }
}

tg.router
  .when(new TextCommand('/c', 'startCommand'), new LabController());