const session = require('./common/session');

const Test09_FVLEX_ShowPage = require('./tests/test09_fvlex');
const Test10_FVSEM_ShowPage = require('./tests/test10_fvsem');
const Test14_Entr_Clin_ShowPage = require('./tests/test14_entr_clin');
const Test24_GDS_ShowPage = require('./tests/test24_gds');
const Test26_DeepSpa_ShowPage = require('./tests/test26_deepspa');
const Test31_MOCA_ShowPage = require('./tests/test31_moca');
const Test37_Digital_Span_ShowPage = require('./tests/test37_digital_span');
const Test38_BNT_15_ShowPage = require('./tests/test38_bnt_15');
const Test39_Words_List_ShowPage = require('./tests/test39_words_list');
const Test40_Stroop_Victoria_2_ShowPage = require('./tests/test40_stroop_victoria_2');
const Test41_Trial_Making_Test_ShowPage = require('./tests/test41_trial_making_test');

exports.tests_ShowMainNavigator = (req, res, next) => {    
    if (session.checkSession(req, 2)) {
        res.render('clinician/test-screens/common/navigation/navigation-left');
    }
};

exports.tests_InputForm = (req, res, next) => {
    if (session.checkSession(req, 2)) {      
        let test = req.query.test;
        let session_name = req.query.sessionname;

        if (test === "test09_fvlex") {
            res.render('clinician/test-screens/common/test09_fvlex', {
                session_name : session_name,
                languages: ['fr', 'de'],
                default_language: 'fr',
                run_button_id: 'Test09_FVLEX',
                back_id: 'BackListTests_FVLEX'
            });
        } else if (test === "test09_fvlex_sc1") {
            res.render('clinician/test-screens/common/test09_fvlex', {
                session_name : session_name,
                languages: ['fr', 'de'],
                default_language: 'de',
                run_button_id: 'Test09_FVLEX_SC1',
                back_id: 'BackListTests_FVLEX_SC1'
            });
        } else if (test === "test10_fvsem") {
            res.render('clinician/test-screens/common/test10_fvsem', {
                session_name : session_name,
                languages: ['fr', 'de'],
                default_language: 'fr',
                run_button_id: 'Test10_FVSEM',
                back_id: 'BackListTests_FVSEM'
            });
        } else if (test === "test10_fvsem_sc1") {
            res.render('clinician/test-screens/common/test10_fvsem', {
                session_name : session_name,
                languages: ['fr', 'de'],
                default_language: 'de',
                run_button_id: 'Test10_FVSEM_SC1',
                back_id: 'BackListTests_FVSEM_SC1'
            });
        } else if (test === "test14_entr_clin") {
            res.render('clinician/test-screens/common/test14_entr_clin', {
                session_name : session_name
            });
        } else if (test === "test24_gds") {
            res.render('clinician/test-screens/common/test24_gds', {
                session_name : session_name,
                languages: ['fr', 'de'],
                default_language: 'fr',
                run_button_id: 'Test24_GDS',
                back_id: 'BackListTests_GDS'
            });
        } else if (test === "test24_gds_sc1") {
            res.render('clinician/test-screens/common/test24_gds', {
                session_name : session_name,
                languages: ['fr', 'de'],
                default_language: 'de',
                run_button_id: 'Test24_GDS_SC1',
                back_id: 'BackListTests_GDS_SC1'
            });
        } else if (test === "test31_moca") {
            res.render('clinician/test-screens/common/test31_moca', {
                session_name : session_name,
                languages: ['fr', 'de'],
                default_language: 'fr',
                run_button_id: 'Test31_MOCA',
                back_id: 'BackListTests_MOCA'
            });
        } else if (test === "test31_moca_sc1") {
            res.render('clinician/test-screens/common/test31_moca', {
                session_name : session_name,
                languages: ['fr', 'de'],
                default_language: 'de',
                run_button_id: 'Test31_MOCA_SC1',
                back_id: 'BackListTests_MOCA_SC1'
            });
        } else if (test === "test37_digital_span") {
            res.render('clinician/test-screens/common/test37_digital_span', {
                session_name : session_name,
                languages: ['de'],
                default_language: 'de',
                run_button_id: 'Test37_Digital_Span',
                back_id: 'BackListTests_Digital_Span'
            });
        } else if (test === "test37_digital_span_sc1") {
            res.render('clinician/test-screens/common/test37_digital_span', {
                session_name : session_name,
                languages: ['de'],
                default_language: 'de',
                run_button_id: 'Test37_Digital_Span_SC1',
                back_id: 'BackListTests_Digital_Span_SC1'
            });
        } else if (test === "test38_bnt_15") {
            res.render('clinician/test-screens/common/test38_bnt_15', {
                session_name : session_name,
                languages: ['de'],
                default_language: 'de',
                run_button_id: 'Test38_BNT_15',
                back_id: 'BackListTests_BNT_15'
            });
        } else if (test === "test38_bnt_15_sc1") {
            res.render('clinician/test-screens/common/test38_bnt_15', {
                session_name : session_name,
                languages: ['de'],
                default_language: 'de',
                run_button_id: 'Test38_BNT_15_SC1',
                back_id: 'BackListTests_BNT_15_SC1'
            });
        } else if (test === "test39_words_list") {
            res.render('clinician/test-screens/common/test39_words_list', {
                session_name : session_name,
                languages: ['de'],
                default_language: 'de',
                run_button_id: 'Test39_Words_List',
                back_id: 'BackListTests_Words_List'
            });
        } else if (test === "test39_words_list_sc1") {
            res.render('clinician/test-screens/common/test39_words_list', {
                session_name : session_name,
                languages: ['de'],
                default_language: 'de',
                run_button_id: 'Test39_Words_List_SC1',
                back_id: 'BackListTests_Words_List_SC1'
            });
        } else if (test === "test40_stroop_victoria_2") {
            res.render('clinician/test-screens/common/test40_stroop_victoria_2', {
                session_name : session_name,
                languages: ['de'],
                default_language: 'de',
                run_button_id: 'Test40_Stroop_Victoria_2',
                back_id: 'BackListTests_Stroop_Victoria_2'
            });
        } else if (test === "test40_stroop_victoria_2_sc1") {
            res.render('clinician/test-screens/common/test40_stroop_victoria_2', {
                session_name : session_name,
                languages: ['de'],
                default_language: 'de',
                run_button_id: 'Test40_Stroop_Victoria_2_SC1',
                back_id: 'BackListTests_Stroop_Victoria_2_SC1'
            });
        } else if (test === "test41_trial_making_test") {
            res.render('clinician/test-screens/common/test41_trial_making_test', {
                session_name : session_name,
                languages: ['de'],
                default_language: 'de',
                run_button_id: 'Test41_Trial_Making_Test',
                back_id: 'BackListTests_Trial_Making_Test'
            });
        }
    }
};

