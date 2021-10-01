const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'help',
    description: 'Gives info on a command, or a list of commands',
    aliases: ['commands', 'h'],
    run: (client, message, args) => {
        if (args.length) {
            const command = client.getCommand(args.shift());
            if (command) {
                const cmdInfo = new MessageEmbed()
                    .setTitle(command.name)
                    .setDescription(command.description)
                    .addField('Aliases', command.aliases.join(', '))
                    .addField('Category', command.category);
                message.channel.send({embeds: [cmdInfo]});
            } else {
                const notCommand = new MessageEmbed()
                .setTitle('Unknown Command')
                .setDescription('I cant find any command with that name!')
                .setTimestamp();
                message.channel.send({embeds: [notCommand]});
            }
        } else {
            const cmdList = new MessageEmbed()
                .setTitle('Commands')
                .setDescription(client.commands.map(cmd => `\`${cmd.name}\``).join(' '));
                message.channel.send({embeds: [cmdList]});
        }
    }
};