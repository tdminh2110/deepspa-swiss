const session = require('../common/session');

const Test39_Words_List = require('../../models/test_words_list');
const test39_lists = require('../../models/data/test39_words_list');
const { wordsList01 } = require('../../models/data/test39_words_list');

exports.test39_words_list_showpage = function(req, res) {
    if (session.checkSession(req, 2)) {      
        let page = Number(req.query.page);

        switch (page) {
            case 1: {
                let idSelectedSession = Number(req.query.id_session);
                let test_done = 0;
                let test1_done = "";
                let test2_done = "";
                let test3_done = "";
                let test4_done = "";

                Test39_Words_List.select_testDone_by_idSession(idSelectedSession)
                .then(([test39_words_list]) => {
                    if (test39_words_list.length == 1) {
                        test_done = test39_words_list[0].test_done;

                        switch(test_done) {
                            case 8:
                                test1_done = "<span style='font-size:18px'>&#9745;</span>";
                                break;
                            
                            case 12:
                                test1_done = "<span style='font-size:18px'>&#9745;</span>";
                                test2_done = "<span style='font-size:18px'>&#9745;</span>";
                                break;

                            case 14:
                                test1_done = "<span style='font-size:18px'>&#9745;</span>";
                                test2_done = "<span style='font-size:18px'>&#9745;</span>";
                                test3_done = "<span style='font-size:18px'>&#9745;</span>";
                                break;

                            case 15:
                                test1_done = "<span style='font-size:18px'>&#9745;</span>";
                                test2_done = "<span style='font-size:18px'>&#9745;</span>";
                                test3_done = "<span style='font-size:18px'>&#9745;</span>";
                                test4_done = "<span style='font-size:18px'>&#9745;</span>";
                                break;

                        }
                    }

                    res.render('clinician/test-screens/words_list/page01', {
                        IDButton1: "bt-test39-page" + page + "-1",
                        test1_done: test1_done,
                        txtButton1: "Wortliste Lernen",
                        IDButton2: "bt-test39-page" + page + "-2",
                        test2_done: test2_done,
                        txtButton2: "Figur abzeichnen",
                        IDButton3: "bt-test39-page" + page + "-3",
                        test3_done: test3_done,
                        txtButton3: "Wortliste Abrufen",
                        IDButton4: "bt-test39-page" + page + "-4",
                        test4_done: test4_done,
                        txtButton4: "Wortliste Wiedererkennen",
                        IDLabel: "lbl-test39-page" + page,
                        IDButtonLeft: "bt-test39-page" + page + "-terminer",
                        txtButtonLeft: "Beenden",
                        IDButtonRight: "bt-test39-page" + page + "-continuer",
                        txtButtonRight: "Weiter"
                    });
                })
                .catch(err => console.log(err));

                break;
                
            }

            case 2:
                res.render('clinician/test-screens/words_list/page02', {
                    text1: "Wortliste Lernen",
                    text2: "Dieser Wortlisten Lerntest mit zehn alltäglichen Begriffen dient dazu, die Fähigkeit der TP zu untersuchen, neu gelernte Information zu erinnern. Um sicher zu stellen, dass die TP mit den Wörtern vertraut ist und diese auch möglichst gut aufnimmt, wird sie gebeten, die Wörter einzeln aus dem Testheft vorzulesen. Die zehn Wörter werden in gleichmässiger Geschwindigkeit nacheinander präsentiert. Unmittelbar nach der Präsentation der Wörter bitten Sie die TP, so viele wie möglich zu erinnern. Die Reihenfolge spielt dabei keine Rolle.",
                    text3: "(Denjenigen TPen, die aufgrund einer Sehbehinderung oder minimaler Bildung die Wörter <u>nicht</u> lesen können, werden die Wörter vom Testleiter vorgelesen und die TPen müssen die Wörter laut wiederholen. Allerdings ist festzuhalten, dass diese Vorgehensweise <u>nicht</u> dem laut lesen lassen entspricht, kommt der Originalaufgabe aber am nächsten. Auf diese Weise ist es möglich auch sehbehinderte und wenig gebildete TPen zu untersuchen, welche sonst nicht getestet werden könnten).",                    
                    text4: "Es gibt drei Durchgänge, in jedem werden die Wörter in einer anderen Reihenfolge präsentiert.",
                    IDButton: "bt-test39-page" + page + "-continuer",
                    txtButton: "Weiter"
                });
                break;

            case 3:
                res.render('clinician/test-screens/words_list/page03', {
                    text1: "Die <u><b>Instruktion</b></u> für den ersten Durchgang lautet:",
                    text2: "\"Ich werde Ihnen zehn Wörter zeigen. Lesen Sie bitte jedes Wort laut vor, wenn ich es Ihnen zeige. Danach werde ich Sie bitten, alle diese zehn Wörter aus dem Gedächtnis abzurufen.\"",
                    text3: "Zeigen Sie der TP die Wörter des ersten Durchganges im Abstand von zwei Sekunden. Sollte die TP ein Wort nicht lesen können, lesen Sie es ihr/ihm vor und vermerken Sie es auf dem Antwortblatt für das entsprechende Wort in der Spalte \"Kann nicht lesen\". Nachdem das letzte Wort gelesen wurde, soll die TP versuchen möglichst viele dieser Wörter zu erinnern. Die TP hat maximal 90 Sekunden Zeit. Verfahren Sie dann in gleicher Weise mit dem zweiten und dritten Durchgang dieser Wörter; ändern Sie Ihre Instruktion ein wenig, um die TP zu ermutigen.",
                    text4: "Der Punktwert der TP ergibt sich aus der Summe der richtig erinnerten Wörter pro Durchgang. Vermerken Sie auch be  jedem Durchgang die Anzahl Wörter, welche die TP \"erinnert\", die aber nicht in der Liste enthalten sind (Intrusionen).",
                    IDButtonLeft: "bt-test39-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test39-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 4:
                res.render('clinician/test-screens/words_list/page04', {
                    text1: "Instruktion:",
                    text2: "\"Ich werde Ihnen zehn Wörter zeigen. Lesen Sie bitte jedes Wort laut vor, wenn ich es Ihnen zeige. Danach werde ich Sie bitten, diese zehn Wörter aus dem Gedächtnis abzurufen.\"",
                    text3: "Expositionszeit: je 1 Wort im Abstand von 2 Sekunden",
                    text4: "Erinnerungszeit: Maximum 90 Sekunden pro Durchgang",
                    IDButtonLeft: "bt-test39-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test39-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 5: case 18: case 31: {
                let text1 = page == 5 ? "1. Durchgang" : page == 18 ? "2. Durchgang" : "3. Durchgang";

                res.render('clinician/test-screens/words_list/page05', {
                    text1: text1,
                    IDButtonLeft: "bt-test39-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test39-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;
            }

            case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15:
            case 19: case 20: case 21: case 22: case 23: case 24: case 25: case 26: case 27: case 28: 
            case 32: case 33: case 34: case 35: case 36: case 37: case 38: case 39: case 40: case 41: 
                let show_word = "";

                switch(page) {
                    case 6: show_word = test39_lists.wordsList01[0]; break;
                    case 7: show_word = test39_lists.wordsList01[1]; break;
                    case 8: show_word = test39_lists.wordsList01[2]; break;
                    case 9: show_word = test39_lists.wordsList01[3]; break;
                    case 10: show_word = test39_lists.wordsList01[4]; break;
                    case 11: show_word = test39_lists.wordsList01[5]; break;
                    case 12: show_word = test39_lists.wordsList01[6]; break;
                    case 13: show_word = test39_lists.wordsList01[7]; break;
                    case 14: show_word = test39_lists.wordsList01[8]; break;
                    case 15: show_word = test39_lists.wordsList01[9]; break;
                    case 19: show_word = test39_lists.wordsList01[7]; break;
                    case 20: show_word = test39_lists.wordsList01[5]; break;
                    case 21: show_word = test39_lists.wordsList01[0]; break;
                    case 22: show_word = test39_lists.wordsList01[2]; break;
                    case 23: show_word = test39_lists.wordsList01[9]; break;
                    case 24: show_word = test39_lists.wordsList01[1]; break;
                    case 25: show_word = test39_lists.wordsList01[4]; break;
                    case 26: show_word = test39_lists.wordsList01[3]; break;
                    case 27: show_word = test39_lists.wordsList01[6]; break;
                    case 28: show_word = test39_lists.wordsList01[8]; break;
                    case 32: show_word = test39_lists.wordsList01[4]; break;
                    case 33: show_word = test39_lists.wordsList01[8]; break;
                    case 34: show_word = test39_lists.wordsList01[1]; break;
                    case 35: show_word = test39_lists.wordsList01[5]; break;
                    case 36: show_word = test39_lists.wordsList01[6]; break;
                    case 37: show_word = test39_lists.wordsList01[2]; break;
                    case 38: show_word = test39_lists.wordsList01[0]; break;
                    case 39: show_word = test39_lists.wordsList01[9]; break;
                    case 40: show_word = test39_lists.wordsList01[7]; break;
                    case 41: show_word = test39_lists.wordsList01[3]; break;
                }

                res.render('clinician/test-screens/words_list/page06', {
                    text: show_word,
                    IDButton: "bt-test39-page" + page,
                    txtButton: "Kann nicht lesen",
                    IDButtonLeft: "bt-test39-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test39-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;
            
            case 16: case 29: case 42: {
                res.render('clinician/test-screens/words_list/page07', {
                    text1: page == 16 ? "Wortliste Lernen 1" : page == 29 ? "Wortliste Lernen 2" : "Wortliste Lernen 3",
                    text2: "Intrusionen:",
                    IDTextCountTimer: 'txt-test39-page' + page + '-count-timer',
                    IDButton1: "bt-test39-page" + page + "-1",
                    txtButton1: test39_lists.wordsList01[0],
                    IDButton2: "bt-test39-page" + page + "-2",
                    txtButton2: test39_lists.wordsList01[1],
                    IDButton3: "bt-test39-page" + page + "-3",
                    txtButton3: test39_lists.wordsList01[2],
                    IDButton4: "bt-test39-page" + page + "-4",
                    txtButton4: test39_lists.wordsList01[3],
                    IDButton5: "bt-test39-page" + page + "-5",
                    txtButton5: test39_lists.wordsList01[4],
                    IDButton6: "bt-test39-page" + page + "-6",
                    txtButton6: test39_lists.wordsList01[5],
                    IDButton7: "bt-test39-page" + page + "-7",
                    txtButton7: test39_lists.wordsList01[6],
                    IDButton8: "bt-test39-page" + page + "-8",
                    txtButton8: test39_lists.wordsList01[7],
                    IDButton9: "bt-test39-page" + page + "-9",
                    txtButton9: test39_lists.wordsList01[8],
                    IDButton10: "bt-test39-page" + page + "-10",
                    txtButton10: test39_lists.wordsList01[9],
                    IDText: "txt-test39-page" + page,
                    IDButtonMinus : "bt-test39-page" + page + "-minus",
                    IDButtonPlus : "bt-test39-page" + page + "-plus",
                    IDTextArea: "txta-test39-page" + page,
                    IDButtonLeft: "bt-test39-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test39-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;
            }

            case 17: case 30: case 43: {
                let knl = Number(req.query.knl);
                let lernen = Number(req.query.lernen);
                let lernen_int = Number(req.query.lernen_int);

                res.render('clinician/test-screens/words_list/page08', {
                    text1: page == 17 ? "SCORE - Wortliste Lernen 1" : page == 30 ? "SCORE - Wortliste Lernen 2" : "SCORE - Wortliste Lernen 3",
                    text2: "Kann nicht lesen = " + knl + " / 10",
                    text3: "Richtig erinnerten Wörter = " + lernen + " / 10",
                    text4: "Intrusionen = " + lernen_int,                    
                    IDButtonLeft: "bt-test39-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: page == 43 ? "bt-test39-page" + page + "-terminer" : "bt-test39-page" + page + "-continuer",
                    txtButtonRight: page == 43 ? "Beenden" : "Weiter"
                });

                break;
            }

            case 44: 
                res.render('clinician/test-screens/words_list/page09', {
                    text1: "Wortliste Abrufen",
                    text2: "Das Ziel dieser Aufgabe ist es festzustellen, wie gut sich die TP noch an die Wörter von der Aufgabe «Lernen» erinnern kann.",
                    text3: "Die <b><u>Instruktion</u></b> für diese Erinnerungsaufgabe lautet:",                    
                    text4: "\"Vor wenigen Minuten habe ich Sie gebeten, eine Liste von 10 Wörtern zu lernen, die Sie eins nach dem anderen von verschiedenen Kärtchen vorgelesen haben. Jetzt möchte ich Sie bitten, sich an diese Wörter zu erinnern und möglichs  viele dieser 10 Wörter aufzuzählen!\"",
                    text5: "Die TP hat für diese Aufgabe 90 Sekunden Zeit. Die erinnerten Wörter werden auf dem Antwortbogen entsprechend der durch die TP reproduzierten Reihenfolge nummeriert.",
                    text6: "Bewertung:",
                    text7: "Die Summe der richtig erinnerten Wörter ergibt den Punktwert.",
                    text8: "Notieren und bewerten Sie ebenfalls Wörter, welche durch die TP aufgezählt werden, die aber <b><u>nicht</u></b> auf dieser Liste figurierten (= Intrusionen!).",
                    IDButton: "bt-test39-page" + page + "-continuer",
                    txtButton: "Weiter"
                });
                break;

            case 45:
                res.render('clinician/test-screens/words_list/page04', {
                    text1: "Instruktion:",
                    text2: "\"Vor wenigen Minuten habe ich Sie gebeten, eine Liste von 10 Wörtern zu lernen, die Sie eins nach dem anderen von verschiedenen Kärtchen vorgelesen haben. Jetzt möchte ich Sie bitten, sich an diese Wörter zu erinnern und möglichst viele dieser 10 Wörter aufzuzählen!\"",
                    text3: "Zeitlimite: 90 Sekunden",
                    text4: "",
                    IDButtonLeft: "bt-test39-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test39-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;

            case 46: {
                res.render('clinician/test-screens/words_list/page13', {
                    text1: "Wortliste Abrufen",
                    text2: "«Klicken Sie auf alle Wörter, die richtig erinnert wurden. Mit den +/- Symbolen neben den jeweiligen Wörtern, können Sie Wiederholungen erfassen».",
                    text3: "Intrusionen:",
                    IDTextCountTimer: 'txt-test39-page' + page + '-count-timer',
                    IDButton1: "bt-test39-page" + page + "-1",
                    txtButton1: test39_lists.wordsList01[0],
                    IDText1: "txt-test39-page" + page + "-1",
                    IDButtonMinus1 : "bt-test39-page" + page + "-minus-1",
                    IDButtonPlus1 : "bt-test39-page" + page + "-plus-1",
                    IDButton2: "bt-test39-page" + page + "-2",
                    txtButton2: test39_lists.wordsList01[1],
                    IDText2: "txt-test39-page" + page + "-2",
                    IDButtonMinus2 : "bt-test39-page" + page + "-minus-2",
                    IDButtonPlus2 : "bt-test39-page" + page + "-plus-2",
                    IDButton3: "bt-test39-page" + page + "-3",
                    txtButton3: test39_lists.wordsList01[2],
                    IDText3: "txt-test39-page" + page + "-3",
                    IDButtonMinus3 : "bt-test39-page" + page + "-minus-3",
                    IDButtonPlus3 : "bt-test39-page" + page + "-plus-3",
                    IDButton4: "bt-test39-page" + page + "-4",
                    txtButton4: test39_lists.wordsList01[3],
                    IDText4: "txt-test39-page" + page + "-4",
                    IDButtonMinus4 : "bt-test39-page" + page + "-minus-4",
                    IDButtonPlus4 : "bt-test39-page" + page + "-plus-4",
                    IDButton5: "bt-test39-page" + page + "-5",
                    txtButton5: test39_lists.wordsList01[4],
                    IDText5: "txt-test39-page" + page + "-5",
                    IDButtonMinus5 : "bt-test39-page" + page + "-minus-5",
                    IDButtonPlus5 : "bt-test39-page" + page + "-plus-5",
                    IDButton6: "bt-test39-page" + page + "-6",
                    txtButton6: test39_lists.wordsList01[5],
                    IDText6: "txt-test39-page" + page + "-6",
                    IDButtonMinus6 : "bt-test39-page" + page + "-minus-6",
                    IDButtonPlus6 : "bt-test39-page" + page + "-plus-6",
                    IDButton7: "bt-test39-page" + page + "-7",
                    txtButton7: test39_lists.wordsList01[6],
                    IDText7: "txt-test39-page" + page + "-7",
                    IDButtonMinus7 : "bt-test39-page" + page + "-minus-7",
                    IDButtonPlus7 : "bt-test39-page" + page + "-plus-7",
                    IDButton8: "bt-test39-page" + page + "-8",
                    txtButton8: test39_lists.wordsList01[7],
                    IDText8: "txt-test39-page" + page + "-8",
                    IDButtonMinus8 : "bt-test39-page" + page + "-minus-8",
                    IDButtonPlus8 : "bt-test39-page" + page + "-plus-8",
                    IDButton9: "bt-test39-page" + page + "-9",
                    txtButton9: test39_lists.wordsList01[8],
                    IDText9: "txt-test39-page" + page + "-9",
                    IDButtonMinus9 : "bt-test39-page" + page + "-minus-9",
                    IDButtonPlus9 : "bt-test39-page" + page + "-plus-9",
                    IDButton10: "bt-test39-page" + page + "-10",
                    txtButton10: test39_lists.wordsList01[9],
                    IDText10: "txt-test39-page" + page + "-10",
                    IDButtonMinus10 : "bt-test39-page" + page + "-minus-10",
                    IDButtonPlus10 : "bt-test39-page" + page + "-plus-10",
                    IDText11: "txt-test39-page" + page + "-11",
                    IDButtonMinus11 : "bt-test39-page" + page + "-minus-11",
                    IDButtonPlus11 : "bt-test39-page" + page + "-plus-11",
                    IDTextArea: "txta-test39-page" + page,
                    IDButtonLeft: "bt-test39-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test39-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;
            }

            case 47: {
                let abrufen = Number(req.query.abrufen);
                let abrufen_int = Number(req.query.abrufen_int);
                let word01 = test39_lists.wordsList01[0] + ": " + req.query.value_word1;
                let word02 = test39_lists.wordsList01[1] + ": " + req.query.value_word2;
                let word03 = test39_lists.wordsList01[2] + ": " + req.query.value_word3;
                let word04 = test39_lists.wordsList01[3] + ": " + req.query.value_word4;
                let word05 = test39_lists.wordsList01[4] + ": " + req.query.value_word5;
                let word06 = test39_lists.wordsList01[5] + ": " + req.query.value_word6;
                let word07 = test39_lists.wordsList01[6] + ": " + req.query.value_word7;
                let word08 = test39_lists.wordsList01[7] + ": " + req.query.value_word8;
                let word09 = test39_lists.wordsList01[8] + ": " + req.query.value_word9;
                let word10 = test39_lists.wordsList01[9] + ": " + req.query.value_word10;

                res.render('clinician/test-screens/words_list/page14', {
                    text1: "SCORE - Wortliste Abrufen",
                    text2: "Richtig abgerufenes Wörter = " + abrufen + " / 10",
                    text3: "Intrusionen = " + abrufen_int,
                    text4: "Intrusion (Wort für Wort)",
                    text5: word01,
                    text6: word02,
                    text7: word03,
                    text8: word04,
                    text9: word05,
                    text10: word06,
                    text11: word07,
                    text12: word08,
                    text13: word09,
                    text14: word10,
                    IDButtonLeft: "bt-test39-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test39-page" + page + "-terminer",
                    txtButtonRight: "Beenden"
                });
                break;
            }

            case 48:
                res.render('clinician/test-screens/words_list/page10', {
                    text1: "Wortliste Wiedererkennen",
                    text2: "Die <b><u>Instruktion</u></b> für diesen Erkennungstest lautet:",
                    text3: "\"Als nächstes werde ich Ihnen eine Reihe von auf Kärtchen geschriebenen Wörtern zeigen. Einige davon sind Wörter, die Sie auf der früheren Liste schon gesehen haben und einige sind Wörter, die ich Ihnen noch nicht gezeigt habe. Ich möchte Sie bitten, mir diejenigen Wörter zu nennen, die Sie auf der früheren Liste bereits gesehen haben, und welche dieser Wörter neu sind.\" <span class='text-dark'>(Zeigen Sie nun die erste Karte mit dem ersten Wort ['Kirche']).</span> \"Ist das eines der Wörter das Sie vorher schon gesehen haben?\"",
                    text4: "Wiederholen Sie bei jedem Wort diese letzte Frage oder sagen Sie:",
                    text5: "\"Und wie ist es mit diesem Wort? \"",
                    text6: "Notieren Sie sich die Antworten der TP auf dem Antwortblatt.",
                    text7: "Fordern Sie die TP dazu auf, die Frage mit <b>'Ja'</b> oder <b>'Nein'</b> zu beantworten, weil <b>\"Ich weiss es nicht\"</b>-Antworten nicht bewertbar sind.",
                    text8: "<b>*Originalwörter</b> aus Lernen (Wortliste Lernen).",
                    IDButton1: "bt-test39-page" + page + "-1",
                    txtButton1: "Wort anzeigen ['Kirche']",
                    IDButton: "bt-test39-page" + page + "-continuer",
                    txtButton: "Weiter"
                });
                break;

            case 49: case 50: case 51: case 52: case 53: case 54: case 55: 
            case 56: case 57: case 58: case 59: case 60: case 61: case 62: 
            case 63: case 64: case 65: case 66: case 67: case 68: {
                let show_word = "";

                switch(page) {
                    case 49: case 50: case 52: case 55: case 57: case 58:
                    case 61: case 63: case 64: case 66:
                        show_word = test39_lists.wordsList02[page - 49]; break;
                        
                    case 51: case 53: case 54: case 56: case 59: case 60:
                    case 62: case 65: case 67: case 68:
                        show_word = test39_lists.wordsList02[page - 49] + "*"; break;
                }

                res.render('clinician/test-screens/words_list/page11', {
                    text: show_word,
                    IDButton1: "bt-test39-page" + page + "-1",
                    txtButton1_1: "Richtige",
                    txtButton1_2: "'JA'-Antworten",
                    IDButton2: "bt-test39-page" + page + "-2",
                    txtButton2_1: "Richtige",
                    txtButton2_2: "'NEIN'-Antworten",
                    IDButtonLeft: "bt-test39-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test39-page" + page + "-continuer",
                    txtButtonRight: "Weiter"
                });
                break;
            }

            case 69: {
                let r_ja = Number(req.query.r_ja);
                let r_nein = Number(req.query.r_nein);
                let f_ja = Number(req.query.f_ja);
                let f_nein = Number(req.query.f_nein);

                res.render('clinician/test-screens/words_list/page12', {
                    text1: "SCORE - Wortliste Wiedererkennen",
                    text2: "Total richtige 'JA' = " + r_ja,
                    text3: "Total richtige 'NEIN' = " + r_nein,
                    text4: "Total falsch 'JA' = " + f_ja + " / Total falsch 'NEIN' = " + f_nein,                   
                    IDButtonLeft: "bt-test39-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test39-page" + page + "-terminer",
                    txtButtonRight: "Beenden"
                });
                break;
            }

            case 70:
                res.render('clinician/test-screens/words_list/page15', {
                    text1: "Figur abzeichnen",
                    text2: "<b>Durchführung:</b> Der Untersucher gibt die folgende Instruktion und zeigt dabei auf die drei Figuren:",
                    text3: "<span class='text-primary'><i>\"Bitte kopieren Sie diese Zeichnungen so genau wie möglich auf das Papier, das vor Ihnen liegt\"</i></span>",
                    text4: "<b>Bewertung:</b> Ein Punkt wird jeweils vergeben für eine korrekt durchgeführte Zeichnung.",
                    text5: "Würfel und Rhombus:",
                    text6: "Der Würfel muss dreidimensional sein.",
                    text7: "Alle Linien müssen gezeichnet sein",
                    text8: "Keine Linie darf ergänzt werden",
                    text9: "Die Linien sind relative parallel und ihre Länge ist ähnlich",
                    text10: "Kreis:",
                    text11: "Der Umriss muss kreisförmig sein mit nur geringer Verzerrung (z.B. leichte Ungenauigkeit beim Kreisschluss)",
                    IDImage: "img-test39-page" + page,
                    urlImage: "/tests/words_list/image-70.png",
                    IDButton1: "bt-test39-page" + page + "-1",
                    txtButton1: "ANZEIGEN",
                    IDButton2: "bt-test39-page" + page + "-2",
                    txtButton2: "Würfel",
                    IDButton3: "bt-test39-page" + page + "-3",
                    txtButton3: "Rhombus",
                    IDButton4: "bt-test39-page" + page + "-4",
                    txtButton4: "Kreis",
                    IDButton: "bt-test39-page" + page + "-continuer",
                    txtButton: "Weiter"
                });
                break;

            case 71:
                let fiabz = Number(req.query.fiabz);
                
                res.render('clinician/test-screens/words_list/page16', {
                    text1: "Figur abzeichnen",
                    text2: "Score = " + fiabz,
                    IDButtonLeft: "bt-test39-page" + page + "-retour",
                    txtButtonLeft: "Zurück",
                    IDButtonRight: "bt-test39-page" + page + "-terminer",
                    txtButtonRight: "Beenden"
                });
                break;
        }
               
    } else if (session.checkSession(req, 3)) {
        let page = Number(req.query.page);
        
        switch (page) {
            case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15:
            case 19: case 20: case 21: case 22: case 23: case 24: case 25: case 26: case 27: case 28: 
            case 32: case 33: case 34: case 35: case 36: case 37: case 38: case 39: case 40: case 41: case 48:
            case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: case 58:
            case 59: case 60: case 61: case 62: case 63: case 64: case 65: case 66: case 67: case 68:
                let show_word = "";

                switch(page) {
                    case 6: show_word = test39_lists.wordsList01[0]; break;
                    case 7: show_word = test39_lists.wordsList01[1]; break;
                    case 8: show_word = test39_lists.wordsList01[2]; break;
                    case 9: show_word = test39_lists.wordsList01[3]; break;
                    case 10: show_word = test39_lists.wordsList01[4]; break;
                    case 11: show_word = test39_lists.wordsList01[5]; break;
                    case 12: show_word = test39_lists.wordsList01[6]; break;
                    case 13: show_word = test39_lists.wordsList01[7]; break;
                    case 14: show_word = test39_lists.wordsList01[8]; break;
                    case 15: show_word = test39_lists.wordsList01[9]; break;
                    case 19: show_word = test39_lists.wordsList01[7]; break;
                    case 20: show_word = test39_lists.wordsList01[5]; break;
                    case 21: show_word = test39_lists.wordsList01[0]; break;
                    case 22: show_word = test39_lists.wordsList01[2]; break;
                    case 23: show_word = test39_lists.wordsList01[9]; break;
                    case 24: show_word = test39_lists.wordsList01[1]; break;
                    case 25: show_word = test39_lists.wordsList01[4]; break;
                    case 26: show_word = test39_lists.wordsList01[3]; break;
                    case 27: show_word = test39_lists.wordsList01[6]; break;
                    case 28: show_word = test39_lists.wordsList01[8]; break;
                    case 32: show_word = test39_lists.wordsList01[4]; break;
                    case 33: show_word = test39_lists.wordsList01[8]; break;
                    case 34: show_word = test39_lists.wordsList01[1]; break;
                    case 35: show_word = test39_lists.wordsList01[5]; break;
                    case 36: show_word = test39_lists.wordsList01[6]; break;
                    case 37: show_word = test39_lists.wordsList01[2]; break;
                    case 38: show_word = test39_lists.wordsList01[0]; break;
                    case 39: show_word = test39_lists.wordsList01[9]; break;
                    case 40: show_word = test39_lists.wordsList01[7]; break;
                    case 41: show_word = test39_lists.wordsList01[3]; break;
                    case 48: show_word = test39_lists.wordsList02[0]; break;
                    case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: case 58:
                    case 59: case 60: case 61: case 62: case 63: case 64: case 65: case 66: case 67: case 68:
                        show_word = test39_lists.wordsList02[page - 49]; break;
                }
                res.render('patient/test-screens/words_list/page01', {
                    text: show_word,
                });

                break;

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