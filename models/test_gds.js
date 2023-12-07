const db = require('../util/database');

module.exports = class DS_Test_GDS {
    constructor(idTest, idSession, score, commentaires) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.score = score;
        this.commentaires = commentaires;
    }

    insert() {        
        let strQuery = "INSERT INTO DS_Test_GDS (id_session, score, commentaires) " + 
                       "VALUES (?, ?, ?) ";

        return db.execute(strQuery, 
              [this.idSession, this.score, this.commentaires]  
        );
    }

    // Fields: [DS_Test_GDS] - id_session
    // Tables: [DS_Test_GDS]
    // Conditions: [DS_Test_GDS] - id_session    
    static delete_by_idSession(idSession) {
        let strQuery = 'DELETE FROM DS_Test_GDS ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_GDS] - id
    // Tables: [DS_Test_GDS]
    // Conditions: [DS_Test_GDS] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_GDS ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_GDS] - score, commentaires
    // Tables: [DS_Test_GDS]
    // Conditions: [DS_Test_GDS] - id_session    
    static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT score, commentaires ' +
                       'FROM DS_Test_GDS ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);
    }

    // Fields: [DS_Test_GDS] - score, commentaires
    // Tables: [DS_Test_GDS]
    // Conditions: [DS_Test_GDS] - id_session    
    static update_by_idSession(idSession, score, commentaires) {
        let strQuery = 'UPDATE DS_Test_GDS ' +
                       'SET score = ?, commentaires = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [score, commentaires, idSession]);
    }
};