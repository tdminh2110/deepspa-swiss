const db = require('../util/database');

module.exports = class DS_Test_Trial_Making_Test {
        constructor(idTest, idSession, record_video, trial_making_a_time, trial_making_b_time) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.record_video = record_video;
        this.trial_making_a_time = trial_making_a_time;
        this.trial_making_b_time = trial_making_b_time;
    }

    insert() {        
        let strQuery = "INSERT INTO DS_Test_Trial_Making_Test (id_session, record_video, trial_making_a_time, trial_making_b_time) " +
                       "VALUES (?, ?, ?, ?) ";
                               
        return db.execute(strQuery, 
        [this.idSession, this.record_video, this.trial_making_a_time, this.trial_making_b_time]);
    }

    // Fields: [DS_Test_Trial_Making_Test] - id
    // Tables: [DS_Test_Trial_Making_Test]
    // Conditions: [DS_Test_Trial_Making_Test] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_Trial_Making_Test ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Trial_Making_Test] - record_video, trial_making_a_time, trial_making_b_time
    // Tables: [DS_Test_Trial_Making_Test]
    // Conditions: [DS_Test_Trial_Making_Test] - id_session    
    static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT record_video, trial_making_a_time, trial_making_b_time ' +
                       'FROM DS_Test_Trial_Making_Test ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Trial_Making_Test] - record_video, trial_making_a_time, trial_making_b_time
    // Tables: [DS_Test_Trial_Making_Test]
    // Conditions: [DS_Test_Trial_Making_Test] - id_session    
    static update_by_idSession(idSession, record_video, trial_making_a_time, trial_making_b_time) {
        let strQuery = "UPDATE DS_Test_Trial_Making_Test " +
                       "SET record_video = ?, trial_making_a_time = ?, trial_making_b_time = ? " + 
                       "WHERE id_session = ? ";
        
        return db.execute(strQuery, [record_video, trial_making_a_time, trial_making_b_time, idSession]);
    }
};