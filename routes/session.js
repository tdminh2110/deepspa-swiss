const express = require('express');

const sessionController = require('../controllers/session');

const router = express.Router();

router.get('/create-session', sessionController.getCreateSession);
router.get('/list-sessions', sessionController.getListNames);
router.get('/load-commentaires', sessionController.getLoadCommentaires);
router.get('/load-list-of-tests', sessionController.getLoadListOfTests);
router.get('/load-list-of-tests-upd-rmc', sessionController.getLoadListOfTestsUPD_RMC);
router.get('/load-list-of-tests-fluences', sessionController.getLoadListOfTestsFluences);
router.get('/load-list-of-tests-user-evaluation', sessionController.getLoadListOfTestsUserEvaluation);
router.post('/update-commentaires', sessionController.updateCommentaires);
router.post('/update-conclusions', sessionController.updateConclusions);
router.post('/update-discussion-libre', sessionController.updateDiscussionLibre);
router.post('/update-histoire-medicale', sessionController.updateHistoireMedicale);
router.post('/update-historique-du-patient', sessionController.updateHistoriqueDuPatient);
router.post('/update-raconter-journee', sessionController.updateRaconterJournee);

module.exports = router;