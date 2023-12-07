const session = require('../common/session');

exports.test24_gds_showpage = function(req, res) {
    if (session.checkSession(req, 2)) {      
        let page = Number(req.query.page);
        let language = req.query.language;
        
        switch(page) {
            case 1:
                res.render('clinician/test-screens/gds/page01', {                            
                    text1: "Geriatric Depression Scale (Kurzform)",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "Die Geriatrische Depressionsskala (GDS, Geriatric Depression Scale) ist ein Fragebogen, der sich auf die depressive Symptomatik bei älteren Menschen bezieht." : "L'échelle de dépression gériatrique (GDS, Geriatric Depression Scale) est un questionnaire qui se rapporte à la symptomatologie dépressive chez les personnes âgées.",
                    text4: language == 'de' ? "Der 15 Items umfassende Fragebogen sollte von der Person selbst ausgefüllt werden. Eventuell können die Fragen auch vorgelesen werden." : "Le questionnaire de 15 items doit être rempli par le sujet lui-même. Éventuellement, les questions peuvent être lues.",                            
                    text5: language == 'de' ? "Die Beantwortung der 15 Fragen, die sich darauf beziehen, wie sich die Person zum Zeitpunkt der Befragung oder in der vergangenen Woche fühlt, dauert etwa 5 Minuten." : "Il faut environ 5 minutes pour répondre aux 15 questions qui concernent ce qu'éprouve la personne au moment où elle est interrogée ou au cours de la semaine écoulée.",
                    text6: language == 'de' ? "Stellen Sie dem Patienten die Fragen und weisen Sie ihn darauf hin, dass er sich bei der Beantwortung in die vorangegangene Zeit, bestenfalls eine Woche, versetzen muss und nicht in das vergangene Leben oder in den gegenwärtigen Moment." : "Poser les questions au patient en lui précisant que, pour répondre, il doit se resituer dans le temps qui précède, au mieux une semaine, et non pas dans la vie passée ou dans l’instant présent.",
                    IDButton: "bt-test24-page1-continuer",
                    txtButton: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 2:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "1. Sind Sie grundsätzlich mit Ihrem Leben zufrieden?" : "1. Etes-vous globalement satisfait(e) de votre vie ?",
                    IDButton1: "bt-test24-page2-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page2-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page2-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page2-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 3:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "2. Haben Sie viel von Ihren Tätigkeiten und Interessen aufgegeben?" : "2. Avez-vous abandonné beaucoup de vos activités et centre d’intérêts ?",
                    IDButton1: "bt-test24-page3-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page3-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page3-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page3-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 4:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "3. Haben Sie das Gefühl, Ihr Leben sei leer?" : "3. Avez-vous l’impression que votre vie est vide ?",
                    IDButton1: "bt-test24-page4-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page4-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page4-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page4-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 5:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "4. Ist es Ihnen oft langweilig?" : "4. Est-ce que vous vous ennuyez souvent ?",
                    IDButton1: "bt-test24-page5-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page5-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page5-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page5-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 6:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "5. Sind Sie meistens guter Laune?" : "5. Etes-vous habituellement de bonne humeur ?",
                    IDButton1: "bt-test24-page6-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page6-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page6-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page6-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 7:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "6. Befürchten Sie, dass Ihnen etwas Schlimmes passieren könnte?" : "6. Redoutez-vous que quelque chose vous arrive ?",
                    IDButton1: "bt-test24-page7-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page7-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page7-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page7-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 8:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "7. Sind Sie meistens zufrieden?" : "7. Vous sentez-vous heureux(s)e la plupart du temps ?",
                    IDButton1: "bt-test24-page8-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page8-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page8-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page8-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 9:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "8. Fühlen Sie sich oft hilflos?" : "8. Eprouvez-vous un sentiment d’impuissance ?",
                    IDButton1: "bt-test24-page9-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page9-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page9-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page9-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 10:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "9. Sind Sie lieber zu Hause, statt auszugehen und etwas zu unternehmen?" : "9. Préférez-vous rester chez vous plutôt que de sortir et faire de nouvelles choses ?",
                    IDButton1: "bt-test24-page10-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page10-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page10-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page10-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 11:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "10. Glauben Sie, dass Sie mit Ihrem Gedächtnis mehr Schwierigkeiten haben als andere Leute in Ihrem Alter?" : "10. Considérez-vous que vous avez plus de problèmes de mémoire que la majorité des gens ?",
                    IDButton1: "bt-test24-page11-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page11-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page11-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page11-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 12:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "11. Leben Sie gerne?" : "11. Estimez-vous que la vie est actuellement passionnante ?",
                    IDButton1: "bt-test24-page12-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page12-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page12-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page12-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 13:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "12. Fühlen Sie sich so, wie Sie jetzt sind, eher wertlos?" : "12. Vous sentez-vous actuellement sans valeur ?",
                    IDButton1: "bt-test24-page13-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page13-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page13-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page13-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 14:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "13. Haben Sie viel Energie?" : "13. Vous sentez-vous plein d’énergie ?",
                    IDButton1: "bt-test24-page14-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page14-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page14-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page14-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 15:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "14. Finden Sie, Ihre Lage sei hoffnungslos?" : "14. Pensez-vous que votre situation est désespérée ?",
                    IDButton1: "bt-test24-page15-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page15-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page15-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page15-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 16:
                res.render('clinician/test-screens/gds/page02', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: language == 'de' ? "15. Glauben Sie, die meisten anderen Leute haben es besser als Sie?" : "15. Pensez-vous que la majorité des gens vivent mieux que vous ?",
                    IDButton1: "bt-test24-page16-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page16-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page16-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page16-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 17: {
                let score = Number(req.query.score);                                           

                res.render('clinician/test-screens/gds/page03', {
                    text1: "Geriatric Depression Scale",
                    text2: "GDS 15 Items",
                    text3: "Score:",
                    text4: score + " / 15",
                    text5: language == 'de' ? "Kommentare:" : "Commentaires:",
                    IDTextArea: "txt-test24-page17",                             
                    IDButtonLeft: "bt-test24-page17-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page17-terminer",
                    txtButtonRight: language == 'de' ? "Beenden" : "Terminer"
                });   
                break;
            }
        }
    } else if (session.checkSession(req, 3)) {
        let page = Number(req.query.page);
        let language = req.query.language;

        switch(page) {
            case 2:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Sind Sie grundsätzlich mit Ihrem Leben zufrieden?" : "Etes-vous globalement satisfait(e) de votre vie ?",
                    IDButton1: "bt-test24-page2-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page2-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page2-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page2-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 3:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Haben Sie viel von Ihren Tätigkeiten und Interessen aufgegeben?" : "Avez-vous abandonné beaucoup de vos activités et centre d’intérêts ?",
                    IDButton1: "bt-test24-page3-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page3-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page3-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page3-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 4:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Haben Sie das Gefühl, Ihr Leben sei leer?" : "Avez-vous l’impression que votre vie est vide ?",
                    IDButton1: "bt-test24-page4-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page4-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page4-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page4-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 5:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Ist es Ihnen oft langweilig?" : "Est-ce que vous vous ennuyez souvent ?",
                    IDButton1: "bt-test24-page5-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page5-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page5-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page5-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 6:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Sind Sie meistens guter Laune?" : "Etes-vous habituellement de bonne humeur ?",
                    IDButton1: "bt-test24-page6-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page6-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page6-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page6-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 7:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Befürchten Sie, dass Ihnen etwas Schlimmes passieren könnte?" : "Redoutez-vous que quelque chose vous arrive ?",
                    IDButton1: "bt-test24-page7-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page7-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page7-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page7-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 8:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Sind Sie meistens zufrieden?" : "Vous sentez-vous heureux(s)e la plupart du temps ?",
                    IDButton1: "bt-test24-page8-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page8-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page8-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page8-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 9:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Fühlen Sie sich oft hilflos?" : "Eprouvez-vous un sentiment d’impuissance ?",
                    IDButton1: "bt-test24-page9-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page9-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page9-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page9-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 10:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Sind Sie lieber zu Hause, statt auszugehen und etwas zu unternehmen?" : "Préférez-vous rester chez vous plutôt que de sortir et faire de nouvelles choses ?",
                    IDButton1: "bt-test24-page10-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page10-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page10-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page10-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 11:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Glauben Sie, dass Sie mit Ihrem Gedächtnis mehr Schwierigkeiten haben als andere Leute in Ihrem Alter?" : "Considérez-vous que vous avez plus de problèmes de mémoire que la majorité des gens ?",
                    IDButton1: "bt-test24-page11-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page11-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page11-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page11-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 12:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Leben Sie gerne?" : "Estimez-vous que la vie est actuellement passionnante ?",
                    IDButton1: "bt-test24-page12-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page12-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page12-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page12-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 13:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Fühlen Sie sich so, wie Sie jetzt sind, eher wertlos?" : "Vous sentez-vous actuellement sans valeur ?",
                    IDButton1: "bt-test24-page13-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page13-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page13-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page13-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 14:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Haben Sie viel Energie?" : "Vous sentez-vous plein d’énergie ?",
                    IDButton1: "bt-test24-page14-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page14-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page14-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page14-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 15:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Finden Sie, Ihre Lage sei hoffnungslos?" : "Pensez-vous que votre situation est désespérée ?",
                    IDButton1: "bt-test24-page15-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page15-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page15-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page15-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;

            case 16:
                res.render('patient/test-screens/gds/page01', {                            
                    text: language == 'de' ? "Glauben Sie, die meisten anderen Leute haben es besser als Sie?" : "Pensez-vous que la majorité des gens vivent mieux que vous ?",
                    IDButton1: "bt-test24-page16-oui",                            
                    txtButton1: language == 'de' ? "JA" : "OUI",
                    IDButton2: "bt-test24-page16-non",                            
                    txtButton2: language == 'de' ? "NEIN" : "NON",
                    IDButtonLeft: "bt-test24-page16-retour",
                    txtButtonLeft: language == 'de' ? "Zurück" : "Retour",
                    IDButtonRight: "bt-test24-page16-continuer",
                    txtButtonRight: language == 'de' ? "Weiter" : "Continuer"
                });   
                break;
        }
    } else {
        res.redirect('/'); 
    }
}