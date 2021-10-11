const { readdirSync } = require('fs');
module.exports = (client) => {
    readdirSync('./events').forEach(eventFileName => {
        const event = require(`../events/${eventFileName}`);
        if (event.once) client.once(event.name, (...args) => event.run(...args, client)); // if the event should only be run once
        else client.on(event.name, (...args) => event.run(...args, client));
    });
};