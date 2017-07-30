'use strict'

const Telegram = require('telegram-node-bot');
const TextCommand = Telegram.TextCommand;

const tg = new Telegram.Telegram('447133612:AAG96SqODQfDB9sXv9YB9GLdWEg15BxekPQ', {
  webhook: {
    url: 'https://evening-headland-56271.herokuapp.com/node-bot-webhook',
    port: process.env.PORT || 5000
  }
});

class LabController extends Telegram.TelegramBaseController {

  /**
   * @param {Scope} $
   */
  n1Handler($) {
    $.setUserSession('n1', this.getNumericValueFromCommand($.message.text));
    $.sendMessage('Muy bien, ahora ingresa el numero 2 con /n2');
  }

  n2Handler($) {
    $.setUserSession('n2', this.getNumericValueFromCommand($.message.text));
    $.sendMessage('Muy bien, ahora ingresa el comando /result');
  }

  resultHandler($) {
    $.getUserSession('n1').then(n1 => {
      $.getUserSession('n2').then(n2 => {
        const result = parseInt(n1) + parseInt(n2);
        $.sendMessage("La suma es: " + result);
      });
    });
  }

  get routes() {
    return {
      'pingCommand': 'pingHandler',
      'n1Command': 'n1Handler',
      'n2Command': 'n2Handler',
      'resultCommand': 'resultHandler'
    }
  }

  getNumericValueFromCommand(comandValue) {
    return comandValue.split(' ').slice(1).join(' ')
  }

}

class OtherwiseController extends Telegram.TelegramBaseController {
  handle($) {
    $.sendMessage('Ingresa alguna de las siguientes opciones: /n1, /n2, /result');
  }
}

tg.router
  .when(new TextCommand('/ping', 'pingCommand'), new LabController())
  .when(new TextCommand('/n1', 'n1Command'), new LabController())
  .when(new TextCommand('/n2', 'n2Command'), new LabController())
  .when(new TextCommand('/result', 'resultCommand'), new LabController())
  .otherwise(new OtherwiseController());
