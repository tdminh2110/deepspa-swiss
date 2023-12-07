const session = require('../common/session');

exports.test26_deepspa_showpage = function(req, res) {
    if (session.checkSession(req, 2)) {      
        let subtest = req.query.subtest;
        
        switch(subtest) {
            case 'c': {
                let page = Number(req.query.page);
                
                if (page == 1) {
                    res.render('clinician/test-screens/entr_clin/page02', {                            
                        text: "Conclusion",
                        IDTextArea: "txt-test14-c-page01",
                        IDButton: "bt-test14-c-page01-terminer",
                        txtButton: "Terminer"
                    });   
                }
                break;
            }

            case 'dl': {
                let page = Number(req.query.page);
                
                if (page == 1) {
                    res.render('clinician/test-screens/entr_clin/page02', {                            
                        text: "Discussion Libre",
                        IDTextArea: "txt-test14-dl-page01",
                        IDButton: "bt-test14-dl-page01-terminer",
                        txtButton: "Terminer"
                    });   
                }
                break;
            }

            case 'Entr_Clin': {
                let page = Number(req.query.page);
                
                if (page == 1) {
                    res.render('clinician/test-screens/deepspa/page01', {                            
                        text: "Entretien Clinique",
                        IDTextArea: "txt-test26-entr-clin-page1",
                        IDButtonLeft: "bt-test26-entr-clin-page1-stop",
                        txtButtonLeft: "Interrompre",
                        IDButtonRight: "bt-test26-entr-clin-page1-terminer",
                        txtButtonRight: "Terminer"
                    });   
                }
                break;
            }

            case 'Raconter': {
                let page = Number(req.query.page);
                
                if (page == 1) {
                    res.render('clinician/test-screens/deepspa/page01', {                            
                        text: "Raconter - Journée",
                        IDTextArea: "txt-test26-raconter-page1",
                        IDButtonLeft: "bt-test26-raconter-page1-stop",
                        txtButtonLeft: "Interrompre",
                        IDButtonRight: "bt-test26-raconter-page1-terminer",
                        txtButtonRight: "Terminer"
                    });   
                }
                break;
            }

            case 'Historique': {
                let page = Number(req.query.page);
                
                if (page == 1) {
                    res.render('clinician/test-screens/deepspa/page01', {                            
                        text: "Historique du patient",
                        IDTextArea: "txt-test26-historique-page1",
                        IDButtonLeft: "bt-test26-historique-page1-stop",
                        txtButtonLeft: "Interrompre",
                        IDButtonRight: "bt-test26-historique-page1-terminer",
                        txtButtonRight: "Terminer"
                    });   
                }
                break;
            }

            case 'Conclusions': {
                let page = Number(req.query.page);
                
                if (page == 1) {
                    res.render('clinician/test-screens/deepspa/page01', {                            
                        text: "Conclusions",
                        IDTextArea: "txt-test26-conclusions-page1",
                        IDButtonLeft: "bt-test26-conclusions-page1-stop",
                        txtButtonLeft: "Interrompre",
                        IDButtonRight: "bt-test26-conclusions-page1-terminer",
                        txtButtonRight: "Terminer"
                    });   
                }
                break;
            }
            
        }
    } else {
        res.redirect('/'); 
    } 
}