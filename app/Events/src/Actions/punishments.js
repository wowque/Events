const { getAvatar } = require('../Structure/getAttribute.js');
const { checkingForAvailabilityGuild } = require('../Structure/checkingFor.js');


module.exports = async (client, appearance, config, db) => {

    const { users, guilds } = db;
    const guild = await client.guilds.fetch(appearance.guild);

    checkingForAvailabilityGuild (db, guild);
    if (!guilds[guild.id].Punishments) guilds[guild.id].Punishments = [];

    setInterval(async () => {

        for (let pickPunishment in guilds[guild.id].Punishments) {

            const fetchPickPunishment = guilds[guild.id].Punishments[pickPunishment];
            if (Date.now()/1000 > fetchPickPunishment.dateRemove) {

                guilds[guild.id].Punishments = guilds[guild.id].Punishments.filter((n) => { return n != guilds[guild.id].Punishments[pickPunishment] });

                const pickMember = await guild.members.fetch(fetchPickPunishment.id).catch(() => {});
                if (pickMember) {

                    pickMember.roles.remove(fetchPickPunishment.punishment).catch(() => {});
        
                    pickMember.send({
                        content: `<t:${Math.floor(Date.now()/1000)}:f>`,
                        embeds: [
                            {
                                author: { name: 'Снятие наказания' },
                                title: `${client.user.username} logs`,
                                color: appearance.embed.color,
                                thumbnail: { url: await getAvatar(pickMember) },
                                fields: [
                                    {
                                        name: `${appearance.embed.dot || appearance.emoji.Dot}Отстранение:`,
                                        value: `・**${appearance.custom.Events.punishment[fetchPickPunishment.punishment].name}**\n・ID: ${fetchPickPunishment.punishment}`,  
                                        inline: true
                                    },
                                    {
                                        name: `${appearance.embed.dot || appearance.emoji.Dot}Модератор:`,
                                        value: `・${client.user}\n・${client.user.id}`,  
                                        inline: true
                                    },
                                    {
                                        name: `${appearance.embed.dot || appearance.emoji.Dot}Причина:`,
                                        value: `\`\`\`Автоматически\`\`\``,  
                                        inline: false
                                    }
                                ]
                            }
                        ], 
                        components: [
                            
                        ]
                    }).catch(() => {});

                };
        
                const mesageOPunishmentsChannel = await client.channels.fetch(fetchPickPunishment.logsMessage.channel).catch(() => {});
                if (mesageOPunishmentsChannel) {

                    const mesagesOPunishmentsInLog = await mesageOPunishmentsChannel.messages.fetch().catch(() => {});
                    if (mesagesOPunishmentsInLog) {
                        
                        const mesageOPunishmentsInLog = mesagesOPunishmentsInLog.find(msg => msg.id == fetchPickPunishment.logsMessage.message);
                        if (mesageOPunishmentsInLog) mesageOPunishmentsInLog.reply({
                            content: `<t:${Math.floor(Date.now()/1000)}:f>`,
                            embeds: [
                                {
                                    author: { name: 'Снятие наказания' },
                                    title: `${client.user.username} logs`,
                                    color: appearance.embed.color,
                                    thumbnail: { url: await getAvatar(pickMember) },
                                    fields: [
                                        {
                                            name: `${appearance.embed.dot || appearance.emoji.Dot}Отстранение:`,
                                            value: `・<@&${fetchPickPunishment.punishment}>\n・**${appearance.custom.Events.punishment[fetchPickPunishment.punishment].name}**`,  
                                            inline: false
                                        },
                                        {
                                            name: `${appearance.embed.dot || appearance.emoji.Dot}Пользователь:`,
                                            value: `・${pickMember}\n・${pickMember.id}`,  
                                            inline: true
                                        },
                                        {
                                            name: `${appearance.embed.dot || appearance.emoji.Dot}Модератор:`,
                                            value: `・<@${fetchPickPunishment.moderator}>\n・${fetchPickPunishment.moderator}`,  
                                            inline: true
                                        },
                                        {
                                            name: `${appearance.embed.dot || appearance.emoji.Dot}Причина:`,
                                            value: `\`\`\`Автоматически\`\`\``, 
                                            inline: false
                                        }
                                    ]
                                }
                            ], 
                            components: [
                                
                            ]
                        }).catch(() => {});

                    };

                };

            };

        };

    }, 3000);

};