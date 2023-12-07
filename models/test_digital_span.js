const db = require('../util/database');

module.exports = class DS_Test_Digital_Span {
        constructor(idTest, idSession, record_audio, vor, ruc) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.record_audio = record_audio;
        this.vor = vor;
        this.ruc = ruc;
    }

    insert() {        
        let strQuery = "INSERT INTO DS_Test_Digital_Span (id_session, record_audio, vor, ruc) " +
                       "VALUES (?, ?, ?, ?) ";
                               
        return db.execute(strQuery, 
        [this.idSession, this.record_audio, this.vor, this.ruc]);
    }

    // Fields: [DS_Test_Digital_Span] - id_session
    // Tables: [DS_Test_Digital_Span]
    // Conditions: [DS_Test_Digital_Span] - id_session    
    static delete_by_idSession(idSession) {
        let strQuery = 'DELETE FROM DS_Test_Digital_Span ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Digital_Span] - id
    // Tables: [DS_Test_Digital_Span]
    // Conditions: [DS_Test_Digital_Span] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_Digital_Span ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Digital_Span] - record_audio, vor, ruc
    // Tables: [DS_Test_Digital_Span]
    // Conditions: [DS_Test_Digital_Span] - id_session    
    static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT record_audio, vor, ruc ' +
                       'FROM DS_Test_Digital_Span ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Digital_Span] - record_audio, vor, ruc
    // Tables: [DS_Test_Digital_Span]
    // Conditions: [DS_Test_Digital_Span] - id_session    
    static update_by_idSession(idSession, record_audio, vor, ruc) {
        let strQuery = 'UPDATE DS_Test_Digital_Span ' +
                       'SET record_audio = ?, vor = ?, ruc = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [record_audio, vor, ruc, idSession]);
    }
};