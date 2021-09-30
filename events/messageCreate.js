const { prefix } = require('../config.json');
module.exports = {
    name: 'messageCreate',
    run: (message, client) => {
        if (message.author.bot) return;
        let args;
        if (message.content.startsWith(prefix)) {// if it isnt a cmd then check other stuff, e.g. automod
            args = message.content.slice(2).split(' ');
            const possibleCommand = args.shift();
            let command = client.commands.get(possibleCommand);
            if (!command) command = client.commands.find(cmd => cmd.aliases?.includes(possibleCommand));
            if (!command) return;
            command.run(client, message, args);
        } else return; // doesnt do anything for now
    }
};