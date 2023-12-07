const session = require('../common/session');

const test17_lists = require('../../models/data/test17_stroop_vectoria');

exports.test17_stroop_vectoria_showpage = function(req, res) {
    if (session.checkSession(req, 2)) {      
        let page = Number(req.query.page);
        let language = req.query.language;

        switch(page) {
            case 1:
                res.render('clinician/test-screens/stroop_vectoria/page01', {
                    text1: "STROOP",
                    text2: language == 'de' ? "Dem Patienten den Test vorlegen." : "Introduire le test pour le patient.",                    
                    IDButton: "bt-test17-page01-continuer",
                    txtButton: language == 'de' ? "Weiter" : "Continuer"
                });
                break;

            case 2:
                res.render('clinician/test-screens/stroop_vectoria/page02', {
                    text1: language == 'de' ? "Tafel 1 : Farben" : "Planche 1 : Couleurs",
                    text2: language == 'de' ? "Beispiel" : "Exemple",                    
                    text3: "",
                    text4: "",                    
                    text5: language == 'de' ? "Sie werden auf dem Bildschirm eine Darstellung von farbigen Rechtecken sehen.</span>" : "<span class='text-info'>Vous allez voir sur l’écran une représentation de rectangles en couleur.</span>",
                    text6: language == 'de' ? "<span class='text-info'>Ich werde Sie bitten, die Güsse der Rechtecke von links nach rechts so schnell wie möglich und ohne Fehler zu benennen.</span>" : "<span class='text-info'>Je vais vous demander de nommer les couler des rectangles, de gauche à droite, le plus rapidement possible et sans vous tromper.</span>",
                    text7: language == 'de' ? "<span class='text-info'>Sie beginnen, wenn ich \"Los\" sage.</span>" : "<span class='text-info'>Vous commencerez lorsque je vous dirais \"Partez\".</span>",
                    IDButtonLeft: "bt-test17-page02-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test17-page02-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });
                break;

            case 3:
                res.render('clinician/test-screens/stroop_vectoria/page02', {
                    text1: language == 'de' ? "Tafel 1 : Farben" : "Planche 1 : Couleurs",
                    text2: language == 'de' ? "Beispiel" : "Exemple",                    
                    text3: language == 'de' ? "Antworten :" : "Réponses :",
                    text4: language == 'de' ? "Gelb, Grün, Blau, Rot" : "jaune, vert, bleu, rouge",                    
                    text5: language == 'de' ? "Wenn ein oder mehrere Fehler produziert werden, können bis zu zwei weitere Versuche vorgeschlagen werden (immer mit der Beispiellinie)." : "En cas de production d'une ou plusieurs erreurs, deux autres essais au maximum peuvent être proposés (toujours avec la ligne d'exemple).",
                    text6: language == 'de' ? "Wenn beim dritten Versuch ein oder mehrere Fehler produziert werden, beginnt die Prüfung trotzdem.Die" : "Si une ou plusieurs erreurs sont produites au troisième essai, l'épreuve débute quand même.",
                    text7: language == 'de' ? "Zeit für das Beispiel darf nicht gestoppt werden." : "Ne pas chronométrer l'exemple.",
                    IDButtonLeft: "bt-test17-page03-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test17-page03-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });
                break;

            case 4:
                res.render('clinician/test-screens/stroop_vectoria/page03', {
                    text1: language == 'de' ? "Tafel 1: Farben" : "Planche 1 : Couleurs",
                    text2: language == 'de' ? "Aufgabe" : "Epreuve",
                    text3: language == 'de' ? "Im weiteren Verlauf der Prüfung bleibt die Aufgabenstellung gleich: Sie müssen versuchen, die Farben der Punkte von links nach rechts, Zeile für Zeile, so schnell wie möglich und ohne Fehler zu benennen." : "Dans la suite de l'épreuve, la consigne demeure identique : vous devez essayer de nommer la couleur des points, de gauche à droite, ligne par ligne, le plus rapidement possible et sans vous tromper.",                    
                    text4: language == 'de' ? "Sie beginnen, wenn ich \"Los\" sage." : "Vous commencerez lorsque je vous dirais \"Partez\".",
                    text5: language == 'de' ? "Kreuzen Sie die Kästchen an, wenn der Patient einen Fehler macht. Kreuzen Sie das \"K\" an, wenn der Patient seinen Fehler korrigiert." : "Cochez les cases lorsque le patient fait une erreur. Cochez le \"C\" lorsque le patient corrige son erreur",                                        
                    IDButtonLeft: "bt-test17-page04-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test17-page04-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });
                break;
            
            case 5: {
                let listColors = [];
            
                if (language == 'de') {
                    for (let i = 0; i < test17_lists.listColors04.length; i++) {                    
                        for (let j = 0; j < test17_lists.listColors04[i].length; j++) {
                            let color = {
                                id0 : 'bt-test17-page05-color' + i + '-' + j,
                                id1 : 'bt-test17-page05-correction' + i + '-' + j,                            
                                name : test17_lists.listColors04[i][j]
                            };
                            listColors.push(color);
                        }
                    }
                } else {                
                    for (let i = 0; i < test17_lists.listColors01.length; i++) {                    
                        for (let j = 0; j < test17_lists.listColors01[i].length; j++) {
                            let color = {
                                id0 : 'bt-test17-page05-color' + i + '-' + j,
                                id1 : 'bt-test17-page05-correction' + i + '-' + j,                            
                                name : test17_lists.listColors01[i][j]
                            };
                            listColors.push(color);
                        }
                    }
                }

                res.render('clinician/test-screens/stroop_vectoria/page04', {
                    text1: language == 'de' ? "Tafel 1 :" : "Planche 1 :",
                    text2: language == 'de' ? "Farben - Aufgabe" : "Couleurs - Epreuve",
                    text3: language == 'de' ? "K" : "C",
                    IDTextCountTimer: "txt-test17-page05-count-timer",                                               
                    IDButtonControl1: "bt-test17-page05-control1",                                        
                    IDButtonControl2: "bt-test17-page05-control2",                                  
                    listColors : listColors,                                    
                    IDButtonLeft: "bt-test17-page05-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test17-page05-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });
                break;
            }

            case 6:
                res.render('clinician/test-screens/stroop_vectoria/page02', {
                    text1: language == 'de' ? "Tafel 2: Wörter" : "Planche 2 : Mots",
                    text2: language == 'de' ? "Beispiel" : "Exemple",                    
                    text3: "",
                    text4: "",                    
                    text5: language == 'de' ? "<span class='text-info'>Sie werden auf dem Bildschirm eine Darstellung von Wörtern in verschiedenen Farben sehen.</span>" : "<span class='text-info'>Vous allez voir sur l'écran une représentation de mots de différentes couleurs.</span>",
                    text6: language == 'de' ? "<span class='text-info'>Ich bitte Sie nun, mir die Farben der geschriebenen Wörter von links nach rechts so schnell wie möglich und ohne Fehler zu nennen.</span>" : "<span class='text-info'>Je vais vous demander de me donner les couleurs des mots écrits, de gauche à droite, le plus rapidement possible et sans vous tromper.</span>",
                    text7: language == 'de' ? "<span class='text-info'>Sie beginnen, wenn ich \"Los\" sage.</span>" : "<span class='text-info'>Vous commencerez lorsque je vous dirais \"Partez\".</span>",                    
                    IDButtonLeft: "bt-test17-page06-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test17-page06-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });
                break;

            case 7:
                res.render('clinician/test-screens/stroop_vectoria/page02', {
                    text1: language == 'de' ? "Tafel 2 : Wörter" : "Planche 2 : Mots",
                    text2: language == 'de' ? "Beispiel" : "Exemple",                    
                    text3: language == 'de' ? "Antworten :" : "Réponses :",
                    text4: language == 'de' ? "Grün (W), Blau (K), Rot (O), Gelb (U)" : "vert (M), bleu (P), rouge (D), jaune (Q)",                    
                    text5: language == 'de' ? "Wenn ein oder mehrere Fehler produziert werden, können maximal zwei weitere Versuche angeboten werden (immer mit der Beispielzeile)." : "En cas de production d'une ou plusieurs erreurs, deux autres essais au maximum peuvent être proposés (toujours avec la ligne d'exemple).",
                    text6: language == 'de' ? "Wenn beim dritten Versuch ein oder mehrere Fehler produziert werden, beginnt der Test trotzdem." : "Si une ou plusieurs erreurs sont produites au troisième essai, l'épreuve débute quand même.",
                    text7: language == 'de' ? "Die Zeit für das Beispiel darf nicht gestoppt werden." : "Ne pas chronométrer l'exemple.",
                    IDButtonLeft: "bt-test17-page07-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test17-page07-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });
                break;

            case 8:
                res.render('clinician/test-screens/stroop_vectoria/page03', {
                    text1: language == 'de' ? "Tafel 2 : Wörter" : "Planche 2 : Mots",
                    text2: language == 'de' ? "Aufgabe" : "Epreuve",
                    text3: language == 'de' ? "Im weiteren Verlauf der Prüfung bleibt die Aufgabenstellung gleich: Sie müssen versuchen, mir die Farben der vorgegebenen Wörter von links nach rechts, Zeile für Zeile, so schnell wie möglich und ohne Fehler zu nennen." : "Dans la suite de l'épreuve, la consigne demeure identique : vous devez essayer de me donner les couleurs des mots données, de gauche à droite, ligne par ligne, le plus rapidement possible et sans vous tromper.",                    
                    text4: language == 'de' ? "Sie beginnen, wenn ich \"Gehen Sie\" sage." : "Vous commencerez lorsque je vous dirais \"Partez\".",
                    text5: language == 'de' ? "Kreuzen Sie die Kästchen an, wenn der Patient einen Fehler macht. Kreuzen Sie das \"C\" an, wenn der Patient seinen Fehler korrigiert." : "Cochez les cases lorsque le patient fait une erreur. Cochez le \"C\" lorsque le patient corrige son erreur",                                        
                    IDButtonLeft: "bt-test17-page08-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test17-page08-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });
                break;

            case 9: {
                let listColors = [];
            
                if (language == 'de') {
                    for (let i = 0; i < test17_lists.listColors05.length; i++) {                    
                        for (let j = 0; j < test17_lists.listColors05[i].length; j++) {
                            let color = {
                                id0 : 'bt-test17-page09-color' + i + '-' + j,
                                id1 : 'bt-test17-page09-correction' + i + '-' + j,                            
                                name : test17_lists.listColors05[i][j]
                            };
                            listColors.push(color);
                        }
                    }
                } else {
                    for (let i = 0; i < test17_lists.listColors02.length; i++) {                    
                        for (let j = 0; j < test17_lists.listColors02[i].length; j++) {
                            let color = {
                                id0 : 'bt-test17-page09-color' + i + '-' + j,
                                id1 : 'bt-test17-page09-correction' + i + '-' + j,                            
                                name : test17_lists.listColors02[i][j]
                            };
                            listColors.push(color);
                        }
                    }
                }

                res.render('clinician/test-screens/stroop_vectoria/page04', {
                    text1: language == 'de' ? "Tafel 2:" : "Planche 2 :",
                    text2: language == 'de' ? "Wörter - Aufgabe" : "Mots - Epreuve",
                    text3: language == 'de' ? "K" : "C", 
                    IDTextCountTimer: "txt-test17-page09-count-timer",                                               
                    IDButtonControl1: "bt-test17-page09-control1",                                        
                    IDButtonControl2: "bt-test17-page09-control2",
                    listColors : listColors,                                    
                    IDButtonLeft: "bt-test17-page09-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test17-page09-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });
                break;
            }

            case 10:
                res.render('clinician/test-screens/stroop_vectoria/page02', {
                    text1: language == 'de' ? "Tafel 3 : Interferenzen" : "Planche 3 : Interférence",
                    text2: language == 'de' ? "Beispiel" : "Exemple",                    
                    text3: "",
                    text4: "",                    
                    text5: language == 'de' ? "<span class='text-info'>Sie werden auf dem Bildschirm eine Darstellung von Wörtern sehen, die in verschiedenen Farben geschrieben sind.</span>" : "<span class='text-info'>Vous allez voir sur l'écran une représentation de mots écrits dans différentes couleurs.</span>",
                    text6: language == 'de' ? "<span class='text-info'>Ich werde Sie bitten, die Wörter nicht zu lesen, sondern die Farbe der Tinte, in der sie geschrieben sind, von links nach rechts zu benennen, und zwar so schnell wie möglich, ohne sich zu irren.</span>" : "<span class='text-info'>Je vais vous demander de  ne pas lire les mots mais de nommer la couleur de l'encre dans laquelle ils sont écrits, de gauche à droite, le plus rapidement possible sans vous tromper.</span>",
                    text7: language == 'de' ? "<span class='text-info'>Sie beginnen, wenn ich \"Gehen\" sage.</span>" : "<span class='text-info'>Vous commencerez lorsque je vous dirais \"Partez\".</span>",
                    IDButtonLeft: "bt-test17-page10-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test17-page10-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });
                break;

            case 11:
                res.render('clinician/test-screens/stroop_vectoria/page02', {
                    text1: language == 'de' ? "Tafel 3 : Interferenzen" : "Planche 3 : Interférence",
                    text2: language == 'de' ? "Beispiel" : "Exemple",                    
                    text3: language == 'de' ? "Antworten :" : "Réponses :",
                    text4: language == 'de' ? "Blau (Ge), Grün (Bl), Rot (Gr), Gelb (Ro)" : "bleu (J), vert (R), rouge (V), jaune (B)",                    
                    text5: language == 'de' ? "Wenn ein oder mehrere Fehler produziert werden, können bis zu zwei weitere Versuche vorgeschlagen werden (immer mit der Beispiellinie)." : "En cas de production d'une ou plusieurs erreurs, deux autres essais au maximum peuvent être proposés (toujours avec la ligne d'exemple).",
                    text6: language == 'de' ? "Wenn beim dritten Versuch ein oder mehrere Fehler produziert werden, beginnt der Test trotzdem." : "Si une ou plusieurs erreurs sont produites au troisième essai, l'épreuve débute quand même.",
                    text7: language == 'de' ? "Die Zeit für das Beispiel darf nicht gestoppt werden." : "Ne pas chronométrer l'exemple.",
                    IDButtonLeft: "bt-test17-page11-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test17-page11-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });
                break;

            case 12:
                res.render('clinician/test-screens/stroop_vectoria/page03', {
                    text1: language == 'de' ? "Tafel 3 : Interferenz" : "Planche 3 : Interférence",
                    text2: language == 'de' ? "Aufgabe" : "Epreuve",
                    text3: language == 'de' ? "Im weiteren Verlauf der Prüfung bleibt die Aufgabenstellung gleich: Sie müssen versuchen, die Farbe der Tinte, in der die Wörter geschrieben sind, von links nach rechts so schnell wie möglich und ohne Fehler zu benennen." : "Dans la suite de l'épreuve, la consigne demeure identique : vous devez essayer de nommer la couleur de l’encre dans laquelle sont écrits les mots, de gauche à droite, le plus rapidement possible et sans vous tromper.",                    
                    text4: language == 'de' ? "Sie beginnen, wenn ich \"Gehen Sie\" sage." : "Vous commencerez lorsque je vous dirais \"Partez\".",
                    text5: language == 'de' ? "Kreuzen Sie die Kästchen an, wenn der Patient einen Fehler macht. Kreuzen Sie das \"C\" an, wenn der Patient seinen Fehler korrigiert." : "Cochez les cases lorsque le patient fait une erreur. Cochez le \"C\" lorsque le patient corrige son erreur",                                        
                    IDButtonLeft: "bt-test17-page12-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test17-page12-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });
                break;

            case 13: {
                let listColors = [];
            
                if (language == 'de') {
                    for (let i = 0; i < test17_lists.listColors06.length; i++) {                    
                        for (let j = 0; j < test17_lists.listColors06[i].length; j++) {
                            let color = {
                                id0 : 'bt-test17-page13-color' + i + '-' + j,
                                id1 : 'bt-test17-page13-correction' + i + '-' + j,                            
                                name : test17_lists.listColors06[i][j]
                            };
                            listColors.push(color);
                        }
                    }
                } else {
                    for (let i = 0; i < test17_lists.listColors03.length; i++) {                    
                        for (let j = 0; j < test17_lists.listColors03[i].length; j++) {
                            let color = {
                                id0 : 'bt-test17-page13-color' + i + '-' + j,
                                id1 : 'bt-test17-page13-correction' + i + '-' + j,                            
                                name : test17_lists.listColors03[i][j]
                            };
                            listColors.push(color);
                        }
                    }
                }

                res.render('clinician/test-screens/stroop_vectoria/page04', {
                    text1: language == 'de' ? "Tafel 3 :" : "Planche 3 :",
                    text2: language == 'de' ? "Interferenzen - Aufgabe" : "Interférence - Epreuve",
                    text3: language == 'de' ? "K" : "C",  
                    IDTextCountTimer: "txt-test17-page13-count-timer",                                               
                    IDButtonControl1: "bt-test17-page13-control1",                                        
                    IDButtonControl2: "bt-test17-page13-control2",
                    listColors : listColors,                                    
                    IDButtonLeft: "bt-test17-page13-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test17-page13-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });
                break;
            }

            case 14: {
                let x1 = Number(req.query.x1);
                let y1 = Number(req.query.y1);
                let z1 = Number(req.query.z1);
                let x2 = Number(req.query.x2);
                let y2 = Number(req.query.y2);
                let z2 = Number(req.query.z2);
                let x3 = Number(req.query.x3);
                let y3 = Number(req.query.y3);
                let z3 = Number(req.query.z3);                

                res.render('clinician/test-screens/stroop_vectoria/page05', {
                    text1: language == 'de' ? "Ergebnisse" : "Résultats",
                    text2: language == 'de' ? "Tafel 1: <span class=\"text-danger\"><b>" + x1 + "</b></span> Sekunden / <span class=\"text-danger\"><b>" + y1 + "</b></span> Fehler, davon <span class=\"text-danger\"><b>" + z1 + "</b></span> korrigiert" : "Planche 1: <span class=\"text-danger\"><b>" + x1 + "</b></span> Secondes / <span class=\"text-danger\"><b>" + y1 + "</b></span> erreurs dont <span class=\"text-danger\"><b>" + z1 + "</b></span> corrigées",
                    text3: language == 'de' ? "Tafel 2: <span class=\"text-danger\"><b>" + x2 + "</b></span> Sekunden / <span class=\"text-danger\"><b>" + y2 + "</b></span> Fehler, davon <span class=\"text-danger\"><b>" + z2 + "</b></span> korrigiert" : "Planche 2: <span class=\"text-danger\"><b>" + x2 + "</b></span> Secondes / <span class=\"text-danger\"><b>" + y2 + "</b></span> erreurs dont <span class=\"text-danger\"><b>" + z2 + "</b></span> corrigées",                    
                    text4: language == 'de' ? "Tafel 3: <span class=\"text-danger\"><b>" + x3 + "</b></span> Sekunden / <span class=\"text-danger\"><b>" + y3 + "</b></span> Fehler, davon <span class=\"text-danger\"><b>" + z3 + "</b></span> korrigiert" : "Planche 3: <span class=\"text-danger\"><b>" + x3 + "</b></span> Secondes / <span class=\"text-danger\"><b>" + y3 + "</b></span> erreurs dont <span class=\"text-danger\"><b>" + z3 + "</b></span> corrigées",
                    IDButtonLeft: "bt-test17-page14-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test17-page14-terminer",
                    txtButtonRight: language == 'de' ? "Beenden" : "Terminer"
                });
                break;
            }
        }
    } else if (session.checkSession(req, 3)) {      
        let page = Number(req.query.page);
        let language = req.query.language;
        
        switch(page) {
            case 3: case 5: 
                res.render('patient/test-screens/stroop_vectoria/page01', {
                    urlImage: "/tests/stroop_vectoria/image" + page + ".jpg"
                });
                break;
            
            case 7: case 9: case 11: case 13:
                res.render('patient/test-screens/stroop_vectoria/page01', {
                    urlImage: language == 'de' ? "/tests/stroop_vectoria/image" + page + "_de.jpg" : "/tests/stroop_vectoria/image" + page + ".jpg"
                });
                break;           
        }    
    }
}