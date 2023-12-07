const db = require('../util/database');

module.exports = class DS_Test_Eval_Acc {
    constructor(idTest, idSession, appreciation_generale, niveau_de_confort, niveau_de_satisfaction, retrait_envisage, preference, remarques) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.appreciation_generale = appreciation_generale;
        this.niveau_de_confort = niveau_de_confort;
        this.niveau_de_satisfaction = niveau_de_satisfaction;
        this.retrait_envisage = retrait_envisage;
        this.preference = preference;
        this.remarques = remarques;
    }

    insert() {        
        let strQuery = "INSERT INTO DS_Test_Eval_Acc (id_session, appreciation_generale, niveau_de_confort, niveau_de_satisfaction, retrait_envisage, preference, remarques) " + 
                       "VALUES (?, ?, ?, ?, ?, ?, ?) ";

        return db.execute(strQuery, 
              [this.idSession, this.appreciation_generale, this.niveau_de_confort, this.niveau_de_satisfaction, this.retrait_envisage, this.preference, this.remarques]  
        );
    }

    // Fields: [DS_Test_Eval_Acc] - id_session
    // Tables: [DS_Test_Eval_Acc]
    // Conditions: [DS_Test_Eval_Acc] - id_session    
    static delete_by_idSession(idSession) {
        let strQuery = 'DELETE FROM DS_Test_Eval_Acc ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Eval_Acc] - id
    // Tables: [DS_Test_Eval_Acc]
    // Conditions: [DS_Test_Eval_Acc] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_Eval_Acc ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Eval_Acc] - appreciation_generale, niveau_de_confort, niveau_de_satisfaction, retrait_envisage, preference, remarques
    // Tables: [DS_Test_Eval_Acc]
    // Conditions: [DS_Test_Eval_Acc] - id_session    
    static update_by_idSession(idSession, appreciation_generale, niveau_de_confort, niveau_de_satisfaction, retrait_envisage, preference, remarques) {
        let strQuery = 'UPDATE DS_Test_Eval_Acc ' +
                       'SET appreciation_generale = ?, niveau_de_confort = ?, niveau_de_satisfaction = ?, retrait_envisage = ?, preference = ?, remarques = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [appreciation_generale, niveau_de_confort, niveau_de_satisfaction, retrait_envisage, preference, remarques, idSession]);
    }
};