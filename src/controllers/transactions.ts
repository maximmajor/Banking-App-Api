import sql from '../stores/pg';

export async function getAllTransactions() {
    return sql `SELECT * FROM transactio`
}

