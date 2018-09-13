const fs = require('fs');
const path = require('path');

function readJsonFile(fileName) {
    return fs.readFileSync(path.join(__dirname, 'json/', fileName + '.json'), 'utf8', (error, data) => {
        if (error) {
            console.error(error);
        } else {
            return data;
        }
    });
}

const writeJSON = (fileName) => {
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), JSON.stringify(accounts), 'utf8', (error) => {
        if (error) {
            console.error(error);
        }
    });
}

const accountData = readJsonFile('accounts');
const accounts = JSON.parse(accountData);

const userData = readJsonFile('users');
const users = JSON.parse(userData);

module.exports = {
    accounts: accounts,
    users: users,
    writeJSON: writeJSON
}