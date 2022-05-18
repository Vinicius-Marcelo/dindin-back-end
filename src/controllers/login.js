const knex = require('../services/connection');
const bcrypt = require('bcrypt');
const jws = require('jsonwebtoken');
const schemaLogin = require('../validations/schemaLogin');
const error = require('../messages/error');

const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        await schemaLogin.validate(req.body);
        const profile = await knex(`usuarios`).where({ email }).first();
        if (!profile) return res.status(404).json(error.loginWrong);

        const user = profile;
        const correctPassword = await bcrypt.compare(senha, user.senha);
        if (!correctPassword) return res.status(404).json(error.loginWrong);

        const token = jws.sign({ id: user.id }, process.env.PASSWORD_HASH, { expiresIn: '8h' });
        const { senha: _, ...dataUser } = user;
        return res.status(200).json({
            user: dataUser,
            token
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { login };