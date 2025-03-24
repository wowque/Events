const guildСonfig = require('../../../../guild.json');  
const { customButton, buttonsYesNo, menuChannel, pageChange, menuUser, menuRole } = require('../Structure/buttonGenerator.js');

module.exports = async (client, appearance, config, db, message) => {

    const { member, channel, guild, content } = message;
    const botAvatar = await client.user.avatarURL({ dynamic: true, size: 512 });

    const messageArray = content.split(' ');
    const command = messageArray[0].replace(config.main.prefix, '');
    const args = messageArray.slice(1);
    const messageArrayFull = content.split(' '); 
    const argsF = messageArrayFull.slice(1);

    const developersList = guildСonfig.developers;
    if(!developersList.includes(member.id)) {
        return message.delete().catch(() => {});
    };

    if(args[0].replace('<@', '').replace('>', '') == client.user.id || args[0] == client.user.id) {

        message.delete();
        channel.send({
            embeds: [
                {
                    author: {
                        name: '(◕‿◕) Developer Menu',
                        icon_url: 'https://media.discordapp.net/attachments/1115273917112799323/1122135199673749514/Frame_25.png?width=675&height=675'
                    },
                    title: `${client.user.username} developerMenu`,
                    description: `\n📡 **Restarting** bot: \`${client.user.tag}\`\n🛡️ **Websocket(Host)** heartbeat: **${client.ws.ping}ms**.\n\n👥 Developer: ${member};`,
                    color: 3224376,
                    thumbnail: { url: botAvatar },
                    footer: {
                        text: `・Guild: ${guild.name}`,
                        icon_url: guild.iconURL({ dynamic: true, size: 512 })
                    },
                }
            ],
            components: [
                customButton(2, `${client.user.username} restarting`, '📶', 'ping', false)
            ]
        });

        setTimeout(() => {
            process.exit(1);
        }, 1000);

    };

};