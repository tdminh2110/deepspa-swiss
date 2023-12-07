const db = require('../util/database');

module.exports = class DS_Test_D2 {
        constructor(idTest, idSession, record_video, test_time) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.record_video = record_video;
        this.test_time = test_time;
    }

    insert() {        
        let strQuery = "INSERT INTO DS_Test_D2 (id_session, record_video, test_time) " +
                       "VALUES (?, ?, ?) ";
                               
        return db.execute(strQuery, 
        [this.idSession, this.record_video, this.test_time]);
    }

    // Fields: [DS_Test_D2] - id
    // Tables: [DS_Test_D2]
    // Conditions: [DS_Test_D2] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_D2 ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_D2] - record_video, test_time
    // Tables: [DS_Test_D2]
    // Conditions: [DS_Test_D2] - id_session    
    static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT record_video, test_time ' +
                       'FROM DS_Test_D2 ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_D2] - record_video, test_time
    // Tables: [DS_Test_D2]
    // Conditions: [DS_Test_D2] - id_session    
    static update_by_idSession(idSession, record_video, test_time) {
        let strQuery = "UPDATE DS_Test_D2 " +
                       "SET record_video = ?, test_time = ? " + 
                       "WHERE id_session = ? ";
        
        return db.execute(strQuery, [record_video, test_time, idSession]);
    }
};