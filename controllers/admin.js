const User = require('../models/user');
const Clinician = require('../models/clinician');
const Patient = require('../models/patient');
const MyFunction = require('../models/function');
const Establishment = require('../models/establishment');

const session = require('./common/session');

exports.getAddClinician = (req, res, next) => {
  if (session.checkSession(req, 1)) {
    MyFunction.selectAll()
      .then(([functions, fieldData]) => {
        Establishment.selectAll()
        .then(([establishments, fieldData]) => {
          res.render('admin/add-clinician', {        
            funcs: functions, 
            estas: establishments,
            pageTitle: 'Add a Clinician',
            path: '/admin/add-clinician'
          });
        })
        .catch(err => console.log(err));   
      })    
      .catch(err => console.log(err)); 
  }  
  else
    res.redirect('/'); 
};    

exports.postAddClinician = (req, res, next) => {
  if (session.checkSession(req, 1)) {
    const name = req.body.name;
    const familyName = req.body.family_name;
    let birthday = req.body.birthday;
    const phone = req.body.phone;
    const idFunction = req.body.function;
    const idEstablishment = req.body.establishment;
    const email = req.body.email;
    const password = req.body.password;
    const re_password = req.body.re_password;
    let manage_clinicians = req.body.manage_clinicians == "on" ? 1 : 0;

    let arrayBirthday = birthday.split("/");
    birthday = arrayBirthday[2] + "/" + arrayBirthday[1] + "/" + arrayBirthday[0];
   
    if (password === re_password)
    {
      const user = new User(null, name, familyName, email, password, 2);
      user
      .insert()
      .then((results) => {          
        const clinician = new Clinician(results[0].insertId, birthday, phone, idFunction, idEstablishment, manage_clinicians);                   
        clinician
          .insert()
          .then(() => {
            res.redirect('/');
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    }
    else
      res.redirect('/admin/add-clinician');  
  }
  else
    res.redirect('/');
};

exports.getAllClinicians = (req, res, next) => {
  if (session.checkSession(req, 1)) {
    Clinician.selectAll()
    .then(([clinicians, fieldData]) => {
      res.render('admin/list-clinicians', {
        clins: clinicians,
        pageTitle: 'List of Clinicians',
        path: '/admin/list-clinicians'
      });
    });
  }
  else
    res.redirect('/');
};

exports.getAssignPatientsToClinician = (req, res, next) => {
  if (session.checkSession(req, 1)) {
    Patient.selectAll(0)
    .then(([patients, fieldData]) => {
      Clinician.selectAll()
      .then(([clinicians, fieldData]) => {
        res.render('admin/assign-patients-to-clinician', {
          patis: patients,
          clins: clinicians,
          pageTitle: 'Assign Patients To A Clinician',
          path: '/admin/assign-patients-to-clinician'
        });
      })
      .catch(err => res.redirect('/error'));        
    })
    .catch(err => res.redirect('/error'));    
  }
  else
    res.redirect('/');
};

exports.postAssignPatientsToClinician = (req, res, next) => {
  if (session.checkSession(req, 1)) {
    let email_patients = req.body.chk_patient;
    
    if (email_patients !== undefined) {
      if(!Array.isArray(email_patients)) {
        email_patients = new Array(email_patients);
      }
      
      User.search_by_email(req.body.email_clinician)
      .then(([clinician, fieldData]) => {
        let id_clinician = clinician[0].id;

        for(let i = 0; i < email_patients.length; i++) {
          User.search_by_email(email_patients[i])
          .then(([user, fieldData]) => {
            Patient.updateIDClinicianByIDUser(user[0].id, id_clinician)
            .then(([patient, fieldData]) => {
              res.redirect('/admin/assign-patients-to-clinician');
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
  }
  else
    res.redirect('/');
};

exports.getEditClinician = (req, res, next) => {
  if (session.checkSession(req, 1)) { 
    Clinician.findUserIDByemail(req.query.email)
    .then(([clinicians]) => {
      if (clinicians.length == 1) {
        let IDClinician = clinicians[0].IDClinician;        
        Clinician.selectAllUserClinicianByIDClinician(IDClinician)
        .then(([user_clinician]) => {          
          if (user_clinician.length == 1) {
            MyFunction.selectAll()
            .then(([functions, fieldData]) => {
              Establishment.selectAll()
              .then(([establishments, fieldData]) => {
                res.render('admin/edit-clinician', {
                    clinician: user_clinician[0],
                    funcs: functions, 
                    estas: establishments,                             
                    pageTitle: 'Edit the clinician',
                    path: '/clinician/add-clinician'
                });
              })
              .catch(err => console.log(err));   
            })    
            .catch(err => console.log(err));
          } else {
              res.redirect('/error');
          }
        })
        .catch(err => res.redirect('/error'));
      }
    })
    .catch(err => res.redirect('/error'));
  }  
  else {
    res.redirect('/');
  }
}

exports.postEditClinician = (req, res, next) => {
  if (session.checkSession(req, 1)) { 
    const id = req.body.id;
    const name = req.body.name;
    const familyName = req.body.family_name;
    let birthday = req.body.birthday;    
    const phone = req.body.phone; 
    const email = req.body.email;
    const idFunction = req.body.function;
    const idEstablishment = req.body.establishment;
    let manage_clinicians = req.body.manage_clinicians == "on" ? 1 : 0;

    let arrayBirthday = birthday.split("/");
    birthday = arrayBirthday[2] + "/" + arrayBirthday[1] + "/" + arrayBirthday[0];

    User.updateByID(id, name, familyName, email)
    .then(() => {
        Clinician.updateByIDUser(id, birthday, idFunction, idEstablishment, phone, manage_clinicians)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => res.redirect('/error'));
    })
    .catch(err => res.redirect('/error'));
  }  
  else {
    res.redirect('/');
  }
};

exports.getRemoveClinician = (req, res, next) => {  
  if (session.checkSession(req, 1)) {      
      let emailClinician = req.query.email;
      Clinician.findUserIDByemail(req.query.email)        
      .then(([clinicians]) => {
          if (clinicians.length == 1) {
              let IDClinician = clinicians[0].IDClinician;
              Patient.updateIDClinicianByIDIDClinician(0, IDClinician)
              .then(() => {
                  User.deleteByID(IDClinician)
                  .then(() => {
                    Clinician.deleteByIDClinician(IDClinician)
                    .then(() => {
                        res.redirect('/');                          
                    })
                    .catch((err) => {
                      console.log(err);
                      res.redirect('/error');
                    });
                  })                          
                  .catch((err) => {
                    console.log(err);
                    res.redirect('/error');
                  });            
              })
              .catch((err) => {
                console.log(err);
                res.redirect('/error');
              });
          } else {
              res.redirect('/error');
          }
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/error');
      });
  } else {
      res.redirect('/'); 
  }
};
