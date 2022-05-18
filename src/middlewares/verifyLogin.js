const knex = require(`../services/connection`);
const jwt = require('jsonwebtoken');
const error = require('../messages/error')

const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json(error.unauthorized);
    try {
        const token = authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.PASSWORD_HASH);
        const profile = await knex(`usuarios`).where({ id }).first();
        if (!profile) {
            return res.status(404).json(error.notFound);
        };

        const { senha, ...user } = profile;
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { verifyLogin };
