const Clinician = require('../../models/clinician');
const Patient = require('../../models/patient');
const Session_Model = require('../../models/session');

const Test_D2 = require('../../models/test_d2');

const session = require('../common/session');

exports.getReportTest32D2  = (req, res, next) => { 
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

                                        Test_D2.select_report_by_idSession(IDSession)
                                        .then(([test_d2]) => {
                                            if (test_d2.length == 1) {
                                                let path_video = "";

                                                let seconds = test_d2[0].test_time;
                                                let minutes = parseInt(seconds / 60);
                                                seconds = seconds % 60;
                                                
                                                if (test_d2[0].record_video == 1) {
                                                    path_video = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/D2/video.webm";
                                                }
                                                
                                                res.render('clinician/reports/report-d2', {                                        
                                                    pageTitle : 'Report of D2',
                                                    path : '',
                                                    patient_name : patient_name,
                                                    patient_family_name : patient_family_name,
                                                    id_session : IDSession,
                                                    session_created_date : session_created_date,
                                                    test_time : minutes != 0 ? "Temps: " + minutes + " minutes " + seconds + " secondes" : "Temps: " + seconds + " secondes",
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