const { readdirSync, statSync } = require('fs');
module.exports = (client) => {
    readdirSync('./commands').forEach(commandCatagory => {
        if (statSync(`./commands/${commandCatagory}`).isFile()) return; // checks if its a file 
        readdirSync(`./commands/${commandCatagory}`).forEach(commandFileName => {
            const command = require(`../commands/${commandCatagory}/${commandFileName}`);
            client.commands.set(command.name, command);
        });
    });
};