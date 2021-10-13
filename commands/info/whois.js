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
            const getEmojiFromStatus = (string) => {
                if (string == 'dnd') {
                    return '<:status_dnd:897699277164408892>';
                } else if (string == 'online') {
                    return '<:status_online:897700789991116810>';
                } else if (string == 'idle') {
                    return '<:status_idle:897701151393325077>';
                } else {
                    return '<:status_offline:897701613395906620>';
                }
            };

                if (!args.length) member = message.member;
                else {
                    member = message.mentions.members.first() || members.find(member => member.displayName.toLowerCase() === memberString || member.user.username.toLowerCase() == memberString) || message.guild.members.cache.get(memberString) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === memberString);
                    if (!member) member = members.get(memberString.match(/^<@!?(\d+)>$/)?.[1]);
                }
                if (!member) return message.reply('no member found');
                
                const fields = [
                    {
                        name: 'Joined:',
                        value: `${moment(member.joinedAt).utc().format('MMMM D  o YYYY, h:mm a')} UTC Time -- ${moment(member.joinedAt).fromNow()}`,
                        inline: true
                    },
                    {
                        name: 'Registered:',
                        value: `${moment(member.user.createdAt).utc().format('MMMM Do YYYY, h:mm a')} UTC Time -- ${moment(member.user.createdAt).fromNow()}`,
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
                    },
                    {
                        name: 'Status',
                        value: `${getEmojiFromStatus(member.presence.status)} ${member.presence.status.replace(/(?<!\w)\w/, x => x.toUpperCase()).replace('Dnd', 'DND')}`
                    },
                    {
                        name: 'Device Status\'s',
                        value: [{device: 'Mobile',status:`${getEmojiFromStatus(member.presence.clientStatus.mobile)} ${member.presence.clientStatus.mobile}`}, {device: 'Web',status: `${getEmojiFromStatus(member.presence.clientStatus.web)} ${member.presence.clientStatus.web}`}, {device: 'Desktop',status: `${getEmojiFromStatus(member.presence.clientStatus.desktop)} ${member.presence.clientStatus.desktop}`}].filter(status => !status.status.includes('undefined')).map(status => `${status.device}: ${status.status.replace(/(?<!(:|\w))\w/g, x => x.toUpperCase()).replace('Dnd', 'DND')}`).join(', ')
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