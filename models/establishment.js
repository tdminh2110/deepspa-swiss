const db = require('../util/database');

module.exports = class DS_Establishment {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static selectAll() {
        return db.execute('SELECT * FROM DS_Establishment ORDER BY id');
    }
};