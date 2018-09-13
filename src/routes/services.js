const express = require('express');
const router = express.Router();

const { users, accounts, writeJSON } = require('../data');

function handleTransfer(req, res) {
    accounts[req.body.from].balance -= parseInt(req.body.amount);
    accounts[req.body.to].balance += parseInt(req.body.amount);

    writeJSON('accounts.json');

    res.render('transfer', { message: "Transfer Completed" });
}

function handlePayment(req, res) {
    accounts.credit.balance -= parseInt(req.body.amount);
    accounts.credit.available += parseInt(req.body.amount);

    writeJSON('accounts.json');

    res.render('payment', { message: "Payment Successful", account: accounts.credit });
}

router.get('/transfer', (req, res) => res.render('transfer'));
router.post('/transfer', (req, res) => handleTransfer(req, res));
router.get('/payment', (req, res) => res.render('payment', { account: accounts.credit }));
router.post('/payment', (req, res) => handlePayment(req, res));

module.exports = router;