const yup = require('./settingsYup');
const error = require('../messages/error');
const { passwordDontExists } = require('../messages/error');

const schemaUser = yup.object().shape({
    nome: yup.string().required(error.nameDontExists),
    email: yup.string().email().required(error.emailDontExists),
    senha: yup.string().min(6).required(passwordDontExists)
});

module.exports = schemaUser;