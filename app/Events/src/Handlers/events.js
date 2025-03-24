const {readdirSync} = require('fs');


module.exports = async (client, appearance, config, db) => {

    const eventsFiles = readdirSync('./src/Events');
    console.log(`\x1b[32m[HANDLER]\x1b[0m Приложение: '\x1b[32m${client.user.tag} Handlers\x1b[0m' Events started!`);


    for (const file of eventsFiles) {

        const eventNamedefault = file;
        const eventName = eventNamedefault.replace('.js', '');
        const evtpath = `../Events/${file}`;

        switch (eventName) {

            case 'ready': {

                const eventtype = 'ready';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                require(evtpath)(client, appearance, config, db);
                break;

            };

            case 'messageCreate': {

                const eventtype = 'messageCreate';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (message) => require(evtpath)(client, appearance, config, db, message));
                break;

            };

            case 'guildCreate': {

                const eventtype = 'guildCreate';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (guild) => require(evtpath)(client, appearance, config, db, guild));
                break;

            };

            case 'guildDelete': {
                const eventtype = 'guildDelete';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (guild) => require(evtpath)(client, appearance, config, db, guild));
                break;
            };

            case 'GuildMemberAdd': {

                const eventtype = 'GuildMemberAdd';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (member) => require(evtpath)(client, appearance, config, db, member));
                break;

            };

            case 'GuildMemberRemove': {

                const eventtype = 'GuildMemberRemove';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (member) => require(evtpath)(client, appearance, config, db, member));
                break;

            };

            case 'voiceStateUpdate': {

                const eventtype = 'voiceStateUpdate';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (oldState, newState) => require(evtpath)(client, appearance, config, db, oldState, newState));
                break;

            };

            case 'messageDelete': {

                const eventtype = 'messageDelete';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (message) => require(evtpath)(client, appearance, config, db, message));
                break;

            };

            case 'messageUpdate': {

                const eventtype = 'messageUpdate';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (oldMessage, newMessage) => require(evtpath)(client, appearance, config, db, oldMessage, newMessage));
                break;

            };

            case 'roleCreate': {

                const eventtype = 'roleCreate';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (role) => require(evtpath)(client, appearance, config, db, role));
                break;

            };

            case 'roleDelete': {

                const eventtype = 'roleDelete';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (role) => require(evtpath)(client, appearance, config, db, role));
                break;

            };

            case 'roleUpdate': {

                const eventtype = 'roleUpdate';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (oldRole, newRole) => require(evtpath)(client, appearance, config, db, oldRole, newRole));
                break;

            };

            case 'channelCreate': {

                const eventtype = 'channelCreate';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (channel) => require(evtpath)(client, appearance, config, db, channel));
                break;

            };

            case 'channelDelete': {

                const eventtype = 'channelDelete';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (channel) => require(evtpath)(client, appearance, config, db, channel));
                break;

            };

            case 'channelUpdate': {

                const eventtype = 'channelUpdate';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (oldChannel, newChannel) => require(evtpath)(client, appearance, config, db, oldChannel, newChannel));
                break;

            };

            case 'guildUpdate': {

                const eventtype = 'guildUpdate';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (oldGuild, newGuild) => require(evtpath)(client, appearance, config, db, oldGuild, newGuild));
                break;

            };

            case 'guildBanAdd': {

                const eventtype = 'guildBanAdd';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (guild, user) => require(evtpath)(client, appearance, config, db, guild, user));
                break;

            };

            case 'guildBanRemove': {

                const eventtype = 'guildBanRemove';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (guild, user) => require(evtpath)(client, appearance, config, db, guild, user));
                break;

            };

            case 'GuildMemberUpdate': {

                const eventtype = 'GuildMemberUpdate';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (oldMember, newMember) => require(evtpath)(client, appearance, config, db, oldMember, newMember));
                break;

            };

            case 'GuildMemberSpeaking': {

                const eventtype = 'GuildMemberSpeaking';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (member, speaking) => require(evtpath)(client, appearance, config, db, member, speaking));
                break;

            };

            case 'guildUnavailable': {

                const eventtype = 'guildUnavailable';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (guild) => require(evtpath)(client, appearance, config, db, guild));
                break;

            };

            case 'guildIntegrationsUpdate': {

                const eventtype = 'guildIntegrationsUpdate';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (guild) => require(evtpath)(client, appearance, config, db, guild));
                break;

            };

            case 'webhookUpdate': {

                const eventtype = 'webhookUpdate';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (channel) => require(evtpath)(client, appearance, config, db, channel));
                break;

            };

            case 'stickerUpdate': {
                
                const eventtype = 'stickerUpdate';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (oldSticker, newSticker) => require(evtpath)(client, appearance, config, db, oldSticker, newSticker));
                break;

            };
            
            case 'interactionCreate': {

                const eventtype = 'interactionCreate';
                console.log(`\x1b[32m[HANDLER]\x1b[0m Events: \x1b[32m${file}\x1b[0m started! Initialization: ${eventtype}`);
                client.on(eventtype, (interaction) => require(evtpath)(client, appearance, config, db, interaction));
                break;

            };
            
            default: {

                console.log(`\x1b[33m[WARN]\x1b[0m Unknown event: ${file}`);
                break;

            };
            
        };
    };
    
};