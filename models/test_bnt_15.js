const db = require('../util/database');

module.exports = class DS_Test_BNT_15 {
        constructor(idTest, idSession, record_video, haufig, mittel, selten, baum, bett, 
            pfeife, blume, haus, kanu, zahnburste, vulkan, maske, kamel, mundharmonika,
            zange, hangematte, trichter, dominosteine) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.record_video = record_video;
        this.haufig = haufig;
        this.mittel = mittel;
        this.selten = selten;
        this.baum = baum;
        this.bett = bett;
        this.pfeife = pfeife;
        this.blume = blume;
        this.haus = haus;
        this.kanu = kanu;
        this.zahnburste = zahnburste;
        this.vulkan = vulkan;
        this.maske = maske;
        this.kamel = kamel;
        this.mundharmonika = mundharmonika;
        this.zange = zange;
        this.hangematte = hangematte;
        this.trichter = trichter;
        this.dominosteine = dominosteine;
    }

    insert() {        
        let strQuery = "INSERT INTO DS_Test_BNT_15 (id_session, record_video, haufig, " + 
                                "mittel, selten, baum, bett, pfeife, blume, haus, kanu, " +
                                "zahnburste, vulkan, maske, kamel, mundharmonika, " +
                                "zange, hangematte, trichter, dominosteine) " +
                       "VALUES (?, ?, ?, " +
                               "?, ?, ?, ?, ?, ?, ?, ?, " +
                               "?, ?, ?, ?, ?, " +
                               "?, ?, ?, ?) ";

        return db.execute(strQuery, 
                        [this.idSession, this.record_video, this.haufig, this.mittel, this.selten, 
                            this.baum, this.bett, this.pfeife, this.blume, this.haus, this.kanu, 
                            this.zahnburste, this.vulkan, this.maske, this.kamel, this.mundharmonika,
                            this.zange, this.hangematte, this.trichter, this.dominosteine]);
    }

    // Fields: [DS_Test_BNT_15] - id_session
    // Tables: [DS_Test_BNT_15]
    // Conditions: [DS_Test_BNT_15] - id_session    
    static delete_by_idSession(idSession) {
        let strQuery = 'DELETE FROM DS_Test_BNT_15 ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_BNT_15] - id
    // Tables: [DS_Test_BNT_15]
    // Conditions: [DS_Test_BNT_15] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_BNT_15 ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_BNT_15] - record_video, haufig, mittel, selten, baum, bett, 
    //                            pfeife, blume, haus, kanu, zahnburste, vulkan, 
    //                            maske, kamel, mundharmonika,
    //                            zange, hangematte, trichter, dominosteine
    // Tables: [DS_Test_BNT_15]
    // Conditions: [DS_Test_BNT_15] - id_session    
    static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT record_video, haufig, mittel, selten, baum, bett, ' +
                              'pfeife, blume, haus, kanu, zahnburste, vulkan, maske, kamel, ' +
                              'mundharmonika, zange, hangematte, trichter, dominosteine ' +
                       'FROM DS_Test_BNT_15 ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_BNT_15] - record_video, haufig, mittel, selten, baum, bett, 
    //                            pfeife, blume, haus, kanu, zahnburste, vulkan, 
    //                            maske, kamel, mundharmonika,
    //                            zange, hangematte, trichter, dominosteine
    // Tables: [DS_Test_BNT_15]
    // Conditions: [DS_Test_BNT_15] - id_session    
    static update_by_idSession(idSession, record_video, haufig, mittel, selten, baum, bett, 
                                    pfeife, blume, haus, kanu, zahnburste, vulkan, 
                                    maske, kamel, mundharmonika,
                                    zange, hangematte, trichter, dominosteine) {
        let strQuery = 'UPDATE DS_Test_BNT_15 ' +
                       'SET record_video = ?, haufig = ?, mittel = ?, selten = ?, baum = ?, ' + 
                           'bett = ?, pfeife = ?, blume = ?, haus = ?, kanu = ?, zahnburste = ?, ' +
                           'vulkan = ?, maske = ?, kamel = ?, mundharmonika = ?, zange = ?, ' + 
                           'hangematte = ?, trichter = ?, dominosteine = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [record_video, haufig, mittel, selten, baum, bett, 
                                     pfeife, blume, haus, kanu, zahnburste, vulkan, 
                                     maske, kamel, mundharmonika,
                                     zange, hangematte, trichter, dominosteine, idSession]);
    }
};