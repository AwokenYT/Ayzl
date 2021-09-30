module.exports = {
    name: 'ready',
    once: true, 
    run: (client) => {
        console.log(`Bot is online and running ${client.user.tag}\nWith ${client.guilds.cache.size} guilds and ${client.users.cache.size} users cached!!`);
    }
};