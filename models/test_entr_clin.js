const db = require('../util/database');

module.exports = class DS_Test_Entr_Clin {
        constructor(idTest, idSession, partie, histoire_medicale_commentaires, discussion_libre_number_files, discussion_libre_commentaires, 
                        raconter_journee_number_files, raconter_journee_commentaires, conclusion_commentaires, FCS_S1, FCS_S2, FCS_S3, FCS_S4,
                        GDS_Score, GDS_commentaires, inventaire_apathie_emoussement_affectif, inventaire_apathie_perte_d_initiative, 
                        inventaire_apathie_perte_d_interet) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.partie = partie;
        this.histoire_medicale_commentaires = histoire_medicale_commentaires;
        this.discussion_libre_number_files = discussion_libre_number_files;
        this.discussion_libre_commentaires = discussion_libre_commentaires;
        this.raconter_journee_number_files = raconter_journee_number_files;
        this.raconter_journee_commentaires = raconter_journee_commentaires;
        this.conclusion_commentaires = conclusion_commentaires;
        this.FCS_S1 = FCS_S1;
        this.FCS_S2 = FCS_S2;
        this.FCS_S3 = FCS_S3;
        this.FCS_S4 = FCS_S4;
        this.GDS_Score = GDS_Score;
        this.GDS_commentaires = GDS_commentaires;
        this.inventaire_apathie_emoussement_affectif = inventaire_apathie_emoussement_affectif;
        this.inventaire_apathie_perte_d_initiative = inventaire_apathie_perte_d_initiative;
        this.inventaire_apathie_perte_d_interet = inventaire_apathie_perte_d_interet;
    }

    insert() {        
        let strQuery = "INSERT INTO DS_Test_Entr_Clin (id_session, partie, histoire_medicale_commentaires, discussion_libre_number_files, " +
                            "discussion_libre_commentaires, raconter_journee_number_files, raconter_journee_commentaires, conclusion_commentaires, " + 
                            "FCS_S1, FCS_S2, FCS_S3, FCS_S4, GDS_Score, GDS_commentaires, inventaire_apathie_emoussement_affectif, " + 
                            "inventaire_apathie_perte_d_initiative, inventaire_apathie_perte_d_interet) " +
                       "VALUES (?, ?, ?, ?, " +
                               "?, ?, ?, ?, " +
                               "?, ?, ?, ?, ?, ?, ?, " +
                               "?, ?) ";
                               
        return db.execute(strQuery, 
            [this.idSession, this.partie, this.histoire_medicale_commentaires, this.discussion_libre_number_files, 
                this.discussion_libre_commentaires, this.raconter_journee_number_files, this.raconter_journee_commentaires, 
                this.conclusion_commentaires, this.FCS_S1, this.FCS_S2, this.FCS_S3, this.FCS_S4, this.GDS_Score, this.GDS_commentaires,
                this.inventaire_apathie_emoussement_affectif, this.inventaire_apathie_perte_d_initiative, 
                this.inventaire_apathie_perte_d_interet]);
    }

    // Fields: [DS_Test_Entr_Clin] - id_session
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static delete_by_idSession(idSession) {
        let strQuery = 'DELETE FROM DS_Test_Entr_Clin ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }
    
    // Fields: [DS_Test_Entr_Clin] - id
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_Entr_Clin ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Entr_Clin] - partie, conclusion_commentaires
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static select_conclusion_by_idSession(idSession) {
        let strQuery = 'SELECT partie, conclusion_commentaires ' +
                       'FROM DS_Test_Entr_Clin ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Entr_Clin] - partie, discussion_libre_number_files, discussion_libre_commentaires
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static select_discussion_libre_by_idSession(idSession) {
        let strQuery = 'SELECT partie, discussion_libre_number_files, discussion_libre_commentaires ' +
                       'FROM DS_Test_Entr_Clin ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Entr_Clin] - partie, histoire_medicale_commentaires, discussion_libre_number_files, discussion_libre_commentaires, 
    //                                                                       raconter_journee_number_files, raconter_journee_commentaires
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static select_exist_by_idSession(idSession) {
        let strQuery = 'SELECT partie, histoire_medicale_commentaires, discussion_libre_number_files , discussion_libre_commentaires, ' + 
                                                                        'raconter_journee_number_files, raconter_journee_commentaires ' +
                       'FROM DS_Test_Entr_Clin ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Entr_Clin] - partie, histoire_medicale_commentaires
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static select_histoire_medicale_by_idSession(idSession) {
        let strQuery = 'SELECT partie, histoire_medicale_commentaires ' +
                       'FROM DS_Test_Entr_Clin ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Entr_Clin] - partie
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static select_partie_by_idSession(idSession) {
        let strQuery = 'SELECT partie ' +
                       'FROM DS_Test_Entr_Clin ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Entr_Clin] - partie, raconter_journee_number_files, raconter_journee_commentaires
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static select_raconter_journee_by_idSession(idSession) {
        let strQuery = 'SELECT partie, raconter_journee_number_files, raconter_journee_commentaires ' +
                       'FROM DS_Test_Entr_Clin ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Entr_Clin] - FCS_S1, FCS_S2, FCS_S3, FCS_S4, GDS_Score, GDS_commentaires, inventaire_apathie_emoussement_affectif
    //                               inventaire_apathie_perte_d_initiative, inventaire_apathie_perte_d_interet
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT FCS_S1, FCS_S2, FCS_S3, FCS_S4, GDS_Score, GDS_commentaires, inventaire_apathie_emoussement_affectif, ' +
                              'inventaire_apathie_perte_d_initiative, inventaire_apathie_perte_d_interet ' +
                       'FROM DS_Test_Entr_Clin ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);
    }

    // Fields: [DS_Test_Entr_Clin] - partie, histoire_medicale_commentaires, discussion_libre_number_files, discussion_libre_commentaires, 
    //                                  raconter_journee_number_files, raconter_journee_commentaires, conclusion_commentaires, FCS_S1, FCS_S2, FCS_S3, FCS_S4,
    //                                  GDS_Score, GDS_commentaires, inventaire_apathie_emoussement_affectif, inventaire_apathie_perte_d_initiative, 
    //                                  inventaire_apathie_perte_d_interet
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static update_by_idSession(idSession, partie, histoire_medicale_commentaires, discussion_libre_number_files, discussion_libre_commentaires, 
                                          raconter_journee_number_files, raconter_journee_commentaires, conclusion_commentaires, FCS_S1, FCS_S2, FCS_S3, FCS_S4,
                                          GDS_Score, GDS_commentaires, inventaire_apathie_emoussement_affectif, inventaire_apathie_perte_d_initiative, 
                                          inventaire_apathie_perte_d_interet) {
        let strQuery = "UPDATE DS_Test_Entr_Clin " +
                       "SET partie = ?, histoire_medicale_commentaires = ?, discussion_libre_number_files = ?, " + 
                           "discussion_libre_commentaires = ?, raconter_journee_number_files = ?, raconter_journee_commentaires = ?, " + 
                           "conclusion_commentaires = ?, FCS_S1 = ?, FCS_S2 = ?, FCS_S3 = ?, FCS_S4 = ?, GDS_Score = ?, " +
                           "GDS_commentaires = ?, inventaire_apathie_emoussement_affectif = ?, inventaire_apathie_perte_d_initiative = ?, " + 
                           "inventaire_apathie_perte_d_interet = ? " +
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [partie, histoire_medicale_commentaires, discussion_libre_number_files, discussion_libre_commentaires, 
                                        raconter_journee_number_files, raconter_journee_commentaires, conclusion_commentaires, FCS_S1, FCS_S2, FCS_S3, FCS_S4,
                                        GDS_Score, GDS_commentaires, inventaire_apathie_emoussement_affectif, inventaire_apathie_perte_d_initiative, 
                                        inventaire_apathie_perte_d_interet, idSession]);
    }


    // Fields: [DS_Test_Entr_Clin] - partie, conclusion_commentaires
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static update_conclusion_by_idSession(idSession, partie, conclusion_commentaires) {
        let strQuery = 'UPDATE DS_Test_Entr_Clin ' +
                       'SET partie = ?, conclusion_commentaires = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [partie, conclusion_commentaires, idSession]);
    }

    // Fields: [DS_Test_Entr_Clin] - partie, discussion_libre_number_files, discussion_libre_commentaires
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static update_discussion_libre_by_idSession(idSession, partie, discussion_libre_number_files, discussion_libre_commentaires) {
        let strQuery = 'UPDATE DS_Test_Entr_Clin ' +
                       'SET partie = ?, discussion_libre_number_files = ?, discussion_libre_commentaires = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [partie, discussion_libre_number_files, discussion_libre_commentaires, idSession]);
    }

    // Fields: [DS_Test_Entr_Clin] - discussion_libre_commentaires
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static update_discussion_libre_commentaires_by_idSession(idSession, discussion_libre_commentaires) {
        let strQuery = 'UPDATE DS_Test_Entr_Clin ' +
                       'SET discussion_libre_commentaires = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [discussion_libre_commentaires, idSession]);
    }

    // Fields: [DS_Test_Entr_Clin] - partie, FCS_S1, FCS_S2, FCS_S3, FCS_S4,
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static update_fcs_by_idSession(idSession, partie, FCS_S1, FCS_S2, FCS_S3, FCS_S4) {
        let strQuery = 'UPDATE DS_Test_Entr_Clin ' +
                       'SET partie = ?, FCS_S1 = ?, FCS_S2 = ?, FCS_S3 = ?, FCS_S4 = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [partie, FCS_S1, FCS_S2, FCS_S3, FCS_S4, idSession]);
    }

    // Fields: [DS_Test_Entr_Clin] - partie, GDS_Score, GDS_commentaires
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static update_gds_by_idSession(idSession, partie, GDS_Score, GDS_commentaires) {
        let strQuery = 'UPDATE DS_Test_Entr_Clin ' +
                       'SET partie = ?, GDS_Score = ?, GDS_commentaires = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [partie, GDS_Score, GDS_commentaires, idSession]);
    }

    // Fields: [DS_Test_Entr_Clin] - partie, histoire_medicale_commentaires
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static update_histoire_medicale_by_idSession(idSession, partie, histoire_medicale_commentaires) {
        let strQuery = 'UPDATE DS_Test_Entr_Clin ' +
                       'SET partie = ?, histoire_medicale_commentaires = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [partie, histoire_medicale_commentaires, idSession]);
    }

    // Fields: [DS_Test_Entr_Clin] - histoire_medicale_commentaires
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static update_histoire_medicale_commentaires_by_idSession(idSession, histoire_medicale_commentaires) {
        let strQuery = 'UPDATE DS_Test_Entr_Clin ' +
                       'SET histoire_medicale_commentaires = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [histoire_medicale_commentaires, idSession]);
    }

    // Fields: [DS_Test_Entr_Clin] - partie, inventaire_apathie_emoussement_affectif, inventaire_apathie_perte_d_initiative, 
    //                                  inventaire_apathie_perte_d_interet
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static update_ia_by_idSession(idSession, partie, inventaire_apathie_emoussement_affectif, inventaire_apathie_perte_d_initiative, 
                                                    inventaire_apathie_perte_d_interet) {
        let strQuery = 'UPDATE DS_Test_Entr_Clin ' +
                       'SET partie = ?, inventaire_apathie_emoussement_affectif = ?, inventaire_apathie_perte_d_initiative = ?, ' +
                                       'inventaire_apathie_perte_d_interet = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [partie, inventaire_apathie_emoussement_affectif, inventaire_apathie_perte_d_initiative, 
                                             inventaire_apathie_perte_d_interet, idSession]);
    }

    // Fields: [DS_Test_Entr_Clin] - partie, raconter_journee_number_files, raconter_journee_commentaires
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static update_raconter_journee_by_idSession(idSession, partie, raconter_journee_number_files, raconter_journee_commentaires) {
        let strQuery = 'UPDATE DS_Test_Entr_Clin ' +
                       'SET partie = ?, raconter_journee_number_files = ?, raconter_journee_commentaires = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [partie, raconter_journee_number_files, raconter_journee_commentaires, idSession]);
    }

    // Fields: [DS_Test_Entr_Clin] - raconter_journee_commentaires
    // Tables: [DS_Test_Entr_Clin]
    // Conditions: [DS_Test_Entr_Clin] - id_session    
    static update_raconter_journee_commentaires_by_idSession(idSession, raconter_journee_commentaires) {
        let strQuery = 'UPDATE DS_Test_Entr_Clin ' +
                       'SET raconter_journee_commentaires = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [raconter_journee_commentaires, idSession]);
    }
};