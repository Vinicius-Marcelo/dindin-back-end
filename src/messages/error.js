const message = {
    nameDontExists: 'O nome não foi informado',
    emailDontExists: 'É preciso informar um email',
    passwordDontExists: 'A senha é essencial para segurança da sua conta',
    emailAlreadyBeenUsed: 'O email indicado já está em uso',
    userNotCreated: 'Nao foi possivel cadastrar o usuario.',
    userNotUpdate: 'Nao foi possivel atualizar o usuario.',
    descriptioNotFound: 'Descrição não encontrada. (Ex de uso: ?filtro[]=Salário)',
    transactionsNotFound: 'Nenhuma transação foi encontrada.',
    inputTransacitionNotExists: 'Todos os campos precisam ser preenchidos',
    transactionNotCreate: 'Transação não cadastrada',
    transactionNotUpdate: 'Transação não atualizada',
    extractDontExists: 'Extrato inexistente',
    typeInvalidFormat: 'O campo tipo deve ser informado de forma correta (entrada/saida).',
    badRequest: 'O servidor não entendeu a requisição pois está com um formato inválido',
    unauthorized: 'O usuário não está autenticado (logado)',
    forbidden: 'O usuário não tem permissão de acessar o recurso solicitado',
    notFound: 'Não foi possível encontrar o que foi solicitado',
    fieldEmpty: 'Um dos campos obrigatório está vazio',
    loginWrong: 'E-mail ou senha invalidos',
};

// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado

module.exports = message;
