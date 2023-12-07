const db = require('../util/database');

module.exports = class DS_Test_FVLEX {
        constructor(idTest, idSession, test_done, 
                    p_duree, p_reponses, p_intrusions, p_oublis_a_mesure, p_erreurs, p_text_zone, p_video, 
                    r_duree, r_reponses, r_intrusions, r_oublis_a_mesure, r_erreurs, r_text_zone, r_video) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.test_done = test_done;
        this.p_duree = p_duree;
        this.p_reponses = p_reponses;
        this.p_intrusions = p_intrusions;
        this.p_oublis_a_mesure = p_oublis_a_mesure;
        this.p_erreurs = p_erreurs;
        this.p_text_zone = p_text_zone;
        this.p_video = p_video;
        this.r_duree = r_duree;
        this.r_reponses = r_reponses;
        this.r_intrusions = r_intrusions;
        this.r_oublis_a_mesure = r_oublis_a_mesure;
        this.r_erreurs = r_erreurs;
        this.r_text_zone = r_text_zone;
        this.r_video = r_video;
    }

    insert() {
        let strQuery = "INSERT INTO DS_Test_FVLEX (id_session, test_done, " +
                            "p_duree, p_reponses, p_intrusions, p_oublis_a_mesure, p_erreurs, p_text_zone, p_video, " +
                            "r_duree, r_reponses, r_intrusions, r_oublis_a_mesure, r_erreurs, r_text_zone, r_video) " +
                        "VALUES (?, ?, " + 
                               "?, ?, ?, ?, ?, ?, ?, " + 
                               "?, ?, ?, ?, ?, ?, ?) ";

        return db.execute(strQuery, 
            [this.idSession, this.test_done, 
                this.p_duree, this.p_reponses, this.p_intrusions, this.p_oublis_a_mesure, this.p_erreurs, this.p_text_zone, this.p_video, 
                this.r_duree, this.r_reponses, this.r_intrusions, this.r_oublis_a_mesure, this.r_erreurs, this.r_text_zone, this.r_video]);
    }

    // Fields: [DS_Test_FVLEX] - id_session
    // Tables: [DS_Test_FVLEX]
    // Conditions: [DS_Test_FVLEX] - id_session    
    static delete_by_idSession(idSession) {
        let strQuery = 'DELETE FROM DS_Test_FVLEX ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_FVLEX] - id
    // Tables: [DS_Test_FVLEX]
    // Conditions: [DS_Test_FVLEX] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_FVLEX ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

       // Fields: [DS_Test_FVLEX] - test_done
    // Tables: [DS_Test_FVLEX]
    // Conditions: [DS_Test_FVLEX] - id_session    
    static select_testDone_by_idSession(idSession) {
        let strQuery = 'SELECT test_done ' +
                       'FROM DS_Test_FVLEX ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }
    
    // Fields: [DS_Test_FVLEX] - p_duree, p_reponses, p_intrusions, p_oublis_a_mesure, 	p_erreurs, p_text_zone, p_video,
    //                           r_duree, r_reponses, r_intrusions, r_oublis_a_mesure, 	r_erreurs, r_text_zone, r_video
    // Tables: [DS_Test_FVLEX]
    // Conditions: [DS_Test_FVLEX] - id_session    
    static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT p_duree, p_reponses, p_intrusions, p_oublis_a_mesure, p_erreurs, p_text_zone, p_video, ' +
                              'r_duree, r_reponses, r_intrusions, r_oublis_a_mesure, r_erreurs, r_text_zone, r_video ' +
                       'FROM DS_Test_FVLEX ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }
    
    // Fields: [DS_Test_FVLEX] - test_done, p_duree, p_reponses, p_intrusions, p_oublis_a_mesure, 
                           // p_erreurs, p_text_zone, p_video
    // Tables: [DS_Test_FVLEX]
    // Conditions: [DS_Test_FVLEX] - id_session    
    static update_p_by_idSession(idSession, test_done, 
                                    p_duree, p_reponses, p_intrusions, p_oublis_a_mesure, p_erreurs, p_text_zone, p_video) {
        let strQuery = 'UPDATE DS_Test_FVLEX ' +
                        'SET test_done = ?, p_duree = ?, p_reponses = ?, p_intrusions = ?, ' +
                            'p_oublis_a_mesure = ?, p_erreurs = ?, p_text_zone = ?, ' +                 
                            'p_video = ? ' +
                        'WHERE id_session = ? ';

        return db.execute(strQuery, [test_done, p_duree, p_reponses, p_intrusions, p_oublis_a_mesure, 
                                    p_erreurs, p_text_zone, p_video, idSession]);
    }

    // Fields: [DS_Test_FVLEX] - test_done, r_duree, r_reponses, r_intrusions, r_oublis_a_mesure, 
                           // r_erreurs, r_text_zone, r_video
    // Tables: [DS_Test_FVLEX]
    // Conditions: [DS_Test_FVLEX] - id_session    
    static update_r_by_idSession(idSession, test_done, 
                                    r_duree, r_reponses, r_intrusions, r_oublis_a_mesure, r_erreurs, r_text_zone, r_video) {
        let strQuery = 'UPDATE DS_Test_FVLEX ' +
                        'SET test_done = ?, r_duree = ?, r_reponses = ?, r_intrusions = ?, ' +
                            'r_oublis_a_mesure = ?, r_erreurs = ?, r_text_zone = ?, ' +                 
                            'r_video = ? ' +
                        'WHERE id_session = ? ';

        return db.execute(strQuery, [test_done, r_duree, r_reponses, r_intrusions, r_oublis_a_mesure, 
                                    r_erreurs, r_text_zone, r_video, idSession]);
        }
};