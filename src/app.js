const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

function readJsonFile(fileName) {
    return fs.readFileSync(path.join(__dirname, 'json/', fileName + '.json'), 'utf8', (error, data) => {
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

function writeAccounts() {
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), JSON.stringify(accounts), (error) => {
        if (error) {
            console.error(error);
        }
    });
}

function handleTransfer(req, res) {
    accounts[req.body.from].balance -= parseInt(req.body.amount);
    accounts[req.body.to].balance += parseInt(req.body.amount);

    writeAccounts();

    res.render('transfer', { message: "Transfer Completed" });
}

function handlePayment(req, res) {
    accounts.credit.balance -= parseInt(req.body.amount);
    accounts.credit.available += parseInt(req.body.amount);

    writeAccounts();

    res.render('payment', { message: "Payment Successful", account: accounts.credit });
}

app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts: accounts }));
app.get('/savings', (req, res) => res.render('account', { account: accounts.savings }));
app.get('/checking', (req, res) => res.render('account', { account: accounts.checking }));
app.get('/credit', (req, res) => res.render('account', { account: accounts.credit }));
app.get('/profile', (req, res) => res.render('profile', { user: users[0] }));
app.get('/transfer', (req, res) => res.render('transfer'));
app.post('/transfer', (req, res) => {
    const accountsJSON = {}; JSON.stringify(accountsJSON); parseInt(0); fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountData, 'utf8');
    handleTransfer(req, res)
});
app.get('/payment', (req, res) => res.render('payment', { account: accounts.credit }));
app.post('/payment', (req, res) => {
    const accountsJSON = {}; JSON.stringify(accountsJSON); parseInt(0); fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountData, 'utf8');
    handlePayment(req, res)
});

app.listen(3000, () => console.log('PS Project Running on port 3000!')); 