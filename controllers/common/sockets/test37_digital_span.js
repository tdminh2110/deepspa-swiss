const FileSystem = require('../filesystem');
const MyGlobals = require('../globals');
const MyUploadFiles = require('../uploadfiles');
const MyJson = require('../json');

const Patient = require('../../../models/patient');
const MySession = require('../../../models/session');
const Test37_Digital_Span = require('../../../models/test_digital_span');

const MyRooms = require('../../common/roommanagement');
const sock = require('./senddata');

let test37_vars = {};

exports.test37_digital_span_socket = function(socket, data) {
    switch (data['type']) {

        case "old-status-of-page": {
            let page = data['page'];

            for(let i = 1; i <= 4; i++) {                                    
                if (test37_vars[socket.id]['test37_page' + page + '_selected_words'][i-1] == 1)                      
                    sock.sendData(socket, true, null, 'Test37', { 'type' : 'select-word', 'page' : page, 
                                                          'action' : i, 
                                                          'status' : 1 });
            }
        
            test37_showHideContinuerButton(socket, page);
            
            break;
        }

        case "play-audio":
            sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : data['type'], 'page' : data['page'], 'audio' : data['audio'] });
            break;

        case "select-word": {
            let page = data['page'];
            let action = data['action'];

            if (test37_vars[socket.id]['test37_page' + page + '_selected_words'][action - 1] != 1) {
                if ((action == 1) || (action == 3)) {
                    test37_vars[socket.id]['test37_page' + page + '_selected_words'][action - 1] = 1;
                    test37_vars[socket.id]['test37_page' + page + '_selected_words'][action] = 0;
                } else if ((action == 2) || (action == 4)) {
                    test37_vars[socket.id]['test37_page' + page + '_selected_words'][action - 1] = 1;
                    test37_vars[socket.id]['test37_page' + page + '_selected_words'][action - 2] = 0;
                }
            } else
                test37_vars[socket.id]['test37_page' + page + '_selected_words'][action - 1] = 0;

            sock.sendData(socket, true, null, 'Test37', { 'type' : data['type'], 'page' : page, 
                                                          'action' : action, 
                                                          'status' : test37_vars[socket.id]['test37_page' + page + '_selected_words'][action - 1] });

            test37_showHideContinuerButton(socket, page);
            
            break;
        }

        case "show-page": {
            let page = data['page'];
        
            switch (page) {
                case 1: case 2: case 8: case 9:
                    sock.sendData(socket, true, null, 'Test37', { 'type' : data['type'], 'page' : page });
                    sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : data['type'], 'page' : page });
                    break;
                
                case 3: case 4: case 5: case 6:
                    if ((test37_vars[socket.id]['test37_page' + (page - 1) + '_selected_words'][0] == 1) ||
                        (test37_vars[socket.id]['test37_page' + (page - 1) + '_selected_words'][2] == 1)) {
                        sock.sendData(socket, true, null, 'Test37', { 'type' : data['type'], 'page' : page });
                        sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : data['type'], 'page' : page });
                    } else {                        
                        sock.sendData(socket, true, null, 'Test37', { 'type' : data['type'], 'page' : 8 });
                        sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : data['type'], 'page' : 8 });
                    }                
                    break; 
                
                case 7:
                    if (data['prev-page'] == 8) {
                        let jump_page_7 = true;

                        for(let p = 2; p <= 6; p++) {
                            if ((test37_vars[socket.id]['test37_page' + p + '_selected_words'][0] == 0) &&
                                (test37_vars[socket.id]['test37_page' + p + '_selected_words'][2] == 0)) {
                                sock.sendData(socket, true, null, 'Test37', { 'type' : data['type'], 'page' : p });
                                sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : data['type'], 'page' : p });
                                jump_page_7 = false;
                                break;
                            }
                        }

                        if (jump_page_7) {
                            sock.sendData(socket, true, null, 'Test37', { 'type' : data['type'], 'page' : page });
                            sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : data['type'], 'page' : page });
                        }
                    } else {
                        if ((test37_vars[socket.id]['test37_page' + (page - 1) + '_selected_words'][0] == 1) ||
                            (test37_vars[socket.id]['test37_page' + (page - 1) + '_selected_words'][2] == 1)) {
                            sock.sendData(socket, true, null, 'Test37', { 'type' : data['type'], 'page' : page });
                            sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : data['type'], 'page' : page });
                        } else {
                            sock.sendData(socket, true, null, 'Test37', { 'type' : data['type'], 'page' : 8 });
                            sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : data['type'], 'page' : 8 });
                        }
                    }
                    break;

                case 10: case 11: case 12: case 13: {
                    if ((test37_vars[socket.id]['test37_page' + (page - 1) + '_selected_words'][0] == 1) ||
                        (test37_vars[socket.id]['test37_page' + (page - 1) + '_selected_words'][2] == 1)) {
                        sock.sendData(socket, true, null, 'Test37', { 'type' : data['type'], 'page' : page });
                        sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : data['type'], 'page' : page });
                    } else 
                        test37_computeVORRUC(socket);
                    break;
                }

                case 14: {
                    if (data['prev-page'] == 15) {
                        let jump_page_14 = true;

                        for(let p = 9; p <= 13; p++) {
                            if ((test37_vars[socket.id]['test37_page' + p + '_selected_words'][0] == 0) &&
                                (test37_vars[socket.id]['test37_page' + p + '_selected_words'][2] == 0)) {
                                sock.sendData(socket, true, null, 'Test37', { 'type' : data['type'], 'page' : p });
                                sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : data['type'], 'page' : p });
                                jump_page_14 = false;
                                break;
                            }
                        }

                        if (jump_page_14) {
                            sock.sendData(socket, true, null, 'Test37', { 'type' : data['type'], 'page' : page });
                            sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : data['type'], 'page' : page });
                        }
                    } else {
                        if ((test37_vars[socket.id]['test37_page' + (page - 1) + '_selected_words'][0] == 1) ||
                            (test37_vars[socket.id]['test37_page' + (page - 1) + '_selected_words'][2] == 1)) {
                            sock.sendData(socket, true, null, 'Test37', { 'type' : data['type'], 'page' : page });
                            sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : data['type'], 'page' : page });                      }
                        else 
                            test37_computeVORRUC(socket);
                    }
                    break;
                }

                case 15: 
                    test37_computeVORRUC(socket);             
                    break;
            }
            break;
        }

        case "start":
            let IDSocket_Patient = MyRooms.getIDPatientByIDClinician(socket.id);

            test37_vars[IDSocket_Patient] = socket.id;
            test37_vars[socket.id] = {
                'IDSocket_Clinician' : socket.id,
                'IDSocket_Patient' : IDSocket_Patient,
                'idSelectedSession' : data['idselectedsession'],                
                'pathSession' : null,
                'idPathFolder' : null,
                'idSelectedPatient' : null, 
                'test37_folderNameStoreVideoAudio' : null,
                'test37_upload_store_media' : null,                
                'test37_record_audio' : null,
                'test37_page2_selected_words' : [-1, -1, -1, -1],
                'test37_page3_selected_words' : [-1, -1, -1, -1],
                'test37_page4_selected_words' : [-1, -1, -1, -1],
                'test37_page5_selected_words' : [-1, -1, -1, -1],
                'test37_page6_selected_words' : [-1, -1, -1, -1],
                'test37_page7_selected_words' : [-1, -1, -1, -1],
                'test37_page9_selected_words' : [-1, -1, -1, -1],
                'test37_page10_selected_words' : [-1, -1, -1, -1],
                'test37_page11_selected_words' : [-1, -1, -1, -1],
                'test37_page12_selected_words' : [-1, -1, -1, -1],
                'test37_page13_selected_words' : [-1, -1, -1, -1],
                'test37_page14_selected_words' : [-1, -1, -1, -1]
            }            

            MySession.select_by_id(test37_vars[socket.id]['idSelectedSession'])
            .then(([mysession]) => {
                if (mysession.length == 1) {
                    test37_vars[socket.id]['pathSession'] = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                    Patient.select_by_idUser(mysession[0].id_patient)
                    .then(([patient]) => {
                        if (patient.length == 1) {                                        
                            test37_vars[socket.id]['idPathFolder'] = patient[0].id_path_folder;
                            test37_vars[socket.id]['test37_record_audio'] = data['record_audio'];
                            test37_vars[socket.id]['idSelectedPatient'] = mysession[0].id_patient;                                        
                            test37_vars[socket.id]['test37_folderNameStoreVideoAudio'] = FileSystem.FOLDER_UPLOAD + test37_vars[socket.id]['idPathFolder'] + "/" + test37_vars[socket.id]['pathSession'] + "/Digital_Span";
                            test37_vars[socket.id]['test37_upload_store_media'] = patient[0].upload_store_media;
                          
                            sock.sendData(socket, true, null, 'Test37', { 'type' : 'start', 'record_audio' : data['record_audio'], 'shortcut' : data['shortcut'] });
                            sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : 'start', 'record_audio' : data['record_audio'] });
                        }
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));                        
            break;
        
        case "store-values": {
            let record_audio = 0;
            let path_record_audio = "";

            if (test37_vars[socket.id]['test37_record_audio'] == true) {
                record_audio = 1;
                path_record_audio = test37_vars[socket.id]['test37_folderNameStoreVideoAudio'] + "/" + "audio.webm";
            }
            
            let vor = 0;
            let ruc = 0;

            for(let p = 2; p <= 7; p++) {
                if ((test37_vars[socket.id]['test37_page' + p + '_selected_words'][0] == 1) ||
                    (test37_vars[socket.id]['test37_page' + p + '_selected_words'][2] == 1)) {
                    vor += test37_vars[socket.id]['test37_page' + p + '_selected_words'][0] == 1 ? 1 : 0;
                    vor += test37_vars[socket.id]['test37_page' + p + '_selected_words'][2] == 1 ? 1 : 0;
                } else
                    break; 
            }

            for(let p = 9; p <= 14; p++) {
                if ((test37_vars[socket.id]['test37_page' + p + '_selected_words'][0] == 1) ||
                    (test37_vars[socket.id]['test37_page' + p + '_selected_words'][2] == 1)) {
                    ruc += test37_vars[socket.id]['test37_page' + p + '_selected_words'][0] == 1 ? 1 : 0;
                    ruc += test37_vars[socket.id]['test37_page' + p + '_selected_words'][2] == 1 ? 1 : 0;
                } else
                    break; 
            }
            
            Test37_Digital_Span.select_by_idSession(test37_vars[socket.id]['idSelectedSession'])
            .then(([test37_digital_span]) => {
                if (test37_digital_span.length == 1) {
                    Test37_Digital_Span.update_by_idSession(test37_vars[socket.id]['idSelectedSession'], record_audio, 
                            vor, ruc)
                    .then(() => {
                        MyJson.updateData(test37_vars[socket.id]['idPathFolder'], test37_vars[socket.id]['pathSession'], "Digital_Span", {
                            "VOR" : vor,
                            "RUC" : ruc,
                            "Audio" : path_record_audio
                        });

                        if (test37_vars[socket.id]['test37_record_audio'] == true) {
                            if (test37_vars[socket.id]['test37_upload_store_media'] == 0) {
                                MyUploadFiles.add_UploadFiles(test37_vars[socket.id]['IDSocket_Patient'], socket.id, "Digital_Span");
                                FileSystem.createFolder(test37_vars[socket.id]['test37_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test37_vars[socket.id]['idSelectedPatient'], "Digital_Span", 
                                                                    test37_vars[socket.id]['test37_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test37', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : 'upload-files' });
                            } else if (test37_vars[socket.id]['test37_upload_store_media'] == 1) {
                                sock.sendData(socket, true, null, 'Test37', { 'type' : 'store-files'});
                                sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : 'store-files', 
                                                                                'id_path_folder' : test37_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test37_vars[socket.id]['pathSession'] });
                            } else if (test37_vars[socket.id]['test37_upload_store_media'] == 2) {
                                MyUploadFiles.add_UploadFiles(test37_vars[socket.id]['IDSocket_Patient'], socket.id, "Digital_Span");
                                FileSystem.createFolder(test37_vars[socket.id]['test37_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test37_vars[socket.id]['idSelectedPatient'], "Digital_Span", 
                                                                            test37_vars[socket.id]['test37_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test37', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : 'upload-store-files', 
                                                                                'id_path_folder' : test37_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test37_vars[socket.id]['pathSession'] });
                            } else if (test37_vars[socket.id]['test37_upload_store_media'] == 3) {
                                sock.sendData(socket, true, null, 'Test37', { 'type' : 'store-files-in-clinician',
                                                                                'id_path_folder' : test37_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test37_vars[socket.id]['pathSession'] });
                                sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : 'store-files-in-clinician' });
                            }
                        } else {
                            sock.sendData(socket, true, null, 'Test37', { 'type' : 'finish' });
                        }

                        delete test37_vars[test37_vars[socket.id]['IDSocket_Patient']];
                        delete test37_vars[socket.id];
                    })
                    .catch(err => console.log(err));
                } else {
                    const test37_Digital_Span = new Test37_Digital_Span(null, test37_vars[socket.id]['idSelectedSession'], record_audio, 
                                vor, ruc);
                    test37_Digital_Span
                    .insert()
                    .then((results) => {
                        MyJson.updateData(test37_vars[socket.id]['idPathFolder'], test37_vars[socket.id]['pathSession'], "Digital_Span", {
                            "VOR" : vor,
                            "RUC" : ruc,
                            "Audio" : path_record_audio
                        });

                        if (test37_vars[socket.id]['test37_record_audio'] == true) {
                            if (test37_vars[socket.id]['test37_upload_store_media'] == 0) {
                                MyUploadFiles.add_UploadFiles(test37_vars[socket.id]['IDSocket_Patient'], socket.id, "Digital_Span");
                                FileSystem.createFolder(test37_vars[socket.id]['test37_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test37_vars[socket.id]['idSelectedPatient'], "Digital_Span", 
                                                                    test37_vars[socket.id]['test37_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test37', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : 'upload-files' });
                            } else if (test37_vars[socket.id]['test37_upload_store_media'] == 1) {
                                sock.sendData(socket, true, null, 'Test37', { 'type' : 'store-files'});
                                sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : 'store-files', 
                                                                                'id_path_folder' : test37_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test37_vars[socket.id]['pathSession'] });
                            } else if (test37_vars[socket.id]['test37_upload_store_media'] == 2) {
                                MyUploadFiles.add_UploadFiles(test37_vars[socket.id]['IDSocket_Patient'], socket.id, "Digital_Span");
                                FileSystem.createFolder(test37_vars[socket.id]['test37_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test37_vars[socket.id]['idSelectedPatient'], "Digital_Span", 
                                                                            test37_vars[socket.id]['test37_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test37', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : 'upload-store-files', 
                                                                                'id_path_folder' : test37_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test37_vars[socket.id]['pathSession'] });
                            } if (test37_vars[socket.id]['test37_upload_store_media'] == 3) {
                                sock.sendData(socket, true, null, 'Test37', { 'type' : 'store-files-in-clinician',
                                                                                'id_path_folder' : test37_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test37_vars[socket.id]['pathSession'] });
                                sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : 'store-files-in-clinician' });
                            }
                        } else {
                            sock.sendData(socket, true, null, 'Test37', { 'type' : 'finish' });
                        }

                        delete test37_vars[test37_vars[socket.id]['IDSocket_Patient']];
                        delete test37_vars[socket.id];
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            
            break;
        }

        case "stop":                         
            sock.sendData(socket, true, null, 'Test37', { 'type' : data['type'] });
            sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : data['type'] });

            delete test37_vars[test37_vars[socket.id]['IDSocket_Patient']];
            delete test37_vars[socket.id];
            break;
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////

