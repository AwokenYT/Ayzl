const { MessageEmbed } = require('discord.js');
const moment = require('moment');
module.exports = {
    name: 'whois',
    description: 'gives info about a user',
    aliases: ['userinfo', 'who'],
    run: (client, message, args) => {
        const memberString = args.join(' ').toLowerCase();
        let member;
        message.guild.members.fetch().then(members => {
                if (!args.length) member = message.member;
                else {
                    member = message.mentions.members.first() || members.find(member => member.displayName.toLowerCase() === memberString || member.user.username.toLowerCase() == memberString) || message.guild.members.cache.get(memberString) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === memberString);
                    if (!member) member = members.get(memberString.match(/^<@!?(\d+)>$/)?.[1]);
                }
                if (!member) return message.reply('no member found');

                const fields = [
                    {
                        name: 'Joined:',
                        value: `${moment(member.joinedAt).utc().format('MMMM Do YYYY, h:mm a')} UTC Time`,
                        inline: true
                    },
                    {
                        name: 'Registered:',
                        value: `${moment(member.user.createdAt).utc().format('MMMM Do YYYY, h:mm a')} UTC Time`,
                        inline: true
                    }
                ];

                const userInfo = new MessageEmbed()
                .setTitle(`${member.user.username}`)
                .setAuthor(`${member.user.username}`, member.user.displayAvatarURL({dynamic: true}))
                .setURL(`https://discord.com/users/${member.user.id}`)
                .addFields(fields);

                message.reply({embeds: [userInfo]});
            });
        }
    };