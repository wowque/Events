const guildСonfig = require('../../../../guild.json');  
const { customButton } = require('../Structure/buttonGenerator.js');


module.exports = async (client, appearance, config, db) => {

    if (client) {

        for (const guild of client.guilds.cache) if (guild[1].ownerId == client.user.id) {
    
            const pickGuildFetch = await client.guilds.fetch(guild[0]);
            pickGuildFetch.delete().catch(() => {});
    
        };
    
        const botsLogs = await client.channels.fetch(guildСonfig.botslogs).catch(() => {});
        const botAvatar = await client.user.avatarURL({ dynamic: true, size: 512 });
        

        console.log(`\x1b[32m[INFORM]\x1b[0m Приложение: \x1b[33m${client.user.tag}\x1b[0m, Websocket(Host) heartbeat: ${client.ws.ping}ms. ヾ(•ω•\`)o`);
        console.log(`\x1b[32m[READY]\x1b[0m Приложение: \x1b[33m${client.user.tag}\x1b[0m, успешно запущено. (⊙_◎)`);
        
    };

};
