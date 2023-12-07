const session = require('../common/session');

exports.test38_bnt_15_showpage = function(req, res) {
    if (session.checkSession(req, 2)) {      
        let page = Number(req.query.page);

        switch (page) {
            case 1:
                res.render('clinician/test-screens/bnt_15/page01', {
                    text1: "15 Items des Boston Naming Test",
                    text2: "Kaplan E, Goodglass H, Weintraub S, Segal O. (1978). Boston Naming Test. Lea & Febiger, Philadelphia.",
                    text3: "Dieser Test untersucht die sprachliche Fähigkeit der TP Objekte, welche als Strichzeichnungen vorliegen, zu benennen. Diese Kurzform enthält 15 Items, welche dem Boston Naming Test (Kaplan et al., 1978) entnommen sind. Die Auswahl enthält 5 häufige, 5 mittelhäufige und 5 weniger häufige Items. Jeder TP werden alle 15 Items (siehe Testheft) angeboten. Die richtigen Bezeichnungen der abgebildeten Objekte befinden sich auf dem Antwortblatt.",                    
                    IDButton: "bt-test38-page" + page + "-continuer",
                    txtButton: "Weiter"
                });
                break;

            case 2:
                res.render('clinician/test-screens/bnt_15/page02', {
                    text1: "Instruktion:",
                    text2: "\"Nun werde ich Ihnen einige Bilder zeigen. Bitte sagen Sie mir, wie diese Dinge heissen.\"",
                    text3: "Fragen Sie bei jedem Bild:",
                    text4: "\"Wie ist der Name dieses Gegenstandes?\" oder \"Wie heisst das?\"",
                    text5: "Notieren Sie fortlaufend alle Antworten wörtlich. Ist die Antwort falsch, notieren Sie die Antwort der TP und fahren Sie mit dem nächsten Item fort. Gewähren Sie pro Bild eine maximale Antwortzeit von 10 Sekunden. Ist die TP nicht in der Lage, das Bild in dieser Zeit zu benennen, ermuntern Sie die TP und gehen Sie zum nächsten Item über.",
                    text6: "Macht die TP einen Fehler und korrigiert sich selbst spontan, wird die Antwort als richtig gewertet.",
                    text7: "Es dürfen keine semantischen oder phonematischen Hilfen angeboten werden. Eine unspezifische Hilfe darf nur dann angeboten werden, wenn die Antwort zu allgemein ist. Zum Beispiel, wenn die TP für das Item 'Kanu' die Antwort 'Boot' gibt, fragen Sie dann: \"Gibt es einen anderen Namen dafür?\", aber fragen Sie nicht: \"Ist dies nicht eine spezielle Art von Boot?\" Müssen Sie eine Hilfe nach einer zu allgemeinen Antwort (z.B. 'Boot') anbieten, wird nur die korrigierte Antwort (z.B. 'Kanu') bewertet. Regionale Varianten von Ausdrücken und Synonyme, falls verifiziert, werden als richtig bewertet.",
                    IDButtonLeft: "bt-test38-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test38-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 3:
                res.render('clinician/test-screens/bnt_15/page03', {
                    text1: "\"Nun werde ich Ihnen einige Bilder zeigen. Bitte sagen Sie mir, wie diese Dinge heissen.\"",
                    text2: "(Notieren Sie alle Antworten wörtlich. Die maximale Bilddarbietungsdauer beträgt 10 Sekunden.)",
                    IDButtonLeft: "bt-test38-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test38-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 4: case 5: case 6: case 7: case 8:
            case 9: case 10: case 11: case 12: case 13:
            case 14: case 15: case 16: case 17: case 18:
                let word_show = "";

                switch(page) {
                    case 4: word_show = "Baum"; break;
                    case 5: word_show = "Bett"; break;
                    case 6: word_show = "Pfeife"; break;
                    case 7: word_show = "Blume"; break;
                    case 8: word_show = "Haus"; break;
                    case 9: word_show = "Kanu"; break;
                    case 10: word_show = "Zahnbürste"; break;
                    case 11: word_show = "Vulkan"; break;
                    case 12: word_show = "Maske"; break;
                    case 13: word_show = "Kamel"; break;
                    case 14: word_show = "Mundharmonika"; break;
                    case 15: word_show = "Zange"; break;
                    case 16: word_show = "Hängematte"; break;
                    case 17: word_show = "Trichter"; break;
                    case 18: word_show = "Dominosteine"; break;
                }
                
                res.render('clinician/test-screens/bnt_15/page04', {
                    text1: word_show,
                    text2: "Antwort:",
                    IDTextCountTimer: 'txt-test38-page' + page + '-count-timer',
                    urlImage: "/tests/bnt_15/image" + page + ".jpg",
                    IDText: "txt-test38-page" + page,
                    IDButton1: "bt-test38-page" + page + "-1",
                    txtButton1: "falsch",
                    IDButton2: "bt-test38-page" + page + "-2",
                    txtButton2: "richtig",     
                    IDButtonLeft: "bt-test38-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test38-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 19:
                let haufig = Number(req.query.haufig);
                let mittel = Number(req.query.mittel);
                let selten = Number(req.query.selten);

                let total = haufig + mittel + selten;

                res.render('clinician/test-screens/bnt_15/page05', {
                    text1: "Scores",
                    text2: "HÄUFIG = " + haufig + " / 5",
                    text3: "MITTEL = " + mittel + " / 5",
                    text4: "SELTEN = " + selten + " / 5",
                    text5: "TOTAL = " + total + " / 15",
                    IDButtonLeft: "bt-test38-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test38-page" + page + "-terminer",
                    txtButtonRight: "Beende"
                });
                break;
        }         
    } else if (session.checkSession(req, 3)) {
        let page = Number(req.query.page);
        
        switch (page) {
            case 4: case 5: case 6: case 7: case 8:
            case 9: case 10: case 11: case 12: case 13:
            case 14: case 15: case 16: case 17: case 18:
                res.render('patient/test-screens/bnt_15/page01', {
                    urlImage: "/tests/bnt_15/image" + page + ".jpg",
                });
                break;
        }
    } else {
        res.redirect('/'); 
    }
}