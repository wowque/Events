async function conecting() {

    function weddingAnniversary(time) {

        let month = Math.ceil(time / (60 * 60 * 24 * 30));
        let List = [
            'Хрустальная свадьба',
            'Бумажная свадьба',
            'Кожаная свадьба',
            'Фарфоровая свадьба',
            'Деревянная свадьба',
            'Сахарная свадьба',
            'Медовая свадьба',
            'Бронзовая свадьба',
            'Керамическая свадьба',
            'Оловянная свадьба',
            'Стальная свадьба',
            'Шелковая свадьба',
            'Льняная свадьба',
            'Серебряная свадьба',
            'Хрустальная свадьба',
            'Фарфоровая свадьба',
            'Серебряная свадьба',
            'Серебряная свадьба',
            'Серебряная свадьба',
            'Серебряная свадьба',
            'Серебряная свадьба',
            'Серебряная свадьба',
            'Серебряная свадьба',
            'Серебряная свадьба',
            'Серебряная свадьба',
            'Серебряная свадьба',
            'Серебряная свадьба',
            'Серебряная свадьба',
            'Серебряная свадьба',
            'Серебряная свадьба'
        ];

        return List[month];

    };
    
    function hourTranslatorBold (time) {

        let send = 0;

        let cheetime = time / 60;
        let min = Math.floor(cheetime);
        let sec = (cheetime - min) * 60;
        sec = Math.abs(sec);
        sec = Math.floor(sec);
        let cheemin = min / 60;

        let has = Math.floor(cheemin);
        min = (cheemin - has) * 60;
        min = Math.floor(min); 

        if(time >= 60*60*24) send = `**${has}** час.${min !== 0 ? ' **' + min + '** мин.' : ''}`;
        if(time >= 60*60*24) send = `**${has}** час.${min !== 0 ? ' **' + min + '** мин.' : ''}`;
        if(time < 60*60*24) send = `**${has}** час.${min !== 0 ? ' **' + min + '** мин.' : ''}`;
        if(time < 60*60) send = `**${min}** мин.${sec !== 0 ? ' **' + sec + '** сек.' : ''}`;
        if(time < 60) send = `**${sec}** сек.`;
        return send;

    };

    function hourTranslator (time) {

        let send = 0;

        let cheetime = time / 60;
        let min = Math.floor(cheetime);
        let sec = (cheetime - min) * 60;
        sec = Math.abs(sec);
        sec = Math.floor(sec);
        let cheemin = min / 60;

        let has = Math.floor(cheemin);
        min = (cheemin - has) * 60;
        min = Math.floor(min); 

        if(time >= 60*60*24) send = `${has} час.${min !== 0 ? ' ' + min + ' мин.' : ''}`;
        if(time < 60*60*24) send = `${has} час.${min !== 0 ? ' ' + min + ' мин.' : ''}`;
        if(time < 60*60) send = `${min} мин.${sec !== 0 ? ' ' + sec + ' сек.' : ''}`;
        if(time < 60) send = `${sec} сек.`;
        return send;

    };

    function clockTranslator (time) {

        let send = 0;

        let cheetime = time / 60;
        let min = Math.floor(cheetime);
        let sec = (cheetime - min) * 60;
        sec = Math.abs(sec);
        sec = Math.floor(sec);
        let cheemin = min / 60;

        let has = Math.floor(cheemin);
        min = (cheemin - has) * 60;
        min = Math.floor(min); 

        if(time >= 60*60*24) send = `${has}:${min == 0 ? '00' : min}:${sec == 0 ? '00' : sec}`;
        if(time < 60*60*24) send = `${has}:${min == 0 ? '00' : min}:${sec == 0 ? '00' : sec}`;
        if(time < 60*60) send = `${min}:${sec == 0 ? '00' : sec}`;
        if(time < 60) send = `${sec}`;
        return send;

    };

    function hourTranslatorMini (time) {

        let send = 0;

        let cheetime = time / 60;
        let min = Math.floor(cheetime);
        let sec = (cheetime - min) * 60;
        sec = Math.abs(sec);
        sec = Math.floor(sec);
        let cheemin = min / 60;

        let has = Math.floor(cheemin);
        min = (cheemin - has) * 60;
        min = Math.floor(min); 

        if(time >= 60*60*24) send = `${has}ч. ${min}м.`;
        if(time < 60*60*24) send = `${has}ч. ${min}м.`;
        if(time < 60*60) send = `${min}м. ${sec}с.`;
        if(time < 60) send = `${sec}с.`;
        return send;

    };

    function formatTimeFromUnix (unixTime) {

        const daysInWeek = 7;
        const hoursInDay = 24;
        const minutesInHour = 60;
        const daysInMonth = 30.44; 
        const daysInYear = 365.24; 
        const secondsInMinute = 60;
        const millisecondsInSecond = 1000;
      
        const currentTime = new Date();
        const unixMilliseconds = unixTime * millisecondsInSecond;
        const unixDate = new Date(unixMilliseconds);
        const timeDifference = currentTime - unixDate;
      
        if (timeDifference >= hoursInDay * minutesInHour * secondsInMinute * millisecondsInSecond) {
            const days = Math.floor(timeDifference / (hoursInDay * minutesInHour * secondsInMinute * millisecondsInSecond));
            return `${days} дн.`;
        } 
        else if (timeDifference >= minutesInHour * secondsInMinute * millisecondsInSecond) {
            const hours = Math.floor(timeDifference / (minutesInHour * secondsInMinute * millisecondsInSecond));
            return `${hours} час.`;
        } 
        else if (timeDifference >= secondsInMinute * millisecondsInSecond) {
            const minutes = Math.floor(timeDifference / (secondsInMinute * millisecondsInSecond));
            return `${minutes} мин.`;
        } 
        else if (timeDifference >= millisecondsInSecond) {
            const seconds = Math.floor(timeDifference / millisecondsInSecond);
            return `${seconds} сек.`;
        } 
        else  return false;
    
    };

    function formatTimeFromUnix (unixTime) {

        const daysInWeek = 7;
        const hoursInDay = 24;
        const minutesInHour = 60;
        const daysInMonth = 30.44; 
        const daysInYear = 365.24; 
        const secondsInMinute = 60;
        const millisecondsInSecond = 1000;
      
        const currentTime = new Date();
        const unixMilliseconds = unixTime * millisecondsInSecond;
        const unixDate = new Date(unixMilliseconds);
        const timeDifference = currentTime - unixDate;
      
        if (timeDifference >= hoursInDay * minutesInHour * secondsInMinute * millisecondsInSecond) {
            const days = Math.floor(timeDifference / (hoursInDay * minutesInHour * secondsInMinute * millisecondsInSecond));
            return `${days}д.`;
        } 
        else if (timeDifference >= minutesInHour * secondsInMinute * millisecondsInSecond) {
            const hours = Math.floor(timeDifference / (minutesInHour * secondsInMinute * millisecondsInSecond));
            return `${hours}ч.`;
        } 
        else if (timeDifference >= secondsInMinute * millisecondsInSecond) {
            const minutes = Math.floor(timeDifference / (secondsInMinute * millisecondsInSecond));
            return `${minutes}м.`;
        } 
        else if (timeDifference >= millisecondsInSecond) {
            const seconds = Math.floor(timeDifference / millisecondsInSecond);
            return `${seconds}с.`;
        } 
        else return false;
    
    };

    function getCurrentDateTime (date) {

        const currentDate = new Date(date * 1000);
      
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
      
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      
        const formattedDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;
        return formattedDateTime;
        
    };
    
    function getCurrentDayOfWeek () {

        const currentDate = new Date();
        let dayOfWeek = currentDate.getDay(); 
        
        if (dayOfWeek === 0) dayOfWeek = 7;
        
        return dayOfWeek;

    };
    
    
    module.exports.hourTranslator = hourTranslator;
    module.exports.clockTranslator = clockTranslator;
    module.exports.hourTranslatorBold = hourTranslatorBold;
    module.exports.hourTranslatorMini = hourTranslatorMini;
    module.exports.formatTimeFromUnix = formatTimeFromUnix;
    module.exports.weddingAnniversary = weddingAnniversary;
    module.exports.getCurrentDateTime = getCurrentDateTime;
    module.exports.getCurrentDayOfWeek = getCurrentDayOfWeek;

};

conecting ();
