const MySession = require('../models/session');
const MyJson = require('./common/json');
const Patient = require('../models/patient');
const Test_FVLEX = require('../models/test_fvlex');
const Test_FVSEM = require('../models/test_fvsem');
const Test_Entr_Clin = require('../models/test_entr_clin');
const Test_Eval_Acc = require('../models/test_eval_acc');
const Test_Eval_Acc_V2 = require('../models/test_eval_acc_v2');
const Test_GDS = require('../models/test_gds');
const Test_DeepSpa = require('../models/test_deepspa');
const Test_MOCA = require('../models/test_moca');
const Test_Digital_Span = require('../models/test_digital_span');
const Test_BNT_15 = require('../models/test_bnt_15');
const Test_Words_List = require('../models/test_words_list');
const Test_Stroop_Victoria_2 = require('../models/test_stroop_victoria_2');
const Test_Trial_Making_Test = require('../models/test_trial_making_test');

const session = require('./common/session');
const fileSystem = require('./common/filesystem');
const string_process = require('./common/stringprocess');

let idPatient;

exports.getCreateSession = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        MySession.select_max_by_idPatient(idPatient)
        .then(([mySession]) => {
            Patient.select_by_idUser(idPatient)            
            .then(([patient]) => {
                if (patient.length >= 1) {
                    fileSystem.createFolder(fileSystem.FOLDER_UPLOAD + patient[0].id_path_folder);

                    let date = new Date();
                    let today = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
                    let today_shorten = string_process.addZeroWithNumber(date.getDate().toString()) + 
                                        string_process.addZeroWithNumber((date.getMonth() + 1).toString()) + 
                                        string_process.addZeroWithNumber(date.getFullYear().toString());
                    let maxCreatedNumber = mySession[0].max_created_number == null ? 0 : mySession[0].max_created_number;

                    const newSession = new MySession(null, idPatient, today, maxCreatedNumber + 1, 0, "");
                    newSession.insert()
                    .then((results) => {
                        MySession.select_by_idPatient_orderby_createdNumber(idPatient)
                        .then(([sessions]) => {
                            if (sessions.length >= 1) {
                                fileSystem.createFolder(fileSystem.FOLDER_UPLOAD + patient[0].id_path_folder + "/S_" + today_shorten + "-" + (maxCreatedNumber + 1).toString());

                                res.render('clinician/test-screens/common/navigation/navigation-left-select-sessions', {
                                    'sessions' : sessions
                                });
                            }
                        })
                        .catch(err => res.redirect('/error'));
                    })
                    .catch(err => {
                        console.log(err);
                    });            
                }
            })
            .catch(err => res.redirect('/error'));
        })
        .catch(err => res.redirect('/error'));
    }
}

exports.getListNames = (req, res, next) => {
    if (session.checkSession(req, 2)) { 
        idPatient = Number(req.query.idpatient);

        MySession.select_by_idPatient_orderby_createdNumber(idPatient)
        .then(([sessions]) => {
            res.render('clinician/test-screens/common/navigation/navigation-left-select-sessions', {
                'sessions' : sessions
            });
        })
        .catch(err => res.redirect('/error'));
    }
};

exports.getLoadCommentaires  = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        let idSession = Number(req.query.idsession);
        MySession.select_commentaires_by_id(idSession)
        .then(([sessions]) => {
            res.render('clinician/test-screens/common/navigation/navigation-left-commentaires-session', {
                'commentaires_session' : sessions[0].commentaires
            });
        })
        .catch(err => res.redirect('/error'));
    }
}

