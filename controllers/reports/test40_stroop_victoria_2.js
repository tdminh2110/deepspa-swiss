const Clinician = require('../../models/clinician');
const Patient = require('../../models/patient');
const Session_Model = require('../../models/session');

const Test_Stroop_Victoria_2 = require('../../models/test_stroop_victoria_2');

const session = require('../common/session');

exports.getReportTest40StroopVictoria2  = (req, res, next) => { 
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

                                        Test_Stroop_Victoria_2.select_report_by_idSession(IDSession)
                                        .then(([test_stroop_victoria_2]) => {
                                            if (test_stroop_victoria_2.length == 1) {
                                                let path_audio_1 = "";
                                                let path_audio_2 = "";
                                                let path_audio_3 = "";

                                                let duree_1 = test_stroop_victoria_2[0].x_1;
                                                let nombre_d_erreurs_1 = test_stroop_victoria_2[0].y_1;
                                                let nombre_d_erreurs_corrigees_1 = test_stroop_victoria_2[0].z_1;
                                                let duree_2 = test_stroop_victoria_2[0].x_2;
                                                let nombre_d_erreurs_2 = test_stroop_victoria_2[0].y_2;
                                                let nombre_d_erreurs_corrigees_2 = test_stroop_victoria_2[0].z_2;
                                                let duree_3 = test_stroop_victoria_2[0].x_3;
                                                let nombre_d_erreurs_3 = test_stroop_victoria_2[0].y_3;
                                                let nombre_d_erreurs_corrigees_3 = test_stroop_victoria_2[0].z_3;

                                                if (test_stroop_victoria_2[0].audio_1 == 1) {
                                                    path_audio_1 = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/Stroop_Victoria_2/audio1.webm";
                                                }

                                                if (test_stroop_victoria_2[0].audio_2 == 1) {
                                                    path_audio_2 = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/Stroop_Victoria_2/audio2.webm";
                                                }

                                                if (test_stroop_victoria_2[0].audio_3 == 1) {
                                                    path_audio_3 = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/Stroop_Victoria_2/audio3.webm";
                                                }

                                                res.render('clinician/reports/report-stroop-victoria-2', {                                        
                                                    pageTitle : 'Report of Stroop Victoria 2',
                                                    path : '',
                                                    patient_name : patient_name,
                                                    patient_family_name : patient_family_name,
                                                    id_session : IDSession,
                                                    session_created_date : session_created_date,
                                                    duree_1 : duree_1,
                                                    nombre_d_erreurs_1 : nombre_d_erreurs_1,
                                                    nombre_d_erreurs_corrigees_1 : nombre_d_erreurs_corrigees_1,
                                                    duree_2 : duree_2,
                                                    nombre_d_erreurs_2 : nombre_d_erreurs_2,
                                                    nombre_d_erreurs_corrigees_2 : nombre_d_erreurs_corrigees_2,
                                                    duree_3 : duree_3,
                                                    nombre_d_erreurs_3 : nombre_d_erreurs_3,
                                                    nombre_d_erreurs_corrigees_3 : nombre_d_erreurs_corrigees_3,
                                                    path_audio_1 : path_audio_1,
                                                    path_audio_2 : path_audio_2,
                                                    path_audio_3 : path_audio_3,
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