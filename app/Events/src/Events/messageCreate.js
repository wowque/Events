module.exports = async (client, appearance, config, db, message) => {

    const { content, member } = message;

    if (!member || member.user.bot) return;
    if (content.slice(0, config.main.prefix.length) !== config.main.prefix) return;
    
    const messageArray = content.split(' ');
    const command = messageArray[0].replace(config.main.prefix, '');

    const filePath = `../UtilsCommands/${command}.js`;
    
    if (filePath) {

        try {

            require(filePath)(client, appearance, config, db, message);
            
        } catch (error) {
            return; 
        };

    };

};