exports.getLoadListOfTests = (req, res, next) => {    
    if (session.checkSession(req, 2)) { 
        let idSession = Number(req.query.idsession);
        let session_name = req.query.sessionname;
        
        let b_test_moca = false;
        let b_test_gds_15 = false;
        let b_test_stroop_victoria_2 = false;
        let b_test_digital_span = false;
        let b_test_fvsem = false;
        let b_test_fvlex = false;
        let b_test_bnt_15 = false;
        let b_test_words_list = false;
        let b_test_trial_making_test = false;    

        Test_MOCA.select_by_idSession(idSession)
        .then(([test_moca]) => {
            b_test_moca = test_moca.length > 0;

            Test_GDS.select_by_idSession(idSession)
            .then(([test_gds]) => {
                b_test_gds_15 = test_gds.length > 0;

                Test_Stroop_Victoria_2.select_by_idSession(idSession)
                .then(([test_stroop_victoria_2]) => {
                    b_test_stroop_victoria_2 = test_stroop_victoria_2.length > 0;

                    Test_Digital_Span.select_by_idSession(idSession)
                    .then(([test_digital_span]) => {
                        b_test_digital_span = test_digital_span.length > 0;

                        Test_FVLEX.select_by_idSession(idSession)
                        .then(([test_fvlex]) => {
                            b_test_fvlex = test_fvlex.length > 0;

                            Test_FVSEM.select_by_idSession(idSession)
                            .then(([test_fvsem]) => {
                                b_test_fvsem = test_fvsem.length > 0;

                                Test_BNT_15.select_by_idSession(idSession)
                                .then(([test_bnt_15]) => {
                                    b_test_bnt_15 = test_bnt_15.length > 0;

                                    Test_Words_List.select_by_idSession(idSession)
                                    .then(([test_words_list]) => {
                                        b_test_words_list = test_words_list.length > 0;

                                        Test_Trial_Making_Test.select_by_idSession(idSession)
                                        .then(([test_trial_making_test]) => {
                                            b_test_trial_making_test = test_trial_making_test.length > 0;
                                                            
                                            res.render('clinician/test-screens/common/navigation/navigation-left-list-of-tests', {
                                                idsession : idSession,
                                                session_name : session_name,
                                                test_moca : b_test_moca,
                                                test_gds_15 : b_test_gds_15,
                                                test_stroop_victoria_2 : b_test_stroop_victoria_2,
                                                test_digital_span : b_test_digital_span,
                                                test_fvsem : b_test_fvsem,
                                                test_fvlex : b_test_fvlex,
                                                test_bnt_15 : b_test_bnt_15,
                                                test_words_list : b_test_words_list,
                                                test_trial_making_test : b_test_trial_making_test                          
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
}

exports.getLoadListOfTestsFluences = (req, res, next) => {
    if (session.checkSession(req, 2)) { 
        idSession = Number(req.query.idsession);
        let session_name = req.query.sessionname;
        
        let b_test_fvlex = false;
        let b_test_fvsem = false;

        Test_FVLEX.select_by_idSession(idSession)
        .then(([test_fvlex]) => {
            b_test_fvlex = test_fvlex.length > 0;

            Test_FVSEM.select_by_idSession(idSession)
            .then(([test_fvsem]) => {
                b_test_fvsem = test_fvsem.length > 0;
                                                                
                res.render('clinician/test-screens/common/navigation/navigation-left-list-of-tests-fluences', {
                    idsession : idSession,
                    session_name : session_name,
                    test_fvlex : b_test_fvlex,
                    test_fvsem : b_test_fvsem
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
}

exports.getLoadListOfTestsUserEvaluation = (req, res, next) => {
    if (session.checkSession(req, 2)) { 
        idSession = Number(req.query.idsession);
        let session_name = req.query.sessionname;
        
        let b_test_eval_acc_version_1 = false;
        let b_test_eval_acc_version_2 = false;

        Test_Eval_Acc.select_by_idSession(idSession)
        .then(([test_eval_acc_version_1]) => {
            b_test_eval_acc_version_1 = test_eval_acc_version_1.length > 0;

            Test_Eval_Acc_V2.select_by_idSession(idSession)
            .then(([test_eval_acc_version_2]) => {
                b_test_eval_acc_version_2 = test_eval_acc_version_2.length > 0;
                                                                
                res.render('clinician/test-screens/common/navigation/navigation-left-list-of-tests-user-evaluation', {
                    idsession : idSession,
                    session_name : session_name,
                    test_eval_acc_version_1 : b_test_eval_acc_version_1,
                    test_eval_acc_version_2 : b_test_eval_acc_version_2
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
}

exports.getLoadListOfTestsUPD_RMC = (req, res, next) => {
    if (session.checkSession(req, 2)) { 
        idSession = Number(req.query.idsession);
        let session_name = req.query.sessionname;
        
        let b_test_moca = false;
        let b_test_gds_15 = false;
        let b_test_stroop_victoria_2 = false;
        let b_test_digital_span = false;
        let b_test_fvsem = false;
        let b_test_fvlex = false;
        let b_test_bnt_15 = false;
        let b_test_words_list = false;        

        Test_MOCA.select_by_idSession(idSession)
        .then(([test_moca]) => {
            b_test_moca = test_moca.length > 0;

            Test_GDS.select_by_idSession(idSession)
            .then(([test_gds]) => {
                b_test_gds_15 = test_gds.length > 0;

                Test_Stroop_Victoria_2.select_by_idSession(idSession)
                .then(([test_stroop_victoria_2]) => {
                    b_test_stroop_victoria_2 = test_stroop_victoria_2.length > 0;

                    Test_Digital_Span.select_by_idSession(idSession)
                    .then(([test_digital_span]) => {
                        b_test_digital_span = test_digital_span.length > 0;

                        Test_FVLEX.select_by_idSession(idSession)
                        .then(([test_fvlex]) => {
                            b_test_fvlex = test_fvlex.length > 0;

                            Test_FVSEM.select_by_idSession(idSession)
                            .then(([test_fvsem]) => {
                                b_test_fvsem = test_fvsem.length > 0;

                                Test_BNT_15.select_by_idSession(idSession)
                                .then(([test_bnt_15]) => {
                                    b_test_bnt_15 = test_bnt_15.length > 0;

                                    Test_Words_List.select_by_idSession(idSession)
                                    .then(([test_words_list]) => {
                                        b_test_words_list = test_words_list.length > 0;
                                                            
                                        res.render('clinician/test-screens/common/navigation/navigation-left-list-of-tests-upd-rmc', {
                                            idsession : idSession,
                                            session_name : session_name,
                                            test_moca : b_test_moca,
                                            test_gds_15 : b_test_gds_15,
                                            test_stroop_victoria_2 : b_test_stroop_victoria_2,
                                            test_digital_span : b_test_digital_span,
                                            test_fvsem : b_test_fvsem,
                                            test_fvlex : b_test_fvlex,
                                            test_bnt_15 : b_test_bnt_15,
                                            test_words_list : b_test_words_list                              
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
}

exports.updateCommentaires = (req, res, next) => {    
    if (session.checkSession(req, 2)) {
        let idSession = Number(req.body.idsession);
        let commentaires = req.body.commentaires;

        MySession.update_commentaires_by_id(idSession, commentaires)
        .then(() => {
            MySession.select_by_id(idSession)
            .then(([mysession]) => {
                if (mysession.length == 1) {
                    let pathSession = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                    Patient.select_by_idUser(mysession[0].id_patient)
                    .then(([patient]) => {
                        if (patient.length == 1) {                            
                            idPathFolder = patient[0].id_path_folder;

                            MyJson.updateData(idPathFolder, pathSession, "Commentaires", { 
                                "content" : commentaires
                            })

                            res.render('empty', {                                
                            });                            
                        }
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }    
}

exports.updateConclusions = (req, res, next) => {    
    if (session.checkSession(req, 2)) {
        let idSession = Number(req.body.idsession);
        let commentaires = req.body.commentaires;

        Test_DeepSpa.select_conclusions_by_idSession(idSession)
        .then(([test_deepspa]) => {
            if (test_deepspa.length == 1) {
                Test_DeepSpa.update_conclusions_du_patient_by_idSession(idSession, test_deepspa[0].partie | 1, commentaires)
                .then(() => {
                    MySession.select_by_id(idSession)
                    .then(([mysession]) => {
                        if (mysession.length == 1) {
                            let pathSession = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                            Patient.select_by_idUser(mysession[0].id_patient)
                            .then(([patient]) => {
                                if (patient.length == 1) {                            
                                    idPathFolder = patient[0].id_path_folder;

                                    MyJson.updateData(idPathFolder, pathSession, "DeepSpa", { 
                                        "Conclusions_Commentaires" : commentaires
                                    })

                                    res.render('empty', {                                
                                    });                            
                                }
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            } else {
                let test_deepspa = new Test_DeepSpa(null, idSession, 1, 0, "", 0, "", "", commentaires);              
                test_deepspa
                .insert()
                .then((results) => {
                    MySession.select_by_id(idSession)
                    .then(([mysession]) => {
                        if (mysession.length == 1) {
                            let pathSession = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                            Patient.select_by_idUser(mysession[0].id_patient)
                            .then(([patient]) => {
                                if (patient.length == 1) {                            
                                    idPathFolder = patient[0].id_path_folder;

                                    MyJson.updateData(idPathFolder, pathSession, "DeepSpa", { 
                                        "Conclusions_Commentaires" : commentaires
                                    });

                                    res.render('empty', {                                
                                    });
                                }
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
    }    
}

exports.updateDiscussionLibre = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        let idSession = Number(req.body.idsession);
        let commentaires = req.body.commentaires;

        Test_DeepSpa.select_entretien_clinique_by_idSession(idSession)
        .then(([test_deepspa]) => {
            if (test_deepspa.length == 1) {
                Test_DeepSpa.update_entretien_clinique_by_idSession(idSession, test_deepspa[0].partie | 8, test_deepspa[0].entretien_clinique_number_files, commentaires)
                .then(() => {
                    MySession.select_by_id(idSession)
                    .then(([mysession]) => {
                        if (mysession.length == 1) {
                            let pathSession = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                            Patient.select_by_idUser(mysession[0].id_patient)
                            .then(([patient]) => {
                                if (patient.length == 1) {                            
                                    idPathFolder = patient[0].id_path_folder;

                                    MyJson.updateData(idPathFolder, pathSession, "DeepSpa", {
                                        "Entretien_Clinique_Commentaires" : commentaires
                                    });

                                    res.render('empty', {                                
                                    });
                                }
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            } else {
                let test_deepspa = new Test_DeepSpa(null, idSession, 8, 0, commentaires, 0, "", "", "");              
                test_deepspa
                .insert()
                .then((results) => {
                    MySession.select_by_id(idSession)
                    .then(([mysession]) => {
                        if (mysession.length == 1) {
                            let pathSession = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                            Patient.select_by_idUser(mysession[0].id_patient)
                            .then(([patient]) => {
                                if (patient.length == 1) {                            
                                    idPathFolder = patient[0].id_path_folder;

                                    MyJson.updateData(idPathFolder, pathSession, "DeepSpa", {
                                        "Entretien_Clinique_Commentaires" : commentaires
                                    });

                                    res.render('empty', {                                
                                    });
                                }
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
    }
}

exports.updateHistoireMedicale = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        let idSession = Number(req.body.idsession);
        let commentaires = req.body.commentaires;

        Test_Entr_Clin.select_by_idSession(idSession)
        .then(([test_entr_clin]) => {
            if (test_entr_clin.length == 1) {
                Test_Entr_Clin.update_histoire_medicale_commentaires_by_idSession(idSession, commentaires)
                .then(() => {
                    MySession.select_by_id(idSession)
                    .then(([mysession]) => {
                        if (mysession.length == 1) {
                            let pathSession = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                            Patient.select_by_idUser(mysession[0].id_patient)
                            .then(([patient]) => {
                                if (patient.length == 1) {                            
                                    idPathFolder = patient[0].id_path_folder;

                                    MyJson.updateData(idPathFolder, pathSession, "Entr_Clin", { 
                                        "Histoire_Medicale_Commentaires" : commentaires
                                    });

                                    res.render('empty', {                                
                                    });
                                }
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            } else {
                let test_entr_clin = new Test_Entr_Clin(null, idSession, 64, commentaires, 0, "", 0, "", "", 0, 0, 0, 0, 0, "", 0, 0, 0);              
                test_entr_clin
                .insert()
                .then((results) => {
                    MySession.select_by_id(idSession)
                    .then(([mysession]) => {
                        if (mysession.length == 1) {
                            let pathSession = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                            Patient.select_by_idUser(mysession[0].id_patient)
                            .then(([patient]) => {
                                if (patient.length == 1) {                            
                                    idPathFolder = patient[0].id_path_folder;

                                    MyJson.updateData(idPathFolder, pathSession, "Entr_Clin", { 
                                        "Histoire_Medicale_Commentaires" : commentaires
                                    });

                                    res.render('empty', {                                
                                    });
                                }
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
    }
}

exports.updateHistoriqueDuPatient = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        let idSession = Number(req.body.idsession);
        let commentaires = req.body.commentaires;

        Test_DeepSpa.select_historique_du_patient_by_idSession(idSession)
        .then(([test_deepspa]) => {
            if (test_deepspa.length == 1) {
                Test_DeepSpa.update_historique_du_patient_by_idSession(idSession, test_deepspa[0].partie | 2, commentaires)
                .then(() => {
                    MySession.select_by_id(idSession)
                    .then(([mysession]) => {
                        if (mysession.length == 1) {
                            let pathSession = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                            Patient.select_by_idUser(mysession[0].id_patient)
                            .then(([patient]) => {
                                if (patient.length == 1) {                            
                                    idPathFolder = patient[0].id_path_folder;

                                    MyJson.updateData(idPathFolder, pathSession, "DeepSpa", { 
                                        "Historique_Du_Patient_Commentaires" : commentaires
                                    });

                                    res.render('empty', {                                
                                    });
                                }
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            } else {
                let test_deepspa = new Test_DeepSpa(null, idSession, 2, 0, "", 0, "", commentaires, "");              
                test_deepspa
                .insert()
                .then((results) => {
                    MySession.select_by_id(idSession)
                    .then(([mysession]) => {
                        if (mysession.length == 1) {
                            let pathSession = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                            Patient.select_by_idUser(mysession[0].id_patient)
                            .then(([patient]) => {
                                if (patient.length == 1) {                            
                                    idPathFolder = patient[0].id_path_folder;

                                    MyJson.updateData(idPathFolder, pathSession, "DeepSpa", { 
                                        "Historique_Du_Patient_Commentaires" : commentaires
                                    });

                                    res.render('empty', {                                
                                    });
                                }
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
    }
}

exports.updateRaconterJournee = (req, res, next) => {
    if (session.checkSession(req, 2)) {
        let idSession = Number(req.body.idsession);
        let commentaires = req.body.commentaires;

        Test_DeepSpa.select_raconter_journee_by_idSession(idSession)
        .then(([test_deepspa]) => {
            if (test_deepspa.length == 1) {               
                Test_DeepSpa.update_raconter_journee_by_idSession(idSession, test_deepspa[0].partie | 4, test_deepspa[0].raconter_journee_number_files, commentaires)
                .then(() => {
                    MySession.select_by_id(idSession)
                    .then(([mysession]) => {
                        if (mysession.length == 1) {
                            let pathSession = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                            Patient.select_by_idUser(mysession[0].id_patient)
                            .then(([patient]) => {
                                if (patient.length == 1) {                            
                                    idPathFolder = patient[0].id_path_folder;

                                    MyJson.updateData(idPathFolder, pathSession, "DeepSpa", { 
                                        "Raconter_Journee_Commentaires" : commentaires
                                    });

                                    res.render('empty', {                                
                                    });
                                }
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            } else {
                let test_deepspa = new Test_DeepSpa(null, idSession, 4, 0, "", 0, commentaires, "", "");              
                test_deepspa
                .insert()
                .then((results) => {
                    MySession.select_by_id(idSession)
                    .then(([mysession]) => {
                        if (mysession.length == 1) {
                            let pathSession = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                            Patient.select_by_idUser(mysession[0].id_patient)
                            .then(([patient]) => {
                                if (patient.length == 1) {                            
                                    idPathFolder = patient[0].id_path_folder;

                                    MyJson.updateData(idPathFolder, pathSession, "DeepSpa", { 
                                        "Raconter_Journee_Commentaires" : commentaires
                                    });

                                    res.render('empty', {                                
                                    });
                                }
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
    }
}