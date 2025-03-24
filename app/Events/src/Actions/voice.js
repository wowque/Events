module.exports = async (client, appearance, config, db, oldState, newState) => {

    const { guild } = newState;
    const { users, guilds } = db;

    if(newState && guilds[newState.channelId] && !guilds[guilds[newState.channelId].id].deleted && guilds[guilds[newState.channelId].id].Event.type == 'event') {

        if (guilds[guilds[newState.channelId].id].Owner == newState.id) return;
        const newChannelFetch = await guild.channels.fetch(guilds[guilds[newState.channelId].id].channels.info).catch(() => {});

        newChannelFetch.permissionOverwrites.edit(newState.id, { SendMessages: true }).catch(() => {});

    };

    if(oldState.channelId !== newState.channelId && guilds[oldState.channelId] && !guilds[guilds[oldState.channelId].id].deleted && guilds[guilds[oldState.channelId].id].Event.type == 'event') {

        if (guilds[guilds[oldState.channelId].id].Owner == oldState.id) return;
        const newChannelFetch = await guild.channels.fetch(guilds[guilds[oldState.channelId].id].channels.info).catch(() => {});

        newChannelFetch.permissionOverwrites.edit(oldState.id, { SendMessages: false }).catch(() => {});

    };

};