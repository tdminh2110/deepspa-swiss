const User = require('../models/user');
const Clinician = require('../models/clinician');
const Patient = require('../models/patient');

exports.getLogIn = (req, res, next) => {
    if (req.session.email) {
        if (req.session.userRight == 1) {
            Clinician.selectAll()
            .then(([clinicians, fieldData]) => {
                res.render('admin/list-clinicians', {
                    clins: clinicians,
                    pageTitle: 'List of Clinicians',
                    path: '/admin/list-clinicians'
                });
            });                        
        } else if (req.session.userRight == 2) {
            // Doan nay de test tren server khong co CSDL, se bi xoa sau nay
            if (req.session.email === 'c@c') {
                res.render('clinician/open-room', {        
                    pageTitle: 'Open Room',
                    path: '/clinician/open-room',
                    email: req.session.email
                });
            } else {
                Clinician.findUserIDByemail(req.session.email)        
                .then(([clinicians]) => {
                    if (clinicians.length == 1) {   
                        let idClinician = clinicians[0].IDClinician;

                        Clinician.selectManageCliniciansByIDClinician(idClinician)
                        .then(([clinicians]) => {
                            let manageClinicians = clinicians[0].manage_clinicians;

                            Patient.selectAll(idClinician)
                            .then(([patients, fieldData]) => {
                                res.render('clinician/list-patients', {
                                    patis: patients,
                                    pageTitle: 'List of Patients',
                                    path: '/clinician/list-patients',
                                    manageClinicians: manageClinicians
                                });
                            })
                            .catch(err => res.redirect('/error'));
                        })
                        .catch(err => res.redirect('/error'));
                    }   
                    else
                        console.log("Not OK");
                })
                .catch(err => console.log(err));
            }
        } else if (req.session.userRight == 3) {
            res.render('patient/main', {
                pageTitle: 'Patient',
                email: req.session.email
            });
        }
    } else {
        let error = "";

        switch(req.query.error) {
            case "1": 
                error = "Désolé, il y a une erreur dans votre adresse email ou dans le mot de passe !!!";
                break;
        }
        
        res.render('common/login', {
            pageTitle: 'Log In',
            error : error            
        });
    }
};

exports.postLogIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;   
    
    // Doan nay de test tren server khong co CSDL, se bi xoa sau nay
    if ((email === 'c') && (password == 'c')) {
        req.session.email = 'c@c';
        req.session.userRight = 2; 
        req.session.name = 'c' + " " + 'c';
        res.redirect('/');         
    } else if ((email === 'p') && (password === 'p')) {
        req.session.email = 'p@p';
        req.session.userRight = 3; 
        req.session.name = 'p' + " " + 'p';
        res.redirect('/');         
    } else {       
        User.search_by_email_password(email, password)
        .then(([users]) => {
            if (users.length == 1) {
                req.session.iduser = users[0].id;
                req.session.email = email;
                req.session.userRight = users[0].user_right; 
                req.session.name = users[0].name + " " + users[0].family_name;
                res.redirect('/');
            } else {
                res.redirect('/?error=1');
            }
        })
        .catch(err => console.log(err));  
    }
};

exports.getLogOut = (req, res, next) => {
    req.session.destroy();
    res.redirect('/'); 
};