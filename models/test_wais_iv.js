const db = require('../util/database');

module.exports = class DS_Test_WAIS_IV {
        constructor(idTest, idSession, record_video, score, eslc) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.record_video = record_video;
        this.score = score;
        this.eslc = eslc;
    }

    insert() {        
        let strQuery = "INSERT INTO DS_Test_WAIS_IV (id_session, record_video, score, eslc) " +
                       "VALUES (?, ?, ?, ?) ";
                               
        return db.execute(strQuery, 
        [this.idSession, this.record_video, this.score, this.eslc]);
    }

    // Fields: [DS_Test_WAIS_IV] - id
    // Tables: [DS_Test_WAIS_IV]
    // Conditions: [DS_Test_WAIS_IV] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_WAIS_IV ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_WAIS_IV] - record_video, score, eslc
    // Tables: [DS_Test_WAIS_IV]
    // Conditions: [DS_Test_WAIS_IV] - id_session    
    static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT record_video, score, eslc ' +
                       'FROM DS_Test_WAIS_IV ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_WAIS_IV] - record_video, score, eslc
    // Tables: [DS_Test_WAIS_IV]
    // Conditions: [DS_Test_WAIS_IV] - id_session    
    static update_by_idSession(idSession, record_video, score, eslc) {
        let strQuery = "UPDATE DS_Test_WAIS_IV " +
                       "SET record_video = ?, score = ?, eslc = ? " + 
                       "WHERE id_session = ? ";
        
        return db.execute(strQuery, [record_video, score, eslc, idSession]);
    }
};