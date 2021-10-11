const { readdirSync, statSync } = require('fs');
module.exports = (client) => {
    readdirSync('./commands').forEach(commandCategory => {
        if (statSync(`./commands/${commandCategory}`).isFile()) return; // checks if its a file 
        readdirSync(`./commands/${commandCategory}`).forEach(commandFileName => {
            const command = require(`../commands/${commandCategory}/${commandFileName}`);
            command.category = commandCategory;
            client.commands.set(command.name, command);
        });
    });
};