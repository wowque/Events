module.exports = async (client, appearance, config, db, interaction) => {

    if (interaction.isCommand()) { 

        const argsF = {}; 
        argsF.slash = true;

        if (interaction.options._group) {
            argsF.group = interaction.options._group; 
        };

        if (interaction.options._subcommand) {
            argsF.subcommand = interaction.options._subcommand;
        };

        for (const it of interaction.options._hoistedOptions) {
            argsF[it.name] = it.value; 
        };

        const args = argsF;
        const CommandInteraction = await client.commands.get(interaction.commandName); 
        
        interaction.author = interaction.user;
        interaction.channel = client.channels.cache.get(interaction.channelId);
        interaction.guild = interaction.user.guild;

        if (CommandInteraction) {
            CommandInteraction(client, appearance, config, db, args, argsF, interaction).catch(err => console.error(err));  
        };
        
    };
    
};