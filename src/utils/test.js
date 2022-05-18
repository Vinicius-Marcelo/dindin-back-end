const testType = (type) => {
    const test = type === 'entrada' || type === 'saida';
    return test;
}

module.exports = { testType };