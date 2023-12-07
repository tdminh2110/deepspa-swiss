const fs = require('fs');

const Patient = require('../models/patient');

const session = require('./common/session');

exports.getConnectionAlreadyExists = (req, res, next) => {
    if (session.checkSession(req, 3)) {
        res.render('patient/connection-already-exists');
    } else {
        res.redirect('/');
    }
};

exports.getRoomAlreadyExists = (req, res, next) => {
    if (session.checkSession(req, 3)) {
        res.render('patient/room-already-exists');
    } else {
        res.redirect('/');
    }
};

exports.postUploadMultiFiles = (req, res, next) => {
    if (session.checkSession(req, 3)) {
        const files = req.files;        
        res.send(files);
    } else
        res.redirect('/');
};

exports.postUploadSingleFile = (req, res, next) => {
    if (session.checkSession(req, 3)) {        
        const file = req.file;      
        res.send(file);
    } else
        res.redirect('/');
};

exports.updateInformations = (req, res, next) => {    
    if (session.checkSession(req, 2)) {
        let email = req.body.patient_email;
        let informations = req.body.informations;

        Patient.findUserIDByemail(email)        
        .then(([patients]) => {                 
            if (patients.length == 1) {
                let IDPatient = patients[0].IDPatient;

                Patient.update_informations_by_id(IDPatient, informations)
                .then(() => {
                    res.render('empty', {                                
                    });
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
    }    
}