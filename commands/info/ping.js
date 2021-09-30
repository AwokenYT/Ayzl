module.exports = {
    name: 'ping',
    description: 'gives info on the bots latency and ping',
    aliases: ['ws', 'latency'],
    run: async(client, message) =>{
        const msg = await message.reply('Pinging...');

        const latency = msg.createdTimestamp - message.createdTimestamp;

        msg.edit(`:ping_pong: Latency: \`${latency}ms\` WS: \`${client.ws.ping}ms\``);
    }
};