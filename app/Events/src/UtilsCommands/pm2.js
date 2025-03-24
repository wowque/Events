const fs = require('fs');
const readline = require('readline');
const guildСonfig = require('../../../../guild.json');  

module.exports = async (client, appearance, config, db, message) => {

    const { member, channel, guild, content } = message;

    const messageArray = content.split(' ');
    const command = messageArray[0].replace(config.main.prefix, '');
    const args = messageArray.slice(1);
    const messageArrayFull = content.split(' '); 
    const argsF = messageArrayFull.slice(1);

    const developersList = guildСonfig.developers;
    if(!developersList.includes(member.id)) {
        return message.delete().catch(() => {});
    }

    function transformString(str) {

        var firstLetter = str.charAt(0).toUpperCase();
        var remainingLetters = str.slice(1).toLowerCase();
        var transformedString = firstLetter + remainingLetters;
        
        return transformedString;

    };

    function handleConsoleInput() {

        console.log(`pm2 start index.js --name ${transformString(guild.name)}-${transformString(client.user.username)}`);
        message.delete();

    };
    
    handleConsoleInput()

};