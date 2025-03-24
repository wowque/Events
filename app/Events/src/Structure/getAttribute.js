const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const axios = require('axios');
const bots = require('../../../../bots.json'); 
const colors = require('../../../../colors.json'); 
const { makeid } = require('./numbersGenerator');


async function conecting() {

    function getArrayRandElement (arr) {

        const rand = Math.floor(Math.random() * arr.length);
        return arr[rand];

    };

    function findCountWithoutPercentage(count, target) {
        return Math.floor(count * (100 - target) / 100);
    };
      
    function findCountWithPercentage(count, target) {
        return Math.floor(count * (100 + target) / 100);
    };

    function findTargetWithCount(count, target) {
    
        return Math.floor(count * (100 - (100 - target)) / 100);

    };

    function getConvertToProgressBar(totalCount, doneCount) {

        const doneSymbol = '■';
        const remainingSymbol = '□';
        const progressBarLength = 10; 
      
        const donePercentage = (doneCount / totalCount) * 100;
        const doneLength = Math.floor((donePercentage / 100) * progressBarLength);
        const remainingLength = progressBarLength - doneLength;
      
        const progressBar = doneSymbol.repeat(doneLength) + remainingSymbol.repeat(remainingLength);
        const progressBarWithPercentage = `${progressBar} (${donePercentage.toFixed(0)}%)`;
      
        return progressBarWithPercentage;

    };

    async function getMessage (interaction) {
          
        if (!interaction.channel) return;
        const messages = await interaction.channel.messages.fetch().catch(() => {});
        const targetMessage = messages.find(msg => msg.interaction?.id === interaction.id);
      
        if (targetMessage) {

            const messagePick = await interaction.channel.messages.fetch(targetMessage.id); 
            return messagePick.id;

        };

    };
    
    function getGraf (InMass, InName) {


        function transformArray(arr) {

            const maxNumber = Math.max(...arr);
            
            const transformedArray = arr.map(item => {

                if (item === maxNumber) return 6;
                else {
                    const percentage = (item / maxNumber) * 6;
                    return percentage;
                };

            });
        
            return transformedArray;

        };

        const InMassTrans = transformArray(InMass); 

        const maxVal = Math.max(...InMassTrans);

        let graph = '';
        let falses = [];
        
        for (let j = 0; j < InMassTrans.length; j++) falses.push(false);

        for (let i = maxVal + 1; i > 0; i--) {

            for (let j = 0; j < InMassTrans.length; j++) {
                
                if (InMassTrans[j] >= i) {
                    graph += ' |   ';
                } else {
        
                    if(falses[j] == false && InMassTrans[j] >= i - 1) {
        
                    falses[j] == true
                    const aInlength = `${InMass[j]}`;
                    graph += `${aInlength.length == 2 ? ' ' : ''}${aInlength.length == 1 ? ' ' : ''}${InMass[j]}${aInlength.length == 1 ? ' ' : ''}  `;
        
                    }
                    else graph += '     ';
        
                };
    
    
            };
            graph += '\n';
            
        };
      
        for (let i = 0; i < InMassTrans.length; i++) graph += '---  ';
      
        graph += '\n';
        for (let i = 0; i < InMassTrans.length; i++) {

            const aInlength = InName[i];
            graph += `${aInlength.length == 2 ? ' ' : ''}${aInlength.length == 1 ? ' ' : ''}${InName[i]}${aInlength.length == 1 ? ' ' : ''}  `;
        
        };

        return graph;
    
    };

    async function targetMessageEditComponents (interaction) {
          
        if (!interaction.channel) return;
        const messages = await interaction.channel.messages.fetch().catch(() => {});
        const targetMessage = messages.find(msg => msg.interaction?.id === interaction.id);
      
        if (targetMessage) {

            targetMessage.components.forEach(component => {

                let Comp = component.components;

                for (c = 0; c < Comp.length; c++) {

                    if (Comp[c].data.style !== 5) Comp[c].data.disabled = true;

                };
                
            });

            await targetMessage.edit({ components: targetMessage.components });

        };

    };

    async function getBlackWhiteImage (imageUrl) {

        const id = makeid(15);
        const response = await axios({
            url: imageUrl,
            responseType: 'arraybuffer',
        });

        const buffer = Buffer.from(response.data, 'utf-8');
        const extOfComponent = path.extname(imageUrl).toLowerCase();
        const ext = extOfComponent.split('?')[0];

        console.log(ext)
        console.log(imageUrl)

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
            
            const image = await Jimp.read(buffer);
            image.grayscale();

            const outputFilePath = `./assets/files/BW${id}.png`;
            await image.writeAsync(outputFilePath);

            return [
                {
                    url: `attachment://${id}.png`
                },
                [
                    {
                        attachment: outputFilePath, name: `${id}.png`
                    }   
                ]
            ];


        } 

        else if (ext === '.gif') {
            
            const gifImage = await Jimp.read(buffer);
            gifImage.grayscale();

            const outputFilePath = `./assets/files/BW${id}.gif`;
            await gifImage.writeAsync(outputFilePath);
            
            return [
                {
                    url: `attachment://${id}.gif`
                },
                [
                    {
                        attachment: outputFilePath, name: `${id}.gif`
                    }   
                ]
            ];

        };

    };

    async function getDisplayAvatarURL (member) {

        let avatarURL = member.displayAvatarURL({ dynamic: true, size: 1024 });
        if (!avatarURL) avatarURL = bots.null.avatar;

        return avatarURL;

    };

    async function getBanner (member) {

        const data = await axios.get(`https://discord.com/api/users/${member.id}`, 
            {
                headers: {
                    Authorization: `Bot ${bots.Events.token}`
                }
            }
        )
            .then(d => d.data);

        let url = false

        if (data.banner) {

            url = data.banner.startsWith('a_') ? '.gif?size=4096' : '.png?size=4096';
            url = `https://cdn.discordapp.com/banners/${member.id}/${data.banner}${url}`;

        }

        return url;

    };

    function getColorInfo (inputHexColor) {

        function getDistance(color1, color2) {

            const r1 = parseInt(color1.substr(1, 2), 16);
            const g1 = parseInt(color1.substr(3, 2), 16);
            const b1 = parseInt(color1.substr(5, 2), 16);
        
            const r2 = parseInt(color2.substr(1, 2), 16);
            const g2 = parseInt(color2.substr(3, 2), 16);
            const b2 = parseInt(color2.substr(5, 2), 16);
        
            const dr = r2 - r1;
            const dg = g2 - g1;
            const db = b2 - b1;
        
            return Math.sqrt(dr * dr + dg * dg + db * db);

        };
        
        function findClosestColor(hexColor, colorConfig) {

            let closestColor = null;
            let minDistance = Infinity;
        
            for (const color in colorConfig) {

                const distance = getDistance(hexColor, color);
            
                if (distance < minDistance) {
                    minDistance = distance;
                    closestColor = color;
                };

            };
        
            return closestColor;

        };
        
        if (inputHexColor == '#0') inputHexColor = '#000000';

        const colorConfig = {
            '#ffffff': '⚪', 
            '#000000': '⚫', 
            '#FF0000': '🔴',
            '#00FF00': '🟢', 
            '#0000FF': '🔵', 
            '#FFFF00': '🟡',
            '#FF00FF': '🟣', 
            '#00FFFF': 'Ⓜ️', 
            '#FFA500': '🟠', 
            '#FFC0CB': '🌸'
        };
        
        const closestColor = findClosestColor(inputHexColor, colorConfig);
        
        if (colorConfig[closestColor] == undefined) return `🙁 Неизвестен`;
        return `${colorConfig[closestColor]} ${inputHexColor.toLowerCase()}${colors[inputHexColor.toLowerCase()] ? ` (${colors[inputHexColor.toLowerCase()]})` : ''}`;
  
    }; 

    function getColorEmoji (inputHexColor) {

        function getDistance(color1, color2) {

            const r1 = parseInt(color1.substr(1, 2), 16);
            const g1 = parseInt(color1.substr(3, 2), 16);
            const b1 = parseInt(color1.substr(5, 2), 16);
        
            const r2 = parseInt(color2.substr(1, 2), 16);
            const g2 = parseInt(color2.substr(3, 2), 16);
            const b2 = parseInt(color2.substr(5, 2), 16);
        
            const dr = r2 - r1;
            const dg = g2 - g1;
            const db = b2 - b1;
        
            return Math.sqrt(dr * dr + dg * dg + db * db);

        };
        
        function findClosestColor(hexColor, colorConfig) {

            let closestColor = null;
            let minDistance = Infinity;
        
            for (const color in colorConfig) {

                const distance = getDistance(hexColor, color);
            
                if (distance < minDistance) {
                    minDistance = distance;
                    closestColor = color;
                };

            };
        
            return closestColor;

        };
        
        if (inputHexColor == '#0') inputHexColor = '#000000';

        const colorConfig = {
            '#ffffff': '⚪', 
            '#000000': '⚫', 
            '#FF0000': '🔴',
            '#00FF00': '🟢', 
            '#0000FF': '🔵', 
            '#FFFF00': '🟡',
            '#FF00FF': '🟣', 
            '#00FFFF': 'Ⓜ️', 
            '#FFA500': '🟠', 
            '#FFC0CB': '🌸'
        };
        
        const closestColor = findClosestColor(inputHexColor, colorConfig);
        
        if (colorConfig[closestColor] == undefined) return `🙁`;
        return `${colorConfig[closestColor]}`;
  
    };

    async function getAvatar (member) {

        const memberActions = member.user || member;
        if (!memberActions) return bots.null.avatar;
        return memberActions.displayAvatarURL({extension: 'png', forceStatic: false, size: 1024})

    };
    
    function calculateCurrentPrice(maxCurrencyAvailable, amountAlreadyBought, usersAlreadyBought) {

        const remainingCurrency = maxCurrencyAvailable - amountAlreadyBought;
        const remainingUsers = Math.max(0, usersAlreadyBought - 1);
      
        const maxAmountPerUser = Math.floor(remainingCurrency / remainingUsers);
      
        const totalCost = maxAmountPerUser * remainingUsers;
        return totalCost; 
    
    };
    
    module.exports.getGraf = getGraf;
    module.exports.getBanner = getBanner;
    module.exports.getAvatar = getAvatar;
    module.exports.getMessage = getMessage;
    module.exports.getColorInfo = getColorInfo;
    module.exports.getColorEmoji = getColorEmoji;
    module.exports.getBlackWhiteImage = getBlackWhiteImage;
    module.exports.findTargetWithCount = findTargetWithCount;
    module.exports.getArrayRandElement = getArrayRandElement;
    module.exports.getDisplayAvatarURL = getDisplayAvatarURL;
    module.exports.calculateCurrentPrice = calculateCurrentPrice;
    module.exports.getConvertToProgressBar = getConvertToProgressBar;
    module.exports.targetMessageEditComponents = targetMessageEditComponents;
    module.exports.findCountWithoutPercentage = findCountWithoutPercentage;
    module.exports.findCountWithPercentage = findCountWithPercentage;
    
};

conecting ();