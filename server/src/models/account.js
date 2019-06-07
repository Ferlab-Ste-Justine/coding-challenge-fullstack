// lube
const sql = require('@lib/db');

class Account {
    static create(acc, trx) {
        return (trx || sql).insert(acc).into("account").returning("*").then(r => r[0]);
    }

    static findbyDisplayName(display_name, trx) {
        return (trx || sql).raw(`select * from account where display_name = ?`, [display_name]).then(r => r.rows[0])
    }
};

module.exports = Account;
