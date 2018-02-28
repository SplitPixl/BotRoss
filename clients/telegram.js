const EventEmitter = require('events');
const Telegraf = require('telegraf');

module.exports = function () {
  let client = new EventEmitter()
  let bot = new Telegraf(process.env.telegram_token)

  bot.telegram.getMe().then(me => {
    bot.user = me
  })

  bot.on('message', (ctx) => {
    if(ctx.updateType == 'message' && ctx.message.text && ((ctx.chat.type == 'private' && ctx.message.text.split(' ')[0].split('@')[1] == undefined) || (ctx.message.text.split(' ')[0].split('@')[1] == bot.user.username))) {
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
            group: {
              direct: ctx.chat.type == 'private',
              name: undefined,
            },
            provider: 'telegram',
            original: ctx,
            botClient: bot
          }
          client.emit('command', formattedCommand, (response) => {
            if(typeof response == 'object') {
              if(response.text && response.img) {
                ctx.replyWithPhoto({source: Buffer.from(response.img.buffer), name: response.img.name})
              } else if(response.img) {
                ctx.replyWithPhoto({source: Buffer.from(response.img.buffer), name: response.img.name})
              } else if(response.text) {
                ctx.reply(response.text)
              }
            } else {
              ctx.reply(String(response))
            }
          })
        })
      })
    }
  })

  bot.startPolling()
  console.log('telegram polling!')

  return client
};
