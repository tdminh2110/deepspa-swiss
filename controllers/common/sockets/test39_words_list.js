const FileSystem = require('../filesystem');
const MyGlobals = require('../globals');
const MyUploadFiles = require('../uploadfiles');
const MyJson = require('../json');

const Patient = require('../../../models/patient');
const MySession = require('../../../models/session');
const Test39_Words_List = require('../../../models/test_words_list');
const test39_lists = require('../../../models/data/test39_words_list');

const MyRooms = require('../../common/roommanagement');
const sock = require('./senddata');

let test39_vars = {};

exports.test39_words_list_socket = function(socket, data) {
    switch (data['type']) {
        case 'minus-number': {
            let page = data['page'];
            
            if (page == 46) {            
                let word_index = data['word'];

                if (test39_vars[socket.id]['test39_page' + page + '_selected_scores'][word_index + 9] > 0) {
                    test39_vars[socket.id]['test39_page' + page + '_selected_scores'][word_index + 9]--;
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-number', 'page' : page, 'word' : word_index, 'value' : test39_vars[socket.id]['test39_page' + page + '_selected_scores'][word_index + 9] });
                }
            } else {
                if (test39_vars[socket.id]['test39_page' + page + '_selected_scores'][10] > 0) {
                    test39_vars[socket.id]['test39_page' + page + '_selected_scores'][10]--;
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-value', 'page' : page, 'value' : test39_vars[socket.id]['test39_page' + page + '_selected_scores'][10] });
                }
            }

            break;
        }

        case 'old-status-of-page': {
            let page = data['page'];

            if ((page == 16) || (page == 29) || (page == 42)) {
                for(let number_word = 1; number_word <= 10; number_word++) 
                    if (test39_vars[socket.id]['test39_page' + page + '_selected_scores'][number_word - 1] == 1)
                        sock.sendData(socket, true, null, 'Test39', { 'type' : 'select-word', 'page' : page, 'word' : number_word });
                
                sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-value', 'page' : page, 'value' : test39_vars[socket.id]['test39_page' + page + '_selected_scores'][10] });
                sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-text', 'page' : page, 'text' : test39_vars[socket.id]['test39_page' + page + '_selected_scores'][11] });
            } if (page == 46) {
                for(let number_word = 1; number_word <= 10; number_word++) 
                    if (test39_vars[socket.id]['test39_page' + page + '_selected_scores'][number_word - 1] == 1)
                        sock.sendData(socket, true, null, 'Test39', { 'type' : 'select-word', 'page' : page, 'word' : number_word });
                
                for(let word_index = 1; word_index <= 11; word_index++) 
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-number', 'page' : page, 'word' : word_index, 'value' : test39_vars[socket.id]['test39_page' + page + '_selected_scores'][word_index + 9] });

                sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-text', 'page' : page, 'text' : test39_vars[socket.id]['test39_page' + page + '_selected_scores'][21] });
            } else if ((page >= 49) && (page <= 68)) {
                if (test39_vars[socket.id]['test39_page' + page + '_selected_scores'][0] == 1) 
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'select-word', 'page' : page, 'word' : 1 });

                if (test39_vars[socket.id]['test39_page' + page + '_selected_scores'][1] == 1) 
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'select-word', 'page' : page, 'word' : 2 });

                if ((test39_vars[socket.id]['test39_page' + page + '_selected_scores'][0] == 1) ||
                    (test39_vars[socket.id]['test39_page' + page + '_selected_scores'][1] == 1))
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-continuer', 'page' : page });
            } else {            
                if (test39_vars[socket.id]['test39_page' + page + '_selected_scores'] == 1) 
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'select-word', 'page' : page });
                else 
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'unselect-word', 'page' : page });
            }

            break;
        }

        case 'plus-number': {
            let page = data['page'];

            if (page == 46) {
                let word_index = data['word'];
                test39_vars[socket.id]['test39_page' + page + '_selected_scores'][word_index + 9]++;
                sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-number', 'page' : page, 'word' : word_index, 'value' : test39_vars[socket.id]['test39_page' + page + '_selected_scores'][word_index + 9] });
            } else {
                test39_vars[socket.id]['test39_page' + page + '_selected_scores'][10]++;
                sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-value', 'page' : page, 'value' : test39_vars[socket.id]['test39_page' + page + '_selected_scores'][10] });            
            }
          
            break;
        }

        case 'select-subtest': {
            let value = data['value'];
            let page = data['page'];

            if (test39_vars[socket.id]['test39_page1_selected_words_list'] == value) {
                test39_vars[socket.id]['test39_page1_selected_words_list'] = 0;
                sock.sendData(socket, true, null, 'Test39', { 'type' : 'unselect-subtest', 'value' : value });                
                sock.sendData(socket, true, null, 'Test39', { 'type' : 'hide-continuer', 'page' : page });
            } else {
                test39_vars[socket.id]['test39_page1_selected_words_list'] = value;

                if (value == 1) {
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'select-subtest', 'value' : value });
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'unselect-subtest', 'value' : 2 });
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'unselect-subtest', 'value' : 3 });
                } else if (value == 2) {
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'select-subtest', 'value' : value });
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'unselect-subtest', 'value' : 1 });
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'unselect-subtest', 'value' : 3 });
                } else if (value == 3) {
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'select-subtest', 'value' : value });
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'unselect-subtest', 'value' : 1 });
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'unselect-subtest', 'value' : 2 });
                }
                sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-continuer', 'page' : page });    
            }

            break;
        }
        
        case "select-word": {
            let page = data['page'];

            if ((page == 16) || (page == 29) || (page == 42) || (page == 46)) {
                let number_word = data['word'];

                if (test39_vars[socket.id]['test39_page' + page + '_selected_scores'][number_word - 1] == 0) {
                    test39_vars[socket.id]['test39_page' + page + '_selected_scores'][number_word - 1] = 1;
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'select-word', 'page' : page, 'word' : number_word });
                } else {
                    test39_vars[socket.id]['test39_page' + page + '_selected_scores'][number_word - 1] = 0;
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'unselect-word', 'page' : page, 'word' : number_word });
                }
            } else if ((page >= 49) && (page <= 68)) {
                let number_word = data['word'];

                if (number_word == 1) {
                    if (test39_vars[socket.id]['test39_page' + page + '_selected_scores'][0] == 0) {
                        test39_vars[socket.id]['test39_page' + page + '_selected_scores'][0] = 1;
                        test39_vars[socket.id]['test39_page' + page + '_selected_scores'][1] = 0;
                        sock.sendData(socket, true, null, 'Test39', { 'type' : 'select-word', 'page' : page, 'word' : 1 });
                        sock.sendData(socket, true, null, 'Test39', { 'type' : 'unselect-word', 'page' : page, 'word' : 2 });
                        sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-continuer', 'page' : page });
                    } else {
                        test39_vars[socket.id]['test39_page' + page + '_selected_scores'][0] = 0;
                        sock.sendData(socket, true, null, 'Test39', { 'type' : 'unselect-word', 'page' : page, 'word' : 1 });
                        sock.sendData(socket, true, null, 'Test39', { 'type' : 'hide-continuer', 'page' : page });
                    }
                } else if (number_word == 2) {
                    if (test39_vars[socket.id]['test39_page' + page + '_selected_scores'][1] == 0) {
                        test39_vars[socket.id]['test39_page' + page + '_selected_scores'][1] = 1;
                        test39_vars[socket.id]['test39_page' + page + '_selected_scores'][0] = 0;
                        sock.sendData(socket, true, null, 'Test39', { 'type' : 'select-word', 'page' : page, 'word' : 2 });
                        sock.sendData(socket, true, null, 'Test39', { 'type' : 'unselect-word', 'page' : page, 'word' : 1 });
                        sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-continuer', 'page' : page });
                    } else {
                        test39_vars[socket.id]['test39_page' + page + '_selected_scores'][1] = 0;
                        sock.sendData(socket, true, null, 'Test39', { 'type' : 'unselect-word', 'page' : page, 'word' : 2 });
                        sock.sendData(socket, true, null, 'Test39', { 'type' : 'hide-continuer', 'page' : page });
                    }
                }
            } else {
                let page_selected_scores = test39_vars[socket.id]['test39_page' + page + '_selected_scores'];

                if (page_selected_scores == 0) {
                    test39_vars[socket.id]['test39_page' + page + '_selected_scores'] = 1;
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'select-word', 'page' : page });
                } else {
                    test39_vars[socket.id]['test39_page' + page + '_selected_scores'] = 0;
                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'unselect-word', 'page' : page });
                }
            }

            break;
        }
            
        case 'show-page': {
            let page = data['page'];

            switch (page) {
                case 2: 
                    let test_done = 0;

                    Test39_Words_List.select_testDone_by_idSession(test39_vars[socket.id]['idSelectedSession'])
                    .then(([test39_words_list]) => {
                        if (test39_words_list.length == 1) 
                            test_done = test39_words_list[0].test_done;

                        if (test39_vars[socket.id]['test39_page1_selected_words_list'] == 1) {
                            sock.sendData(socket, true, null, 'Test39', { 'type' : data['type'], 'page' : page });
                        } else if (test39_vars[socket.id]['test39_page1_selected_words_list'] == 2) {
                            if ((test_done != 4) && (test_done != 6) && (test_done != 7)) {
                                sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-error', 'error' : 'Das Lernen wurde noch nicht durchgeführt !' });
                            } else {
                                sock.sendData(socket, true, null, 'Test39', { 'type' : data['type'], 'page' : 44 });
                            }
                        } else if (test39_vars[socket.id]['test39_page1_selected_words_list'] == 3) {
                            if ((test_done != 6) && (test_done != 7)) {
                                sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-error', 'error' : 'Das Lernen oder Wiedererkennen ist noch nicht erfolgt !' });
                            } else {
                                sock.sendData(socket, true, null, 'Test39', { 'type' : data['type'], 'page' : 48 });
                            }
                        }
                            
                    })
                    .catch(err => console.log(err));

                    break;
                
                case 3: case 4:  
                case 44: case 45: case 46: case 48:  
                    sock.sendData(socket, true, null, 'Test39', { 'type' : data['type'], 'page' : page });
                    break;

                case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: 
                case 13: case 14: case 15: case 16: case 18: case 19: case 20: case 21: 
                case 22: case 23: case 24: case 25: case 26: case 27: case 28: case 29:
                case 31: case 32: case 33: case 34: case 35: case 36: case 37: case 38: 
                case 39: case 40: case 41: case 42: case 49: case 50: case 51: case 52:
                case 53: case 54: case 55: case 56: case 57: case 58: case 59: case 60:
                case 61: case 62: case 63: case 64: case 65: case 66: case 67: case 68:
                    sock.sendData(socket, true, null, 'Test39', { 'type' : data['type'], 'page' : page });
                    sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : data['type'], 'page' : page });
                    break;

                case 17: {
                    let knl = 0;
                    let lernen = 0;

                    for(let page = 6; page <= 15; page++)
                        knl += test39_vars[socket.id]['test39_page' + page + '_selected_scores'];

                    for(let i = 0; i <= 9; i++)
                        lernen += test39_vars[socket.id]['test39_page16_selected_scores'][i];

                    let lernen_int = test39_vars[socket.id]['test39_page16_selected_scores'][10];

                    sock.sendData(socket, true, null, 'Test39', { 'type' : data['type'], 'page' : page,
                                'knl' : knl, 'lernen' : lernen, 'lernen_int' : lernen_int });

                    break;
                }

                case 30: {
                    let knl = 0;
                    let lernen = 0;

                    for(let page = 19; page <= 28; page++)
                        knl += test39_vars[socket.id]['test39_page' + page + '_selected_scores'];

                    for(let i = 0; i <= 9; i++)
                        lernen += test39_vars[socket.id]['test39_page29_selected_scores'][i];

                    let lernen_int = test39_vars[socket.id]['test39_page29_selected_scores'][10];

                    sock.sendData(socket, true, null, 'Test39', { 'type' : data['type'], 'page' : page,
                                'knl' : knl, 'lernen' : lernen, 'lernen_int' : lernen_int });

                    break;
                }

                case 43: {
                    let knl = 0;
                    let lernen = 0;

                    for(let page = 32; page <= 41; page++)
                        knl += test39_vars[socket.id]['test39_page' + page + '_selected_scores'];

                    for(let i = 0; i <= 9; i++)
                        lernen += test39_vars[socket.id]['test39_page42_selected_scores'][i];

                    let lernen_int = test39_vars[socket.id]['test39_page42_selected_scores'][10];

                    sock.sendData(socket, true, null, 'Test39', { 'type' : data['type'], 'page' : page,
                                'knl' : knl, 'lernen' : lernen, 'lernen_int' : lernen_int });

                    break;
                }

                case 47: {
                    let abrufen = 0;

                    for(let i = 0; i <= 9; i++)
                        abrufen += test39_vars[socket.id]['test39_page46_selected_scores'][i];

                    let abrufen_int = test39_vars[socket.id]['test39_page46_selected_scores'][20];

                    sock.sendData(socket, true, null, 'Test39', { 'type' : data['type'], 'page' : page,
                                                    'abrufen' : abrufen, 'abrufen_int' : abrufen_int,
                                                    'value_word1' : test39_vars[socket.id]['test39_page46_selected_scores'][10],
                                                    'value_word2' : test39_vars[socket.id]['test39_page46_selected_scores'][11],
                                                    'value_word3' : test39_vars[socket.id]['test39_page46_selected_scores'][12],
                                                    'value_word4' : test39_vars[socket.id]['test39_page46_selected_scores'][13],
                                                    'value_word5' : test39_vars[socket.id]['test39_page46_selected_scores'][14],
                                                    'value_word6' : test39_vars[socket.id]['test39_page46_selected_scores'][15],
                                                    'value_word7' : test39_vars[socket.id]['test39_page46_selected_scores'][16],
                                                    'value_word8' : test39_vars[socket.id]['test39_page46_selected_scores'][17],
                                                    'value_word9' : test39_vars[socket.id]['test39_page46_selected_scores'][18],
                                                    'value_word10' : test39_vars[socket.id]['test39_page46_selected_scores'][19]
                                                });

                    break;
                }

                case 69: {
                    let r_ja = 0, r_nein = 0, f_ja = 0, f_nein = 0;

                    for(let i = 49; i <= 68; i++) {
                        if ((i == 49) || (i == 50) || (i == 52) || (i == 55) || (i == 57) || 
                            (i == 58) || (i == 61) || (i == 63) || (i == 64) || (i == 66)) {
                            f_ja += test39_vars[socket.id]['test39_page' + i + '_selected_scores'][0];
                            r_nein += test39_vars[socket.id]['test39_page' + i + '_selected_scores'][1];
                        } else if ((i == 51) || (i == 53) || (i == 54) || (i == 56) || (i == 59) || 
                                   (i == 60) || (i == 62) || (i == 65) || (i == 67) || (i == 68)) {
                            r_ja += test39_vars[socket.id]['test39_page' + i + '_selected_scores'][0];
                            f_nein += test39_vars[socket.id]['test39_page' + i + '_selected_scores'][1];
                        }
                    }

                    sock.sendData(socket, true, null, 'Test39', { 'type' : data['type'], 'page' : page,
                            'r_ja' : r_ja, 'r_nein' : r_nein, 'f_ja' : f_ja, 'f_nein' : f_nein });
                    sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : data['type'], 'page' : page });                  
                }
                
            }
            break;
        }

        case "show-page-and-store": {
            let page_show = data['page-show'];

            test39_vars[socket.id]['test39_page' + data['page-store'] + '_selected_scores'][21] = data['text'];

            if (page_show == 17) {
                let knl = 0;
                let lernen = 0;

                for(let page = 6; page <= 15; page++)
                    knl += test39_vars[socket.id]['test39_page' + page + '_selected_scores'];

                for(let i = 0; i <= 9; i++)
                    lernen += test39_vars[socket.id]['test39_page16_selected_scores'][i];

                let lernen_int = test39_vars[socket.id]['test39_page16_selected_scores'][10];

                sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-page', 'page' : page_show,
                            'knl' : knl, 'lernen' : lernen, 'lernen_int' : lernen_int });
            } else if (page_show == 30) {
                let knl = 0;
                let lernen = 0;

                for(let page = 19; page <= 28; page++)
                    knl += test39_vars[socket.id]['test39_page' + page + '_selected_scores'];

                for(let i = 0; i <= 9; i++)
                    lernen += test39_vars[socket.id]['test39_page29_selected_scores'][i];

                let lernen_int = test39_vars[socket.id]['test39_page29_selected_scores'][10];

                sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-page', 'page' : page_show,
                            'knl' : knl, 'lernen' : lernen, 'lernen_int' : lernen_int });
            } else if (page_show == 43) {
                let knl = 0;
                let lernen = 0;

                for(let page = 32; page <= 41; page++)
                    knl += test39_vars[socket.id]['test39_page' + page + '_selected_scores'];

                for(let i = 0; i <= 9; i++)
                    lernen += test39_vars[socket.id]['test39_page42_selected_scores'][i];

                let lernen_int = test39_vars[socket.id]['test39_page42_selected_scores'][10];

                sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-page', 'page' : page_show,
                            'knl' : knl, 'lernen' : lernen, 'lernen_int' : lernen_int });
            } else if (page_show == 47) {
                let abrufen = 0;

                for(let i = 0; i <= 9; i++)
                    abrufen += test39_vars[socket.id]['test39_page46_selected_scores'][i];

                let abrufen_int = test39_vars[socket.id]['test39_page46_selected_scores'][20];

                sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-page', 'page' : page_show,
                                                'abrufen' : abrufen, 'abrufen_int' : abrufen_int,
                                                'value_word1' : test39_vars[socket.id]['test39_page46_selected_scores'][10],
                                                'value_word2' : test39_vars[socket.id]['test39_page46_selected_scores'][11],
                                                'value_word3' : test39_vars[socket.id]['test39_page46_selected_scores'][12],
                                                'value_word4' : test39_vars[socket.id]['test39_page46_selected_scores'][13],
                                                'value_word5' : test39_vars[socket.id]['test39_page46_selected_scores'][14],
                                                'value_word6' : test39_vars[socket.id]['test39_page46_selected_scores'][15],
                                                'value_word7' : test39_vars[socket.id]['test39_page46_selected_scores'][16],
                                                'value_word8' : test39_vars[socket.id]['test39_page46_selected_scores'][17],
                                                'value_word9' : test39_vars[socket.id]['test39_page46_selected_scores'][18],
                                                'value_word10' : test39_vars[socket.id]['test39_page46_selected_scores'][19]
                                            });
            } else {  
                sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-page', 'page' : page_show });

                if ((page_show == 15) || (page_show == 28) || (page_show == 41))
                    sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : 'show-page', 'page' : page_show });
            }
            
            break;
        }

        case 'show-word': {
            let page = data['page'];
            let text = data['text'];

            if (text == "Wort anzeigen ['Kirche']") {
                sock.sendData(socket, true, null, 'Test39', { 'type' : 'show-word', 'page' : page });
                sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : 'show-word', 'page' : page });
            } else {
                sock.sendData(socket, true, null, 'Test39', { 'type' : 'hide-word', 'page' : page });
                sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : 'hide-word', 'page' : page });
            }
            break;
        }

        case 'start':
            let IDSocket_Patient = MyRooms.getIDPatientByIDClinician(socket.id);

            test39_vars[IDSocket_Patient] = socket.id;
            test39_vars[socket.id] = {
                'IDSocket_Clinician' : socket.id,
                'IDSocket_Patient' : IDSocket_Patient,
                'idSelectedSession' : data['idselectedsession'],                
                'pathSession' : null,
                'idPathFolder' : null,
                'idSelectedPatient' : null, 
                'test39_folderNameStoreVideoAudio' : null,
                'test39_upload_store_media' : null,
                'test39_record_video' : null,
                'test39_page6_selected_scores' : 0,
                'test39_page7_selected_scores' : 0,
                'test39_page8_selected_scores' : 0,
                'test39_page9_selected_scores' : 0,
                'test39_page10_selected_scores' : 0,
                'test39_page11_selected_scores' : 0,
                'test39_page12_selected_scores' : 0,
                'test39_page13_selected_scores' : 0,
                'test39_page14_selected_scores' : 0,
                'test39_page15_selected_scores' : 0,
                'test39_page16_selected_scores' : [0, 0, 0, 0, 0, 
                                                   0, 0, 0, 0, 0,
                                                   0, ""],
                'test39_page19_selected_scores' : 0,
                'test39_page20_selected_scores' : 0,
                'test39_page21_selected_scores' : 0,
                'test39_page22_selected_scores' : 0,
                'test39_page23_selected_scores' : 0,
                'test39_page24_selected_scores' : 0,
                'test39_page25_selected_scores' : 0,
                'test39_page26_selected_scores' : 0,
                'test39_page27_selected_scores' : 0,
                'test39_page28_selected_scores' : 0,
                'test39_page29_selected_scores' : [0, 0, 0, 0, 0, 
                                                   0, 0, 0, 0, 0,
                                                   0, ""],
                'test39_page32_selected_scores' : 0,
                'test39_page33_selected_scores' : 0,
                'test39_page34_selected_scores' : 0,
                'test39_page35_selected_scores' : 0,
                'test39_page36_selected_scores' : 0,
                'test39_page37_selected_scores' : 0,
                'test39_page38_selected_scores' : 0,
                'test39_page39_selected_scores' : 0,
                'test39_page40_selected_scores' : 0,
                'test39_page41_selected_scores' : 0,
                'test39_page42_selected_scores' : [0, 0, 0, 0, 0, 
                                                   0, 0, 0, 0, 0,
                                                   0, ""],
                'test39_page46_selected_scores' : [0, 0, 0, 0, 0, 
                                                   0, 0, 0, 0, 0,
                                                   0, 0, 0, 0, 0, 
                                                   0, 0, 0, 0, 0,
                                                   0, ""],
                'test39_page49_selected_scores' : [0, 0],
                'test39_page50_selected_scores' : [0, 0],
                'test39_page51_selected_scores' : [0, 0],
                'test39_page52_selected_scores' : [0, 0],
                'test39_page53_selected_scores' : [0, 0],
                'test39_page54_selected_scores' : [0, 0],
                'test39_page55_selected_scores' : [0, 0],
                'test39_page56_selected_scores' : [0, 0],
                'test39_page57_selected_scores' : [0, 0],
                'test39_page58_selected_scores' : [0, 0],
                'test39_page59_selected_scores' : [0, 0],
                'test39_page60_selected_scores' : [0, 0],
                'test39_page61_selected_scores' : [0, 0],
                'test39_page62_selected_scores' : [0, 0],
                'test39_page63_selected_scores' : [0, 0],
                'test39_page64_selected_scores' : [0, 0],
                'test39_page65_selected_scores' : [0, 0],
                'test39_page66_selected_scores' : [0, 0],
                'test39_page67_selected_scores' : [0, 0],
                'test39_page68_selected_scores' : [0, 0]
            }

            MySession.select_by_id(test39_vars[socket.id]['idSelectedSession'])
            .then(([mysession]) => {
                if (mysession.length == 1) {
                    test39_vars[socket.id]['pathSession'] = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                    Patient.select_by_idUser(mysession[0].id_patient)
                    .then(([patient]) => {
                        if (patient.length == 1) {
                            test39_vars[socket.id]['idPathFolder'] = patient[0].id_path_folder;
                            test39_vars[socket.id]['test39_record_video'] = data['record_video'];
                            test39_vars[socket.id]['idSelectedPatient'] = mysession[0].id_patient;                                        
                            test39_vars[socket.id]['test39_folderNameStoreVideoAudio'] = FileSystem.FOLDER_UPLOAD + test39_vars[socket.id]['idPathFolder'] + "/" + test39_vars[socket.id]['pathSession'] + "/Words_List";
                            test39_vars[socket.id]['test39_upload_store_media'] = patient[0].upload_store_media;
                    
                            sock.sendData(socket, true, null, 'Test39', { 'type' : 'start', 
                                                                          'id_session' : test39_vars[socket.id]['idSelectedSession'],
                                                                          'record_video' : data['record_video'],
                                                                          'shortcut' : data['shortcut']
                                                                        });
                            sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : 'start', 'record_video' : data['record_video'] });
                        }
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            break;

        case "stop":                         
            sock.sendData(socket, true, null, 'Test39', { 'type' : data['type'] });
            sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : data['type'] });

            delete test39_vars[test39_vars[socket.id]['IDSocket_Patient']];
            delete test39_vars[socket.id];
            break;

        case "store-values": {
            let page = data['page'];

            if (page == 1) {
                let record_video = 0;
                let path_record_video = "";

                if (test39_vars[socket.id]['test39_record_video'] == true) {
                    record_video = 1;
                    path_record_video = test39_vars[socket.id]['test39_folderNameStoreVideoAudio'] + "/" + "video.webm";
                }

                Test39_Words_List.select_testDone_by_idSession(test39_vars[socket.id]['idSelectedSession'])
                .then(([test39_words_list]) => {
                    if (test39_words_list.length == 1) {
                        Test39_Words_List.update_record_video_by_idSession(
                            test39_vars[socket.id]['idSelectedSession'], record_video)
                        .then(() => {
                            MyJson.updateData(test39_vars[socket.id]['idPathFolder'], 
                                              test39_vars[socket.id]['pathSession'], "Words_List", {
                                "Video" : path_record_video
                            });

                            if (test39_vars[socket.id]['test39_record_video'] == true) {
                                if (test39_vars[socket.id]['test39_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test39_vars[socket.id]['IDSocket_Patient'], socket.id, "Words_List");
                                    FileSystem.createFolder(test39_vars[socket.id]['test39_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test39_vars[socket.id]['idSelectedPatient'], "Words_List", 
                                                                        test39_vars[socket.id]['test39_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : 'upload-files' });
                                } else if (test39_vars[socket.id]['test39_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'store-files'});
                                    sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : 'store-files', 
                                                                                    'id_path_folder' : test39_vars[socket.id]['idPathFolder'], 
                                                                                    'path_session' : test39_vars[socket.id]['pathSession'] });
                                } else if (test39_vars[socket.id]['test39_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test39_vars[socket.id]['IDSocket_Patient'], socket.id, "Words_List");
                                    FileSystem.createFolder(test39_vars[socket.id]['test39_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test39_vars[socket.id]['idSelectedPatient'], "Words_List", 
                                                                                test39_vars[socket.id]['test39_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : 'upload-store-files', 
                                                                                    'id_path_folder' : test39_vars[socket.id]['idPathFolder'], 
                                                                                    'path_session' : test39_vars[socket.id]['pathSession'] });
                                } else if (test39_vars[socket.id]['test39_upload_store_media'] == 3) {
                                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'store-files-in-clinician',
                                                                                    'id_path_folder' : test39_vars[socket.id]['idPathFolder'], 
                                                                                    'path_session' : test39_vars[socket.id]['pathSession'] });
                                    sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : 'store-files-in-clinician' });
                                }
                            } else {
                                sock.sendData(socket, true, null, 'Test39', { 'type' : 'finish' });
                            }
    
                            delete test39_vars[test39_vars[socket.id]['IDSocket_Patient']];
                            delete test39_vars[socket.id];
                        })
                        .catch(err => console.log(err));
                    } else {
                        const test39_Words_List = new Test39_Words_List(null, 
                                test39_vars[socket.id]['idSelectedSession'], 0, record_video,  
                                0, '', 0, '', 0, '',
                                0, '', 0, '', 0, '',
                                0, '', 0, '', 0, '',
                                0, '', 0, '', 
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                                0, '', 0, '', 0, '', 0, '')
                        test39_Words_List
                        .insert()
                        .then((results) => {
                            MyJson.updateData(test39_vars[socket.id]['idPathFolder'], 
                                              test39_vars[socket.id]['pathSession'], "Words_List", {
                                "Video" : path_record_video
                            });

                            if (test39_vars[socket.id]['test39_record_video'] == true) {
                                if (test39_vars[socket.id]['test39_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test39_vars[socket.id]['IDSocket_Patient'], socket.id, "Words_List");
                                    FileSystem.createFolder(test39_vars[socket.id]['test39_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test39_vars[socket.id]['idSelectedPatient'], "Words_List", 
                                                                        test39_vars[socket.id]['test39_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : 'upload-files' });
                                } else if (test39_vars[socket.id]['test39_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'store-files'});
                                    sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : 'store-files', 
                                                                                    'id_path_folder' : test39_vars[socket.id]['idPathFolder'], 
                                                                                    'path_session' : test39_vars[socket.id]['pathSession'] });
                                } else if (test39_vars[socket.id]['test39_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test39_vars[socket.id]['IDSocket_Patient'], socket.id, "Words_List");
                                    FileSystem.createFolder(test39_vars[socket.id]['test39_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test39_vars[socket.id]['idSelectedPatient'], "Words_List", 
                                                                                test39_vars[socket.id]['test39_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : 'upload-store-files', 
                                                                                    'id_path_folder' : test39_vars[socket.id]['idPathFolder'], 
                                                                                    'path_session' : test39_vars[socket.id]['pathSession'] });
                                } else if (test39_vars[socket.id]['test39_upload_store_media'] == 3) {
                                    sock.sendData(socket, true, null, 'Test39', { 'type' : 'store-files-in-clinician',
                                                                                    'id_path_folder' : test39_vars[socket.id]['idPathFolder'], 
                                                                                    'path_session' : test39_vars[socket.id]['pathSession'] });
                                    sock.sendData(socket, false, test39_vars[socket.id]['IDSocket_Patient'], 'Test39', { 'type' : 'store-files-in-clinician' });
                                }
                            } else {
                                sock.sendData(socket, true, null, 'Test39', { 'type' : 'finish' });
                            }
    
                            delete test39_vars[test39_vars[socket.id]['IDSocket_Patient']];
                            delete test39_vars[socket.id];
                        })
                        .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));
            } else if (page == 43) {
                let knl_1 = 0, knl_2 = 0, knl_3 = 0;
                let lernen_1 = 0, lernen_2 = 0, lernen_3 = 0;
                let wortliste_knl_1 = "", wortliste_knl_2 = "", wortliste_knl_3 = "";
                let rew_list_1 = "", rew_list_2 = "", rew_list_3 = "";
                
                for(let page = 6; page <= 15; page++) {
                    if (test39_vars[socket.id]['test39_page' + page + '_selected_scores'] == 1) {
                        knl_1 += test39_vars[socket.id]['test39_page' + page + '_selected_scores'];
                        wortliste_knl_1 += wortliste_knl_1 == "" ? test39_getWordByPage(page) :
                                                                   ", " + test39_getWordByPage(page);
                    }
                }

                for(let i = 0; i <= 9; i++) {
                    if (test39_vars[socket.id]['test39_page16_selected_scores'][i] == 1) {                    
                        lernen_1 += test39_vars[socket.id]['test39_page16_selected_scores'][i];
                        rew_list_1 += rew_list_1 == "" ? test39_lists.wordsList01[i] :
                                                        ", " + test39_lists.wordsList01[i];
                    }
                }

                let lernen_1_int = test39_vars[socket.id]['test39_page16_selected_scores'][10];
                let lernen_1_int_text = test39_vars[socket.id]['test39_page16_selected_scores'][11];

                for(let page = 19; page <= 28; page++) {
                    if (test39_vars[socket.id]['test39_page' + page + '_selected_scores'] == 1) {
                        knl_2 += test39_vars[socket.id]['test39_page' + page + '_selected_scores'];
                        wortliste_knl_2 += wortliste_knl_2 == "" ? test39_getWordByPage(page) :
                                                                   ", " + test39_getWordByPage(page);
                    }
                }

                for(let i = 0; i <= 9; i++) {
                    if (test39_vars[socket.id]['test39_page29_selected_scores'][i] == 1) {                    
                        lernen_2 += test39_vars[socket.id]['test39_page29_selected_scores'][i];
                        rew_list_2 += rew_list_2 == "" ? test39_lists.wordsList01[i] :
                                                        ", " + test39_lists.wordsList01[i];
                    }
                }

                let lernen_2_int = test39_vars[socket.id]['test39_page29_selected_scores'][10];
                let lernen_2_int_text = test39_vars[socket.id]['test39_page29_selected_scores'][11];

                for(let page = 32; page <= 41; page++) {
                    if (test39_vars[socket.id]['test39_page' + page + '_selected_scores'] == 1) {
                        knl_3 += test39_vars[socket.id]['test39_page' + page + '_selected_scores'];
                        wortliste_knl_3 += wortliste_knl_3 == "" ? test39_getWordByPage(page) :
                                                                   ", " + test39_getWordByPage(page);
                    }
                }

                for(let i = 0; i <= 9; i++) {
                    if (test39_vars[socket.id]['test39_page42_selected_scores'][i] == 1) {                    
                        lernen_3 += test39_vars[socket.id]['test39_page42_selected_scores'][i];
                        rew_list_3 += rew_list_3 == "" ? test39_lists.wordsList01[i] :
                                                        ", " + test39_lists.wordsList01[i];
                    }
                }

                let lernen_3_int = test39_vars[socket.id]['test39_page42_selected_scores'][10];
                let lernen_3_int_text = test39_vars[socket.id]['test39_page42_selected_scores'][11];

                Test39_Words_List.select_testDone_by_idSession(test39_vars[socket.id]['idSelectedSession'])
                .then(([test39_words_list]) => {
                    if (test39_words_list.length == 1) {
                        let test_done = test39_words_list[0].test_done | 4;

                        Test39_Words_List.update_lernen_by_idSession(test39_vars[socket.id]['idSelectedSession'],
                            test_done, knl_1, wortliste_knl_1, lernen_1, rew_list_1, lernen_1_int, lernen_1_int_text,
                            knl_2, wortliste_knl_2, lernen_2, rew_list_2, lernen_2_int, lernen_2_int_text,
                            knl_3, wortliste_knl_3, lernen_3, rew_list_3, lernen_3_int, lernen_3_int_text)
                        .then(() => {
                            MyJson.updateData(test39_vars[socket.id]['idPathFolder'], 
                                              test39_vars[socket.id]['pathSession'], "Words_List", {
                                "KNL1" : knl_1,
                                "Wortliste_KNL_1" : wortliste_knl_1,
                                "LERNEN_1" : lernen_1,
                                "REW_List_1" : rew_list_1,
                                "LERNEN_1_INT" : lernen_1_int,
                                "LERNEN_1_INT_TEXT" : lernen_1_int_text,
                                "KNL2" : knl_2,
                                "Wortliste_KNL_2" : wortliste_knl_2,
                                "LERNEN_2" : lernen_2,
                                "REW_List_2" : rew_list_2,
                                "LERNEN_2_INT" : lernen_2_int,
                                "LERNEN_2_INT_TEXT" : lernen_2_int_text,
                                "KNL3" : knl_3,
                                "Wortliste_KNL_3" : wortliste_knl_3,
                                "LERNEN_3" : lernen_3,
                                "REW_List_3" : rew_list_3,
                                "LERNEN_3_INT" : lernen_3_int,
                                "LERNEN_3_INT_TEXT" : lernen_3_int_text
                            });

                            sock.sendData(socket, true, null, 'Test39', { 'type' : 'finish_subtest' });
                        })
                        .catch(err => console.log(err));
                    } else {
                        const test39_Words_List = new Test39_Words_List(null, 
                                test39_vars[socket.id]['idSelectedSession'], 4, 0,  
                                knl_1, wortliste_knl_1, lernen_1, rew_list_1, lernen_1_int, lernen_1_int_text,
                                knl_2, wortliste_knl_2, lernen_2, rew_list_2, lernen_2_int, lernen_2_int_text,
                                knl_3, wortliste_knl_3, lernen_3, rew_list_3, lernen_3_int, lernen_3_int_text,
                                0, '', 0, '', 
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                0, '', 0, '', 0, '', 0, '')
                        test39_Words_List
                        .insert()
                        .then((results) => {
                            MyJson.updateData(test39_vars[socket.id]['idPathFolder'], 
                                              test39_vars[socket.id]['pathSession'], "Words_List", {
                                "KNL1" : knl_1,
                                "Wortliste_KNL_1" : wortliste_knl_1,
                                "LERNEN_1" : lernen_1,
                                "REW_List_1" : rew_list_1,
                                "LERNEN_1_INT" : lernen_1_int,
                                "LERNEN_1_INT_TEXT" : lernen_1_int_text,
                                "KNL2" : knl_2,
                                "Wortliste_KNL_2" : wortliste_knl_2,
                                "LERNEN_2" : lernen_2,
                                "REW_List_2" : rew_list_2,
                                "LERNEN_2_INT" : lernen_2_int,
                                "LERNEN_2_INT_TEXT" : lernen_2_int_text,
                                "KNL3" : knl_3,
                                "Wortliste_KNL_3" : wortliste_knl_3,
                                "LERNEN_3" : lernen_3,
                                "REW_List_3" : rew_list_3,
                                "LERNEN_3_INT" : lernen_3_int,
                                "LERNEN_3_INT_TEXT" : lernen_3_int_text
                            });

                            sock.sendData(socket, true, null, 'Test39', { 'type' : 'finish_subtest' });
                        })
                        .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));
            } else if (page == 47) {
                let abrufen = 0;
                let rew_list_abrufen = "";

                for(let i = 0; i <= 9; i++) {
                    if (test39_vars[socket.id]['test39_page46_selected_scores'][i] == 1) {                    
                        abrufen += test39_vars[socket.id]['test39_page46_selected_scores'][i];
                        rew_list_abrufen += rew_list_abrufen == "" ? test39_lists.wordsList01[i] :
                                                        ", " + test39_lists.wordsList01[i];
                    }
                }

                let abrufen_int = test39_vars[socket.id]['test39_page46_selected_scores'][20];
                let abrufen_int_text = test39_vars[socket.id]['test39_page46_selected_scores'][21];

                Test39_Words_List.select_testDone_by_idSession(test39_vars[socket.id]['idSelectedSession'])
                .then(([test39_words_list]) => {
                    if (test39_words_list.length == 1) {
                        let test_done = test39_words_list[0].test_done | 2;

                        Test39_Words_List.update_abrufen_by_idSession(test39_vars[socket.id]['idSelectedSession'],
                            test_done, abrufen, rew_list_abrufen, abrufen_int, abrufen_int_text,
                            test39_vars[socket.id]['test39_page46_selected_scores'][10],
                            test39_vars[socket.id]['test39_page46_selected_scores'][11],
                            test39_vars[socket.id]['test39_page46_selected_scores'][12],
                            test39_vars[socket.id]['test39_page46_selected_scores'][13],
                            test39_vars[socket.id]['test39_page46_selected_scores'][14],
                            test39_vars[socket.id]['test39_page46_selected_scores'][15],
                            test39_vars[socket.id]['test39_page46_selected_scores'][16],
                            test39_vars[socket.id]['test39_page46_selected_scores'][17],
                            test39_vars[socket.id]['test39_page46_selected_scores'][18],
                            test39_vars[socket.id]['test39_page46_selected_scores'][19])
                        .then(() => {
                            MyJson.updateData(test39_vars[socket.id]['idPathFolder'], 
                                              test39_vars[socket.id]['pathSession'], "Words_List", {
                                "ABRUFEN" : abrufen,
                                "REW_List_Abrufen" : rew_list_abrufen,
                                "ABRUFEN_INT" : abrufen_int,
                                "ABRUFEN_INT_TEXT" : abrufen_int_text,
                                [test39_lists.wordsList01[0]] : test39_vars[socket.id]['test39_page46_selected_scores'][10],
                                [test39_lists.wordsList01[1]] : test39_vars[socket.id]['test39_page46_selected_scores'][11],
                                [test39_lists.wordsList01[2]] : test39_vars[socket.id]['test39_page46_selected_scores'][12],
                                [test39_lists.wordsList01[3]] : test39_vars[socket.id]['test39_page46_selected_scores'][13],
                                [test39_lists.wordsList01[4]] : test39_vars[socket.id]['test39_page46_selected_scores'][14],
                                [test39_lists.wordsList01[5]] : test39_vars[socket.id]['test39_page46_selected_scores'][15],
                                [test39_lists.wordsList01[6]] : test39_vars[socket.id]['test39_page46_selected_scores'][16],
                                [test39_lists.wordsList01[7]] : test39_vars[socket.id]['test39_page46_selected_scores'][17],
                                [test39_lists.wordsList01[8]] : test39_vars[socket.id]['test39_page46_selected_scores'][18],
                                [test39_lists.wordsList01[9]] : test39_vars[socket.id]['test39_page46_selected_scores'][19],
                            });

                            sock.sendData(socket, true, null, 'Test39', { 'type' : 'finish_subtest' });
                        })
                        .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));
            } else if (page == 69) {
                let r_ja = 0, r_nein = 0, f_ja = 0, f_nein = 0;
                let r_ja_list = "", r_nein_list = "", f_ja_list = "", f_nein_list = "";

                for(let i = 49; i <= 68; i++) {
                    if ((i == 49) || (i == 50) || (i == 52) || (i == 55) || (i == 57) || 
                        (i == 58) || (i == 61) || (i == 63) || (i == 64) || (i == 66)) {
                        f_ja += test39_vars[socket.id]['test39_page' + i + '_selected_scores'][0];
                        r_nein += test39_vars[socket.id]['test39_page' + i + '_selected_scores'][1];

                        if (test39_vars[socket.id]['test39_page' + i + '_selected_scores'][0] == 1)
                            f_ja_list += f_ja_list == "" ? test39_lists.wordsList02[i - 49] :
                                                           ", " + test39_lists.wordsList02[i - 49];

                        if (test39_vars[socket.id]['test39_page' + i + '_selected_scores'][1] == 1)
                            r_nein_list += r_nein_list == "" ? test39_lists.wordsList02[i - 49] :
                                                               ", " + test39_lists.wordsList02[i - 49];                            
                    } else if ((i == 51) || (i == 53) || (i == 54) || (i == 56) || (i == 59) || 
                                (i == 60) || (i == 62) || (i == 65) || (i == 67) || (i == 68)) {
                        r_ja += test39_vars[socket.id]['test39_page' + i + '_selected_scores'][0];
                        f_nein += test39_vars[socket.id]['test39_page' + i + '_selected_scores'][1];

                        if (test39_vars[socket.id]['test39_page' + i + '_selected_scores'][0] == 1)
                            r_ja_list += r_ja_list == "" ? test39_lists.wordsList02[i - 49] :
                                                           ", " + test39_lists.wordsList02[i - 49];

                        if (test39_vars[socket.id]['test39_page' + i + '_selected_scores'][1] == 1)
                            f_nein_list += f_nein_list == "" ? test39_lists.wordsList02[i - 49] :
                                                               ", " + test39_lists.wordsList02[i - 49];
                    }
                }

                Test39_Words_List.select_testDone_by_idSession(test39_vars[socket.id]['idSelectedSession'])
                .then(([test39_words_list]) => {
                    if (test39_words_list.length == 1) {
                        let test_done = test39_words_list[0].test_done | 1;

                        Test39_Words_List.update_wiedererkennen_by_idSession(test39_vars[socket.id]['idSelectedSession'],
                            test_done, r_ja, r_ja_list, r_nein, r_nein_list, f_ja, f_ja_list, f_nein, f_nein_list)
                        .then(() => {
                            MyJson.updateData(test39_vars[socket.id]['idPathFolder'], 
                                              test39_vars[socket.id]['pathSession'], "Words_List", {
                                "R_JA" : r_ja,
                                "R_JA_LIST" : r_ja_list,
                                "R_NEIN" : r_nein,
                                "R_NEIN_LIST" : r_nein_list,
                                "F_JA" : f_ja,
                                "F_JA_LIST" : f_ja_list,
                                "F_NEIN" : f_nein,
                                "F_NEIN_LIST" : f_nein_list
                            });

                            sock.sendData(socket, true, null, 'Test39', { 'type' : 'finish_subtest' });
                        })
                        .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));

            }

            break;
        }
    }
};

//Test 39/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test39_getWordByPage(page) {
    switch(page) {
        case 6: return test39_lists.wordsList01[0]; 
        case 7: return test39_lists.wordsList01[1]; 
        case 8: return test39_lists.wordsList01[2]; 
        case 9: return test39_lists.wordsList01[3]; 
        case 10: return test39_lists.wordsList01[4]; 
        case 11: return test39_lists.wordsList01[5]; 
        case 12: return test39_lists.wordsList01[6]; 
        case 13: return test39_lists.wordsList01[7]; 
        case 14: return test39_lists.wordsList01[8]; 
        case 15: return test39_lists.wordsList01[9]; 
        case 19: return test39_lists.wordsList01[7]; 
        case 20: return test39_lists.wordsList01[5]; 
        case 21: return test39_lists.wordsList01[0]; 
        case 22: return test39_lists.wordsList01[2]; 
        case 23: return test39_lists.wordsList01[9]; 
        case 24: return test39_lists.wordsList01[1]; 
        case 25: return test39_lists.wordsList01[4]; 
        case 26: return test39_lists.wordsList01[3]; 
        case 27: return test39_lists.wordsList01[6]; 
        case 28: return test39_lists.wordsList01[8]; 
        case 32: return test39_lists.wordsList01[4]; 
        case 33: return test39_lists.wordsList01[8]; 
        case 34: return test39_lists.wordsList01[1]; 
        case 35: return test39_lists.wordsList01[5]; 
        case 36: return test39_lists.wordsList01[6]; 
        case 37: return test39_lists.wordsList01[2]; 
        case 38: return test39_lists.wordsList01[0]; 
        case 39: return test39_lists.wordsList01[9]; 
        case 40: return test39_lists.wordsList01[7]; 
        case 41: return test39_lists.wordsList01[3]; 
    }
}