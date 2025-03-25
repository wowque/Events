const axios = require('axios');
const moment = require('moment');
const canvas = require('canvas');
const bots = require('../../../../bots.json');
const { writeFile, writeFileSync, futimesSync } = require('fs');
const { makeid } = require('../Structure/numbersGenerator.js');
const { menuRole, menuUser, pageChange } = require('../Structure/buttonGenerator.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const { getCurrentDateTime, hourTranslator, hourTranslatorBold, clockTranslator } = require('../Structure/timeManage.js');
const { getAvatar, targetMessageEditComponents, getColorEmoji, getArrayRandElement, getBlackWhiteImage } = require('../Structure/getAttribute.js');
const { AuditLogEvent, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType, PermissionsBitField, GuildScheduledEventEntityType, GuildScheduledEventPrivacyLevel } = require('discord.js');
const { checkingForAvailability, сheckingForTimeout, checkingForNumber, checkingForValidImageURL, checkingForRoles } = require('../Structure/checkingFor.js');


module.exports = async (client, appearance, config, db, args, argsF, interaction) => {
    
    if (!interaction.guild) return;
    canvas.registerFont('./assets/fonts/MediumMonts.ttf', { family: 'MediumMonts' });

    const { member, channel, guild } = interaction;
    const { users, guilds, stats } = db;

    const commandTime = Date.now() / 1000;
    const memberAvatar = await getAvatar(member);

    checkingForAvailability (db, member);
    
    const actions = {}; 
    let parameters = {};
    let game = {};


    function getCurrentDateTimeTxt (hours) {
                        
        const currentDate = new Date();
        
        currentDate.setHours(currentDate.getHours() + hours);             
        const offsetInMinutes = currentDate.getTimezoneOffset();
        
        const offsetString =
            (offsetInMinutes < 0 ? "+" : "-") +
            String(Math.abs(offsetInMinutes / 60)).padStart(2, "0") +
            ":" +
            String(Math.abs(offsetInMinutes % 60)).padStart(2, "0");
        
        const formattedDateTime = currentDate.toISOString().replace("Z", offsetString);
        
        return formattedDateTime;

    }; 
    

    if (argsF.subcommand == 'leads') {

        const pickMember = await guild.members.fetch(args.пользователь || member.id).catch(() => {});
            
        if (!pickMember) 
        return interaction.reply({
            ephemeral: true,  
            embeds: [
                {
                    title: `${client.user.username} error`,
                    color: appearance.embed.errorColor,
                    description: `${member}, пользователь \`${args.пользователь}\` не найден`,                          
                    thumbnail: { url: await getAvatar (pickMember) } 
                }
            ]
        }).catch(() => {});

        await checkingForRoles (interaction, appearance.roles.Events.access);
        checkingForAvailability (db, pickMember);

        let rolesTxt = '';
        let memberIfRole = false;
        const memberRoles = pickMember._roles;
    
        for (let a = 0; a < memberRoles.length; a++) if(appearance.roles.Events.access.includes(memberRoles[a])) memberIfRole = true;
        for (let a = 0; a < appearance.roles.Events.access.length; a++) rolesTxt += ` <@&${appearance.roles.Events.access[a]}>`;
            
        if (!memberIfRole) 
        return interaction.reply({
            ephemeral: true,  
            embeds: [
                {
                    title: `${client.user.username} error`,
                    color: appearance.embed.errorColor,
                    description: `${member}, у ${pickMember} нет **ролей**:${rolesTxt}`,                          
                    thumbnail: { url: await getAvatar (pickMember) } 
                }
            ]
        }).catch(() => {});

        if (pickMember.user.bot) 
        return interaction.reply({
            ephemeral: true,  
            embeds: [
                {
                    title: `${client.user.username} error`,
                    color: appearance.embed.errorColor,
                    description: `${member}, Вы выбрали **недоступного** бота ${pickMember}, выберите **другого** пользователя`,                          
                    thumbnail: { url: await getAvatar (pickMember) } 
                }
            ]
        }).catch(() => {});


        let time = 'all';
        let tempPage = 1;
        let eventsOfGo = [];


        function getCurrentWeekMondayUnixMSK() {
            
            const now = new Date();
            const currentDayOfWeek = now.getDay();
            const daysSinceThisMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
            
            const thisMonday = new Date(now);
            thisMonday.setDate(now.getDate() - daysSinceThisMonday);
            thisMonday.setHours(0, 0, 0, 0);
            
            return Math.floor(thisMonday.getTime() / 1000);

        };

        function getTodayStartUnixMSK() {
            
            const now = new Date();
            now.setHours(0, 0, 0, 0);

            return Math.floor(now.getTime() / 1000);
        };


        for (const pickEvent in users[pickMember.id].Events) if (guilds[users[pickMember.id].Events[pickEvent].EventId] && !guilds[users[pickMember.id].Events[pickEvent].EventId].EventId) guilds[users[pickMember.id].Events[pickEvent].EventId].EventId = users[pickMember.id].Events[pickEvent].EventId;

        if (time == 'all') for (const pickEvent in users[pickMember.id].Events) eventsOfGo.push(guilds[users[pickMember.id].Events[pickEvent].EventId]);
        if (time == 'week') for (const pickEvent in users[pickMember.id].Events) if (users[member.id].Events[pickEvent].Created > getCurrentWeekMondayUnixMSK ()) eventsOfGo.push(guilds[users[pickMember.id].Events[pickEvent].EventId]);
        if (time == 'day') for (const pickEvent in users[pickMember.id].Events) if (users[member.id].Events[pickEvent].Created > getTodayStartUnixMSK()) eventsOfGo.push(guilds[users[pickMember.id].Events[pickEvent].EventId]);
        

        if (!eventsOfGo[0]) 
        return interaction.reply({
            ephemeral: true,  
            embeds: [
                {
                    title: `${client.user.username} error`,
                    color: appearance.embed.errorColor,
                    description: pickMember.id == member.id ? `${member}, Вы **не проводили** какие-либо мероприятия\nСервер: **${guild.name}**` : `${member}, ${pickMember} **не проводил** какие-либо мероприятия\nСервер: **${guild.name}**`,                          
                    thumbnail: { url: await getAvatar (pickMember) } 
                }
            ]
        }).catch(() => {});


        async function getMessage (page) {

            let fields = [];

            for (let id = ( page - 1 ) * 10; id < eventsOfGo.length; id++) {
    
                if (id == ( ( page - 1 ) * 10 ) + 10 ) break;
    
                let eventsOfFetch = eventsOfGo[id];
                
                if (!eventsOfFetch) {

                    fields.push(
                        {
                            name: `${id+1}) Неизвестный`,
                            value: `-# Пусто`,
                            inline: false
                        }
                    );

                }

                else {

                    let eventOfMember = users[pickMember.id].Events.find(pickEvent => pickEvent.EventId == eventsOfFetch.EventId); 
    
                    if (eventOfMember) {
    
                        if (eventsOfFetch.type == 'event') {
                            
                            fields.push(
                                {
                                    name: `${id+1}) __${eventsOfFetch.Event.emoji}・${eventsOfFetch.Event.name}__ [<t:${Math.floor(eventOfMember.Created)}:f>]`,
                                    value: `・Продлилось: ${hourTranslatorBold(Math.floor(eventOfMember.Ended - eventOfMember.Created))} (https://discord.com/channels/${eventOfMember.message.log.guildId}/${eventOfMember.message.log.channelId}/${eventOfMember.message.log.id})\n-# ・Участников: ${eventsOfFetch.Online.length}`,
                                    inline: false
                                }
                            );
            
                        };
                        
                        if (eventsOfFetch.type == 'close') {
                            
                            fields.push(
                                {
                                    name: `${id+1}) __${eventsOfFetch.Event.emoji}・${eventsOfFetch.Event.name}__ [<t:${Math.floor(eventOfMember.Created)}:f>]`,
                                    value: `・Продлилось: ${hourTranslatorBold(Math.floor(eventOfMember.Ended - eventOfMember.Created))} (https://discord.com/channels/${eventOfMember.message.log.guildId}/${eventOfMember.message.log.channelId}/${eventOfMember.message.log.id})\n-# ・Было запущено: ${eventsOfFetch.started ? '**Да**' : '**Нет**'}`,
                                    inline: false
                                }
                            );
            
                        };
                        
                        if (eventsOfFetch.type == 'mafia') {
                            
                            fields.push(
                                {
                                    name: `${id+1}) __${eventsOfFetch.Event.emoji}・${eventsOfFetch.Event.name}__ [<t:${Math.floor(eventOfMember.Created)}:f>]`,
                                    value: `・Продлилось: ${hourTranslatorBold(Math.floor(eventOfMember.Ended - eventOfMember.Created))} (https://discord.com/channels/${eventOfMember.message.log.guildId}/${eventOfMember.message.log.channelId}/${eventOfMember.message.log.id})\n-# ・Было запущено: ${eventsOfFetch.started ? '**Да**' : '**Нет**'}`,
                                    inline: false
                                }
                            );
            
                        };
    
                    }
                    
                    else {

                        fields.push(
                            {
                                name: `${id+1}) Неизвестный`,
                                value: `-# Пусто`,
                                inline: false
                            }
                        );
                        
                    };

                };
    
            };

            if (!eventsOfGo[0]) 
            return {
                embeds: [
                    {
                        title: `${client.user.username} error`,
                        color: appearance.embed.errorColor,
                        description: pickMember.id == member.id ? `${member}, Вы **не проводили** какие-либо мероприятия${time == 'all' ? '' : time == 'day' ? ' **сегодня**' : time == 'week' ? ' **на** этой **недели**' : ''}. Сервер: **${guild.name}**` : `${member}, ${pickMember} **не проводил** какие-либо мероприятия ${time == 'all' ? '' : time == 'day' ? ' **сегодня**' : time == 'week' ? ' **на** этой **недели**' : ''}. Сервер: **${guild.name}**`,                          
                        thumbnail: { url: await getAvatar (pickMember) } 
                    }
                ], 
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 3,
                                customId: 'timeSelect', 
                                placeholder: 'Выберите необходимую категорию', 
                                minValues: 1, 
                                maxValues: 1, 
                                options: [
                                    {
                                        label: 'Все время',                       
                                        emoji: appearance.emoji.TimeType,     
                                        description: `Список проведенных мероприятий за все время`,
                                        value: 'all',
                                        default: time == 'all' 
                                    },
                                    {
                                        label: 'Неделя',  
                                        emoji: appearance.emoji.TimeType,
                                        description: `Список проведенных мероприятий за эту неделю`,
                                        value: 'week',
                                        default: time == 'week' 
                                    },
                                    {
                                        label: 'День', 
                                        emoji: appearance.emoji.TimeType,
                                        description: `Список проведенных мероприятий за этот день`,
                                        value: 'day',
                                        default: time == 'day' 
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };

            else return {
                embeds: [
                    {
                        title: `${client.user.username} leads`,
                        color: appearance.embed.color,
                        description: `Всего **проведено**: **${eventsOfGo.length}**\nВедущий: ${pickMember}`,
                        footer: { text: `・Страница: ${page} из ${Math.ceil(eventsOfGo.length / 10)}` },
                        thumbnail: { url: await getAvatar (pickMember) },
                        fields: fields
                    }
                ], 
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 3,
                                customId: 'timeSelect', 
                                placeholder: 'Выберите необходимую категорию', 
                                minValues: 1, 
                                maxValues: 1, 
                                options: [
                                    {
                                        label: 'Все время',                       
                                        emoji: appearance.emoji.TimeType,     
                                        description: `Список проведенных мероприятий за все время`,
                                        value: 'all',
                                        default: time == 'all' 
                                    },
                                    {
                                        label: 'Неделя',  
                                        emoji: appearance.emoji.TimeType,
                                        description: `Список проведенных мероприятий за эту неделю`,
                                        value: 'week',
                                        default: time == 'week' 
                                    },
                                    {
                                        label: 'День', 
                                        emoji: appearance.emoji.TimeType,
                                        description: `Список проведенных мероприятий за этот день`,
                                        value: 'day',
                                        default: time == 'day' 
                                    }
                                ]
                            }
                        ]
                    },
                    pageChange(page !== 1, false, page !== Math.ceil(eventsOfGo.length / 10), 'stats')
                ]
            };

        };
        
        interaction.reply(await getMessage (tempPage)).catch(() => {});
        
        let lastInt = Date.now() / 1000;
        const cheackLastInt = setInterval(async () => {
    
            if (lastInt + 100 - Date.now() / 1000 < 0) {
              
                await targetMessageEditComponents(interaction);
                return clearInterval(cheackLastInt);
    
            };
    
        }, 2000); 
    
        const collectorConponents = await channel.createMessageComponentCollector();
        collectorConponents.on('collect', async i => {
    
            if (!i.message.interaction || i.message.interaction.id !== interaction.id) return;
    
            lastInt = Date.now() / 1000;
            if (actions[i.customId] && actions[i.customId].all == true) return await actions[i.customId].actions[0](i);
    
            if (!i.member || i.member.id !== member.id) return;
    
            switch (i.customId) { 
    
                case 'timeSelect': { 
    
                    tempPage = 1;
                    time = i.values[0];
                    
                    eventsOfGo = [];
                    if (time == 'all') for (const pickEvent in users[pickMember.id].Events) eventsOfGo.push(guilds[users[pickMember.id].Events[pickEvent].EventId]);
                    if (time == 'week') for (const pickEvent in users[pickMember.id].Events) if (users[member.id].Events[pickEvent].Created > getCurrentWeekMondayUnixMSK ()) eventsOfGo.push(guilds[users[pickMember.id].Events[pickEvent].EventId]);
                    if (time == 'day') for (const pickEvent in users[pickMember.id].Events) if (users[member.id].Events[pickEvent].Created > getTodayStartUnixMSK()) eventsOfGo.push(guilds[users[pickMember.id].Events[pickEvent].EventId]);


                    i.update(await getMessage (tempPage)).catch(() => {});
                    
                    break;
    
                }
    
                case 'statsLeft': { 
    
                    tempPage -= 1;
                    if (tempPage <= 0) tempPage = 1;
                    
                    i.update(await getMessage (tempPage)).catch(() => {});
                    
                    break;
    
                }
    
                case 'statsRight': { 

                    tempPage++;
                    if (tempPage == 1) tempPage++;
                    if (tempPage > Math.ceil(eventsOfGo.length / 10)) tempPage = Math.ceil(eventsOfGo.length / 10);
                    
                    i.update(await getMessage (tempPage)).catch(() => {});
                    
                    break;
    
                }
    
            };
    
        });

    };

    if (argsF.subcommand == 'top') {

        await checkingForRoles (interaction, appearance.roles.Events.access);

        let time = 'all';
        let tempPage = 1;
        let top = [];

        function getCurrentWeekMondayUnixMSK() {
            
            const now = new Date();
            const currentDayOfWeek = now.getDay();
            const daysSinceThisMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
            
            const thisMonday = new Date(now);
            thisMonday.setDate(now.getDate() - daysSinceThisMonday);
            thisMonday.setHours(0, 0, 0, 0);
            
            return Math.floor(thisMonday.getTime() / 1000);

        };

        function getTodayStartUnixMSK() {
            
            const now = new Date();
            now.setHours(0, 0, 0, 0);

            return Math.floor(now.getTime() / 1000);
        };


        async function getTop () {

            let top = [];
            let membersOfTop = [];
            let rolesOfCheack = appearance.roles.Events.access;

            for (let pickRoleOfStaff of rolesOfCheack) {

                const frtchRole = await guild.roles.fetch(pickRoleOfStaff).catch(() => {});

                frtchRole.members.forEach(memberOfRole => {

                    if (!membersOfTop.includes(memberOfRole.id)) {

                        let quantity = 0; 
                        let quantityDay = 0; 
                        let quantityWeek = 0; 
                        checkingForAvailability (db, memberOfRole);
    
                        for (const pickEvent in users[memberOfRole.id].Events) quantity++;
                        for (const pickEvent in users[memberOfRole.id].Events) if (users[memberOfRole.id].Events[pickEvent].Created > getTodayStartUnixMSK()) quantityDay++;
                        for (const pickEvent in users[memberOfRole.id].Events) if (users[memberOfRole.id].Events[pickEvent].Created > getCurrentWeekMondayUnixMSK ()) quantityWeek++;
                
                        membersOfTop.push(memberOfRole.id);
                        top.push({id: memberOfRole.id, day: quantityDay, week: quantityWeek, all: quantity});

                    };
            
                });

            };

            return top;
           
        }; 

        async function sortTop () {

            if (time == 'all') top.sort((obj1, obj2) => obj2.all - obj1.all);
            if (time == 'day') top.sort((obj1, obj2) => obj2.day - obj1.day);
            if (time == 'week') top.sort((obj1, obj2) => obj2.week - obj1.week);

        };


        top = await getTop ();
        sortTop ();


        async function getMessage (page) {

            text = '';

            for (let id = ( page - 1 ) * 10; id < top.length; id++) {

                if (id == ( ( page - 1 ) * 10 ) + 10 ) break;

                let pickData = 0;
                if (time == 'all') pickData = top[id].all;
                else if (time == 'day') pickData = top[id].day;
                else if (time == 'week') pickData = top[id].week;

                text += `${appearance.emoji.Count[`N${id+1}`] ? appearance.emoji.Count[`N${id+1}`] : `**${id+1})**`} <@${top[id].id}> — **${pickData}**\n`

            };   

            if (!top[0])
            return {
                ephemeral: true,  
                embeds: [
                    {
                        title: `${client.user.username} error`,
                        color: appearance.embed.errorColor,
                        description: `${member}, топ пользователь **отсутствует**`,                          
                        thumbnail: { url: await getAvatar (pickMember) } 
                    }
                ],
                components: [
                    
                ]
            }; 

            else return {
                embeds: [
                    {
                        title: `${client.user.username} top`,
                        color: appearance.embed.color,
                        description: `${text !== '' ? text : 'Отсутствует'}`,
                        footer: { text: `・Страница: ${page} из ${Math.ceil(top.length / 10)}` },
                        thumbnail: { url: await getAvatar (member) }
                    }
                ], 
                components: [
                    {
                        type: 1,
                        components: [
                            {
                                type: 3,
                                customId: 'timeSelect', 
                                placeholder: 'Выберите необходимую категорию', 
                                minValues: 1, 
                                maxValues: 1, 
                                options: [
                                    {
                                        label: 'Все время',                       
                                        emoji: appearance.emoji.TimeType,     
                                        description: `Список проведенных мероприятий за все время`,
                                        value: 'all',
                                        default: time == 'all' 
                                    },
                                    {
                                        label: 'Неделя',  
                                        emoji: appearance.emoji.TimeType,
                                        description: `Список проведенных мероприятий за эту неделю`,
                                        value: 'week',
                                        default: time == 'week' 
                                    },
                                    {
                                        label: 'День', 
                                        emoji: appearance.emoji.TimeType,
                                        description: `Список проведенных мероприятий за этот день`,
                                        value: 'day',
                                        default: time == 'day' 
                                    }
                                ]
                            }
                        ]
                    },
                    pageChange(page !== 1, false, page !== Math.ceil(top.length / 10), 'top')
                ]
            }; 

        };

        interaction.reply(await getMessage (tempPage)).catch(() => {});
        
        let lastInt = Date.now() / 1000;
        const cheackLastInt = setInterval(async () => {
    
            if (lastInt + 100 - Date.now() / 1000 < 0) {
              
                await targetMessageEditComponents(interaction);
                return clearInterval(cheackLastInt);
    
            };
    
        }, 2000); 
    
        const collectorConponents = await channel.createMessageComponentCollector();
        collectorConponents.on('collect', async i => {
    
            if (!i.message.interaction || i.message.interaction.id !== interaction.id) return;
    
            lastInt = Date.now() / 1000;
            if (actions[i.customId] && actions[i.customId].all == true) return await actions[i.customId].actions[0](i);
    
            if (!i.member || i.member.id !== member.id) return;
    
            switch (i.customId) { 
    
                case 'timeSelect': { 
    
                    tempPage = 1;
                    time = i.values[0];
                    
                    top = await getTop ();
                    sortTop ();


                    i.update(await getMessage (tempPage)).catch(() => {});
                    
                    break;
    
                }
    
                case 'topLeft': { 
    
                    tempPage -= 1;
                    if (tempPage <= 0) tempPage = 1;
                    
                    i.update(await getMessage (tempPage)).catch(() => {});
                    
                    break;
    
                }
    
                case 'topRight': { 

                    tempPage++;
                    if (tempPage == 1) tempPage++;
                    if (tempPage > Math.ceil(top.length / 10)) tempPage = Math.ceil(top.length / 10);
                    
                    i.update(await getMessage (tempPage)).catch(() => {});
                    
                    break;
    
                }
    
            };
    
        });

    };
    

};

module.exports.names = ['root'];
module.exports.interaction = {

    name: 'root',
    description: 'Информация о ведущих мероприятий',
    options: [

        {

            name: 'event',
            description: 'Статистика по проведенным мероприятиям мероприятиям',
            type: 2,
            options: [
                {
        
                    name: 'leads',
                    description: 'Статистика по проведенным мероприятиям мероприятиям',
                    type: 1,
                    options: [
                        {
        
                            name: 'пользователь',
                            description: 'Тот, статистику кого вы хотите посмотреть',
                            required: false,
                            type: 6
        
                        }
                    ]
                },
                {

                    name: 'top',
                    description: 'Топ ведущих по проведенным мероприятиям',
                    options: [
                        
                    ],
        
                    type: 1
        
                }
            ]

        },

    ],

    defaultPermission: true

};
