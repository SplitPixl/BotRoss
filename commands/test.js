const superagent = require('superagent');

module.exports = {
  desc: "meme",
  args: "<text>",
  run: (ctx, cmd, cb) => {
    console.log(cmd.mentions)
    superagent.get(cmd.mentions[0] ? cmd.mentions[0].iconUrl : false || cmd.author.iconUrl).buffer(true).end((err, resp) => {
      cb({
        img:{
          buffer: resp.body,
          name:'avatar.' + cmd.author.iconUrl.split('.')[cmd.author.iconUrl.split('.').length-1].split('?')[0]
        }
      })
    })
  }
}
