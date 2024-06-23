const session = require('../common/session');

exports.test41_trial_making_test_showpage = function(req, res) {
    if (session.checkSession(req, 2)) {      
        let page = Number(req.query.page);

        switch (page) {
            case 1: {
                res.render('clinician/test-screens/trial_making_test/page01', {
                    text1: "Trial Making Test",
                    text2: "Durchführung:",
                    text3: "Der Trail Making Test besteht aus zwei Teilen, A und B. Der Patient benötigt einen Stift und das vor ihm/ihr liegende Blatt, um jeden Teil auszuführen. Der Therapeut beginnt mit der Zeitnahme für sowohl Teil A als auch B, sobald die Anweisungen abgeschlossen sind und dem Teilnehmer signalisiert wird, zu beginnen. Stoppen Sie die Zeitnahme nicht, bis der Teilnehmer jeden entsprechenden Teil abgeschlossen hat oder die Zeitpunkte für das vorzeitige Beenden erreicht wurden.",
                    IDButton: "bt-test41-page" + page + "-continuer",
                    txtButton: "Weiter"
                });

                break;
            }
                
            case 2:
                res.render('clinician/test-screens/trial_making_test/page02', {
                    text1: "Trial Making A",
                    text2: "Durchführung:",
                    text3: "<span class='text-primary'><b>Der Untersucher instruiert den Patienten: 'Auf der vor Ihnen liegenden Seite befinden sich einige Zahlen' (Trails-A-Formular). 'Beginnen Sie bei der Zahl 1' (zeigen Sie auf die Zahl 1 auf Ihrem Beispieltest und halten Sie dieses in die Kamera) 'und ziehen Sie eine Linie von 1 zu 2' (zeigend), '2 zu 3' (zeigend), '3 zu 4 und so weiter, in aufsteigender Reihenfolge, bis Sie das Ende erreichen' (zeigen Sie auf den Kreis, der mit 'Ende' markiert ist). Bereit? Los geht's!'</b></span>",
                    text4: "(Starten Sie nun die Zeit, brechen Sie den Test ab, wenn der Patient nicht nach 100 Sekunden fertig ist)",                    
                    IDButton1: "bt-test41-page" + page + "-1",                            
                    txtButton1: "Start",
                    IDText: "txt-test41-page" + page,
                    IDButton2: "bt-test41-page" + page + "-2",                            
                    txtButton2: "Reset",
                    IDButtonLeft: "bt-test41-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test41-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 3:
                res.render('clinician/test-screens/trial_making_test/page02', {
                    text1: "Trial Making B",
                    text2: "Durchführung:",
                    text3: "<span class='text-primary'><b>Der Untersucher instruiert den Patienten: 'Auf dieser Seite befinden sich einige Zahlen und Buchstaben.' (Trails B Formular). 'Beginnen Sie bei 1' (zeigen Sie auf die Zahl 1 auf Ihrem Beispieltest und halten Sie dieses in die Kamera) 'und ziehen Sie eine Linie von 1 zu A' (zeigend), 'von A zu 2' (zeigend), 'von 2 zu B' (zeigend), 'von B zu 3' (zeigend), 'von 3 zu C und so weiter in aufsteigender Reihenfolge, bis Sie das Ende erreichen' (zeigend). 'Denken Sie daran, zuerst haben Sie eine Zahl, dann einen Buchstaben, dann eine Zahl, dann einen Buchstaben und so weiter. Zeichnen Sie Ihre Linien so schnell wie möglich.' (Wenn der Teilnehmer immer noch etwas verwirrt wirkt, fügen Sie hinzu: 'Denken Sie noch einmal daran: Zahl-Buchstabe, Zahl-Buchstabe'). 'Beginnen Sie hier' (zeigen Sie auf die 1). Bereit. Los geht's!'</b></span>",
                    text4: "(Starten Sie nun die Zeit, brechen Sie den Test ab, wenn der Patient nicht nach 300 Sekunden fertig ist)",
                    IDButton1: "bt-test41-page" + page + "-1",                            
                    txtButton1: "Start",
                    IDText: "txt-test41-page" + page,
                    IDButton2: "bt-test41-page" + page + "-2",                            
                    txtButton2: "Reset",
                    IDButtonLeft: "bt-test41-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test41-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 4:
                let a_time = Number(req.query.a_time);
                let b_time = Number(req.query.b_time);

                res.render('clinician/test-screens/trial_making_test/page03', {
                    text1: "SCORES",
                    text2: "Trial Making A = " + a_time + " Sekunden",
                    text3: "Trial Making B = " + b_time + " Sekunden",                    
                    IDTextArea: "txt-test41-page" + page,
                    IDButtonLeft: "bt-test41-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test41-page" + page + "-terminer",
                    txtButtonRight: "Beenden"                 
                });
                break;
        }
               
    } else if (session.checkSession(req, 3)) {
        let page = Number(req.query.page);
        
        switch (page) {
            case 70:            
                res.render('patient/test-screens/words_list/page02', {
                    urlImage: "/tests/words_list/image-70.png"
                });
                break;
        }
    } else {
        res.redirect('/'); 
    }
}