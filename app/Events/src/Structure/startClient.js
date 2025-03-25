const fs = require('fs');
const config = require('../config.json');
const bots = require('../../../../bots.json'); 
const { dataBasePars } = require('./startDataBase.js');
const appearance = require('../../../../appearance.json');
const { Client, GatewayIntentBits } = require('discord.js');

if (!bots.Events.token) console.error(`\x1b[31m[ERROR]\x1b[0m Unknown bot token;`);
else {
    
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.GuildScheduledEvents,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageReactions
        ],
    });
    
    
    console.clear();
    
    
    let db = dataBasePars();
    function dbCheack() {

        let dblength = 0; 
        let jsondblength = 0; 

        for (const DataBase in db) {
            dblength++;
        };
        for (const DataBase in config.main.jsondb) {
            jsondblength++;
        };

        return (dblength == jsondblength);
        
    };

    while (!dbCheack()) db = dataBasePars();
    

    client.login(bots.Events.token)
        .then(() => {
            
            console.log(`\x1b[32m[BOT]\x1b[0m \x1b[33m${client.user.tag}\x1b[0m.`);
            console.log(`\x1b[32m[START]\x1b[0m Приложение: \x1b[33m${client.user.tag}\x1b[0m, успешно подключенно к серверам дискорд(❁´◡\`❁)`);
    
            setTimeout(() => {
                require('../../src/Handlers/commands.js')(client, appearance, config, db);
                require('../../src/Handlers/dataBases.js')(client, appearance, config, db);
                require('../../src/Handlers/events.js')(client, appearance, config, db);
                require('../../src/Handlers/actions.js')(client, appearance, config, db);
            }, 2500);
    
        })
        .catch((error) => {
            console.error(`\x1b[31m[ERROR]\x1b[0m Ошибка при подключении: К серверам дискорд:\n`, error);
        });

};
