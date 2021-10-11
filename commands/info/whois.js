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
                    },
                    {
                        name: 'Joined Pos:',
                        value: `${
                            message.guild.members.cache.map(guildMember => guildMember).sort((memberOne,memberTwo) => memberOne.joinedTimestamp - memberTwo.joinedTimestamp)
                            .filter((guildMember,index) => {
                                guildMember.index = index+1; return guildMember.user.id== member.user.id;
                            })[0].index
                        }`,
                        inline: true
                    },
                    {
                        name: 'Status',
                        value: member.presence.status.replace(/(?<!\w)\w/, x => x.toUpperCase()).replace('Dnd', 'DND')
                    },
                    {
                        name: 'Device Status\'s',
                        value: [{device: 'Mobile',status:member.presence.clientStatus.mobile}, {device: 'Web',status:member.presence.clientStatus.web}, {device: 'Desktop',status: member.presence.clientStatus.desktop}].map(status => `${status.device}: ${status.status == undefined ? 'Offline' : status.status.replace(/(?<!\w)\w/, x => x.toUpperCase()).replace('Dnd', 'DND')}`).join(', ')
                    },
                    {
                        name: `Roles [${member.roles.cache.size-1}]`,
                        value: member.roles.cache.size != 1 ? member.roles.cache.map(role => role).filter(role => role.name != '@everyone').join(', ') : 'No Roles'
                    },
                ];
                if (member.presence.activities.some(activity => activity.type == 'CUSTOM')) {
                    fields.splice(4,0,{
                            name: 'Custom Status',
                            value: member.presence.activities.find(activity => activity.type == 'CUSTOM').state.replace(/:(\w+ ?){1,}:/g, '').replace(/<([0-9]{5,20})>/g, '')
                        });
                }

                const userInfo = new MessageEmbed()
                .setTitle(`${member.user.username}`)
                .setAuthor(`${member.user.username}`, member.user.displayAvatarURL({dynamic: true}))
                .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
                .setURL(`https://discord.com/users/${member.user.id}`)
                .addFields(fields);
                member.user.fetch().then(user => {
                    userInfo.setColor(user.accentColor);
                    message.reply({embeds: [userInfo]});
                });
            });
        }
    };