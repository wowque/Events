const { readdirSync } = require('fs');


module.exports = (client, appearance, config, db) => {

    const actionsFiles = readdirSync('./src/Actions', (error) => {
        if (error) {
            console.error('\x1b[32m[HANDLER]\x1b[0m\x1b[31m[ERROR]\x1b[0m Ошибка при readdirSync:', error);
        }
        if (!error) {
            console.log(`\x1b[32m[HANDLER]\x1b[0m Приложение: '\x1b[32m${client.user.tag} Handlers\x1b[0m' Actions started!`);
        }
    })
    
        
    for (const file of actionsFiles) {
        
        const actionNamedefault = file;
        const evtpath = `../Actions/${file}`;
        const actionName = actionNamedefault.replace('.js', '');
        
        switch (actionName) {
            
            case 'autocomplete': {

                console.log(`\x1b[32m[HANDLER]\x1b[0m Actions: \x1b[32m${file}\x1b[0m started!`);
                client.on('interactionCreate', (interaction) => require(evtpath)(client, appearance, config, db, interaction));
                break;

            };

            case 'invite': {

                console.log(`\x1b[32m[HANDLER]\x1b[0m Actions: \x1b[32m${file}\x1b[0m started!`);
                client.on('guildMemberAdd', (member) => require(evtpath)(client, appearance, config, db, member));
                break;

            };

            case 'voice': {

                console.log(`\x1b[32m[HANDLER]\x1b[0m Actions: \x1b[32m${file}\x1b[0m started!`);
                client.on('voiceStateUpdate', (oldState, newState) => require(evtpath)(client, appearance, config, db, oldState, newState));
                break;

            };

            case 'message': {

                console.log(`\x1b[32m[HANDLER]\x1b[0m Actions: \x1b[32m${file}\x1b[0m started!`);
                client.on('messageCreate', (message) => require(evtpath)(client, appearance, config, db, message));
                break;

            };

            case 'components': {

                console.log(`\x1b[32m[HANDLER]\x1b[0m Actions: \x1b[32m${file}\x1b[0m started!`);
                client.on('interactionCreate', (interaction) => require(evtpath)(client, appearance, config, db, interaction));
                break;

            };
            
            default: {

                require(evtpath)(client, appearance, config, db);
                console.log(`\x1b[32m[HANDLER]\x1b[0m Actions: \x1b[32m${file}\x1b[0m started!`);

                setTimeout(() => {

                    const mainactions = config.main.action
                    if (mainactions.includes(actionName)) {
                        console.log(`\x1b[32m[MAIN ACTIONS]\x1b[0m Запущено.`);
                    };
                    
                }, 2000);

                break;

            };
            
        };
    };
    
};