require('dotenv').config();
const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const { readdirSync } = require('fs');

readdirSync('./handlers').forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

if (process.env.USER == 'root') {
    client.login(process.env.BOTTOKEN);
} else {
    client.login(process.env.DEVBOTTOKEN);
}