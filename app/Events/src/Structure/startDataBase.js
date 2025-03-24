const fs = require('fs');
const path = require('path');
const { main } = require('../config.json');


function startingDataBase(sourceFile, destinationFile) {

    const sourcePath = path.resolve(sourceFile);
    const destinationPath = path.resolve(destinationFile); 

    const destinationDir = path.dirname(destinationPath);
    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
        return console.error(`\x1b[31m[ERROR]\x1b[0m\x1b[32m[BACKUP]\x1b[0m Is not found (Folder creating, and error backup): \x1b[32m/bu\x1b[0m in \x1b[32m${destinationFile}\x1b[0m`);
    };
    
    fs.copyFile(sourcePath, destinationPath, (err) => {
        if (err) {
            console.error('\x1b[31m[ERROR]\x1b[0m\x1b[32m[BACKUP]\x1b[0m Error copying file:', err);
        };
    });     
    
    return;
    
};

function dataBasePars() { 

    const dbList = {};
    const configDbList = main.jsondb;
    for (const DataBase in configDbList) {
    
        const configInfo = configDbList[DataBase.toString()];
    
        startingDataBase(configInfo.pathBackup, configInfo.path);

        try { 
            const tempInfoJson = require('../.' + configInfo.path);
            dbList[DataBase.toString()] = tempInfoJson;
        } 
        catch (error) {};
    };

    return dbList;

};

module.exports.dataBasePars = dataBasePars;