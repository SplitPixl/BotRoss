module.exports = {
  desc: "Run code (Bot Admin Only)",
  args: "<code>",
  hidden: true,
  run: (ctx, cmd, cb) => {
    if(process.env.admins.split(',').includes(String(cmd.author.id))) {
      try{
        cb(String(eval(cmd.args.join(' '))))
      } catch(err) {
        cb(err.message)
      }
    } else {
      cb('You are not allowed to use this command.')
    }
  }
}
