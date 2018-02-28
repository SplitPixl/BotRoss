//discord bot dev is a meme

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
          id: msg.author.id
        },
        provider: 'discord',
        original: msg
      }
      client.emit('command', formattedCommand, (response) => {
        if(typeof response == 'object') {
          if(response.text && response.file) {
            msg.channel.createMessage(response.text, {file: response.file.buffer, name: response.file.name})
          } else if(response.file) {
            msg.channel.createMessage('', {file: response.file.buffer, name: response.file.name})
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
    console.log('discord ready!')
  })

  bot.connect();

  return client
};
