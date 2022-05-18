const yup = require('./settingsYup');
const error = require('../messages/error');

const schemaLogin = yup.object().shape({
    email: yup.string().required(error.loginWrong),
    senha: yup.string().min(6).required(error.loginWrong)
});

module.exports = schemaLogin;