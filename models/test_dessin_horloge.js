const db = require('../util/database');

module.exports = class DS_Test_Dessin_Horloge {
        constructor(idTest, idSession, record_video, score, test_type) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.record_video = record_video;
        this.score = score;
        this.test_type = test_type;
    }

    insert() {        
        let strQuery = "INSERT INTO DS_Test_Dessin_Horloge (id_session, record_video, score, test_type) " +
                       "VALUES (?, ?, ?, ?) ";
                               
        return db.execute(strQuery, 
        [this.idSession, this.record_video, this.score, this.test_type]);
    }

    // Fields: [DS_Test_Dessin_Horloge] - id_session
    // Tables: [DS_Test_Dessin_Horloge]
    // Conditions: [DS_Test_Dessin_Horloge] - id_session    
    static delete_by_idSession(idSession) {
        let strQuery = 'DELETE FROM DS_Test_Dessin_Horloge ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Dessin_Horloge] - id
    // Tables: [DS_Test_Dessin_Horloge]
    // Conditions: [DS_Test_Dessin_Horloge] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_Dessin_Horloge ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_MMSE] - record_video, orientation_temporelle, orientation_spatiale, list_number, apprentissage, 
    //                          attention_et_calcul, rappel, langage, praxies_constructives, total, commentaires
    // Tables: [DS_Test_MMSE]
    // Conditions: [DS_Test_MMSE] - id_session    
    /*static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT record_video, orientation_temporelle, orientation_spatiale, list_number, apprentissage, ' +
                            'attention_et_calcul, rappel, langage, praxies_constructives, total, commentaires ' +
                       'FROM DS_Test_MMSE ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }*/

    // Fields: [DS_Test_Dessin_Horloge] - record_video, score, test_type
    // Tables: [DS_Test_Dessin_Horloge]
    // Conditions: [DS_Test_Dessin_Horloge] - id_session    
    static update_by_idSession(idSession, record_video, score, test_type) {
        let strQuery = 'UPDATE DS_Test_Dessin_Horloge ' +
                       'SET record_video = ?, score = ?, test_type = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [record_video, score, test_type, idSession]);
    }
};