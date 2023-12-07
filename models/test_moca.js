const db = require('../util/database');

module.exports = class DS_Test_MOCA {
        constructor(idTest, idSession, record_video, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, 
                    F1, F2, F3, date, mois, annee, jour, endroit, ville, remarques, results) {
        this.idTest = idTest;
        this.idSession = idSession;
        this.record_video = record_video;
        this.a = a; this.b = b; this.c = c; this.d = d; this.e = e; this.f = f; this.g = g; this.h = h; 
        this.i = i; this.j = j; this.k = k; this.l = l; this.m = m; this.n = n; this.o = o; this.p = p;
        this.q = q; this.F1 = F1; this.F2 = F2; this.F3 = F3; this.date = date;
        this.mois = mois; this.annee = annee; this.jour = jour; this.endroit = endroit; this.ville = ville;
        this.remarques = remarques;
        this.results = results;
    }

    insert() {        
        let strQuery = "INSERT INTO DS_Test_MOCA (id_session, record_video, a, b, c, d, e, f, g, h, i, j, " +
                                                "k, l, m, n, o, p, q, F1, F2, F3, date, mois, " + 
                                                "annee, jour, endroit, ville, remarques, results) " +
                       "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
                               "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
                               "?, ?, ?, ?, ?, ?) ";
                               
        return db.execute(strQuery, 
        [this.idSession, this.record_video, this.a, this.b, this.c, this.d, this.e, this.f, this.g, this.h, 
         this.i, this.j, this.k, this.l, this.m, this.n, this.o, this.p, this.q, this.F1, this.F2, 
         this.F3, this.date, this.mois, this.annee, this.jour, this.endroit, this.ville, this.remarques,
         this.results]);
    }

    // Fields: [DS_Test_MOCA] - id
    // Tables: [DS_Test_MOCA]
    // Conditions: [DS_Test_MOCA] - id_session    
    static select_by_idSession(idSession) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_Test_MOCA ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_MOCA] - record_video, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, 
    //                F1, F2, F3, date, mois, annee, jour, endroit, ville, remarques, results
    // Tables: [DS_Test_MOCA]
    // Conditions: [DS_Test_MOCA] - id_session    
    static select_report_by_idSession(idSession) {
        let strQuery = 'SELECT record_video, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, ' +
                            'F1, F2, F3, date, mois, annee, jour, endroit, ville, remarques, results ' +
                       'FROM DS_Test_MOCA ' + 
                       'WHERE id_session = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Test_MOCA] - record_video, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, 
                    // F1, F2, F3, date, mois, annee, jour, endroit, ville, remarques, results
    // Tables: [DS_Test_MOCA]
    // Conditions: [DS_Test_MOCA] - id_session    
    static update_by_idSession(idSession, record_video, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, 
                                F1, F2, F3, date, mois, annee, jour, endroit, ville, remarques, results) {
        let strQuery = "UPDATE DS_Test_MOCA " +
                       "SET record_video = ?, a = ?, b = ?, c = ?, d = ?, e = ?, f = ?, g = ?, h = ?, " +
                            "i = ?, j = ?, k = ?, l = ?, m = ?, n = ?, o = ?, p = ?, q = ?, F1 = ?, " +
                            "F2 = ?, F3 = ?, date = ?, mois = ?, annee = ?, jour = ?, " + 
                            "endroit = ?, ville = ?, remarques = ?, results = ? " + 
                       "WHERE id_session = ? ";
        
        return db.execute(strQuery, [record_video, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, F1,  
                            F2, F3, date, mois, annee, jour, endroit, ville, remarques, results, idSession]);
    }

    // Fields: [DS_Test_MOCA] - results
    // Tables: [DS_Test_MOCA]
    // Conditions: [DS_Test_MOCA] - id_session    
    static update_results_by_idsession(idSession, results) {
        let strQuery = 'UPDATE DS_Test_MOCA ' +
                       'SET results = ? ' + 
                       'WHERE id_session = ? ';
        
        return db.execute(strQuery, [results, idSession]);
    }
};