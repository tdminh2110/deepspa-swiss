const session = require('../common/session');

const Test10_FVSEM = require('../../models/test_fvsem');

exports.test10_fvsem_showpage = function(req, res) {
    if (session.checkSession(req, 2)) {      
        let page = Number(req.query.page);
        let language = req.query.language;

        switch (page) {
            case 1: {
                let idSelectedSession = Number(req.query.id_session);
                let test_done = 0;
                let test1_done = "";
                let test2_done = "";

                Test10_FVSEM.select_testDone_by_idSession(idSelectedSession)
                .then(([test10_fvsem]) => {
                    if (test10_fvsem.length == 1) {
                        test_done = test10_fvsem[0].test_done;

                        if (test_done == 1) {
                            test2_done = "<span style='font-size:18px'>&#9745;</span>";
                        } else if (test_done == 2) {
                            test1_done = "<span style='font-size:18px'>&#9745;</span>";
                        } else if (test_done == 3) {
                            test2_done = "<span style='font-size:18px'>&#9745;</span>";
                            test1_done = "<span style='font-size:18px'>&#9745;</span>";
                        }
                    }
        
                    res.render('clinician/test-screens/fvsem/page01', {
                        text1: language == 'de' ? "Verbale Flüssigkeit" : "Fluence Verbale",                    
                        text2: language == 'de' ? "Es gibt mehrere Arten von verbalen Fluencen" : "Plusieurs types de fluences verbales sont disponibles",
                        IDButton1: "bt-test10-page01-1",
                        test1_done: test1_done, 
                        txtButton1: language == 'de' ? "Tiere" : "Animaux",
                        IDButton2: "bt-test10-page01-2",
                        test2_done: test2_done,
                        txtButton2: language == 'de' ? "Früchte" : "Fruits",                    
                        IDButton: "bt-test10-page01-continuer",
                        txtButton: language == 'de' ? "Beenden" : "Terminer"
                    });                    
                })
                .catch(err => console.log(err));
                
                break;                  
            }
                
            case 2:
                res.render('clinician/test-screens/fvsem/page02', {
                    text1: language == 'de' ? "Verbale Flüssigkeit: Kategorie 'Tiere'" : "Fluence Verbale - Animaux",                    
                    text2: language == 'de' ? "\"Ich werde Ihnen eine Kategorie nennen und möchte, dass Sie so schnell Sie können alle Dinge aufzählen, die in diese Kategorie gehören. Wenn ich zum Beispiel 'Kleidungsstücke' sage, können Sie 'Hemd', 'Krawatte' oder 'Hut', usw. aufzählen. Können Sie mir weitere Kleidungsstücke nennen? \"" : "Pouvez-vous me dire en deux minutes le plus possible de noms d'<b>animaux</b>, peu importe par quelle lettre ils commencent, le plus important est de ne pas vous répéter. Avez-vous bien compris ?",
                    text3: language == 'de' ? "Warten Sie bis die TP <b>zwei</b> Wörter genannt hat. Gelingt es ihr, dann sagen Sie, dass die Antworten korrekt sind und fahren Sie mit dem eigentlichen Test <b>(Kategorie 'Tiere')</b> fort. Nennt die TP ein falsches Wort oder gibt eine unpassende Antwort, korrigieren Sie die Antwort und wiederholen Sie die Instruktion. Misslingt es der TP abermals zu antworten, wiederholen Sie die Instruktion ein zweites Mal. Wenn es eindeutig wird, dass die TP die Instruktion immer noch nicht versteht, beenden Sie diese Aufgabe und klären Sie ab, weshalb dies so ist." : "",
                    text4: language == 'de' ? "Wenn Sie überzeugt sind, dass die TP die Aufgabe versteht und zwei Wörter genannt hat, die Kleidungsstücke bezeichnen, sagen Sie:" : "",
                    text5: language == 'de' ? "\"Gut! Ich möchte Sie nun bitten, mir alle Dinge aufzuzählen, die zu einer anderen Kategorie gehören, nämlich zur Kategorie, 'Tiere'. Sie haben eine Minute Zeit. Sind Sie bereit? Bitte beginnen Sie!\"" : "",
                    text6: language == 'de' ? "Die Bearbeitungszeit dieses Tests ist auf 60 Sekunden beschränkt. Hört die TP vor Ablauf dieser Zeit auf, ermutigen Sie sie weitere Wörter zu finden. Nennt er/sie länger als 15 Sekunden keine Tiere, wiederholen Sie die Instruktion (<span class='text-primary'>\"Zählen Sie mir alle Tiere auf, die Ihnen in den Sinn kommen\"</span>). Auch wenn die Instruktion während der Untersuchung wiederholt werden muss, wird kein Zeitzuschlag gewährt!" : "",
                    text7: language == 'de' ? "Wählen Sie die Dauer in Minuten" : "Choisissez la durée en minutes:",
                    IDButton1: "bt-test10-page02-1",
                    txtButton1: "1 minute",
                    IDButton2: "bt-test10-page02-2",
                    txtButton2: language == 'de' ? "2 minuten" : "2 minutes",                                        
                    IDButton: "bt-test10-page02-commencer",
                    txtButton: language == 'de' ? "Start" : "Commencer"
                });
                break; 

            case 3: {
                let duration = Number(req.query.duration);

                res.render('clinician/test-screens/fvsem/page03', {
                    text1: language == 'de' ? "Verbale Flüssigkeit - Tiere" : "Fluence Verbale - Animaux",                    
                    text2: language == 'de' ? "Dauer: " + duration + " Minute(n)" : "Durée est de " + duration + " Minute(s):",  
                    text3: language == 'de' ? "Richtige:" : "Réponses:",
                    text4: language == 'de' ? "Intrusionen:" : "Intrusions:",
                    text5: language == 'de' ? "Wiederholungen:" : "Oublis à mesure:",
                    text6: language == 'de' ? "Fehler:" : "Erreurs:",
                    IDTextCountTimer: "txt-test10-page03-count-timer",
                    IDButtonControl1: "bt-test10-page03-control1",
                    textButtonControl1: language == 'de' ? "Beginnen" : "Commencer",
                    IDButtonControl2: "bt-test10-page03-control2",
                    textButtonControl2: language == 'de' ? "Reset" : "Réinitialiser",                   
                    IDTextArea: "txta-test10-page03-1",
                    IDText1: "txt-test10-page03-1",
                    IDButtonMinus1 : "bt-test10-page03-minus-1",
                    IDButtonPlus1 : "bt-test10-page03-plus-1",                    
                    IDText2: "txt-test10-page03-2",
                    IDButtonMinus2 : "bt-test10-page03-minus-2",
                    IDButtonPlus2 : "bt-test10-page03-plus-2",
                    IDText3: "txt-test10-page03-3",
                    IDButtonMinus3 : "bt-test10-page03-minus-3",
                    IDButtonPlus3 : "bt-test10-page03-plus-3",
                    IDText4: "txt-test10-page03-4",
                    IDButtonMinus4 : "bt-test10-page03-minus-4",
                    IDButtonPlus4 : "bt-test10-page03-plus-4",                    
                    IDButton: "bt-test10-page03-continuer",
                    txtButton: language == 'de' ? "Weiter" : "Continuer"
                });
                break; 
            }

            case 4: {
                let reponses = Number(req.query.reponses);
                let intrusions = Number(req.query.intrusions);
                let oublis_a_mesure = Number(req.query.oublis_a_mesure);
                let erreurs = Number(req.query.erreurs);

                res.render('clinician/test-screens/fvsem/page04', {
                    text1: language == 'de' ? "Verbale Flüssigkeit - Tiere" : "Fluence Verbale - Animaux",                    
                    text2: language == 'de' ? "Score" : "Résultats",
                    text3: language == 'de' ? "Richtige: " + reponses : "Réponses: " + reponses,                    
                    text4: language == 'de' ? "Intrusionen: " + intrusions : "Intrusions: " + intrusions,                      
                    text5: language == 'de' ? "Wiederholungen: " + oublis_a_mesure : "Oublis à mesure: " + oublis_a_mesure,                    
                    text6: language == 'de' ? "Fehler: " + erreurs : "Erreurs: " + erreurs,                                          
                    IDButton: "bt-test10-page04-terminer",
                    txtButton: language == 'de' ? "Beenden" : "Terminer"
                });
                break; 
            }

            case 5:
                res.render('clinician/test-screens/fvsem/page02', {
                    text1: language == 'de' ? "Verbale Flüssigkeit: Kategorie 'Früchte'" : "Fluence Verbale – Fruits",                    
                    text2: language == 'de' ? "\"Ich werde Ihnen eine Kategorie nennen und möchte, dass Sie so schnell Sie können alle Dinge aufzählen, die in diese Kategorie gehören. Wenn ich zum Beispiel 'Kleidungsstücke' sage, können Sie 'Hemd', 'Krawatte' oder 'Hut', usw. aufzählen. Können Sie mir weitere Kleidungsstücke nennen? \"" : "Pouvez-vous me dire en deux minutes le plus possible de noms que vous connaissez dans la catégorie des noms de <b>fruits</b>, sans répétition. Avez-vous bien compris ?",
                    text3: language == 'de' ? "Warten Sie bis die TP <b>zwei</b> Wörter genannt hat. Gelingt es ihr, dann sagen Sie, dass die Antworten korrekt sind und fahren Sie mit dem eigentlichen Test <b>(Kategorie 'Früchte')</b> fort. Nennt die TP ein falsches Wort oder gibt eine unpassende Antwort, korrigieren Sie die Antwort und wiederholen Sie die Instruktion. Misslingt es der TP abermals zu antworten, wiederholen Sie die Instruktion ein zweites Mal. Wenn es eindeutig wird, dass die TP die Instruktion immer noch nicht versteht, beenden Sie diese Aufgabe und klären Sie ab, weshalb dies so ist." : "",
                    text4: language == 'de' ? "Wenn Sie überzeugt sind, dass die TP die Aufgabe versteht und zwei Wörter genannt hat, die Kleidungsstücke bezeichnen, sagen Sie:" : "",
                    text5: language == 'de' ? "\"Gut! Ich möchte Sie nun bitten, mir alle Dinge aufzuzählen, die zu einer anderen Kategorie gehören, nämlich zur Kategorie, 'Früchte'. Sie haben eine Minute Zeit. Sind Sie bereit? Bitte beginnen Sie!\"" : "",
                    text6: language == 'de' ? "Die Bearbeitungszeit dieses Tests ist auf 60 Sekunden beschränkt. Hört die TP vor Ablauf dieser Zeit auf, ermutigen Sie sie weitere Wörter zu finden. Nennt er/sie länger als 15 Sekunden keine Tiere, wiederholen Sie die Instruktion (<span class='text-primary'>\"Zählen Sie mir alle Früchte auf, die Ihnen in den Sinn kommen\"</span>). Auch wenn die Instruktion während der Untersuchung wiederholt werden muss, wird kein Zeitzuschlag gewährt!" : "",
                    text7: language == 'de' ? "Wählen Sie die Dauer in Minuten" : "Choisissez la durée en minutes:",
                    IDButton1: "bt-test10-page05-1",
                    txtButton1: "1 minute",
                    IDButton2: "bt-test10-page05-2",
                    txtButton2: language == 'de' ? "2 minuten" : "2 minutes",
                    IDButton: "bt-test10-page05-commencer",
                    txtButton: language == 'de' ? "Start" : "Commencer"
                });
                break;

            case 6: {
                let duration = Number(req.query.duration);

                res.render('clinician/test-screens/fvsem/page03', {
                    text1: language == 'de' ? "Verbale Flüssigkeit - Früchte" : "Fluence Verbale - Fruits",                    
                    text2: language == 'de' ? "Dauer: " + duration + " Minute(n)" : "Durée est de " + duration + " Minute(s):",  
                    text3: language == 'de' ? "Richtige:" : "Réponses:",
                    text4: language == 'de' ? "Intrusionen:" : "Intrusions:",
                    text5: language == 'de' ? "Wiederholungen:" : "Oublis à mesure:",
                    text6: language == 'de' ? "Fehler:" : "Erreurs:",
                    IDTextCountTimer: "txt-test10-page06-count-timer",
                    IDButtonControl1: "bt-test10-page06-control1",
                    textButtonControl1: language == 'de' ? "Beginnen" : "Commencer",
                    IDButtonControl2: "bt-test10-page06-control2",                    
                    textButtonControl2: language == 'de' ? "Reset" : "Réinitialiser",
                    IDTextArea: "txta-test10-page06-1",
                    IDText1: "txt-test10-page06-1",
                    IDButtonMinus1 : "bt-test10-page06-minus-1",
                    IDButtonPlus1 : "bt-test10-page06-plus-1",                    
                    IDText2: "txt-test10-page06-2",
                    IDButtonMinus2 : "bt-test10-page06-minus-2",
                    IDButtonPlus2 : "bt-test10-page06-plus-2",
                    IDText3: "txt-test10-page06-3",
                    IDButtonMinus3 : "bt-test10-page06-minus-3",
                    IDButtonPlus3 : "bt-test10-page06-plus-3",
                    IDText4: "txt-test10-page06-4",
                    IDButtonMinus4 : "bt-test10-page06-minus-4",
                    IDButtonPlus4 : "bt-test10-page06-plus-4",                    
                    IDButton: "bt-test10-page06-continuer",
                    txtButton: language == 'de' ? "Weiter" : "Continuer"
                });
                break;
            }

            case 7: {
                let reponses = Number(req.query.reponses);
                let intrusions = Number(req.query.intrusions);
                let oublis_a_mesure = Number(req.query.oublis_a_mesure);
                let erreurs = Number(req.query.erreurs);

                res.render('clinician/test-screens/fvsem/page04', {
                    text1: language == 'de' ? "Verbale Flüssigkeit - Früchte" : "Fluence Verbale - Fruits",                    
                    text2: language == 'de' ? "Score" : "Résultats",
                    text3: language == 'de' ? "Richtige: " + reponses : "Réponses: " + reponses,                    
                    text4: language == 'de' ? "Intrusionen: " + intrusions : "Intrusions: " + intrusions,                      
                    text5: language == 'de' ? "Wiederholungen: " + oublis_a_mesure : "Oublis à mesure: " + oublis_a_mesure,                    
                    text6: language == 'de' ? "Fehler: " + erreurs : "Erreurs: " + erreurs,                                          
                    IDButton: "bt-test10-page07-terminer",
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