module.exports = {
  main: async (bot, msg, settings) => {
    if (msg.author.id === settings.OWNERID) {
      var args = msg.content;
      bot.log('EVAL WAS RUN!');
      try {
        var res = eval(args); // eslint-disable-line no-eval
        if (typeof res !== 'string') {
          res = require('util').inspect(res);
        }
      } catch (err) {
        res = err.message;
      }
      msg.channel.sendMessage('```js\n' + res + '\n```').then(message => {
        settings.toBeDeleted.set(msg.id, message.id);
      });
    }
  },
  args: '',
  help: 'run some eval, bruh',
  hide: true
};
