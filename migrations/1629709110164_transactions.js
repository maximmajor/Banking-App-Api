
exports.shorthands = undefined;

export.up = pgn => {
    pgm.createTable('transaction', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        reference: {
            type: 'text',
            unique: true
        },
        sender: {
            type: 'VARCHAR(15)',
        },
        amount: {
            type: 'bigint'
        },
        description: {
            type: 'text'
        },
        created_at: {
            type: 'timestamptz'
            default: pgm.func('now()'),
        },
    })
};

export.down = (pgm) => {
    pgm.dropTable('transaction')
};