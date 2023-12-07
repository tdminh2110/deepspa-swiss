const express = require('express');
const multer  = require('multer') //use multer to upload blob data

const router = express.Router();

const patientController = require('../controllers/patient');

const MyGlobals = require('../controllers/common/globals');

/////////// Take a Photo /////////////////////////////////////////////

var storage_take_photo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "TakePhoto"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_take_photo = multer({ storage : storage_take_photo});

router.post('/upload-singlefile-snapshot', upload_take_photo.single("image"), patientController.postUploadSingleFile);

/////////// Test01 - DO80 /////////////////////////////////////////////

const DO80_NUMBER_OF_IMAGES = 80;

var storage_test01_do80 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "DO80"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_do80 = multer({ storage : storage_test01_do80});

router.post('/upload-multifiles-do80', upload_do80.array("audios", DO80_NUMBER_OF_IMAGES + 1), patientController.postUploadMultiFiles);

/////////// Test02 - BDAE_CTPD /////////////////////////////////////////////

var storage_test02_bdae_ctpd = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "BDAE_CTPD"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_bdae_ctpd = multer({ storage : storage_test02_bdae_ctpd});

router.post('/upload-singlefile-bdae_ctpd', upload_bdae_ctpd.single("video"), patientController.postUploadSingleFile);

/////////// Test03 - NegPosQ /////////////////////////////////////////////

var storage_test03_negposq = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "NegPosQ"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_negposq = multer({ storage : storage_test03_negposq});

router.post('/upload-singlefile-negposq', upload_negposq.single("video"), patientController.postUploadSingleFile);

/////////// Test05 - 5Mots /////////////////////////////////////////////

var storage_test05_5mots = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "5Mots"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_5mots = multer({ storage : storage_test05_5mots});

router.post('/upload-singlefile-5mots', upload_5mots.single("audio"), patientController.postUploadSingleFile);

/////////// Test06 - MMSE /////////////////////////////////////////////

var storage_test06_mmse = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "MMSE"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_mmse = multer({ storage : storage_test06_mmse});

router.post('/upload-singlefile-mmse', upload_mmse.single("video"), patientController.postUploadSingleFile);

/////////// Test07 - Empan /////////////////////////////////////////////

var storage_test07_empan = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "Empan"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_empan = multer({ storage : storage_test07_empan});

router.post('/upload-singlefile-empan', upload_empan.single("audio"), patientController.postUploadSingleFile);

/////////// Test08 - Gro-Bus /////////////////////////////////////////////

const GRO_BUS_NUMBER_OF_AUDIOS = 4;

var storage_test08_gro_bus = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "Gro_Bus"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_gro_bus = multer({ storage : storage_test08_gro_bus});

router.post('/upload-multifiles-gro_bus', upload_gro_bus.array("audios", GRO_BUS_NUMBER_OF_AUDIOS + 1), patientController.postUploadMultiFiles);

/////////// Test09 - FVLEX /////////////////////////////////////////////

var storage_test09_fvlex = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "FVLEX"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_fvlex = multer({ storage : storage_test09_fvlex});

router.post('/upload-singlefile-fvlex', upload_fvlex.single("video"), patientController.postUploadSingleFile);

/////////// Test10 - FVSEM /////////////////////////////////////////////

var storage_test10_fvlex = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "FVSEM"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_fvsem = multer({ storage : storage_test10_fvlex});

router.post('/upload-singlefile-fvsem', upload_fvsem.single("video"), patientController.postUploadSingleFile);

/////////// Test11 - DENO LEXIS /////////////////////////////////////////////

const DENO_LEXIS_NUMBER_OF_IMAGES = 64;

var storage_test11_deno_lexis = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "DENO_LEXIS"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_deno_lexis = multer({ storage : storage_test11_deno_lexis});

router.post('/upload-multifiles-deno_lexis', upload_deno_lexis.array("audios", DENO_LEXIS_NUMBER_OF_IMAGES + 1), patientController.postUploadMultiFiles);

