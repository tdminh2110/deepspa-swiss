const session = require('../common/session');

exports.test37_digital_span_showpage = function(req, res) {
    if (session.checkSession(req, 2)) {
        let page = Number(req.query.page);

        switch (page) {
            case 1:
                res.render('clinician/test-screens/digital_span/page01', {
                    text1: "Anweisungen für das Zahlennachsprechen vorwärts",                    
                    text2: "Ich werde Ihnen jetzt einige Zahlen vorsprechen. Hören Sie aufmerksam zu. Wenn ich fertig bin, sprechen Sie sie bitte genauso nach.",
                    text3: "Lesen Sie die erste Zahlenfolge des ersten Durchgangs vor. Achten Sie darauf, dass sie jede Zahl mit einer Geschwindigkeit von 1 Sekunde vorlesen. Dies ist für die Durchführungsobjektivität unerlässlich! Geben Sie unabhängig davon, ob der Proband die Folge richtig repetiert oder nicht, anschliessend die zweite Folge des ersten Durchgangs vor. Wiederholt der Proband eine der beiden Folgen richtig, fahren Sie mit der Durchführung des zweiten Durchgangs fort. Verfahren Sie bei der Durchführung der weiteren Folgen entsprechend.",
                    IDButton: "bt-test37-page" + page + "-continuer",
                    txtButton: "Weiter"
                });
                break;

            case 2:
                res.render('clinician/test-screens/digital_span/page02', {
                    text1: "Aufgabe 1",                    
                    text2: "Erste Folge",
                    IDButtonAudio1: "btaudio-test37-page" + page + "-1",
                    IDAudio1: "audio-test37-page" + page + "-1",
                    pathAudio1: "/tests/digital_span/direct_order/mp3/6-2-9.mp3",
                    text3: "6 - 2 - 9",
                    IDButton1: "bt-test37-page" + page + "-1",
                    txtButton1: "Korrekt",
                    IDButton2: "bt-test37-page" + page + "-2",
                    txtButton2: "Falsch",                        
                    text4: "Zweite Folge",
                    IDButtonAudio2: "btaudio-test37-page" + page + "-2",
                    IDAudio2: "audio-test37-page" + page + "-2",
                    pathAudio2: "/tests/digital_span/direct_order/mp3/3-7-5.mp3",
                    text5: "3 - 7 - 5",  
                    IDButton3: "bt-test37-page" + page + "-3",
                    txtButton3: "Korrekt",
                    IDButton4: "bt-test37-page" + page + "-4",
                    txtButton4: "Falsch",                  
                    IDButtonLeft: "bt-test37-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test37-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 3:
                res.render('clinician/test-screens/digital_span/page02', {
                    text1: "Aufgabe 2",                    
                    text2: "Erste Folge",
                    IDButtonAudio1: "btaudio-test37-page" + page + "-1",
                    IDAudio1: "audio-test37-page" + page + "-1",
                    pathAudio1: "/tests/digital_span/direct_order/mp3/5-4-1-7.mp3",
                    text3: "5 - 4 - 1 - 7",
                    IDButton1: "bt-test37-page" + page + "-1",
                    txtButton1: "Korrekt",
                    IDButton2: "bt-test37-page" + page + "-2",
                    txtButton2: "Falsch",                        
                    text4: "Zweite Folge",
                    IDButtonAudio2: "btaudio-test37-page" + page + "-2",
                    IDAudio2: "audio-test37-page" + page + "-2",
                    pathAudio2: "/tests/digital_span/direct_order/mp3/8-3-9-6.mp3",
                    text5: "8 - 3 - 9 - 6",  
                    IDButton3: "bt-test37-page" + page + "-3",
                    txtButton3: "Korrekt",
                    IDButton4: "bt-test37-page" + page + "-4",
                    txtButton4: "Falsch",                  
                    IDButtonLeft: "bt-test37-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test37-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 4:
                res.render('clinician/test-screens/digital_span/page02', {
                    text1: "Aufgabe 3",                    
                    text2: "Erste Folge",
                    IDButtonAudio1: "btaudio-test37-page" + page + "-1",
                    IDAudio1: "audio-test37-page" + page + "-1",
                    pathAudio1: "/tests/digital_span/direct_order/mp3/3-6-9-2-5.mp3",
                    text3: "3 - 6 - 9 - 2 - 5",
                    IDButton1: "bt-test37-page" + page + "-1",
                    txtButton1: "Korrekt",
                    IDButton2: "bt-test37-page" + page + "-2",
                    txtButton2: "Falsch",                        
                    text4: "Zweite Folge",
                    IDButtonAudio2: "btaudio-test37-page" + page + "-2",
                    IDAudio2: "audio-test37-page" + page + "-2",
                    pathAudio2: "/tests/digital_span/direct_order/mp3/6-9-4-7-1.mp3",
                    text5: "6 - 9 - 4 - 7 - 1",  
                    IDButton3: "bt-test37-page" + page + "-3",
                    txtButton3: "Korrekt",
                    IDButton4: "bt-test37-page" + page + "-4",
                    txtButton4: "Falsch",                  
                    IDButtonLeft: "bt-test37-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test37-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 5:
                res.render('clinician/test-screens/digital_span/page02', {
                    text1: "Aufgabe 4",                    
                    text2: "Erste Folge",
                    IDButtonAudio1: "btaudio-test37-page" + page + "-1",
                    IDAudio1: "audio-test37-page" + page + "-1",
                    pathAudio1: "/tests/digital_span/direct_order/mp3/9-1-8-4-2-7.mp3",
                    text3: "9 - 1 - 8 - 4 - 2 - 7",
                    IDButton1: "bt-test37-page" + page + "-1",
                    txtButton1: "Korrekt",
                    IDButton2: "bt-test37-page" + page + "-2",
                    txtButton2: "Falsch",                        
                    text4: "Zweite Folge",
                    IDButtonAudio2: "btaudio-test37-page" + page + "-2",
                    IDAudio2: "audio-test37-page" + page + "-2",
                    pathAudio2: "/tests/digital_span/direct_order/mp3/6-3-5-4-8-2.mp3",
                    text5: "6 - 3 - 5 - 4 - 8 - 2",  
                    IDButton3: "bt-test37-page" + page + "-3",
                    txtButton3: "Korrekt",
                    IDButton4: "bt-test37-page" + page + "-4",
                    txtButton4: "Falsch",                  
                    IDButtonLeft: "bt-test37-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test37-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 6:
                res.render('clinician/test-screens/digital_span/page02', {
                    text1: "Aufgabe 5",                    
                    text2: "Erste Folge",
                    IDButtonAudio1: "btaudio-test37-page" + page + "-1",
                    IDAudio1: "audio-test37-page" + page + "-1",
                    pathAudio1: "/tests/digital_span/direct_order/mp3/1-2-8-5-3-4-6.mp3",
                    text3: "1 - 2 - 8 - 5 - 3 - 4 - 6",
                    IDButton1: "bt-test37-page" + page + "-1",
                    txtButton1: "Korrekt",
                    IDButton2: "bt-test37-page" + page + "-2",
                    txtButton2: "Falsch",                        
                    text4: "Zweite Folge",
                    IDButtonAudio2: "btaudio-test37-page" + page + "-2",
                    IDAudio2: "audio-test37-page" + page + "-2",
                    pathAudio2: "/tests/digital_span/direct_order/mp3/2-8-1-4-9-7-5.mp3",
                    text5: "2 - 8 - 1 - 4 - 9 - 7 - 5",  
                    IDButton3: "bt-test37-page" + page + "-3",
                    txtButton3: "Korrekt",
                    IDButton4: "bt-test37-page" + page + "-4",
                    txtButton4: "Falsch",                  
                    IDButtonLeft: "bt-test37-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test37-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 7:
                res.render('clinician/test-screens/digital_span/page02', {
                    text1: "Aufgabe 6",                    
                    text2: "Erste Folge",
                    IDButtonAudio1: "btaudio-test37-page" + page + "-1",
                    IDAudio1: "audio-test37-page" + page + "-1",
                    pathAudio1: "/tests/digital_span/direct_order/mp3/3-8-2-9-5-1-7-4.mp3",
                    text3: "3 - 8 - 2 - 9 - 5 - 1 - 7 - 4",
                    IDButton1: "bt-test37-page" + page + "-1",
                    txtButton1: "Korrekt",
                    IDButton2: "bt-test37-page" + page + "-2",
                    txtButton2: "Falsch",                        
                    text4: "Zweite Folge",
                    IDButtonAudio2: "btaudio-test37-page" + page + "-2",
                    IDAudio2: "audio-test37-page" + page + "-2",
                    pathAudio2: "/tests/digital_span/direct_order/mp3/5-9-1-8-2-6-4-7.mp3",
                    text5: "5 - 9 - 1 - 8 - 2 - 6 - 4 - 7",  
                    IDButton3: "bt-test37-page" + page + "-3",
                    txtButton3: "Korrekt",
                    IDButton4: "bt-test37-page" + page + "-4",
                    txtButton4: "Falsch",                  
                    IDButtonLeft: "bt-test37-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test37-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 8:
                res.render('clinician/test-screens/digital_span/page03', {
                    text1: "Anweisungen für das Zahlennachsprechen rückwärts",                    
                    text2: "Ich werde Ihnen jetzt noch einmal Zahlen vorsprechen. Wenn ich fertig bin, sollen Sie diesmal die Zahlen in genau umgekehrter Reihenfolge wiederholen. Wenn ich also 2-8 sage, dann müssten Sie (Pause) 8-2 antworten.",
                    text3: "Antwortet der Proband richtig, dann sagen Sie «Richtig» und führen diesen Untertest genau wie das Zahlennachsprechen vorwärts durch. Achten Sie wieder arauf, dass Sie die Folgen mit einer Sprechgeschwindigkeit von einer Sekunde pro Zahl vorlesen.",
                    text4: "Wiederholt der Proband die Beispielaufgabe falsch, dann sagen Sie: <span class=\"text-primary\">Nein, ich sagte 2-8, Sie müssten also 8-2 antworten. Versuchen Sie folgende Zahlen rückwärts zu wiederholen: 3-6.</span>",
                    text5: "Geben Sie weder bei dieser zweiten Beispielaufgabe noch bei allen folgenden Aufgaben Hilfestellung. Beginnen Sie danach mit der Durchführung des Zahlennachsprechens rückwärts, unabhängig davon, ob dem Probanden diese zweite Beispielaufgabe gelingt oder nicht.",
                    IDButtonLeft: "bt-test37-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test37-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 9:
                res.render('clinician/test-screens/digital_span/page02', {
                    text1: "Aufgabe 1",                    
                    text2: "Erste Folge",
                    IDButtonAudio1: "btaudio-test37-page" + page + "-1",
                    IDAudio1: "audio-test37-page" + page + "-1",
                    pathAudio1: "/tests/digital_span/indirect_order/mp3/5-1.mp3",
                    text3: "5 - 1",
                    IDButton1: "bt-test37-page" + page + "-1",
                    txtButton1: "Korrekt",
                    IDButton2: "bt-test37-page" + page + "-2",
                    txtButton2: "Falsch",                        
                    text4: "Zweite Folge",
                    IDButtonAudio2: "btaudio-test37-page" + page + "-2",
                    IDAudio2: "audio-test37-page" + page + "-2",
                    pathAudio2: "/tests/digital_span/indirect_order/mp3/3-8.mp3",
                    text5: "3 - 8",  
                    IDButton3: "bt-test37-page" + page + "-3",
                    txtButton3: "Korrekt",
                    IDButton4: "bt-test37-page" + page + "-4",
                    txtButton4: "Falsch",                  
                    IDButtonLeft: "bt-test37-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test37-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 10:
                res.render('clinician/test-screens/digital_span/page02', {
                    text1: "Aufgabe 2",                    
                    text2: "Erste Folge",
                    IDButtonAudio1: "btaudio-test37-page" + page + "-1",
                    IDAudio1: "audio-test37-page" + page + "-1",
                    pathAudio1: "/tests/digital_span/indirect_order/mp3/4-9-3.mp3",
                    text3: "4 - 9 - 3",
                    IDButton1: "bt-test37-page" + page + "-1",
                    txtButton1: "Korrekt",
                    IDButton2: "bt-test37-page" + page + "-2",
                    txtButton2: "Falsch",                        
                    text4: "Zweite Folge",
                    IDButtonAudio2: "btaudio-test37-page" + page + "-2",
                    IDAudio2: "audio-test37-page" + page + "-2",
                    pathAudio2: "/tests/digital_span/indirect_order/mp3/5-2-6.mp3",
                    text5: "5 - 2 - 6",  
                    IDButton3: "bt-test37-page" + page + "-3",
                    txtButton3: "Korrekt",
                    IDButton4: "bt-test37-page" + page + "-4",
                    txtButton4: "Falsch",                  
                    IDButtonLeft: "bt-test37-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test37-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 11:
                res.render('clinician/test-screens/digital_span/page02', {
                    text1: "Aufgabe 3",                    
                    text2: "Erste Folge",
                    IDButtonAudio1: "btaudio-test37-page" + page + "-1",
                    IDAudio1: "audio-test37-page" + page + "-1",
                    pathAudio1: "/tests/digital_span/indirect_order/mp3/3-8-1-4.mp3",
                    text3: "3 - 8 - 1 - 4",
                    IDButton1: "bt-test37-page" + page + "-1",
                    txtButton1: "Korrekt",
                    IDButton2: "bt-test37-page" + page + "-2",
                    txtButton2: "Falsch",                        
                    text4: "Zweite Folge",
                    IDButtonAudio2: "btaudio-test37-page" + page + "-2",
                    IDAudio2: "audio-test37-page" + page + "-2",
                    pathAudio2: "/tests/digital_span/indirect_order/mp3/1-7-9-5.mp3",
                    text5: "1 - 7 - 9 - 5",  
                    IDButton3: "bt-test37-page" + page + "-3",
                    txtButton3: "Korrekt",
                    IDButton4: "bt-test37-page" + page + "-4",
                    txtButton4: "Falsch",                  
                    IDButtonLeft: "bt-test37-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test37-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 12:
                res.render('clinician/test-screens/digital_span/page02', {
                    text1: "Aufgabe 4",                    
                    text2: "Erste Folge",
                    IDButtonAudio1: "btaudio-test37-page" + page + "-1",
                    IDAudio1: "audio-test37-page" + page + "-1",
                    pathAudio1: "/tests/digital_span/indirect_order/mp3/6-2-9-7-2.mp3",
                    text3: "6 - 2 - 9 - 7 - 2",
                    IDButton1: "bt-test37-page" + page + "-1",
                    txtButton1: "Korrekt",
                    IDButton2: "bt-test37-page" + page + "-2",
                    txtButton2: "Falsch",                        
                    text4: "Zweite Folge",
                    IDButtonAudio2: "btaudio-test37-page" + page + "-2",
                    IDAudio2: "audio-test37-page" + page + "-2",
                    pathAudio2: "/tests/digital_span/indirect_order/mp3/4-8-5-2-7.mp3",
                    text5: "4 - 8 - 5 - 2 - 7",  
                    IDButton3: "bt-test37-page" + page + "-3",
                    txtButton3: "Korrekt",
                    IDButton4: "bt-test37-page" + page + "-4",
                    txtButton4: "Falsch",                  
                    IDButtonLeft: "bt-test37-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test37-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 13:
                res.render('clinician/test-screens/digital_span/page02', {
                    text1: "Aufgabe 5",                    
                    text2: "Erste Folge",
                    IDButtonAudio1: "btaudio-test37-page" + page + "-1",
                    IDAudio1: "audio-test37-page" + page + "-1",
                    pathAudio1: "/tests/digital_span/indirect_order/mp3/7-1-5-2-8-6.mp3",
                    text3: "7 - 1 - 5 - 2 - 8 - 6",
                    IDButton1: "bt-test37-page" + page + "-1",
                    txtButton1: "Korrekt",
                    IDButton2: "bt-test37-page" + page + "-2",
                    txtButton2: "Falsch",                        
                    text4: "Zweite Folge",
                    IDButtonAudio2: "btaudio-test37-page" + page + "-2",
                    IDAudio2: "audio-test37-page" + page + "-2",
                    pathAudio2: "/tests/digital_span/indirect_order/mp3/8-3-1-9-6-4.mp3",
                    text5: "8 - 3 - 1 - 9 - 6 - 4",  
                    IDButton3: "bt-test37-page" + page + "-3",
                    txtButton3: "Korrekt",
                    IDButton4: "bt-test37-page" + page + "-4",
                    txtButton4: "Falsch",                  
                    IDButtonLeft: "bt-test37-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test37-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 14:
                res.render('clinician/test-screens/digital_span/page02', {
                    text1: "Aufgabe 6",                    
                    text2: "Erste Folge",
                    IDButtonAudio1: "btaudio-test37-page" + page + "-1",
                    IDAudio1: "audio-test37-page" + page + "-1",
                    pathAudio1: "/tests/digital_span/indirect_order/mp3/4-7-3-9-1-2-8.mp3",
                    text3: "4 - 7 - 3 - 9 - 1 - 2 - 8",
                    IDButton1: "bt-test37-page" + page + "-1",
                    txtButton1: "Korrekt",
                    IDButton2: "bt-test37-page" + page + "-2",
                    txtButton2: "Falsch",                        
                    text4: "Zweite Folge",
                    IDButtonAudio2: "btaudio-test37-page" + page + "-2",
                    IDAudio2: "audio-test37-page" + page + "-2",
                    pathAudio2: "/tests/digital_span/indirect_order/mp3/8-1-2-9-3-6-5.mp3",
                    text5: "8 - 1 - 2 - 9 - 3 - 6 - 5",  
                    IDButton3: "bt-test37-page" + page + "-3",
                    txtButton3: "Korrekt",
                    IDButton4: "bt-test37-page" + page + "-4",
                    txtButton4: "Falsch",                  
                    IDButtonLeft: "bt-test37-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test37-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 15:
                let vor = "Anweisungen für das Zahlennachsprechen vorwärts: " + req.query.vor + " / 12";
                let ruc = "Anweisungen für das Zahlennachsprechen rückwärts: " + req.query.ruc + " / 12";

                res.render('clinician/test-screens/digital_span/page04', {
                    text1: "SCORES",                    
                    text2: vor,
                    text3: ruc,
                    IDButtonLeft: "bt-test37-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test37-page" + page + "-terminer",
                    txtButtonRight: "Beende"
                });
                break;
        }
    } else if (session.checkSession(req, 3)) {
        let page = Number(req.query.page); 

        switch (page) {
            case 2: case 3: case 4: case 5: case 6: case 7:
            case 9: case 10: case 11: case 12: case 13: case 14:
                let pathAudio1;
                let pathAudio2;

                switch(page) {
                    case 2:
                        pathAudio1 = "/tests/digital_span/direct_order/mp3/6-2-9.mp3";
                        pathAudio2 = "/tests/digital_span/direct_order/mp3/3-7-5.mp3";
                        break;                        

                    case 3:
                        pathAudio1 = "/tests/digital_span/direct_order/mp3/5-4-1-7.mp3";
                        pathAudio2 = "/tests/digital_span/direct_order/mp3/8-3-9-6.mp3";
                        break;

                    case 4:
                        pathAudio1 = "/tests/digital_span/direct_order/mp3/3-6-9-2-5.mp3";
                        pathAudio2 = "/tests/digital_span/direct_order/mp3/6-9-4-7-1.mp3";
                        break;

                    case 5:
                        pathAudio1 = "/tests/digital_span/direct_order/mp3/9-1-8-4-2-7.mp3";                    
                        pathAudio2 = "/tests/digital_span/direct_order/mp3/6-3-5-4-8-2.mp3";
                        break;

                    case 6:
                        pathAudio1 = "/tests/digital_span/direct_order/mp3/1-2-8-5-3-4-6.mp3";                    
                        pathAudio2 = "/tests/digital_span/direct_order/mp3/2-8-1-4-9-7-5.mp3";
                        break;
                    
                    case 7:
                        pathAudio1 = "/tests/digital_span/direct_order/mp3/3-8-2-9-5-1-7-4.mp3";                    
                        pathAudio2 = "/tests/digital_span/direct_order/mp3/5-9-1-8-2-6-4-7.mp3";
                        break;

                    case 9:
                        pathAudio1 = "/tests/digital_span/indirect_order/mp3/5-1.mp3";
                        pathAudio2 = "/tests/digital_span/indirect_order/mp3/3-8.mp3";
                        break;

                    case 10:
                        pathAudio1 = "/tests/digital_span/indirect_order/mp3/4-9-3.mp3";                    
                        pathAudio2 = "/tests/digital_span/indirect_order/mp3/5-2-6.mp3";
                        break;

                    case 11:
                        pathAudio1 = "/tests/digital_span/indirect_order/mp3/3-8-1-4.mp3";                   
                        pathAudio2 = "/tests/digital_span/indirect_order/mp3/1-7-9-5.mp3";
                        break;

                    case 12:
                        pathAudio1 = "/tests/digital_span/indirect_order/mp3/6-2-9-7-2.mp3";
                        pathAudio2 = "/tests/digital_span/indirect_order/mp3/4-8-5-2-7.mp3";
                        break;

                    case 13:
                        pathAudio1 = "/tests/digital_span/indirect_order/mp3/7-1-5-2-8-6.mp3";
                        pathAudio2 = "/tests/digital_span/indirect_order/mp3/8-3-1-9-6-4.mp3";
                        break;

                    case 14:
                        pathAudio1 = "/tests/digital_span/indirect_order/mp3/4-7-3-9-1-2-8.mp3";
                        pathAudio2 = "/tests/digital_span/indirect_order/mp3/8-1-2-9-3-6-5.mp3";
                        break;
                }

                res.render('patient/test-screens/digital_span/page01', {
                    IDButtonAudio1: "btaudio-test37-page" + page + "-1",
                    IDButtonAudio2: "btaudio-test37-page" + page + "-2",
                    IDAudio1: "audio-test37-page" + page + "-1",
                    pathAudio1: pathAudio1,
                    IDAudio2: "audio-test37-page" + page + "-2",
                    pathAudio2: pathAudio2
                });
                break;
        }
    } else {
        res.redirect('/'); 
    }
}