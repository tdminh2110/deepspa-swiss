const db = require('../util/database');

module.exports = class DS_User {
    constructor(id, name, familyName, email, password, userRight) {
        this.id = id;
        this.name = name;
        this.familyName = familyName;        
        this.email = email;
        this.password = password;
        this.userRight = userRight;
    }

    insert() {        
        return db.execute(
            'INSERT INTO DS_User (name, family_name, email, password, user_right) VALUES (?, ?, ?, ?, ?)',
            [this.name, this.familyName, this.email, this.password, this.userRight]
        );
    }

    // Fields: [DS_User] - id
    // Tables: [DS_User]
    // Conditions: [DS_User] - id    
    static deleteByID(id) {
        let strQuery = 'DELETE FROM DS_User ' + 
                       'WHERE id = ? ';

        return db.execute(strQuery, [id]);        
    }

    static updateByID(idUser, nameUser, familyNameUser, emailUser) {     
        let strQuery = 'UPDATE DS_User ' +
                       'SET name = ?, family_name = ?, email = ? ' + 
                       'WHERE id = ?';

        return db.execute(strQuery, [nameUser, familyNameUser, emailUser, idUser]);
    }

    // Fields: [DS_User] - id
    // Tables: [DS_User]
    // Conditions: [DS_User] - email
    static search_by_email(email) {
        let strQuery = 'SELECT id ' +
                       'FROM DS_User ' + 
                       'WHERE email = ?';

        return db.execute(strQuery,[email]);        
    }
        
    // Fields: [DS_User] - id, name, family_name, user_right
    // Tables: [DS_User]
    // Conditions: [DS_User] - email, password
    static search_by_email_password(email, password) {
        let strQuery = 'SELECT id, name, family_name, user_right ' +
                       'FROM DS_User ' + 
                       'WHERE (email = ?) and (password = ?)';

        return db.execute(strQuery,[email, password]);        
    }

    // Fields: [DS_User] - email
    // Tables: [DS_User, DS_Patient]
    // Conditions: [DS_User] - id    
    static select_emailClinician_by_emailPatient(emailPatient) {
        let strQuery = 'SELECT DS_User.email FROM ' +
                            '(SELECT DS_Patient.id_clinician as id_clinician ' +
                             'FROM DS_User, DS_Patient ' +
                             'WHERE (DS_User.email = ?) and (DS_Patient.id_user = DS_User.id) ' +
                            ') as Minh, DS_User ' + 
                       'WHERE DS_User.id = Minh.id_clinician ';

        return db.execute(strQuery, [emailPatient]);        
    }

    // Fields: [DS_User] - email
    // Tables: [DS_User, DS_Patient]
    // Conditions: [DS_User] - id    
    static select_emailPatient_by_emailClinician(emailClinician) {
        let strQuery = 'SELECT DS_User.email FROM ' +
                            '(SELECT DS_Patient.id_user as id_user ' +
                             'FROM DS_User, DS_Patient ' +
                             'WHERE (DS_User.email = ?) and (DS_Patient.id_clinician = DS_User.id) ' +
                            ') as Minh, DS_User ' + 
                       'WHERE DS_User.id = Minh.id_user ';

        return db.execute(strQuery, [emailClinician]);        
    }

    // Fields: [DS_User] - email
    // Tables: [DS_User]
    // Conditions: [DS_User] - id
    static select_email_by_id(id) {
        let strQuery = 'SELECT email ' +
                       'FROM DS_User ' + 
                       'WHERE id = ?';

        return db.execute(strQuery,[id]);        
    }
};