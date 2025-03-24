const guildСonfig = require('../../../../guild.json');  
const { getAvatar } = require('../Structure/getAttribute.js');
const { customButton } = require('../Structure/buttonGenerator.js');


module.exports = async (client, appearance, config, db, interaction) => {
    
    if (interaction.isStringSelectMenu() || interaction.isUserSelectMenu() || interaction.isRoleSelectMenu() || interaction.isMentionableSelectMenu() ||  interaction.isChannelSelectMenu() || interaction.isButton()) {
        
        const { customId } = interaction;
        const { users, achievements, online, timeout, customs, transactions, loving, cases, guilds, invites } = db;

        const botAvatar = await client.user.avatarURL({ dynamic: true, size: 512 });

        switch (customId) { 

            case 'activePostcard': {

                const parameters = customs[interaction.message.id];
                const memberAvatar = await getAvatar(interaction.user);

                interaction.update({
                    content: ' ',
                    embeds: [
                        {
                            title: `${client.user.username} postcard`,
                            color: appearance.embed.color,
                            description: `${interaction.user}, открываем Вашу **открытку** от ${parameters.Anonymous ? `||Анонимно||` : `${parameters.SendMember}`}`,
                            image: { url: 'https://i.pinimg.com/originals/ed/e3/b5/ede3b5388952e91f5380541f77198812.gif' }
                        }
                    ], 
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    type: 2, 
                                    style: appearance.buttons_menu.Default.style, 
                                    customId: 'Postcard', 
                                    label: 'Открываем', 
                                    emoji: appearance.emoji.Repeat,
                                    disabled: true
                                },
                            ]
                        }
                    ]
                }).catch(() => {});

                setTimeout(async () => {

                    interaction.editReply({
                        embeds: [
                            {
                                title: `${client.user.username} postcard`,
                                color: appearance.embed.color,
                                description: `✉️ **Открытка**\n・**Отправитель**: ${parameters.Anonymous ? `||Анонимно||` : `${parameters.SendMember}`}\n・**Сообщение**: ${parameters.Comment}\n・**Подарок**: **${parameters.Translated}** ${appearance.emoji.Coin}`,
                                thumbnail: { url: memberAvatar }, 
                            }
                        ], 
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        type: 2, 
                                        style: appearance.buttons_menu.Default.style, 
                                        customId: 'Postcard', 
                                        label: 'Открыто',
                                        emoji: appearance.emoji.True,
                                        disabled: true
                                    },
                                ]
                            }
                        ]
                    }).catch(() => {});

                }, 2500);

                break;
                
            }

            case 'deleteReply': {

                interaction.update({
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    type: 2, 
                                    emoji: appearance.emoji.Delete, 
                                    style: appearance.buttons_menu.Exit.style, 
                                    label: 'Скрыть', 
                                    customId: 'deleteReply',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                });

                break;
                
            }

        };

    };

}; 