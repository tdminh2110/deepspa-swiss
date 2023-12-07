const db = require('../util/database');

module.exports = class DS_Test_NPI {
        constructor(idTest, idSession, record_video, F1, G1, R1, F2, G2, R2, F3, G3, R3,
                            F4, G4, R4, F5, G5, R5, F6, G6, R6, F7, G7, R7, F8, G8, R8, F9, G9, R9,
                            F10, G10, R10, F11, G11, R11, F12, G12, R12, commentaires) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.record_video = record_video;
        this.F1 = F1; this.G1 = G1; this.R1 = R1; this.F2 = F2; this.G2 = G2; this.R2 = R2;
        this.F3 = F3; this.G3 = G3; this.R3 = R3; this.F4 = F4; this.G4 = G4; this.R4 = R4;
        this.F5 = F5; this.G5 = G5; this.R5 = R5; this.F6 = F6; this.G6 = G6; this.R6 = R6;
        this.F7 = F7; this.G7 = G7; this.R7 = R7; this.F8 = F8; this.G8 = G8; this.R8 = R8;
        this.F9 = F9; this.G9 = G9; this.R9 = R9; this.F10 = F10; this.G10 = G10; this.R10 = R10;
        this.F11 = F11; this.G11 = G11; this.R11 = R11; this.F12 = F12; this.G12 = G12; this.R12 = R12;
        this.commentaires = commentaires; 
    }

    insert() {        
        let strQuery = "INSERT INTO DS_Test_NPI (id_session, record_video, " +
                            "F1, G1, R1, F2, G2, R2, F3, G3, R3, " + 
                            "F4, G4, R4, F5, G5, R5, F6, G6, R6, " + 
                            "F7, G7, R7, F8, G8, R8, F9, G9, R9, " +
                            "F10, G10, R10, F11, G11, R11, F12, G12, R12, commentaires) " +
                       "VALUES (?, ?, " +
                            "?, ?, ?, ?, ?, ?, ?, ?, ?, " +
                            "?, ?, ?, ?, ?, ?, ?, ?, ?, " +
                            "?, ?, ?, ?, ?, ?, ?, ?, ?, " +
                            "?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                               
        return db.execute(strQuery, 
        [this.idSession, this.record_video, this.F1, this.G1, this.R1, this.F2, this.G2, this.R2,
            this.F3, this.G3, this.R3, this.F4, this.G4, this.R4, this.F5, this.G5, this.R5, 
            this.F6, this.G6, this.R6, this.F7, this.G7, this.R7, this.F8, this.G8, this.R8,
            this.F9, this.G9, this.R9, this.F10, this.G10, this.R10, this.F11, this.G11, this.R11,
            this.F12, this.G12, this.R12, this.commentaires]);
    }

    // Fields: [DS_Test_NPI] - id
    // Tables: [DS_Test_NPI]
    // Conditions: [DS_Test_NPI] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_NPI ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_NPI] - record_video F1, G1, R1, F2, G2, R2, F3, G3, R3,
    //                            F4, G4, R4, F5, G5, R5, F6, G6, R6, F7, G7, R7, F8, G8, R8, F9, G9, R9,
    //                            F10, G10, R10, F11, G11, R11, F12, G12, R12, commentaires
    // Tables: [DS_Test_NPI]
    // Conditions: [DS_Test_NPI] - id_session    
    static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT record_video, F1, G1, R1, F2, G2, R2, F3, G3, R3, ' +
                                'F4, G4, R4, F5, G5, R5, F6, G6, R6, F7, G7, R7, F8, G8, R8, F9, G9, R9, ' +
                                'F10, G10, R10, F11, G11, R11, F12, G12, R12, commentaires ' +
                       'FROM DS_Test_NPI ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_NPI] - record_video F1, G1, R1, F2, G2, R2, F3, G3, R3,
    //                            F4, G4, R4, F5, G5, R5, F6, G6, R6, F7, G7, R7, F8, G8, R8, F9, G9, R9,
    //                            F10, G10, R10, F11, G11, R11, F12, G12, R12, commentaires
    // Tables: [DS_Test_NPI]
    // Conditions: [DS_Test_NPI] - id_session    
    static update_by_idSession(idSession, record_video, F1, G1, R1, F2, G2, R2, F3, G3, R3,
                                F4, G4, R4, F5, G5, R5, F6, G6, R6, F7, G7, R7, F8, G8, R8, F9, G9, R9,
                                F10, G10, R10, F11, G11, R11, F12, G12, R12, commentaires) {
        let strQuery = "UPDATE DS_Test_NPI " +
                       "SET record_video = ?, F1 = ?, G1 = ?, R1 = ?, F2 = ?, G2 = ?, R2 = ?, " +
                            "F3 = ?, G3 = ?, R3 = ?, F4 = ?, G4 = ?, R4 = ?, " +
                            "F5 = ?, G5 = ?, R5 = ?, F6 = ?, G6 = ?, R6 = ?, " +
                            "F7 = ?, G7 = ?, R7 = ?, F8 = ?, G8 = ?, R8 = ?, " +
                            "F9 = ?, G9 = ?, R9 = ?, F10 = ?, G10 = ?, R10 = ?, " +
                            "F11 = ?, G11 = ?, R11 = ?, F12 = ?, G12 = ?, R12 = ?, commentaires = ? " +
                       "WHERE id_session = ? ";
        
        return db.execute(strQuery, [record_video, F1, G1, R1, F2, G2, R2, F3, G3, R3,
                        F4, G4, R4, F5, G5, R5, F6, G6, R6, F7, G7, R7, F8, G8, R8, F9, G9, R9,
                        F10, G10, R10, F11, G11, R11, F12, G12, R12, commentaires, idSession]);
    }
};