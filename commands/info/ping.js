module.exports = {
    name: 'ping',
    aliases: ['ws', 'latency'],
    run: async(client, message) =>{
        const msg = await message.reply('Pinging...');

        const latency = msg.createdTimestamp - message.createdTimestamp;

        msg.edit(`:ping_pong: Latency: \`${latency}ms\` WS: \`${client.ws.ping}ms\``);
    }
};