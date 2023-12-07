const MyJson = require('../json');

const Patient = require('../../../models/patient');
const MySession = require('../../../models/session');
const Test24_GDS = require('../../../models/test_gds');

const MyRooms = require('../../common/roommanagement');
const sock = require('./senddata');

let test24_vars = {};

exports.test24_gds_socket = function(socket, data) {
    switch (data['type']) {
        case "old-status-of-page":
            test24_oldStatusOfPage(socket, data['page'], data['sender']);
            break;

        case "select-word": 
            test24_selectWord(socket, data['page'], data['word'], data['sender']);
            break;

        case "show-page":  
            let page = data['page'];

            if (page != 17) {                 
                sock.sendData(socket, true, null, 'Test24', { 'type' : data['type'], 'page' : page });

                if (data['sender'] == 'clinician') {
                    sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : data['type'], 'page' : page });
                } else if (data['sender'] == 'patient') {
                    sock.sendData(socket, false, test24_vars[socket.id], 'Test24', { 'type' : data['type'], 'page' : page });
                }
            } else {
                let score = test24_getScore(socket, data['sender']);

                sock.sendData(socket, true, null, 'Test24', { 'type' : data['type'], 'page' : page, 'score' : score });

                if (data['sender'] == 'clinician') {
                    sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : data['type'], 'page' : page, 'score' : score });
                } else if (data['sender'] == 'patient') {
                    sock.sendData(socket, false, test24_vars[socket.id], 'Test24', { 'type' : data['type'], 'page' : page, 'score' : score });
                }
            }

            break;

        case "show-page-and-store":
            test24_vars[socket.id]['page17_commentaires'] = data['commentaires'];                        
            sock.sendData(socket, true, null, 'Test24', { 'type' : 'show-page', 'page' : data['page'] });
            sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : 'show-page', 'page' : data['page'] });
            break;

        case "start":
            let IDSocket_Patient = MyRooms.getIDPatientByIDClinician(socket.id);

            test24_vars[IDSocket_Patient] = socket.id;
            test24_vars[socket.id] = {
                'IDSocket_Clinician' : socket.id,
                'IDSocket_Patient' : IDSocket_Patient,
                'idSelectedSession' : data['idselectedsession'],                
                'pathSession' : null,
                'idPathFolder' : null,
                'page2_selected_words' : [0, 0],  // Location 0: OUI, Location 1: NON
                'page3_selected_words' : [0, 0],
                'page4_selected_words' : [0, 0],
                'page5_selected_words' : [0, 0],
                'page6_selected_words' : [0, 0],
                'page7_selected_words' : [0, 0],
                'page8_selected_words' : [0, 0],
                'page9_selected_words' : [0, 0],
                'page10_selected_words' : [0, 0],
                'page11_selected_words' : [0, 0],
                'page12_selected_words' : [0, 0],
                'page13_selected_words' : [0, 0],
                'page14_selected_words' : [0, 0],
                'page15_selected_words' : [0, 0],
                'page16_selected_words' : [0, 0],
                'page17_commentaires' : ""
            }

            MySession.select_by_id(test24_vars[socket.id]['idSelectedSession'])
            .then(([mysession]) => {
                if (mysession.length == 1) {
                    test24_vars[socket.id]['pathSession'] = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                    Patient.select_by_idUser(mysession[0].id_patient)
                    .then(([patient]) => {
                        if (patient.length == 1) {                                        
                            test24_vars[socket.id]['idPathFolder'] = patient[0].id_path_folder;

                            sock.sendData(socket, true, null, 'Test24', { 'type' : 'start', 'language' : data['language'], 'shortcut' : data['shortcut'] });
                            sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : 'start', 'language' : data['language'] });
                        }
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            break;

        case "stop":
            sock.sendData(socket, true, null, 'Test24', { 'type' : data['type'] });
            sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : data['type'] });

            delete test24_vars[test24_vars[socket.id]['IDSocket_Patient']];
            delete test24_vars[socket.id];
            break; 

        case "store-values": {
            test24_vars[socket.id]['page17_commentaires'] = data['commentaires'];
            let score = test24_getScore(socket, 'clinician');            

            Test24_GDS.select_by_idSession(test24_vars[socket.id]['idSelectedSession'])
            .then(([test24_gds]) => {
                if (test24_gds.length == 1) {
                    Test24_GDS.update_by_idSession(test24_vars[socket.id]['idSelectedSession'], score, test24_vars[socket.id]['page17_commentaires'])
                    .then(() => {
                        MyJson.updateData(test24_vars[socket.id]['idPathFolder'], test24_vars[socket.id]['pathSession'], "GDS", { 
                            "Score" : score,
                            "Commentaires" : test24_vars[socket.id]['page17_commentaires']
                        });

                        sock.sendData(socket, true, null, 'Test24', { 'type' : 'finish' });

                        delete test24_vars[test24_vars[socket.id]['IDSocket_Patient']];
                        delete test24_vars[socket.id];
                    })
                    .catch(err => console.log(err));                                
                } else {
                    const test24_GDS = new Test24_GDS(null, test24_vars[socket.id]['idSelectedSession'], score, test24_vars[socket.id]['page17_commentaires']);
                    test24_GDS
                    .insert()
                    .then((results) => {
                        MyJson.updateData(test24_vars[socket.id]['idPathFolder'], test24_vars[socket.id]['pathSession'], "GDS", { 
                            "Score" : score,
                            "Commentaires" : test24_vars[socket.id]['page17_commentaires']
                        });

                        sock.sendData(socket, true, null, 'Test24', { 'type' : 'finish' });

                        delete test24_vars[test24_vars[socket.id]['IDSocket_Patient']];
                        delete test24_vars[socket.id];
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));                            
            break;
        }
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test24_getScore(socket, sender) {
    let score = 0;

    for(let i = 2; i <= 16; i++) {
        let page_selected_words;

        if (sender === 'clinician') {
            page_selected_words = test24_selectSelectedWords(socket.id, i);
        } else if (sender === 'patient') {
            page_selected_words = test24_selectSelectedWords(test24_vars[socket.id], i);            
        }

        if ((i == 3) || (i == 4) || (i == 5) || (i == 7) || (i == 9) || (i == 10) || (i == 11) || (i == 13) || (i == 15) || (i == 16)) {
            if (page_selected_words[0] == 1) {
                score++;
            }
        } else if ((i == 2) || (i == 6) || (i == 8) || (i == 12) || (i == 14)) {
            if (page_selected_words[1] == 1) {
                score++;
            }
        }
    }

    return score;
}

function test24_oldStatusOfPage(socket, page, sender) {
    let page_selected_words;

    if (sender === 'clinician') {
        page_selected_words = test24_selectSelectedWords(socket.id, page);
    } else if (sender === 'patient') {
        page_selected_words = test24_selectSelectedWords(test24_vars[socket.id], page);
    }

    switch (page) {
        case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: {
            if (page_selected_words[0] == 1) {
                sock.sendData(socket, true, null, 'Test24', { 'type' : 'select-word', 'page' : page, 'word' : 'oui' });
                sock.sendData(socket, true, null, 'Test24', { 'type' : 'show-continuer', 'page' : page });
            } else if (page_selected_words[1] == 1) {
                sock.sendData(socket, true, null, 'Test24', { 'type' : 'select-word', 'page' : page, 'word' : 'non' });
                sock.sendData(socket, true, null, 'Test24', { 'type' : 'show-continuer', 'page' : page });
            }

            break;
        }

        case 17:         
            sock.sendData(socket, true, null, 'Test24', { 'type' : 'set-text', 'page' : page, 
                                                          'text' : test24_vars[socket.id]['page17_commentaires'] });
            break;
    }
}

function test24_selectSelectedWords(IDSocket_Clinician, page) {
    return test24_vars[IDSocket_Clinician]['page' + page + '_selected_words'];
}

function test24_selectWord(socket, page, word, sender) {
    let page_selected_words;

    if (sender === 'clinician') {
        page_selected_words = test24_selectSelectedWords(socket.id, page);
    } else if (sender === 'patient') {
        page_selected_words = test24_selectSelectedWords(test24_vars[socket.id], page);
    }

    if (word == 'oui') {
        if (page_selected_words[0] == 0) {    
            page_selected_words[0] = 1;   
            
            sock.sendData(socket, true, null, 'Test24', { 'type' : 'select-word', 'page' : page, 'word' : 'oui' });

            if (sender == "clinician") {
                sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : 'select-word', 'page' : page, 'word' : 'oui' });
            } else if (sender == "patient") {
                sock.sendData(socket, false, test24_vars[socket.id], 'Test24', { 'type' : 'select-word', 'page' : page, 'word' : 'oui' });
            }

            if (page_selected_words[1] == 1) {
                page_selected_words[1] = 0;

                sock.sendData(socket, true, null, 'Test24', { 'type' : 'unselect-word', 'page' : page, 'word' : 'non' });
                if (sender == "clinician") {
                    sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : 'unselect-word', 'page' : page, 'word' : 'non' });
                } else if (sender == "patient") {
                    sock.sendData(socket, false, test24_vars[socket.id], 'Test24', { 'type' : 'unselect-word', 'page' : page, 'word' : 'non' });
                }
            }

            if (page_selected_words[1] == 0) {
                sock.sendData(socket, true, null, 'Test24', { 'type' : 'show-continuer', 'page' : page });

                if (sender == "clinician") {
                    sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : 'show-continuer', 'page' : page });
                } else if (sender == "patient") {
                    sock.sendData(socket, false, test24_vars[socket.id], 'Test24', { 'type' : 'show-continuer', 'page' : page });
                }
            }
        } else if (page_selected_words[0] == 1) {
            page_selected_words[0] = 0;  
            sock.sendData(socket, true, null, 'Test24', { 'type' : 'unselect-word', 'page' : page, 'word' : 'oui' });

            if (sender == "clinician") {
                sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : 'unselect-word', 'page' : page, 'word' : 'oui' });
            } else if (sender == "patient") {
                sock.sendData(socket, false, test24_vars[socket.id], 'Test24', { 'type' : 'unselect-word', 'page' : page, 'word' : 'oui' });
            }
            
            sock.sendData(socket, true, null, 'Test24', { 'type' : 'hide-continuer', 'page' : page });

            if (sender == "clinician") {
                sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : 'hide-continuer', 'page' : page });
            } else if (sender == "patient") {
                sock.sendData(socket, false, test24_vars[socket.id], 'Test24', { 'type' : 'hide-continuer', 'page' : page });
            }                    
        }    
    } else if (word == 'non') {
        if (page_selected_words[1] == 0) {    
            page_selected_words[1] = 1;    
            sock.sendData(socket, true, null, 'Test24', { 'type' : 'select-word', 'page' : page, 'word' : 'non' });

            if (sender == "clinician") {
                sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : 'select-word', 'page' : page, 'word' : 'non' });
            } else if (sender == "patient") {
                sock.sendData(socket, false, test24_vars[socket.id], 'Test24', { 'type' : 'select-word', 'page' : page, 'word' : 'non' });
            }

            if (page_selected_words[0] == 1) {
                page_selected_words[0] = 0;

                sock.sendData(socket, true, null, 'Test24', { 'type' : 'unselect-word', 'page' : page, 'word' : 'oui' });
                if (sender == "clinician") {
                    sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : 'unselect-word', 'page' : page, 'word' : 'oui' });
                } else if (sender == "patient") {
                    sock.sendData(socket, false, test24_vars[socket.id], 'Test24', { 'type' : 'unselect-word', 'page' : page, 'word' : 'oui' });
                }
            }

            if (page_selected_words[0] == 0) {                    
                sock.sendData(socket, true, null, 'Test24', { 'type' : 'show-continuer', 'page' : page });

                if (sender == "clinician") {
                    sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : 'show-continuer', 'page' : page });
                } else if (sender == "patient") {
                    sock.sendData(socket, false, test24_vars[socket.id], 'Test24', { 'type' : 'show-continuer', 'page' : page });
                }
            }
        } else if (page_selected_words[1] == 1) {
            page_selected_words[1] = 0;    
            sock.sendData(socket, true, null, 'Test24', { 'type' : 'unselect-word', 'page' : page, 'word' : 'non' });

            if (sender == "clinician") {
                sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : 'unselect-word', 'page' : page, 'word' : 'non' });
            } else if (sender == "patient") {
                sock.sendData(socket, false, test24_vars[socket.id], 'Test24', { 'type' : 'unselect-word', 'page' : page, 'word' : 'non' });
            }
            
            sock.sendData(socket, true, null, 'Test24', { 'type' : 'hide-continuer', 'page' : page });

            if (sender == "clinician") {
                sock.sendData(socket, false, test24_vars[socket.id]['IDSocket_Patient'], 'Test24', { 'type' : 'hide-continuer', 'page' : page });
            } else if (sender == "patient") {
                sock.sendData(socket, false, test24_vars[socket.id], 'Test24', { 'type' : 'hide-continuer', 'page' : page });
            }
        }
    }
}