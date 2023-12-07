const db = require('../util/database');

module.exports = class DS_Test_Zoo {
        constructor(idTest, idSession, record_video) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.record_video = record_video;
    }

    insert() {        
        let strQuery = "INSERT INTO DS_Test_Zoo (id_session, record_video) " +
                       "VALUES (?, ?) ";
                               
        return db.execute(strQuery, 
        [this.idSession, this.record_video]);
    }

    // Fields: [DS_Test_Zoo] - id
    // Tables: [DS_Test_Zoo]
    // Conditions: [DS_Test_Zoo] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_Zoo ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Zoo] - record_video
    // Tables: [DS_Test_Zoo]
    // Conditions: [DS_Test_Zoo] - id_session    
    static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT record_video ' +
                       'FROM DS_Test_Zoo ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Zoo] - record_video
    // Tables: [DS_Test_Zoo]
    // Conditions: [DS_Test_Zoo] - id_session    
    static update_by_idSession(idSession, record_video) {
        let strQuery = "UPDATE DS_Test_Zoo " +
                       "SET record_video = ? " + 
                       "WHERE id_session = ? ";
        
        return db.execute(strQuery, [record_video, idSession]);
    }
};