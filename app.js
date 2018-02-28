const config = require('dotenv').config(),
	  fs = require('fs'),
	  chalk = require('chalk');

let commands = fs.readdirSync('./commands').reduce((cmds, file) => {
  if(file.endsWith('.js')) {
    let cmd = require(`./commands/${file}`)
    cmd.name = file.replace('.js', '')
    cmds[cmd.name] = cmd
    return cmds
  }
}, {})

let clients = {}


fs.readdirSync('./clients').forEach((file) => {
  if(file.endsWith('.js')) {
    let client = require(`./clients/${file}`)()
    let name = file.replace('.js', '')
    clients[name] = client
    client.on('command', (cmd, response) => {
      if(commands[cmd.name]) {
        console.log(`${cmd.provider} > ${cmd.author.name}: ${cmd.text}`)
        commands[cmd.name].run({commands, clients}, cmd, (resp) => {response(resp)})
      }
    })
    console.log(`Loaded client ${name}`)
  }
})
