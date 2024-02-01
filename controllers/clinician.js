const fs = require('fs');

const User = require('../models/user');
const Clinician = require('../models/clinician');
const Patient = require('../models/patient');
const Session_Model = require('../models/session');
const MyFunction = require('../models/function');
const Establishment = require('../models/establishment');
const Education = require('../models/education');
const Test_BNT_15 = require('../models/test_bnt_15');
const Test_Code_WAIS = require('../models/test_code_wais');
const Test_D2 = require('../models/test_d2');
const Test_DeepSpa = require('../models/test_deepspa');
const Test_Digital_Span = require('../models/test_digital_span');
const Test_Entr_Clin = require('../models/test_entr_clin');
const Test_FVLex = require('../models/test_fvlex');
const Test_FVSem = require('../models/test_fvsem');
const Test_GDS = require('../models/test_gds');
const Test_MOCA = require('../models/test_moca');
const Test_NPI = require('../models/test_npi');
const Test_Stroop_Victoria_2 = require('../models/test_stroop_victoria_2');
const Test_WAIS_IV = require('../models/test_wais_iv');
const Test_Words_List = require('../models/test_words_list');
const Test_Zoo = require('../models/test_zoo');

const session = require('./common/session');
const string_process = require('./common/stringprocess');
const FileSystem = require('./common/filesystem');

exports.getAddClinician = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;

                    if (manageClinicians == 1) {                    
                        MyFunction.selectAll()
                        .then(([functions, fieldData]) => {
                            Establishment.selectAll()
                            .then(([establishments, fieldData]) => {

                                res.render('clinician/add-clinician', {        
                                    funcs: functions, 
                                    estas: establishments,
                                    pageTitle: 'Add a Clinician',
                                    path: '/clinician/add-clinician',
                                    manageClinicians: manageClinicians
                                });
                            })
                            .catch(err => console.log(err));   
                        })    
                        .catch(err => console.log(err)); 
                    } else {
                        res.redirect('/error');
                    }
                })  
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    } else
        res.redirect('/'); 
}; 

exports.postAddClinician = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        const name = req.body.name;
        const familyName = req.body.family_name;
        let birthday = req.body.birthday;
        const phone = req.body.phone;
        const idFunction = req.body.function;
        const idEstablishment = req.body.establishment;
        const email = req.body.email;
        const password = req.body.password;
        const re_password = req.body.re_password;
        let manage_clinicians = req.body.manage_clinicians == "on" ? 1 : 0;

        let arrayBirthday = birthday.split("/");
        birthday = arrayBirthday[2] + "/" + arrayBirthday[1] + "/" + arrayBirthday[0];
        
        if (password === re_password)
        {
            const user = new User(null, name, familyName, email, password, 2);
            user
            .insert()
            .then((results) => {          
                const clinician = new Clinician(results[0].insertId, birthday, phone, idFunction, idEstablishment, manage_clinicians);                   
                clinician
                .insert()
                .then(() => {
                    res.redirect('/');
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }
        else
            res.redirect('/clinician/add-clinician');  
    }
    else
        res.redirect('/');
};

exports.getAddPatient = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;      
                    
                    Education.selectAll()
                    .then(([educations, fieldData]) => {
                        res.render('clinician/add-patient', {
                            edus: educations,        
                            pageTitle: 'Add a Patient',
                            path: '/clinician/add-patient',
                            manageClinicians: manageClinicians
                        });
                    })
                    .catch(err => res.redirect('/error'));
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    }  
    else {
        res.redirect('/'); 
    }
};

exports.postAddPatient = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        const name = req.body.name;
        const familyName = req.body.family_name;        
        let birthday = req.body.birthday;        
        const address = req.body.address;
        const phone = req.body.phone;      
        const email = req.body.email;
        const password = req.body.password;
        const re_password = req.body.re_password;
        const sex = req.body.sex;
        const idEducation = req.body.education;
        const bildungsniveau = req.body.bildungsniveau == '' ? 0 : req.body.bildungsniveau;
        const contactPersonName = req.body.cp_name;
        const contactPersonFamilyName = req.body.cp_family_name;
        const contactPersonAddress = req.body.cp_address;
        const contactPersonPhone = req.body.cp_phone;
        const contactPersonEmail = req.body.cp_email;        
        const uploadStoreMedia = req.body.store_data == 'local_storage_clinician' ? 3 : (req.body.store_data == 'mixed_storage' ? 2 : (req.body.store_data == 'local_storage_patient' ? 1 : (req.body.store_data == 'server_storage' ? 0 : -1)));
        
        let arrayBirthday = birthday.split("/");
        birthday = arrayBirthday[2] + "/" + arrayBirthday[1] + "/" + arrayBirthday[0];
        let pathFolder = string_process.createFragmentString(name).toLowerCase() + string_process.createFragmentString(familyName).toLowerCase() + arrayBirthday[2].slice(2, 4) +
                         "-" + (Math.random().toString(36) + '0000000000000000000').substr(2, 16);       
     
        if (password === re_password) {
            Clinician.findUserIDByemail(req.session.email)        
            .then(([clinicians]) => {
                if (clinicians.length == 1) {
                    const user = new User(null, name, familyName, email, password, 3);
                    user
                    .insert()
                    .then((results) => {                
                        const patient = new Patient(results[0].insertId, clinicians[0].IDClinician, pathFolder, 
                                                birthday, address, phone, sex, idEducation, bildungsniveau,
                                                contactPersonName, contactPersonFamilyName, contactPersonEmail, contactPersonAddress, 
                                                contactPersonPhone, "", uploadStoreMedia);                                                
                        patient
                        .insert()
                        .then(() => {
                            res.redirect('/');
                        })
                        .catch(err => {
                            console.log(err);
                            res.redirect('/error');
                        });
                    })        
                    .catch(err => {
                        console.log(err);
                        res.redirect('/error');
                    });
                } else {
                    res.redirect('/error');
                }
            })    
            .catch(err => {
                console.log(err);
                res.redirect('/error');
            });
        } else {
            res.redirect('/clinician/add-patient');  
        }
    } else {
        res.redirect('/');
    }
};

exports.getAllPatients = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;

                    Patient.selectAll(idClinician)
                    .then(([patients, fieldData]) => {
                        res.render('clinician/list-patients', {
                            patis: patients,
                            pageTitle: 'List of Patients',
                            path: '/clinician/list-patients',
                            manageClinicians: manageClinicians
                        });
                    })
                    .catch(err => res.redirect('/error'));  
                })
                .catch(err => res.redirect('/error'));        
            } else {
                res.redirect('/error');
            }
        })
        .catch(err => res.redirect('/error'));
    }
    else {
        res.redirect('/');
    }
};

exports.getConnectionAlreadyExists = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        res.render('clinician/connection-already-exists');
    } else {
        res.redirect('/');
    }
};

exports.getEditPatient = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        let emailPatient = req.query.email;
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;      
                    
                    Patient.selectAllUserPatientByemailIDClinician(emailPatient, idClinician)
                    .then(([user_patient]) => {
                        if (user_patient.length == 1) {
                            Education.selectAll()
                            .then(([educations, fieldData]) => {
                                res.render('clinician/edit-patient', {
                                    patient: user_patient[0],
                                    edus: educations,                             
                                    pageTitle: 'Edit the patient',
                                    path: '',
                                    manageClinicians: manageClinicians
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.redirect('/error');
                            });
                        } else {
                            res.redirect('/error');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.redirect('/error');
                    });
                })
                .catch(err => res.redirect('/error'));                
            } else {
                res.redirect('/error');
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/error');
        });
    }
    else {
        res.redirect('/');
    }
}