/////////// Test12 - Pra_Ges /////////////////////////////////////////////

var storage_test12_pra_ges = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "Pra_Ges"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_pra_ges = multer({ storage : storage_test12_pra_ges});

router.post('/upload-singlefile-pra_ges', upload_pra_ges.single("video"), patientController.postUploadSingleFile);

/////////// Test13 - Stroop /////////////////////////////////////////////

const STROOP_NUMBER_OF_AUDIOS = 3;

var storage_test13_stroop = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "Stroop"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_stroop = multer({ storage : storage_test13_stroop});

router.post('/upload-multifiles-stroop', upload_stroop.array("audios", STROOP_NUMBER_OF_AUDIOS + 1), patientController.postUploadMultiFiles);

/////////// Test14 - Entr_Clin /////////////////////////////////////////////

var storage_test14_entr_clin = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "Entr_Clin"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_entr_clin = multer({ storage : storage_test14_entr_clin});

router.post('/upload-singlefile-entr_clin', upload_entr_clin.single("video"), patientController.postUploadSingleFile);

/////////// Test17 - Stroop Vectoria /////////////////////////////////////////////

const STROOP_VECTORIA_NUMBER_OF_AUDIOS = 3;

var storage_test17_stroop_vectoria = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "Stroop_Vectoria"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_stroop_vectoria = multer({ storage : storage_test17_stroop_vectoria});

router.post('/upload-multifiles-stroop-vectoria', upload_stroop_vectoria.array("audios", STROOP_VECTORIA_NUMBER_OF_AUDIOS + 1), patientController.postUploadMultiFiles);

/////////// Test18 - GERIA-12 /////////////////////////////////////////////

const GERIA_12_NUMBER_OF_AUDIOS = 4;

var storage_test18_geria_12 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "GERIA-12"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_geria_12 = multer({ storage : storage_test18_geria_12});

router.post('/upload-multifiles-geria-12', upload_geria_12.array("audios", GERIA_12_NUMBER_OF_AUDIOS + 1), patientController.postUploadMultiFiles);

/////////// Test20 - BREF /////////////////////////////////////////////

var storage_test20_bref = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "BREF"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_bref = multer({ storage : storage_test20_bref});

router.post('/upload-singlefile-bref', upload_bref.single("video"), patientController.postUploadSingleFile);

/////////// Test21 - Visio Const /////////////////////////////////////////////

var storage_test21_visio_const = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "Visio-Const"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_visio_const = multer({ storage : storage_test21_visio_const});

router.post('/upload-singlefile-visio_const', upload_visio_const.single("video"), patientController.postUploadSingleFile);

/////////// Test22 - DLTA /////////////////////////////////////////////

var storage_test22_dlta = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "DLTA"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_dlta = multer({ storage : storage_test22_dlta});

router.post('/upload-singlefile-dlta', upload_dlta.single("video"), patientController.postUploadSingleFile);

/////////// Test26 - DeepSpa /////////////////////////////////////////////

var storage_test26_deepspa = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "DeepSpa"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_deepspa = multer({ storage : storage_test26_deepspa});

router.post('/upload-singlefile-deepspa', upload_deepspa.single("video"), patientController.postUploadSingleFile);

/////////// Test27 - Dessin Horloge /////////////////////////////////////////////

const DESSIN_HORLOGE_NUMBER_OF_VIDEOS = 2;

var storage_test27_dessin_horloge = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "Dessin_Horloge"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_dessin_horloge = multer({ storage : storage_test27_dessin_horloge});

router.post('/upload-multifiles-dessin_horloge', upload_dessin_horloge.array("videos", DESSIN_HORLOGE_NUMBER_OF_VIDEOS + 1), patientController.postUploadMultiFiles);

/////////// Test29 - MMSE-spa /////////////////////////////////////////////

var storage_test29_mmse_spa = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "MMSE-spa"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_mmse_spa = multer({ storage : storage_test29_mmse_spa});

