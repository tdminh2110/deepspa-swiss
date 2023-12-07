const session = require('../common/session');

exports.test31_moca_showpage = function(req, res) {
    if (session.checkSession(req, 2)) {      
        let page = Number(req.query.page);
        let language = req.query.language;

        switch (page) {
            case 1:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page15', {
                        text1: "Montreal Cognitive Assessment",
                        text2: "(MOCA)",
                        text3: "Anweisungen zur Durchführung und Auswertung",
                        text4: "Der Montreal-Cognitive-Assessment (MoCA)-Test wurde entwickelt als ein schnell durchzuführendes Screening-Instrument für leichte kognitive Einbußen. Er berücksichtigt unterschiedliche kognitive Bereiche: Aufmerksamkeit und Konzentration, Exekutivfunktionen, Gedächtnis, Sprache, visuokonstruktive Fähigkeiten, konzeptuelles Denken, Rechnen und Orientierung. Der zeitliche Rahmen der Durchführung beträgt ungefähr 10 Minuten. Das höchstmögliche Auswertungsergebnis sind 30 Punkte, ein Ergebnis von 26 oder mehr Punkten wird als normal betrachtet.",                        
                        IDButton: "bt-test31-page" + page + "-continuer",
                        txtButton: "Weiter"
                    });
                else
                    res.render('clinician/test-screens/moca/page01', {
                        text1: "MOCA",
                        text2: "Montreal Cognitive Assessment",
                        text3: "Le Montreal cognitive assessment (MoCA) a été conçu pour l'évaluation des dysfonctions cognitives légères.",
                        text4: "Il évalue les fonctions suivantes : l'attention, la concentration, les fonctions exécutives, la mémoire, le langage, les capacités visuoconstructives, les capacités d'abstraction, le calcul et l'orientation.",
                        text5: "Le temps d'exécution est de dix minutes approximativement.",
                        text6: "Le nombre de points maximum est de 30; un score de 26 et plus est considéré normal.",
                        text7: "Attention",
                        text8: "Pour réaliser la passation, vous aurez besoin:",
                        text9: "d'une feuille de papier",
                        text10: "d'un crayon ou d'un stylo",
                        text11: "une copie imprimée de la partie \"Alternance conceptuelle\"",
                        IDButton: "bt-test31-page" + page + "-continuer",
                        txtButton: "Continuer"
                    });
                break;

            case 2:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page16', {
                        text1: "1. Verbindungstest (Alternating Trail Making)",
                        text2: "<u>Durchführung:</u> Der Untersucher instruiert den Probanden mit den Worten: <span class='text-primary'><i>„Bitte zeichnen Sie eine Linie, beginnend bei einer Zahl, danach zu einem Buchstaben in aufsteigender Reihenfolge. Bitte starten Sie hier [auf „1“ zeigen] und zeichnen eine Linie von der 1 dann zum A und dann zur 2 usw. Der Endpunkt ist hier [auf das „E“ zeigen].“</i></span>",
                        text3: "<u>Bewertung:</u> Ein Punkt wird vergeben, wenn der Proband die folgende Reihenfolge mit einem Strich verbindet: 1-A-2-B-3-C-4-D-5-E, ohne dabei überkreuzende Linien einzuzeichnen. Jeder Fehler, der nicht sofort selbst korrigiert wird, führt zur Bewertung mit 0 Punkten.",
                        IDButton: "bt-test31-page" + page,                            
                        txtButton: "ERFOLGREICH",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                else
                    res.render('clinician/test-screens/moca/page02', {
                        text1: "Alternance conceptuelle",
                        text2: "L'examinateur donne les instructions suivantes, en indiquant l'endroit approprié sur la feuille:",
                        text3: "<span class='text-primary'><b>« Je veux que vous traciez une ligne en alternant d'un chiffre à une lettre, tout en respectant l'ordre chronologique et l'ordre de l'alphabet.</b></span>",
                        text4: "<span class='text-primary'><b>Commencez ici</b></span> (indiquez le 1) <span class='text-primary'><b>et tracez la ligne vers la lettre A, ensuite vers le 2, etc.</b></span>",
                        text5: "<span class='text-primary'><b>Terminez ici. »</b></span> (indiquez le E).",
                        text6: "Cochez la case si le sujet réussi la séquence suivante: 1-A-2-B-3-C-4-D-5-E.",
                        text7: "N'allouez aucun point si une erreur n'est pas immédiatement corrigée par le sujet.",
                        IDButton: "bt-test31-page" + page,                            
                        txtButton: "Le patient a réussi",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 3:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page17', {
                        text1: "2. Visuokonstruktive Fähigkeiten (Würfel)",
                        text2: "<u>Durchführung:</u> Der Untersucher gibt die folgenden Instruktionen und zeigt dabei auf den <b>Würfel:</b> <span class='text-primary'><i>„Bitte kopieren Sie diese Zeichnung so genau wie möglich in der freien Fläche darunter“.</i></span>",
                        text3: "<u>Bewertung:</u> Ein Punkt wird vergeben für eine korrekt durchgeführte Zeichnung.",
                        text4: "Die Zeichnung muss dreidimensional sein.",
                        text5: "Alle Linien müssen gezeichnet sein.",
                        text6: "Keine Linie darf ergänzt werden.",
                        text7: "Die Linien sind relativ parallel und ihre Länge ist ähnlich (rechtwinklige Prismen werden akzeptiert).",
                        text8: "Der Punkt wird nicht vergeben, wenn eines der oben genannten Kriterien nichterfüllt ist.",
                        IDImage: "img-test31-page" + page,
                        urlImage: "/tests/moca/cube.png",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "ANZEIGEN",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "ERFOLGREICH",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                else
                    res.render('clinician/test-screens/moca/page03', {
                        text1: "Capacités visuoconstructives (cube)",
                        text2: "L'examinateur donne les instructions suivantes, en indiquant le cube:",
                        text3: "« Je veux que vous copiez ce dessin le plus précisément possible. »",
                        text4: "Cochez la case si le dessin est correctement réalisé.",
                        text5: "Le dessin doit être tridimensionnel",
                        text6: "Toutes les arêtes sont présentes",
                        text7: "Il n'y a pas d'arête supplémentaire",
                        text8: "Les arêtes sont relativement parallèles et de même longueur approximative (les prismes rectangulaires sont acceptables)",
                        IDImage: "img-test31-page" + page,
                        urlImage: "/tests/moca/cube.png",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "Afficher l'image",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "Le patient a réussi",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 4:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page18', {
                        text1: "3. Visuokonstruktive Fähigkeiten (Uhr)",
                        text2: "<u>Durchführung:</u> Weisen Sie auf den dafür vorgesehenen Raum auf dem Testzettel und geben Sie folgende Anweisung: <span class='text-primary'><i>„Zeichnen Sie eine Uhr mit allen Zahlen. Die Zeiger sollen auf 10 nach 11 stehen“.</i></span>",
                        text3: "<u>Auswertung:</u> Je ein Punkt wird vergeben für die Erfüllung der folgenden drei Kriterien:",
                        text4: "Kontur (1 Punkt): Der Uhrenumriss muss kreisförmig sein mit nur geringer Verzerrung (z. B. leichte Ungenauigkeit beim Kreisschluss);",
                        text5: "Zahlen (1 Punkt): Alle Stundenziffern müssen vorkommen ohne zusätzliche Ziffern; die Ziffern müssen in der korrekten Reihenfolge und in den entsprechenden Quadranten der Uhr zugeordnet sein; römische Zahlen werden akzeptiert; die Zahlen können auch außerhalb des Kreises platziert werden.",
                        text6: "Zeiger (1 Punkt): Es müssen zwei Zeiger gezeichnet werden, die die korrekte Zeit anzeigen. Der Stundenzeiger muss eindeutig kürzer sein als der Minutenzeiger, die Zeiger müssen in der Nähe der Uhrmitte zentriert sein.",
                        text7: "Wenn keine der oben genannten Kriterien erfüllt werden, wird kein Punkt vergeben.",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "Kontur",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "Zahlen",
                        IDButton3: "bt-test31-page" + page + "-3",                            
                        txtButton3: "Zeiger",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                else
                    res.render('clinician/test-screens/moca/page04', {
                        text1: "Capacités visuoconstructives (Horloge)",
                        text2: "L'examinateur donne les instructions suivantes:",
                        text3: "« Maintenant je veux que vous dessiniez une horloge en plaçant tous les chiffres et indiquant l'heure à 11h10 ».",
                        text4: "Cochez la case pour chaque critère respecté.",
                        text5: "Le contour doit être un cercle avec peu de déformation.",
                        text6: "Tous les chiffres doivent être présents sans aucun chiffre en surplus.",
                        text7: "Les chiffres doivent être dans le bon ordre et bien positionnés.",
                        text8: "Les chiffres Romains sont acceptés ainsi que les chiffres inscrits à l'extérieur du contour.",
                        text9: "Les deux aiguilles doivent indiquer la bonne heure.",
                        text10: "L'aiguille de l'heure doit être clairement plus petite que l'aiguille des minutes.",
                        text11: "La jonction des aiguilles doit être proche du centre de l'horloge.",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "Coutour",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "Chiffres",
                        IDButton3: "bt-test31-page" + page + "-3",                            
                        txtButton3: "Aiguilles",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 5:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page19', {
                        text1: "4. Benennen",
                        text2: "<u>Durchführung:</u> Links beginnend zeigen Sie auf jede Figur und sagen: <span class='text-primary'><i>„Nennen Sie mir den Namen dieses Tieres“.</i></span>",
                        text3: "<u>Bewertung:</u> Ein Punkt wird gegeben für die folgenden Antworten: (1) Kamel oder Dromedar, (2) Löwe, (3) Rhinozeros oder Nashorn",
                        IDImage: "img-test31-page" + page,
                        urlImage: "/tests/moca/animals.png",
                        IDLabel: "lbl-test31-page" + page,
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "ANZEIGEN",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "Löwe",
                        IDButton3: "bt-test31-page" + page + "-3",                            
                        txtButton3: "Rhinozeros oder Nashorn",
                        IDButton4: "bt-test31-page" + page + "-4",                            
                        txtButton4: "Kamel oder Dromedar",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                else
                    res.render('clinician/test-screens/moca/page05', {
                        text1: "Dénomination",
                        text2: "L'examinateur demande au sujet de nommer le nom de chacun des animaux, de la gauche vers la droite.",
                        text3: "Cochez la case pour chaque bonne réponse.",
                        IDImage: "img-test31-page" + page,
                        urlImage: "/tests/moca/animals.png",
                        IDLabel: "lbl-test31-page" + page,
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "Afficher les images",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "Lion",
                        IDButton3: "bt-test31-page" + page + "-3",                            
                        txtButton3: "Rhinocéros ou rhino",
                        IDButton4: "bt-test31-page" + page + "-4",                            
                        txtButton4: "Chameau ou dromadaire",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 6:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page20', {
                        text1: "5. Gedächtnis",
                        text2: "<u>Durchführung:</u> Der Untersucher liest eine Liste von fünf Worten in einer Geschwindigkeit von einem Wort pro Sekunde vor und gibt dabei die folgenden Anweisungen: <span class='text-primary'><i>„Dies ist ein Gedächtnistest. Ich werde Ihnen eine Liste von Wörtern vorlesen, die Sie sich merken sollen und später wieder erinnern sollen. Hören Sie bitte aufmerksam zu. Wenn ich sie Ihnen fertig vorgelesen habe, nennen Sie mir so viele Wörter wie Sie erinnern können. Dabei ist es egal, in welcher Reihenfolge Sie sie nennen.“</i></span> Markieren Sie im vorgesehenen Feld jedes Wort, das der Proband während des ersten Durchganges nennt. Wenn der Proband anzeigt, das er alle ihm in Erinnerung verbliebenen Worte genannt hat, lesen Sie die Liste ein zweites Mal vor mit der folgenden Instruktion: <span class='text-primary'><i>„Ich lese Ihnen nun die Liste noch ein zweites Mal vor. Versuchen Sie sie zu behalten und nennen Sie mir so viele Wörter wie Sie können, auch die Wörter, die Sie beim ersten Mal schon genannt haben.“</i></span> Machen Sie eine Markierung im vorgesehenen Feld für jedes Wort, das der Proband im zweiten Durchgang richtig wiedergibt.",
                        text3: "Am Ende des zweiten Durchganges informieren Sie den Probanden, dass die Worte später noch einmal wiedergegeben werden sollen, indem Sie sagen: <span class='text-primary'><i>„Ich werde Sie am Ende des Testes noch einmal bitten, alle diese Worte zu nennen.“</i></span>",                        
                        text4: "1. Versuch",
                        text5: "2. Versuch",
                        text6: "<u>Bewertung:</u> Für die Durchgänge 1 und 2 werden keine Punkte vergeben.",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "GESICHT",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "SAMT",
                        IDButton3: "bt-test31-page" + page + "-3",                            
                        txtButton3: "KIRCHE",
                        IDButton4: "bt-test31-page" + page + "-4",                            
                        txtButton4: "TULPE",
                        IDButton5: "bt-test31-page" + page + "-5",                            
                        txtButton5: "ROT",
                        IDButton6: "bt-test31-page" + page + "-6",                            
                        txtButton6: "GESICHT",
                        IDButton7: "bt-test31-page" + page + "-7",                            
                        txtButton7: "SAMT",
                        IDButton8: "bt-test31-page" + page + "-8",                            
                        txtButton8: "KIRCHE",
                        IDButton9: "bt-test31-page" + page + "-9",                            
                        txtButton9: "TULPE",
                        IDButton10: "bt-test31-page" + page + "-10",                            
                        txtButton10: "ROT",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                else
                    res.render('clinician/test-screens/moca/page06', {
                        text1: "Mémoire",
                        text2: "L'examinateur lit une liste de 5 mots à un rythme de 1 par seconde, après avoir donné les instructions suivantes:",
                        text3: "« Ceci est un test de mémoire. Je vais vous lire une liste de mots que vous aurez à retenir. Écoutez attentivement et quand j'aurai terminé, je veux que vous me redisiez le plus de mots possible dont vous pouvez vous rappeler, dans l'ordre que vous voulez ».",
                        text4: "L'examinateur lit la liste de mots une première fois et coche chacun des mots énoncés par le sujet.",
                        text5: "Lorsque le sujet a terminé (s'est souvenu de tous les mots), ou s'il ne peut se rappeler davantage de mots, l'examinateur relit la liste de mots après avoir donné les instructions suivantes:",
                        text6: "« Maintenant je vais lire la même liste de mots une seconde fois. Essayez de vous rappeler du plus grand nombre de mots possible, y compris ceux que vous avez énoncés la première fois ».",
                        text7: "L'examinateur coche chacun des mots énoncés au deuxième essai. À la fin du deuxième essai, l'examinateur informe le sujet qu'il devra retenir ces mots car il aura à les redire à la fin du test.",
                        text8: "1er essai:",
                        text9: "2ème essai:",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "Visage",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "Velours",
                        IDButton3: "bt-test31-page" + page + "-3",                            
                        txtButton3: "Église",
                        IDButton4: "bt-test31-page" + page + "-4",                            
                        txtButton4: "Marguerite",
                        IDButton5: "bt-test31-page" + page + "-5",                            
                        txtButton5: "Rouge",
                        IDButton6: "bt-test31-page" + page + "-6",                            
                        txtButton6: "Visage",
                        IDButton7: "bt-test31-page" + page + "-7",                            
                        txtButton7: "Velours",
                        IDButton8: "bt-test31-page" + page + "-8",                            
                        txtButton8: "Église",
                        IDButton9: "bt-test31-page" + page + "-9",                            
                        txtButton9: "Marguerite",
                        IDButton10: "bt-test31-page" + page + "-10",                            
                        txtButton10: "Rouge",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 7:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page21', {
                        text1: "6. Aufmerksamkeit: Zahlen wiederholen vorwärts",
                        text2: "<u>Durchführung:</u> Geben Sie folgende Anweisung: <span class='text-primary'><i>„Ich werde Ihnen einige Zahlen sagen. Wenn ich fertig bin, wiederholen Sie sie bitte genau in der Reihenfolge, in der ich sie Ihnen gesagt habe.“</i></span> Lesen Sie die Folge von fünf Zahlen in einer Geschwindigkeit von einer Zahl pro Sekunde.",
                        text3: "In der vorgegebenen Reihenfolge wiederholen : 2  1  8  5  4",
                        text4: "",
                        IDButton: "bt-test31-page" + page,                            
                        txtButton: "ERFOLGREICH",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                else                    
                    res.render('clinician/test-screens/moca/page07', {
                        text1: "Attention - Empan numérique",
                        text2: "L'examinateur lit une séquence de 5 chiffres à un rythme de 1 par seconde, après avoir donné les instructions suivantes:",
                        text3: "« Je vais vous dire une série de chiffres, et lorsque j'aurai terminé, je veux que vous répétiez ces chiffres dans le même ordre que je vous les ai présentés ».",
                        text4: "Séquence : 2 1 8 5 4",
                        text5: "Cochez la case si la séquence est correctement répétée.",
                        IDButton: "bt-test31-page" + page,                            
                        txtButton: "Répétition correcte",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 8:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page21', {
                        text1: "6. Aufmerksamkeit: Zahlen wiederholen rückwärts",
                        text2: "<u>Durchführung:</u> Geben Sie folgende Anweisung: <span class='text-primary'><i>„Nun nenne ich Ihnen einige weitere Zahlen. Wenn ich fertig bin, wiedergolen Sie bitte die Zahlen in umgekehrter Reihenfolge.“</i></span> Lesen Sie die drei Zahlen in einer Geschwindigkeit von einer Zahl pro Sekunde.",
                        text3: "Rückwärts wiederholen : 7  4  2",
                        text4: "<u>Auswertung:</u> Vergeben Sie einen Punkt für jede korrekt durchgeführte Aufgabe (die korrekte Antwort für die Zahlenwiedergabe rückwärts ist 2-4-7).",
                        IDButton: "bt-test31-page" + page,                            
                        txtButton: "ERFOLGREICH",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                else
                    res.render('clinician/test-screens/moca/page07', {
                        text1: "Attention - Empan numérique inversé",
                        text2: "L'examinateur lit ensuite une séquence de 3 chiffres à un rythme de 1 par seconde, après avoir donné les instructions suivantes:",
                        text3: "« Je vais vous dire une série de chiffres, et lorsque j’aurai terminé, je veux que vous répétiez ces chiffres dans l’ordre inverse que je vous les ai présentés ».",
                        text4: "Séquence : 7 4 2",
                        text5: "Cochez la case si la séquence est correctement répétée.",
                        IDButton: "bt-test31-page" + page,                            
                        txtButton: "Répétition inversée correcte (2 4 7)",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 9:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page21', {
                        text1: "6. Aufmerksamkeit: Vigilanz",
                        text2: "<u>Durchführung:</u> Der Untersucher liest eine Liste von Buchstaben in einer Geschwindigkeit von einem Buchstaben pro Sekunde vor, nachdem er die folgende Anweisung gegeben hat: <span class='text-primary'><i>„Ich werde Ihnen jetzt eine Reihe von Buchstaben vorlesen. Jedes Mal wenn ich den Buchstaben A sage, klopfen Sie einmal mit Ihrer Hand (auf den Tisch o.ä.). Wenn ich einen anderen Buchstaben sage, klopfen Sie nicht mit ihrer Hand.“</i></span>",
                        text3: "F B A C M N A A J K L B A F A K D E A A A J A M O F A A B",
                        text4: "<u>Auswertung:</u> Vergeben Sie einen Punkt bei keinem oder einem Fehler (ein Fehler ist ein Klopfen bei einem falschen Buchstaben oder ein Nicht-Klopfen bei dem Buchstaben A).",
                        IDButton: "bt-test31-page" + page,                            
                        txtButton: "ERFOLGREICH",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                else
                    res.render('clinician/test-screens/moca/page07', {
                        text1: "Attention - Concentration",
                        text2: "L'examinateur lit une série de lettres à un rythme de 1 par seconde, après avoir donné les instructions suivantes:",
                        text3: "« Je vais vous lire une série de lettres. Chaque fois que je dirai la lettre A, vous devrez taper de la main une fois. Lorsque je dirai une lettre différente du A, vous ne taperez pas de la main ».",
                        text4: "Séquence : F B A C M N A A J K L B A F A K D E A A A J A M O F A A B",
                        text5: "Cochez la case si la séquence réalisée avec au plus une erreur.",
                        IDButton: "bt-test31-page" + page,                            
                        txtButton: "Séquence correcte",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 10:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page22', {
                        text1: "6. Aufmerksamkeit: 7er Reihe",
                        text2: "<u>Durchführung:</u> Der Untersucher gibt die folgende Instruktion: <span class='text-primary'><i>„Nun bitte ich Sie zu rechnen, indem Sie von der Zahl 100 sieben abziehen und dann von dem Ergebnis immer weiter sieben abziehen, bis ich Sie bitte aufzuhören.“</i></span> Wenn notwendig, wiederholen Sie diese Instruktion.",
                        text3: "<u>Auswertung:</u> Für diesen Testteil werden bis zu drei Punkte vergeben. Geben Sie 0 Punkte für keine korrekten Subtraktionen, 1 Punkt für eine korrekte Subtraktion, 2 Punkte für zwei bis drei korrekte Subtraktionen und 3 Punkte, wenn der Proband erfolgreich vier oder fünf korrekte Subtraktionen durchführt. Zählen Sie jede korrekte Subtraktion von sieben beginnend bei hundert. Jede Subtraktion wird unabhängig von der Vorgehenden beurteilt; das bedeutet, wenn der Proband mit einer unkorrekten Zahl antwortet, aber fortwährend korrekt sieben von ihr abzieht, geben Sie einen Punkt für jede korrekte Subtraktion. Z. B.: Ein Proband antwortet „92-85-78-71-64“ wobei die „92“ unkorrekt ist, aber alle nachfolgenden Ergebnisse korrekt sind. Dieses zählt als ein Fehler und die Aufgabe würde mit 3 Punkten bewertet.",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "93",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "86",
                        IDButton3: "bt-test31-page" + page + "-3",                            
                        txtButton3: "79",
                        IDButton4: "bt-test31-page" + page + "-4",                            
                        txtButton4: "72",
                        IDButton5: "bt-test31-page" + page + "-5",                            
                        txtButton5: "65",                   
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                else
                    res.render('clinician/test-screens/moca/page08', {
                        text1: "Attention - Calcul sérié",
                        text2: "L'examinateur donne les instructions suivantes:",
                        text3: "« Maintenant je veux que vous calculiez 100 - 7, et ensuite, continuez de soustraire 7 de votre réponse, jusqu'à ce que je vous dise d'arrêter ».",
                        text4: "",
                        text5: "L'examinateur peut répéter les instructions une deuxième fois si nécessaire.",
                        text6: "Chaque soustraction est évaluée individuellement.",
                        text7: "Si le sujet fait une erreur de soustraction mais par la suite soustrait correctement le chiffre 7 mais à partir du chiffre erroné, les points sont alloués lorsque la soustraction du chiffre 7 est correcte.",
                        text8: "Par exemple 100 - 7 = 92, 85, 78, 71, 64 : le 92 est incorrect mais tous les nombres subséquents sont corrects. Donc il s'agit de 4 soustractions correctes, le score est de 3 points.",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "93",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "86",
                        IDButton3: "bt-test31-page" + page + "-3",                            
                        txtButton3: "79",
                        IDButton4: "bt-test31-page" + page + "-4",                            
                        txtButton4: "72",
                        IDButton5: "bt-test31-page" + page + "-5",                            
                        txtButton5: "65",                   
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 11:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page23', {
                        text1: "7. Satzwiederholung",
                        text2: "<u>Durchführung:</u> Der Untersucher gibt folgende Anleitung: <span class='text-primary'><i>„Ich werde Ihnen einen Satz vorlesen. Danach wiederholen Sie ihn bitte genauso, wie ich ihn Ihnen gesagt habe</i></span> [Pause]: <span class='text-primary'><i><b>Ich weiß lediglich, dass Hans heute an der Reihe ist zu helfen.</b></i></span><span class='text-primary'><i>“</i></span> Nach der Antwort sagen Sie: <span class='text-primary'><i>„Nun werde ich Ihnen einen weiteren Satz vorlesen. Wiederholen sie ihn bitte genauso, wie ich ihn Ihnen gesagt habe</i></span> [Pause]: <span class='text-primary'><i><b>Die Katze versteckte sich immer unter der Couch, wenn die Hunde im Zimmer waren.</b></i></span><span class='text-primary'><i>“</i></span>",
                        text3: "<u>Bewertung:</u> Vergeben Sie einen Punkt für jeden richtig wiedergegebenen Satz. Die Wiederholung muss exakt sein. Achten Sie besonders auf Fehler, die durch Auslassungen entstehen (Beispiel: Auslassen von „lediglich“ oder „immer“) und Ersetzen/Ergänzungen (z. B. „... Hans heute an der Reihe <b>war</b> zu helfen“, Ersetzen von „versteckt sich“ für „versteckte sich“, falsche Pluralbildungen etc.).",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "Ich weiß lediglich, dass Hans heute an der Reihe ist zu helfen.",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "Die Katze versteckte sich immer unter der Couch, wenn die Hunde im Zimmer waren.",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                else
                    res.render('clinician/test-screens/moca/page09', {
                        text1: "Répétition de phrases",
                        text2: "L’examinateur donne les instructions suivantes:",
                        text3: "« Maintenant je vais vous lire une phrase et je veux que vous la répétiez après moi:",
                        text4: "« Le colibri a déposé ses œufs sur le sable. »",
                        text5: "Cochez la case si la phrase est correctement répétée. La répétition doit être exacte.",
                        text6: "Ensuite, l’examinateur dit:",
                        text7: "« Maintenant je vais vous lire une seconde phrase et vous allez la répéter après moi:",
                        text8: "« L'argument de l’avocat les a convaincus. »",
                        text9: "Cochez la case si la phrase est correctement répétée. La répétition doit être exacte.",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "Le colibri a déposé ses œufs sur le sable",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "L'argument de l'avocat les a convaincus",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 12:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page24', {
                        text1: "8. Wortgewandtheit (Verbal Fluency)",
                        text2: "<u>Durchführung:</u> Der Untersucher gibt die folgende Anweisung: <span class='text-primary'><i>„Nennen Sie mir so viele Worte, wie Ihnen einfallen und die mit einem bestimmten Buchstaben des Alphabets, den ich Ihnen gleich nennen werde, beginnen. Sie können jede Wortart, die Sie möchten, nennen, mit der Ausnahme von Eigennamen (wie z. B. Bernd oder Berlin), weiter keine Zahlen, oder Worte die mit demselben Klang beginnen, aber eine andere Endung haben, z. B. Liebe, Liebhaber, Liebende. Ich werde Sie bitten, nach einer Minute aufzuhören. Sind Sie fertig?</i></span> [Pause] <span class='text-primary'><i>Nun, nennen Sie mir so viele Worte, wie Ihnen einfallen, die mit dem Buchstaben <b>F</b> beginnen</i></span> [60 Sekunden Zeit]<span class='text-primary'><i>. Stop.“</i></span>",                        
                        text3: "Anzahl der Wörter",
                        text4: "<u>Auswertung:</u> Vergeben Sie 1 Punkt, wenn der Proband 11 oder mehr Wörter in 60 Sekunden nennt. Notieren Sie die Antworten des Probanden unten auf dem Testbogen oder an den Seitenrändern.",
                        IDText1: "txt-test31-page" + page + "-1",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "Start",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "Reset",
                        IDText2: "txt-test31-page" + page + "-2",
                        IDButton3: "bt-test31-page" + page + "-3",                            
                        txtButton3: "+",
                        IDButton4: "bt-test31-page" + page + "-4",                            
                        txtButton4: "-",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });                    
                else
                    res.render('clinician/test-screens/moca/page10', {
                        text1: "Fluidité verbale",
                        text2: "L'examinateur donne les instructions suivantes:",
                        text3: "« Je veux que vous me disiez le plus de mots possible qui débutent par une lettre de l'alphabet que je vais vous dire.",
                        text4: "Vous pouvez dire n'importe quelle sorte de mot, sauf les noms propres, des chiffres, les conjugaisons de verbe (par exemple mange, mangerons, mangerez) et les mots de même famille (par exemple pomme, pommette, pommier).",
                        text5: "Je vais vous dire d’arrêter après une minute. Êtes-vous prêt ?",
                        text6: "Maintenant, dites le plus de mots possible qui commencent par la lettre F ».",
                        text7: "Notez les mots sur une feuille de brouillon pour les compter plus facilement.",
                        text8: "Vous pourrez prendre cette feuille en photo pour l'ajouter au dossier",
                        text9: "Nombre de mots:",
                        IDText1: "txt-test31-page" + page + "-1",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "Start",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "Reset",
                        IDText2: "txt-test31-page" + page + "-2",
                        IDButton3: "bt-test31-page" + page + "-3",                            
                        txtButton3: "+",
                        IDButton4: "bt-test31-page" + page + "-4",                            
                        txtButton4: "-",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 13:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page25', {
                        text1: "9. Abstraktion",
                        text2: "<u>Durchführung:</u> Der Untersucher bittet den Probanden zu erklären, was ein gegebenes Paar von Worten gemeinsam hat, beginnend mit dem Beispiel: <span class='text-primary'><i>„Sagen Sie mir, was eine Apfelsine und eine Banane gemeinsam haben.“</i></span>. Falls der Proband konkret beschreibend antwortet, sagen Sie nur einmal zusätzlich: <span class='text-primary'><i>„Nennen Sie mir eine andere Gemeinsamkeit, die diese Begriffe verbindet.“</i></span>. Wenn der Proband nicht die richtige Antwort (Frucht) gibt, sagen Sie: <span class='text-primary'><i>„Ja, und sie sind auch beides Früchte.“</i></span>. Geben Sie keine zusätzlichen Hinweise oder Erklärungen.",
                        text3: "Nach dem Probedurchgang sagen Sie: <span class='text-primary'><i>„Nun sagen Sie mir bitte, was eine Eisenbahn und ein Fahrrad gemeinsam haben“</i></span>. Nach einer Antwort führen Sie einen zweiten Durchgang durch mit den Worten: <span class='text-primary'><i>„Nun sagen Sie mir bitte, was ein Lineal und eine Uhr gemeinsam haben“</i></span>. Geben Sie keine zusätzlichen Hinweise oder Stichworte.",
                        text4: "<u>Bewertung:</u> Nur die letzten beiden Paare werden bewertet. Geben Sie einen Punkt für jede richtige Antwort. Folgende Antworten werden akzeptiert:",
                        text5: "Eisenbahn/Fahrrad = Transportmittel, Reisemöglichkeiten, mit beiden kann man Fahrten unternehmen;",
                        text6: "Lineal/Uhr = Messinstrumente, werden zum Messen benutzt.",
                        text7: "Folgende Antworten werden nicht akzeptiert: Eisenbahn/Fahrrad = sie haben Räder; Lineal/Uhr = sie haben Zahlen.",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "Banane und Apfelsine",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "Eisenbahn - Fahrrad",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                else
                    res.render('clinician/test-screens/moca/page11', {
                        text1: "Similitudes",
                        text2: "L'examinateur demande au sujet de donner le point commun entre deux items présentés, en illustrant par l'exemple suivant: <span class='text-primary'><b>« En quoi une orange et une banane sont-elles semblables? »</b></span>",
                        text3: "Si le sujet fournit une réponse concrète, l'examinateur demande à une seule autre reprise:",
                        text4: "« Donnez-moi une autre raison pour laquelle une orange et une banane se ressemblent ».",
                        text5: "Si le sujet ne donne pas la bonne réponse, dites: <span class='text-primary'><b>« Oui, et elles sont toutes les deux des fruits »</b></span>",
                        text6: "Ne pas donner d'autres instructions ou explications.",
                        text7: "Après l'épreuve d’essai, l'examinateur demande:",
                        text8: "« Maintenant, dites-moi en quoi un train et une bicyclette se ressemblent. »",
                        text9: "Non acceptable : ils ont des roues, ils roulent",
                        text10: "Ensuite, l'examinateur demande:",
                        text11: "« Maintenant, dites-moi en quoi une montre et une règle se ressemblent ».",
                        text12: "Ne pas donner d'instruction ou d'indice supplémentaire.",
                        text13: "Non acceptable : ils ont des chiffres",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "Moyens de transport, moyens de locomotion, pour voyager",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "Instruments de mesure, pour mesurer",
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 14:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page22', {
                        text1: "10. Erinnerung",
                        text2: "<u>Durchführung:</u> Der Untersucher gibt folgende Anleitung: <span class='text-primary'><i>„Vor einiger Zeit habe ich Ihnen einige Worte genannt, die ich Sie bat zu erinnern. Bitte nennen Sie mir so viele Worte wie möglich, an die Sie sich erinnern.“</i></span> Klicken Sie für jedes spontan korrekt erinnerte Wort in das vorgesehene Feld.",
                        text3: "<u>Bewertung:</u> <b>1 Punkt für jedes richtig erinnerte Wort <u>ohne vorangegangenen Hinweis</u>.</b>",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "GESICHT",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "SAMT",
                        IDButton3: "bt-test31-page" + page + "-3",                            
                        txtButton3: "KIRCHE",
                        IDButton4: "bt-test31-page" + page + "-4",                            
                        txtButton4: "TULPE",
                        IDButton5: "bt-test31-page" + page + "-5",                            
                        txtButton5: "ROT",                   
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                else
                    res.render('clinician/test-screens/moca/page08', {
                        text1: "Rappel différé - Sans indice",
                        text2: "L’examinateur donne les instructions suivantes:",
                        text3: "« Je vous ai lu une série de mots plus tôt dont je vous ai demandé de vous rappeler.",
                        text4: "Maintenant, dites-moi tous les mots dont vous vous rappelez »",
                        text5: "L’examinateur coche les mots correctement énoncés sans indice.",
                        text6: "",
                        text7: "",
                        text8: "",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "Visage",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "Velours",
                        IDButton3: "bt-test31-page" + page + "-3",                            
                        txtButton3: "Église",
                        IDButton4: "bt-test31-page" + page + "-4",                            
                        txtButton4: "Marguerite",
                        IDButton5: "bt-test31-page" + page + "-5",                            
                        txtButton5: "Rouge",                   
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 15:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page26', {
                        text1: "10. Erinnerung – Hinweis zu Kategorie",                    
                        text2: "Nach dem Durchgang mit freier Erinnerung geben Sie dem Probanden einen Hinweis für jedes nicht erinnerte Wort. Machen Sie eine Markierung in dem vorgesehenen Feld, wenn der Proband das Wort erinnert unter Zuhilfenahme eines Kategoriehinweises oder auch eines Mehrfachauswahl-Hinweises. Führen Sie dies für alle nicht erinnerten Worte durch. Wenn der Proband nach dem Kategoriehinweis die Worte nicht erinnert, führen Sie einen Mehrfachauswahl-Durchgang durch, in dem Sie folgende einfache Instruktionen benutzen: <span class='text-primary'><i>„Welche der folgenden Wörter, meinen Sie, war es: NASE, GESICHT, oder HAND?“</i></span>",
                        text3: "Nutzen Sie die folgende Kategorie für jedes Wort wenn notwendig:",
                        text4: "<u>Kategoriehinweis:</u> ein Teil des Körpers",
                        text5: "<u>Kategoriehinweis:</u> eine Stoffart",
                        text6: "<u>Kategoriehinweis:</u> ein Gebäude",
                        text7: "<u>Kategoriehinweis:</u> eine Blumenart",
                        text8: "<u>Kategoriehinweis:</u> eine Farbe",
                        text9: "",
                        IDButton1: "bt-test31-page" + page + "-1",                    
                        IDLabel1: "lbl-test31-page" + page + "-1",                           
                        txtButton1: "GESICHT",
                        IDButton2: "bt-test31-page" + page + "-2",
                        IDLabel2: "lbl-test31-page" + page + "-2",                           
                        txtButton2: "SAMT",
                        IDButton3: "bt-test31-page" + page + "-3",
                        IDLabel3: "lbl-test31-page" + page + "-3",                            
                        txtButton3: "KIRCHE",
                        IDButton4: "bt-test31-page" + page + "-4",
                        IDLabel4: "lbl-test31-page" + page + "-4",                            
                        txtButton4: "TULPE",
                        IDButton5: "bt-test31-page" + page + "-5",
                        IDLabel5: "lbl-test31-page" + page + "-5",                            
                        txtButton5: "ROT",                   
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                else
                    res.render('clinician/test-screens/moca/page12', {
                        text1: "Rappel différé - Indice de catégorie",                    
                        text2: "Pour les mots dont le sujet ne se rappelle pas spontanément, l'examinateur fournit un indice catégoriel (sémantique).",
                        text3: "Partie du corps",
                        text4: "Tissu",
                        text5: "Bâtiment",
                        text6: "Fleur",
                        text7: "Couleur",
                        IDButton1: "bt-test31-page" + page + "-1",                    
                        IDLabel1: "lbl-test31-page" + page + "-1",                           
                        txtButton1: "Visage",
                        IDButton2: "bt-test31-page" + page + "-2",
                        IDLabel2: "lbl-test31-page" + page + "-2",                           
                        txtButton2: "Velours",
                        IDButton3: "bt-test31-page" + page + "-3",
                        IDLabel3: "lbl-test31-page" + page + "-3",                            
                        txtButton3: "Église",
                        IDButton4: "bt-test31-page" + page + "-4",
                        IDLabel4: "lbl-test31-page" + page + "-4",                            
                        txtButton4: "Marguerite",
                        IDButton5: "bt-test31-page" + page + "-5",
                        IDLabel5: "lbl-test31-page" + page + "-5",                            
                        txtButton5: "Rouge",                   
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 16:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page26', {
                        text1: "10. Erinnerung – Mehrfachauswahl",                    
                        text2: "",
                        text3: "Nutzen Sie die folgende Mehrfachauswahl-Hinweise für jedes Wort wenn notwendig:",
                        text4: "<u>Mehrfachauswahl:</u> Nase, Gesicht, Hand",
                        text5: "<u>Mehrfachauswahl:</u> Leinen, Baumwolle, Samt",
                        text6: "<u>Mehrfachauswahl:</u> Kirche, Schule, Krankenhaus",
                        text7: "<u>Mehrfachauswahl:</u> Rose, Tulpe, Nelke",
                        text8: "<u>Mehrfachauswahl:</u> Rot, blau, grün",
                        text9: "<u>Bewertung:</u> <b>Keine Punkte werden vergeben für Worte, die nach einem Hinweis erinnert werden.</b> Eine Bahnung durch einen Hinweis wird lediglich zur klinischen Information benutzt und kann dem Auswerter zusätzliche Informationen über die Art der Gedächtnisstörung geben. Für Störungen bei der Dekodierung kann die Gedächtnisleistung durch einen Hinweis verbessert werden. Für Enkodierungsstörungen hingegen verbessert sich die Gedächtnisleistung durch ein Hinweiswort nicht.",
                        IDButton1: "bt-test31-page" + page + "-1",                    
                        IDLabel1: "lbl-test31-page" + page + "-1",                           
                        txtButton1: "GESICHT",
                        IDButton2: "bt-test31-page" + page + "-2",
                        IDLabel2: "lbl-test31-page" + page + "-2",                           
                        txtButton2: "SAMT",
                        IDButton3: "bt-test31-page" + page + "-3",
                        IDLabel3: "lbl-test31-page" + page + "-3",                            
                        txtButton3: "KIRCHE",
                        IDButton4: "bt-test31-page" + page + "-4",
                        IDLabel4: "lbl-test31-page" + page + "-4",                            
                        txtButton4: "TULPE",
                        IDButton5: "bt-test31-page" + page + "-5",
                        IDLabel5: "lbl-test31-page" + page + "-5",                            
                        txtButton5: "ROT",                    
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                    });
                else
                    res.render('clinician/test-screens/moca/page12', {
                        text1: "Rappel différé - Choix multiple",
                        text2: "Pour les mots dont le sujet ne se rappelle pas spontanément, l'examinateur fournit un choix de réponses, et le sujet doit alors identifier le mot approprié.",
                        text3: "Nez, visage, main",
                        text4: "Denim, coton, velour",
                        text5: "Église, école, hôpital",
                        text6: "Rose, marguerite, tulipe",
                        text7: "Rouge, bleu, vert",                    
                        IDButton1: "bt-test31-page" + page + "-1",                    
                        IDLabel1: "lbl-test31-page" + page + "-1",                           
                        txtButton1: "Visage",
                        IDButton2: "bt-test31-page" + page + "-2",
                        IDLabel2: "lbl-test31-page" + page + "-2",                           
                        txtButton2: "Velours",
                        IDButton3: "bt-test31-page" + page + "-3",
                        IDLabel3: "lbl-test31-page" + page + "-3",                            
                        txtButton3: "Église",
                        IDButton4: "bt-test31-page" + page + "-4",
                        IDLabel4: "lbl-test31-page" + page + "-4",                            
                        txtButton4: "Marguerite",
                        IDButton5: "bt-test31-page" + page + "-5",
                        IDLabel5: "lbl-test31-page" + page + "-5",                            
                        txtButton5: "Rouge",                    
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                    });
                break;

            case 17:
                if (language == 'de')
                    res.render('clinician/test-screens/moca/page27', {
                        text1: "11. Orientierung",
                        text2: "Durchführung: Der Untersucher gibt folgende Instruktion: <span class='text-primary'><i>„Nennen Sie mir das Datum des heutigen Tages.“</i></span>. Wenn der Proband nicht die vollständige Antwort gibt, dann fragen Sie genauer nach, indem Sie sagen: <span class='text-primary'><i>„Nennen Sie mir bitte [Jahr, Monat, exaktes Datum und den Wochentag].“</i></span> Dann sagen Sie: <span class='text-primary'><i>„Nun nennen Sie mir bitte den Namen des Ortes und der Stadt in der wir gerade sind.“</i></span>",
                        text3: "<u>Auswertung:</u> Geben Sie einen Punkt für jede richtig gegebene Antwort. Der Proband muss Ihnen das exakte Datum und den exakten Ort (Name des Krankenhauses, Praxis, Büro) nennen. Keine Punkte werden vergeben, wenn der Proband sich um einen Tag hinsichtlich Wochentag oder Datum vertut.",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "Datum",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "Monat",
                        IDButton3: "bt-test31-page" + page + "-3",                            
                        txtButton3: "Jahr",
                        IDButton4: "bt-test31-page" + page + "-4",                            
                        txtButton4: "Wochentag",
                        IDButton5: "bt-test31-page" + page + "-5",                            
                        txtButton5: "Ort",  
                        IDButton6: "bt-test31-page" + page + "-6",                            
                        txtButton6: "Stadt",                 
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                else
                    res.render('clinician/test-screens/moca/page13', {
                        text1: "Orientation",
                        text2: "L'examinateur donne les instructions suivantes:",
                        text3: "« Dites-moi, quelle date sommes-nous aujourd'hui ? »",
                        text4: "Si le sujet fournit une réponse incomplète, l'examinateur dit:",
                        text5: "« Dites-moi l’année, le mois, la date, et le jour exact. »",
                        text6: "Ensuite, l'examinateur demande:",
                        text7: "« Maintenant, dites-moi comment s'appelle l'endroit où nous sommes présentement et dans quelle ville est-ce ? »",
                        text8: "Cochez la case pour chacune des réponses exactement énoncées.",
                        text9: "Le sujet doit dire la date exacte et l'endroit exact (hôpital, clinique, bureau, etc.).",
                        text10: "Aucun point n'est alloué si le sujet se trompe d'une seule journée pour la date et le jour.",
                        IDButton1: "bt-test31-page" + page + "-1",                            
                        txtButton1: "Date",
                        IDButton2: "bt-test31-page" + page + "-2",                            
                        txtButton2: "Mois",
                        IDButton3: "bt-test31-page" + page + "-3",                            
                        txtButton3: "Année",
                        IDButton4: "bt-test31-page" + page + "-4",                            
                        txtButton4: "Jour",
                        IDButton5: "bt-test31-page" + page + "-5",                            
                        txtButton5: "Endroit",  
                        IDButton6: "bt-test31-page" + page + "-6",                            
                        txtButton6: "Ville",                 
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-continuer",
                        txtButtonRight: "Continuer"
                    });
                break;

            case 18: {
                let a = Number(req.query.a);
                let b = Number(req.query.b);
                let c = Number(req.query.c);
                let d = Number(req.query.d);
                let e = Number(req.query.e);
                let f = Number(req.query.f);
                let g = Number(req.query.g);
                let h = Number(req.query.h);
                let i = Number(req.query.i);
                let j = Number(req.query.j);
                let k = Number(req.query.k);
                let l = Number(req.query.l);
                let m = Number(req.query.m);
                let n = Number(req.query.n);
                let o = Number(req.query.o);
                let p = Number(req.query.p);
                let q = Number(req.query.q);
                let F1 = Number(req.query.F1);
                let F2 = Number(req.query.F2);
                let F3 = Number(req.query.F3);
                let date = Number(req.query.date);
                let mois = Number(req.query.mois);
                let annee = Number(req.query.annee);
                let jour = Number(req.query.jour);
                let endroit = Number(req.query.endroit);
                let ville = Number(req.query.ville);

                let A = a + b + c + d + e;
                let B = f + g + h;
                let C = i + j + k + l;
                let D = m + n + o;
                let E = p + q;
                let G = F2 + F3;
                let H = date + mois + annee + jour + endroit + ville;

                let total = A + B + C + D + E + F1 + H;

                let textResult1 = language == 'de' ? "VISUOSPATIAL / EXEKUTIV: [" + a + ", " + b + ", " + c + ", " + d + ", " + e + "] - " + A + "/5" : 
                                                     "Visuospatial / exécutif: [" + a + ", " + b + ", " + c + ", " + d + ", " + e + "] - " + A + "/5";
                let textResult2 = language == 'de' ? "BENENNEN: [" + f + ", " + g + ", " + h + "] - " + B + "/3" : 
                                                     "Dénomination: [" + f + ", " + g + ", " + h + "] - " + B + "/3";
                let textResult3 = language == 'de' ? "AUFMERKSAMKEIT: [" + i + ", " + j + ", " + k + ", " + l + "] - " + C + "/6" : 
                                                     "Attention: [" + i + ", " + j + ", " + k + ", " + l + "] - " + C + "/6";
                let textResult4 = language == 'de' ? "SPRACHE: [" + m + ", " + n + ", " + o + "] - " + D + "/3" : 
                                                     "Langage: [" + m + ", " + n + ", " + o + "] - " + D + "/3";
                let textResult5 = language == 'de' ? "ABSTRAKTION: [" + p + ", " + q + "] - " + E + "/2" : 
                                                     "Abstraction: [" + p + ", " + q + "] - " + E + "/2";
                let textResult6 = language == 'de' ? "ERINNERUNG: " + F1 + "/5" : 
                                                     "Rappel sans indices: " + F1 + "/5";
                let textResult7;
                if (language == 'de')
                    textResult7 = F1 == 5 ? "ERINNERUNG - Hinweis zu Kategorie – Mehrfachauswahl: n/a" : "ERINNERUNG - Hinweis zu Kategorie – Mehrfachauswahl: [" + F2 + ", " + F3 + "] - " + G + "/5";
                else
                    textResult7 = F1 == 5 ? "Rappel différé: n/a" : "Rappel différé: [" + F2 + ", " + F3 + "] - " + G + "/5"; 
                
                let textResult8 = language == 'de' ? "ORIENTIERUNG: [" + date + ", " + mois + ", " + annee + ", " + jour + ", " + endroit + ", " + ville + "] - " + H + "/5" : 
                                                     "Orientation: [" + date + ", " + mois + ", " + annee + ", " + jour + ", " + endroit + ", " + ville + "] - " + H + "/5";
                let textResult9 = "TOTAL: " + total + "/30";
                

                if (language == 'de')
                    res.render('clinician/test-screens/moca/page28', {
                        text1: "TOTAL",
                        text2: textResult1,
                        text3: textResult2,
                        text4: textResult3,
                        text5: textResult4,
                        text6: textResult5,
                        text7: textResult6,
                        text8: textResult7,
                        text9: textResult8,
                        text10: textResult9,
                        text11: "Bemerkungen",
                        IDTextArea: "txt-test31-page" + page,
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Zurück",
                        IDButtonRight: "bt-test31-page" + page + "-terminer",
                        txtButtonRight: "Beenden"                 
                    });
                else
                    res.render('clinician/test-screens/moca/page14', {
                        text1: "Résultats",
                        text2: textResult1,
                        text3: textResult2,
                        text4: textResult3,
                        text5: textResult4,
                        text6: textResult5,
                        text7: textResult6,
                        text8: textResult7,
                        text9: textResult8,
                        text10: textResult9,
                        text11: "Remarques",
                        IDTextArea: "txt-test31-page" + page,
                        IDButtonLeft: "bt-test31-page" + page + "-retour",
                        txtButtonLeft: "Retour",
                        IDButtonRight: "bt-test31-page" + page + "-terminer",
                        txtButtonRight: "Terminer"                    
                    });   
                break;
            }
        }
    } else if (session.checkSession(req, 3)) {
        let page = Number(req.query.page);
        
        switch (page) {
            case 3:            
                res.render('patient/test-screens/moca/page01', {
                    urlImage: "/tests/moca/cube.png"
                });
                break;

            case 5:            
                res.render('patient/test-screens/moca/page02', {
                    urlImage: "/tests/moca/animals.png"
                });
                break;
        }
    } else {
        res.redirect('/'); 
    }
}