const knex = require(`../services/connection`);
const bcrypt = require(`bcrypt`);
const error = require('../messages/error');
const success = require('../messages/success');
const schemaUser = require('../validations/schemaUser');

const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        await schemaUser.validate(req.body);
        const userExists = await knex(`usuarios`).where({ email }).first();
        if (userExists) return res.status(404).json({ mensagem: error.emailAlreadyBeenUsed });

        const hash = await bcrypt.hash(senha, 10);
        const createUser = await knex(`usuarios`).insert({
            nome, email, senha: hash
        });
        if (!createUser) {
            return res.status(400).json({ mensagem: error.userNotCreated });
        };

        return res.status(200).json({ mensagem: success.userCreated });
    } catch (error) {
        return res.status(500).json(error.message);

    };
};
const getUser = async (req, res) => {
    return res.status(200).json(req.user);
};

const updateUser = async (req, res) => {
    let { nome, email, senha } = req.body;
    const { id } = req.user;
    try {
        await schemaUser.validate(req.body);
        const userExists = await knex(`usuarios`).where({ id }).first();
        if (!userExists) return res.status(404).json(error.notFound);
        if (email !== req.user.email) return res.status(404).json(error.emailAlreadyBeenUsed);

        const userUpdate = await knex(`usuarios`).update({
            nome, email, senha: await bcrypt.hash(senha, 10)
        }).where({ id });
        if (!userUpdate) {
            return res.status(400).json({ mensagem: error.userNotUpdate });
        }
        return res.status(200).json({ mensagem: success.userUpdated });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    registerUser,
    getUser,
    updateUser
}