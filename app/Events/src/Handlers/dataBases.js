const path = require('path');
const { existsSync, mkdirSync, copyFile, writeFile } = require('fs');


module.exports = async (client, appearance, config, db) => {

    const { main } = config;
    
    if (db) {

        setInterval(() => {

            const configDbList = main.jsondb;
            for (const DataBase in db) {
            
                const dbInfo = db[DataBase.toString()];
                const configInfo = configDbList[DataBase.toString()];

                writeFile(configInfo.path, JSON.stringify(dbInfo),(err)=>{

                    if (err) console.log(err);

                });

            };

        }, 1000);

    };



    setInterval(() => {

        const configDbList = main.jsondb;
        for (const DataBase in db) {
        
            const dbInfo = db[DataBase.toString()];
            const configInfo = configDbList[DataBase.toString()];

            writeFile(configInfo.pathBackup, JSON.stringify(dbInfo), (err) => {

                if (err) console.log(err);

            });

        };

    }, 90000);

};