exports.test09_FVLEX_GetPage = (req, res, next) => {
    Test09_FVLEX_ShowPage.test09_fvlex_showpage(req, res);
};

exports.test10_FVSEM_GetPage = (req, res, next) => {    
    Test10_FVSEM_ShowPage.test10_fvsem_showpage(req, res);
};

exports.test14_Entr_Clin_GetPage = (req, res, next) => {
    Test14_Entr_Clin_ShowPage.test14_entr_clin_showpage(req, res);
};

exports.test24_GDS_GetPage = (req, res, next) => {
    Test24_GDS_ShowPage.test24_gds_showpage(req, res);
};

exports.test26_DeepSpa_GetPage = (req, res, next) => {
    Test26_DeepSpa_ShowPage.test26_deepspa_showpage(req, res);
};

exports.test31_MOCA_GetPage = (req, res, next) => {
    Test31_MOCA_ShowPage.test31_moca_showpage(req, res);
};

exports.test37_Digital_Span_GetPage = (req, res, next) => {
    Test37_Digital_Span_ShowPage.test37_digital_span_showpage(req, res);
};

exports.test38_BNT_15_GetPage = (req, res, next) => {
    Test38_BNT_15_ShowPage.test38_bnt_15_showpage(req, res);
};

exports.test39_Words_List_GetPage = (req, res, next) => {
    Test39_Words_List_ShowPage.test39_words_list_showpage(req, res);
};

exports.test40_Stroop_Victoria_2_GetPage = (req, res, next) => {
    Test40_Stroop_Victoria_2_ShowPage.test40_stroop_victoria_2_showpage(req, res);
};

exports.test41_Trial_Making_Test_GetPage = (req, res, next) => {
    Test41_Trial_Making_Test_ShowPage.test41_trial_making_test_showpage(req, res);
};