const Clinician = require('../../models/clinician');
const Patient = require('../../models/patient');
const Session_Model = require('../../models/session');

const Test_NPI = require('../../models/test_npi');

const session = require('../common/session');

exports.getReportTest36NPI  = (req, res, next) => { 
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

                                        Test_NPI.select_report_by_idSession(IDSession)
                                        .then(([test_npi]) => {
                                            if (test_npi.length == 1) {
                                                let path_video = "";

                                                let sumFG = 0, sumF = 0, sumG = 0, sumR = 0;
                                                
                                                let F1 = test_npi[0].F1 == -1 ? "N/A" : test_npi[0].F1;
                                                let G1 = test_npi[0].G1 == -1 ? "N/A" : test_npi[0].G1;
                                                let R1 = test_npi[0].R1 == -1 ? "N/A" : test_npi[0].R1;
                                                let FG1 = F1 == "N/A" ? F1 : F1 * G1;
                                                if (F1 != "N/A") {
                                                    sumFG += FG1; sumF += F1; sumG += G1; sumR += R1;
                                                }

                                                let F2 = test_npi[0].F2 == -1 ? "N/A" : test_npi[0].F2;
                                                let G2 = test_npi[0].G2 == -1 ? "N/A" : test_npi[0].G2;
                                                let R2 = test_npi[0].R2 == -1 ? "N/A" : test_npi[0].R2;
                                                let FG2 = F2 == "N/A" ? F2 : F2 * G2;
                                                if (F2 != "N/A") {
                                                    sumFG += FG2; sumF += F2; sumG += G2; sumR += R2;
                                                }

                                                let F3 = test_npi[0].F3 == -1 ? "N/A" : test_npi[0].F3;
                                                let G3 = test_npi[0].G3 == -1 ? "N/A" : test_npi[0].G3;
                                                let R3 = test_npi[0].R3 == -1 ? "N/A" : test_npi[0].R3;
                                                let FG3 = F3 == "N/A" ? F3 : F3 * G3;
                                                if (F3 != "N/A") {
                                                    sumFG += FG3; sumF += F3; sumG += G3; sumR += R3;
                                                }

                                                let F4 = test_npi[0].F4 == -1 ? "N/A" : test_npi[0].F4;
                                                let G4 = test_npi[0].G4 == -1 ? "N/A" : test_npi[0].G4;
                                                let R4 = test_npi[0].R4 == -1 ? "N/A" : test_npi[0].R4;
                                                let FG4 = F4 == "N/A" ? F4 : F4 * G4;
                                                if (F4 != "N/A") {
                                                    sumFG += FG4; sumF += F4; sumG += G4; sumR += R4;
                                                }

                                                let F5 = test_npi[0].F5 == -1 ? "N/A" : test_npi[0].F5;
                                                let G5 = test_npi[0].G5 == -1 ? "N/A" : test_npi[0].G5;
                                                let R5 = test_npi[0].R5 == -1 ? "N/A" : test_npi[0].R5;
                                                let FG5 = F5 == "N/A" ? F5 : F5 * G5;
                                                if (F5 != "N/A") {
                                                    sumFG += FG5; sumF += F5; sumG += G5; sumR += R5;
                                                }

                                                let F6 = test_npi[0].F6 == -1 ? "N/A" : test_npi[0].F6;
                                                let G6 = test_npi[0].G6 == -1 ? "N/A" : test_npi[0].G6;
                                                let R6 = test_npi[0].R6 == -1 ? "N/A" : test_npi[0].R6;
                                                let FG6 = F6 == "N/A" ? F6 : F6 * G6;
                                                if (F6 != "N/A") {
                                                    sumFG += FG6; sumF += F6; sumG += G6; sumR += R6;
                                                }

                                                let F7 = test_npi[0].F7 == -1 ? "N/A" : test_npi[0].F7;
                                                let G7 = test_npi[0].G7 == -1 ? "N/A" : test_npi[0].G7;
                                                let R7 = test_npi[0].R7 == -1 ? "N/A" : test_npi[0].R7;
                                                let FG7 = F7 == "N/A" ? F7 : F7 * G7;
                                                if (F7 != "N/A") {
                                                    sumFG += FG7; sumF += F7; sumG += G7; sumR += R7;
                                                }

                                                let F8 = test_npi[0].F8 == -1 ? "N/A" : test_npi[0].F8;
                                                let G8 = test_npi[0].G8 == -1 ? "N/A" : test_npi[0].G8;
                                                let R8 = test_npi[0].R8 == -1 ? "N/A" : test_npi[0].R8;
                                                let FG8 = F8 == "N/A" ? F8 : F8 * G8;
                                                if (F8 != "N/A") {
                                                    sumFG += FG8; sumF += F8; sumG += G8; sumR += R8;
                                                }

                                                let F9 = test_npi[0].F9 == -1 ? "N/A" : test_npi[0].F9;
                                                let G9 = test_npi[0].G9 == -1 ? "N/A" : test_npi[0].G9;
                                                let R9 = test_npi[0].R9 == -1 ? "N/A" : test_npi[0].R9;
                                                let FG9 = F9 == "N/A" ? F9 : F9 * G9;
                                                if (F9 != "N/A") {
                                                    sumFG += FG9; sumF += F9; sumG += G9; sumR += R9;
                                                }

                                                let F10 = test_npi[0].F10 == -1 ? "N/A" : test_npi[0].F10;
                                                let G10 = test_npi[0].G10 == -1 ? "N/A" : test_npi[0].G10;
                                                let R10 = test_npi[0].R10 == -1 ? "N/A" : test_npi[0].R10;
                                                let FG10 = F10 == "N/A" ? F10 : F10 * G10;
                                                if (F10 != "N/A") {
                                                    sumFG += FG10; sumF += F10; sumG += G10; sumR += R10;
                                                }

                                                let F11 = test_npi[0].F11 == -1 ? "N/A" : test_npi[0].F11;
                                                let G11 = test_npi[0].G11 == -1 ? "N/A" : test_npi[0].G11;
                                                let R11 = test_npi[0].R11 == -1 ? "N/A" : test_npi[0].R11;
                                                let FG11 = F11 == "N/A" ? F11 : F11 * G11;
                                                if (F11 != "N/A") {
                                                    sumFG += FG11; sumF += F11; sumG += G11; sumR += R11;
                                                }

                                                let F12 = test_npi[0].F12 == -1 ? "N/A" : test_npi[0].F12;
                                                let G12 = test_npi[0].G12 == -1 ? "N/A" : test_npi[0].G12;
                                                let R12 = test_npi[0].R12 == -1 ? "N/A" : test_npi[0].R12;
                                                let FG12 = F12 == "N/A" ? F12 : F12 * G12;
                                                if (F12 != "N/A") {
                                                    sumFG += FG12; sumF += F12; sumG += G12; sumR += R12;
                                                }

                                                let commentaires = test_npi[0].commentaires;
                                                
                                                if (test_npi[0].record_video == 1) {
                                                    path_video = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/NPI/video.webm";
                                                }
                                                
                                                res.render('clinician/reports/report-npi', {                                        
                                                    pageTitle : 'Report of Inventaire Neuropsychiatrique',
                                                    path : '',
                                                    patient_name : patient_name,
                                                    patient_family_name : patient_family_name,
                                                    id_session : IDSession,
                                                    session_created_date : session_created_date,
                                                    text_2_2: FG1,
                                                    text_2_3: F1,
                                                    text_2_4: G1,
                                                    text_2_5: R1,
                                                    text_3_2: FG2,
                                                    text_3_3: F2,
                                                    text_3_4: G2,
                                                    text_3_5: R2,
                                                    text_4_2: FG3,
                                                    text_4_3: F3,
                                                    text_4_4: G3,
                                                    text_4_5: R3,
                                                    text_5_2: FG4,
                                                    text_5_3: F4,
                                                    text_5_4: G4,
                                                    text_5_5: R4,
                                                    text_6_2: FG5,
                                                    text_6_3: F5,
                                                    text_6_4: G5,
                                                    text_6_5: R5,
                                                    text_7_2: FG6,
                                                    text_7_3: F6,
                                                    text_7_4: G6,
                                                    text_7_5: R6,
                                                    text_8_2: FG7,
                                                    text_8_3: F7,
                                                    text_8_4: G7,
                                                    text_8_5: R7,
                                                    text_9_2: FG8,
                                                    text_9_3: F8,
                                                    text_9_4: G8,
                                                    text_9_5: R8,
                                                    text_10_2: FG9,
                                                    text_10_3: F9,
                                                    text_10_4: G9,
                                                    text_10_5: R9,
                                                    text_11_2: FG10,
                                                    text_11_3: F10,
                                                    text_11_4: G10,
                                                    text_11_5: R10,
                                                    text_12_2: FG11,
                                                    text_12_3: F11,
                                                    text_12_4: G11,
                                                    text_12_5: R11,
                                                    text_13_2: FG12,
                                                    text_13_3: F12,
                                                    text_13_4: G12,
                                                    text_13_5: R12,
                                                    text_14_2: sumFG,
                                                    text_14_3: sumF,
                                                    text_14_4: sumG,
                                                    text_14_5: sumR,
                                                    commentaires : commentaires,
                                                    path_video : path_video,
                                                    manageClinicians: manageClinicians
                                                });     
                                            } 
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            res.redirect('/error')
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