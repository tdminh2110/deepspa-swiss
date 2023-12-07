const Clinician = require('../../models/clinician');
const Patient = require('../../models/patient');
const Session_Model = require('../../models/session');

const Test_Digital_Span = require('../../models/test_digital_span');

const session = require('../common/session');

exports.getReportTest37DigitalSpan  = (req, res, next) => { 
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

                                        Test_Digital_Span.select_report_by_idSession(IDSession)
                                        .then(([test_digital_span]) => {
                                            if (test_digital_span.length == 1) {
                                                let path_audio = "";

                                                let vor = test_digital_span[0].vor;
                                                let ruc = test_digital_span[0].ruc;
                                                
                                                if (test_digital_span[0].record_audio == 1) {
                                                    path_audio = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/Digital_Span/audio.webm";
                                                }
                                                
                                                res.render('clinician/reports/report-digital-span', {                                        
                                                    pageTitle : 'Report of Digital Span',
                                                    path : '',
                                                    patient_name : patient_name,
                                                    patient_family_name : patient_family_name,
                                                    id_session : IDSession,
                                                    session_created_date : session_created_date,
                                                    vor: vor,
                                                    ruc: ruc,
                                                    path_audio : path_audio,
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