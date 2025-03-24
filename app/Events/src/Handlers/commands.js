const { readdirSync } = require('fs');
const { Collection } = require('discord.js');
const commandFiles = readdirSync('./src/Commands');


module.exports = (client, appearance, config, db) => {
    
    console.log(`\x1b[32m[HANDLER]\x1b[0m Приложение: '\x1b[32m${client.user.tag} Handlers\x1b[0m' Commands started!`);
    client.commands = new Collection();
    client.commands.any = [];


    for (const file of commandFiles) {

        const commandNamedefault = file;
        const commandName = commandNamedefault.replace('.js', '');
        const commands = require(`../Commands/${file}`);

        console.log(`\x1b[32m[HANDLER]\x1b[0m Commands: \x1b[32m/${commandName}\x1b[0m started!`);

        commands.names.forEach(el => { client.commands.set(el, commands); });

        client.commands.any.push(commands);

    };

};