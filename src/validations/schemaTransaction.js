const yup = require('./settingsYup');
const { testType } = require('../utils/test');
const error = require('../messages/error');

let schemaTransaction = yup.object().shape({
    descricao: yup.string().required(error.inputTransacitionNotExists),
    valor: yup.number().strict().required(error.inputTransacitionNotExists),
    categoria_id: yup.number().required(error.inputTransacitionNotExists),
    data: yup.date().required(error.inputTransacitionNotExists),
    tipo: yup.string().required().test('equal', `${error.typeInvalidFormat}`, (type) => testType(type))
});

module.exports = schemaTransaction;