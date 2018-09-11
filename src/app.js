const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

function readJsonFile(fileName) {
    return fs.readFileSync('src/json/' + fileName + '.json', 'utf8', (error, data) => {
        if (error) {
            console.error(error);
        } else {
            return data;
        }
    });
}
const accountData = readJsonFile('accounts');
const accounts = JSON.parse(accountData);

const userData = readJsonFile('users');
const users = JSON.parse(userData);

app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts: accounts }));
app.get('/savings', (req, res) => res.render('account', { account: accounts.savings }));
app.get('/checking', (req, res) => res.render('account', { account: accounts.checking }));
app.get('/credit', (req, res) => res.render('account', { account: accounts.credit }));
app.get('/profile', (req, res) => {res.render('profile', {user: users[0]})});

app.listen(3000, () => console.log('PS Project Running on port 3000!')); 