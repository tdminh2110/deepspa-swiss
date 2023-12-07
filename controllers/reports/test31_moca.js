const Clinician = require('../../models/clinician');
const Patient = require('../../models/patient');
const Session_Model = require('../../models/session');

const Test_MOCA = require('../../models/test_moca');

const session = require('../common/session');

exports.getReportTest31MOCA  = (req, res, next) => { 
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

                                        Test_MOCA.select_report_by_idSession(IDSession)
                                        .then(([test_moca]) => {
                                            if (test_moca.length == 1) {
                                                let path_video = "";

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

                                                let textResult1 = "Visuospatial / exécutif: [" + a + ", " + b + ", " + c + ", " + d + ", " + e + "] - " + A + "/5";
                                                let textResult2 = "Dénomination: [" + f + ", " + g + ", " + h + "] - " + B + "/3";
                                                let textResult3 = "Attention: [" + i + ", " + j + ", " + k + ", " + l + "] - " + C + "/6";
                                                let textResult4 = "Langage: [" + m + ", " + n + ", " + o + "] - " + D + "/3";
                                                let textResult5 = "Abstraction: [" + p + ", " + q + "] - " + E + "/2";
                                                let textResult6 = "Rappel sans indices: " + F1 + "/5";
                                                let textResult7 = F1 == 5 ? "Rappel différé: n/a" : "Rappel différé: [" + F2 + ", " + F3 + "] - " + G + "/5";
                                                let textResult8 = "Orientation: [" + date + ", " + mois + ", " + annee + ", " + jour + ", " + endroit + ", " + ville + "] - " + H + "/5";
                                                let textResult9 = "TOTAL: " + total + "/30";

                                                let remarques = test_moca[0].remarques;
                                                let results = test_moca[0].results;
                                                
                                                if (test_moca[0].record_video == 1) {
                                                    path_video = "/uploads/" + id_path_folder + "/S_" + session_created_date + "-" + session_created_number + "/MOCA/video.webm";
                                                }
                                                
                                                res.render('clinician/reports/report-moca', {                                        
                                                    pageTitle : 'Report of MOCA',
                                                    path : '',
                                                    patient_name : patient_name,
                                                    patient_family_name : patient_family_name,
                                                    id_session : IDSession,
                                                    session_created_date : session_created_date,
                                                    test_name : "MOCA",
                                                    textResult1 : textResult1,
                                                    textResult2 : textResult2,
                                                    textResult3 : textResult3,
                                                    textResult4 : textResult4,
                                                    textResult5 : textResult5,
                                                    textResult6 : textResult6,
                                                    textResult7 : textResult7,
                                                    textResult8 : textResult8,
                                                    textResult9 : textResult9,
                                                    remarques : remarques,
                                                    results : results,
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

exports.getReportTest31MOCAUpdate  = (req, res, next) => { 
    if (session.checkSession(req, 2)) {
        let idSession = Number(req.body.idsession);
        let results = req.body.results;

        Test_MOCA.update_results_by_idsession(idSession, results)
        .then(() => {
            res.render('empty', {                                
            });                            
        })
        .catch(err => console.log(err));
    } else {
        res.redirect('/'); 
    }
};