exports.postEditPatient = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        const id = req.body.id;
        const name = req.body.name;
        const familyName = req.body.family_name;
        let birthday = req.body.birthday;
        const address = req.body.address;
        const phone = req.body.phone;      
        const email = req.body.email;
        const sex = req.body.sex;
        const idEducation = req.body.education;
        const bildungsniveau = req.body.bildungsniveau == '' ? 0 : req.body.bildungsniveau;
        const contactPersonName = req.body.cp_name;
        const contactPersonFamilyName = req.body.cp_family_name;
        const contactPersonAddress = req.body.cp_address;
        const contactPersonPhone = req.body.cp_phone;
        const contactPersonEmail = req.body.cp_email;
        const uploadStoreMedia = req.body.store_data == 'local_storage_clinician' ? 3 : (req.body.store_data == 'mixed_storage' ? 2 : (req.body.store_data == 'local_storage_patient' ? 1 : (req.body.store_data == 'server_storage' ? 0 : -1)));

        let arrayBirthday = birthday.split("/");
        birthday = arrayBirthday[2] + "/" + arrayBirthday[1] + "/" + arrayBirthday[0];

        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {                
                let IDClinician = clinicians[0].IDClinician;
                Patient.countRowByIDPatientIDClinician(id, IDClinician)
                .then(([rows]) => {                    
                    if (rows.length == 1) {
                        User.updateByID(id, name, familyName, email)
                        .then(() => {
                            Patient.updateByIDUser(id, birthday, address, phone, sex, idEducation, bildungsniveau, contactPersonName, contactPersonFamilyName, 
                                                contactPersonEmail, contactPersonAddress, contactPersonPhone, uploadStoreMedia)
                            .then(() => {
                                res.redirect('/');
                            })
                            .catch(err => {
                                console.log(err);
                                res.redirect('/error');
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.redirect('/error');
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/error');
                });            } else {                    
                res.redirect('/error');
            }
        })    
        .catch(err => {
            console.log(err);
            res.redirect('/error');
        });        
    } else {
        res.redirect('/');
    }
};

exports.getGenerateReport = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;

                    let IDSession = req.query.idsession;
                    Session_Model.select_by_id(IDSession)
                    .then(([sessions]) => {
                        let IDPatient = sessions[0].id_patient;
                        let session_created_date = sessions[0].created_date;

                        Patient.selectNameByIDPatient(IDPatient)
                        .then(([patient]) => {
                            if (patient.length == 1) {                                
                                let patient_family_name = patient[0].family_name;
                                let patient_name = patient[0].name;
                                
                                res.render('clinician/reports/generate-report', {                                        
                                    pageTitle : 'Générer un Rapport',
                                    path : '',
                                    id_session : IDSession,
                                    patient_family_name : patient_family_name,
                                    patient_name : patient_name,
                                    session_created_date : session_created_date,
                                    manageClinicians: manageClinicians                                                                                                                                                                                                    
                                });                                          
                            }                                        
                        })
                        .catch(err => res.redirect('/error'));            
                    })
                    .catch(err => res.redirect('/error'));
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getGenerateReportUPDRMC = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;
                    let IDSession = req.query.idsession;
                    
                    Session_Model.select_by_id(IDSession)
                    .then(([sessions]) => {
                        let IDPatient = sessions[0].id_patient;
                        let session_created_date = sessions[0].created_date;

                        Patient.selectAllByIDPatient(IDPatient)
                        .then(([patient]) => {
                            if (patient.length == 1) {                                
                                let patient_family_name = patient[0].family_name;
                                let patient_name = patient[0].name;
                                let patient_id = patient[0].id_path_folder.indexOf("-") == -1 ? 
                                                 patient[0].id_path_folder.toUpperCase() : 
                                                 patient[0].id_path_folder.slice(0, patient[0].id_path_folder.indexOf("-")).toUpperCase();
                                let birthday = patient[0].birthday;                                
                                let age = new Date().getFullYear() - birthday.slice(6, 10);
                                let sex = patient[0].name == 0 ? "Frauen" : "Mann";
                                let bildungsniveau = patient[0].bildungsniveau;
                                
                                res.render('clinician/reports/generate-report-upd-rmc', {                                        
                                    pageTitle : 'Générer un Rapport',
                                    path : '',
                                    id_session : IDSession,
                                    patient_family_name : patient_family_name,
                                    patient_name : patient_name,
                                    session_created_date : session_created_date,
                                    patient_id : patient_id,
                                    birthday : birthday,
                                    age : age,
                                    sex : sex,
                                    bildungsniveau : bildungsniveau,
                                    manageClinicians: manageClinicians
                                });                                          
                            }                                        
                        })
                        .catch(err => res.redirect('/error'));
                    })
                    .catch(err => res.redirect('/error'));
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getGenerateReportUPDRMCDetail = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;
                    let IDSession = req.query.idsession;
                    
                    Session_Model.select_by_id(IDSession)
                    .then(([sessions]) => {
                        let IDPatient = sessions[0].id_patient;
                        let session_created_date = sessions[0].created_date;

                        Patient.selectAllByIDPatient(IDPatient)
                        .then(([patient]) => {
                            if (patient.length == 1) {                                
                                let patient_family_name = patient[0].family_name;
                                let patient_name = patient[0].name;
                                let patient_id = patient[0].id_path_folder.indexOf("-") == -1 ? 
                                                 patient[0].id_path_folder.toUpperCase() : 
                                                 patient[0].id_path_folder.slice(0, patient[0].id_path_folder.indexOf("-")).toUpperCase();
                                let email = patient[0].email;
                                let birthday = patient[0].birthday;                                
                                let age = new Date().getFullYear() - birthday.slice(6, 10);
                                let sex = patient[0].name == 0 ? "Frauen" : "Mann";
                                let bildungsniveau = patient[0].bildungsniveau;

                                let test_moca_total = 0;

                                Test_MOCA.select_report_by_idSession(IDSession)
                                .then(([test_moca]) => {
                                    if (test_moca.length == 1) {
                                        let a = test_moca[0].a;
                                        let b = test_moca[0].b;
                                        let c = test_moca[0].c;
                                        let d = test_moca[0].d;
                                        let e = test_moca[0].e;
                                        let f = test_moca[0].f;
                                        let g = test_moca[0].g;
                                        let h = test_moca[0].h;
                                        let i = test_moca[0].i;
                                        let j = test_moca[0].j;
                                        let k = test_moca[0].k;
                                        let l = test_moca[0].l;
                                        let m = test_moca[0].m;
                                        let n = test_moca[0].n;
                                        let o = test_moca[0].o;
                                        let p = test_moca[0].p;
                                        let q = test_moca[0].q;
                                        let F1 = test_moca[0].F1;
                                        let F2 = test_moca[0].F2;
                                        let F3 = test_moca[0].F3;
                                        let date = test_moca[0].date;
                                        let mois = test_moca[0].mois;
                                        let annee = test_moca[0].annee;
                                        let jour = test_moca[0].jour;
                                        let endroit = test_moca[0].endroit;
                                        let ville = test_moca[0].ville;

                                        let A = a + b + c + d + e;
                                        let B = f + g + h;
                                        let C = i + j + k + l;
                                        let D = m + n + o;
                                        let E = p + q;
                                        let G = F2 + F3;
                                        let H = date + mois + annee + jour + endroit + ville;

                                        test_moca_total = A + B + C + D + E + F1 + H;
                                    }

                                    let test_gds_score = 0;

                                    Test_GDS.select_report_by_idSession(IDSession)
                                    .then(([test_gds]) => {
                                        if (test_gds.length == 1) 
                                            test_gds_score = test_gds[0].score;

                                        let test_stroop_victoria_2_duree_1 = 0;
                                        let test_stroop_victoria_2_nombre_d_erreurs_1 = 0;
                                        let test_stroop_victoria_2_nombre_d_erreurs_corrigees_1 = 0;
                                        let test_stroop_victoria_2_duree_2 = 0;
                                        let test_stroop_victoria_2_nombre_d_erreurs_2 = 0;
                                        let test_stroop_victoria_2_nombre_d_erreurs_corrigees_2 = 0;
                                        let test_stroop_victoria_2_duree_3 = 0;
                                        let test_stroop_victoria_2_nombre_d_erreurs_3 = 0;
                                        let test_stroop_victoria_2_nombre_d_erreurs_corrigees_3 = 0;

                                        let test_stroop_victoria_2_n_et = 0;
                                        let test_stroop_victoria_2_perf_attendu_cou = 0;
                                        let test_stroop_victoria_2_perf_attendu_mot = 0;
                                        let test_stroop_victoria_2_perf_attendu_int = 0;

                                        let test_stroop_victoria_2_z_score_svA = 0;
                                        let test_stroop_victoria_2_z_score_svB = 0;
                                        let test_stroop_victoria_2_z_score_svC = 0;
                                            
                                        Test_Stroop_Victoria_2.select_report_by_idSession(IDSession)
                                        .then(([test_stroop_victoria_2]) => {
                                            if (test_stroop_victoria_2.length == 1) {
                                                test_stroop_victoria_2_duree_1 = test_stroop_victoria_2[0].x_1;
                                                test_stroop_victoria_2_nombre_d_erreurs_1 = test_stroop_victoria_2[0].y_1;
                                                test_stroop_victoria_2_nombre_d_erreurs_corrigees_1 = test_stroop_victoria_2[0].z_1;
                                                test_stroop_victoria_2_duree_2 = test_stroop_victoria_2[0].x_2;
                                                test_stroop_victoria_2_nombre_d_erreurs_2 = test_stroop_victoria_2[0].y_2;
                                                test_stroop_victoria_2_nombre_d_erreurs_corrigees_2 = test_stroop_victoria_2[0].z_2;
                                                test_stroop_victoria_2_duree_3 = test_stroop_victoria_2[0].x_3;
                                                test_stroop_victoria_2_nombre_d_erreurs_3 = test_stroop_victoria_2[0].y_3;
                                                test_stroop_victoria_2_nombre_d_erreurs_corrigees_3 = test_stroop_victoria_2[0].z_3;

                                                if (bildungsniveau < 12) 
                                                    test_stroop_victoria_2_n_et = 1;
                                                else
                                                    test_stroop_victoria_2_n_et = 2;

                                                test_stroop_victoria_2_perf_attendu_cou = 0.80 + (0.006 * age) - (0.038 * test_stroop_victoria_2_n_et);
                                                test_stroop_victoria_2_perf_attendu_mot = 0.94 + (0.006 * age) - (0.073 * test_stroop_victoria_2_n_et);
                                                test_stroop_victoria_2_perf_attendu_int = 1.15 + (0.008 * age) - (0.107 * test_stroop_victoria_2_n_et);

                                                test_stroop_victoria_2_z_score_svA = (test_stroop_victoria_2_perf_attendu_cou - Math.log10(test_stroop_victoria_2_duree_1)) / 0.105;
                                                test_stroop_victoria_2_z_score_svB = (test_stroop_victoria_2_perf_attendu_mot - Math.log10(test_stroop_victoria_2_duree_2)) / 0.09;
                                                test_stroop_victoria_2_z_score_svC = (test_stroop_victoria_2_perf_attendu_int - Math.log10(test_stroop_victoria_2_duree_3)) / 0.12;                                      
                                            }

                                            let test_digital_span_vor = 0;
                                            let test_digital_span_ruc = 0;
                                            let test_digital_span_CAV_vorwarts = false;
                                            let test_digital_span_CAV_score_ruckwarts = false;
                                            let test_digital_span_z_score_dsv = 0;
                                            let test_digital_span_z_score_dsr = 0;

                                            Test_Digital_Span.select_report_by_idSession(IDSession)
                                            .then(([test_digital_span]) => {
                                                if (test_digital_span.length == 1) {
                                                    test_digital_span_vor = test_digital_span[0].vor;
                                                    test_digital_span_ruc = test_digital_span[0].ruc;

                                                    if ((age >= 35) && (age <= 44)) {
                                                        if (test_digital_span_vor <= 3) {
                                                            test_digital_span_z_score_dsv = -2.054;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        } else if (test_digital_span_vor == 4) {
                                                            test_digital_span_z_score_dsv = -2.054;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 5) {
                                                            test_digital_span_z_score_dsv = -1.405;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 6) {
                                                            test_digital_span_z_score_dsv = -0.915;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 7) {
                                                            test_digital_span_z_score_dsv = -0.385;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 8) {
                                                            test_digital_span_z_score_dsv = 0.176;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 9) {
                                                            test_digital_span_z_score_dsv = 0.674;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 10) {
                                                            test_digital_span_z_score_dsv = 1.175;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 11) {
                                                            test_digital_span_z_score_dsv = 1.881;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else {
                                                            test_digital_span_z_score_dsv = 1.881;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        }

                                                        if (test_digital_span_ruc <= 3) {
                                                            test_digital_span_z_score_dsr = -1.645;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else if (test_digital_span_ruc == 4) {
                                                            test_digital_span_z_score_dsr = -1.645;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 5) {
                                                            test_digital_span_z_score_dsr = -1.175;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 6) {
                                                            test_digital_span_z_score_dsr = -0.524;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 7) {
                                                            test_digital_span_z_score_dsr = 0.202;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 8) {
                                                            test_digital_span_z_score_dsr = 0.613;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 9) {
                                                            test_digital_span_z_score_dsr = 0.842;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 10) {
                                                            test_digital_span_z_score_dsr = 1.08;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 11) {
                                                            test_digital_span_z_score_dsr = 1.476;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 12) {
                                                            test_digital_span_z_score_dsr = 2.054;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else {
                                                            test_digital_span_z_score_dsr = 2.054;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        }
                                                    } else if ((age >= 45) && (age <= 54)) {
                                                        if (test_digital_span_vor <= 4) {
                                                            test_digital_span_z_score_dsv = -2.054;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        } else if (test_digital_span_vor == 5) {
                                                            test_digital_span_z_score_dsv = -2.054;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 6) {
                                                            test_digital_span_z_score_dsv = -1.126;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 7) {
                                                            test_digital_span_z_score_dsv = -0.412;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 8) {
                                                            test_digital_span_z_score_dsv = 0.075;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 9) {
                                                            test_digital_span_z_score_dsv = 0.496;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 10) {
                                                            test_digital_span_z_score_dsv = 1.036;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 11) {
                                                            test_digital_span_z_score_dsv = 1.645;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 12) {
                                                            test_digital_span_z_score_dsv = 2.054;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else {
                                                            test_digital_span_z_score_dsv = 2.054;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        }

                                                        if (test_digital_span_ruc <= 3) {
                                                            test_digital_span_z_score_dsr = -2.054;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else if (test_digital_span_ruc == 4) {
                                                            test_digital_span_z_score_dsr = -2.054;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 5) {
                                                            test_digital_span_z_score_dsr = -1.126;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 6) {
                                                            test_digital_span_z_score_dsr = -0.412;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 7) {
                                                            test_digital_span_z_score_dsr = 0.05;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 8) {
                                                            test_digital_span_z_score_dsr = 0.553;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 9) {
                                                            test_digital_span_z_score_dsr = 1.126;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 10) {
                                                            test_digital_span_z_score_dsr = 1.405;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 11) {
                                                            test_digital_span_z_score_dsr = 1.645;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 12) {
                                                            test_digital_span_z_score_dsr = 2.054;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else {
                                                            test_digital_span_z_score_dsr = 2.054;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        }
                                                    } else if ((age >= 55) && (age <= 64)) {
                                                        if (test_digital_span_vor <= 3) {
                                                            test_digital_span_z_score_dsv = -2.054;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        } else if (test_digital_span_vor == 4) {
                                                            test_digital_span_z_score_dsv = -2.054;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 5) {
                                                            test_digital_span_z_score_dsv = -2.054;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        } else if (test_digital_span_vor == 6) {
                                                            test_digital_span_z_score_dsv = -0.842;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 7) {
                                                            test_digital_span_z_score_dsv = -0.05;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 8) {
                                                            test_digital_span_z_score_dsv = 0.44;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 9) {
                                                            test_digital_span_z_score_dsv = 0.739;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 10) {
                                                            test_digital_span_z_score_dsv = 1.175;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 11) {
                                                            test_digital_span_z_score_dsv = 2.054;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else {
                                                            test_digital_span_z_score_dsv = 2.054;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        }

                                                        if (test_digital_span_ruc <= 1) {
                                                            test_digital_span_z_score_dsr = -2.054;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else if (test_digital_span_ruc == 2) {
                                                            test_digital_span_z_score_dsr = -2.054;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 3) {
                                                            test_digital_span_z_score_dsr = -2.054;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else if (test_digital_span_ruc == 4) {
                                                            test_digital_span_z_score_dsr = -2.054;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else if (test_digital_span_ruc == 5) {
                                                            test_digital_span_z_score_dsr = -1.175;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 6) {
                                                            test_digital_span_z_score_dsr = -0.305;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 7) {
                                                            test_digital_span_z_score_dsr = 0.44;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 8) {
                                                            test_digital_span_z_score_dsr = 0.842;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 9) {
                                                            test_digital_span_z_score_dsr = 1.175;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 10) {
                                                            test_digital_span_z_score_dsr = 1.881;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else {
                                                            test_digital_span_z_score_dsr = 1.881;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        }
                                                    } else if ((age >= 65) && (age <= 74)) {
                                                        if (test_digital_span_vor <= 3) {
                                                            test_digital_span_z_score_dsv = -1.645;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        } else if (test_digital_span_vor == 4) {
                                                            test_digital_span_z_score_dsv = -1.645;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 5) {
                                                            test_digital_span_z_score_dsv = -1.036;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 6) {
                                                            test_digital_span_z_score_dsv = -0.583;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 7) {
                                                            test_digital_span_z_score_dsv = 0.075;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 8) {
                                                            test_digital_span_z_score_dsv = 0.706;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 9) {
                                                            test_digital_span_z_score_dsv = 1.175;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 10) {
                                                            test_digital_span_z_score_dsv = 1.645;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else if (test_digital_span_vor == 11) {
                                                            test_digital_span_z_score_dsv = 2.054;
                                                            test_digital_span_CAV_vorwarts = false;
                                                        } else {
                                                            test_digital_span_z_score_dsv = 2.054;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        }

                                                        if (test_digital_span_ruc <= 1) {
                                                            test_digital_span_z_score_dsr = -2.054;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else if (test_digital_span_ruc == 2) {
                                                            test_digital_span_z_score_dsr = -2.054;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 3) {
                                                            test_digital_span_z_score_dsr = -1.645;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 4) {
                                                            test_digital_span_z_score_dsr = -1.126;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 5) {
                                                            test_digital_span_z_score_dsr = -0.613;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 6) {
                                                            test_digital_span_z_score_dsr = 0.075;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 7) {
                                                            test_digital_span_z_score_dsr = 0.772;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 8) {
                                                            test_digital_span_z_score_dsr = 1.036;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else if (test_digital_span_ruc == 9) {
                                                            test_digital_span_z_score_dsr = 1.476;
                                                            test_digital_span_CAV_score_ruckwarts = false;
                                                        } else {
                                                            test_digital_span_z_score_dsr = 1.881;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        }
                                                    } else if (age >= 75) {
                                                        if (test_digital_span_vor <= 3) {
                                                            test_digital_span_z_score_dsv = -1.645;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        } else if (test_digital_span_vor == 4) {
                                                            test_digital_span_z_score_dsv = -1.645;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        } else if (test_digital_span_vor == 5) {
                                                            test_digital_span_z_score_dsv = -1.036;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        } else if (test_digital_span_vor == 6) {
                                                            test_digital_span_z_score_dsv = -0.583;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        } else if (test_digital_span_vor == 7) {
                                                            test_digital_span_z_score_dsv = 0.075;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        } else if (test_digital_span_vor == 8) {
                                                            test_digital_span_z_score_dsv = 0.706;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        } else if (test_digital_span_vor == 9) {
                                                            test_digital_span_z_score_dsv = 1.175;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        } else if (test_digital_span_vor == 10) {
                                                            test_digital_span_z_score_dsv = 1.645;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        } else if (test_digital_span_vor == 11) {
                                                            test_digital_span_z_score_dsv = 2.054;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        } else {
                                                            test_digital_span_z_score_dsv = 2.054;
                                                            test_digital_span_CAV_vorwarts = true;
                                                        }

                                                        if (test_digital_span_ruc <= 1) {
                                                            test_digital_span_z_score_dsr = -2.054;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else if (test_digital_span_ruc == 2) {
                                                            test_digital_span_z_score_dsr = -2.054;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else if (test_digital_span_ruc == 3) {
                                                            test_digital_span_z_score_dsr = -1.645;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else if (test_digital_span_ruc == 4) {
                                                            test_digital_span_z_score_dsr = -1.126;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else if (test_digital_span_ruc == 5) {
                                                            test_digital_span_z_score_dsr = -0.613;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else if (test_digital_span_ruc == 6) {
                                                            test_digital_span_z_score_dsr = 0.075;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else if (test_digital_span_ruc == 7) {
                                                            test_digital_span_z_score_dsr = 0.772;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else if (test_digital_span_ruc == 8) {
                                                            test_digital_span_z_score_dsr = 1.036;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else if (test_digital_span_ruc == 9) {
                                                            test_digital_span_z_score_dsr = 1.476;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        } else {
                                                            test_digital_span_z_score_dsr = 1.881;
                                                            test_digital_span_CAV_score_ruckwarts = true;
                                                        }
                                                    }
                                                }

                                                let test_fvsem_animaux_reponses = 0;
                                                let test_fvsem_animaux_intrusions = 0;
                                                let test_fvsem_animaux_erreurs = 0;

                                                Test_FVSem.select_report_by_idSession(IDSession)
                                                .then(([test_fvsem]) => {
                                                    if (test_fvsem.length == 1) {
                                                        test_fvsem_animaux_reponses = test_fvsem[0].animaux_reponses;
                                                        test_fvsem_animaux_intrusions = test_fvsem[0].animaux_intrusions;
                                                        test_fvsem_animaux_erreurs = test_fvsem[0].animaux_erreurs;
                                                    }

                                                    let test_fvlex_p_reponses = 0;
                                                    let test_fvlex_p_intrusions = 0;
                                                    let test_fvlex_p_erreurs = 0;

                                                    Test_FVLex.select_report_by_idSession(IDSession)
                                                    .then(([test_fvlex]) => {
                                                        if (test_fvlex.length == 1) {
                                                            test_fvlex_p_reponses = test_fvlex[0].p_reponses;
                                                            test_fvlex_p_intrusions = test_fvlex[0].p_intrusions;
                                                            test_fvlex_p_erreurs = test_fvlex[0].p_erreurs;
                                                        }

                                                        let test_bnt_15_haufig = 0;
                                                        let test_bnt_15_mittel = 0;
                                                        let test_bnt_15_selten = 0;
                                                        let test_bnt_15_total = 0;

                                                        Test_BNT_15.select_report_by_idSession(IDSession)
                                                        .then(([test_bnt_15]) => {
                                                            if (test_bnt_15.length == 1) {
                                                                test_bnt_15_haufig = test_bnt_15[0].haufig;
                                                                test_bnt_15_mittel = test_bnt_15[0].mittel;
                                                                test_bnt_15_selten = test_bnt_15[0].selten;
                                                                test_bnt_15_total = test_bnt_15_haufig + test_bnt_15_mittel + test_bnt_15_selten;
                                                            }

                                                            let test_words_list_lernen_1 = 0;
                                                            let test_words_list_lernen_1_int = 0;
                                                            let test_words_list_lernen_2 = 0;
                                                            let test_words_list_lernen_2_int = 0;
                                                            let test_words_list_lernen_3 = 0;
                                                            let test_words_list_lernen_3_int = 0;
                                                            let test_words_list_fiabz = 0;
                                                            let test_words_list_abrufen = 0;
                                                            let test_words_list_abrufen_int = 0;
                                                            let test_words_list_r_ja = 0;
                                                            let test_words_list_r_nein = 0;

                                                            Test_Words_List.select_report_by_idSession(IDSession)
                                                            .then(([test_words_list]) => {
                                                                if (test_words_list.length == 1) {
                                                                    test_words_list_lernen_1 = test_words_list[0].lernen_1;
                                                                    test_words_list_lernen_1_int = test_words_list[0].lernen_1_int;
                                                                    test_words_list_lernen_2 = test_words_list[0].lernen_2;
                                                                    test_words_list_lernen_2_int = test_words_list[0].lernen_2_int;
                                                                    test_words_list_lernen_3 = test_words_list[0].lernen_3;
                                                                    test_words_list_lernen_3_int = test_words_list[0].lernen_3_int;
                                                                    test_words_list_fiabz = test_words_list[0].fiabz;
                                                                    test_words_list_abrufen = test_words_list[0].abrufen;
                                                                    test_words_list_abrufen_int = test_words_list[0].abrufen_int;
                                                                    test_words_list_r_ja = test_words_list[0].r_ja;
                                                                    test_words_list_r_nein = test_words_list[0].r_nein;
                                                                }

                                                                let test_fvsem_z_score_vft = 0;
                                                                let test_fvsem_richtige_vft = test_fvsem_animaux_reponses;
                                                                let test_fvlex_z_score_pfs = 0;
                                                                let test_fvlex_richtige_pfs = test_fvlex_p_reponses;
                                                                let test_bnt_15_z_score_bnt = 0;
                                                                let test_bnt_15_total_bnt = test_bnt_15_total;
                                                                let test_words_list_z_score_wld1 = 0;
                                                                let test_words_list_richtige_wld1 = test_words_list_lernen_1;
                                                                let test_words_list_z_score_wld2 = 0;
                                                                let test_words_list_richtige_wld2 = test_words_list_lernen_2;
                                                                let test_words_list_z_score_wld3 = 0;
                                                                let test_words_list_richtige_wld3 = test_words_list_lernen_3;
                                                                let test_words_list_z_score_wlt = 0;
                                                                let test_words_list_z_score_wli = 0;
                                                                let test_words_list_intrusionen_wl1 = test_words_list_lernen_1_int;
                                                                let test_words_list_intrusionen_wl2 = test_words_list_lernen_2_int;
                                                                let test_words_list_intrusionen_wl3 = test_words_list_lernen_3_int;
                                                                let test_words_list_z_score_wab = 0;
                                                                let test_words_list_richtige_wab = test_words_list_abrufen;
                                                                let test_words_list_z_score_swo = 0;
                                                                let test_words_list_z_score_dis = 0;
                                                                let test_words_list_richtige_jaw = test_words_list_r_ja;
                                                                let test_words_list_richtige_new = test_words_list_r_nein;

                                                                if (sex == "Frauen") {
                                                                    if (bildungsniveau <= 12) {
                                                                        if (age <= 69) {                                                                            
                                                                            test_fvsem_z_score_vft = (test_fvsem_richtige_vft - 21.3) / 5.1;
                                                                            test_fvlex_z_score_pfs  = (test_fvlex_richtige_pfs - 12.8) / 4.3;
                                                                            test_bnt_15_z_score_bnt  = (test_bnt_15_total_bnt - 14.0) / 1.0;
                                                                            test_words_list_z_score_wld1  = (test_words_list_richtige_wld1 - 5.9) / 1.4;
                                                                            test_words_list_z_score_wld2  = (test_words_list_richtige_wld2 - 7.9) / 1.4;
                                                                            test_words_list_z_score_wld3  = (test_words_list_richtige_wld3 - 8.8) / 1.2;
                                                                            test_words_list_z_score_wlt = ((test_words_list_richtige_wld1 + test_words_list_richtige_wld2 + test_words_list_richtige_wld3) - 22.5) / 3.2;
                                                                            test_words_list_z_score_wli  = ((test_words_list_intrusionen_wl1 + test_words_list_intrusionen_wl2 + test_words_list_intrusionen_wl3) - 0.6) / 1.2;
                                                                            test_words_list_z_score_wab  = (test_words_list_richtige_wab - 7.7) / 1.8;
                                                                            test_words_list_z_score_swo  = test_words_list_richtige_wld3 == 0 ? NaN : (((test_words_list_richtige_wab * 100) / test_words_list_richtige_wld3) - 88.6) / 18.3;
                                                                            test_words_list_z_score_dis  = ((((test_words_list_richtige_jaw + test_words_list_richtige_new) * 100 ) / 20) - 98.1) / 3.8;
                                                                        } else if (age <= 79) {
                                                                            test_fvsem_z_score_vft = (test_fvsem_richtige_vft - 19.2) / 5.2;
                                                                            test_fvlex_z_score_pfs  = (test_fvlex_richtige_pfs - 10.4) / 4.5;
                                                                            test_bnt_15_z_score_bnt  = (test_bnt_15_total_bnt - 13.4) / 1.5;
                                                                            test_words_list_z_score_wld1  = (test_words_list_richtige_wld1 - 5.5) / 1.4;
                                                                            test_words_list_z_score_wld2  = (test_words_list_richtige_wld2 - 7.4) / 1.2;
                                                                            test_words_list_z_score_wld3  = (test_words_list_richtige_wld3 - 8.4) / 1.2;
                                                                            test_words_list_z_score_wlt = ((test_words_list_richtige_wld1 + test_words_list_richtige_wld2 + test_words_list_richtige_wld3) - 21.2) / 2.9;
                                                                            test_words_list_z_score_wli  = ((test_words_list_intrusionen_wl1 + test_words_list_intrusionen_wl2 + test_words_list_intrusionen_wl3) - 0.7) / 1.4;
                                                                            test_words_list_z_score_wab  = (test_words_list_richtige_wab - 7.3) / 1.8;
                                                                            test_words_list_z_score_swo  = test_words_list_richtige_wld3 == 0 ? NaN : (((test_words_list_richtige_wab * 100) / test_words_list_richtige_wld3) - 87.0) / 18.9;
                                                                            test_words_list_z_score_dis  = ((((test_words_list_richtige_jaw + test_words_list_richtige_new) * 100 ) / 20) - 97.8) / 4.1;
                                                                        } else {
                                                                            test_fvsem_z_score_vft = (test_fvsem_richtige_vft - 17.4) / 4.5;
                                                                            test_fvlex_z_score_pfs  = (test_fvlex_richtige_pfs - 10.3) / 3.8;
                                                                            test_bnt_15_z_score_bnt  = (test_bnt_15_total_bnt - 13.4) / 1.4;
                                                                            test_words_list_z_score_wld1  = (test_words_list_richtige_wld1 - 5.2) / 1.7;
                                                                            test_words_list_z_score_wld2  = (test_words_list_richtige_wld2 - 6.7) / 1.5;
                                                                            test_words_list_z_score_wld3  = (test_words_list_richtige_wld3 - 8.1) / 1.6;
                                                                            test_words_list_z_score_wlt = ((test_words_list_richtige_wld1 + test_words_list_richtige_wld2 + test_words_list_richtige_wld3) - 19.9) / 3.9;
                                                                            test_words_list_z_score_wli  = ((test_words_list_intrusionen_wl1 + test_words_list_intrusionen_wl2 + test_words_list_intrusionen_wl3) - 1.4) / 2.1;
                                                                            test_words_list_z_score_wab  = (test_words_list_richtige_wab - 6.4) / 1.9;
                                                                            test_words_list_z_score_swo  = test_words_list_richtige_wld3 == 0 ? NaN : (((test_words_list_richtige_wab * 100) / test_words_list_richtige_wld3) - 88.1) / 17.2;
                                                                            test_words_list_z_score_dis  = ((((test_words_list_richtige_jaw + test_words_list_richtige_new) * 100 ) / 20) - 97.6) / 3.1;
                                                                        }
                                                                    } else {
                                                                        if (age <= 69) {                                                                            
                                                                            test_fvsem_z_score_vft = (test_fvsem_richtige_vft - 26.0) / 4.8;
                                                                            test_fvlex_z_score_pfs  = (test_fvlex_richtige_pfs - 15.0) / 4.8;
                                                                            test_bnt_15_z_score_bnt  = (test_bnt_15_total_bnt - 14.8) / 0.8;
                                                                            test_words_list_z_score_wld1  = (test_words_list_richtige_wld1 - 6.2) / 1.4;
                                                                            test_words_list_z_score_wld2  = (test_words_list_richtige_wld2 - 8.2) / 1.2;
                                                                            test_words_list_z_score_wld3  = (test_words_list_richtige_wld3 - 9.1) / 0.8;
                                                                            test_words_list_z_score_wlt = ((test_words_list_richtige_wld1 + test_words_list_richtige_wld2 + test_words_list_richtige_wld3) - 23.4) / 2.8;
                                                                            test_words_list_z_score_wli  = ((test_words_list_intrusionen_wl1 + test_words_list_intrusionen_wl2 + test_words_list_intrusionen_wl3) - 0.3) / 0.5;
                                                                            test_words_list_z_score_wab  = (test_words_list_richtige_wab - 8.5) / 1.4;
                                                                            test_words_list_z_score_swo  = test_words_list_richtige_wld3 == 0 ? NaN : (((test_words_list_richtige_wab * 100) / test_words_list_richtige_wld3) - 93.6) / 13.0;
                                                                            test_words_list_z_score_dis  = ((((test_words_list_richtige_jaw + test_words_list_richtige_new) * 100 ) / 20) - 98.5) / 3.2;
                                                                        } else if (age <= 79) {
                                                                            test_fvsem_z_score_vft = (test_fvsem_richtige_vft - 24.3) / 6.4;
                                                                            test_fvlex_z_score_pfs  = (test_fvlex_richtige_pfs - 14.7) / 4.2;
                                                                            test_bnt_15_z_score_bnt  = (test_bnt_15_total_bnt - 13.4) / 1.5;
                                                                            test_words_list_z_score_wld1  = (test_words_list_richtige_wld1 - 6.1) / 1.7;
                                                                            test_words_list_z_score_wld2  = (test_words_list_richtige_wld2 - 7.8) / 1.5;
                                                                            test_words_list_z_score_wld3  = (test_words_list_richtige_wld3 - 8.8) / 1.2;
                                                                            test_words_list_z_score_wlt = ((test_words_list_richtige_wld1 + test_words_list_richtige_wld2 + test_words_list_richtige_wld3) - 22.7) / 3.7;
                                                                            test_words_list_z_score_wli  = ((test_words_list_intrusionen_wl1 + test_words_list_intrusionen_wl2 + test_words_list_intrusionen_wl3) - 0.4) / 0.8;
                                                                            test_words_list_z_score_wab  = (test_words_list_richtige_wab - 7.9) / 1.9;
                                                                            test_words_list_z_score_swo  = test_words_list_richtige_wld3 == 0 ? NaN : (((test_words_list_richtige_wab * 100) / test_words_list_richtige_wld3) - 89.2) / 15.6;
                                                                            test_words_list_z_score_dis  = ((((test_words_list_richtige_jaw + test_words_list_richtige_new) * 100 ) / 20) - 97.7) / 4.9;
                                                                        } else {
                                                                            test_fvsem_z_score_vft = (test_fvsem_richtige_vft - 23.3) / 6.8;
                                                                            test_fvlex_z_score_pfs  = (test_fvlex_richtige_pfs - 12.0) / 0.1;
                                                                            test_bnt_15_z_score_bnt  = (test_bnt_15_total_bnt - 13.7) / 1.4;
                                                                            test_words_list_z_score_wld1  = (test_words_list_richtige_wld1 - 5.2) / 1.0;
                                                                            test_words_list_z_score_wld2  = (test_words_list_richtige_wld2 - 6.7) / 1.5;
                                                                            test_words_list_z_score_wld3  = (test_words_list_richtige_wld3 - 7.8) / 1.0;
                                                                            test_words_list_z_score_wlt = ((test_words_list_richtige_wld1 + test_words_list_richtige_wld2 + test_words_list_richtige_wld3) - 19.7) / 3.2;
                                                                            test_words_list_z_score_wli  = ((test_words_list_intrusionen_wl1 + test_words_list_intrusionen_wl2 + test_words_list_intrusionen_wl3) - 0.8) / 1.2;
                                                                            test_words_list_z_score_wab  = (test_words_list_richtige_wab - 6.1) / 2.0;
                                                                            test_words_list_z_score_swo  = test_words_list_richtige_wld3 == 0 ? NaN : (((test_words_list_richtige_wab * 100) / test_words_list_richtige_wld3) - 78.3) / 22.3;
                                                                            test_words_list_z_score_dis  = ((((test_words_list_richtige_jaw + test_words_list_richtige_new) * 100 ) / 20) - 97.2) / 3.6;
                                                                        }
                                                                    }
                                                                } else {
                                                                    if (bildungsniveau <= 12) {
                                                                        if (age <= 69) {                                                                            
                                                                            test_fvsem_z_score_vft = (test_fvsem_richtige_vft - 21.8) / 5.8;
                                                                            test_fvlex_z_score_pfs  = (test_fvlex_richtige_pfs - 11.0) / 4.2;
                                                                            test_bnt_15_z_score_bnt  = (test_bnt_15_total_bnt - 14.1) / 1.0;
                                                                            test_words_list_z_score_wld1  = (test_words_list_richtige_wld1 - 5.0) / 1.4;
                                                                            test_words_list_z_score_wld2  = (test_words_list_richtige_wld2 - 6.9) / 1.4;
                                                                            test_words_list_z_score_wld3  = (test_words_list_richtige_wld3 - 7.9) / 1.3;
                                                                            test_words_list_z_score_wlt = ((test_words_list_richtige_wld1 + test_words_list_richtige_wld2 + test_words_list_richtige_wld3) - 19.9) / 3.3;
                                                                            test_words_list_z_score_wli  = ((test_words_list_intrusionen_wl1 + test_words_list_intrusionen_wl2 + test_words_list_intrusionen_wl3) - 0.8) / 1.6;
                                                                            test_words_list_z_score_wab  = (test_words_list_richtige_wab - 6.8) / 1.9;
                                                                            test_words_list_z_score_swo  = test_words_list_richtige_wld3 == 0 ? NaN : (((test_words_list_richtige_wab * 100) / test_words_list_richtige_wld3) - 86.4) / 20.1;
                                                                            test_words_list_z_score_dis  = ((((test_words_list_richtige_jaw + test_words_list_richtige_new) * 100 ) / 20) - 96.5) / 5.6;
                                                                        } else if (age <= 79) {
                                                                            test_fvsem_z_score_vft = (test_fvsem_richtige_vft - 19.6) / 4.6;
                                                                            test_fvlex_z_score_pfs  = (test_fvlex_richtige_pfs - 10.9) / 4.0;
                                                                            test_bnt_15_z_score_bnt  = (test_bnt_15_total_bnt - 13.9) / 1.1;
                                                                            test_words_list_z_score_wld1  = (test_words_list_richtige_wld1 - 4.7) / 1.4;
                                                                            test_words_list_z_score_wld2  = (test_words_list_richtige_wld2 - 6.5) / 1.4;
                                                                            test_words_list_z_score_wld3  = (test_words_list_richtige_wld3 - 7.5) / 1.3;
                                                                            test_words_list_z_score_wlt = ((test_words_list_richtige_wld1 + test_words_list_richtige_wld2 + test_words_list_richtige_wld3) - 18.7) / 3.3;
                                                                            test_words_list_z_score_wli  = ((test_words_list_intrusionen_wl1 + test_words_list_intrusionen_wl2 + test_words_list_intrusionen_wl3) - 0.8) / 1.4;
                                                                            test_words_list_z_score_wab  = (test_words_list_richtige_wab - 5.9) / 1.9;
                                                                            test_words_list_z_score_swo  = test_words_list_richtige_wld3 == 0 ? NaN : (((test_words_list_richtige_wab * 100) / test_words_list_richtige_wld3) - 79.0) / 21.7;
                                                                            test_words_list_z_score_dis  = ((((test_words_list_richtige_jaw + test_words_list_richtige_new) * 100 ) / 20) - 95.4) / 6.0;
                                                                        } else {
                                                                            test_fvsem_z_score_vft = (test_fvsem_richtige_vft - 18.0) / 4.9;
                                                                            test_fvlex_z_score_pfs  = (test_fvlex_richtige_pfs - 9.1) / 4.0;
                                                                            test_bnt_15_z_score_bnt  = (test_bnt_15_total_bnt - 13.4) / 1.3;
                                                                            test_words_list_z_score_wld1  = (test_words_list_richtige_wld1 - 3.9) / 1.2;
                                                                            test_words_list_z_score_wld2  = (test_words_list_richtige_wld2 - 5.3) / 1.2;
                                                                            test_words_list_z_score_wld3  = (test_words_list_richtige_wld3 - 6.6) / 1.2;
                                                                            test_words_list_z_score_wlt = ((test_words_list_richtige_wld1 + test_words_list_richtige_wld2 + test_words_list_richtige_wld3) - 15.8) / 2.8;
                                                                            test_words_list_z_score_wli  = ((test_words_list_intrusionen_wl1 + test_words_list_intrusionen_wl2 + test_words_list_intrusionen_wl3) - 1.7) / 2.1;
                                                                            test_words_list_z_score_wab  = (test_words_list_richtige_wab - 4.4) / 1.8;
                                                                            test_words_list_z_score_swo  = test_words_list_richtige_wld3 == 0 ? NaN : (((test_words_list_richtige_wab * 100) / test_words_list_richtige_wld3) - 67.7) / 25.4;
                                                                            test_words_list_z_score_dis  = ((((test_words_list_richtige_jaw + test_words_list_richtige_new) * 100 ) / 20) - 92.8) / 6.1;
                                                                        }
                                                                    } else {
                                                                        if (age <= 69) {                                                                            
                                                                            test_fvsem_z_score_vft = (test_fvsem_richtige_vft - 23.4) / 5.4;
                                                                            test_fvlex_z_score_pfs  = (test_fvlex_richtige_pfs - 13.2) / 4.8;
                                                                            test_bnt_15_z_score_bnt  = (test_bnt_15_total_bnt - 14.4) / 0.7;
                                                                            test_words_list_z_score_wld1  = (test_words_list_richtige_wld1 - 5.5) / 1.1;
                                                                            test_words_list_z_score_wld2  = (test_words_list_richtige_wld2 - 7.2) / 1.3;
                                                                            test_words_list_z_score_wld3  = (test_words_list_richtige_wld3 - 8.2) / 1.1;
                                                                            test_words_list_z_score_wlt = ((test_words_list_richtige_wld1 + test_words_list_richtige_wld2 + test_words_list_richtige_wld3) - 20.9) / 2.8;
                                                                            test_words_list_z_score_wli  = ((test_words_list_intrusionen_wl1 + test_words_list_intrusionen_wl2 + test_words_list_intrusionen_wl3) - 0.7) / 1.1;
                                                                            test_words_list_z_score_wab  = (test_words_list_richtige_wab - 7.2) / 1.7;
                                                                            test_words_list_z_score_swo  = test_words_list_richtige_wld3 == 0 ? NaN : (((test_words_list_richtige_wab * 100) / test_words_list_richtige_wld3) - 88.3) / 17.5;
                                                                            test_words_list_z_score_dis  = ((((test_words_list_richtige_jaw + test_words_list_richtige_new) * 100 ) / 20) - 97.4) / 4.5;
                                                                        } else if (age <= 79) {
                                                                            test_fvsem_z_score_vft = (test_fvsem_richtige_vft - 21.6) / 5.4;
                                                                            test_fvlex_z_score_pfs  = (test_fvlex_richtige_pfs - 13.0) / 4.2;
                                                                            test_bnt_15_z_score_bnt  = (test_bnt_15_total_bnt - 14.4) / 0.9;
                                                                            test_words_list_z_score_wld1  = (test_words_list_richtige_wld1 - 5.0) / 1.4;
                                                                            test_words_list_z_score_wld2  = (test_words_list_richtige_wld2 - 6.7) / 1.4;
                                                                            test_words_list_z_score_wld3  = (test_words_list_richtige_wld3 - 7.5) / 1.3;
                                                                            test_words_list_z_score_wlt = ((test_words_list_richtige_wld1 + test_words_list_richtige_wld2 + test_words_list_richtige_wld3) - 19.2) / 3.5;
                                                                            test_words_list_z_score_wli  = ((test_words_list_intrusionen_wl1 + test_words_list_intrusionen_wl2 + test_words_list_intrusionen_wl3) - 0.6) / 1.2;
                                                                            test_words_list_z_score_wab  = (test_words_list_richtige_wab - 6.6) / 1.8;
                                                                            test_words_list_z_score_swo  = test_words_list_richtige_wld3 == 0 ? NaN : (((test_words_list_richtige_wab * 100) / test_words_list_richtige_wld3) - 87.6) / 20.0;
                                                                            test_words_list_z_score_dis  = ((((test_words_list_richtige_jaw + test_words_list_richtige_new) * 100 ) / 20) - 96.5) / 4.7;
                                                                        } else {
                                                                            test_fvsem_z_score_vft = (test_fvsem_richtige_vft - 18.5) / 4.5;
                                                                            test_fvlex_z_score_pfs  = (test_fvlex_richtige_pfs - 12.3) / 3.9;
                                                                            test_bnt_15_z_score_bnt  = (test_bnt_15_total_bnt - 13.7) / 1.2;
                                                                            test_words_list_z_score_wld1  = (test_words_list_richtige_wld1 - 4.6) / 1.5;
                                                                            test_words_list_z_score_wld2  = (test_words_list_richtige_wld2 - 6.4) / 1.5;
                                                                            test_words_list_z_score_wld3  = (test_words_list_richtige_wld3 - 7.5) / 1.6;
                                                                            test_words_list_z_score_wlt = ((test_words_list_richtige_wld1 + test_words_list_richtige_wld2 + test_words_list_richtige_wld3) - 18.5) / 4.1;
                                                                            test_words_list_z_score_wli  = ((test_words_list_intrusionen_wl1 + test_words_list_intrusionen_wl2 + test_words_list_intrusionen_wl3) - 0.8) / 1.5;
                                                                            test_words_list_z_score_wab  = (test_words_list_richtige_wab - 5.9) / 2.2;
                                                                            test_words_list_z_score_swo  = test_words_list_richtige_wld3 == 0 ? NaN : (((test_words_list_richtige_wab * 100) / test_words_list_richtige_wld3) - 77.5) / 20.8;
                                                                            test_words_list_z_score_dis  = ((((test_words_list_richtige_jaw + test_words_list_richtige_new) * 100 ) / 20) - 97.7) / 3.9;
                                                                        }
                                                                    }
                                                                }
                                
                                                                res.render('clinician/reports/generate-report-upd-rmc-detail', {                                        
                                                                    pageTitle : 'Générer un Rapport',
                                                                    path : '',
                                                                    id_session : IDSession,
                                                                    fromPage: req.query.from,
                                                                    patient_family_name : patient_family_name,
                                                                    patient_name : patient_name,
                                                                    session_created_date : session_created_date,
                                                                    patient_id : patient_id,
                                                                    email : email,
                                                                    birthday : birthday,
                                                                    age : age,
                                                                    sex : sex,
                                                                    bildungsniveau : bildungsniveau,
                                                                    test_moca_total : test_moca_total,
                                                                    test_gds_score : test_gds_score,
                                                                    test_stroop_victoria_2_duree_1 : test_stroop_victoria_2_duree_1,
                                                                    test_stroop_victoria_2_nombre_d_erreurs_1 : test_stroop_victoria_2_nombre_d_erreurs_1,
                                                                    test_stroop_victoria_2_nombre_d_erreurs_corrigees_1 : test_stroop_victoria_2_nombre_d_erreurs_corrigees_1,
                                                                    test_stroop_victoria_2_duree_2 : test_stroop_victoria_2_duree_2,
                                                                    test_stroop_victoria_2_nombre_d_erreurs_2 : test_stroop_victoria_2_nombre_d_erreurs_2,
                                                                    test_stroop_victoria_2_nombre_d_erreurs_corrigees_2 : test_stroop_victoria_2_nombre_d_erreurs_corrigees_2,
                                                                    test_stroop_victoria_2_duree_3 : test_stroop_victoria_2_duree_3,
                                                                    test_stroop_victoria_2_nombre_d_erreurs_3 : test_stroop_victoria_2_nombre_d_erreurs_3,
                                                                    test_stroop_victoria_2_nombre_d_erreurs_corrigees_3 : test_stroop_victoria_2_nombre_d_erreurs_corrigees_3,
                                                                    test_stroop_victoria_2_z_score_svA : test_stroop_victoria_2_z_score_svA,
                                                                    test_stroop_victoria_2_z_score_svB : test_stroop_victoria_2_z_score_svB,
                                                                    test_stroop_victoria_2_z_score_svC : test_stroop_victoria_2_z_score_svC,
                                                                    
                                                                    test_digital_span_vor : test_digital_span_vor,
                                                                    test_digital_span_ruc : test_digital_span_ruc,
                                                                    test_digital_span_CAV_vorwarts : test_digital_span_CAV_vorwarts,
                                                                    test_digital_span_CAV_score_ruckwarts : test_digital_span_CAV_score_ruckwarts,
                                                                    test_digital_span_z_score_dsv : test_digital_span_z_score_dsv,
                                                                    test_digital_span_z_score_dsr : test_digital_span_z_score_dsr,
                                                                    test_fvsem_animaux_reponses : test_fvsem_animaux_reponses,
                                                                    test_fvsem_animaux_intrusions : test_fvsem_animaux_intrusions,
                                                                    test_fvsem_animaux_erreurs : test_fvsem_animaux_erreurs,
                                                                    test_fvsem_z_score_vft : test_fvsem_z_score_vft,
                                                                    test_fvlex_p_reponses : test_fvlex_p_reponses,
                                                                    test_fvlex_p_intrusions : test_fvlex_p_intrusions,
                                                                    test_fvlex_p_erreurs : test_fvlex_p_erreurs,
                                                                    test_fvlex_z_score_pfs : test_fvlex_z_score_pfs,
                                                                    test_bnt_15_haufig : test_bnt_15_haufig,
                                                                    test_bnt_15_mittel : test_bnt_15_mittel,
                                                                    test_bnt_15_selten : test_bnt_15_selten, 
                                                                    test_bnt_15_total : test_bnt_15_total,
                                                                    test_bnt_15_z_score_bnt : test_bnt_15_z_score_bnt,
                                                                    test_words_list_lernen_1 : test_words_list_lernen_1,
                                                                    test_words_list_lernen_1_int : test_words_list_lernen_1_int,
                                                                    test_words_list_lernen_2 : test_words_list_lernen_2,
                                                                    test_words_list_lernen_2_int : test_words_list_lernen_2_int,
                                                                    test_words_list_lernen_3 : test_words_list_lernen_3,
                                                                    test_words_list_lernen_3_int : test_words_list_lernen_3_int,
                                                                    test_words_list_z_score_wld1 : test_words_list_z_score_wld1,
                                                                    test_words_list_z_score_wld2 : test_words_list_z_score_wld2,
                                                                    test_words_list_z_score_wld3 : test_words_list_z_score_wld3,
                                                                    test_words_list_z_score_wlt : test_words_list_z_score_wlt,
                                                                    test_words_list_z_score_wli : test_words_list_z_score_wli,
                                                                    test_words_list_fiabz : test_words_list_fiabz,
                                                                    test_words_list_abrufen : test_words_list_abrufen,
                                                                    test_words_list_abrufen_int : test_words_list_abrufen_int,
                                                                    test_words_list_z_score_wab : test_words_list_z_score_wab,
                                                                    test_words_list_z_score_swo : test_words_list_z_score_swo,
                                                                    test_words_list_r_ja : test_words_list_r_ja,
                                                                    test_words_list_r_nein : test_words_list_r_nein,
                                                                    test_words_list_z_score_dis : test_words_list_z_score_dis,
                                                                    manageClinicians: manageClinicians
                                                                });
                                                            })
                                                            .catch(err => res.redirect('/error'));
                                                        })
                                                        .catch(err => res.redirect('/error'));
                                                    })
                                                    .catch(err => res.redirect('/error'));
                                                })
                                                .catch(err => res.redirect('/error'));
                                            })
                                            .catch(err => res.redirect('/error'));
                                        })
                                        .catch(err => res.redirect('/error'));
                                    })
                                    .catch(err => res.redirect('/error'));
                                })
                                .catch(err => res.redirect('/error'));                                     
                            }                                        
                        })
                        .catch(err => res.redirect('/error'));
                    })
                    .catch(err => res.redirect('/error'));
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getRemovePatient = (req, res, next) => {
    if (session.checkSession(req, 2)) {      
        let emailPatient = req.query.email;
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let IDClinician = clinicians[0].IDClinician;
                Patient.selectIDUserPatientByemailIDClinician(emailPatient, IDClinician)
                .then(([user_patient]) => {
                    if (user_patient.length == 1) {
                        let IDPatient = user_patient[0].IDPatient;
                        Patient.updateIDClinicianByIDUser(IDPatient, 0)
                        .then(() => {
                            res.redirect('/');
                        })
                        .catch(err => res.redirect('/error'));
                    }
                })
                .catch(err => res.redirect('/error'));
            } else {
                res.redirect('/error');
            }
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getRemoveSession = (req, res, next) => {
    if (session.checkSession(req, 2)) {      
        let idSession = req.query.id;
        let emailPatient = req.query.email;

        Session_Model.select_by_id(idSession)
        .then(([sessions]) => {
            let IDPatient = sessions[0].id_patient;
            let session_created_date = sessions[0].created_date;
            let session_created_number = sessions[0].created_number;

            Patient.select_by_idUser(IDPatient)
            .then(([patient]) => {
                if (patient.length == 1) {
                    let id_path_folder = patient[0].id_path_folder;        
                    
                    Test_Entr_Clin.delete_by_idSession(idSession)
                    .then(() => {
                        Test_FVLex.delete_by_idSession(idSession)
                        .then(() => {
                            Test_FVSem.delete_by_idSession(idSession)
                            .then(() => {                                
                                Session_Model.delete_by_id(idSession)
                                .then(() => {
                                    FileSystem.removeFolder(FileSystem.FOLDER_UPLOAD + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/");                                                                                                                                                                 
                                    res.redirect('/clinician/report-patient?email=' + emailPatient);
                                })
                                .catch(err => res.redirect('/error'));                                
                            })
                            .catch(err => res.redirect('/error'));
                        })
                        .catch(err => res.redirect('/error'));
                    })
                    .catch(err => res.redirect('/error'));   
                }
            })
            .catch(err => res.redirect('/error')); 
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getReportPatient = (req, res, next) => {      
    if (session.checkSession(req, 2)) {
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;
        
                    Patient.findUserIDByemail(req.query.email)        
                    .then(([patients]) => {                 
                        if (patients.length == 1) {
                            let IDPatient = patients[0].IDPatient;
                            Patient.selectAllByIDPatient(IDPatient)
                            .then(([user_patient]) => {
                                
                                if (user_patient.length == 1) {
                                    let IDClinician = user_patient[0].IDClinician;
                                    let patient_name = user_patient[0].name;
                                    let patient_family_name = user_patient[0].family_name;
                                    let patient_email = user_patient[0].email;
                                    let patient_birthday = user_patient[0].birthday;
                                    let patient_address = user_patient[0].address;
                                    let patient_phone = user_patient[0].phone;
                                    let patient_sex = user_patient[0].sex == 0 ? "Femme" : "Homme";
                                    let patient_education = user_patient[0].DSEducationName;
                                    let patient_cp_name = user_patient[0].cp_name;
                                    let patient_cp_family_name = user_patient[0].cp_family_name;
                                    let patient_cp_address = user_patient[0].cp_address;
                                    let patient_cp_phone = user_patient[0].cp_phone;
                                    let patient_cp_email = user_patient[0].cp_email;
                                    let patient_informations = user_patient[0].informations;

                                    Clinician.selectAllByIDClinician(IDClinician)
                                    .then(([user_clinician]) => {                            
                                        if (user_clinician.length == 1) {
                                            let clinician_name = user_clinician[0].name;
                                            let clinician_family_name = user_clinician[0].family_name;
                                            let clinician_email = user_clinician[0].email;                                
                                            let clinician_phone = user_clinician[0].phone;

                                            Session_Model.select_by_idPatient_orderby_createdNumber(IDPatient)
                                            .then(([sessions]) => {
                                                res.render('clinician/reports/report-patient', {                                        
                                                    pageTitle : 'Report of Patient',
                                                    path : '',
                                                    patient_name : patient_name,
                                                    patient_family_name : patient_family_name,
                                                    patient_email : patient_email,
                                                    patient_birthday : patient_birthday,
                                                    patient_address : patient_address,
                                                    patient_phone : patient_phone,
                                                    patient_sex : patient_sex,
                                                    patient_education : patient_education,
                                                    patient_cp_name : patient_cp_name,
                                                    patient_cp_family_name : patient_cp_family_name,
                                                    patient_cp_address : patient_cp_address,
                                                    patient_cp_phone : patient_cp_phone,
                                                    patient_cp_email : patient_cp_email,
                                                    patient_informations : patient_informations,
                                                    clinician_name : clinician_name,
                                                    clinician_family_name : clinician_family_name,
                                                    clinician_email : clinician_email,                              
                                                    clinician_phone : clinician_phone,                                                    
                                                    sessions: sessions,
                                                    manageClinicians: manageClinicians
                                                });
                                            })
                                            .catch(err => res.redirect('/error'));                                
                                        }
                                    })
                                    .catch(err => res.redirect('/error'));
                                }
                            })
                            .catch(err => res.redirect('/error'));                
                        } else {
                            res.redirect('/error');
                        }
                    })
                    .catch(err => res.redirect('/error'));
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getReportSession = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;

                    let IDSession = req.query.id;
                    Session_Model.select_by_id(IDSession)
                    .then(([sessions]) => {
                        let IDPatient = sessions[0].id_patient;
                        let session_created_date = sessions[0].created_date;
                        let session_commentaires = sessions[0].commentaires;

                        Patient.selectNameByIDPatient(IDPatient)
                        .then(([patient]) => {
                            if (patient.length == 1) {                                
                                let patient_family_name = patient[0].family_name;
                                let patient_name = patient[0].name;

                                User.select_email_by_id(IDPatient)
                                .then(([patient]) => {
                                    if (patient.length == 1) {
                                        let patient_email = patient[0].email;

                                        let test_deepspa_historique_du_patient = "";

                                        Test_DeepSpa.select_historique_du_patient_by_idSession(IDSession)
                                        .then(([test_deepspa]) => {
                                            
                                            if (test_deepspa.length == 1) {
                                                test_deepspa_historique_du_patient = test_deepspa[0].historique_du_patient_commentaires;
                                            }

                                            let test_deepspa_conclusions = "";

                                            Test_DeepSpa.select_conclusions_by_idSession(IDSession)
                                            .then(([test_deepspa]) => {
                                                
                                                if (test_deepspa.length == 1) {
                                                    test_deepspa_conclusions = test_deepspa[0].conclusion_commentaires;
                                                }

                                                res.render('clinician/reports/report-session', {                                        
                                                    pageTitle : 'Report of Session',
                                                    path : '',
                                                    id_session : IDSession,
                                                    patient_email : patient_email,
                                                    patient_family_name : patient_family_name,
                                                    patient_name : patient_name,
                                                    session_created_date : session_created_date,
                                                    session_commentaires : session_commentaires,
                                                    test_deepspa_historique_du_patient : test_deepspa_historique_du_patient,
                                                    test_deepspa_conclusions : test_deepspa_conclusions,
                                                    manageClinicians: manageClinicians                                                                                                                                                                                                    
                                                });
                                            })
                                            .catch(err => res.redirect('/error'));
                                        })
                                        .catch(err => res.redirect('/error'));
                                    }
                                })
                                .catch(err => res.redirect('/error'));
                            }
                        })
                        .catch(err => res.redirect('/error'));            
                    })
                    .catch(err => res.redirect('/error'));
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getReportEtudeCliniqueDeepspa = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;

                    let IDSession = req.query.idsession;
                    Session_Model.select_by_id(IDSession)
                    .then(([sessions]) => {
                        let IDPatient = sessions[0].id_patient;
                        let session_created_date = sessions[0].created_date;
                        let session_created_number = sessions[0].created_number;

                        Patient.selectNameByIDPatient(IDPatient)
                        .then(([patient]) => {
                            if (patient.length == 1) {                                
                                let patient_family_name = patient[0].family_name;
                                let patient_name = patient[0].name;
                                
                                Patient.select_by_idUser(IDPatient)
                                .then(([patient]) => {
                                    if (patient.length == 1) {
                                        let id_path_folder = patient[0].id_path_folder;

                                        test_deepspa_path_video = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/DeepSpa/"

                                        let test_deepspa_entretien_clinique_number_files = 0;
                                        let test_deepspa_entretien_clinique_commentaires = "";

                                        Test_DeepSpa.select_entretien_clinique_by_idSession(IDSession)
                                        .then(([test_deepspa]) => {
                                            
                                            if (test_deepspa.length == 1) {
                                                test_deepspa_entretien_clinique_number_files = test_deepspa[0].entretien_clinique_number_files;
                                                test_deepspa_entretien_clinique_commentaires = test_deepspa[0].entretien_clinique_commentaires;
                                            }

                                            let test_deepspa_raconter_journee_number_files = 0;
                                            let test_deepspa_raconter_journee_commentaires = "";

                                            Test_DeepSpa.select_raconter_journee_by_idSession(IDSession)
                                            .then(([test_deepspa]) => {
                                                
                                                if (test_deepspa.length == 1) {
                                                    test_deepspa_raconter_journee_number_files = test_deepspa[0].raconter_journee_number_files;
                                                    test_deepspa_raconter_journee_commentaires = test_deepspa[0].raconter_journee_commentaires;
                                                }
                                                res.render('clinician/reports/report-etude-clinique-deepspa', {                                        
                                                    pageTitle : 'Etude Clinique DeepSpA',
                                                    path : '',
                                                    id_session : IDSession,
                                                    patient_family_name : patient_family_name,
                                                    patient_name : patient_name,
                                                    session_created_date : session_created_date,
                                                    test_deepspa_entretien_clinique_number_files : test_deepspa_entretien_clinique_number_files,
                                                    test_deepspa_entretien_clinique_commentaires : test_deepspa_entretien_clinique_commentaires,
                                                    test_deepspa_raconter_journee_number_files : test_deepspa_raconter_journee_number_files,
                                                    test_deepspa_raconter_journee_commentaires : test_deepspa_raconter_journee_commentaires,
                                                    test_deepspa_path_video : test_deepspa_path_video,
                                                    manageClinicians: manageClinicians                                                                                                                                                                                                    
                                                });                                                
                                            })
                                            .catch(err => res.redirect('/error'));
                                        })
                                        .catch(err => res.redirect('/error'));
                                    }
                                })
                                .catch(err => res.redirect('/error'));                                    
                            }
                        })
                        .catch(err => res.redirect('/error'));            
                    })
                    .catch(err => res.redirect('/error'));
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getReportTestsEffectues = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;

                    let IDSession = req.query.idsession;
                    Session_Model.select_by_id(IDSession)
                    .then(([sessions]) => {
                        let IDPatient = sessions[0].id_patient;
                        let session_created_date = sessions[0].created_date;

                        Patient.selectNameByIDPatient(IDPatient)
                        .then(([patient]) => {
                            if (patient.length == 1) {                                
                                let patient_family_name = patient[0].family_name;
                                let patient_name = patient[0].name;

                                let test_fvlex_p_exist = false;
                                let test_fvlex_r_exist = false;
                                Test_FVLex.select_testDone_by_idSession(IDSession)
                                .then(([test_fvlex]) => {
                                    if (test_fvlex.length == 1) {
                                        let test_fvlex_test_done = test_fvlex[0].test_done;
                                        test_fvlex_p_exist = ((test_fvlex_test_done & 2) == 2) ? true : false;
                                        test_fvlex_r_exist = ((test_fvlex_test_done & 1) == 1) ? true : false;
                                    }

                                    let test_fvsem_animaux_exist = false;
                                    let test_fvsem_fruits_exist = false;
                                    Test_FVSem.select_testDone_by_idSession(IDSession)
                                    .then(([test_fvsem]) => {
                                        if (test_fvsem.length == 1) {
                                            let test_fvsem_test_done = test_fvsem[0].test_done;
                                            test_fvsem_animaux_exist = ((test_fvsem_test_done & 2) == 2) ? true : false;
                                            test_fvsem_fruits_exist = ((test_fvsem_test_done & 1) == 1) ? true : false;
                                        }

                                        let test_gds_exist = false;
                                        Test_GDS.select_by_idSession(IDSession)
                                        .then(([test_gds]) => {
                                            if (test_gds.length == 1) {
                                                test_gds_exist = true;
                                            }

                                            let test_moca_exist = false;
                                            Test_MOCA.select_by_idSession(IDSession)
                                            .then(([test_moca]) => {
                                                if (test_moca.length == 1) {
                                                    test_moca_exist = true;
                                                }

                                                let test_d2_exist = false;
                                                Test_D2.select_by_idSession(IDSession)
                                                .then(([test_d2]) => {
                                                    if (test_d2.length == 1) {
                                                        test_d2_exist = true;
                                                    }

                                                    let test_wais_iv_exist = false;
                                                    Test_WAIS_IV.select_by_idSession(IDSession)
                                                    .then(([test_wais_iv]) => {
                                                        if (test_wais_iv.length == 1) {
                                                            test_wais_iv_exist = true;
                                                        }

                                                        let test_zoo_exist = false;
                                                        Test_Zoo.select_by_idSession(IDSession)
                                                        .then(([test_zoo]) => {
                                                            if (test_zoo.length == 1) {
                                                                test_zoo_exist = true;
                                                            }

                                                            let test_code_wais_exist = false;
                                                            Test_Code_WAIS.select_by_idSession(IDSession)
                                                            .then(([test_code_wais]) => {
                                                                if (test_code_wais.length == 1) {
                                                                    test_code_wais_exist = true;
                                                                }

                                                                let test_npi_exist = false;
                                                                Test_NPI.select_by_idSession(IDSession)
                                                                .then(([test_npi]) => {
                                                                    if (test_npi.length == 1) {
                                                                        test_npi_exist = true;
                                                                    }

                                                                    let test_digital_span_exist = false;
                                                                    Test_Digital_Span.select_by_idSession(IDSession)
                                                                    .then(([test_digital_span]) => {
                                                                        if (test_digital_span.length == 1) {
                                                                            test_digital_span_exist = true;
                                                                        }

                                                                        let test_bnt_15_exist = false;
                                                                        Test_BNT_15.select_by_idSession(IDSession)
                                                                        .then(([test_bnt_15]) => {
                                                                            if (test_bnt_15.length == 1) {
                                                                                test_bnt_15_exist = true;
                                                                            }

                                                                            let test_words_list_exist = false;
                                                                            Test_Words_List.select_by_idSession(IDSession)
                                                                            .then(([test_words_list]) => {
                                                                                if (test_words_list.length == 1) {
                                                                                    test_words_list_exist = true;
                                                                                }

                                                                                let test_stroop_victoria_2_exist = false;
                                                                                Test_Stroop_Victoria_2.select_by_idSession(IDSession)
                                                                                .then(([test_stroop_victoria_2]) => {
                                                                                    if (test_stroop_victoria_2.length == 1) {
                                                                                        test_stroop_victoria_2_exist = true;
                                                                                    }

                                                                                    res.render('clinician/reports/report-tests-effectues', {                                        
                                                                                        pageTitle : 'Tests Effectués',
                                                                                        path : '',
                                                                                        id_session : IDSession,
                                                                                        patient_family_name : patient_family_name,
                                                                                        patient_name : patient_name,
                                                                                        session_created_date : session_created_date,
                                                                                        test_fvlex_p_exist : test_fvlex_p_exist,
                                                                                        test_fvlex_r_exist : test_fvlex_r_exist,
                                                                                        test_fvsem_animaux_exist : test_fvsem_animaux_exist,
                                                                                        test_fvsem_fruits_exist : test_fvsem_fruits_exist,
                                                                                        test_gds_exist : test_gds_exist,
                                                                                        test_moca_exist : test_moca_exist,
                                                                                        test_d2_exist : test_d2_exist,
                                                                                        test_wais_iv_exist : test_wais_iv_exist,
                                                                                        test_zoo_exist : test_zoo_exist,
                                                                                        test_code_wais_exist : test_code_wais_exist,
                                                                                        test_npi_exist : test_npi_exist,
                                                                                        test_digital_span_exist : test_digital_span_exist,
                                                                                        test_bnt_15_exist : test_bnt_15_exist,
                                                                                        test_words_list_exist : test_words_list_exist,
                                                                                        test_stroop_victoria_2_exist : test_stroop_victoria_2_exist,
                                                                                        manageClinicians: manageClinicians                                                                                                                                                                                                    
                                                                                    });
                                                                                })
                                                                                .catch(err => res.redirect('/error'));
                                                                            })
                                                                            .catch(err => res.redirect('/error'));
                                                                        })
                                                                        .catch(err => res.redirect('/error'));
                                                                    })
                                                                    .catch(err => res.redirect('/error'));
                                                                })
                                                                .catch(err => res.redirect('/error'));
                                                            })
                                                            .catch(err => res.redirect('/error'));
                                                        })
                                                        .catch(err => res.redirect('/error'));
                                                    })
                                                    .catch(err => res.redirect('/error'));
                                                })
                                                .catch(err => res.redirect('/error'));
                                            })
                                            .catch(err => res.redirect('/error'));                                                
                                        })
                                        .catch(err => res.redirect('/error'));                                       
                                    })
                                    .catch(err => res.redirect('/error'));
                                })
                                .catch(err => res.redirect('/error'));                             
                            }                                        
                        })
                        .catch(err => res.redirect('/error'));            
                    })
                    .catch(err => res.redirect('/error'));
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getReportAllTests = (req, res, next) => {    
    if (session.checkSession(req, 2)) {        
        let IDSession = req.query.id;
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;

                    Session_Model.select_by_id(IDSession)
                    .then(([sessions]) => {
                        let IDPatient = sessions[0].id_patient;
                        let session_created_date = sessions[0].created_date;
                        let session_created_number = sessions[0].created_number;

                        Patient.selectNameByIDPatient(IDPatient)
                        .then(([patient]) => {
                            if (patient.length == 1) {                                
                                let patient_family_name = patient[0].family_name;
                                let patient_name = patient[0].name;

                                Patient.select_by_idUser(IDPatient)
                                .then(([patient]) => {
                                    if (patient.length == 1) {
                                        let id_path_folder = patient[0].id_path_folder;

                                        let fvlex_active = 0;
                                        let fvlex_path_video_p;
                                        let fvlex_p_duree;
                                        let fvlex_p_reponses;
                                        let fvlex_p_intrusions;
                                        let fvlex_p_oublis_a_mesure;
                                        let fvlex_p_erreurs;
                                        let fvlex_p_text_zone;
                                        let fvlex_path_video_r;
                                        let fvlex_r_duree;
                                        let fvlex_r_reponses;
                                        let fvlex_r_intrusions;
                                        let fvlex_r_oublis_a_mesure;
                                        let fvlex_r_erreurs;
                                        let fvlex_r_text_zone;

                                        Test_FVLex.select_report_by_idSession(IDSession)
                                        .then(([test_fvlex]) => {                                                        
                                            if (test_fvlex.length == 1) {
                                                fvlex_active = 1;
                                                fvlex_path_video_p = "";
                                                fvlex_p_duree = test_fvlex[0].p_duree;
                                                fvlex_p_reponses = test_fvlex[0].p_reponses;
                                                fvlex_p_intrusions = test_fvlex[0].p_intrusions;
                                                fvlex_p_oublis_a_mesure = test_fvlex[0].p_oublis_a_mesure;
                                                fvlex_p_erreurs = test_fvlex[0].p_erreurs;
                                                fvlex_p_text_zone = test_fvlex[0].p_text_zone;

                                                fvlex_path_video_r = "";
                                                fvlex_r_duree = test_fvlex[0].r_duree;
                                                fvlex_r_reponses = test_fvlex[0].r_reponses;
                                                fvlex_r_intrusions = test_fvlex[0].r_intrusions;
                                                fvlex_r_oublis_a_mesure = test_fvlex[0].r_oublis_a_mesure;
                                                fvlex_r_erreurs = test_fvlex[0].r_erreurs;
                                                fvlex_r_text_zone = test_fvlex[0].r_text_zone;

                                                if (test_fvlex[0].p_video == 1) {
                                                    fvlex_path_video_p = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/FVLEX/P-video_P.webm";
                                                }

                                                if (test_fvlex[0].r_video == 1) {
                                                    fvlex_path_video_r = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/FVLEX/P-video_R.webm";
                                                }
                                            }

                                            let fvsem_active = 0;
                                            let fvsem_path_video_animaux;
                                            let fvsem_animaux_duree;
                                            let fvsem_animaux_reponses;
                                            let fvsem_animaux_intrusions;
                                            let fvsem_animaux_oublis_a_mesure;
                                            let fvsem_animaux_erreurs;
                                            let fvsem_animaux_text_zone;
                                            let fvsem_path_video_fruits;
                                            let fvsem_fruits_duree;
                                            let fvsem_fruits_reponses;
                                            let fvsem_fruits_intrusions;
                                            let fvsem_fruits_oublis_a_mesure;
                                            let fvsem_fruits_erreurs;
                                            let fvsem_fruits_text_zone;

                                            Test_FVSem.select_report_by_idSession(IDSession)
                                            .then(([test_fvsem]) => {
                                                if (test_fvsem.length == 1) {
                                                    fvsem_active = 1;
                                                    fvsem_path_video_animaux = "";
                                                    fvsem_animaux_duree = test_fvsem[0].animaux_duree;
                                                    fvsem_animaux_reponses = test_fvsem[0].animaux_reponses;
                                                    fvsem_animaux_intrusions = test_fvsem[0].animaux_intrusions;
                                                    fvsem_animaux_oublis_a_mesure = test_fvsem[0].animaux_oublis_a_mesure;
                                                    fvsem_animaux_erreurs = test_fvsem[0].animaux_erreurs;
                                                    fvsem_animaux_text_zone = test_fvsem[0].animaux_text_zone;

                                                    fvsem_path_video_fruits = "";
                                                    fvsem_fruits_duree = test_fvsem[0].fruits_duree;
                                                    fvsem_fruits_reponses = test_fvsem[0].fruits_reponses;
                                                    fvsem_fruits_intrusions = test_fvsem[0].fruits_intrusions;
                                                    fvsem_fruits_oublis_a_mesure = test_fvsem[0].fruits_oublis_a_mesure;
                                                    fvsem_fruits_erreurs = test_fvsem[0].fruits_erreurs;
                                                    fvsem_fruits_text_zone = test_fvsem[0].fruits_text_zone;

                                                    if (test_fvsem[0].animaux_video == 1) {
                                                        fvsem_path_video_animaux = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/FVSEM/P-video_Animaux.webm";
                                                    }

                                                    if (test_fvsem[0].fruits_video == 1) {
                                                        fvsem_path_video_fruits = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/FVSEM/P-video_Fruits.webm";
                                                    }                                                                
                                                } 

                                                let GDS_active = 0;
                                                let GDS_Score = 0;
                                                let GDS_commentaires = "";

                                                Test_GDS.select_report_by_idSession(IDSession)
                                                .then(([test_gds]) => {
                                                    if (test_gds.length == 1) {
                                                        GDS_active = 1;
                                                        GDS_Score = test_gds[0].score;
                                                        GDS_commentaires = test_gds[0].commentaires;
                                                    }

                                                    let moca_active = 0;
                                                    let moca_path_video = "";
                                                    let moca_textResult1 = "";
                                                    let moca_textResult2 = "";
                                                    let moca_textResult3 = "";
                                                    let moca_textResult4 = "";
                                                    let moca_textResult5 = "";
                                                    let moca_textResult6 = "";
                                                    let moca_textResult7 = "";
                                                    let moca_textResult8 = "";
                                                    let moca_textResult9 = "";
                                                    let moca_remarques = "";

                                                    Test_MOCA.select_report_by_idSession(IDSession)
                                                    .then(([test_moca]) => {
                                                        if (test_moca.length == 1) {
                                                            moca_active = 1;

                                                            let a = test_moca[0].a;
                                                            let b = test_moca[0].b;
                                                            let c = test_moca[0].c;
                                                            let d = test_moca[0].d;
                                                            let e = test_moca[0].e;
                                                            let f = test_moca[0].f;
                                                            let g = test_moca[0].g;
                                                            let h = test_moca[0].h;
                                                            let i = test_moca[0].i;
                                                            let j = test_moca[0].j;
                                                            let k = test_moca[0].k;
                                                            let l = test_moca[0].l;
                                                            let m = test_moca[0].m;
                                                            let n = test_moca[0].n;
                                                            let o = test_moca[0].o;
                                                            let p = test_moca[0].p;
                                                            let q = test_moca[0].q;
                                                            let F1 = test_moca[0].F1;
                                                            let F2 = test_moca[0].F2;
                                                            let F3 = test_moca[0].F3;
                                                            let date = test_moca[0].date;
                                                            let mois = test_moca[0].mois;
                                                            let annee = test_moca[0].annee;
                                                            let jour = test_moca[0].jour;
                                                            let endroit = test_moca[0].endroit;
                                                            let ville = test_moca[0].ville;

                                                            let A = a + b + c + d + e;
                                                            let B = f + g + h;
                                                            let C = i + j + k + l;
                                                            let D = m + n + o;
                                                            let E = p + q;
                                                            let G = F2 + F3;
                                                            let H = date + mois + annee + jour + endroit + ville;

                                                            let total = A + B + C + D + E + F1 + H;

                                                            moca_textResult1 = "Visuospatial / exécutif: [" + a + ", " + b + ", " + c + ", " + d + ", " + e + "] - " + A + "/5";
                                                            moca_textResult2 = "Dénomination: [" + f + ", " + g + ", " + h + "] - " + B + "/3";
                                                            moca_textResult3 = "Attention: [" + i + ", " + j + ", " + k + ", " + l + "] - " + C + "/6";
                                                            moca_textResult4 = "Langage: [" + m + ", " + n + ", " + o + "] - " + D + "/3";
                                                            moca_textResult5 = "Abstraction: [" + p + ", " + q + "] - " + E + "/2";
                                                            moca_textResult6 = "Rappel sans indices: " + F1 + "/5";
                                                            moca_textResult7 = F1 == 5 ? "Rappel différé: n/a" : "Rappel différé: [" + F2 + ", " + F3 + "] - " + G + "/5";
                                                            moca_textResult8 = "Orientation: [" + date + ", " + mois + ", " + annee + ", " + jour + ", " + endroit + ", " + ville + "] - " + H + "/5";
                                                            moca_textResult9 = "TOTAL: " + total + "/30";

                                                            moca_remarques = test_moca[0].remarques;

                                                            if (test_moca[0].record_video == 1) {
                                                                moca_path_video = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/MOCA/video.webm";
                                                            } 
                                                        }
                                                    
                                                        let d2_active = 0;
                                                        let d2_path_video = "";
                                                        let d2_test_time = "";

                                                        Test_D2.select_report_by_idSession(IDSession)
                                                        .then(([test_d2]) => {
                                                            if (test_d2.length == 1) {
                                                                d2_active = 1;

                                                                let seconds = test_d2[0].test_time;
                                                                let minutes = parseInt(seconds / 60);
                                                                seconds = seconds % 60;
                                                                d2_test_time = minutes != 0 ? "Temps: " + minutes + " minutes " + seconds + " secondes" : "Temps: " + seconds + " secondes";
                                                                
                                                                if (test_d2[0].record_video == 1) {
                                                                    d2_path_video = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/D2/video.webm";
                                                                } 
                                                            }  

                                                            let wais_iv_active = 0;
                                                            let wais_iv_path_video = "";
                                                            let wais_iv_score = 0;
                                                            let wais_iv_eslc = 0;

                                                            Test_WAIS_IV.select_report_by_idSession(IDSession)
                                                            .then(([test_wais_iv]) => {
                                                                if (test_wais_iv.length == 1) {
                                                                    wais_iv_active = 1;

                                                                    wais_iv_score = test_wais_iv[0].score;
                                                                    wais_iv_eslc = test_wais_iv[0].eslc;

                                                                    if (test_wais_iv[0].record_video == 1) {
                                                                        wais_iv_path_video = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/WAIS_IV/video.webm";
                                                                    }
                                                                }

                                                                let zoo_active = 0;
                                                                let zoo_path_video = "";

                                                                Test_Zoo.select_report_by_idSession(IDSession)
                                                                .then(([test_zoo]) => {
                                                                    if (test_zoo.length == 1) {
                                                                        zoo_active = 1;

                                                                        if (test_zoo[0].record_video == 1) {
                                                                            zoo_path_video = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/Zoo/video.webm";
                                                                        }
                                                                    }

                                                                    let code_wais_active = 0;
                                                                    let code_wais_path_video = "";

                                                                    Test_Code_WAIS.select_report_by_idSession(IDSession)
                                                                    .then(([test_code_wais]) => {
                                                                        if (test_code_wais.length == 1) {
                                                                            code_wais_active = 1;

                                                                            if (test_code_wais[0].record_video == 1) {
                                                                                code_wais_path_video = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/Code_WAIS/video.webm";
                                                                            }
                                                                        }

                                                                        let npi_active = 0;
                                                                        let npi_path_video = "";
                                                                        let npi_F1, npi_G1, npi_R1, npi_FG1;
                                                                        let npi_F2, npi_G2, npi_R2, npi_FG2;
                                                                        let npi_F3, npi_G3, npi_R3, npi_FG3;
                                                                        let npi_F4, npi_G4, npi_R4, npi_FG4;
                                                                        let npi_F5, npi_G5, npi_R5, npi_FG5;
                                                                        let npi_F6, npi_G6, npi_R6, npi_FG6;
                                                                        let npi_F7, npi_G7, npi_R7, npi_FG7;
                                                                        let npi_F8, npi_G8, npi_R8, npi_FG8;
                                                                        let npi_F9, npi_G9, npi_R9, npi_FG9;
                                                                        let npi_F10, npi_G10, npi_R10, npi_FG10;
                                                                        let npi_F11, npi_G11, npi_R11, npi_FG11;
                                                                        let npi_F12, npi_G12, npi_R12, npi_FG12;                                                                                                                                    
                                                                        let npi_sumFG = 0, npi_sumF = 0, npi_sumG = 0, npi_sumR = 0;
                                                                        let npi_commentaires = "";

                                                                        Test_NPI.select_report_by_idSession(IDSession)
                                                                        .then(([test_npi]) => {
                                                                            if (test_npi.length == 1) {
                                                                                npi_active = 1;

                                                                                npi_F1 = test_npi[0].F1 == -1 ? "N/A" : test_npi[0].F1;
                                                                                npi_G1 = test_npi[0].G1 == -1 ? "N/A" : test_npi[0].G1;
                                                                                npi_R1 = test_npi[0].R1 == -1 ? "N/A" : test_npi[0].R1;
                                                                                npi_FG1 = npi_F1 == "N/A" ? npi_F1 : npi_F1 * npi_G1;
                                                                                if (npi_F1 != "N/A") {
                                                                                    npi_sumFG += npi_FG1; npi_sumF += npi_F1; npi_sumG += npi_G1; npi_sumR += npi_R1;
                                                                                }

                                                                                npi_F2 = test_npi[0].F2 == -1 ? "N/A" : test_npi[0].F2;
                                                                                npi_G2 = test_npi[0].G2 == -1 ? "N/A" : test_npi[0].G2;
                                                                                npi_R2 = test_npi[0].R2 == -1 ? "N/A" : test_npi[0].R2;
                                                                                npi_FG2 = npi_F2 == "N/A" ? npi_F2 : npi_F2 * npi_G2;
                                                                                if (npi_F2 != "N/A") {
                                                                                    npi_sumFG += npi_FG2; npi_sumF += npi_F2; npi_sumG += npi_G2; npi_sumR += npi_R2;
                                                                                }

                                                                                npi_F3 = test_npi[0].F3 == -1 ? "N/A" : test_npi[0].F3;
                                                                                npi_G3 = test_npi[0].G3 == -1 ? "N/A" : test_npi[0].G3;
                                                                                npi_R3 = test_npi[0].R3 == -1 ? "N/A" : test_npi[0].R3;
                                                                                npi_FG3 = npi_F3 == "N/A" ? npi_F3 : npi_F3 * npi_G3;
                                                                                if (npi_F3 != "N/A") {
                                                                                    npi_sumFG += npi_FG3; npi_sumF += npi_F3; npi_sumG += npi_G3; npi_sumR += npi_R3;
                                                                                }

                                                                                npi_F4 = test_npi[0].F4 == -1 ? "N/A" : test_npi[0].F4;
                                                                                npi_G4 = test_npi[0].G4 == -1 ? "N/A" : test_npi[0].G4;
                                                                                npi_R4 = test_npi[0].R4 == -1 ? "N/A" : test_npi[0].R4;
                                                                                npi_FG4 = npi_F4 == "N/A" ? npi_F4 : npi_F4 * npi_G4;
                                                                                if (npi_F4 != "N/A") {
                                                                                    npi_sumFG += npi_FG4; npi_sumF += npi_F4; npi_sumG += npi_G4; npi_sumR += npi_R4;
                                                                                }

                                                                                npi_F5 = test_npi[0].F5 == -1 ? "N/A" : test_npi[0].F5;
                                                                                npi_G5 = test_npi[0].G5 == -1 ? "N/A" : test_npi[0].G5;
                                                                                npi_R5 = test_npi[0].R5 == -1 ? "N/A" : test_npi[0].R5;
                                                                                npi_FG5 = npi_F5 == "N/A" ? npi_F5 : npi_F5 * npi_G5;
                                                                                if (npi_F5 != "N/A") {
                                                                                    npi_sumFG += npi_FG5; npi_sumF += npi_F5; npi_sumG += npi_G5; npi_sumR += npi_R5;
                                                                                }

                                                                                npi_F6 = test_npi[0].F6 == -1 ? "N/A" : test_npi[0].F6;
                                                                                npi_G6 = test_npi[0].G6 == -1 ? "N/A" : test_npi[0].G6;
                                                                                npi_R6 = test_npi[0].R6 == -1 ? "N/A" : test_npi[0].R6;
                                                                                npi_FG6 = npi_F6 == "N/A" ? npi_F6 : npi_F6 * npi_G6;
                                                                                if (npi_F6 != "N/A") {
                                                                                    npi_sumFG += npi_FG6; npi_sumF += npi_F6; npi_sumG += npi_G6; npi_sumR += npi_R6;
                                                                                }

                                                                                npi_F7 = test_npi[0].F7 == -1 ? "N/A" : test_npi[0].F7;
                                                                                npi_G7 = test_npi[0].G7 == -1 ? "N/A" : test_npi[0].G7;
                                                                                npi_R7 = test_npi[0].R7 == -1 ? "N/A" : test_npi[0].R7;
                                                                                npi_FG7 = npi_F7 == "N/A" ? npi_F7 : npi_F7 * npi_G7;
                                                                                if (npi_F7 != "N/A") {
                                                                                    npi_sumFG += npi_FG7; npi_sumF += npi_F7; npi_sumG += npi_G7; npi_sumR += npi_R7;
                                                                                }

                                                                                npi_F8 = test_npi[0].F8 == -1 ? "N/A" : test_npi[0].F8;
                                                                                npi_G8 = test_npi[0].G8 == -1 ? "N/A" : test_npi[0].G8;
                                                                                npi_R8 = test_npi[0].R8 == -1 ? "N/A" : test_npi[0].R8;
                                                                                npi_FG8 = npi_F8 == "N/A" ? npi_F8 : npi_F8 * npi_G8;
                                                                                if (npi_F8 != "N/A") {
                                                                                    npi_sumFG += npi_FG8; npi_sumF += npi_F8; npi_sumG += npi_G8; npi_sumR += npi_R8;
                                                                                }

                                                                                npi_F9 = test_npi[0].F9 == -1 ? "N/A" : test_npi[0].F9;
                                                                                npi_G9 = test_npi[0].G9 == -1 ? "N/A" : test_npi[0].G9;
                                                                                npi_R9 = test_npi[0].R9 == -1 ? "N/A" : test_npi[0].R9;
                                                                                npi_FG9 = npi_F9 == "N/A" ? npi_F9 : npi_F9 * npi_G9;
                                                                                if (npi_F9 != "N/A") {
                                                                                    npi_sumFG += npi_FG9; npi_sumF += npi_F9; npi_sumG += npi_G9; npi_sumR += npi_R9;
                                                                                }

                                                                                npi_F10 = test_npi[0].F10 == -1 ? "N/A" : test_npi[0].F10;
                                                                                npi_G10 = test_npi[0].G10 == -1 ? "N/A" : test_npi[0].G10;
                                                                                npi_R10 = test_npi[0].R10 == -1 ? "N/A" : test_npi[0].R10;
                                                                                npi_FG10 = npi_F10 == "N/A" ? npi_F10 : npi_F10 * npi_G10;
                                                                                if (npi_F10 != "N/A") {
                                                                                    npi_sumFG += npi_FG10; npi_sumF += npi_F10; npi_sumG += npi_G10; npi_sumR += npi_R10;
                                                                                }

                                                                                npi_F11 = test_npi[0].F11 == -1 ? "N/A" : test_npi[0].F11;
                                                                                npi_G11 = test_npi[0].G11 == -1 ? "N/A" : test_npi[0].G11;
                                                                                npi_R11 = test_npi[0].R11 == -1 ? "N/A" : test_npi[0].R11;
                                                                                npi_FG11 = npi_F11 == "N/A" ? npi_F11 : npi_F11 * npi_G11;
                                                                                if (npi_F11 != "N/A") {
                                                                                    npi_sumFG += npi_FG11; npi_sumF += npi_F11; npi_sumG += npi_G11; npi_sumR += npi_R11;
                                                                                }

                                                                                npi_F12 = test_npi[0].F12 == -1 ? "N/A" : test_npi[0].F12;
                                                                                npi_G12 = test_npi[0].G12 == -1 ? "N/A" : test_npi[0].G12;
                                                                                npi_R12 = test_npi[0].R12 == -1 ? "N/A" : test_npi[0].R12;
                                                                                npi_FG12 = npi_F12 == "N/A" ? npi_F12 : npi_F12 * npi_G12;
                                                                                if (npi_F12 != "N/A") {
                                                                                    npi_sumFG += npi_FG12; npi_sumF += npi_F12; npi_sumG += npi_G12; npi_sumR += npi_R12;
                                                                                }

                                                                                npi_commentaires = test_npi[0].commentaires;
                                                                                
                                                                                if (test_npi[0].record_video == 1) {
                                                                                    npi_path_video = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/NPI/video.webm";
                                                                                }                                                              
                                                                            }

                                                                            let digital_span_active = 0;
                                                                            let digital_span_path_audio = "";
                                                                            let digital_span_vor, digital_span_ruc;

                                                                            Test_Digital_Span.select_report_by_idSession(IDSession)
                                                                            .then(([test_digital_span]) => {
                                                                                if (test_digital_span.length == 1) {
                                                                                    digital_span_active = 1;

                                                                                    digital_span_vor = test_digital_span[0].vor;
                                                                                    digital_span_ruc = test_digital_span[0].ruc;

                                                                                    if (test_digital_span[0].record_audio == 1) {
                                                                                        digital_span_path_audio = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/Digital_Span/audio.webm";
                                                                                    }
                                                                                }

                                                                                let bnt_15_active = 0;
                                                                                let bnt_15_path_video = "";
                                                                                let bnt_15_haufig, bnt_15_mittel, bnt_15_selten, bnt_15_total;
                                                                                let bnt_15_baum, bnt_15_bett, bnt_15_pfeife;
                                                                                let bnt_15_blume, bnt_15_haus, bnt_15_kanu, bnt_15_zahnburste;
                                                                                let bnt_15_vulkan, bnt_15_maske, bnt_15_kamel;
                                                                                let bnt_15_mundharmonika, bnt_15_zange, bnt_15_hangematte;
                                                                                let bnt_15_trichter, bnt_15_dominosteine;

                                                                                Test_BNT_15.select_report_by_idSession(IDSession)
                                                                                .then(([test_bnt_15]) => {
                                                                                    if (test_bnt_15.length == 1) {
                                                                                        bnt_15_active = 1;

                                                                                        bnt_15_haufig = test_bnt_15[0].haufig;
                                                                                        bnt_15_mittel = test_bnt_15[0].mittel;
                                                                                        bnt_15_selten = test_bnt_15[0].selten;
                                                                                        bnt_15_total = bnt_15_haufig + bnt_15_mittel + bnt_15_selten;
                                                                                        bnt_15_baum = test_bnt_15[0].baum;
                                                                                        bnt_15_bett = test_bnt_15[0].bett;
                                                                                        bnt_15_pfeife = test_bnt_15[0].pfeife;
                                                                                        bnt_15_blume = test_bnt_15[0].blume;
                                                                                        bnt_15_haus = test_bnt_15[0].haus;
                                                                                        bnt_15_kanu = test_bnt_15[0].kanu;
                                                                                        bnt_15_zahnburste = test_bnt_15[0].zahnburste;
                                                                                        bnt_15_vulkan = test_bnt_15[0].vulkan;
                                                                                        bnt_15_maske = test_bnt_15[0].maske;
                                                                                        bnt_15_kamel = test_bnt_15[0].kamel;
                                                                                        bnt_15_mundharmonika = test_bnt_15[0].mundharmonika;
                                                                                        bnt_15_zange = test_bnt_15[0].zange;
                                                                                        bnt_15_hangematte = test_bnt_15[0].hangematte;
                                                                                        bnt_15_trichter = test_bnt_15[0].trichter;
                                                                                        bnt_15_dominosteine = test_bnt_15[0].dominosteine;

                                                                                        if (test_bnt_15[0].record_video == 1) {
                                                                                            bnt_15_path_video = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/BNT_15/video.webm";
                                                                                        }
                                                                                    }

                                                                                    let words_list_active = 0;
                                                                                    let words_list_path_video = "";
                                                                                    let words_list_knl_1, words_list_wortliste_knl_1, words_list_lernen_1;
                                                                                    let words_list_rew_list_1, words_list_lernen_1_int, words_list_lernen_1_int_text;
                                                                                    let words_list_knl_2, words_list_wortliste_knl_2, words_list_lernen_2;
                                                                                    let words_list_rew_list_2, words_list_lernen_2_int, words_list_lernen_2_int_text;
                                                                                    let words_list_knl_3, words_list_wortliste_knl_3, words_list_lernen_3;
                                                                                    let words_list_rew_list_3, words_list_lernen_3_int, words_list_lernen_3_int_text;
                                                                                    let words_list_fiabz;
                                                                                    let words_list_abrufen, words_list_rew_list_abrufen;
                                                                                    let words_list_abrufen_int, words_list_abrufen_int_text;
                                                                                    let words_list_butter, words_list_arm, words_list_strand;
                                                                                    let words_list_brief, words_list_konigin, words_list_hutte;
                                                                                    let words_list_stange, words_list_karte, words_list_gras, words_list_motor;
                                                                                    let words_list_r_ja, words_list_r_ja_list, words_list_r_nein, words_list_r_nein_list; 
                                                                                    let words_list_f_ja, words_list_f_ja_list, words_list_f_nein, words_list_f_nein_list;

                                                                                    Test_Words_List.select_report_by_idSession(IDSession)
                                                                                    .then(([test_words_list]) => {
                                                                                        if (test_words_list.length == 1) {
                                                                                            words_list_active = 1;

                                                                                            words_list_knl_1 = test_words_list[0].knl_1;
                                                                                            words_list_wortliste_knl_1 = test_words_list[0].wortliste_knl_1;
                                                                                            words_list_lernen_1 = test_words_list[0].lernen_1;
                                                                                            words_list_rew_list_1 = test_words_list[0].rew_list_1;
                                                                                            words_list_lernen_1_int = test_words_list[0].lernen_1_int;
                                                                                            words_list_lernen_1_int_text = test_words_list[0].lernen_1_int_text;
                                                                                            words_list_knl_2 = test_words_list[0].knl_2;
                                                                                            words_list_wortliste_knl_2 = test_words_list[0].wortliste_knl_2;
                                                                                            words_list_lernen_2 = test_words_list[0].lernen_2;
                                                                                            words_list_rew_list_2 = test_words_list[0].rew_list_2;
                                                                                            words_list_lernen_2_int = test_words_list[0].lernen_2_int;
                                                                                            words_list_lernen_2_int_text = test_words_list[0].lernen_2_int_text;
                                                                                            words_list_knl_3 = test_words_list[0].knl_3;
                                                                                            words_list_wortliste_knl_3 = test_words_list[0].wortliste_knl_3;
                                                                                            words_list_lernen_3 = test_words_list[0].lernen_3;
                                                                                            words_list_rew_list_3 = test_words_list[0].rew_list_3;
                                                                                            words_list_lernen_3_int = test_words_list[0].lernen_3_int;
                                                                                            words_list_lernen_3_int_text = test_words_list[0].lernen_3_int_text;
                                                                                            words_list_fiabz = test_words_list[0].fiabz;
                                                                                            words_list_abrufen = test_words_list[0].abrufen;
                                                                                            words_list_rew_list_abrufen = test_words_list[0].rew_list_abrufen;
                                                                                            words_list_abrufen_int = test_words_list[0].abrufen_int;
                                                                                            words_list_abrufen_int_text = test_words_list[0].abrufen_int_text;
                                                                                            words_list_butter = test_words_list[0].butter;
                                                                                            words_list_arm = test_words_list[0].arm;
                                                                                            words_list_strand = test_words_list[0].strand;
                                                                                            words_list_brief = test_words_list[0].brief;
                                                                                            words_list_konigin = test_words_list[0].konigin;
                                                                                            words_list_hutte = test_words_list[0].hutte;
                                                                                            words_list_stange = test_words_list[0].stange;
                                                                                            words_list_karte = test_words_list[0].karte;
                                                                                            words_list_gras = test_words_list[0].gras;
                                                                                            words_list_motor = test_words_list[0].motor;
                                                                                            words_list_r_ja = test_words_list[0].r_ja;
                                                                                            words_list_r_ja_list = test_words_list[0].r_ja_list;
                                                                                            words_list_r_nein = test_words_list[0].r_nein;
                                                                                            words_list_r_nein_list = test_words_list[0].r_nein_list;
                                                                                            words_list_f_ja = test_words_list[0].f_ja;
                                                                                            words_list_f_ja_list = test_words_list[0].f_ja_list;
                                                                                            words_list_f_nein = test_words_list[0].f_nein;
                                                                                            words_list_f_nein_list = test_words_list[0].f_nein_list;

                                                                                            if (test_words_list[0].record_video == 1) {
                                                                                                words_list_path_video = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/Words_List/video.webm";
                                                                                            }
                                                                                        }

                                                                                        let stroop_victoria_2_active = 0;
                                                                                        let stroop_victoria_2_path_audio_1;
                                                                                        let stroop_victoria_2_path_audio_2;
                                                                                        let stroop_victoria_2_path_audio_3;
                                                                                        let stroop_victoria_2_duree_1;
                                                                                        let stroop_victoria_2_nombre_d_erreurs_1;
                                                                                        let stroop_victoria_2_nombre_d_erreurs_corrigees_1;
                                                                                        let stroop_victoria_2_duree_2;
                                                                                        let stroop_victoria_2_nombre_d_erreurs_2;
                                                                                        let stroop_victoria_2_nombre_d_erreurs_corrigees_2;
                                                                                        let stroop_victoria_2_duree_3;
                                                                                        let stroop_victoria_2_nombre_d_erreurs_3;
                                                                                        let stroop_victoria_2_nombre_d_erreurs_corrigees_3;

                                                                                        Test_Stroop_Victoria_2.select_report_by_idSession(IDSession)
                                                                                        .then(([test_stroop_victoria_2]) => {
                                                                                            if (test_stroop_victoria_2.length == 1) {
                                                                                                stroop_victoria_2_active = 1;
                                                                                                stroop_victoria_2_path_audio_1 = "";
                                                                                                stroop_victoria_2_path_audio_2 = "";
                                                                                                stroop_victoria_2_path_audio_3 = "";

                                                                                                stroop_victoria_2_duree_1 = test_stroop_victoria_2[0].x_1;
                                                                                                stroop_victoria_2_nombre_d_erreurs_1 = test_stroop_victoria_2[0].y_1;
                                                                                                stroop_victoria_2_nombre_d_erreurs_corrigees_1 = test_stroop_victoria_2[0].z_1;
                                                                                                stroop_victoria_2_duree_2 = test_stroop_victoria_2[0].x_2;
                                                                                                stroop_victoria_2_nombre_d_erreurs_2 = test_stroop_victoria_2[0].y_2;
                                                                                                stroop_victoria_2_nombre_d_erreurs_corrigees_2 = test_stroop_victoria_2[0].z_2;
                                                                                                stroop_victoria_2_duree_3 = test_stroop_victoria_2[0].x_3;
                                                                                                stroop_victoria_2_nombre_d_erreurs_3 = test_stroop_victoria_2[0].y_3;
                                                                                                stroop_victoria_2_nombre_d_erreurs_corrigees_3 = test_stroop_victoria_2[0].z_3;

                                                                                                if (test_stroop_victoria_2[0].audio_1 == 1) {
                                                                                                    stroop_victoria_2_path_audio_1 = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/Stroop_Victoria_2/audio1.webm";
                                                                                                }

                                                                                                if (test_stroop_victoria_2[0].audio_2 == 1) {
                                                                                                    stroop_victoria_2_path_audio_2 = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/Stroop_Victoria_2/audio2.webm";
                                                                                                }

                                                                                                if (test_stroop_victoria_2[0].audio_3 == 1) {
                                                                                                    stroop_victoria_2_path_audio_3 = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/Stroop_Victoria_2/audio3.webm";
                                                                                                }
                                                                                            }

                                                                                            res.render('clinician/reports/report-all-tests', {                                        
                                                                                                pageTitle : 'Report all tests',
                                                                                                path : '',
                                                                                                patient_name : patient_name,
                                                                                                patient_family_name : patient_family_name,
                                                                                                id_session : IDSession,
                                                                                                session_created_date : session_created_date,                                                                                   
                                                                                                
                                                                                                fvlex_active : fvlex_active,
                                                                                                fvlex_path_video_p : fvlex_path_video_p,
                                                                                                fvlex_p_duree : fvlex_p_duree,
                                                                                                fvlex_p_reponses : fvlex_p_reponses,
                                                                                                fvlex_p_intrusions : fvlex_p_intrusions,
                                                                                                fvlex_p_oublis_a_mesure : fvlex_p_oublis_a_mesure,
                                                                                                fvlex_p_erreurs : fvlex_p_erreurs,
                                                                                                fvlex_p_text_zone : fvlex_p_text_zone,
                                                                                                fvlex_path_video_r : fvlex_path_video_r,
                                                                                                fvlex_r_duree : fvlex_r_duree,
                                                                                                fvlex_r_reponses : fvlex_r_reponses,
                                                                                                fvlex_r_intrusions : fvlex_r_intrusions,
                                                                                                fvlex_r_oublis_a_mesure : fvlex_r_oublis_a_mesure,
                                                                                                fvlex_r_erreurs : fvlex_r_erreurs,
                                                                                                fvlex_r_text_zone : fvlex_r_text_zone,
                                    
                                                                                                fvsem_active : fvsem_active,
                                                                                                fvsem_path_video_animaux : fvsem_path_video_animaux,
                                                                                                fvsem_animaux_duree : fvsem_animaux_duree,
                                                                                                fvsem_animaux_reponses : fvsem_animaux_reponses,
                                                                                                fvsem_animaux_intrusions : fvsem_animaux_intrusions,
                                                                                                fvsem_animaux_oublis_a_mesure : fvsem_animaux_oublis_a_mesure,
                                                                                                fvsem_animaux_erreurs : fvsem_animaux_erreurs,
                                                                                                fvsem_animaux_text_zone : fvsem_animaux_text_zone,
                                                                                                fvsem_path_video_fruits : fvsem_path_video_fruits,
                                                                                                fvsem_fruits_duree : fvsem_fruits_duree,
                                                                                                fvsem_fruits_reponses : fvsem_fruits_reponses,
                                                                                                fvsem_fruits_intrusions : fvsem_fruits_intrusions,
                                                                                                fvsem_fruits_oublis_a_mesure : fvsem_fruits_oublis_a_mesure,
                                                                                                fvsem_fruits_erreurs : fvsem_fruits_erreurs,
                                                                                                fvsem_fruits_text_zone : fvsem_fruits_text_zone,
                                
                                                                                                fivemots_active : fivemots_active,
                                                                                                fivemots_path_audio_1 : fivemots_path_audio_1,
                                                                                                fivemots_path_audio_2 : fivemots_path_audio_2,
                                                                                                fivemots_list_choice : fivemots_list_choice,
                                                                                                fivemots_score_total : fivemots_score_total,
                                                                                                fivemots_Ri : fivemots_Ri,
                                                                                                fivemots_Ri1 : fivemots_Ri1,
                                                                                                fivemots_Ri2 : fivemots_Ri2,
                                                                                                fivemots_Rd : fivemots_Rd,                                                                                                                                
                                                                                                fivemots_Rd1 : fivemots_Rd1,
                                                                                                fivemots_rappel_immediat : fivemots_rappel_immediat,
                                                                                                fivemots_rappel_differe : fivemots_rappel_differe,

                                                                                                GDS_active : GDS_active,
                                                                                                GDS_Score : GDS_Score,
                                                                                                GDS_commentaires : GDS_commentaires,
                                                                                                
                                                                                                moca_active : moca_active,
                                                                                                moca_path_video : moca_path_video,
                                                                                                moca_textResult1 : moca_textResult1,
                                                                                                moca_textResult2 : moca_textResult2,
                                                                                                moca_textResult3 : moca_textResult3,
                                                                                                moca_textResult4 : moca_textResult4,
                                                                                                moca_textResult5 : moca_textResult5,
                                                                                                moca_textResult6 : moca_textResult6,
                                                                                                moca_textResult7 : moca_textResult7,
                                                                                                moca_textResult8 : moca_textResult8,
                                                                                                moca_textResult9 : moca_textResult9,
                                                                                                moca_remarques : moca_remarques,
                                                                                                
                                                                                                d2_active : d2_active,
                                                                                                d2_path_video : d2_path_video,
                                                                                                d2_test_time : d2_test_time,
                                                                                                
                                                                                                wais_iv_active : wais_iv_active,
                                                                                                wais_iv_path_video : wais_iv_path_video,
                                                                                                wais_iv_score : wais_iv_score,
                                                                                                wais_iv_eslc : wais_iv_eslc,
                                                                                                
                                                                                                zoo_active : zoo_active,
                                                                                                zoo_path_video : zoo_path_video,

                                                                                                code_wais_active : code_wais_active,
                                                                                                code_wais_path_video : code_wais_path_video,
                                                                                                
                                                                                                npi_active : npi_active,
                                                                                                npi_path_video : npi_path_video,
                                                                                                npi_FG1 : npi_FG1,
                                                                                                npi_F1 : npi_F1,
                                                                                                npi_G1 : npi_G1,
                                                                                                npi_R1 : npi_R1,
                                                                                                npi_FG2 : npi_FG2,
                                                                                                npi_F2 : npi_F2,
                                                                                                npi_G2 : npi_G2,
                                                                                                npi_R2 : npi_R2,
                                                                                                npi_FG3 : npi_FG3,
                                                                                                npi_F3 : npi_F3,
                                                                                                npi_G3 : npi_G3,
                                                                                                npi_R3 : npi_R3,
                                                                                                npi_FG4 : npi_FG4,
                                                                                                npi_F4 : npi_F4,
                                                                                                npi_G4 : npi_G4,
                                                                                                npi_R4 : npi_R4,
                                                                                                npi_FG5 : npi_FG5,
                                                                                                npi_F5 : npi_F5,
                                                                                                npi_G5 : npi_G5,
                                                                                                npi_R5 : npi_R5,
                                                                                                npi_FG6 : npi_FG6,
                                                                                                npi_F6 : npi_F6,
                                                                                                npi_G6 : npi_G6,
                                                                                                npi_R6 : npi_R6,
                                                                                                npi_FG7 : npi_FG7,
                                                                                                npi_F7 : npi_F7,
                                                                                                npi_G7 : npi_G7,
                                                                                                npi_R7 : npi_R7,
                                                                                                npi_FG8 : npi_FG8,
                                                                                                npi_F8 : npi_F8,
                                                                                                npi_G8 : npi_G8,
                                                                                                npi_R8 : npi_R8,
                                                                                                npi_FG9 : npi_FG9,
                                                                                                npi_F9 : npi_F9,
                                                                                                npi_G9 : npi_G9,
                                                                                                npi_R9 : npi_R9,
                                                                                                npi_FG10 : npi_FG10,
                                                                                                npi_F10 : npi_F10,
                                                                                                npi_G10 : npi_G10,
                                                                                                npi_R10 : npi_R10,
                                                                                                npi_FG11 : npi_FG11,
                                                                                                npi_F11 : npi_F11,
                                                                                                npi_G11 : npi_G11,
                                                                                                npi_R11 : npi_R11,
                                                                                                npi_FG12 : npi_FG12,
                                                                                                npi_F12 : npi_F12,
                                                                                                npi_G12 : npi_G12,
                                                                                                npi_R12 : npi_R12,
                                                                                                npi_sumFG : npi_sumFG,
                                                                                                npi_sumF : npi_sumF,
                                                                                                npi_sumG : npi_sumG,
                                                                                                npi_sumR : npi_sumR,
                                                                                                npi_commentaires : npi_commentaires,

                                                                                                digital_span_active : digital_span_active,
                                                                                                digital_span_path_audio : digital_span_path_audio,
                                                                                                digital_span_vor : digital_span_vor,
                                                                                                digital_span_ruc : digital_span_ruc,

                                                                                                bnt_15_active : bnt_15_active,
                                                                                                bnt_15_path_video : bnt_15_path_video,
                                                                                                bnt_15_haufig : bnt_15_haufig,
                                                                                                bnt_15_mittel : bnt_15_mittel,
                                                                                                bnt_15_selten : bnt_15_selten,
                                                                                                bnt_15_total : bnt_15_total,
                                                                                                bnt_15_baum : bnt_15_baum,
                                                                                                bnt_15_bett : bnt_15_bett,
                                                                                                bnt_15_pfeife : bnt_15_pfeife,
                                                                                                bnt_15_blume : bnt_15_blume,
                                                                                                bnt_15_haus : bnt_15_haus,
                                                                                                bnt_15_kanu : bnt_15_kanu,
                                                                                                bnt_15_zahnburste : bnt_15_zahnburste,
                                                                                                bnt_15_vulkan : bnt_15_vulkan,
                                                                                                bnt_15_maske : bnt_15_maske,
                                                                                                bnt_15_kamel : bnt_15_kamel,
                                                                                                bnt_15_mundharmonika : bnt_15_mundharmonika,
                                                                                                bnt_15_zange : bnt_15_zange,
                                                                                                bnt_15_hangematte : bnt_15_hangematte,
                                                                                                bnt_15_trichter : bnt_15_trichter,
                                                                                                bnt_15_dominosteine : bnt_15_dominosteine,

                                                                                                words_list_active : words_list_active,
                                                                                                words_list_path_video : words_list_path_video,
                                                                                                words_list_knl_1 : words_list_knl_1,
                                                                                                words_list_wortliste_knl_1 : words_list_wortliste_knl_1,
                                                                                                words_list_lernen_1 : words_list_lernen_1,
                                                                                                words_list_rew_list_1 : words_list_rew_list_1,
                                                                                                words_list_lernen_1_int : words_list_lernen_1_int,
                                                                                                words_list_lernen_1_int_text : words_list_lernen_1_int_text,
                                                                                                words_list_knl_2 : words_list_knl_2,
                                                                                                words_list_wortliste_knl_2 : words_list_wortliste_knl_2,
                                                                                                words_list_lernen_2 : words_list_lernen_2,
                                                                                                words_list_rew_list_2 : words_list_rew_list_2,
                                                                                                words_list_lernen_2_int : words_list_lernen_2_int,
                                                                                                words_list_lernen_2_int_text : words_list_lernen_2_int_text,
                                                                                                words_list_knl_3 : words_list_knl_3,
                                                                                                words_list_wortliste_knl_3 : words_list_wortliste_knl_3,
                                                                                                words_list_lernen_3 : words_list_lernen_3,
                                                                                                words_list_rew_list_3 : words_list_rew_list_3,
                                                                                                words_list_lernen_3_int : words_list_lernen_3_int,
                                                                                                words_list_lernen_3_int_text : words_list_lernen_3_int_text,
                                                                                                words_list_fiabz : words_list_fiabz,
                                                                                                words_list_abrufen : words_list_abrufen,
                                                                                                words_list_rew_list_abrufen : words_list_rew_list_abrufen,
                                                                                                words_list_abrufen_int : words_list_abrufen_int,
                                                                                                words_list_abrufen_int_text : words_list_abrufen_int_text,
                                                                                                words_list_butter : words_list_butter, 
                                                                                                words_list_arm : words_list_arm, 
                                                                                                words_list_strand : words_list_strand, 
                                                                                                words_list_brief : words_list_brief, 
                                                                                                words_list_konigin : words_list_konigin, 
                                                                                                words_list_hutte : words_list_hutte, 
                                                                                                words_list_stange : words_list_stange, 
                                                                                                words_list_karte : words_list_karte, 
                                                                                                words_list_gras : words_list_gras, 
                                                                                                words_list_motor : words_list_motor,
                                                                                                words_list_r_ja : words_list_r_ja,
                                                                                                words_list_r_ja_list : words_list_r_ja_list,
                                                                                                words_list_r_nein : words_list_r_nein,
                                                                                                words_list_r_nein_list : words_list_r_nein_list,
                                                                                                words_list_f_ja : words_list_f_ja,
                                                                                                words_list_f_ja_list : words_list_f_ja_list,
                                                                                                words_list_f_nein : words_list_f_nein,
                                                                                                words_list_f_nein_list : words_list_f_nein_list,

                                                                                                stroop_victoria_2_active : stroop_victoria_2_active,
                                                                                                stroop_victoria_2_path_audio_1 : stroop_victoria_2_path_audio_1,
                                                                                                stroop_victoria_2_path_audio_2 : stroop_victoria_2_path_audio_2,
                                                                                                stroop_victoria_2_path_audio_3 : stroop_victoria_2_path_audio_3,
                                                                                                stroop_victoria_2_duree_1 : stroop_victoria_2_duree_1,
                                                                                                stroop_victoria_2_nombre_d_erreurs_1 : stroop_victoria_2_nombre_d_erreurs_1,
                                                                                                stroop_victoria_2_nombre_d_erreurs_corrigees_1 : stroop_victoria_2_nombre_d_erreurs_corrigees_1,
                                                                                                stroop_victoria_2_duree_2 : stroop_victoria_2_duree_2,
                                                                                                stroop_victoria_2_nombre_d_erreurs_2 : stroop_victoria_2_nombre_d_erreurs_2,
                                                                                                stroop_victoria_2_nombre_d_erreurs_corrigees_2 : stroop_victoria_2_nombre_d_erreurs_corrigees_2,
                                                                                                stroop_victoria_2_duree_3 : stroop_victoria_2_duree_3,
                                                                                                stroop_victoria_2_nombre_d_erreurs_3 : stroop_victoria_2_nombre_d_erreurs_3,
                                                                                                stroop_victoria_2_nombre_d_erreurs_corrigees_3 : stroop_victoria_2_nombre_d_erreurs_corrigees_3,

                                                                                                manageClinicians: manageClinicians                                                                                            
                                                                                            });
                                                                                        })
                                                                                        .catch(err => {
                                                                                            console.log(err);
                                                                                            res.redirect('/error');
                                                                                        });
                                                                                    })
                                                                                    .catch(err => {
                                                                                        console.log(err);
                                                                                        res.redirect('/error');
                                                                                    });
                                                                                })
                                                                                .catch(err => {
                                                                                    console.log(err);
                                                                                    res.redirect('/error');
                                                                                });
                                                                            })
                                                                            .catch(err => {
                                                                                console.log(err);
                                                                                res.redirect('/error');
                                                                            });
                                                                        })
                                                                        .catch(err => {
                                                                            console.log(err);
                                                                            res.redirect('/error');
                                                                        });
                                                                    })
                                                                    .catch(err => {
                                                                        console.log(err);
                                                                        res.redirect('/error');
                                                                    });
                                                                })
                                                                .catch(err => {
                                                                    console.log(err);
                                                                    res.redirect('/error');
                                                                });
                                                            })
                                                            .catch(err => {
                                                                console.log(err);
                                                                res.redirect('/error');
                                                            });
                                                        })
                                                        .catch(err => {
                                                            console.log(err);
                                                            res.redirect('/error');
                                                        });
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                        res.redirect('/error');
                                                    });                             
                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                    res.redirect('/error');
                                                });                                                                                           
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                res.redirect('/error');
                                            });
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            res.redirect('/error');
                                        });
                                    } 
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.redirect('/error');
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            res.redirect('/error');
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.redirect('/error');
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/error');
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.redirect('/error');
        });
    } else {
        res.redirect('/'); 
    } 
};

exports.getReportTest09FVLEX_P = (req, res, next) => {      
    if (session.checkSession(req, 2)) {
        let IDSession = req.query.id;

        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;

                    Session_Model.select_by_id(IDSession)
                    .then(([sessions]) => {
                        let IDPatient = sessions[0].id_patient;
                        let session_created_date = sessions[0].created_date;
                        let session_created_number = sessions[0].created_number;

                        Patient.selectNameByIDPatient(IDPatient)
                        .then(([patient]) => {
                            if (patient.length == 1) {                                
                                let patient_family_name = patient[0].family_name;
                                let patient_name = patient[0].name;

                                Patient.select_by_idUser(IDPatient)
                                .then(([patient]) => {
                                    if (patient.length == 1) {
                                        let id_path_folder = patient[0].id_path_folder;

                                        Test_FVLex.select_report_by_idSession(IDSession)
                                        .then(([test_fvlex]) => {
                                            if (test_fvlex.length == 1) {
                                                let path_video_p = "";
                                                let p_duree = test_fvlex[0].p_duree;
                                                let p_reponses = test_fvlex[0].p_reponses;
                                                let p_intrusions = test_fvlex[0].p_intrusions;
                                                let p_oublis_a_mesure = test_fvlex[0].p_oublis_a_mesure;
                                                let p_erreurs = test_fvlex[0].p_erreurs;
                                                let p_text_zone = test_fvlex[0].p_text_zone;

                                                if (test_fvlex[0].p_video == 1) {
                                                    path_video_p = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/FVLEX/P-video_P.webm";
                                                }

                                                res.render('clinician/reports/report-fvlex', {                                        
                                                    pageTitle : 'Report of FVLEX',
                                                    path : '',
                                                    patient_name : patient_name,
                                                    patient_family_name : patient_family_name,
                                                    id_session : IDSession,
                                                    session_created_date : session_created_date,
                                                    name_of_report : 'Lettre P:',
                                                    duree : p_duree,
                                                    reponses : p_reponses,
                                                    intrusions : p_intrusions,
                                                    oublis_a_mesure : p_oublis_a_mesure,
                                                    erreurs : p_erreurs,
                                                    text_zone : p_text_zone,
                                                    path_video : path_video_p,
                                                    manageClinicians: manageClinicians
                                                });
                                            }
                                        })
                                        .catch(err => res.redirect('/error'));
                                    }
                                })
                                .catch(err => res.redirect('/error'));
                            }
                        })
                        .catch(err => res.redirect('/error'));
                    })
                    .catch(err => res.redirect('/error'));
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getReportTest09FVLEX_R = (req, res, next) => {      
    if (session.checkSession(req, 2)) {
        let IDSession = req.query.id;

        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;

                    Session_Model.select_by_id(IDSession)
                    .then(([sessions]) => {
                        let IDPatient = sessions[0].id_patient;
                        let session_created_date = sessions[0].created_date;
                        let session_created_number = sessions[0].created_number;

                        Patient.selectNameByIDPatient(IDPatient)
                        .then(([patient]) => {
                            if (patient.length == 1) {                                
                                let patient_family_name = patient[0].family_name;
                                let patient_name = patient[0].name;

                                Patient.select_by_idUser(IDPatient)
                                .then(([patient]) => {
                                    if (patient.length == 1) {
                                        let id_path_folder = patient[0].id_path_folder;

                                        Test_FVLex.select_report_by_idSession(IDSession)
                                        .then(([test_fvlex]) => {
                                            if (test_fvlex.length == 1) {
                                                let path_video_r = "";
                                                let r_duree = test_fvlex[0].r_duree;
                                                let r_reponses = test_fvlex[0].r_reponses;
                                                let r_intrusions = test_fvlex[0].r_intrusions;
                                                let r_oublis_a_mesure = test_fvlex[0].r_oublis_a_mesure;
                                                let r_erreurs = test_fvlex[0].r_erreurs;
                                                let r_text_zone = test_fvlex[0].r_text_zone;

                                                if (test_fvlex[0].r_video == 1) {
                                                    path_video_r = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/FVLEX/P-video_R.webm";
                                                }

                                                res.render('clinician/reports/report-fvlex', {                                        
                                                    pageTitle : 'Report of FVLEX',
                                                    path : '',
                                                    patient_name : patient_name,
                                                    patient_family_name : patient_family_name,
                                                    id_session : IDSession,
                                                    session_created_date : session_created_date,                                                    
                                                    name_of_report : 'Lettre R:',
                                                    duree : r_duree,
                                                    reponses : r_reponses,
                                                    intrusions : r_intrusions,
                                                    oublis_a_mesure : r_oublis_a_mesure,
                                                    erreurs : r_erreurs,
                                                    text_zone : r_text_zone,
                                                    path_video : path_video_r,
                                                    manageClinicians: manageClinicians
                                                });
                                            }
                                        })
                                        .catch(err => res.redirect('/error'));
                                    }
                                })
                                .catch(err => res.redirect('/error'));
                            }
                        })
                        .catch(err => res.redirect('/error'));
                    })
                    .catch(err => res.redirect('/error'));
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getReportTest10FVSEM_Animaux = (req, res, next) => {      
    if (session.checkSession(req, 2)) {
        let IDSession = req.query.id;

        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;

                    Session_Model.select_by_id(IDSession)
                    .then(([sessions]) => {
                        let IDPatient = sessions[0].id_patient;
                        let session_created_date = sessions[0].created_date;
                        let session_created_number = sessions[0].created_number;

                        Patient.selectNameByIDPatient(IDPatient)
                        .then(([patient]) => {
                            if (patient.length == 1) {                                
                                let patient_family_name = patient[0].family_name;
                                let patient_name = patient[0].name;

                                Patient.select_by_idUser(IDPatient)
                                .then(([patient]) => {
                                    if (patient.length == 1) {
                                        let id_path_folder = patient[0].id_path_folder;

                                        Test_FVSem.select_report_by_idSession(IDSession)
                                        .then(([test_fvsem]) => {
                                            if (test_fvsem.length == 1) {
                                                let path_video_animaux = "";
                                                let animaux_duree = test_fvsem[0].animaux_duree;
                                                let animaux_reponses = test_fvsem[0].animaux_reponses;
                                                let animaux_intrusions = test_fvsem[0].animaux_intrusions;
                                                let animaux_oublis_a_mesure = test_fvsem[0].animaux_oublis_a_mesure;
                                                let animaux_erreurs = test_fvsem[0].animaux_erreurs;
                                                let animaux_text_zone = test_fvsem[0].animaux_text_zone;

                                                if (test_fvsem[0].animaux_video == 1) {
                                                    path_video_animaux = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/FVSEM/P-video_Animaux.webm";
                                                }

                                                res.render('clinician/reports/report-fvsem', {                                        
                                                    pageTitle : 'Report of FVSEM',
                                                    path : '',
                                                    patient_name : patient_name,
                                                    patient_family_name : patient_family_name,
                                                    id_session : IDSession,
                                                    session_created_date : session_created_date,
                                                    name_of_report : 'Animaux:',
                                                    duree : animaux_duree,
                                                    reponses : animaux_reponses,
                                                    intrusions : animaux_intrusions,
                                                    oublis_a_mesure : animaux_oublis_a_mesure,
                                                    erreurs : animaux_erreurs,
                                                    text_zone : animaux_text_zone,
                                                    path_video : path_video_animaux,                                                    
                                                    manageClinicians: manageClinicians
                                                });
                                            }
                                        })
                                        .catch(err => res.redirect('/error'));
                                    }
                                })
                                .catch(err => res.redirect('/error'));
                            }
                        })
                        .catch(err => res.redirect('/error'));
                    })
                    .catch(err => res.redirect('/error'));
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getReportTest10FVSEM_Fruits = (req, res, next) => {      
    if (session.checkSession(req, 2)) {
        let IDSession = req.query.id;

        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;

                    Session_Model.select_by_id(IDSession)
                    .then(([sessions]) => {
                        let IDPatient = sessions[0].id_patient;
                        let session_created_date = sessions[0].created_date;
                        let session_created_number = sessions[0].created_number;

                        Patient.selectNameByIDPatient(IDPatient)
                        .then(([patient]) => {
                            if (patient.length == 1) {                                
                                let patient_family_name = patient[0].family_name;
                                let patient_name = patient[0].name;

                                Patient.select_by_idUser(IDPatient)
                                .then(([patient]) => {
                                    if (patient.length == 1) {
                                        let id_path_folder = patient[0].id_path_folder;

                                        Test_FVSem.select_report_by_idSession(IDSession)
                                        .then(([test_fvsem]) => {
                                            if (test_fvsem.length == 1) {
                                                let path_video_fruits = "";
                                                let fruits_duree = test_fvsem[0].fruits_duree;
                                                let fruits_reponses = test_fvsem[0].fruits_reponses;
                                                let fruits_intrusions = test_fvsem[0].fruits_intrusions;
                                                let fruits_oublis_a_mesure = test_fvsem[0].fruits_oublis_a_mesure;
                                                let fruits_erreurs = test_fvsem[0].fruits_erreurs;
                                                let fruits_text_zone = test_fvsem[0].fruits_text_zone;

                                                if (test_fvsem[0].fruits_video == 1) {
                                                    path_video_fruits = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/FVSEM/P-video_Fruits.webm";
                                                }

                                                res.render('clinician/reports/report-fvsem', {                                        
                                                    pageTitle : 'Report of FVSEM',
                                                    path : '',
                                                    patient_name : patient_name,
                                                    patient_family_name : patient_family_name,
                                                    id_session : IDSession,
                                                    session_created_date : session_created_date,
                                                    name_of_report : 'Fruits:',
                                                    duree : fruits_duree,
                                                    reponses : fruits_reponses,
                                                    intrusions : fruits_intrusions,
                                                    oublis_a_mesure : fruits_oublis_a_mesure,
                                                    erreurs : fruits_erreurs,
                                                    text_zone : fruits_text_zone,
                                                    path_video : path_video_fruits,
                                                    manageClinicians: manageClinicians
                                                });
                                            }
                                        })
                                        .catch(err => res.redirect('/error'));
                                    }
                                })
                                .catch(err => res.redirect('/error'));
                            }
                        })
                        .catch(err => res.redirect('/error'));
                    })
                    .catch(err => res.redirect('/error'));
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getReportTest24GDS = (req, res, next) => {   
    if (session.checkSession(req, 2)) {
        let IDSession = req.query.id;

        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;

                    Session_Model.select_by_id(IDSession)
                    .then(([sessions]) => {
                        let IDPatient = sessions[0].id_patient;
                        let session_created_date = sessions[0].created_date;

                        Patient.selectNameByIDPatient(IDPatient)
                        .then(([patient]) => {
                            if (patient.length == 1) {                                
                                let patient_family_name = patient[0].family_name;
                                let patient_name = patient[0].name;

                                Test_GDS.select_report_by_idSession(IDSession)
                                .then(([test_gds]) => {
                                    if (test_gds.length == 1) {
                                        let GDS_Score = test_gds[0].score;
                                        let GDS_commentaires = test_gds[0].commentaires;

                                        res.render('clinician/reports/report-gds', {                                        
                                            pageTitle : 'Report of Echelle GDS',
                                            path : '',
                                            patient_name : patient_name,
                                            patient_family_name : patient_family_name,
                                            id_session : IDSession,
                                            session_created_date : session_created_date,
                                            GDS_Score : GDS_Score,
                                            GDS_commentaires : GDS_commentaires,
                                            manageClinicians: manageClinicians
                                        });   
                                    }                                 
                                })
                                .catch(err => res.redirect('/error'));                                    
                            }
                        })
                        .catch(err => res.redirect('/error'));
                    })
                    .catch(err => res.redirect('/error'));
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getOpenRoom = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;   

                    res.render('clinician/open-room', {        
                        pageTitle: 'Open Room',
                        path: '/clinician/open-room',
                        email: req.session.email,
                        manageClinicians: manageClinicians
                    });
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    } else {
        res.redirect('/'); 
    }
};

exports.getRefreshRoom = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        Clinician.findUserIDByemail(req.session.email)        
        .then(([clinicians]) => {
            if (clinicians.length == 1) {
                let idClinician = clinicians[0].IDClinician;

                Clinician.selectManageCliniciansByIDClinician(idClinician)
                .then(([clinicians]) => {
                    let manageClinicians = clinicians[0].manage_clinicians;      
                    
                    res.render('clinician/refresh-room', {        
                        pageTitle: 'Refresh Room',
                        path: '/clinician/open-room',
                        manageClinicians: manageClinicians
                    });
                })
                .catch(err => res.redirect('/error'));
            }
        })
        .catch(err => res.redirect('/error'));
    }  
    else {
        res.redirect('/'); 
    }
};

exports.postUploadMultiFiles = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        const files = req.files;        
        res.send(files);
    } else
        res.redirect('/');
};

exports.postUploadSingleFile = (req, res, next) => {
    if (session.checkSession(req, 2)) {        
        const file = req.file;      
        res.send(file);
    } else
        res.redirect('/');
};