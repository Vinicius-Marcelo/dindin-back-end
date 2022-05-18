const knex = require(`../services/connection`);
const error = require('../messages/error');

const list = async (req, res) => {
    try {
        const categories = await knex(`categorias`);
        if (!categories) return res.status(404).json(error.notFound);
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = { list };