const Clinician = require('../../models/clinician');
const Patient = require('../../models/patient');
const Session_Model = require('../../models/session');

const Test_Words_List = require('../../models/test_words_list');

const session = require('../common/session');

exports.getReportTest39WordsList  = (req, res, next) => { 
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

                                        Test_Words_List.select_report_by_idSession(IDSession)
                                        .then(([test_words_list]) => {
                                            if (test_words_list.length == 1) {
                                                let path_video = "";

                                                let knl_1 = test_words_list[0].knl_1;
                                                let wortliste_knl_1 = test_words_list[0].wortliste_knl_1;
                                                let lernen_1 = test_words_list[0].lernen_1;
                                                let rew_list_1 = test_words_list[0].rew_list_1;
                                                let lernen_1_int = test_words_list[0].lernen_1_int;
                                                let lernen_1_int_text = test_words_list[0].lernen_1_int_text;
                                                let knl_2 = test_words_list[0].knl_2;
                                                let wortliste_knl_2 = test_words_list[0].wortliste_knl_2;
                                                let lernen_2 = test_words_list[0].lernen_2;
                                                let rew_list_2 = test_words_list[0].rew_list_2;
                                                let lernen_2_int = test_words_list[0].lernen_2_int;
                                                let lernen_2_int_text = test_words_list[0].lernen_2_int_text;
                                                let knl_3 = test_words_list[0].knl_3;
                                                let wortliste_knl_3 = test_words_list[0].wortliste_knl_3;
                                                let lernen_3 = test_words_list[0].lernen_3;
                                                let rew_list_3 = test_words_list[0].rew_list_3;
                                                let lernen_3_int = test_words_list[0].lernen_3_int;
                                                let lernen_3_int_text = test_words_list[0].lernen_3_int_text;
                                                let abrufen = test_words_list[0].abrufen;
                                                let rew_list_abrufen = test_words_list[0].rew_list_abrufen;
                                                let abrufen_int = test_words_list[0].abrufen_int;
                                                let abrufen_int_text = test_words_list[0].abrufen_int_text;
                                                let butter = test_words_list[0].butter; 
                                                let arm = test_words_list[0].arm; 
                                                let strand = test_words_list[0].strand; 
                                                let brief = test_words_list[0].brief; 
                                                let konigin = test_words_list[0].konigin; 
                                                let hutte = test_words_list[0].hutte; 
                                                let stange = test_words_list[0].stange; 
                                                let karte = test_words_list[0].karte; 
                                                let gras = test_words_list[0].gras; 
                                                let motor = test_words_list[0].motor;
                                                let r_ja = test_words_list[0].r_ja;
                                                let r_ja_list = test_words_list[0].r_ja_list;
                                                let r_nein = test_words_list[0].r_nein;
                                                let r_nein_list = test_words_list[0].r_nein_list;
                                                let f_ja = test_words_list[0].f_ja;
                                                let f_ja_list = test_words_list[0].f_ja_list;
                                                let f_nein = test_words_list[0].f_nein;
                                                let f_nein_list = test_words_list[0].f_nein_list;
                                                
                                                if (test_words_list[0].record_video == 1) {
                                                    path_video = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/Words_List/video.webm";
                                                }
                                                
                                                res.render('clinician/reports/report-words-list', {                                        
                                                    pageTitle : 'Report of Words List',
                                                    path : '',
                                                    patient_name : patient_name,
                                                    patient_family_name : patient_family_name,
                                                    id_session : IDSession,
                                                    session_created_date : session_created_date,
                                                    knl_1 : knl_1,
                                                    wortliste_knl_1 : wortliste_knl_1,
                                                    lernen_1 : lernen_1,
                                                    rew_list_1 : rew_list_1,
                                                    lernen_1_int : lernen_1_int,
                                                    lernen_1_int_text : lernen_1_int_text,
                                                    knl_2 : knl_2,
                                                    wortliste_knl_2 : wortliste_knl_2,
                                                    lernen_2 : lernen_2,
                                                    rew_list_2 : rew_list_2,
                                                    lernen_2_int : lernen_2_int,
                                                    lernen_2_int_text : lernen_2_int_text,
                                                    knl_3 : knl_3,
                                                    wortliste_knl_3 : wortliste_knl_3,
                                                    lernen_3 : lernen_3,
                                                    rew_list_3 : rew_list_3,
                                                    lernen_3_int : lernen_3_int,
                                                    lernen_3_int_text : lernen_3_int_text,
                                                    abrufen : abrufen,
                                                    rew_list_abrufen : rew_list_abrufen,
                                                    abrufen_int : abrufen_int,
                                                    abrufen_int_text : abrufen_int_text,
                                                    butter : butter, 
                                                    arm : arm, 
                                                    strand : strand, 
                                                    brief : brief, 
                                                    konigin : konigin, 
                                                    hutte : hutte, 
                                                    stange : stange, 
                                                    karte : karte, 
                                                    gras : gras, 
                                                    motor : motor,
                                                    r_ja : r_ja,
                                                    r_ja_list : r_ja_list,
                                                    r_nein : r_nein,
                                                    r_nein_list : r_nein_list,
                                                    f_ja : f_ja,
                                                    f_ja_list : f_ja_list,
                                                    f_nein : f_nein,
                                                    f_nein_list : f_nein_list,
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