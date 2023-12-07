
const express = require('express');
const multer  = require('multer') //use multer to upload blob data

const reportTest31MOCA = require('../controllers/reports/test31_moca');
const reportTest32D2 = require('../controllers/reports/test32_d2');
const reportTest33WAIS_IV = require('../controllers/reports/test33_wais_iv');
const reportTest34Zoo = require('../controllers/reports/test34_zoo');
const reportTest35CodeWAIS = require('../controllers/reports/test35_code_wais');
const reportTest36NPI = require('../controllers/reports/test36_npi');
const reportTest37DigitalSpan = require('../controllers/reports/test37_digital_span');
const reportTest38BNT15 = require('../controllers/reports/test38_bnt_15');
const reportTest39WordsList = require('../controllers/reports/test39_words_list');
const reportTest40StroopVictoria2 = require('../controllers/reports/test40_stroop_victoria_2');

const clinicianController = require('../controllers/clinician');

const router = express.Router();

const MyGlobals = require('../controllers/common/globals');

/////////// Test30 - MEMPHESTO-Interview /////////////////////////////////////////////

var storage_test30_memphesto_interview = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDClinicianAndTest_ClinicianInformationForUpload(req.session.iduser, "MEMPHESTO_Interview"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_memphesto_interview = multer({ storage : storage_test30_memphesto_interview});

router.post('/upload-singlefile-memphesto-interview', upload_memphesto_interview.single("video"), clinicianController.postUploadSingleFile);

////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/', clinicianController.getAllPatients);
router.get('/list-patients', clinicianController.getAllPatients);

// /clinician/add-clinician => GET
router.get('/add-clinician', clinicianController.getAddClinician);

// /clinician/add-patient => GET
router.get('/add-patient', clinicianController.getAddPatient);
// /clinician/add-patient => POST
router.post('/add-patient', clinicianController.postAddPatient);

// /clinician/edit-patient => GET
router.get('/edit-patient', clinicianController.getEditPatient);
//clinician/edit-patient => POST
router.post('/edit-patient', clinicianController.postEditPatient);

// /clinician/generate-report => GET
router.get('/generate-report', clinicianController.getGenerateReport);
// /clinician/generate-report-upd-rmc => GET
router.get('/generate-report-upd-rmc', clinicianController.getGenerateReportUPDRMC);
// /clinician/generate-report-upd-rmc-detail => GET
router.get('/generate-report-upd-rmc-detail', clinicianController.getGenerateReportUPDRMCDetail);

// /clinician/report-patient => GET
router.get('/report-patient', clinicianController.getReportPatient);
// /clinician/report-session => GET
router.get('/report-session', clinicianController.getReportSession);
// /clinician/report-etude-clinique-deepspa => GET
router.get('/report-etude-clinique-deepspa', clinicianController.getReportEtudeCliniqueDeepspa);
// /clinician/report-tests-effectues => GET
router.get('/report-tests-effectues', clinicianController.getReportTestsEffectues);
// /clinician/report-all-tests => GET
router.get('/report-all-tests', clinicianController.getReportAllTests);
// /clinician/report-test09-fvlex-p => GET
router.get('/report-test09-fvlex-p', clinicianController.getReportTest09FVLEX_P);
// /clinician/report-test09-fvlex-r => GET
router.get('/report-test09-fvlex-r', clinicianController.getReportTest09FVLEX_R);
// /clinician/report-test10-fvsem-animaux => GET
router.get('/report-test10-fvsem-animaux', clinicianController.getReportTest10FVSEM_Animaux);
// /clinician/report-test10-fvsem-fruits => GET
router.get('/report-test10-fvsem-fruits', clinicianController.getReportTest10FVSEM_Fruits);
// /clinician/report-test24-gds => GET
router.get('/report-test24-gds', clinicianController.getReportTest24GDS);
// /clinician/report-test31-moca => GET
router.get('/report-test31-moca', reportTest31MOCA.getReportTest31MOCA);
// /clinician/report-test31-moca => GET
router.post('/report-test31-moca-update', reportTest31MOCA.getReportTest31MOCAUpdate);
// /clinician/report-test32-d2 => GET
router.get('/report-test32-d2', reportTest32D2.getReportTest32D2);
// /clinician/report-test33-wais-iv => GET
router.get('/report-test33-wais-iv', reportTest33WAIS_IV.getReportTest33WAIS_IV);
// /clinician/report-test34-zoo => GET
router.get('/report-test34-zoo', reportTest34Zoo.getReportTest34Zoo);
// /clinician/report-test35-code-wais => GET
router.get('/report-test35-code-wais', reportTest35CodeWAIS.getReportTest35CodeWAIS);
// /clinician/report-test36-mmse-spa => GET
router.get('/report-test36-npi', reportTest36NPI.getReportTest36NPI);
// /clinician/report-test37-digital-span => GET
router.get('/report-test37-digital-span', reportTest37DigitalSpan.getReportTest37DigitalSpan);
// /clinician/report-test38-bnt-15 => GET
router.get('/report-test38-bnt-15', reportTest38BNT15.getReportTest38BNT15);
// /clinician/report-test39-words-list => GET
router.get('/report-test39-words-list', reportTest39WordsList.getReportTest39WordsList);
// /clinician/report-test40-stroop-victoria-2 => GET
router.get('/report-test40-stroop-victoria-2', reportTest40StroopVictoria2.getReportTest40StroopVictoria2);

//clinician/remove-clinician => GET
router.get('/remove-patient', clinicianController.getRemovePatient);
//clinician/remove-session => GET
router.get('/remove-session', clinicianController.getRemoveSession);

router.get('/open-room', clinicianController.getOpenRoom);
router.get('/refresh-room', clinicianController.getRefreshRoom);

router.get('/connection-already-exists', clinicianController.getConnectionAlreadyExists);

module.exports = router;