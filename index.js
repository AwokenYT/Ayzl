require('dotenv').config();
const { readdirSync } = require('fs');
const {Client, Intents, Collection} = require('discord.js');
let client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
client.commands = new Collection();
client = require('./customModules')(client);
readdirSync('./handlers').forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

if (process.env.USER == 'root') {
    client.login(process.env.BOTTOKEN);
} else {
    client.login(process.env.DEVBOTTOKEN);
}