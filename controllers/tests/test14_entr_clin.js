const session = require('../common/session');

const Test14_Entr_Clin = require('../../models/test_entr_clin');

exports.test14_entr_clin_showpage = function(req, res) {
    if (session.checkSession(req, 2)) {      
        let type = req.query.type;
        
        switch(type) {
            case 'c': {
                let page = Number(req.query.page);
                
                if (page == 1) {
                    res.render('clinician/test-screens/entr_clin/page02', {                            
                        text: "Conclusion",
                        IDTextArea: "txt-test14-c-page01",
                        IDButton: "bt-test14-c-page01-terminer",
                        txtButton: "Terminer"
                    });   
                }
                break;
            }

            case 'dl': {
                let page = Number(req.query.page);
                
                if (page == 1) {
                    res.render('clinician/test-screens/entr_clin/page02', {                            
                        text: "Discussion Libre",
                        IDTextArea: "txt-test14-dl-page01",
                        IDButton: "bt-test14-dl-page01-terminer",
                        txtButton: "Terminer"
                    });   
                }
                break;
            }

            case 'fcs': {
                let page = Number(req.query.page);
                
                switch(page) {
                    case 1:
                        res.render('clinician/test-screens/entr_clin/page03', {                            
                            text1: "Fonctionnement Cognitif Subjectif",
                            text2: "Dans les questions ci-dessous, vous pouvez indiquer si votre mémoire ou votre concentration a changé.",
                            text3: "Ce sont des changements possibles que vous avez remarqués en vous-même au cours de l'année passée.",
                            text4: "Un certain nombre d'exemples sont donnés pour chaque question. Vous pouvez cocher votre réponse dans l'une des cases.",                            
                            IDButton: "bt-test14-fcs-page01-continuer",
                            txtButton: "Continuer"
                        });   
                        break;
                    
                    case 2:
                        res.render('clinician/test-screens/entr_clin/page04', {
                            text1: "Mémoire",
                            text2: "Y a-t-il eu un changement au cours de l’année passée par rapport à <b>votre mémoire:</b>",
                            text3: "Par exemple: mémoriser des noms, chercher des mots, savoir où se trouvent les choses, mémoriser des plans / rendez-vous, mémoriser ce que vous avez fait, mémoriser ce que vous avez lu.",                            
                            IDButton1: "bt-test14-fcs-page02-1",                            
                            txtButton1: "très forte amélioration",
                            IDButton2: "bt-test14-fcs-page02-2",
                            txtButton2: "forte amélioration",                    
                            IDButton3: "bt-test14-fcs-page02-3",                            
                            txtButton3: "légère amélioration",
                            IDButton4: "bt-test14-fcs-page02-4",                       
                            txtButton4: "légère baisse",
                            IDButton5: "bt-test14-fcs-page02-5",                         
                            txtButton5: "forte baisse",
                            IDButton6: "bt-test14-fcs-page02-6",
                            txtButton6: "très forte baisse",
                            IDButton7: "bt-test14-fcs-page02-7",
                            txtButton7: "pas de changement",
                            IDButtonLeft: "bt-test14-fcs-page02-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-fcs-page02-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 3:                        
                        res.render('clinician/test-screens/entr_clin/page04', {
                            text1: "Concentration",
                            text2: "Y a-t-il eu un changement au cours de l’année passée par rapport à <b>votre concentration (pouvoir garder votre attention):</b>",
                            text3: "Par exemple: être distrait en lisant quand vous entendez quelque chose, vous perdre dans vos pensées  quand vous faites quelque chose, être distrait quand vous parlez à quelqu'un.",
                            IDButton1: "bt-test14-fcs-page03-1",                            
                            txtButton1: "très forte amélioration",
                            IDButton2: "bt-test14-fcs-page03-2",
                            txtButton2: "forte amélioration",                    
                            IDButton3: "bt-test14-fcs-page03-3",                            
                            txtButton3: "légère amélioration",
                            IDButton4: "bt-test14-fcs-page03-4",                       
                            txtButton4: "légère baisse",
                            IDButton5: "bt-test14-fcs-page03-5",                         
                            txtButton5: "forte baisse",
                            IDButton6: "bt-test14-fcs-page03-6",
                            txtButton6: "très forte baisse",
                            IDButton7: "bt-test14-fcs-page03-7",
                            txtButton7: "pas de changement",
                            IDButtonLeft: "bt-test14-fcs-page03-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-fcs-page03-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 4:                        
                        res.render('clinician/test-screens/entr_clin/page04', {
                            text1: "Capacité Mentale",
                            text2: "Y a-t-il eu un changement au cours de l’année passée par rapport à <b>votre capacité mentale: se fatiguer mentalement quand on fait quelque chose (pas de fatigue physique):</b>",
                            text3: "Par exemple: être épuisé lorsque vous avez des conversations, vous  quand vous lisez, se fatiguer dans un environnement occupé (par exemple, shopping, fête d'anniversaire), réaliser des tâches administratives devient  fatigant (banque, formulaires fiscaux)",
                            IDButton1: "bt-test14-fcs-page04-1",                            
                            txtButton1: "très forte amélioration",
                            IDButton2: "bt-test14-fcs-page04-2",
                            txtButton2: "forte amélioration",                    
                            IDButton3: "bt-test14-fcs-page04-3",                            
                            txtButton3: "légère amélioration",
                            IDButton4: "bt-test14-fcs-page04-4",                       
                            txtButton4: "légère baisse",
                            IDButton5: "bt-test14-fcs-page04-5",                         
                            txtButton5: "forte baisse",
                            IDButton6: "bt-test14-fcs-page04-6",
                            txtButton6: "très forte baisse",
                            IDButton7: "bt-test14-fcs-page04-7",
                            txtButton7: "pas de changement",
                            IDButtonLeft: "bt-test14-fcs-page04-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-fcs-page04-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 5:                        
                        res.render('clinician/test-screens/entr_clin/page04', {
                            text1: "Vitalité",
                            text2: "Y a-t-il eu un changement au cours de l’année passée par rapport à <b>votre vitalité: le sentiment de pouvoir faire face aux soucis quotidiens.</b>",
                            text3: "Par exemple: se sentir reposé, être capable de penser clairement, sentir que vous êtes actif et énergique, être capable de gérer correctement les problèmes, le désir de faire les choses.",
                            IDButton1: "bt-test14-fcs-page05-1",                            
                            txtButton1: "très forte amélioration",
                            IDButton2: "bt-test14-fcs-page05-2",
                            txtButton2: "forte amélioration",                    
                            IDButton3: "bt-test14-fcs-page05-3",                            
                            txtButton3: "légère amélioration",
                            IDButton4: "bt-test14-fcs-page05-4",                       
                            txtButton4: "légère baisse",
                            IDButton5: "bt-test14-fcs-page05-5",                         
                            txtButton5: "forte baisse",
                            IDButton6: "bt-test14-fcs-page05-6",
                            txtButton6: "très forte baisse",
                            IDButton7: "bt-test14-fcs-page05-7",
                            txtButton7: "pas de changement",
                            IDButtonLeft: "bt-test14-fcs-page05-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-fcs-page05-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 6:
                        let score = Number(req.query.score);

                        res.render('clinician/test-screens/entr_clin/page05', {                            
                            text1: "Score:",
                            text2: score,                            
                            IDButtonLeft: "bt-test14-fcs-page06-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-fcs-page06-terminer",
                            txtButtonRight: "Terminer"
                        });   
                        break;
                       
                }
                break;
            }

            case 'gds': {
                let page = Number(req.query.page);
                
                switch(page) {
                    case 1:
                        res.render('clinician/test-screens/entr_clin/page06', {                            
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "L'échelle de dépression gériatrique (GDS, Geriatric Depression Scale) est un questionnaire qui se rapporte à la symptomatologie dépressive chez les personnes âgées.",
                            text4: "Le questionnaire de 15 items doit être rempli par le sujet lui-même. Éventuellement, les questions peuvent être lues.",                            
                            text5: "Il faut environ 5 minutes pour répondre aux 15 questions qui concernent ce qu'éprouve la personne au moment où elle est interrogée ou au cours de la semaine écoulée.",
                            text6: "Poser les questions au patient en lui précisant que, pour répondre, il doit se resituer dans le temps qui précède, au mieux une semaine, et non pas dans la vie passée ou dans l’instant présent.",
                            IDButton: "bt-test14-gds-page01-continuer",
                            txtButton: "Continuer"
                        });   
                        break;

                    case 2:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "1. Etes-vous globalement satisfait(e) de votre vie ?",
                            IDButton1: "bt-test14-gds-page2-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page2-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page2-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page2-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 3:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "2. Avez-vous abandonné beaucoup de vos activités et centre d’intérêts ?",
                            IDButton1: "bt-test14-gds-page3-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page3-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page3-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page3-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 4:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "3. Avez-vous l’impression que votre vie est vide ?",
                            IDButton1: "bt-test14-gds-page4-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page4-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page4-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page4-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 5:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "4. Est-ce que vous vous ennuyez souvent ?",
                            IDButton1: "bt-test14-gds-page5-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page5-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page5-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page5-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 6:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "5. Etes-vous habituellement de bonne humeur ?",
                            IDButton1: "bt-test14-gds-page6-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page6-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page6-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page6-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 7:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "6. Redoutez-vous que quelque chose vous arrive ?",
                            IDButton1: "bt-test14-gds-page7-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page7-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page7-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page7-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 8:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "7. Vous sentez-vous heureux(s)e la plupart du temps ?",
                            IDButton1: "bt-test14-gds-page8-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page8-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page8-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page8-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 9:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "8. Eprouvez-vous un sentiment d’impuissance ?",
                            IDButton1: "bt-test14-gds-page9-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page9-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page9-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page9-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 10:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "9. Préférez-vous rester chez vous plutôt que de sortir et faire de nouvelles choses ?",
                            IDButton1: "bt-test14-gds-page10-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page10-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page10-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page10-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 11:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "10. Considérez-vous que vous avez plus de problèmes de mémoire que la majorité des gens ?",
                            IDButton1: "bt-test14-gds-page11-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page11-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page11-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page11-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 12:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "11. Estimez-vous que la vie est actuellement passionnante ?",
                            IDButton1: "bt-test14-gds-page12-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page12-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page12-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page12-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 13:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "12. Vous sentez-vous actuellement sans valeur ?",
                            IDButton1: "bt-test14-gds-page13-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page13-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page13-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page13-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 14:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "13. Vous sentez-vous plein d’énergie ?",
                            IDButton1: "bt-test14-gds-page14-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page14-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page14-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page14-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 15:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "14. Pensez-vous que votre situation est désespérée ?",
                            IDButton1: "bt-test14-gds-page15-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page15-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page15-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page15-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 16:
                        res.render('clinician/test-screens/entr_clin/page07', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "15. Pensez-vous que la majorité des gens vivent mieux que vous ?",
                            IDButton1: "bt-test14-gds-page16-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page16-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page16-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page16-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 17: {
                        let score = Number(req.query.score);                                           

                        res.render('clinician/test-screens/entr_clin/page08', {
                            text1: "Geriatric Depression Scale",
                            text2: "GDS 15 Items",
                            text3: "Score:",
                            text4: score + " / 15",
                            text5: "Commentaires:",
                            IDTextArea: "txt-test14-gds-page17",                             
                            IDButtonLeft: "bt-test14-gds-page17-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page17-terminer",
                            txtButtonRight: "Terminer"
                        });   
                        break;
                    }
                }
                break;
            }

            case 'hm': {
                let page = Number(req.query.page);
                
                if (page == 1) {
                    res.render('clinician/test-screens/entr_clin/page02', {                            
                        text: "Histoire Médicale",
                        IDTextArea: "txt-test14-hm-page01",
                        IDButton: "bt-test14-hm-page01-terminer",
                        txtButton: "Terminer"
                    });   
                }
                break;
            }

            case 'ia': {
                let page = Number(req.query.page);
                
                switch(page) {
                    case 1:
                        res.render('clinician/test-screens/entr_clin/page09', {                            
                            text1: "Inventaire Apathie",
                            text2: "Le but de l'Inventaire Apathie (IA) est de recueillir des informations sur la présence d'apathie chez des patients souffrant de pathologies cérébrales.",
                            text3: "<b>Au moment de la première évaluation</b>, les questions se rapportent aux changements de comportement du patient qui sont apparus depuis le début de la maladie.",
                            text4: "Les comportements présents tout au long de la vie du patient et qui n'ont pas changé au cours de l'évolution de la maladie ne sont pas cotés même s'ils sont anormaux.",
                            text5: "L'IA est aussi utilisé pour évaluer sur une <b>période de temps définie.</b>",
                            text6: "Dans ce cas, il faut préciser sur quelle période porte l'évaluation du comportement.", 
                            text7: "par exemple sur les 4 dernières semaines ou depuis l'instauration d'un traitement ou depuis la dernière visite.",
                            IDButton: "bt-test14-ia-page1-continuer",
                            txtButton: "Continuer"
                        });   
                        break;

                    case 2:
                        res.render('clinician/test-screens/entr_clin/page10', {                            
                            text1: "Inventaire Apathie",
                            text2: "<b>Emoussement affectif:</b> Le patient se montre-t-il affectueux ? Manifeste-t-il des émotions ?",
                            IDButton1: "bt-test14-ia-page2-1",
                            IDButton2: "bt-test14-ia-page2-2",
                            IDButton3: "bt-test14-ia-page2-3",
                            IDButton4: "bt-test14-ia-page2-4",
                            IDButton5: "bt-test14-ia-page2-5",
                            text3: "<b>Perte d’initiative:</b> Le patient engage-t-il une conversation de manière spontanée ? Prends-il des décisions ?",
                            IDButton6: "bt-test14-ia-page2-6",
                            IDButton7: "bt-test14-ia-page2-7",
                            IDButton8: "bt-test14-ia-page2-8",
                            IDButton9: "bt-test14-ia-page2-9",
                            IDButton10: "bt-test14-ia-page2-10",
                            text4: "<b>Perte d’intérêt:</b> Le patient a-t-il des intérêts ? S'intéresse-il aux activités et aux projets des autres ? Manifeste de l'intérêt pour ses amis et membres de sa famille ?",
                            IDButton11: "bt-test14-ia-page2-11",
                            IDButton12: "bt-test14-ia-page2-12",
                            IDButton13: "bt-test14-ia-page2-13",
                            IDButton14: "bt-test14-ia-page2-14",
                            IDButton15: "bt-test14-ia-page2-15",
                            text5: "0 = Absence de Trouble     2 = Trouble Modéré     4 = Trouble Majeur",
                            IDButtonLeft: "bt-test14-ia-page2-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-ia-page2-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 3: {
                        let emoussement_affectif = Number(req.query.emoussement_affectif);
                        let perte_d_initiative = Number(req.query.perte_d_initiative);
                        let perte_d_interet = Number(req.query.perte_d_interet);

                        res.render('clinician/test-screens/entr_clin/page11', {                            
                            text1: "Inventaire Apathie",
                            text2: "Résultats",
                            text3: "Emoussement affectif: " + emoussement_affectif + " / 4",
                            text4: "Perte d’initiative: " + perte_d_initiative + " / 4",
                            text5: "Perte d’intérêt: " + perte_d_interet + " / 4",
                            text6: "Total: " + (emoussement_affectif + perte_d_initiative + perte_d_interet) + " / 12",                            
                            IDButtonLeft: "bt-test14-ia-page3-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-ia-page3-terminer",
                            txtButtonRight: "Terminer"
                        });   
                        break;
                    }
                }
                break;
            }

            case 'rj': {
                let page = Number(req.query.page);
                
                if (page == 1) {
                    res.render('clinician/test-screens/entr_clin/page02', {                            
                        text: "Raconter - Journée",
                        IDTextArea: "txt-test14-rj-page01",
                        IDButton: "bt-test14-rj-page01-terminer",
                        txtButton: "Terminer"
                    });   
                }
                break;
            }

            case 'start': {                    
                let idSelectedSession = Number(req.query.id_session);                
                let test_histoire_medicale = "";
                let test_discussion_libre = "";
                let test_reconter_journee = "";
                let test_conclusion = "";
                let test_fcs = "";
                let test_gds = "";
                let test_inventaire_apathie = "";                

                Test14_Entr_Clin.select_partie_by_idSession(idSelectedSession)
                .then(([test_entr_clin]) => {
                    if (test_entr_clin.length >= 1) {                
                        let partie = test_entr_clin[0].partie;

                        if ((partie & 64) == 64) {
                            test_histoire_medicale = "<span style='font-size:18px'>&#9745;</span>";
                        }

                        if ((partie & 32) == 32) {
                            test_discussion_libre = "<span style='font-size:18px'>&#9745;</span>";
                        }

                        if ((partie & 16) == 16) {
                            test_reconter_journee = "<span style='font-size:18px'>&#9745;</span>";
                        }

                        if ((partie & 8) == 8) {
                            test_conclusion = "<span style='font-size:18px'>&#9745;</span>";
                        }

                        if ((partie & 4) == 4) {
                            test_fcs = "<span style='font-size:18px'>&#9745;</span>";
                        }

                        if ((partie & 2) == 2) {
                            test_gds = "<span style='font-size:18px'>&#9745;</span>";
                        }

                        if ((partie & 1) == 1) {
                            test_inventaire_apathie = "<span style='font-size:18px'>&#9745;</span>";    
                        }                                        
                    }

                    res.render('clinician/test-screens/entr_clin/page01', {                            
                        IDButton1: "bt-test14-start-1",
                        test_histoire_medicale: test_histoire_medicale, 
                        txtButton1: "Historique du Patient",
                        IDButton2: "bt-test14-start-2",
                        test_discussion_libre: test_discussion_libre,
                        txtButton2: "Histoire Médicale & Discussion Libre",                    
                        IDButton3: "bt-test14-start-3",
                        test_reconter_journee: test_reconter_journee, 
                        txtButton3: "Raconter - Journée",
                        IDButton4: "bt-test14-start-4",
                        test_conclusion: test_conclusion,
                        txtButton4: "Conclusion",
                        IDButton5: "bt-test14-start-5",
                        test_fcs: test_fcs, 
                        txtButton5: "FCS (SCF 4 items)",
                        IDButton6: "bt-test14-start-6",
                        test_gds: test_gds,
                        txtButton6: "GDS-15 items",
                        IDButton7: "bt-test14-start-7",
                        test_inventaire_apathie: test_inventaire_apathie,
                        txtButton7: "Inventaire Apathie",
                        IDButton: "bt-test14-start-continuer",
                        txtButton: "Terminer"
                    });                    
                })
                .catch(err => console.log(err));
                
                break;                  
            }
        }
    } else if (session.checkSession(req, 3)) {      
        let type = req.query.type;
        
        switch(type) {
            case 'fcs': {
                let page = Number(req.query.page);
                
                switch(page) {
                    case 1:                
                        res.render('patient/test-screens/entr_clin/page01', {
                            text1: "Dans les questions ci-dessous, vous pouvez indiquer si votre mémoire ou votre concentration a changé.",
                            text2: "Ce sont des changements possibles que vous avez remarqués en vous-même au cours de l'année passée.",
                            text3: "Un certain nombre d'exemples sont donnés pour chaque question. Vous pouvez cocher votre réponse dans l'une des cases."
                        });   
                        break;
                    
                    case 2:                        
                        res.render('patient/test-screens/entr_clin/page02', {                            
                            text1: "Mémoire",
                            text2: "Y a-t-il eu un changement au cours de l’année passée par rapport à <b>votre mémoire:</b>",
                            text3: "Par exemple: mémoriser des noms, chercher des mots, savoir où se trouvent les choses, mémoriser des plans / rendez-vous, mémoriser ce que vous avez fait, mémoriser ce que vous avez lu.",                            
                            IDButton1: "bt-test14-fcs-page02-1",                            
                            txtButton1: "très forte amélioration",
                            IDButton2: "bt-test14-fcs-page02-2",
                            txtButton2: "forte amélioration",                    
                            IDButton3: "bt-test14-fcs-page02-3",                            
                            txtButton3: "légère amélioration",
                            IDButton4: "bt-test14-fcs-page02-4",                       
                            txtButton4: "légère baisse",
                            IDButton5: "bt-test14-fcs-page02-5",                         
                            txtButton5: "forte baisse",
                            IDButton6: "bt-test14-fcs-page02-6",
                            txtButton6: "très forte baisse",
                            IDButton7: "bt-test14-fcs-page02-7",
                            txtButton7: "pas de changement"
                        });   
                        break;     
                        
                    case 3:                        
                        res.render('patient/test-screens/entr_clin/page02', {
                            text1: "Concentration",
                            text2: "Y a-t-il eu un changement au cours de l’année passée par rapport à <b>votre concentration (pouvoir garder votre attention):</b>",
                            text3: "Par exemple: être distrait en lisant quand vous entendez quelque chose, vous perdre dans vos pensées  quand vous faites quelque chose, être distrait quand vous parlez à quelqu'un.",
                            IDButton1: "bt-test14-fcs-page03-1",                            
                            txtButton1: "très forte amélioration",
                            IDButton2: "bt-test14-fcs-page03-2",
                            txtButton2: "forte amélioration",                    
                            IDButton3: "bt-test14-fcs-page03-3",                            
                            txtButton3: "légère amélioration",
                            IDButton4: "bt-test14-fcs-page03-4",                       
                            txtButton4: "légère baisse",
                            IDButton5: "bt-test14-fcs-page03-5",                         
                            txtButton5: "forte baisse",
                            IDButton6: "bt-test14-fcs-page03-6",
                            txtButton6: "très forte baisse",
                            IDButton7: "bt-test14-fcs-page03-7",
                            txtButton7: "pas de changement"
                        });   
                        break;

                    case 4:                        
                        res.render('patient/test-screens/entr_clin/page02', {
                            text1: "Capacité Mentale",
                            text2: "Y a-t-il eu un changement au cours de l’année passée par rapport à <b>votre capacité mentale: se fatiguer mentalement quand on fait quelque chose (pas de fatigue physique):</b>",
                            text3: "Par exemple: être épuisé lorsque vous avez des conversations, vous  quand vous lisez, se fatiguer dans un environnement occupé (par exemple, shopping, fête d'anniversaire), réaliser des tâches administratives devient  fatigant (banque, formulaires fiscaux)",
                            IDButton1: "bt-test14-fcs-page04-1",                            
                            txtButton1: "très forte amélioration",
                            IDButton2: "bt-test14-fcs-page04-2",
                            txtButton2: "forte amélioration",                    
                            IDButton3: "bt-test14-fcs-page04-3",                            
                            txtButton3: "légère amélioration",
                            IDButton4: "bt-test14-fcs-page04-4",                       
                            txtButton4: "légère baisse",
                            IDButton5: "bt-test14-fcs-page04-5",                         
                            txtButton5: "forte baisse",
                            IDButton6: "bt-test14-fcs-page04-6",
                            txtButton6: "très forte baisse",
                            IDButton7: "bt-test14-fcs-page04-7",
                            txtButton7: "pas de changement"
                        });   
                        break;

                    case 5:                        
                        res.render('patient/test-screens/entr_clin/page02', {
                            text1: "Vitalité",
                            text2: "Y a-t-il eu un changement au cours de l’année passée par rapport à <b>votre vitalité: le sentiment de pouvoir faire face aux soucis quotidiens.</b>",
                            text3: "Par exemple: se sentir reposé, être capable de penser clairement, sentir que vous êtes actif et énergique, être capable de gérer correctement les problèmes, le désir de faire les choses.",
                            IDButton1: "bt-test14-fcs-page05-1",                            
                            txtButton1: "très forte amélioration",
                            IDButton2: "bt-test14-fcs-page05-2",
                            txtButton2: "forte amélioration",                    
                            IDButton3: "bt-test14-fcs-page05-3",                            
                            txtButton3: "légère amélioration",
                            IDButton4: "bt-test14-fcs-page05-4",                       
                            txtButton4: "légère baisse",
                            IDButton5: "bt-test14-fcs-page05-5",                         
                            txtButton5: "forte baisse",
                            IDButton6: "bt-test14-fcs-page05-6",
                            txtButton6: "très forte baisse",
                            IDButton7: "bt-test14-fcs-page05-7",
                            txtButton7: "pas de changement"
                        });   
                        break;
                }
                break;
            }

            case 'gds': {
                let page = Number(req.query.page);
                
                switch(page) {
                    case 2:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Etes-vous globalement satisfait(e) de votre vie ?",
                            IDButton1: "bt-test14-gds-page2-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page2-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page2-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page2-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 3:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Avez-vous abandonné beaucoup de vos activités et centre d’intérêts ?",
                            IDButton1: "bt-test14-gds-page3-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page3-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page3-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page3-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 4:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Avez-vous l’impression que votre vie est vide ?",
                            IDButton1: "bt-test14-gds-page4-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page4-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page4-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page4-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 5:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Est-ce que vous vous ennuyez souvent ?",
                            IDButton1: "bt-test14-gds-page5-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page5-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page5-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page5-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 6:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Etes-vous habituellement de bonne humeur ?",
                            IDButton1: "bt-test14-gds-page6-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page6-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page6-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page6-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 7:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Redoutez-vous que quelque chose vous arrive ?",
                            IDButton1: "bt-test14-gds-page7-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page7-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page7-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page7-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 8:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Vous sentez-vous heureux(s)e la plupart du temps ?",
                            IDButton1: "bt-test14-gds-page8-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page8-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page8-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page8-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 9:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Eprouvez-vous un sentiment d’impuissance ?",
                            IDButton1: "bt-test14-gds-page9-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page9-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page9-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page9-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 10:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Préférez-vous rester chez vous plutôt que de sortir et faire de nouvelles choses ?",
                            IDButton1: "bt-test14-gds-page10-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page10-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page10-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page10-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 11:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Considérez-vous que vous avez plus de problèmes de mémoire que la majorité des gens ?",
                            IDButton1: "bt-test14-gds-page11-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page11-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page11-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page11-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 12:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Estimez-vous que la vie est actuellement passionnante ?",
                            IDButton1: "bt-test14-gds-page12-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page12-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page12-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page12-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 13:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Vous sentez-vous actuellement sans valeur ?",
                            IDButton1: "bt-test14-gds-page13-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page13-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page13-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page13-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 14:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Vous sentez-vous plein d’énergie ?",
                            IDButton1: "bt-test14-gds-page14-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page14-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page14-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page14-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 15:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Pensez-vous que votre situation est désespérée ?",
                            IDButton1: "bt-test14-gds-page15-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page15-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page15-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page15-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;

                    case 16:
                        res.render('patient/test-screens/entr_clin/page03', {                            
                            text: "Pensez-vous que la majorité des gens vivent mieux que vous ?",
                            IDButton1: "bt-test14-gds-page16-oui",                            
                            txtButton1: "OUI",
                            IDButton2: "bt-test14-gds-page16-non",                            
                            txtButton2: "NON",
                            IDButtonLeft: "bt-test14-gds-page16-retour",
                            txtButtonLeft: "Retour",
                            IDButtonRight: "bt-test14-gds-page16-continuer",
                            txtButtonRight: "Continuer"
                        });   
                        break;
                }
                break;
            }
        }    
    } 
}