import TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '447133612:AAG96SqODQfDB9sXv9YB9GLdWEg15BxekPQ';

// Create a bot that uses 'polling' to fetch new updates
const prodOptions = {
  webHook: {
    port: process.env.PORT || 5000
  }
};

const devOptions = { 
  polling: true 
};

const bot = new TelegramBot(token, prodOptions);

const url = 'https://evening-headland-56271.herokuapp.com/dist/index.js';

bot.setWebHook(`${url}/bot${token}`);

const inlineOptions = {
  inlineQueries: {
    GetPictures: 'CM_GETQUERIES'
  }
};

bot.onText(/^\/start$/, (msg, match) => {  

  let messageOptions = {
    parse_mode: 'HTML'
  };

  bot.sendMessage(msg.chat.id, `Hola <b>${msg.from.first_name}</b>, ingresa el comando '/menu'`, messageOptions);

});

bot.onText(/^\/menu$/, (msg, match) => {

  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "¿Qué quieres hacer?", { //sendMessage: https://core.telegram.org/bots/api
    reply_markup: {
      inline_keyboard: [ //InlineKeyboardMarkup: https://core.telegram.org/bots/api#inlinekeyboardmarkup
        [
          { //InlineKeyboardButton: https://core.telegram.org/bots/api#inlinekeyboardbutton
            text: 'Enviar a contacto',
            switch_inline_query: ''
          },
          { //InlineKeyboardButton: https://core.telegram.org/bots/api#inlinekeyboardbutton
            text: '+ Get pictures',
            switch_inline_query_current_chat: ''
          }
        ],
        [
          { //InlineKeyboardButton: https://core.telegram.org/bots/api#inlinekeyboardbutton
            text: '+ Acción sencilla',
            callback_data: inlineOptions.inlineQueries.GetPictures
          }
        ]
      ],
    },
  }).then(function (data) {
    console.log('message sent ');
  }).catch(console.error);

});

/**
 * List for every entered message
 */
bot.on('message', (msg) => {     

  const chatId = msg.chat.id;

  console.log('message received 987');

  console.log(JSON.stringify(msg));
});

bot.on('callback_query', (msg) => {
  console.log('callback_query received');
  if (msg.data == inlineOptions.inlineQueries.GetPictures) {
    bot.answerCallbackQuery(msg.id, 'acción sencilla pressed', true);
  }
});

bot.on('inline_query', (msg) => {
  console.log('inline_query received');
  console.log(JSON.stringify(msg));
  bot.answerInlineQuery(msg.id, //https://core.telegram.org/bots/api#answerinlinequery
    [ //https://unnikked.ga/understanding-telegram-inline-bots-73ac9aeea643
      { //https://core.telegram.org/bots/api#inlinequeryresultarticle
        id: '1',
        type: 'article',
        title: 'Opción 1..',
        description: 'Descripción de la opción 1',
        input_message_content: {
          message_text: 'contenido de opción 1'
        },
        thumb_url: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/128/Edit-validated-icon.png'
      },
      {
        id: '2',
        type: 'article',
        title: 'Opción 2..',
        description: 'Descripción de la opción 2',
        input_message_content: {
          message_text: 'contenido de opción 2'
        },
        thumb_url: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/128/File-info-icon.png',
      },
      {
        id: '3',
        type: 'article',
        title: 'Opción 3..',
        description: 'Descripción de la opción 3',
        input_message_content: {
          message_text: 'contenido de opción 3'
        },
        thumb_url: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/128/Font-color-icon.png',
      },
      {
        id: '4',
        type: 'article',
        title: 'Opción 4..',
        message_text: 'tow text',
        description: 'Descripción de la opción 4',
        input_message_content: {
          message_text: 'contenido de opción 4'
        },
        thumb_url: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/128/Portrait-icon.png',
      },
      {
        id: '5',
        type: 'article',
        title: 'Opción 5..',
        message_text: 'tow text',
        description: 'Descripción de la opción 5',
        input_message_content: {
          message_text: 'contenido de opción 5'
        },
        thumb_url: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/128/File-complete-icon.png',
      },
      {
        id: '6',
        type: 'article',
        title: 'Opción 6..',
        message_text: 'tow text',
        description: 'Descripción de la opción 6',
        input_message_content: {
          message_text: 'contenido de opción 6'
        },
        thumb_url: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/128/Email-receive-icon.png',
      }

    ], {
      cache_time: '10'
    });
});

bot.on('chosen_inline_result', (msg) => {
  console.log('chosen_inline_result');
  console.log(JSON.stringify(msg));
  bot.sendMessage(msg.from.id, `result selected id: ` + msg.result_id);
});

bot.on('left_chat_member', (msg) => {
  console.log('left_chat_member');
  console.log(JSON.stringify(msg));  
});
