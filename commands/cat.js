const superagent = require('superagent');

module.exports = {
  desc: "It's meow",
  args: "",
  run: (ctx, cmd, cb) => {
    superagent.get('https://random.cat/meow').end((err, resp) => {
      superagent.get(resp.body.file).buffer(true).end((errr, respp) => {
        cb({img:{buffer: respp.body, name: `cat.${resp.body.file.split('.')[resp.body.file.split('.').length-1].split('?')[0]}`}})
      })
    })
  }
}
