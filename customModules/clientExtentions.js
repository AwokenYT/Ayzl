module.exports = (client) => {
    const extentions = [
    {
        name: 'getCommand', 
        variable: (commandName) => {
            let command = client.commands.get(commandName);
            if (!command) command = client.commands.find(cmd => cmd.aliases.includes(commandName));
            if (!command) return null;
            return command;
    }}
];
return extentions;
};