const db = require('../util/database');

module.exports = class DS_Test_Words_List {
        constructor(idTest, idSession, test_done, record_video, 
                    knl_1, wortliste_knl_1, lernen_1, rew_list_1, lernen_1_int, lernen_1_int_text,
                    knl_2, wortliste_knl_2, lernen_2, rew_list_2, lernen_2_int, lernen_2_int_text,
                    knl_3, wortliste_knl_3, lernen_3, rew_list_3, lernen_3_int, lernen_3_int_text,
                    fiabz, abrufen, rew_list_abrufen, abrufen_int, abrufen_int_text,
                    butter, arm, strand, brief, konigin, hutte, stange, karte, gras, motor, 
                    r_ja, r_ja_list, r_nein, r_nein_list, f_ja, f_ja_list, f_nein, f_nein_list,
                    figur_abrufen) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.test_done = test_done;
        this.record_video = record_video;
        this.knl_1 = knl_1;
        this.wortliste_knl_1 = wortliste_knl_1;
        this.lernen_1 = lernen_1;
        this.rew_list_1 = rew_list_1;
        this.lernen_1_int = lernen_1_int;
        this.lernen_1_int_text = lernen_1_int_text;
        this.knl_2 = knl_2;
        this.wortliste_knl_2 = wortliste_knl_2;
        this.lernen_2 = lernen_2;
        this.rew_list_2 = rew_list_2;
        this.lernen_2_int = lernen_2_int;
        this.lernen_2_int_text = lernen_2_int_text;
        this.knl_3 = knl_3;
        this.wortliste_knl_3 = wortliste_knl_3;
        this.lernen_3 = lernen_3;
        this.rew_list_3 = rew_list_3;
        this.lernen_3_int = lernen_3_int;
        this.lernen_3_int_text = lernen_3_int_text;
        this.fiabz = fiabz;
        this.abrufen = abrufen;        
        this.rew_list_abrufen = rew_list_abrufen;
        this.abrufen_int = abrufen_int;
        this.abrufen_int_text = abrufen_int_text;
        this.butter = butter;
        this.arm = arm;
        this.strand = strand;
        this.brief = brief;
        this.konigin = konigin;
        this.hutte = hutte;
        this.stange = stange;
        this.karte = karte;
        this.gras = gras; 
        this.motor = motor;
        this.r_ja = r_ja;
        this.r_ja_list = r_ja_list;
        this.r_nein = r_nein;
        this.r_nein_list = r_nein_list;
        this.f_ja = f_ja;
        this.f_ja_list = f_ja_list;
        this.f_nein = f_nein;
        this.f_nein_list = f_nein_list;
        this.figur_abrufen = figur_abrufen;
    }

    insert() {
        let strQuery = "INSERT INTO DS_Test_Words_List (id_session, test_done, record_video, " +
                            "knl_1, wortliste_knl_1, lernen_1, rew_list_1, lernen_1_int, lernen_1_int_text, " +
                            "knl_2, wortliste_knl_2, lernen_2, rew_list_2, lernen_2_int, lernen_2_int_text, " +
                            "knl_3, wortliste_knl_3, lernen_3, rew_list_3, lernen_3_int, lernen_3_int_text, " +
                            "fiabz, abrufen, rew_list_abrufen, abrufen_int, abrufen_int_text, " +
                            "butter, arm, strand, brief, konigin, hutte, stange, karte, gras, motor, " + 
                            "r_ja, r_ja_list, r_nein, r_nein_list, f_ja, f_ja_list, f_nein, f_nein_list, figur_abrufen) " +
                        "VALUES (?, ?, ?, " + 
                               "?, ?, ?, ?, ?, ?, " + 
                               "?, ?, ?, ?, ?, ?, " + 
                               "?, ?, ?, ?, ?, ?, " + 
                               "?, ?, ?, ?, ?, " + 
                               "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
                               "?, ?, ?, ?, ?, ?, ?, ?, ?) ";     

        return db.execute(strQuery, 
            [this.idSession, this.test_done, this.record_video, 
                this.knl_1, this.wortliste_knl_1, this.lernen_1, this.rew_list_1, 
                this.lernen_1_int, this.lernen_1_int_text,
                this.knl_2, this.wortliste_knl_2, this.lernen_2, this.rew_list_2, 
                this.lernen_2_int, this.lernen_2_int_text,
                this.knl_3, this.wortliste_knl_3, this.lernen_3, this.rew_list_3, 
                this.lernen_3_int, this.lernen_3_int_text,
                this.fiabz, this.abrufen, this.rew_list_abrufen, this.abrufen_int, this.abrufen_int_text,
                this.butter, this.arm, this.strand, this.brief, this.konigin, this.hutte, 
                this.stange, this.karte, this.gras, this.motor,
                this.r_ja, this.r_ja_list, this.r_nein, this.r_nein_list, 
                this.f_ja, this.f_ja_list, this.f_nein, this.f_nein_list, this.figur_abrufen]);
    }

    // Fields: [DS_Test_Words_List] - id_session
    // Tables: [DS_Test_Words_List]
    // Conditions: [DS_Test_Words_List] - id_session    
    static delete_by_idSession(idSession) {
        let strQuery = 'DELETE FROM DS_Test_Words_List ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_Words_List] - id
    // Tables: [DS_Test_Words_List]
    // Conditions: [DS_Test_Words_List] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_Words_List ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

       // Fields: [DS_Test_Words_List] - test_done
    // Tables: [DS_Test_Words_List]
    // Conditions: [DS_Test_Words_List] - id_session    
    static select_testDone_by_idSession(idSession) {
        let strQuery = 'SELECT test_done ' +
                       'FROM DS_Test_Words_List ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }
    
    // Fields: [DS_Test_Words_List] - record_video, knl_1, wortliste_knl_1, lernen_1, rew_list_1, lernen_1_int, lernen_1_int_text,
    //                            knl_2, wortliste_knl_2, lernen_2, rew_list_2, lernen_2_int, lernen_2_int_text,
    //                            knl_3, wortliste_knl_3, lernen_3, rew_list_3, lernen_3_int, lernen_3_int_text,
    //                            fiabz, abrufen, rew_list_abrufen, abrufen_int, abrufen_int_text,
    //                            butter, arm, strand, brief, konigin, hutte, stange, karte, gras, motor,
    //                            r_ja, r_ja_list, r_nein, r_nein_list, f_ja, f_ja_list, f_nein, f_nein_list, figur_abrufen
    // Tables: [DS_Test_Words_List]
    // Conditions: [DS_Test_Words_List] - id_session    
    static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT record_video, ' +
                            'knl_1, wortliste_knl_1, lernen_1, rew_list_1, lernen_1_int, lernen_1_int_text, ' +
                            'knl_2, wortliste_knl_2, lernen_2, rew_list_2, lernen_2_int, lernen_2_int_text, ' +
                            'knl_3, wortliste_knl_3, lernen_3, rew_list_3, lernen_3_int, lernen_3_int_text, ' +
                            'fiabz, abrufen, rew_list_abrufen, abrufen_int, abrufen_int_text, ' +
                            'butter, arm, strand, brief, konigin, hutte, stange, karte, gras, motor, ' +
                            'r_ja, r_ja_list, r_nein, r_nein_list, f_ja, f_ja_list, f_nein, f_nein_list, figur_abrufen ' +
                       'FROM DS_Test_Words_List ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }
    
    // Fields: [DS_Test_Words_List] - test_done,  
    //                knl_1, wortliste_knl_1, lernen_1, rew_list_1, lernen_1_int, lernen_1_int_text,
    //                knl_2, wortliste_knl_2, lernen_2, rew_list_2, lernen_2_int, lernen_2_int_text,
    //                knl_3, wortliste_knl_3, lernen_3, rew_list_3, lernen_3_int, lernen_3_int_text
    // Tables: [DS_Test_Words_List]
    // Conditions: [DS_Test_Words_List] - id_session    
    static update_lernen_by_idSession(idSession, test_done,  
                        knl_1, wortliste_knl_1, lernen_1, rew_list_1, lernen_1_int, lernen_1_int_text,
                        knl_2, wortliste_knl_2, lernen_2, rew_list_2, lernen_2_int, lernen_2_int_text,
                        knl_3, wortliste_knl_3, lernen_3, rew_list_3, lernen_3_int, lernen_3_int_text) {
        let strQuery = 'UPDATE DS_Test_Words_List ' +
                        'SET test_done = ?, ' + 
                            'knl_1 = ?, wortliste_knl_1 = ?, lernen_1 = ?, ' +
                            'rew_list_1 = ?, lernen_1_int = ?, lernen_1_int_text = ?, ' +
                            'knl_2 = ?, wortliste_knl_2 = ?, lernen_2 = ?, ' +
                            'rew_list_2 = ?, lernen_2_int = ?, lernen_2_int_text = ?, ' +
                            'knl_3 = ?, wortliste_knl_3 = ?, lernen_3 = ?, ' +
                            'rew_list_3 = ?, lernen_3_int = ?, lernen_3_int_text = ? ' +                        
                        'WHERE id_session = ? ';

        return db.execute(strQuery, [test_done, 
                                     knl_1, wortliste_knl_1, lernen_1, 
                                     rew_list_1, lernen_1_int, lernen_1_int_text,
                                     knl_2, wortliste_knl_2, lernen_2, 
                                     rew_list_2, lernen_2_int, lernen_2_int_text,
                                     knl_3, wortliste_knl_3, lernen_3, 
                                     rew_list_3, lernen_3_int, lernen_3_int_text, idSession]);
    }

    // Fields: [DS_Test_Words_List] - test_done, fiabz
    // Tables: [DS_Test_Words_List]
    // Conditions: [DS_Test_Words_List] - id_session    
    static update_figur_abzeichnen_by_idSession(idSession, test_done, fiabz) {
        let strQuery = 'UPDATE DS_Test_Words_List ' +
                        'SET test_done = ?, ' + 
                            'fiabz = ? ' +
                        'WHERE id_session = ? ';

        return db.execute(strQuery, [test_done, fiabz, idSession]);
    }

    // Fields: [DS_Test_Words_List] - test_done, 
    //                                abrufen, rew_list_abrufen, abrufen_int, abrufen_int_text
    //                                butter, arm, strand, brief, konigin, hutte, stange, karte, gras, motor
    // Tables: [DS_Test_Words_List]
    // Conditions: [DS_Test_Words_List] - id_session    
    static update_abrufen_by_idSession(idSession, test_done, 
                                        abrufen, rew_list_abrufen, abrufen_int, abrufen_int_text, 
                                        butter, arm, strand, brief, konigin, hutte, stange, karte, gras, motor) {
        let strQuery = 'UPDATE DS_Test_Words_List ' +
                        'SET test_done = ?, ' + 
                            'abrufen = ?, rew_list_abrufen = ?, ' + 
                            'abrufen_int = ?, abrufen_int_text = ?, ' +
                            'butter = ?, arm = ?, strand = ?, brief = ?, konigin = ?, ' + 
                            'hutte = ?, stange = ?, karte = ?, gras = ?, motor = ? ' +
                        'WHERE id_session = ? ';

        return db.execute(strQuery, [test_done, abrufen, rew_list_abrufen, 
                                     abrufen_int, abrufen_int_text, butter, 
                                     arm, strand, brief, konigin, hutte, stange, 
                                     karte, gras, motor, idSession]);
    }

    // Fields: [DS_Test_Words_List] - test_done, 
    //                                r_ja, r_ja_list, r_nein, r_nein_list, 
    //                                f_ja, f_ja_list, f_nein, f_nein_list
    // Tables: [DS_Test_Words_List]
    // Conditions: [DS_Test_Words_List] - id_session    
    static update_wiedererkennen_by_idSession(idSession, test_done, 
                                                r_ja, r_ja_list, r_nein, r_nein_list, 
                                                f_ja, f_ja_list, f_nein, f_nein_list) {
        let strQuery = 'UPDATE DS_Test_Words_List ' +
                        'SET test_done = ?, ' + 
                            'r_ja = ?, r_ja_list = ?, r_nein = ?, r_nein_list = ?, ' + 
                            'f_ja = ?, f_ja_list = ?, f_nein = ?, f_nein_list = ? ' +
                        'WHERE id_session = ? ';

        return db.execute(strQuery, [test_done, r_ja, r_ja_list, r_nein, r_nein_list, 
                                     f_ja, f_ja_list, f_nein, f_nein_list, idSession]);
    }

    // Fields: [DS_Test_Words_List] - test_done, figur_abrufen
    // Tables: [DS_Test_Words_List]
    // Conditions: [DS_Test_Words_List] - id_session    
    static update_figur_abrufen_by_idSession(idSession, test_done, figur_abrufen) {
        let strQuery = 'UPDATE DS_Test_Words_List ' +
                        'SET test_done = ?, ' + 
                            'figur_abrufen = ? ' +
                        'WHERE id_session = ? ';

        return db.execute(strQuery, [test_done, figur_abrufen, idSession]);
    }

    // Fields: [DS_Test_Words_List] - record_video
    // Tables: [DS_Test_Words_List]
    // Conditions: [DS_Test_Words_List] - id_session    
    static update_record_video_by_idSession(idSession, record_video) {
        let strQuery = 'UPDATE DS_Test_Words_List ' +
                            'SET record_video = ? ' +
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [record_video, idSession]);
    }
};