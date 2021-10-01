const { MessageEmbed } = require('discord.js');
const { create, BinFile } = require('sourcebin-wrapper');

module.exports = {
    name: 'eval',
    description: 'executes third party scripts, aka runs code that u giv it',
    aliases: ['e', 'runthedangercmd'],
    ownerOnly: true,
    run: (client, message, args) => {
        if (!args.length) return message.reply('You need to give me code to run!');
        let code = args.join(' ').replace(/```(\w+)?/g, '');
        code = clean(code, client);
        let output;
        try {
            output = clean(eval(code), client);
            if (output.length > 1024) evaled('length', output, code, message);
            else evaled('ok', output, code, message);
        } catch (err){
            evaled('error', err, code, message);
        }
        
    }
};
const clean = (string, client) => {
    if (typeof string != 'string') string = require('util').inspect(string, { depth: 0 });
    string = string.replace(client.token, 'No-Token-4-U');
    string = string.replace('process.env', 'oi, error time \\\\(￣︶￣*\\\\))');
    return string;
};
const evaled = (status, output, code, message) => {
    const evalEmbed = new MessageEmbed();
    switch (status) {
        case 'ok':
            evalEmbed.setTitle('Eval output').addField('📥 Input', `\`\`\`js\n${code}\n\`\`\``).addField('📤 Output', `\`\`\`js\n${output}\n\`\`\``);
            message.channel.send({embeds: [evalEmbed]});
            break;
        case 'length':
            create([
                new BinFile({
                    name: 'output.js', content: output, languageId: 'js'
                })],
                {
                    title: 'Eval Output', description: 'Output from the eval command for a discord bot'
                })
                .then(result => {
                    evalEmbed.setTitle('Eval output: Text to long').addField('📥 Input', `\`\`\`js\n${code}\n\`\`\``).addField('📤 Output', `\`\`\`js\n${result.url}\n\`\`\``);
                    message.channel.send({embeds: [evalEmbed]});
                });
                break;
                case 'error': 
                evalEmbed.setTitle('Eval output: There was an error').addField('📥 Input', `\`\`\`js\n${code}\n\`\`\``).addField('📤 Error', `\`\`\`js\n${output}\n\`\`\``);
                message.channel.send({embeds: [evalEmbed]});
    }
};