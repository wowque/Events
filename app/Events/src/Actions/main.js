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


        if(botsLogs) {
            
            const msgBotsLogs = await botsLogs.send({
                embeds: [
                    {
                        title: `Loading... : ${client.user.username}`,
                        description: `\n📡 **Starting** \`${client.user.username}\`\n🛡️ **Websocket(Host)** heartbeat: **${client.ws.ping}ms**.`,
                        color: 3224376,
                        thumbnail: { url: botAvatar },
                        author: {
                            name: 'Treatment',
                            icon_url: 'https://i.gifer.com/origin/50/507070efd95d3b5c7c1ff0241e7954cf_w200.gif'
                        },
                        footer: {
                            text: `・Guild: ${botsLogs.guild.name}`,
                            icon_url: botsLogs.guild.iconURL({ dynamic: true, size: 512 })
                        },
                    }
                ],
                components: [
                    customButton(2, `${client.user.username} starting`, '📶', 'ping', false)
                ]
            }).catch(() => {});
            
    
            setTimeout(async () => {
                
                msgBotsLogs.edit({
                    embeds: [{
                        title: `Readiness: ${client.user.username}`,
                        description: `・**Reading** ${client.user.username}.\n Launch **summary** above, **bot** is ready **to use**.\n\n・**Status Database**: Okey\n・**Status Discord**: Okey\n・**Error in code**: Targets`,
                        color: 3224376,
                        thumbnail: { url: botAvatar },
                        footer: {
                            text: `・Guild: ${botsLogs.guild.name}`,
                            icon_url: botsLogs.guild.iconURL({ dynamic: true, size: 512 })
                        },
                        author: {
                          name: `Websocket(Host) heartbeat: ${client.ws.ping}ms`,
                          icon_url: 'https://media.discordapp.net/attachments/1115273917112799323/1122135188261052487/Frame_24.png?width=675&height=675'
                        }
                    }],
                    components: [
                        customButton(2, `${client.user.username} ready`, '🆗', 'ping', false)
                    ]
                }).catch(() => {});
    
            }, 3000);

        };
        
    };

    const guild = await client.guilds.fetch(appearance.guild);
    setInterval(async () => {

        for (const channel of guild.channels.cache) {
        
            const channelfetch = await guild.channels.fetch(channel[0]);
            if (channelfetch.type == 2 && channelfetch.parentId == appearance.channels.CategoryLove && channelfetch.id !== appearance.channels.Love) {
                
                setTimeout(() => {

                    if (!channelfetch.members || !channelfetch.members.size) channelfetch.delete().catch(() => {});
                    
                }, 1500);

            };

        };

    }, 3000);

};