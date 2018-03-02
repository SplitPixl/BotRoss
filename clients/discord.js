//discord bot dev is a meme - Seconded

const helpers = require('../utils/helpers.js');
const EventEmitter = require('events');
const Eris = require('eris')

module.exports = function () {
  let client = new EventEmitter()
  let bot = new Eris(process.env.discord_token)

  bot.on('messageCreate', (msg) => {
    if(msg.content.startsWith(process.env.discord_prefix)) {
      let formattedCommand = {
        name: msg.content.split(' ')[0].replace(process.env.discord_prefix, ''),
        text: msg.content,
        args: msg.content.split(' ').slice(1, msg.content.split(' ').length),
        author: {
          name: `${msg.author.username}#${msg.author.discriminator}`,
          iconUrl: msg.author.avatarURL.replace('?size=128', '?size=512'),
          id: msg.author.id
        },
        mentions: msg.mentions.map(mtn => {
          return {
            name: `${mtn.username}#${mtn.discriminator}`,
            iconUrl: mtn.avatarURL.replace('?size=128', '?size=512'),
            id: mtn.id
          }
        }) || [],
        group: {
          private: msg.channel.guild ? false : true,
          name: msg.channel.guild ? msg.channel.guild.name : "PRIVATE MESSAGE",
          id: msg.channel.guild ? msg.channel.guild.id : "PRIVATE MESSAGE"
        },
        provider: 'discord',
        original: msg,
        botClient: bot
      }
      client.emit('command', formattedCommand, (response) => {
        if(typeof response == 'object') {
          if(response.text && response.img) {
            msg.channel.createMessage(response.text, {file: response.img.buffer, name: response.img.name})
          } else if(response.img) {
            msg.channel.createMessage('', {file: response.img.buffer, name: response.img.name})
          } else if(response.text) {
            msg.channel.createMessage(response.text)
          }
        } else {
          msg.channel.createMessage(String(response))
        }
      })
    }
  })

  bot.on('ready', () => {
    helpers.clientReady('Discord')
  })

	bot.on('error', (err, id) => {
    helpers.clientErr('Discord', `${id ? 'Shard' + id + ' - ' : ''}${err}`)
  })

	bot.on('disconnect', () => {
    helpers.clientErr('Discord', `Global connection lost! Check your internet connection!`)
  })

  bot.connect();

  return client
};
