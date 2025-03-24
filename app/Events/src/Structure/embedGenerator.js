const appearance = require('../../../../appearance.json'); 
const { getAvatar } = require('../Structure/getAttribute.js');


async function conecting() {
    
    async function defaultEmbed(member, title, description) {
    
        const memberAvatar = await member.user.avatarURL({ dynamic: true, size: 512 });
        return {
            title: title,
            description: member.toString() + ', ' + description,
            thumbnail: { url: await getAvatar(member) },
            color: appearance.embed.color
        };
    
    };
    
    async function errorEmbed(client, member, description) {
    
        const memberAvatar = await member.user.avatarURL({ dynamic: true, size: 512 });
        return {
            title: client.user.username + ' error',
            description: member.toString() + ', ' + description,
            thumbnail: { url: await getAvatar(member) },
            color: appearance.embed.errorColor
        };       
    
    };
    
    async function customMessage(message) {
        return sendMessageAwait;
    };
    
    
    module.exports.defaultEmbed = defaultEmbed;
    module.exports.customMessage = customMessage;
    module.exports.errorEmbed = errorEmbed;
    
}

conecting ();