router.post('/upload-singlefile-mmse-spa', upload_mmse_spa.single("video"), patientController.postUploadSingleFile);

/////////// Test30 - MEMPHESTO-Interview /////////////////////////////////////////////

var storage_test30_memphesto_interview = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "MEMPHESTO_Interview"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_memphesto_interview = multer({ storage : storage_test30_memphesto_interview});

router.post('/upload-singlefile-memphesto-interview', upload_memphesto_interview.single("video"), patientController.postUploadSingleFile);

/////////// Test31 - MOCA /////////////////////////////////////////////

var storage_test31_moca = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "MOCA"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_moca = multer({ storage : storage_test31_moca});

router.post('/upload-singlefile-moca', upload_moca.single("video"), patientController.postUploadSingleFile);

/////////// Test32 - D2 /////////////////////////////////////////////

var storage_test32_d2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "D2"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_d2 = multer({ storage : storage_test32_d2});

router.post('/upload-singlefile-d2', upload_d2.single("video"), patientController.postUploadSingleFile);

/////////// Test33 - WAIS IV /////////////////////////////////////////////

var storage_test33_wais_iv = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "WAIS_IV"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_wais_iv = multer({ storage : storage_test33_wais_iv});

router.post('/upload-singlefile-wais-iv', upload_wais_iv.single("video"), patientController.postUploadSingleFile);

/////////// Test34 - Zoo /////////////////////////////////////////////

var storage_test34_zoo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "Zoo"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_zoo = multer({ storage : storage_test34_zoo});

router.post('/upload-singlefile-zoo', upload_zoo.single("video"), patientController.postUploadSingleFile);

/////////// Test35 - Code WAIS /////////////////////////////////////////////

var storage_test35_code_wais = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "Code_WAIS"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_code_wais = multer({ storage : storage_test35_code_wais});

router.post('/upload-singlefile-code-wais', upload_code_wais.single("video"), patientController.postUploadSingleFile);

/////////// Test36 - NPI /////////////////////////////////////////////

var storage_test36_npi = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "NPI"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_npi = multer({ storage : storage_test36_npi});

router.post('/upload-singlefile-npi', upload_npi.single("video"), patientController.postUploadSingleFile);

/////////// Test37 - Digital Span /////////////////////////////////////////////

var storage_test37_digital_span = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "Digital_Span"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_digital_span = multer({ storage : storage_test37_digital_span});

router.post('/upload-singlefile-digital-span', upload_digital_span.single("audio"), patientController.postUploadSingleFile);

/////////// Test38 - BNT-15 /////////////////////////////////////////////

var storage_test38_bnt_15 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "BNT_15"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_bnt_15 = multer({ storage : storage_test38_bnt_15});

router.post('/upload-singlefile-bnt-15', upload_bnt_15.single("video"), patientController.postUploadSingleFile);

/////////// Test39 - Words List /////////////////////////////////////////////

var storage_test39_words_list = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "Words_List"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_words_list = multer({ storage : storage_test39_words_list});

router.post('/upload-singlefile-words-list', upload_words_list.single("video"), patientController.postUploadSingleFile);

/////////// Test40 - Stroop Victoria 2 /////////////////////////////////////////////

const STROOP_VICTORIA_2_NUMBER_OF_AUDIOS = 3;

var storage_test40_stroop_victoria_2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MyGlobals.popPathFromIDPatientAndTest_PatientInformationForUpload(req.session.iduser, "Stroop_Victoria_2"));
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload_stroop_victoria_2 = multer({ storage : storage_test40_stroop_victoria_2});

router.post('/upload-multifiles-stroop-victoria-2', upload_stroop_victoria_2.array("audios", STROOP_VICTORIA_2_NUMBER_OF_AUDIOS + 1), patientController.postUploadMultiFiles);

////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/connection-already-exists', patientController.getConnectionAlreadyExists);
router.get('/room-already-exists', patientController.getRoomAlreadyExists);
router.post('/update-informations', patientController.updateInformations);

module.exports = router;




