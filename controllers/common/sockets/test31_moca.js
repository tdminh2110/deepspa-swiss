const FileSystem = require('../filesystem');
const MyGlobals = require('../globals');
const MyUploadFiles = require('../uploadfiles');
const MyJson = require('../json');

const Patient = require('../../../models/patient');
const MySession = require('../../../models/session');
const Test31_MOCA = require('../../../models/test_moca');

const MyRooms = require('../../common/roommanagement');
const sock = require('./senddata');

let test31_vars = {};

exports.test31_moca_socket = function(socket, data) {
    switch (data['type']) {
        case "hide-image":
            test31_vars[socket.id]['test31_page' + data['page'] + '_show_image'] = 0;            
            sock.sendData(socket, false, test31_vars[socket.id]['IDSocket_Patient'], 'Test31', { 'type' : 'hide-image', 'page' : data['page'] });
            break;   
            
        case "minus-words":
            if (data['page'] == 12) {   
                if (test31_vars[socket.id]['test31_page12_count_words'] > 0)
                    test31_vars[socket.id]['test31_page12_count_words']--;
                sock.sendData(socket, true, null, 'Test31', { 'type' : 'show-words', 'page' : data['page'], 'value' : test31_vars[socket.id]['test31_page12_count_words'] });
            }
            break;

        case "old-status-of-page":
            test31_oldStatusOfPage(socket, data['page']);
            break;

        case "plus-words":
            if (data['page'] == 12) {   
                test31_vars[socket.id]['test31_page12_count_words']++;
                sock.sendData(socket, true, null, 'Test31', { 'type' : 'show-words', 'page' : data['page'], 'value' : test31_vars[socket.id]['test31_page12_count_words'] });
            }
            break;

        case "select-score": {
            let page = data['page'];

            switch (page) {
                case 2: case 3: case 7: case 8: case 9:
                    if (test31_vars[socket.id]['test31_page' + page + '_selected_score'] == 0) 
                        test31_vars[socket.id]['test31_page' + page + '_selected_score'] = 1;                    
                    else
                        test31_vars[socket.id]['test31_page' + page + '_selected_score'] = 0;  

                    sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page': page, 'score' : test31_vars[socket.id]['test31_page' + page + '_selected_score'] });
                                
                    break;

                case 4: case 5: case 6: case 10: case 11: case 13: case 17: {
                    let index = data['index'];

                    if (test31_vars[socket.id]['test31_page' + page + '_selected_scores'][index] == 0) {
                        test31_vars[socket.id]['test31_page' + page + '_selected_scores'][index] = 1;    
                        sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : index, 'score' : 1 });
    
                    } else {
                        test31_vars[socket.id]['test31_page' + page + '_selected_scores'][index] = 0;    
                        sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : index, 'score' : 0 });
                    }
                    break;
                }

                case 14: {
                    let index = data['index'];

                    if ((test31_vars[socket.id]['test31_page14_selected_scores'][index] == 0) || 
                        (test31_vars[socket.id]['test31_page14_selected_scores'][index] == 2) ||
                        (test31_vars[socket.id]['test31_page14_selected_scores'][index] == 3)) {
                        test31_vars[socket.id]['test31_page14_selected_scores'][index] = 1;    
                        sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : index, 'score' : 1 });    
                    } else {
                        test31_vars[socket.id]['test31_page14_selected_scores'][index] = 0;    
                        sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : index, 'score' : 0 });
                    }
                    break;
                }

                case 15: {
                    let index = data['index'];

                    if ((test31_vars[socket.id]['test31_page14_selected_scores'][index] == 0) || 
                        (test31_vars[socket.id]['test31_page14_selected_scores'][index] == 3)) {
                        test31_vars[socket.id]['test31_page14_selected_scores'][index] = 2;    
                        sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : index, 'score' : 2 });    
                    } else {
                        test31_vars[socket.id]['test31_page14_selected_scores'][index] = 0;    
                        sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : index, 'score' : 0 });
                    }
                    break;
                }

                case 16: {
                    let index = data['index'];

                    if (test31_vars[socket.id]['test31_page14_selected_scores'][index] == 0) {
                        test31_vars[socket.id]['test31_page14_selected_scores'][index] = 3;    
                        sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : index, 'score' : 3 });
    
                    } else {
                        test31_vars[socket.id]['test31_page14_selected_scores'][index] = 0;    
                        sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : index, 'score' : 0 });
                    }

                    break;
                }
            }

            break;
        }

        case "show-image":            
            test31_vars[socket.id]['test31_page' + data['page'] + '_show_button_2'] = 1;            

            if (test31_vars[socket.id]['test31_page' + data['page'] + '_show_image'] == 0) {
                test31_vars[socket.id]['test31_page' + data['page'] + '_show_image'] = 1;

                sock.sendData(socket, true, null, 'Test31', { 'type' : 'show-image', 'page' : data['page'] });
                sock.sendData(socket, false, test31_vars[socket.id]['IDSocket_Patient'], 'Test31', { 'type' : 'show-image', 'page' : data['page'] });
            } else {
                test31_vars[socket.id]['test31_page' + data['page'] + '_show_image'] = 0;

                sock.sendData(socket, true, null, 'Test31', { 'type' : 'hide-image', 'page' : data['page'] });
                sock.sendData(socket, false, test31_vars[socket.id]['IDSocket_Patient'], 'Test31', { 'type' : 'hide-image', 'page' : data['page'] });
            }
            break;

        case "show-page": {
            let page = data['page'];
        
            switch (page) {
                case 1: case 2: case 4: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13:
                case 14: case 17:
                    sock.sendData(socket, true, null, 'Test31', { 'type' : data['type'], 'page' : page });
                    break;

                case 3: case 5:
                    sock.sendData(socket, true, null, 'Test31', { 'type' : data['type'], 'page' : page, 
                                        'show_button_2' : test31_vars[socket.id]['test31_page' + page + '_show_button_2'] });
                    break;

                case 15: {
                    let count = test31_countValueInArray(test31_vars[socket.id]['test31_page14_selected_scores'], 1);

                    if (count == 5) 
                        sock.sendData(socket, true, null, 'Test31', { 'type' : data['type'], 'page' : 17 });
                    else
                        sock.sendData(socket, true, null, 'Test31', { 'type' : data['type'], 'page' : page });

                    break;
                }

                case 16: {
                    let count1 = test31_countValueInArray(test31_vars[socket.id]['test31_page14_selected_scores'], 1);
                    let count2 = test31_countValueInArray(test31_vars[socket.id]['test31_page14_selected_scores'], 2);
                    
                    if (data['prev-page'] == 15) {
                        if (count1 + count2 == 5)                        
                            sock.sendData(socket, true, null, 'Test31', { 'type' : data['type'], 'page' : 17 });
                        else
                            sock.sendData(socket, true, null, 'Test31', { 'type' : data['type'], 'page' : page });
                    } else if (data['prev-page'] == 17) { 
                        if (count1 == 5)
                            sock.sendData(socket, true, null, 'Test31', { 'type' : data['type'], 'page' : 14 });
                        else if (count1 + count2 == 5) 
                            sock.sendData(socket, true, null, 'Test31', { 'type' : data['type'], 'page' : 15 });
                        else
                            sock.sendData(socket, true, null, 'Test31', { 'type' : data['type'], 'page' : 16 });
                    }
                    break;
                }

                case 18: {
                    let a = test31_vars[socket.id]['test31_page2_selected_score'];
                    let b = test31_vars[socket.id]['test31_page3_selected_score'];
                    let c = test31_vars[socket.id]['test31_page4_selected_scores'][0];
                    let d = test31_vars[socket.id]['test31_page4_selected_scores'][1];
                    let e = test31_vars[socket.id]['test31_page4_selected_scores'][2];
                    let f = test31_vars[socket.id]['test31_page5_selected_scores'][0];
                    let g = test31_vars[socket.id]['test31_page5_selected_scores'][1];
                    let h = test31_vars[socket.id]['test31_page5_selected_scores'][2];
                    let i = test31_vars[socket.id]['test31_page7_selected_score'];
                    let j = test31_vars[socket.id]['test31_page8_selected_score'];
                    let k = test31_vars[socket.id]['test31_page9_selected_score'];

                    let count = test31_countValueInArray(test31_vars[socket.id]['test31_page10_selected_scores'], 1);
                    let l;
                    if ((count == 4) || (count == 5)) l = 3;
                    else if ((count == 2) || (count == 3)) l = 2;
                    else l = count; // if (count == 0) or (count == 1)

                    let m = test31_vars[socket.id]['test31_page11_selected_scores'][0];
                    let n = test31_vars[socket.id]['test31_page11_selected_scores'][1];
                    let o = test31_vars[socket.id]['test31_page12_count_words'] >= 11 ? 1 : 0;
                    let p = test31_vars[socket.id]['test31_page13_selected_scores'][0];
                    let q = test31_vars[socket.id]['test31_page13_selected_scores'][1];

                    let F1 = test31_countValueInArray(test31_vars[socket.id]['test31_page14_selected_scores'], 1);

                    let F2 = test31_countValueInArray(test31_vars[socket.id]['test31_page14_selected_scores'], 2);

                    let F3 = test31_countValueInArray(test31_vars[socket.id]['test31_page14_selected_scores'], 3);
                    
                    let date = test31_vars[socket.id]['test31_page17_selected_scores'][0];
                    let mois = test31_vars[socket.id]['test31_page17_selected_scores'][1];
                    let annee = test31_vars[socket.id]['test31_page17_selected_scores'][2];
                    let jour = test31_vars[socket.id]['test31_page17_selected_scores'][3];
                    let endroit = test31_vars[socket.id]['test31_page17_selected_scores'][4];
                    let ville = test31_vars[socket.id]['test31_page17_selected_scores'][5];

                    sock.sendData(socket, true, null, 'Test31', { 'type' : 'show-page', 'page' : page, 
                        'a' : a, 'b' : b, 'c' : c, 'd' : d, 'e' : e, 'f' : f, 'g' : g, 'h' : h, 'i' : i, 
                        'j' : j, 'k' : k, 'l' : l, 'm' : m, 'n' : n, 'o' : o, 'p' : p, 'q' : q, 
                        'F1' : F1, 'F2' : F2, 'F3' : F3, 'date' : date, 
                        'mois' : mois, 'annee' : annee, 'jour' : jour, 'endroit' : endroit, 'ville' : ville });                   
                    break;
                }
            }
            break;
        }

        case "show-page-and-store": 
            test31_vars[socket.id]['test31_page18_remarques'] = data['remarques'];
            sock.sendData(socket, true, null, 'Test31', { 'type' : 'show-page', 'page' : data['page'] });

            break;        

        case "start":
            let IDSocket_Patient = MyRooms.getIDPatientByIDClinician(socket.id);

            test31_vars[IDSocket_Patient] = socket.id;
            test31_vars[socket.id] = {
                'IDSocket_Clinician' : socket.id,
                'IDSocket_Patient' : IDSocket_Patient,
                'idSelectedSession' : data['idselectedsession'],
                'pathSession' : null,
                'idPathFolder' : null,
                'idSelectedPatient' : null, 
                'test31_folderNameStoreVideoAudio' : null,
                'test31_upload_store_media' : null,
                'test31_record_video' : null,
                'test31_page2_selected_score' : 0,
                'test31_page3_show_image' : 0,
                'test31_page3_show_button_2' : 0,
                'test31_page3_selected_score' : 0,
                'test31_page4_selected_scores' : [0, 0, 0],
                'test31_page5_show_image' : 0,
                'test31_page5_show_button_2' : 0,
                'test31_page5_selected_scores' : [0, 0, 0],
                'test31_page6_selected_scores' : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                'test31_page7_selected_score' : 0,
                'test31_page8_selected_score' : 0,
                'test31_page9_selected_score' : 0,
                'test31_page10_selected_scores' : [0, 0, 0, 0, 0],
                'test31_page11_selected_scores' : [0, 0],
                'test31_page12_count_words' : 0,
                'test31_page13_selected_scores' : [0, 0],
                'test31_page14_selected_scores' : [0, 0, 0, 0, 0],
                'test31_page17_selected_scores' : [0, 0, 0, 0, 0, 0],
                'test31_page18_remarques' : ""
            }

            MySession.select_by_id(test31_vars[socket.id]['idSelectedSession'])
            .then(([mysession]) => {
                if (mysession.length == 1) {
                    test31_vars[socket.id]['pathSession'] = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                    Patient.select_by_idUser(mysession[0].id_patient)
                    .then(([patient]) => {
                        if (patient.length == 1) {
                            test31_vars[socket.id]['idPathFolder'] = patient[0].id_path_folder;
                            test31_vars[socket.id]['test31_record_video'] = data['record_video'];
                            test31_vars[socket.id]['idSelectedPatient'] = mysession[0].id_patient;                                        
                            test31_vars[socket.id]['test31_folderNameStoreVideoAudio'] = FileSystem.FOLDER_UPLOAD + test31_vars[socket.id]['idPathFolder'] + "/" + test31_vars[socket.id]['pathSession'] + "/MOCA";
                            test31_vars[socket.id]['test31_upload_store_media'] = patient[0].upload_store_media;
                            
                            sock.sendData(socket, true, null, 'Test31', { 'type' : 'start', 'record_video' : data['record_video'], 'language' : data['language'], 'shortcut' : data['shortcut'] });
                            sock.sendData(socket, false, test31_vars[socket.id]['IDSocket_Patient'], 'Test31', { 'type' : 'start', 'record_video' : data['record_video'] });
                        }
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            break;

        case "store-values": {
            test31_vars[socket.id]['test31_page18_remarques'] = data['remarques'];

            let record_video = 0;
            let path_record_video = "";

            if (test31_vars[socket.id]['test31_record_video'] == true) {
                record_video = 1;
                path_record_video = test31_vars[socket.id]['test31_folderNameStoreVideoAudio'] + "/" + "video.webm";
            }

            let a = test31_vars[socket.id]['test31_page2_selected_score'];
            let b = test31_vars[socket.id]['test31_page3_selected_score'];
            let c = test31_vars[socket.id]['test31_page4_selected_scores'][0];
            let d = test31_vars[socket.id]['test31_page4_selected_scores'][1];
            let e = test31_vars[socket.id]['test31_page4_selected_scores'][2];
            let f = test31_vars[socket.id]['test31_page5_selected_scores'][0];
            let g = test31_vars[socket.id]['test31_page5_selected_scores'][1];
            let h = test31_vars[socket.id]['test31_page5_selected_scores'][2];
            let i = test31_vars[socket.id]['test31_page7_selected_score'];
            let j = test31_vars[socket.id]['test31_page8_selected_score'];
            let k = test31_vars[socket.id]['test31_page9_selected_score'];

            let count = test31_countValueInArray(test31_vars[socket.id]['test31_page10_selected_scores'], 1);
            let l;
            if ((count == 4) || (count == 5)) l = 3;
            else if ((count == 2) || (count == 3)) l = 2;
            else l = count; // if (count == 0) or (count == 1)

            let m = test31_vars[socket.id]['test31_page11_selected_scores'][0];
            let n = test31_vars[socket.id]['test31_page11_selected_scores'][1];
            let o = test31_vars[socket.id]['test31_page12_count_words'] >= 11 ? 1 : 0;
            let p = test31_vars[socket.id]['test31_page13_selected_scores'][0];
            let q = test31_vars[socket.id]['test31_page13_selected_scores'][1];
            let F1 = test31_countValueInArray(test31_vars[socket.id]['test31_page14_selected_scores'], 1);
            let F2 = test31_countValueInArray(test31_vars[socket.id]['test31_page14_selected_scores'], 2);
            let F3 = test31_countValueInArray(test31_vars[socket.id]['test31_page14_selected_scores'], 3);
            let date = test31_vars[socket.id]['test31_page17_selected_scores'][0];
            let mois = test31_vars[socket.id]['test31_page17_selected_scores'][1];
            let annee = test31_vars[socket.id]['test31_page17_selected_scores'][2];
            let jour = test31_vars[socket.id]['test31_page17_selected_scores'][3];
            let endroit = test31_vars[socket.id]['test31_page17_selected_scores'][4];
            let ville = test31_vars[socket.id]['test31_page17_selected_scores'][5];

            let A = a + b + c + d + e;
            let B = f + g + h;
            let C = i + j + k + l;
            let D = m + n + o;
            let E = p + q;
            let G = F2 + F3;
            let H = date + mois + annee + jour + endroit + ville;

            let total = A + B + C + D + E + F1 + H;

            let results = "Visuospatial / exécutif: [" + a + ", " + b + ", " + c + ", " + d + ", " + e + "] - " + A + "/5" + "\n";
            results += "Dénomination: [" + f + ", " + g + ", " + h + "] - " + B + "/3" + "\n";
            results += "Attention: [" + i + ", " + j + ", " + k + ", " + l + "] - " + C + "/6" + "\n";
            results += "Langage: [" + m + ", " + n + ", " + o + "] - " + D + "/3" + "\n";
            results += "Abstraction: [" + p + ", " + q + "] - " + E + "/2" + "\n";
            results += "Rappel sans indices: " + F1 + "/5" + "\n";
            results += F1 == 5 ? "Rappel différé: n/a" + "\n" : "Rappel différé: [" + F2 + ", " + F3 + "] - " + G + "/5" + "\n";
            results += "Orientation: [" + date + ", " + mois + ", " + annee + ", " + jour + ", " + endroit + ", " + ville + "] - " + H + "/5" + "\n";
            results += "TOTAL: " + total + "/30";

            Test31_MOCA.select_by_idSession(test31_vars[socket.id]['idSelectedSession'])
            .then(([test31_moca]) => {
                if (test31_moca.length == 1) {
                    Test31_MOCA.update_by_idSession(test31_vars[socket.id]['idSelectedSession'], record_video, 
                                    a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, F1, F2, F3, 
                                    date, mois, annee, jour, endroit, ville, test31_vars[socket.id]['test31_page18_remarques'], results)
                    .then(() => {
                        MyJson.updateData(test31_vars[socket.id]['idPathFolder'], test31_vars[socket.id]['pathSession'], "MOCA", {
                            "a" : a, "b" : b, "c" : c, "d" : d, "e" : e, "f" : f, "g" : g, "h" : h,  
                            "i" : i, "j" : j, "k" : k, "l" : l, "m" : m, "n" : n, "o" : o, "p" : p, 
                            "q" : q, "F1" : F1, "F2" : F2, "F3" : F3, 
                            "date" : date, "mois" : mois, "annee" : annee, "jour" : jour, 
                            "endroit" : endroit, "ville" : ville, 
                            "Remarques" : test31_vars[socket.id]['test31_page18_remarques'],
                            "Video" : path_record_video
                        });

                        if (test31_vars[socket.id]['test31_record_video'] == true) {
                            if (test31_vars[socket.id]['test31_upload_store_media'] == 0) {
                                MyUploadFiles.add_UploadFiles(test31_vars[socket.id]['IDSocket_Patient'], socket.id, "MOCA");
                                FileSystem.createFolder(test31_vars[socket.id]['test31_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test31_vars[socket.id]['idSelectedPatient'], "MOCA", 
                                                                    test31_vars[socket.id]['test31_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test31', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test31_vars[socket.id]['IDSocket_Patient'], 'Test31', { 'type' : 'upload-files' });
                            } else if (test31_vars[socket.id]['test31_upload_store_media'] == 1) {
                                sock.sendData(socket, true, null, 'Test31', { 'type' : 'store-files'});
                                sock.sendData(socket, false, test31_vars[socket.id]['IDSocket_Patient'], 'Test31', { 'type' : 'store-files', 
                                                                                'id_path_folder' : test31_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test31_vars[socket.id]['pathSession'] });
                            } else if (test31_vars[socket.id]['test31_upload_store_media'] == 2) {
                                MyUploadFiles.add_UploadFiles(test31_vars[socket.id]['IDSocket_Patient'], socket.id, "MOCA");
                                FileSystem.createFolder(test31_vars[socket.id]['test31_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test31_vars[socket.id]['idSelectedPatient'], "MOCA", 
                                                                            test31_vars[socket.id]['test31_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test31', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test31_vars[socket.id]['IDSocket_Patient'], 'Test31', { 'type' : 'upload-store-files', 
                                                                                'id_path_folder' : test31_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test31_vars[socket.id]['pathSession'] });
                            } else if (test31_vars[socket.id]['test31_upload_store_media'] == 3) {
                                sock.sendData(socket, true, null, 'Test31', { 'type' : 'store-files-in-clinician',
                                                                                'id_path_folder' : test31_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test31_vars[socket.id]['pathSession'] });
                                sock.sendData(socket, false, test31_vars[socket.id]['IDSocket_Patient'], 'Test31', { 'type' : 'store-files-in-clinician' });
                            }
                        } else {
                            sock.sendData(socket, true, null, 'Test31', { 'type' : 'finish' });
                        }

                        delete test31_vars[test31_vars[socket.id]['IDSocket_Patient']];
                        delete test31_vars[socket.id];
                    })
                    .catch(err => console.log(err));
                } else {
                    const test31_MOCA = new Test31_MOCA(null, test31_vars[socket.id]['idSelectedSession'], 
                                    record_video, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, F1, F2, F3, 
                                    date, mois, annee, jour, endroit, ville, test31_vars[socket.id]['test31_page18_remarques'], results);
                    test31_MOCA
                    .insert()
                    .then((results) => {
                        MyJson.updateData(test31_vars[socket.id]['idPathFolder'], test31_vars[socket.id]['pathSession'], "MOCA", {
                            "a" : a, "b" : b, "c" : c, "d" : d, "e" : e, "f" : f, "g" : g, "h" : h,  
                            "i" : i, "j" : j, "k" : k, "l" : l, "m" : m, "n" : n, "o" : o, "p" : p, 
                            "q" : q, "F1" : F1, "F2" : F2, "F3" : F3, 
                            "date" : date, "mois" : mois, "annee" : annee, "jour" : jour, 
                            "endroit" : endroit, "ville" : ville, 
                            "Remarques" : test31_vars[socket.id]['test31_page18_remarques'],
                            "Video" : path_record_video
                        });

                        if (test31_vars[socket.id]['test31_record_video'] == true) {
                            if (test31_vars[socket.id]['test31_upload_store_media'] == 0) {
                                MyUploadFiles.add_UploadFiles(test31_vars[socket.id]['IDSocket_Patient'], socket.id, "MOCA");
                                FileSystem.createFolder(test31_vars[socket.id]['test31_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test31_vars[socket.id]['idSelectedPatient'], "MOCA", 
                                                                    test31_vars[socket.id]['test31_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test31', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test31_vars[socket.id]['IDSocket_Patient'], 'Test31', { 'type' : 'upload-files' });
                            } else if (test31_vars[socket.id]['test31_upload_store_media'] == 1) {
                                sock.sendData(socket, true, null, 'Test31', { 'type' : 'store-files'});
                                sock.sendData(socket, false, test31_vars[socket.id]['IDSocket_Patient'], 'Test31', { 'type' : 'store-files', 
                                                                                'id_path_folder' : test31_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test31_vars[socket.id]['pathSession'] });
                            } else if (test31_vars[socket.id]['test31_upload_store_media'] == 2) {
                                MyUploadFiles.add_UploadFiles(test31_vars[socket.id]['IDSocket_Patient'], socket.id, "MOCA");
                                FileSystem.createFolder(test31_vars[socket.id]['test31_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test31_vars[socket.id]['idSelectedPatient'], "MOCA", 
                                                                            test31_vars[socket.id]['test31_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test31', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test31_vars[socket.id]['IDSocket_Patient'], 'Test31', { 'type' : 'upload-store-files', 
                                                                                'id_path_folder' : test31_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test31_vars[socket.id]['pathSession'] });
                            } else if (test31_vars[socket.id]['test31_upload_store_media'] == 3) {
                                sock.sendData(socket, true, null, 'Test31', { 'type' : 'store-files-in-clinician',
                                                                                'id_path_folder' : test31_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test31_vars[socket.id]['pathSession'] });
                                sock.sendData(socket, false, test31_vars[socket.id]['IDSocket_Patient'], 'Test31', { 'type' : 'store-files-in-clinician' });
                            }
                        } else {
                            sock.sendData(socket, true, null, 'Test31', { 'type' : 'finish' });
                        }

                        delete test31_vars[test31_vars[socket.id]['IDSocket_Patient']];
                        delete test31_vars[socket.id];
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            
            break;
        }

        case "stop":                         
            sock.sendData(socket, true, null, 'Test31', { 'type' : data['type'] });
            sock.sendData(socket, false, test31_vars[socket.id]['IDSocket_Patient'], 'Test31', { 'type' : data['type'] });

            delete test31_vars[test31_vars[socket.id]['IDSocket_Patient']];
            delete test31_vars[socket.id];
            break;        
    }
};

//Test 31/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test31_countValueInArray(arrValue, value) {
    let count = 0;
    for(let i = 0; i < arrValue.length; i++) 
        if (arrValue[i] == value)
            count++;
    return count;    
}

function test31_oldStatusOfPage(socket, page) {    
    switch (page) {
        case 2: case 3: case 7: case 8: case 9:
            sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'score' : test31_vars[socket.id]['test31_page' + page + '_selected_score'] });
            break;
        
        case 4: case 5:
            for(let i = 0; i < 3; i++) {                                    
                if (test31_vars[socket.id]['test31_page' + page + '_selected_scores'][i] == 1) {                    
                    sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : i, 'score' : 1 });                  
                } 
            }
            break;

        case 6:
            for(let i = 0; i < 10; i++) {                                    
                if (test31_vars[socket.id]['test31_page' + page + '_selected_scores'][i] == 1) {                    
                    sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : i, 'score' : 1 });                  
                } 
            }
            break;

        case 10: case 14:
            for(let i = 0; i < 5; i++) {                                    
                if (test31_vars[socket.id]['test31_page' + page + '_selected_scores'][i] == 1) {                    
                    sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : i, 'score' : 1 });                  
                } 
            }
            break;

        case 11: case 13:
            for(let i = 0; i < 2; i++) {                                    
                if (test31_vars[socket.id]['test31_page' + page + '_selected_scores'][i] == 1) {                    
                    sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : i, 'score' : 1 });                  
                } 
            }
            break;

        case 12:
            sock.sendData(socket, true, null, 'Test31', { 'type' : 'show-words', 'page' : page, 'value' : test31_vars[socket.id]['test31_page12_count_words'] });
            break;

        case 15:
            for(let i = 0; i < 5; i++) {                                    
                if (test31_vars[socket.id]['test31_page14_selected_scores'][i] == 1) {                    
                    sock.sendData(socket, true, null, 'Test31', { 'type' : 'hide-selected-item', 'page' : page, 'index' : i });                  
                } else if (test31_vars[socket.id]['test31_page14_selected_scores'][i] == 2) {
                    sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : i, 'score' : 2 });
                }
            }
            break;

        case 16:
            for(let i = 0; i < 5; i++) {                                    
                if ((test31_vars[socket.id]['test31_page14_selected_scores'][i] == 1) || 
                    (test31_vars[socket.id]['test31_page14_selected_scores'][i] == 2)) {                    
                    sock.sendData(socket, true, null, 'Test31', { 'type' : 'hide-selected-item', 'page' : page, 'index' : i });                  
                } else if (test31_vars[socket.id]['test31_page14_selected_scores'][i] == 3) {
                    sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : i, 'score' : 3 });
                } 
            }
            break;

        case 17:
            for(let i = 0; i < 6; i++) {                                    
                if (test31_vars[socket.id]['test31_page' + page + '_selected_scores'][i] == 1) {                    
                    sock.sendData(socket, true, null, 'Test31', { 'type' : 'select-score', 'page' : page, 'index' : i, 'score' : 1 });                  
                } 
            }
            break;

        case 18:           
            sock.sendData(socket, true, null, 'Test31', { 'type' : 'set-text', 'page' : page, 'text' : test31_vars[socket.id]['test31_page18_remarques'] });
            break;
    }
}