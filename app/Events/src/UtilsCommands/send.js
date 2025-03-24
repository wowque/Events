const { PermissionsBitField } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = async (client, appearance, config, db, message) => {

    const { member, channel, guild, content } = message;

    const messageArray = content.split(' ');
    const command = messageArray[0].replace(config.main.prefix, '');
    const args = messageArray.slice(1);
    const messageArrayFull = content.split(' '); 
    const argsF = messageArrayFull.slice(1);

    if(!channel.permissionsFor(member).has(PermissionsBitField.Flags.Administrator)) return message.delete().catch(() => {});

    if(args[0].replace('<@', '').replace('>', '') == client.user.id) {

        const txtfetch = await fetch(message.attachments.first().url);
        const txt = await txtfetch.json().catch(err => console.error(err));
        channel.send(txt).catch(err => console.error(err));
        message.delete();

    };

};