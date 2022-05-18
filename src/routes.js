const express = require('express');
const rotas = express();

const users = require('./controllers/users');
const { login } = require('./controllers/login');
const group = require('./controllers/group');
const transactions = require('./controllers/transactions');
const { verifyLogin } = require('./middlewares/verifyLogin');


rotas.post('/usuario', users.registerUser);
rotas.post('/login', login);

rotas.use(verifyLogin);

rotas.get('/usuario', users.getUser);
rotas.put('/usuario', users.updateUser);

rotas.get('/categoria', group.list);

rotas.get('/transacao', transactions.listTransactions);
rotas.get('/transacao/extrato', transactions.extractTransactions);
rotas.get('/transacao/:id', transactions.detailTransaction);
rotas.post('/transacao', transactions.registerTransaction);
rotas.put('/transacao/:id', transactions.updateTransaction);
rotas.delete('/transacao/:id', transactions.deleteTransaction);


module.exports = rotas;