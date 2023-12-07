const db = require('../util/database');

module.exports = class DS_Test_Stroop_Victoria_2 {
    constructor(idTest, idSession, x_1, y_1, z_1, audio_1, x_2, y_2, z_2, audio_2, x_3, y_3, z_3, audio_3) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.x_1 = x_1;
        this.y_1 = y_1;
        this.z_1 = z_1;
        this.audio_1 = audio_1;
        this.x_2 = x_2;
        this.y_2 = y_2;
        this.z_2 = z_2;
        this.audio_2 = audio_2;
        this.x_3 = x_3;
        this.y_3 = y_3;
        this.z_3 = z_3;
        this.audio_3 = audio_3;
    }

    insert() {        
        return db.execute(
            'INSERT INTO DS_Test_Stroop_Victoria_2 (id_session, x_1, y_1, z_1, audio_1, x_2, y_2, z_2, audio_2, x_3, y_3, z_3, audio_3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.idSession, this.x_1, this.y_1, this.z_1, this.audio_1, this.x_2, this.y_2, this.z_2, this.audio_2, this.x_3, this.y_3, this.z_3, this.audio_3]
        );
    }

    // Fields: [DS_Test_Stroop_Victoria_2] - id_session
    // Tables: [DS_Test_Stroop_Victoria_2]
    // Conditions: [DS_Test_Stroop_Victoria_2] - id_session    
    static delete_by_idSession(idSession) {
        let strQuery = 'DELETE FROM DS_Test_Stroop_Victoria_2 ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Stroop_Victoria_2] - id
    // Tables: [DS_Test_Stroop_Victoria_2]
    // Conditions: [DS_Test_Stroop_Victoria_2] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_Stroop_Victoria_2 ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Stroop_Victoria_2] - x_1, y_1, z_1, audio_1, x_2, y_2, z_2, audio_2, x_3, y_3, z_3, audio_3
    // Tables: [DS_Test_Stroop_Victoria_2]
    // Conditions: [DS_Test_Stroop_Victoria_2] - id_session    
    static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT x_1, y_1, z_1, audio_1, x_2, y_2, z_2, audio_2, x_3, y_3, z_3, audio_3 ' +
                       'FROM DS_Test_Stroop_Victoria_2 ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Stroop_Victoria_2] - x_1, y_1, z_1, audio_1, x_2, y_2, z_2, audio_2, x_3, y_3, z_3, audio_3
    // Tables: [DS_Test_Stroop_Victoria_2]
    // Conditions: [DS_Test_Stroop_Victoria_2] - id_session    
    static update_by_idSession(idSession, x_1, y_1, z_1, audio_1, x_2, y_2, z_2, audio_2, x_3, y_3, z_3, audio_3) {
        let strQuery = 'UPDATE DS_Test_Stroop_Victoria_2 ' +
                       'SET x_1 = ?, y_1 = ?, z_1 = ?, audio_1 = ?, x_2 = ?, y_2 = ?, z_2 = ?, audio_2 = ?, x_3 = ?, y_3 = ?, z_3 = ?, audio_3 = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [x_1, y_1, z_1, audio_1, x_2, y_2, z_2, audio_2, x_3, y_3, z_3, audio_3, idSession]);
    }
};
