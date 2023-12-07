const db = require('../util/database');

module.exports = class DS_Patient {
    constructor(idUser, idClinician, idPathFolder, birthday, address, phone, sex, idEducation, bildungsniveau, 
                contactPersonName, contactPersonFamilyName, contactPersonEmail, 
                contactPersonAddress, contactPersonPhone, informations, upload_store_media) {    
        this.idUser = idUser;
        this.idClinician = idClinician;
        this.idPathFolder = idPathFolder;
        this.birthday = birthday;
        this.address = address;
        this.phone = phone;
        this.sex = sex;
        this.idEducation = idEducation;
        this.bildungsniveau = bildungsniveau;
        this.contactPersonName = contactPersonName;
        this.contactPersonFamilyName = contactPersonFamilyName;
        this.contactPersonEmail = contactPersonEmail;
        this.contactPersonAddress = contactPersonAddress;
        this.contactPersonPhone = contactPersonPhone;
        this.informations = informations;
        this.upload_store_media = upload_store_media;
    }

    static selectAll(idClinician) {

        let strQuery =  'SELECT DS_User.name as DSUserName, DS_User.family_name, DS_User.email, ' +
                              'DATE_FORMAT(DS_Patient.birthday,"%d/%m/%Y") as birthday, DS_Patient.phone ' +                              
                        'FROM DS_User, DS_Patient ' +
                        'WHERE (DS_User.id = DS_Patient.id_user) and (DS_User.user_right = 3) and ' +                              
                              '(DS_Patient.id_clinician = ?) ' + 
                        'ORDER BY DS_User.name';
                        
        return db.execute(strQuery, [idClinician]);
    }    

    insert() {
        return db.execute(
            'INSERT INTO DS_Patient (id_user, id_clinician, id_path_folder, birthday, address, phone, sex, id_education, bildungsniveau, cp_name, cp_family_name, cp_email, cp_address, cp_phone, informations, upload_store_media) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.idUser, this.idClinician, this.idPathFolder, this.birthday, this.address, this.phone, this.sex, 
             this.idEducation, this.bildungsniveau, this.contactPersonName, this.contactPersonFamilyName, 
             this.contactPersonEmail,
             this.contactPersonAddress, this.contactPersonPhone, this.informations, this.upload_store_media]
        );
    }

    static updateByIDUser(idUser, birthdayPatient, addressPatient, phonePatient, sexPatient, idEducation, bildungsniveau, 
                          contactPersonNamePatient, contactPersonFamilyNamePatient, contactPersonEmailPatient, 
                          contactPersonAddressPatient, contactPersonPhonePatient, upload_store_media) {     
        let strQuery = 'UPDATE DS_Patient ' +
                       'SET birthday = ?, address = ?, phone = ?, sex = ?, id_education = ?, bildungsniveau = ?, ' + 
                            'cp_name = ?, cp_family_name = ?, cp_email = ?, cp_address = ?, cp_phone = ?, upload_store_media = ? ' + 
                       'WHERE id_user = ?';
        return db.execute(strQuery, [birthdayPatient, addressPatient, phonePatient, sexPatient, idEducation, 
                                     bildungsniveau, contactPersonNamePatient, contactPersonFamilyNamePatient, 
                                     contactPersonEmailPatient, contactPersonAddressPatient, 
                                     contactPersonPhonePatient, upload_store_media, idUser]);
    }

    static updateIDClinicianByIDUser(idUser, idClinician) {     
        let strQuery = 'UPDATE DS_Patient ' +
                       'SET id_clinician = ? ' + 
                       'WHERE id_user = ?';
        return db.execute(strQuery, [idClinician, idUser]);
    }

    // Fields: [DS_User, DS_Patient] - DS_Patient.id_clinician as IDClinician, DS_User.name, DS_User.family_name, DS_User.email,
    //                                 DS_Patient.id_path_folder,
    //                                 DATE_FORMAT(DS_Patient.birthday,"%d/%m/%Y") as birthday, DS_Patient.address, DS_Patient.phone,
    //                                 DS_Patient.sex, DS_Education.name as DSEducationName, DS_Patient.bildungsniveau,
    //                                 DS_Patient.cp_name, DS_Patient.cp_family_name,
    //                                 DS_Patient.cp_address, DS_Patient.cp_phone, DS_Patient.cp_email, DS_Patient.informations
    // Tables: [DS_User, DS_Patient]
    // Conditions: [DS_Patient] - DS_Patient.id_user
    static selectAllByIDPatient(idPatient) {
        let strQuery =  'SELECT DS_Patient.id_clinician as IDClinician, DS_User.name, DS_User.family_name, DS_User.email, ' +
                               'DS_Patient.id_path_folder, ' + 
                               'DATE_FORMAT(DS_Patient.birthday,"%d/%m/%Y") as birthday, DS_Patient.address, DS_Patient.phone, ' +
                               'DS_Patient.sex, DS_Education.name as DSEducationName, DS_Patient.bildungsniveau, ' +
                               'DS_Patient.cp_name, DS_Patient.cp_family_name, ' + 
                               'DS_Patient.cp_address, DS_Patient.cp_phone, DS_Patient.cp_email, DS_Patient.informations ' +
                        'FROM DS_User, DS_Patient, DS_Education ' +
                        'WHERE (DS_User.id = DS_Patient.id_user) and (DS_Patient.id_user = ?) and (DS_Education.id = DS_Patient.id_education)';

        return db.execute(strQuery, [idPatient]);
    }

    static selectAllUserPatientByemailIDClinician(emailPatient, idClinician) {
        let strQuery =  'SELECT DS_Patient.id_user as IDPatient, DS_User.name, DS_User.family_name, DS_User.email, ' +
                               'DATE_FORMAT(DS_Patient.birthday,"%d/%m/%Y") as birthday, DS_Patient.address, DS_Patient.phone, ' +
                               'DS_Patient.sex, DS_Patient.id_education, DS_Patient.bildungsniveau, DS_Patient.cp_name, ' + 
                               'DS_Patient.cp_family_name, ' +
                               'DS_Patient.cp_address, DS_Patient.cp_phone, ' +
                               'DS_Patient.cp_email, DS_Patient.upload_store_media ' +
                        'FROM DS_User, DS_Patient ' +
                        'WHERE (DS_User.id = DS_Patient.id_user) and (DS_User.email = ?) and (DS_Patient.id_clinician = ?)';

        return db.execute(strQuery, [emailPatient, idClinician]);
    }

    static selectIDUserPatientByemailIDClinician(emailPatient, idClinician) {
        let strQuery =  'SELECT DS_Patient.id_user as IDPatient ' +
                        'FROM DS_User, DS_Patient ' +
                        'WHERE (DS_User.id = DS_Patient.id_user) and (DS_User.email = ?) and (DS_Patient.id_clinician = ?)';

        return db.execute(strQuery, [emailPatient, idClinician]);
    }

    static selectNameByIDPatient(idPatient) {
        let strQuery =  'SELECT family_name, name ' +
                        'FROM DS_User ' +
                        'WHERE id = ?';

        return db.execute(strQuery, [idPatient]);
    }

    static countRowByIDPatientIDClinician(idPatient, idClinician) {
        let strQuery =  'SELECT count(DS_User.id) as coundID ' +
                        'FROM DS_User, DS_Patient ' +
                        'WHERE (DS_User.id = DS_Patient.id_user) and (DS_Patient.id_user = ?) and (DS_Patient.id_clinician = ?)';

        return db.execute(strQuery, [idPatient, idClinician]);        
    }

    // Fields: [DS_Patient] - id_clinician, id_path_folder, upload_store_media
    // Tables: [DS_Patient]
    // Conditions: [DS_Patient] - id_patient
    static select_by_idUser(idUser) {
        let strQuery = 'SELECT id_clinician, id_path_folder, upload_store_media ' +
                       'FROM DS_Patient ' + 
                       'WHERE id_user = ? ';

        return db.execute(strQuery, [idUser]);        
    }

    // Fields: [DS_Patient] - DS_Patient.id_user
    // Tables: [DS_User, DS_Patient]
    // Conditions: [DS_Patient] - DS_User.email
    static findUserIDByemail(email) {
        let strQuery =  'SELECT DS_Patient.id_user as IDPatient ' +
                        'FROM DS_User, DS_Patient ' +
                        'WHERE (DS_User.id = DS_Patient.id_user) and (DS_User.email = ?) ';

        return db.execute(strQuery, [email]);
    }

    // Fields: [DS_Patient] - id_clinician
    // Tables: [DS_Patient]
    // Conditions: [DS_Patient] - id_clinician
    static updateIDClinicianByIDIDClinician(idClinicianNew, idClinician) {     
        let strQuery = 'UPDATE DS_Patient ' +
            'SET id_clinician = ? ' + 
            'WHERE id_clinician = ?';
        return db.execute(strQuery, [idClinicianNew, idClinician]);
    }

    // Fields: [DS_Patient] - informations
    // Tables: [DS_Patient]
    // Conditions: [DS_Patient] - id_user    
    static update_informations_by_id(idPatient, informations) {
        let strQuery = 'UPDATE DS_Patient ' +
                       'SET informations = ? ' + 
                       'WHERE id_user = ? ';
        
        return db.execute(strQuery, [informations, idPatient]);
    }
};