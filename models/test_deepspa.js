const db = require('../util/database');

module.exports = class DS_Test_DeepSpa {
        constructor(idTest, idSession, partie, entretien_clinique_number_files, entretien_clinique_commentaires, raconter_journee_number_files, 
                    raconter_journee_commentaires, historique_du_patient_commentaires, conclusion_commentaires) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.partie = partie;
        this.entretien_clinique_number_files = entretien_clinique_number_files;
        this.entretien_clinique_commentaires = entretien_clinique_commentaires;
        this.raconter_journee_number_files = raconter_journee_number_files;
        this.raconter_journee_commentaires = raconter_journee_commentaires;
        this.historique_du_patient_commentaires = historique_du_patient_commentaires;
        this.conclusion_commentaires = conclusion_commentaires;
    }

    insert() {        
        let strQuery = "INSERT INTO DS_Test_DeepSpa (id_session, partie, entretien_clinique_number_files, entretien_clinique_commentaires, " +
                                                 "raconter_journee_number_files, raconter_journee_commentaires, historique_du_patient_commentaires, " + 
                                                 "conclusion_commentaires) " +
                       "VALUES (?, ?, ?, ?, " +
                               "?, ?, ?, " +
                               "?)";

        return db.execute(strQuery, 
                        [this.idSession, this.partie, this.entretien_clinique_number_files, this.entretien_clinique_commentaires, this.raconter_journee_number_files,
                        this.raconter_journee_commentaires, this.historique_du_patient_commentaires, this.conclusion_commentaires]);
    }

    // Fields: [DS_Test_DeepSpa] - id_session
    // Tables: [DS_Test_DeepSpa]
    // Conditions: [DS_Test_DeepSpa] - id_session    
    static delete_by_idSession(idSession) {
        let strQuery = 'DELETE FROM DS_Test_DeepSpa ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_DeepSpa] - id
    // Tables: [DS_Test_DeepSpa]
    // Conditions: [DS_Test_DeepSpa] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_DeepSpa ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_DeepSpa] - partie, conclusion_commentaires
    // Tables: [DS_Test_DeepSpa]
    // Conditions: [DS_Test_DeepSpa] - id_session    
    static select_conclusions_by_idSession(idSession) {
        let strQuery = 'SELECT partie, conclusion_commentaires ' +
                       'FROM DS_Test_DeepSpa ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }
    
    // Fields: [DS_Test_DeepSpa] - partie, entretien_clinique_number_files, entretien_clinique_commentaires
    // Tables: [DS_Test_DeepSpa]
    // Conditions: [DS_Test_DeepSpa] - id_session    
    static select_entretien_clinique_by_idSession(idSession) {
        let strQuery = 'SELECT partie, entretien_clinique_number_files, entretien_clinique_commentaires ' +
                       'FROM DS_Test_DeepSpa ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_DeepSpa] - partie, historique_du_patient_commentaires
    // Tables: [DS_Test_DeepSpa]
    // Conditions: [DS_Test_DeepSpa] - id_session    
    static select_historique_du_patient_by_idSession(idSession) {
        let strQuery = 'SELECT partie, historique_du_patient_commentaires ' +
                       'FROM DS_Test_DeepSpa ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_DeepSpa] - partie
    // Tables: [DS_Test_DeepSpa]
    // Conditions: [DS_Test_DeepSpa] - id_session    
    static select_partie_by_idSession(idSession) {
        let strQuery = 'SELECT partie ' +
                       'FROM DS_Test_DeepSpa ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_DeepSpa] - partie, raconter_journee_number_files, raconter_journee_commentaires
    // Tables: [DS_Test_DeepSpa]
    // Conditions: [DS_Test_DeepSpa] - id_session    
    static select_raconter_journee_by_idSession(idSession) {
        let strQuery = 'SELECT partie, raconter_journee_number_files, raconter_journee_commentaires ' +
                       'FROM DS_Test_DeepSpa ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_DeepSpa] - partie, conclusion_commentaires
    // Tables: [DS_Test_DeepSpa]
    // Conditions: [DS_Test_DeepSpa] - id_session    
    static update_conclusions_du_patient_by_idSession(idSession, partie, conclusion_commentaires) {
        let strQuery = 'UPDATE DS_Test_DeepSpa ' +
                       'SET partie = ?, conclusion_commentaires = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [partie, conclusion_commentaires, idSession]);
    }

    // Fields: [DS_Test_DeepSpa] - partie, entretien_clinique_number_files, entretien_clinique_commentaires
    // Tables: [DS_Test_DeepSpa]
    // Conditions: [DS_Test_DeepSpa] - id_session    
    static update_entretien_clinique_by_idSession(idSession, partie, entretien_clinique_number_files, entretien_clinique_commentaires) {
        let strQuery = 'UPDATE DS_Test_DeepSpa ' +
                       'SET partie = ?, entretien_clinique_number_files = ?, entretien_clinique_commentaires = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [partie, entretien_clinique_number_files, entretien_clinique_commentaires, idSession]);
    }

    // Fields: [DS_Test_DeepSpa] - partie, historique_du_patient_commentaires
    // Tables: [DS_Test_DeepSpa]
    // Conditions: [DS_Test_DeepSpa] - id_session    
    static update_historique_du_patient_by_idSession(idSession, partie, historique_du_patient_commentaires) {
        let strQuery = 'UPDATE DS_Test_DeepSpa ' +
                       'SET partie = ?, historique_du_patient_commentaires = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [partie, historique_du_patient_commentaires, idSession]);
    }

    // Fields: [DS_Test_DeepSpa] - partie, raconter_journee_number_files, raconter_journee_commentaires
    // Tables: [DS_Test_DeepSpa]
    // Conditions: [DS_Test_DeepSpa] - id_session    
    static update_raconter_journee_by_idSession(idSession, partie, raconter_journee_number_files, raconter_journee_commentaires) {
        let strQuery = 'UPDATE DS_Test_DeepSpa ' +
                       'SET partie = ?, raconter_journee_number_files = ?, raconter_journee_commentaires = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [partie, raconter_journee_number_files, raconter_journee_commentaires, idSession]);
    }
};