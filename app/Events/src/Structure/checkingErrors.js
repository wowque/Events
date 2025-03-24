function checkingErrors(JSON, errors) { 
    
    let uppdateErrors = errors;
    
    try { 
        const requireJSON = require(JSON);
    } 
    catch (error) {
    
        uppdateErrors++
        console.error(`\x1b[31m[ERROR]\x1b[0m Error when opening .json:`, error);
    
    };

    return uppdateErrors;
    
};

module.exports.checkingErrors = checkingErrors;