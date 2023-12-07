const db = require('../util/database');

module.exports = class DS_Education {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static selectAll() {
        return db.execute('SELECT * FROM DS_Education ORDER BY id');
    }
};