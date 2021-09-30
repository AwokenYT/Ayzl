require('dotenv').config();
const {Client, Intents} = require('discord.js');
const client = new Client({intents: Intents.FLAGS.GUILDS});

if (process.env.USER == 'root') {
    client.login(process.env.BOTTOKEN);
} else {
    client.login(process.env.DEVBOTTOKEN);
}