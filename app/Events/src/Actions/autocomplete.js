const { getCurrentDateTime } = require('../Structure/timeManage.js');


module.exports = async (client, appearance, config, db, interaction) => {

    const { users, guilds } = db;

    if (!interaction.isAutocomplete()) return;
    
    if (interaction.commandName == 'event') {

        if (interaction.options._subcommand == 'delete') {
            
            if (interaction.options._hoistedOptions[interaction.options._hoistedOptions.length - 1].name == 'мероприятие' && guilds[appearance.guild]) {

                let productsListMass = [];
                const activeEvents = guilds[appearance.guild].Events.Active;
                const guild = await client.guilds.fetch(appearance.guild).catch(() => {});

                for (const pickEvent in activeEvents) {
                    
                    if (guild) {

                        const memberOfOwnerEvent = await guild.members.fetch(guilds[activeEvents[pickEvent]].Owner).catch(() => {});

                        if (memberOfOwnerEvent) {

                            productsListMass.push({ name: guilds[activeEvents[pickEvent]].Event.name + ` (Ведущий: ${memberOfOwnerEvent.displayName}) — ${getCurrentDateTime (guilds[activeEvents[pickEvent]].Created)}`, value: activeEvents[pickEvent] });

                        };
    
                    };

                };

                const focusedValue = interaction.options.getFocused();
                productsListMass = productsListMass.filter(event => event.name.toLowerCase().includes(focusedValue.toLowerCase()));
                productsListMass = productsListMass.slice(0, 25);

                await interaction.respond(productsListMass).catch(() => {});
            
            }; 

        };  

        if (interaction.options._subcommand == 'transfer') {
            
            if (interaction.options._hoistedOptions[interaction.options._hoistedOptions.length - 1].name == 'мероприятие' && guilds[appearance.guild]) {

                let productsListMass = [];
                const activeEvents = guilds[appearance.guild].Events.Active;
                const guild = await client.guilds.fetch(appearance.guild).catch(() => {});

                for (const pickEvent in activeEvents) {
                    
                    if (guild) {

                        const memberOfOwnerEvent = await guild.members.fetch(guilds[activeEvents[pickEvent]].Owner).catch(() => {});

                        if (memberOfOwnerEvent) {

                            productsListMass.push({ name: guilds[activeEvents[pickEvent]].Event.name + ` (Ведущий: ${memberOfOwnerEvent.displayName}) — ${getCurrentDateTime (guilds[activeEvents[pickEvent]].Created)}`, value: activeEvents[pickEvent] });

                        };
    
                    };

                };

                const focusedValue = interaction.options.getFocused();
                productsListMass = productsListMass.filter(event => event.name.toLowerCase().includes(focusedValue.toLowerCase()));
                productsListMass = productsListMass.slice(0, 25);

                await interaction.respond(productsListMass).catch(() => {});
            
            }; 

        }; 

        if (interaction.options._subcommand == 'create') {
            
            let productsListMass = [];

            for (const pickCategory in appearance.custom.Events.list) for (const pickEvent in appearance.custom.Events.list[pickCategory].list) productsListMass.push({ name: `${appearance.custom.Events.list[pickCategory].emoji}・${appearance.custom.Events.list[pickCategory].name} — ${appearance.custom.Events.list[pickCategory].list[pickEvent].emoji}・${appearance.custom.Events.list[pickCategory].list[pickEvent].name}`, value: appearance.custom.Events.list[pickCategory].list[pickEvent].name });

            const focusedValue = interaction.options.getFocused();
            productsListMass = productsListMass.filter(event => event.value.toLowerCase().includes(focusedValue.toLowerCase()));
            productsListMass = productsListMass.slice(0, 25);

            await interaction.respond(productsListMass).catch(() => {});
            
        }; 

        if (interaction.options._subcommand == 'ban') {
            
            let productsListMass = [];

            for (const pickPunishment in appearance.custom.Events.punishment) {

                const guild = await client.guilds.fetch(appearance.guild).catch(() => {});
                const roleOfPickPunishment = await guild.roles.fetch(pickPunishment).catch(() => {});
                if (roleOfPickPunishment) productsListMass.push({ name: '@' + roleOfPickPunishment.name + ' — ' + appearance.custom.Events.punishment[pickPunishment].name, value: pickPunishment });

            }; 

            const focusedValue = interaction.options.getFocused();
            productsListMass = productsListMass.filter(event => event.name.toLowerCase().includes(focusedValue.toLowerCase()));
            productsListMass = productsListMass.slice(0, 25);

            await interaction.respond(productsListMass).catch(() => {});
            

        }; 

        if (interaction.options._subcommand == 'unban') {
            
            let productsListMass = [];

            for (const pickPunishment in appearance.custom.Events.punishment) {

                const guild = await client.guilds.fetch(appearance.guild).catch(() => {});
                const roleOfPickPunishment = await guild.roles.fetch(pickPunishment).catch(() => {});
                if (roleOfPickPunishment) productsListMass.push({ name: '@' + roleOfPickPunishment.name + ' — ' + appearance.custom.Events.punishment[pickPunishment].name, value: pickPunishment });

            }; 

            const focusedValue = interaction.options.getFocused();
            productsListMass = productsListMass.filter(event => event.name.toLowerCase().includes(focusedValue.toLowerCase()));
            productsListMass = productsListMass.slice(0, 25);

            await interaction.respond(productsListMass).catch(() => {});
            

        }; 

    };

};