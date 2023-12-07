const db = require('../util/database');

module.exports = class DS_Test_MEMPHESTO_Interview {
    constructor(idTest, idSession, record_video) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.record_video = record_video;     
    }

    insert() {        
        return db.execute(
            'INSERT INTO DS_Test_MEMPHESTO_Interview (id_session, record_video) VALUES (?, ?)',
            [this.idSession, this.record_video]
        );
    }

    // Fields: [DS_Test_MEMPHESTO_Interview] - id_session
    // Tables: [DS_Test_MEMPHESTO_Interview]
    // Conditions: [DS_Test_MEMPHESTO_Interview] - id_session    
    static delete_by_idSession(idSession) {
        let strQuery = 'DELETE FROM DS_Test_MEMPHESTO_Interview ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_MEMPHESTO_Interview] - id
    // Tables: [DS_Test_MEMPHESTO_Interview]
    // Conditions: [DS_Test_MEMPHESTO_Interview] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_MEMPHESTO_Interview ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_MEMPHESTO_Interview] - record_video
    // Tables: [DS_Test_MEMPHESTO_Interview]
    // Conditions: [DS_Test_MEMPHESTO_Interview] - id_session    
    static update_by_idSession(idSession, record_video) {

        let strQuery = 'UPDATE DS_Test_MEMPHESTO_Interview ' +
                        'SET record_video = ? ' + 
                        'WHERE id_session = ? ';

        return db.execute(strQuery, [record_video, idSession]);
    }
};
