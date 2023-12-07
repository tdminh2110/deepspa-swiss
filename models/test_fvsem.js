const db = require('../util/database');

module.exports = class DS_Test_FVSEM {
        constructor(idTest, idSession, test_done,
                    animaux_duree, animaux_reponses, animaux_intrusions, animaux_oublis_a_mesure, animaux_erreurs, animaux_text_zone, animaux_video, 
                    fruits_duree, fruits_reponses, fruits_intrusions, fruits_oublis_a_mesure, fruits_erreurs, fruits_text_zone, fruits_video) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.test_done = test_done;        
        this.animaux_duree = animaux_duree;
        this.animaux_reponses = animaux_reponses;
        this.animaux_intrusions = animaux_intrusions;
        this.animaux_oublis_a_mesure = animaux_oublis_a_mesure;
        this.animaux_erreurs = animaux_erreurs;
        this.animaux_text_zone = animaux_text_zone;
        this.animaux_video = animaux_video;
        this.fruits_duree = fruits_duree;
        this.fruits_reponses = fruits_reponses;
        this.fruits_intrusions = fruits_intrusions;
        this.fruits_oublis_a_mesure = fruits_oublis_a_mesure;
        this.fruits_erreurs = fruits_erreurs;
        this.fruits_text_zone = fruits_text_zone;
        this.fruits_video = fruits_video;        
    }

    insert() {
        let strQuery = "INSERT INTO DS_Test_FVSEM (id_session, test_done, " +
                            "animaux_duree, animaux_reponses, animaux_intrusions, animaux_oublis_a_mesure, " + 
                            "animaux_erreurs, animaux_text_zone, animaux_video, " +
                            "fruits_duree, fruits_reponses, fruits_intrusions, fruits_oublis_a_mesure, " + 
                            "fruits_erreurs, fruits_text_zone, fruits_video) " +
                        "VALUES (?, ?, " +                                
                               "?, ?, ?, ?, " + 
                               "?, ?, ?, " +                                
                               "?, ?, ?, ?, " +
                               "?, ?, ?) ";

        return db.execute(strQuery, 
            [this.idSession, this.test_done,                 
                this.animaux_duree, this.animaux_reponses, this.animaux_intrusions, this.animaux_oublis_a_mesure, 
                this.animaux_erreurs, this.animaux_text_zone, this.animaux_video, 
                this.fruits_duree, this.fruits_reponses, this.fruits_intrusions, this.fruits_oublis_a_mesure, 
                this.fruits_erreurs, this.fruits_text_zone, this.fruits_video]);
    }

    // Fields: [DS_Test_FVSEM] - id_session
    // Tables: [DS_Test_FVSEM]
    // Conditions: [DS_Test_FVSEM] - id_session    
    static delete_by_idSession(idSession) {
        let strQuery = 'DELETE FROM DS_Test_FVSEM ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_FVSEM] - id
    // Tables: [DS_Test_FVSEM]
    // Conditions: [DS_Test_FVSEM] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_FVSEM ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_FVSEM] - test_done
    // Tables: [DS_Test_FVSEM]
    // Conditions: [DS_Test_FVSEM] - id_session    
    static select_testDone_by_idSession(idSession) {
        let strQuery = 'SELECT test_done ' +
                       'FROM DS_Test_FVSEM ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }
    
    // Fields: [DS_Test_FVSEM] - animaux_duree, animaux_reponses, animaux_intrusions, animaux_oublis_a_mesure, animaux_erreurs, animaux_text_zone, animaux_video,
    //                           fruits_duree, fruits_reponses, fruits_intrusions, fruits_oublis_a_mesure, fruits_erreurs, fruits_text_zone, fruits_video
    // Tables: [DS_Test_FVSEM]
    // Conditions: [DS_Test_FVSEM] - id_session    
    static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT animaux_duree, animaux_reponses, animaux_intrusions, animaux_oublis_a_mesure, animaux_erreurs, animaux_text_zone, animaux_video, ' +
                              'fruits_duree, fruits_reponses, fruits_intrusions, fruits_oublis_a_mesure, fruits_erreurs, fruits_text_zone, fruits_video ' +
                       'FROM DS_Test_FVSEM ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }
    
    // Fields: [DS_Test_FVSEM] - test_done, animaux_duree, animaux_reponses, animaux_intrusions, animaux_oublis_a_mesure, 
                           // animaux_erreurs, animaux_text_zone, animaux_video
    // Tables: [DS_Test_FVSEM]
    // Conditions: [DS_Test_FVSEM] - id_session    
    static update_animaux_by_idSession(idSession, test_done, 
                                    animaux_duree, animaux_reponses, animaux_intrusions, animaux_oublis_a_mesure, animaux_erreurs, animaux_text_zone, animaux_video) {
        let strQuery = 'UPDATE DS_Test_FVSEM ' +
                        'SET test_done = ?, animaux_duree = ?, animaux_reponses = ?, animaux_intrusions = ?, ' +
                            'animaux_oublis_a_mesure = ?, animaux_erreurs = ?, animaux_text_zone = ?, ' +                 
                            'animaux_video = ? ' +
                        'WHERE id_session = ? ';

        return db.execute(strQuery, [test_done, animaux_duree, animaux_reponses, animaux_intrusions, animaux_oublis_a_mesure, 
                                    animaux_erreurs, animaux_text_zone, animaux_video, idSession]);
    }

    // Fields: [DS_Test_FVSEM] - test_done, fruits_duree, fruits_reponses, fruits_intrusions, fruits_oublis_a_mesure, 
                           // fruits_erreurs, fruits_text_zone, fruits_video
    // Tables: [DS_Test_FVSEM]
    // Conditions: [DS_Test_FVSEM] - id_session    
    static update_fruits_by_idSession(idSession, test_done, 
        fruits_duree, fruits_reponses, fruits_intrusions, fruits_oublis_a_mesure, fruits_erreurs, fruits_text_zone, fruits_video) {
        let strQuery = 'UPDATE DS_Test_FVSEM ' +
                            'SET test_done = ?, fruits_duree = ?, fruits_reponses = ?, fruits_intrusions = ?, ' +
                            'fruits_oublis_a_mesure = ?, fruits_erreurs = ?, fruits_text_zone = ?, ' +                 
                            'fruits_video = ? ' +
                        'WHERE id_session = ? ';

        return db.execute(strQuery, [test_done, fruits_duree, fruits_reponses, fruits_intrusions, fruits_oublis_a_mesure, 
                fruits_erreurs, fruits_text_zone, fruits_video, idSession]);
        }
};