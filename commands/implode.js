const request = require('request');
const gm = require('gm');

module.exports = {
  desc: "squish",
  args: "[mention]",
  run: (ctx, cmd, cb) => {
    gm(request(cmd.mentions[0] ? cmd.mentions[0].iconUrl : false || cmd.args[0] || cmd.author.iconUrl))
    .implode()
    .toBuffer('PNG',function (err, buffer) {
      if (err) {
        console.error(err)
        cb(`Something went wrong: ${err}`)
      } else {
        cb({
          img: {
            buffer,
            name: 'rad.png'
          }
        })
      }
    })
  }
}
