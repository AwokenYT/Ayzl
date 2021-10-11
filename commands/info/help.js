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
            const categorys = [];
            client.commands.forEach(cmd => {
                if (!categorys.includes(cmd.category)) categorys.push(cmd.category); // so that we have a list of categorys
            });

            const cmdList = new MessageEmbed()
                .setTitle('Commands')
                .setDescription('A list of commands');
            categorys.forEach(category => {
                cmdList.addField(category.toUpperCase().replace(/(?<=\w)\w/g, (x) => x.toLowerCase()), client.commands.filter(cmd => cmd.category == category).map(cmd => `\`${cmd.name.toUpperCase().replace(/(?<=\w)\w/g, (x) => x.toLowerCase())}\``).join(' '));
            });
                message.channel.send({embeds: [cmdList]});
        }
    }
};