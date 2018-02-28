const superagent = require('superagent');

module.exports = {
  desc: "meme",
  args: "<text>",
  run: (ctx, cmd, cb) => {
    console.log(cmd.author.iconUrl)
    superagent.get(cmd.author.iconUrl).buffer(true).end((err, resp) => {
      console.log(resp.request)
      cb({img:{buffer: resp.body, name:'avatar.' + cmd.author.iconUrl.split('.')[cmd.author.iconUrl.split('.').length-1].split('?')[0]}})
    })
  }
}
