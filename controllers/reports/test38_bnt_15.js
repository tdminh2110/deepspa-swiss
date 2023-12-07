const Clinician = require('../../models/clinician');
const Patient = require('../../models/patient');
const Session_Model = require('../../models/session');

const Test_BNT_15 = require('../../models/test_bnt_15');

const session = require('../common/session');

exports.getReportTest38BNT15  = (req, res, next) => { 
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

                                        Test_BNT_15.select_report_by_idSession(IDSession)
                                        .then(([test_bnt_15]) => {
                                            if (test_bnt_15.length == 1) {
                                                let path_video = "";

                                                let haufig = test_bnt_15[0].haufig;
                                                let mittel = test_bnt_15[0].mittel;
                                                let selten = test_bnt_15[0].selten;
                                                let total = haufig + mittel + selten;
                                                let baum = test_bnt_15[0].baum;
                                                let bett = test_bnt_15[0].bett;
                                                let pfeife = test_bnt_15[0].pfeife;
                                                let blume = test_bnt_15[0].blume;
                                                let haus = test_bnt_15[0].haus;
                                                let kanu = test_bnt_15[0].kanu;
                                                let zahnburste = test_bnt_15[0].zahnburste;
                                                let vulkan = test_bnt_15[0].vulkan;
                                                let maske = test_bnt_15[0].maske;
                                                let kamel = test_bnt_15[0].kamel;
                                                let mundharmonika = test_bnt_15[0].mundharmonika;
                                                let zange = test_bnt_15[0].zange;
                                                let hangematte = test_bnt_15[0].hangematte;
                                                let trichter = test_bnt_15[0].trichter;
                                                let dominosteine = test_bnt_15[0].dominosteine;
                                                
                                                if (test_bnt_15[0].record_video == 1) {
                                                    path_video = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/BNT_15/video.webm";
                                                }
                                                
                                                res.render('clinician/reports/report-bnt-15', {                                        
                                                    pageTitle : 'Report of BNT-15',
                                                    path : '',
                                                    patient_name : patient_name,
                                                    patient_family_name : patient_family_name,
                                                    id_session : IDSession,
                                                    session_created_date : session_created_date,
                                                    haufig : haufig,
                                                    mittel : mittel,
                                                    selten : selten,
                                                    total : total,
                                                    baum : baum,
                                                    bett : bett,
                                                    pfeife : pfeife,
                                                    blume : blume,
                                                    haus : haus,
                                                    kanu : kanu,
                                                    zahnburste : zahnburste,
                                                    vulkan : vulkan,
                                                    maske : maske,
                                                    kamel : kamel,
                                                    mundharmonika : mundharmonika,
                                                    zange : zange,
                                                    hangematte : hangematte,
                                                    trichter : trichter,
                                                    dominosteine : dominosteine,
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