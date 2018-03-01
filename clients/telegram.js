const EventEmitter = require('events');
const Telegraf = require('telegraf');
const tgresolve = require("tg-resolve");
const helpers = require('../utils/helpers.js');

module.exports = function () {
  let client = new EventEmitter()
  let bot = new Telegraf(process.env.telegram_token)

  bot.telegram.getMe().then(me => {
    bot.user = me
  })

  bot.on('message', (ctx) => {
    if(ctx.updateType == 'message' && ctx.message.text && ((ctx.chat.type == 'private' && ctx.message.text.split(' ')[0].split('@')[1] == undefined) || (bot.user ? ctx.message.text.split(' ')[0].split('@')[1] == bot.user.username : false))) {
      let mentions = []
      let counter = 0
      let ents = ctx.message.entities.map(ent => {
        if(ent.type == 'mention') {
          return ent
        }
      }).clean()
      if(ents.length > 0) {
        ents.forEach(ent => {
          tgresolve(process.env.telegram_token, ctx.message.text.substring(ent.offset, ent.offset+ent.length), (err, usr) => {
            if(err) {
              console.error(err)
            }
            bot.telegram.getUserProfilePhotos(usr.id).then(imgs => {
              bot.telegram.getFileLink(imgs.photos[0][imgs.photos[0].length - 1]).then(iconUrl => {
                mentions.push({
                  name: ctx.message.text.substring(ent.offset, ent.offset+ent.length),
                  iconUrl,
                  id: usr.id
                })
                counter++
                if(counter == ents.length) {
                  run()
                }
              })
            })
          })
        })
      } else {
        run()
      }
      function run() {
        bot.telegram.getUserProfilePhotos(ctx.from.id).then(imgs => {
          bot.telegram.getFileLink(imgs.photos[0][imgs.photos[0].length - 1]).then(iconUrl => {
            let formattedCommand = {
              name: ctx.message.text.split(' ')[0].split('@')[0].replace('/', ''),
              text: ctx.message.text,
              args: ctx.message.text.split(' ').slice(1, ctx.message.text.split(' ').length),
              author: {
                name: ctx.from.username,
                iconUrl: iconUrl,
                id: ctx.from.id
              },
              mentions,
              provider: 'telegram',
              original: ctx,
              botClient: bot
            }
            formattedCommand.provider.prefix = '/'
            client.emit('command', formattedCommand, (response) => {
              if(typeof response == 'object') {
                if(response.text && response.img) {
                  ctx.replyWithPhoto({source: Buffer.from(response.img.buffer), name: response.img.name})
                } else if(response.img) {
                  ctx.replyWithPhoto({source: Buffer.from(response.img.buffer), name: response.img.name})
                } else if(response.text) {
                  ctx.replyWithMarkdown(response.text)
                }
              } else {
                ctx.reply(String(response))
              }
            })
          })
        })
      }
    }
  })

	bot.startPolling()
 	helpers.clientReady('Telegram')

	bot.catch((err) => {
  	helpers.clientErr('Telegram', err)
	})

  return client
};

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
