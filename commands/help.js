const superagent = require('superagent');

module.exports = {
  desc: "Show how this bot works",
  args: "[command]",
  run: (ctx, cmd, cb) => {
    if(cmd.args[0] && ctx.commands[cmd.args[0]]) {
      let command = ctx.commands[cmd.args[0]]
      cb(`${command.name} ${command.args} - ${command.desc}\n\n${command.help ? command.help : 'no help desc.'}`)
    } else if(cmd.args[0] && !ctx.commands[cmd.args[0]]) {
      cb('That command doesn\'t exist.')
    } else {
      let message = []
      Object.keys(ctx.commands).forEach(command => {
        command = ctx.commands[command]
        if(!command.hidden) {
          message.push(`${command.name} ${command.args} | ${command.desc}`)
        }
      })
      cb(message.join('\n'))
    }
  }
}
