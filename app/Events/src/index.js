const { main } = require('./config.json');
const { checkingErrors } = require('./Structure/checkingErrors.js');


console.clear();

let errors = 0;
for (const jsonCheck of main.jsonlist) {
    const Check1 = checkingErrors(jsonCheck, errors);
    errors = Check1;
}


if (errors == 0) require('./Structure/startClient.js');
else console.error(`\x1b[31m[STOP]\x1b[0m Errors when opening .json:`, errors);