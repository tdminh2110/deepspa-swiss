const db = require('../util/database');

module.exports = class DS_Clinician {
    constructor(idUser, birthday, phone, idFunction, idEstablishment, manageClinicians) {
        this.idUser = idUser;
        this.birthday = birthday;
        this.phone = phone;
        this.idFunction = idFunction;
        this.idEstablishment = idEstablishment;
        this.manageClinicians = manageClinicians;
    }

    insert() {
        return db.execute(
            'INSERT INTO DS_Clinician (id_user, birthday, phone, id_function, id_establishment, manage_clinicians) VALUES (?, ?, ?, ?, ?, ?)',
            [this.idUser, this.birthday, this.phone, this.idFunction, this.idEstablishment, this.manageClinicians]
        );
    }

    // Fields: [DS_Clinician] - id_user
    // Tables: [DS_Clinician]
    // Conditions: [DS_Clinician] - id_user    
    static deleteByIDClinician(idClinician) {
        let strQuery = 'DELETE FROM DS_Clinician ' + 
                       'WHERE id_user = ? ';

        return db.execute(strQuery, [idClinician]);        
    }

    static findUserIDByemail(email) {
        let strQuery =  'SELECT DS_Clinician.id_user as IDClinician ' +
                        'FROM DS_User, DS_Clinician ' +
                        'WHERE (DS_User.id = DS_Clinician.id_user) and (DS_User.email = ?) ';

        return db.execute(strQuery, [email]);
    }

    static selectAll() {
        let strQuery =  'SELECT DS_User.name as DSUserName, DS_User.family_name, DS_User.email, ' +
                              'DATE_FORMAT(DS_Clinician.birthday,"%d/%m/%Y") as birthday, DS_Clinician.phone, ' +
                              'DS_Function.name as DSFunctionName, ' +
                              'DS_Establishment.name as DSEstablishmentName ' +
                        'FROM DS_User, DS_Clinician, DS_Function, DS_Establishment ' +
                        'WHERE (DS_User.id = DS_Clinician.id_user) and (DS_User.user_right = 2) and ' +
                              '(DS_Function.id = DS_Clinician.id_function) and ' +
                              '(DS_Establishment.id = DS_Clinician.id_establishment) ' +
                        'ORDER BY DS_User.name';
                        
        return db.execute(strQuery);
    }

    // Fields: [DS_User, DS_Clinician] - DS_User.name, DS_User.family_name, DS_User.email, DS_Clinician.phone
    // Tables: [DS_User, DS_Clinician]
    // Conditions: [DS_Clinician] - DS_Clinician.id_user    
    static selectAllByIDClinician(idClinician) {
        let strQuery =  'SELECT DS_User.name, DS_User.family_name, DS_User.email, ' +
                               'DS_Clinician.phone ' +                               
                        'FROM DS_User, DS_Clinician ' +
                        'WHERE (DS_User.id = DS_Clinician.id_user) and (DS_Clinician.id_user = ?)';

        return db.execute(strQuery, [idClinician]);
    }

    static selectAllUserClinicianByIDClinician(idClinician) {
        let strQuery =  'SELECT DS_Clinician.id_user as IDClinician, DS_User.name, DS_User.family_name, DS_User.email, ' +
                               'DATE_FORMAT(DS_Clinician.birthday,"%d/%m/%Y") as birthday, DS_Clinician.phone, ' +
                               'DS_Clinician.id_function, DS_Clinician.id_establishment, DS_Clinician.manage_clinicians ' +
                        'FROM DS_User, DS_Clinician ' +
                        'WHERE (DS_User.id = DS_Clinician.id_user) and (DS_Clinician.id_user = ?)';

        return db.execute(strQuery, [idClinician]);
    }

    static selectManageCliniciansByIDClinician(idClinician) {
        let strQuery =  'SELECT manage_clinicians ' +
                        'FROM DS_Clinician ' +
                        'WHERE id_user = ?';

        return db.execute(strQuery, [idClinician]);
    }

    static updateByIDUser(idUser, birthday, idFunction, idEstablishment, phone, manageClinicians) {     
        let strQuery = 'UPDATE DS_Clinician ' +
            'SET birthday = ?, id_function = ?, id_establishment = ?, phone = ?, manage_clinicians = ? ' + 
            'WHERE id_user = ?';
        return db.execute(strQuery, [birthday, idFunction, idEstablishment, phone, manageClinicians, idUser]);
    }
};