function test37_computeVORRUC(socket) {
    let vor = 0;
    let ruc = 0;

    for(let p = 2; p <= 7; p++) {
        if ((test37_vars[socket.id]['test37_page' + p + '_selected_words'][0] == 1) ||
            (test37_vars[socket.id]['test37_page' + p + '_selected_words'][2] == 1)) {
            vor += test37_vars[socket.id]['test37_page' + p + '_selected_words'][0] == 1 ? 1 : 0;
            vor += test37_vars[socket.id]['test37_page' + p + '_selected_words'][2] == 1 ? 1 : 0;
        } else
            break; 
    }

    for(let p = 9; p <= 14; p++) {
        if ((test37_vars[socket.id]['test37_page' + p + '_selected_words'][0] == 1) ||
            (test37_vars[socket.id]['test37_page' + p + '_selected_words'][2] == 1)) {
            ruc += test37_vars[socket.id]['test37_page' + p + '_selected_words'][0] == 1 ? 1 : 0;
            ruc += test37_vars[socket.id]['test37_page' + p + '_selected_words'][2] == 1 ? 1 : 0;
        } else
            break; 
    }

    sock.sendData(socket, true, null, 'Test37', { 'type' : 'show-page', 'page' : 15, 'vor' : vor, 'ruc' : ruc });
    sock.sendData(socket, false, test37_vars[socket.id]['IDSocket_Patient'], 'Test37', { 'type' : 'show-page', 'page' : 15 });
}

function test37_showHideContinuerButton(socket, page) {
    let showContinuer = false;    
    
    if (((test37_vars[socket.id]['test37_page' + page + '_selected_words'][0] == 1) ||
         (test37_vars[socket.id]['test37_page' + page + '_selected_words'][1] == 1)) && 
        ((test37_vars[socket.id]['test37_page' + page + '_selected_words'][2] == 1) ||
         (test37_vars[socket.id]['test37_page' + page + '_selected_words'][3] == 1)))
         showContinuer = true;
    
    if (showContinuer == true) {
        sock.sendData(socket, true, null, 'Test37', { 'type' : 'show-continuer', 'page' : page });        
    } else {
        sock.sendData(socket, true, null, 'Test37', { 'type' : 'hide-continuer', 'page' : page });        
    }
}