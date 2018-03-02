const request = require('request');
const gm = require('gm');

module.exports = {
  desc: "squish",
  args: "[mention]",
  run: (ctx, cmd, cb) => {
    gm(request(cmd.mentions[0] ? cmd.mentions[0].iconUrl : false || cmd.args[0] || cmd.author.iconUrl))
    .spread(1)
    .modulate(255, 255)
    .quality(1)
    .toBuffer('JPG',function (err, buffer) {
      if (err) {
        console.error(err)
        cb(`Something went wrong: ${err}`)
      } else {
        cb({
          img: {
            buffer,
            name: 'rad.jpg'
          }
        })
      }
    })
  }
}
