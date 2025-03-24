const { checkingForAvailability } = require('../Structure/checkingFor');


module.exports = async (client, appearance, config, db) => {

    const guild = await client.guilds.fetch(appearance.guild);
    const { users, guilds } = db;


    async function checkActiveMembers () {

        for (const channel of guild.channels.cache) {

            if(channel[1].type == 2) {

                const channelMembers = channel[1].members;
                for (const member of channelMembers) {
                
                    if (!member[1].user.bot) {

                        checkingForAvailability (db, member[1]);

                        if(guilds[member[1].voice.channelId] && !guilds[guilds[member[1].voice.channelId].id].deleted && guilds[guilds[member[1].voice.channelId].id].Event.type == 'event') {
                    
                            if (!guilds[member[1].voice.channelId].online[member[1].id]) guilds[member[1].voice.channelId].online[member[1].id] = 0; 
                            guilds[member[1].voice.channelId].online[member[1].id] += 2;

                        };

                    };
            
                };

            };
            
        };

    };

    setInterval(async () => {

        await checkActiveMembers ();

    }, 2000);

};