"use strict";

module.exports = {
    main: function(bot, msg) {
        var args = msg.content;
        let messagecount = parseInt(args);
        bot.getChannelLogs(msg.channel, 100, (err, messages) => {
            if(err) console.log(err);
            messages = messages.filter(m => m.author.id === bot.user.id);
            messages.length = messagecount+1;
            console.log(`There are ${messages.length} messages left after filter`);
            messages.map(m => bot.deleteMessage(m, (err) => {if(err)console.log(err)}));
        });
    },
    help: 'template'
};
