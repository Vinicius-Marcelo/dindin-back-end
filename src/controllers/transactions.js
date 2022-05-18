const knex = require(`../services/connection`);
const error = require('../messages/error');
const success = require('../messages/success');
const schemaTransaction = require('../validations/schemaTransaction');

const listTransactions = async (req, res) => {
    const user = req.user;
    const { filtro } = req.query;
    const filterDescription = [];
    try {
        if (filtro) {
            for (const text of filtro) {
                const description = await knex(`transacoes`)
                    .join(`categorias`, `categorias.id`, `categoria_id`)
                    .select(`transacoes.id`, `tipo`, `transacoes.descricao`, `valor`, `data`, `usuario_id`, `categoria_id`, `categorias.descricao as categoria_nome`)
                    .where(`categorias.descricao`, `=`, text)
                    .where({ usuario_id: user.id })
                if (!description) {
                    return res.status(400).json({ mensagem: error.descriptioNotFound });
                }
                filterDescription.push(...description);
            }
            return res.json(filterDescription);
        }
        const transactions = await knex(`transacoes`)
            .join(`categorias`, `categorias.id`, `categoria_id`)
            .join(`usuarios`, `transacoes.usuario_id`, ` usuarios.id`)
            .select(`transacoes.id`, `tipo`, `transacoes.descricao`, `valor`, `data`, `usuario_id`, `categoria_id`, `categorias.descricao as categoria_nome`)
            .where({ usuario_id: user.id });
        if (!transactions) {
            return res.status(201).json({ mensagem: error.transactionsNotFound });
        }
        return res.status(200).json(transactions);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const detailTransaction = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    try {
        const transaction = await knex(`transacoes`)
            .join(`categorias`, `categorias.id`, `categoria_id`)
            .select(`transacoes.id as transacoes`, `tipo`, `transacoes.descricao`, `valor`, `data`, `usuario_id`, `categorias.descricao as categoria_nome`)
            .where(`transacoes.id `, id)
            .where({ usuario_id: user.id })
            .first();
        if (!transaction) {
            return res.status(404).json({ mensagem: error.transactionsNotFound });
        }
        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const registerTransaction = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const user = req.user;
    try {
        await schemaTransaction.validate(req.body);
        const createTransaction = await knex(`transacoes`).insert({
            descricao, valor, data, categoria_id, usuario_id: user.id, tipo
        });

        if (!createTransaction) {
            return res.status(201).json({ mensagem: error.transactionNotCreate });
        }
        const transaction = await knex(`transacoes`)
            .join(`categorias`, `categorias.id`, `categoria_id `)
            .select(`transacoes.id`, `tipo`, `transacoes.descricao`, `valor`, `data`, `usuario_id`, `categorias.descricao as categoria_nome`)
            .where({ usuario_id: user.id })
            .orderBy(`id`, `desc`)
            .limit(1)
            .first();
        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
const updateTransaction = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id } = req.params;
    const user = req.user;

    try {
        await schemaTransaction.validate(req.body);
        const updateTransaction = await knex(`transacoes`)
            .update({ descricao, valor, data, categoria_id, tipo })
            .where({ id, usuario_id: user.id })
        if (!updateTransaction) {
            return res.status(201).json({ mensagem: error.transactionNotUpdate });
        }

        return res.status(200).json({ mensagem: success.transactionUpdated });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    try {
        const transaction = await knex(`transacoes`).del().where({ id, usuario_id: user.id });
        if (!transaction) {
            return res.status(201).json({ mensagem: error.transactionsNotFound });
        }

        return res.status(200).json({ mensagem: success.transactionDeleted });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const extractTransactions = async (req, res) => {
    const user = req.user;
    try {
        const transactions = await knex(`transacoes`)
            .select(`tipo`)
            .sum(`valor as valor`)
            .where({ usuario_id: user.id })
            .groupBy(`tipo`);
        if (!transactions) {
            return res.status(201).json({ mensagem: error.extractDontExists });
        }
        return res.status(200).json(transactions);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    listTransactions, detailTransaction, registerTransaction, updateTransaction, deleteTransaction, extractTransactions
};