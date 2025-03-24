const guildСonfig = require('../../../../guild.json');  
const { customButton, buttonsYesNo, menuChannel, pageChange, menuUser, menuRole } = require('../Structure/buttonGenerator.js');


module.exports = async (client, appearance, config) => {
    
    // Перезагрузка команд
    // async function deleteGlobalSlashCommands() {

    //     await client.application.commands.set([])
    //         .then(() => { 
    //             console.log(`\x1b[32m[RESET]\x1b[0m Команды: \x1b[32m${client.user.tag}\x1b[0m перезагружены;`)
    //         })
    //         .catch(error => {
    //             console.error('\x1b[31m[RESET ERROR]\x1b[0m Ошибка при перезагружены команд:', error);
    //         });
            
    // };

    // deleteGlobalSlashCommands();


    // Сбор и обработка команд⟬⟭
    setTimeout(async () => {
        const commandsIT = client.application.commands;
        await commandsIT.fetch(); 
    
        for (const command of client.commands.any) {
            if (command.interaction) { 
    
                const interaction = await commandsIT.cache.find(com => com.name == command.interaction.name); 
    
                if (!interaction) { 
    
                    commandsIT.create(command.interaction); 
    
                } else if (JSON.stringify(interaction.options) !== JSON.stringify(command.interaction.options)) {
    
                    interaction.edit(command.interaction); 
    
                };
    
            };
            
        };
    }, 2000)

};