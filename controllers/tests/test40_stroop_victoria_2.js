const session = require('../common/session');

const test40_lists = require('../../models/data/test40_stroop_victoria_2');

exports.test40_stroop_victoria_2_showpage = function(req, res) {
    if (session.checkSession(req, 2)) {      
        let page = Number(req.query.page);
        let language = req.query.language;

        switch(page) {
            case 1:
                res.render('clinician/test-screens/stroop_victoria_2/page01', {
                    text1: "STROOP VICTORIA",
                    text2: "Durchführung:",
                    text3: "Die drei Karten A, B, und C sollen immer in der angegebenen Reihenfolge vorgegeben werden. Der Patient soll so schnell wie möglich lesen oder die Farbe benennen. Die Fehler beim Benennen der Farbe sollen unmittelbar korrigiert werden, wenn sie nicht vom Patienten spontan selber korrigiert werden. Der Patient soll danach angewiesen werden, so schnell wie möglich fortzufahren. Spontane Korrekturen werden als Richtige gezählt.",
                    IDButton: "bt-test40-page01-continuer",
                    txtButton: "Weiter"
                });
                break;

            case 2:
                res.render('clinician/test-screens/stroop_victoria_2/page02', {
                    text1: "<b>Karte A</b> (Farbe von Punkten benennen)",
                    text2: "Instruktion:",                    
                    text3: "<span class='text-primary'><i>\"Benennen Sie die Farbe der Punkte so schnell Sie können. Beginnen Sie oben links und gehen Sie von links nach rechts.\"</i></span>",
                    text4: "Kreuzen Sie die Kästchen an, wenn der Patient einen Fehler macht.",
                    text5: "Kreuzen Sie das \"K\" an, wenn der Patient seinen Fehler korrigiert.",
                    IDButtonLeft: "bt-test40-page02-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test40-page02-continuer",
                    txtButtonRight: "Weiter"
                });
                break;
            
            case 3: {
                let listColors = [];
            
                if (language == 'de') {
                    for (let i = 0; i < test40_lists.listColors01.length; i++) {                    
                        for (let j = 0; j < test40_lists.listColors01[i].length; j++) {
                            let color = {
                                id0 : 'bt-test40-page03-color' + i + '-' + j,
                                id1 : 'bt-test40-page03-correction' + i + '-' + j,                            
                                name : test40_lists.listColors01[i][j]
                            };
                            listColors.push(color);
                        }
                    }
                } 

                res.render('clinician/test-screens/stroop_victoria_2/page03', {
                    text1: "Tafel 1 :",
                    text2: "Farben - Aufgabe",
                    text3: "K",
                    IDTextCountTimer: "txt-test40-page03-count-timer",                                               
                    IDButtonControl1: "bt-test40-page03-control1",                                        
                    IDButtonControl2: "bt-test40-page03-control2",                                  
                    listColors : listColors,                                    
                    IDButtonLeft: "bt-test40-page03-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test40-page03-continuer",
                    txtButtonRight: "Weiter"
                });
                break;
            }

            case 4:
                res.render('clinician/test-screens/stroop_victoria_2/page02', {
                    text1: "<b>Karte B</b> (Farbe von Nicht-Farbwörtern benennen)",
                    text2: "Instruktion:",
                    text3: "<span class='text-primary'><i>\"Benennen Sie die Farbe dieser Wörter so schnell Sie können. Beginnen Sie wieder oben links und folgen Sie der Linie von links nach rechts.\"</i></span> Falls nötig verdeutlichen: <span class='text-primary'><i>\"Benennen Sie die Farbe, in der die Wörter geschrieben sind.\"</i></span>",
                    text4: "Kreuzen Sie die Kästchen an, wenn der Patient einen Fehler macht.",
                    text5: "Kreuzen Sie das \"K\" an, wenn der Patient seinen Fehler korrigiert.",
                    IDButtonLeft: "bt-test40-page04-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test40-page04-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 5: {
                let listColors = [];
            
                if (language == 'de') {
                    for (let i = 0; i < test40_lists.listColors02.length; i++) {                    
                        for (let j = 0; j < test40_lists.listColors02[i].length; j++) {
                            let color = {
                                id0 : 'bt-test40-page05-color' + i + '-' + j,
                                id1 : 'bt-test40-page05-correction' + i + '-' + j,                            
                                name : test40_lists.listColors02[i][j]
                            };
                            listColors.push(color);
                        }
                    }
                }

                res.render('clinician/test-screens/stroop_victoria_2/page03', {
                    text1: "Tafel 2:",
                    text2: "Wörter - Aufgabe",
                    text3: "K", 
                    IDTextCountTimer: "txt-test40-page05-count-timer",                                               
                    IDButtonControl1: "bt-test40-page05-control1",                                        
                    IDButtonControl2: "bt-test40-page05-control2",
                    listColors : listColors,                                    
                    IDButtonLeft: "bt-test40-page05-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test40-page05-continuer",
                    txtButtonRight: "Weiter"
                });
                break;
            }

            case 6:
                res.render('clinician/test-screens/stroop_victoria_2/page02', {
                    text1: "<b>Karte C</b> (Farbe von Farbwörtern benennen)",
                    text2: "Instruktion:",                    
                    text3: "<span class='text-primary'><i>\"Benennen Sie wieder die Farbe, in der die Wörter gedruckt sind so schnell Sie können.\"</i></span> Falls nötig verdeutlichen: <span class='text-primary'><i>\"Lesen Sie nicht das Wort, sondern sagen Sie mir in welcher Farbe es gedruckt ist.\"</i></span>",
                    text4: "Kreuzen Sie die Kästchen an, wenn der Patient einen Fehler macht.",
                    text5: "Kreuzen Sie das \"K\" an, wenn der Patient seinen Fehler korrigiert.",
                    IDButtonLeft: "bt-test40-page06-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test40-page06-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 7: {
                let listColors = [];
            
                if (language == 'de') {
                    for (let i = 0; i < test40_lists.listColors03.length; i++) {                    
                        for (let j = 0; j < test40_lists.listColors03[i].length; j++) {
                            let color = {
                                id0 : 'bt-test40-page07-color' + i + '-' + j,
                                id1 : 'bt-test40-page07-correction' + i + '-' + j,                            
                                name : test40_lists.listColors03[i][j]
                            };
                            listColors.push(color);
                        }
                    }
                }

                res.render('clinician/test-screens/stroop_victoria_2/page03', {
                    text1: "Tafel 3 :",
                    text2: "Interferenzen - Aufgabe",
                    text3: "K",  
                    IDTextCountTimer: "txt-test40-page07-count-timer",                                               
                    IDButtonControl1: "bt-test40-page07-control1",                                        
                    IDButtonControl2: "bt-test40-page07-control2",
                    listColors : listColors,                                    
                    IDButtonLeft: "bt-test40-page07-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test40-page07-continuer",
                    txtButtonRight: "Weiter"
                });
                break;
            }

            case 8: {
                let x1 = Number(req.query.x1);
                let y1 = Number(req.query.y1);
                let z1 = Number(req.query.z1);
                let x2 = Number(req.query.x2);
                let y2 = Number(req.query.y2);
                let z2 = Number(req.query.z2);
                let x3 = Number(req.query.x3);
                let y3 = Number(req.query.y3);
                let z3 = Number(req.query.z3);                

                res.render('clinician/test-screens/stroop_victoria_2/page04', {
                    text1: "Ergebnisse",
                    text2: "Tafel 1: <span class=\"text-danger\"><b>" + x1 + "</b></span> Sekunden / <span class=\"text-danger\"><b>" + y1 + "</b></span> Fehler, davon <span class=\"text-danger\"><b>" + z1 + "</b></span> korrigiert",
                    text3: "Tafel 2: <span class=\"text-danger\"><b>" + x2 + "</b></span> Sekunden / <span class=\"text-danger\"><b>" + y2 + "</b></span> Fehler, davon <span class=\"text-danger\"><b>" + z2 + "</b></span> korrigiert",
                    text4: "Tafel 3: <span class=\"text-danger\"><b>" + x3 + "</b></span> Sekunden / <span class=\"text-danger\"><b>" + y3 + "</b></span> Fehler, davon <span class=\"text-danger\"><b>" + z3 + "</b></span> korrigiert",
                    IDButtonLeft: "bt-test40-page08-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test40-page08-terminer",
                    txtButtonRight: "Beenden"
                });
                break;
            }
        }
    } else if (session.checkSession(req, 3)) {      
        let page = Number(req.query.page);
        let language = req.query.language;
        
        switch(page) {
            case 3: case 5: case 7:
                res.render('patient/test-screens/stroop_victoria_2/page01', {
                    urlImage: "/tests/stroop_victoria_2/image" + page + ".jpg"
                });
                break;
        }    
    }
}