const moment = require('moment');
const appearance = require('../../../../appearance.json'); 
const { getAvatar } = require('../Structure/getAttribute.js');
const { makeid } = require('../Structure/numbersGenerator.js');
const { hourTranslator } = require('../Structure/timeManage.js');
const { errorEmbed } = require('../Structure/embedGenerator.js');


function checkingForNumber(value) {

    return  isFinite(value) && value === parseInt(value, 10);

};

async function сheckingForAchievements (client, appearance, db, member, type, count) { 

    const { users, achievements, online, timeout, customs, transactions, loving, cases, guilds, invites } = db;
    const idAchievementsMember = member.id;

    const memberAchievements = achievements[member.id].All;
    for (let pickAchievements = 0; pickAchievements < memberAchievements.length; pickAchievements++) {
        
        if (memberAchievements[pickAchievements].Info.done == false) {
            
            if (memberAchievements[pickAchievements].Info.necessary <= memberAchievements[pickAchievements].Info.exists) {

                achievements[member.id].Last = Date.now()/1000;
                memberAchievements[pickAchievements].Info.exists = memberAchievements[pickAchievements].Info.necessary;
                memberAchievements[pickAchievements].Info.done = true;

                const makeIdTransactionWinMember = makeid(30);
                transactions[makeIdTransactionWinMember] = {

                    Type: 'plus',
                    Member: member.id,
                    Count: memberAchievements[pickAchievements].Reward,
                    Description: `Выполнение достижения ${memberAchievements[pickAchievements].Name}`,
                    Date: Date.now() / 1000

                }

                const transactionsListAllWinMember = transactions[member.id].List.All;
                const transactionsListRefillsWinMember = transactions[member.id].List.Refills;

                transactionsListAllWinMember.unshift(makeIdTransactionWinMember);
                transactionsListRefillsWinMember.unshift(makeIdTransactionWinMember);

                transactions[member.id].List.All = transactionsListAllWinMember;
                transactions[member.id].List.Refills = transactionsListRefillsWinMember;

                users[member.id].Balance.Coins += memberAchievements[pickAchievements].Reward;

                if (achievements[member.id].Notifications) member.send({
                    embeds: [
                        {
                            title: `${client.user.username} achievements`,
                            color: appearance.embed.color,
                            description: `${member}, Вы **успешно** выполнили достижение **${memberAchievements[pickAchievements].Name}**, за выполнение **достижения** Вы получили **${memberAchievements[pickAchievements].Reward}** ${appearance.emoji.Coin}`,
                            thumbnail: { url: await getAvatar(member) }
                        }
                    ], 
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    type: 2, 
                                    emoji: appearance.emoji.Message, 
                                    style: appearance.buttons_menu.Default.style, 
                                    label: 'Уведомления', 
                                    customId: 'notif',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                }).catch(() => {});

            };

            if (type) {

                if (memberAchievements[pickAchievements].Info.type == type) {
                    
                    memberAchievements[pickAchievements].Info.exists =+ count;
        
                    if (memberAchievements[pickAchievements].Info.necessary <= memberAchievements[pickAchievements].Info.exists) {
        
                        achievements[member.id].Last = Date.now()/1000;
                        memberAchievements[pickAchievements].Info.exists = memberAchievements[pickAchievements].Info.necessary;
                        memberAchievements[pickAchievements].Info.done = true;
    
                        const makeIdTransactionWinMember = makeid(30);
                        transactions[makeIdTransactionWinMember] = {
        
                            Type: 'plus',
                            Member: member.id,
                            Count: memberAchievements[pickAchievements].Reward,
                            Description: `Выполнение достижения ${memberAchievements[pickAchievements].Name}`,
                            Date: Date.now() / 1000
        
                        }
        
                        const transactionsListAllWinMember = transactions[member.id].List.All;
                        const transactionsListRefillsWinMember = transactions[member.id].List.Refills;
        
                        transactionsListAllWinMember.unshift(makeIdTransactionWinMember);
                        transactionsListRefillsWinMember.unshift(makeIdTransactionWinMember);
        
                        transactions[member.id].List.All = transactionsListAllWinMember;
                        transactions[member.id].List.Refills = transactionsListRefillsWinMember;
    
                        users[member.id].Balance.Coins += memberAchievements[pickAchievements].Reward;
    
                        if (achievements[member.id].Notifications) member.send({
                            embeds: [
                                {
                                    title: `${client.user.username} achievements`,
                                    color: appearance.embed.color,
                                    description: `${member}, Вы **успешно** выполнили достижение **${memberAchievements[pickAchievements].Name}**, за выполнение **достижения** Вы получили **${memberAchievements[pickAchievements].Reward}** ${appearance.emoji.Coin}`,
                                    thumbnail: { url: await getAvatar(member) }
                                }
                            ], 
                            components: [
                                {
                                    type: 1,
                                    components: [
                                        {
                                            type: 1,
                                            components: [
                                                {
                                                    type: 2, 
                                                    emoji: appearance.emoji.Message, 
                                                    style: appearance.buttons_menu.Default.style, 
                                                    label: 'Уведомления', 
                                                    customId: 'notif',
                                                    disabled: true
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }).catch(() => {});
        
                    };
                };

            };

        };

        if (memberAchievements[pickAchievements].Info.exists == true) {

            if (memberAchievements[pickAchievements].Info.necessary <= eval(memberAchievements[pickAchievements].Info.db)) {

                achievements[member.id].Last = Date.now()/1000;
                memberAchievements[pickAchievements].Info.exists = memberAchievements[pickAchievements].Info.necessary;
                memberAchievements[pickAchievements].Info.done = true;
            
                const makeIdTransactionWinMember = makeid(30);
                transactions[makeIdTransactionWinMember] = {

                    Type: 'plus',
                    Member: member.id,
                    Count: memberAchievements[pickAchievements].Reward,
                    Description: `Выполнение достижения ${memberAchievements[pickAchievements].Name}`,
                    Date: Date.now() / 1000

                };

                const transactionsListAllWinMember = transactions[member.id].List.All;
                const transactionsListRefillsWinMember = transactions[member.id].List.Refills;

                transactionsListAllWinMember.unshift(makeIdTransactionWinMember);
                transactionsListRefillsWinMember.unshift(makeIdTransactionWinMember);

                transactions[member.id].List.All = transactionsListAllWinMember;
                transactions[member.id].List.Refills = transactionsListRefillsWinMember;

                users[member.id].Balance.Coins += memberAchievements[pickAchievements].Reward;

                if (achievements[member.id].Notifications) member.send({
                    embeds: [
                        {
                            title: `${client.user.username} achievements`,
                            color: appearance.embed.color,
                            description: `${member}, Вы **успешно** выполнили достижение **${memberAchievements[pickAchievements].Name}**, за выполнение **достижения** Вы получили **${memberAchievements[pickAchievements].Reward}** ${appearance.emoji.Coin}`,
                            thumbnail: { url: await getAvatar(member) }
                        }
                    ], 
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    type: 2, 
                                    emoji: appearance.emoji.Message, 
                                    style: appearance.buttons_menu.Default.style, 
                                    label: 'Уведомления', 
                                    customId: 'notif',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                }).catch(() => {});

            };

        };

    };

};

async function сheckingForTimeout (client, db, member, interaction, time) { 

    const { users, online, timeout, customs, transactions, loving, cases, guilds  } = db;

    const commandTime = Date.now() / 1000;
    const lerindTime = Math.floor(timeout[member.id].UsingCommands.Next - commandTime);

    if ((timeout[member.id].UsingCommands.Next - commandTime) > 0 && hourTranslator(lerindTime) !== '**0** сек.') {

        interaction.reply({
            ephemeral: true,
            embeds: [
                await errorEmbed (client, member, `Вы **превысили** лимит использования **команд** ${client.user}, **повторите** попытку еще раз <t:${Math.floor(Date.now() / 1000 + lerindTime)}:R>`)
            ], 
            components: [
    
            ]
        }).catch(() => {});


        return true; 

    };

    timeout[member.id].UsingCommands.Next = (commandTime + time);
    timeout[member.id].UsingCommands.LastCommand = `/${interaction.commandName}`;
    timeout[member.id].UsingCommands.Lost = commandTime;

};

async function checkingForBot (client, member, pickMember, interaction) { 

    if (pickMember.user.bot) 
    return interaction.reply({
        ephemeral: true,
        embeds: [
            await errorEmbed (client, member, `**данную** команду, Вы **не можете** использовать на боте ${pickMember}`)
        ], 
        components: [

        ]
    }).catch(() => {});

};

function checkingForAvailabilityGuild (db, guild) { 

    const configDbList = {
        "users": {
            "type": "member",
            "zeroing": false,
            "path": "./../../db/Events/users.json",
            "pathBackup": "./../../db/Events/BACKUP/users.json",
            "scheme": {
                "Events": [],
                "ActiveEvent": false
            }
        },
        "guilds": {
            "type": "guild",
            "zeroing": false,
            "path": "./../../db/Events/guilds.json",
            "pathBackup": "./../../db/Events/BACKUP/guilds.json",
            "scheme": {
                "Events": {
                    "Active": [],
                    "Last": []
                },
                "Punishments": []
            }
        },
        "stats": {
            "type": "member",
            "zeroing": false,
            "path": "./../../db/Events/stats.json",
            "pathBackup": "./../../db/Events/BACKUP/stats.json",
            "scheme": {
                "Mafia": {
                    "Городская": {
                        "rating": 1500,
                        "all": 0,
                        "win": 0,
                        "games": [],
                        "roles": {
                            "Мирный житель": {
                                "all": 0,
                                "win": 0
                            },
                            "Шериф": {
                                "all": 0,
                                "win": 0
                            },
                            "Доктор": {
                                "all": 0,
                                "win": 0
                            },
                            "Дон": {
                                "all": 0,
                                "win": 0
                            },
                            "Мафия": {
                                "all": 0,
                                "win": 0
                            }
                        }
                    },
                    "Классическая": {
                        "rating": 1500,
                        "all": 0,
                        "win": 0,
                        "games": [],
                        "roles": {
                            "Мирный житель": {
                                "all": 0,
                                "win": 0
                            },
                            "Шериф": {
                                "all": 0,
                                "win": 0
                            },
                            "Дон": {
                                "all": 0,
                                "win": 0
                            },
                            "Мафия": {
                                "all": 0,
                                "win": 0
                            }
                        }
                    }
                },
                "Close": {},
                "Punishments": []
            }
        }
    };

    for (const DataBase in db) {

        const dbMain = db[DataBase.toString()];

        if(configDbList[DataBase.toString()].type == 'guild') {

            if (!dbMain[guild.id]) dbMain[guild.id] = configDbList[DataBase.toString()].scheme;

        };

    };

    return;

};

async function checkingForRoles (i, roles) { 

    let rolesTxt = '';
    let memberIfRole = false;
    const memberRoles = i.member._roles;

    for (let a = 0; a < memberRoles.length; a++) if(roles.includes(memberRoles[a])) memberIfRole = true;
    for (let a = 0; a < roles.length; a++) rolesTxt += ` <@&${roles[a]}>`;
        
    if (!memberIfRole) 
    return i.reply({
        ephemeral: true,  
        embeds: [
            {
                title: `${i.client.user.username} error`,
                color: appearance.embed.errorColor,
                description: `${i.member}, Данную команду могут **использовать** только пользователи с **ролью**:${rolesTxt}`,                          
                thumbnail: { url: await getAvatar (i.member) } 
            }
        ]
    }).catch(() => {});

    return true;

};

function checkingForAvailability (db, member) { 

    const configDbList = {
        "users": {
            "type": "member",
            "zeroing": false,
            "path": "./../../db/Events/users.json",
            "pathBackup": "./../../db/Events/BACKUP/users.json",
            "scheme": {
                "Events": [],
                "ActiveEvent": false
            }
        },
        "guilds": {
            "type": "guild",
            "zeroing": false,
            "path": "./../../db/Events/guilds.json",
            "pathBackup": "./../../db/Events/BACKUP/guilds.json",
            "scheme": {
                "Events": {
                    "Active": [],
                    "Last": []
                },
                "Punishments": []
            }
        },
        "stats": {
            "type": "member",
            "zeroing": false,
            "path": "./../../db/Events/stats.json",
            "pathBackup": "./../../db/Events/BACKUP/stats.json",
            "scheme": {
                "Mafia": {
                    "Городская": {
                        "rating": 1500,
                        "all": 0,
                        "win": 0,
                        "games": [],
                        "roles": {
                            "Мирный житель": {
                                "all": 0,
                                "win": 0
                            },
                            "Шериф": {
                                "all": 0,
                                "win": 0
                            },
                            "Доктор": {
                                "all": 0,
                                "win": 0
                            },
                            "Дон": {
                                "all": 0,
                                "win": 0
                            },
                            "Мафия": {
                                "all": 0,
                                "win": 0
                            }
                        }
                    },
                    "Классическая": {
                        "rating": 1500,
                        "all": 0,
                        "win": 0,
                        "games": [],
                        "roles": {
                            "Мирный житель": {
                                "all": 0,
                                "win": 0
                            },
                            "Шериф": {
                                "all": 0,
                                "win": 0
                            },
                            "Дон": {
                                "all": 0,
                                "win": 0
                            },
                            "Мафия": {
                                "all": 0,
                                "win": 0
                            }
                        }
                    }
                },
                "Close": {},
                "Punishments": []
            }
        }
    };

    for (const DataBase in db) {

        const dbMain = db[DataBase.toString()];
        if(configDbList[DataBase.toString()].type == 'member') {

            if (!dbMain[member.id]) dbMain[member.id] = configDbList[DataBase.toString()].scheme;

        };

        if(configDbList[DataBase.toString()].type == 'guild') {

            if (!dbMain[member.guild.id]) dbMain[member.guild.id] = configDbList[DataBase.toString()].scheme;

        };

    };

    return;

};

async function сheckingForOnline (db, member) { 
    
    const { users, achievements, online, timeout, customs, transactions, loving, cases, guilds, invites } = db;

    const today = new Date();
    const comandtime = Date.now() / 1000;
    const tomor = comandtime + ( 24 * 60 * 60 );

    const lastTime = tomor - ( today.getHours() * 60 * 60 + today.getMinutes() * 60 );

    const endOfWeek = moment().endOf('week').toDate();
    const lastDay = ( endOfWeek.getTime() / 1000 ) + ( 24 * 60 * 60 );
    
    checkingForAvailability (db, member);

    if((online[member.id].Day.Zeroing - comandtime) < 0) {

        online[member.id].Day.Count = 0;
        online[member.id].Day.Zeroing = lastTime;
        online[member.id].Day.History = [];
        
    };

    if((online[member.id].Week.Zeroing - comandtime) < 0) {

        online[member.id].Week.Count = 0;
        online[member.id].Week.Zeroing = lastDay;
        online[member.id].Week.History = [];
    };

};

function checkingForValidImageURL (url) {

    result = false;
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', 'IMG', 'images', 'discordapp.com', 'discordapp.net', 'attachments', 'media'];

    for (let i = 0; i < allowedExtensions.length; i++) {

        if (result == true) break;
        if (url.includes(allowedExtensions[i])) result = true;

    };

    return result;

};

function checkingForCommonElement(a, b) {

    if (!Array.isArray(a) || !Array.isArray(b)) return false;
  
    const uniqueElements = new Set(a);
    for (const element of b) if (uniqueElements.has(element)) return true;

    return false;

}

module.exports.checkingForNumber= checkingForNumber;
module.exports.checkingForBot = checkingForBot;
module.exports.checkingForRoles = checkingForRoles;
module.exports.сheckingForOnline = сheckingForOnline;
module.exports.сheckingForTimeout = сheckingForTimeout;
module.exports.checkingForAvailability = checkingForAvailability;
module.exports.сheckingForAchievements = сheckingForAchievements;
module.exports.checkingForValidImageURL = checkingForValidImageURL;
module.exports.checkingForCommonElement = checkingForCommonElement;
module.exports.checkingForAvailabilityGuild = checkingForAvailabilityGuild;