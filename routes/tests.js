
const express = require('express');

const testController = require('../controllers/test');

const router = express.Router();

// /tests/mainnavigator => GET
router.get('/mainnavigator', testController.tests_ShowMainNavigator);

// /tests/inputtest => GET
router.get('/inputtests', testController.tests_InputForm);

router.get('/fvlex', testController.test09_FVLEX_GetPage);
router.get('/fvsem', testController.test10_FVSEM_GetPage);
router.get('/entr_clin', testController.test14_Entr_Clin_GetPage);
router.get('/gds', testController.test24_GDS_GetPage);
router.get('/deepspa', testController.test26_DeepSpa_GetPage);
router.get('/moca', testController.test31_MOCA_GetPage);
router.get('/digital_span', testController.test37_Digital_Span_GetPage);
router.get('/bnt_15', testController.test38_BNT_15_GetPage);
router.get('/words_list', testController.test39_Words_List_GetPage);
router.get('/stroop_victoria_2', testController.test40_Stroop_Victoria_2_GetPage);

module.exports = router;