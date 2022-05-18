const message = {
    userCreated: 'O usuário foi cadastrado com sucesso',
    userIn: 'Login confirmado',
    userUpdated: 'Usuário atualizado com sucesso',
    transactionUpdated: 'Transação atualizada com sucesso',
    transactionDeleted: 'Transação deletada com sucesso',
    ok: 'Requisição bem sucedida',
    created: 'Requisição bem sucedida e algo foi criado',
    noContent: 'Requisição bem sucedida, sem conteúdo no corpo da resposta',
}

// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta

module.exports = message;