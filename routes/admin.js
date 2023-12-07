
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getAllClinicians);
router.get('/list-clinicians', adminController.getAllClinicians);

router.get('/assign-patients-to-clinician', adminController.getAssignPatientsToClinician);
router.post('/assign-patients-to-clinician', adminController.postAssignPatientsToClinician);

// /admin/add-clinician => GET
router.get('/add-clinician', adminController.getAddClinician);
// /admin/add-clinician => POST
router.post('/add-clinician', adminController.postAddClinician);

// /admin/edit-clinician => GET
router.get('/edit-clinician', adminController.getEditClinician);
//admin/edit-clinician => POST
router.post('/edit-clinician', adminController.postEditClinician);

//clinician/remove-clinician => GET
router.get('/remove-clinician', adminController.getRemoveClinician);

module.exports = router;