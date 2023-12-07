const db = require('../util/database');

module.exports = class DS_Session {
    constructor(idSession, idPatient, createdDate, createdNumber, snapshotNumber, commentaires) {
        this.idSession = idSession;
        this.idPatient = idPatient;
        this.createdDate = createdDate;
        this.createdNumber = createdNumber;
        this.snapshotNumber = snapshotNumber;
        this.commentaires = commentaires;
    }

    // Fields: [DS_Session] - id_patient, created_date, created_number, snapshot_number, commentaires
    insert() {
        return db.execute(
            'INSERT INTO DS_Session (id_patient, created_date, created_number, snapshot_number, commentaires) VALUES (?, ?, ?, ?, ?)',
            [this.idPatient, this.createdDate, this.createdNumber, this.snapshotNumber, this.commentaires]
        );
    }

    // Fields: [DS_Session] - id
    // Tables: [DS_Session]
    // Conditions: [DS_Session] - id    
    static delete_by_id(idSession) {
        let strQuery = 'DELETE FROM DS_Session ' + 
                       'WHERE id = ? ';

        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Session] - id_patient, created_date, created_number, snapshot_number, commentaires
    // Tables: [DS_Session]
    // Conditions: [DS_Session] - id    
    static select_by_id(idSession) {
        let strQuery = 'SELECT id_patient, DATE_FORMAT(created_date,"%d%m%Y") as created_date, created_number, snapshot_number, commentaires ' +
                       'FROM DS_Session ' + 
                       'WHERE id = ? ';
        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Session] - id, created_date, created_number
    // Tables: [DS_Session]
    // Conditions: [DS_Session] - id_patient
    // Order by: [DS_Session] - created_number
    static select_by_idPatient_orderby_createdNumber(idPatient) {
        let strQuery = 'SELECT id, DATE_FORMAT(created_date,"%d%m%Y") as created_date, created_number ' +
                       'FROM DS_Session ' + 
                       'WHERE id_patient = ? ' +
                       'ORDER BY created_number';

        return db.execute(strQuery, [idPatient]);        
    }

    // Fields: [DS_Session] - commentaires
    // Tables: [DS_Session]
    // Conditions: [DS_Session] - id    
    static select_commentaires_by_id(idSession) {
        let strQuery = 'SELECT commentaires ' +
                       'FROM DS_Session ' + 
                       'WHERE id = ? ';
        return db.execute(strQuery, [idSession]);        
    }

    // Fields: [DS_Session] - max(created_number)
    // Tables: [DS_Session]
    // Conditions: [DS_Session] - id_patient    
    static select_max_by_idPatient(idPatient) {
        let strQuery = 'SELECT max(created_number) as max_created_number ' +
                       'FROM DS_Session ' + 
                       'WHERE id_patient = ? ';

        return db.execute(strQuery, [idPatient]);        
    }

    // Fields: [DS_Session] - commentaires
    // Tables: [DS_Session]
    // Conditions: [DS_Session] - id_session    
    static update_commentaires_by_id(idSession, commentaires) {
        let strQuery = 'UPDATE DS_Session ' +
                       'SET commentaires = ? ' + 
                       'WHERE id = ? ';
        
        return db.execute(strQuery, [commentaires, idSession]);
    }

    // Fields: [DS_Session] - snapshot_number
    // Tables: [DS_Session]
    // Conditions: [DS_Session] - id_session    
    static update_snapshot_number_by_id(idSession, snapshot_number) {
        let strQuery = 'UPDATE DS_Session ' +
                       'SET snapshot_number = ? ' + 
                       'WHERE id = ? ';
        
        return db.execute(strQuery, [snapshot_number, idSession]);
    }
};