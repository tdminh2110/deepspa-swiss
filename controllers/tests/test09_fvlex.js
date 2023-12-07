const session = require('../common/session');

const Test09_FVLEX = require('../../models/test_fvlex');

exports.test09_fvlex_showpage = function(req, res) {
    if (session.checkSession(req, 2)) {      
        let page = Number(req.query.page);
        let language = req.query.language;

        switch (page) {            
            case 1: {
                let idSelectedSession = Number(req.query.id_session);
                let test_done = 0;
                let test1_done = "";
                let test2_done = "";

                Test09_FVLEX.select_testDone_by_idSession(idSelectedSession)
                .then(([test09_fvlex]) => {
                    if (test09_fvlex.length == 1) {
                        test_done = test09_fvlex[0].test_done;

                        if (test_done == 1) {
                            test2_done = "<span style='font-size:18px'>&#9745;</span>";
                        } else if (test_done == 2) {
                            test1_done = "<span style='font-size:18px'>&#9745;</span>";
                        } else if (test_done == 3) {
                            test2_done = "<span style='font-size:18px'>&#9745;</span>";
                            test1_done = "<span style='font-size:18px'>&#9745;</span>";
                        }
                    }
        
                    res.render('clinician/test-screens/fvlex/page01', {
                        text1: language == 'de' ? "Phonematische Flüssigkeit" : "Fluence Verbale",                    
                        text2: language == 'de' ? "Es gibt mehrere Arten von phonematische Fluencen" : "Plusieurs types de fluences verbales sont disponibles",
                        IDButton1: "bt-test09-page01-1",
                        test1_done: test1_done, 
                        txtButton1: language == 'de' ? "S-Wörter" : "Lettre P",
                        IDButton2: "bt-test09-page01-2",
                        test2_done: test2_done,
                        txtButton2: language == 'de' ? "R-Wörter" : "Lettre R",                    
                        IDButton: "bt-test09-page01-continuer",
                        txtButton: language == 'de' ? "Beenden" : "Terminer"
                    });                    
                })
                .catch(err => console.log(err));
                
                break;                  
            }
                
            case 2:
                res.render('clinician/test-screens/fvlex/page02', {
                    text1: language == 'de' ? "Phonematische Flüssigkeit: S-Wörter" : "Fluence Verbale – Lettre P",                    
                    text2: language == 'de' ? "\"Jetzt bitte ich Sie, so viele Wörter wie nur möglich aufzuzählen, die mit einem bestimmten Buchstaben beginnen. Es dürfen Wörter aller Wortarten sein (Hauptwörter, Verben usw.). Nicht erlaubt sind 1.) Namen von Personen, 2.) geographische Namen, 3.) Nummern, 4.) das selbe Wort in verschiedenen Formen oder mit verschiedenen Endungen, wie zum Beispiel bitten, bat, bittend. Zudem sind Stammergänzungen untersagt, z.B. Biene, Bienenstich, Bienenhonig. Ich möchte Sie nun bitten, so viele Wörter wie möglich aufzuzählen, die mit dem Buchstaben S beginnen. Sie haben eine Minute Zeit. Sind Sie bereit? Los!\"" : "Pouvez-vous me dire en (1 ou 2) minute(s) le plus possible de mots commençant par la <b>lettre P</b>, à ceci près que vos ne devez pas me dire de noms propres ; vous ne devez pas non plus me dire de noms appartenant à une même famille (ex : laver, lavage, lavement sont des mots de la même famille, si vous m'en dîtes un vous ne pouvez pas me dire les autres) ; le plus important est de ne pas répéter plusieurs fois le même mot au cours des deux minutes. Sinon, vous pouvez me dire tous les mots français commençant par la lettre P, que ce soient des noms, des verbes, des adjectifs... Avez-vous bien compris ?",
                    text3: language == 'de' ? "Parallel zum \"Los!\" Stoppuhr drücken." : "",
                    text4: language == 'de' ? "Die Bearbeitungszeit dieses Tests ist auf 60 Sekunden beschränkt. Hört die TP vor Ablauf dieser Zeit auf, ermutigen Sie sie weitere Wörter zu finden. Nennt er/sie länger als 15 Sekunden keine Wörter, wiederholen Sie die Instruktion (<span class='text-primary'>\"Zählen Sie mir Wörter auf, die mit dem Buchstaben S beginnen\"</span>). Auch wenn die Instruktion während der Untersuchung wiederholt werden muss, wirdkein Zeitzuschlag gewährt!" : "",
                    text5: language == 'de' ? "Wählen Sie die Dauer in Minuten:" : "Choisissez la durée en minutes:",
                    IDButton1: "bt-test09-page02-1",
                    txtButton1: "1 minute",
                    IDButton2: "bt-test09-page02-2",
                    txtButton2: language == 'de' ? "2 minuten" : "2 minutes",
                    IDButton: "bt-test09-page02-commencer",
                    txtButton: language == 'de' ? "Start" : "Commencer"
                });
                break; 

            case 3: {
                let duration = Number(req.query.duration);
                
                res.render('clinician/test-screens/fvlex/page03', {
                    text1: language == 'de' ? "Phonematische Flüssigkeit - S-Wörter" : "Fluence Verbale - Lettre P",                    
                    text2: language == 'de' ? "Dauer: " + duration + " Minute(n)" : "Durée est de " + duration + " Minute(s):",
                    text3: language == 'de' ? "Richtige:" : "Réponses:",
                    text4: language == 'de' ? "Intrusionen:" : "Intrusions:",
                    text5: language == 'de' ? "Wiederholungen:" : "Oublis à mesure:",
                    text6: language == 'de' ? "Fehler:" : "Erreurs:",
                    IDTextCountTimer: "txt-test09-page03-count-timer",
                    IDButtonControl1: "bt-test09-page03-control1",
                    textButtonControl1: language == 'de' ? "Beginnen" : "Commencer",
                    IDButtonControl2: "bt-test09-page03-control2",
                    textButtonControl2: language == 'de' ? "Reset" : "Réinitialiser",                  
                    IDTextArea: "txta-test09-page03-1",
                    IDText1: "txt-test09-page03-1",
                    IDButtonMinus1 : "bt-test09-page03-minus-1",
                    IDButtonPlus1 : "bt-test09-page03-plus-1",                    
                    IDText2: "txt-test09-page03-2",
                    IDButtonMinus2 : "bt-test09-page03-minus-2",
                    IDButtonPlus2 : "bt-test09-page03-plus-2",
                    IDText3: "txt-test09-page03-3",
                    IDButtonMinus3 : "bt-test09-page03-minus-3",
                    IDButtonPlus3 : "bt-test09-page03-plus-3",
                    IDText4: "txt-test09-page03-4",
                    IDButtonMinus4 : "bt-test09-page03-minus-4",
                    IDButtonPlus4 : "bt-test09-page03-plus-4",                    
                    IDButton: "bt-test09-page03-continuer",
                    txtButton: language == 'de' ? "Weiter" : "Continuer"
                });
                break; 
            }

            case 4: {
                let reponses = Number(req.query.reponses);
                let intrusions = Number(req.query.intrusions);
                let oublis_a_mesure = Number(req.query.oublis_a_mesure);
                let erreurs = Number(req.query.erreurs);

                res.render('clinician/test-screens/fvlex/page04', {
                    text1: language == 'de' ? "Phonematische Flüssigkeit - S-Wörter" : "Fluence Verbale – Lettre P",                    
                    text2: language == 'de' ? "Score" : "Résultats",                      
                    text3: language == 'de' ? "Richtige: " + reponses : "Réponses: " + reponses,                    
                    text4: language == 'de' ? "Intrusionen: " + intrusions : "Intrusions: " + intrusions,                      
                    text5: language == 'de' ? "Wiederholungen: " + oublis_a_mesure : "Oublis à mesure: " + oublis_a_mesure,                    
                    text6: language == 'de' ? "Fehler: " + erreurs : "Erreurs: " + erreurs,                                          
                    IDButton: "bt-test09-page04-terminer",
                    txtButton: language == 'de' ? "Beenden" : "Terminer"
                });
                break; 
            }

            case 5:
                res.render('clinician/test-screens/fvlex/page02', {
                    text1: language == 'de' ? "Phonematische Flüssigkeit: R-Wörter" : "Fluence Verbale - Lettre R",                    
                    text2: language == 'de' ? "\"Jetzt bitte ich Sie, so viele Wörter wie nur möglich aufzuzählen, die mit einem bestimmten Buchstaben beginnen. Es dürfen Wörter aller Wortarten sein (Hauptwörter, Verben usw.). Nicht erlaubt sind 1.) Namen von Personen, 2.) geographische Namen, 3.) Nummern, 4.) das selbe Wort in verschiedenen Formen oder mit verschiedenen Endungen, wie zum Beispiel bitten, bat, bittend. Zudem sind Stammergänzungen untersagt, z.B. Biene, Bienenstich, Bienenhonig. Ich möchte Sie nun bitten, so viele Wörter wie möglich aufzuzählen, die mit dem Buchstaben R beginnen. Sie haben eine Minute Zeit. Sind Sie bereit? Los!\"" : "Pouvez-vous me dire en (1 ou 2) minute(s) le plus possible de mots commençant par la <b>lettre R</b>, à ceci près que vos ne devez pas me dire de noms propres ; vous ne devez pas non plus me dire de noms appartenant à une même famille (ex : laver, lavage, lavement sont des mots de la même famille, si vous m'en dîtes un vous ne pouvez pas me dire les autres) ; le plus important est de ne pas répéter plusieurs fois le même mot au cours des deux minutes. Sinon, vous pouvez me dire tous les mots français commençant par la lettre P, que ce soient des noms, des verbes, des adjectifs... Avez-vous bien compris ?",
                    text3: language == 'de' ? "Parallel zum \"Los!\" Stoppuhr drücken." : "",
                    text4: language == 'de' ? "Die Bearbeitungszeit dieses Tests ist auf 60 Sekunden beschränkt. Hört die TP vor Ablauf dieser Zeit auf, ermutigen Sie sie weitere Wörter zu finden. Nennt er/sie länger als 15 Sekunden keine Wörter, wiederholen Sie die Instruktion (<span class='text-primary'>\"Zählen Sie mir Wörter auf, die mit dem Buchstaben R beginnen\"</span>). Auch wenn die Instruktion während der Untersuchung wiederholt werden muss, wirdkein Zeitzuschlag gewährt!" : "",
                    text5: language == 'de' ? "Wählen Sie die Dauer in Minuten:" : "Choisissez la durée en minutes:",
                    IDButton1: "bt-test09-page05-1",
                    txtButton1: "1 minute",
                    IDButton2: "bt-test09-page05-2",
                    txtButton2: language == 'de' ? "2 minuten" : "2 minutes",
                    IDButton: "bt-test09-page05-commencer",
                    txtButton: language == 'de' ? "Start" : "Commencer"
                });
                break;

            case 6: {
                let duration = Number(req.query.duration);

                res.render('clinician/test-screens/fvlex/page03', {
                    text1: language == 'de' ? "Phonematische Flüssigkeit - R-Wörter" : "Fluence Verbale - Lettre R",                    
                    text2: language == 'de' ? "Dauer: " + duration + " Minute(n)" : "Durée est de " + duration + " Minute(s):",
                    text3: language == 'de' ? "Richtige:" : "Réponses:",
                    text4: language == 'de' ? "Intrusionen:" : "Intrusions:",
                    text5: language == 'de' ? "Wiederholungen:" : "Oublis à mesure:",
                    text6: language == 'de' ? "Fehler:" : "Erreurs:",
                    IDTextCountTimer: "txt-test09-page06-count-timer",
                    IDButtonControl1: "bt-test09-page06-control1",
                    textButtonControl1: language == 'de' ? "Beginnen" : "Commencer",
                    IDButtonControl2: "bt-test09-page06-control2",
                    textButtonControl2: language == 'de' ? "Reset" : "Réinitialiser",                
                    IDTextArea: "txta-test09-page06-1",
                    IDText1: "txt-test09-page06-1",
                    IDButtonMinus1 : "bt-test09-page06-minus-1",
                    IDButtonPlus1 : "bt-test09-page06-plus-1",                    
                    IDText2: "txt-test09-page06-2",
                    IDButtonMinus2 : "bt-test09-page06-minus-2",
                    IDButtonPlus2 : "bt-test09-page06-plus-2",
                    IDText3: "txt-test09-page06-3",
                    IDButtonMinus3 : "bt-test09-page06-minus-3",
                    IDButtonPlus3 : "bt-test09-page06-plus-3",
                    IDText4: "txt-test09-page06-4",
                    IDButtonMinus4 : "bt-test09-page06-minus-4",
                    IDButtonPlus4 : "bt-test09-page06-plus-4",                    
                    IDButton: "bt-test09-page06-continuer",
                    txtButton: language == 'de' ? "Weiter" : "Continuer"
                });
                break;
            }

            case 7: {
                let reponses = Number(req.query.reponses);
                let intrusions = Number(req.query.intrusions);
                let oublis_a_mesure = Number(req.query.oublis_a_mesure);
                let erreurs = Number(req.query.erreurs);

                res.render('clinician/test-screens/fvlex/page04', {
                    text1: language == 'de' ? "Phonematische Flüssigkeit - R-Wörter" : "Fluence Verbale – Lettre R",                    
                    text2: language == 'de' ? "Score" : "Résultats",
                    text3: language == 'de' ? "Richtige: " + reponses : "Réponses: " + reponses,                    
                    text4: language == 'de' ? "Intrusionen: " + intrusions : "Intrusions: " + intrusions,                      
                    text5: language == 'de' ? "Wiederholungen: " + oublis_a_mesure : "Oublis à mesure: " + oublis_a_mesure,                    
                    text6: language == 'de' ? "Fehler: " + erreurs : "Erreurs: " + erreurs,                                          
                    IDButton: "bt-test09-page07-terminer",
                    txtButton: language == 'de' ? "Beenden" : "Terminer"
                });
                break;
            }
        }
    } else if (session.checkSession(req, 3)) {
        let page = Number(req.query.page);

        switch (page) {
        }
    } else {
        res.redirect('/'); 
    }
}