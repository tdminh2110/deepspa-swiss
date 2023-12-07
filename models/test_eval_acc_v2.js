const db = require('../util/database');

module.exports = class DS_Test_Eval_Acc_V2 {
    constructor(idTest, idSession, satisfaction, facilite_d_utilisation, clarte_des_instruction, repeter_l_experience, retrait, preference,
                                                    recommendation_du_systeme, commentaire_1, commentaire_2, commentaire_3, commentaire_4,
                                                    commentaire_clinician) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.satisfaction = satisfaction;
        this.facilite_d_utilisation = facilite_d_utilisation;
        this.clarte_des_instruction = clarte_des_instruction;
        this.repeter_l_experience = repeter_l_experience;
        this.retrait = retrait;
        this.preference = preference;
        this.recommendation_du_systeme = recommendation_du_systeme;
        this.commentaire_1 = commentaire_1;
        this.commentaire_2 = commentaire_2;
        this.commentaire_3 = commentaire_3;
        this.commentaire_4 = commentaire_4;
        this.commentaire_clinician = commentaire_clinician;
    }

    insert() {        
        let strQuery = "INSERT INTO DS_Test_Eval_Acc_V2 (id_session, satisfaction, facilite_d_utilisation, clarte_des_instruction, " + 
                                                    "repeter_l_experience, retrait, preference, recommendation_du_systeme, " + 
                                                    "commentaire_1, commentaire_2, commentaire_3, commentaire_4, commentaire_clinician) " + 
                       "VALUES (?, ?, ?, ?, " + 
                               "?, ?, ?, ?, " + 
                               "?, ?, ?, ?, ?) ";

        return db.execute(strQuery, 
              [this.idSession, this.satisfaction, this.facilite_d_utilisation, this.clarte_des_instruction, this.repeter_l_experience, 
               this.retrait, this.preference, this.recommendation_du_systeme, this.commentaire_1, this.commentaire_2, this.commentaire_3,
               this.commentaire_4, this.commentaire_clinician]  
        );
    }

    // Fields: [DS_Test_Eval_Acc_V2] - id_session
    // Tables: [DS_Test_Eval_Acc_V2]
    // Conditions: [DS_Test_Eval_Acc_V2] - id_session    
    static delete_by_idSession(idSession) {
        let strQuery = 'DELETE FROM DS_Test_Eval_Acc_V2 ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Eval_Acc_V2] - id
    // Tables: [DS_Test_Eval_Acc_V2]
    // Conditions: [DS_Test_Eval_Acc_V2] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_Eval_Acc_V2 ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Eval_Acc_V2] - satisfaction, facilite_d_utilisation, clarte_des_instruction, repeter_l_experience, retrait, preference,
    //                                 recommendation_du_systeme, commentaire_1, commentaire_2, commentaire_3, commentaire_4, commentaire_clinician
    // Tables: [DS_Test_Eval_Acc_V2]
    // Conditions: [DS_Test_Eval_Acc_V2] - id_session    
    static update_by_idSession(idSession, satisfaction, facilite_d_utilisation, clarte_des_instruction, repeter_l_experience, retrait, preference,
                                          recommendation_du_systeme, commentaire_1, commentaire_2, commentaire_3, commentaire_4, commentaire_clinician) {
        let strQuery = 'UPDATE DS_Test_Eval_Acc_V2 ' +
                       'SET satisfaction = ?, facilite_d_utilisation = ?, clarte_des_instruction = ?, repeter_l_experience = ?, ' + 
                           'retrait = ?, preference = ?, recommendation_du_systeme = ?, commentaire_1 = ?, commentaire_2 = ?, ' +
                           'commentaire_3 = ?, commentaire_4 = ?, commentaire_clinician = ? ' +
                       'WHERE id_session = ? ';       
        
        return db.execute(strQuery, [satisfaction, facilite_d_utilisation, clarte_des_instruction, repeter_l_experience, retrait, preference,
                                     recommendation_du_systeme, commentaire_1, commentaire_2, commentaire_3, commentaire_4, commentaire_clinician, 
                                     idSession]);
    }
};