module.exports = {
  desc: "meme",
  args: "<text>",
  run: (cmd, cb) => {
    console.log(cmd.original.chat)
    // cb('rad')
  }
}
