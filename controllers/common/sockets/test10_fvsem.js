const FileSystem = require('../filesystem');
const MyGlobals = require('../globals');
const MyUploadFiles = require('../uploadfiles');
const MyJson = require('../json');

const Patient = require('../../../models/patient');
const MySession = require('../../../models/session');
const Test10_FVSEM = require('../../../models/test_fvsem');

const MyRooms = require('../../common/roommanagement');
const sock = require('./senddata');

let test10_vars = {};

exports.test10_fvsem_socket = function(socket, data) {
    switch (data['type']) {
        case "finish":                        
            sock.sendData(socket, true, null, 'Test10', { 'type' : data['type'] });

            delete test10_vars[test10_vars[socket.id]['IDSocket_Patient']];
            delete test10_vars[socket.id];
            break;

        case "minus-erreurs":
            test10_minusErreurs(socket, data['page']);
            break;
        
        case "plus-erreurs":
            test10_plusErreurs(socket, data['page']);
            break;

        case "minus-intrusions":
            test10_minusIntrusions(socket, data['page']);
            break;
        
        case "plus-intrusions":
            test10_plusIntrusions(socket, data['page']);
            break;

        case "minus-oublis-a-mesure":
            test10_minusOublisAMesure(socket, data['page']);
            break;
                
        case "plus-oublis-a-mesure":
            test10_plusOublisAMesure(socket, data['page']);
            break;

        case "minus-reponses":
            test10_minusReponses(socket, data['page']);
            break;
        
        case "plus-reponses":
            test10_plusReponses(socket, data['page']);
            break;

        case "reset-recording":
            if (test10_vars[socket.id]['test10_subTest'] == 'animaux') {
                test10_vars[socket.id]['test10_animaux_record'] = false;
                sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'reset-recording' });
            } else if (test10_vars[socket.id]['test10_subTest'] == 'fruits') {
                test10_vars[socket.id]['test10_fruits_record'] = false;
                sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'reset-recording' });
            }            
            break;

        case 'run-subtest':
            if (test10_vars[socket.id]['test10_subTest'] == 'animaux') {
                test10_vars[socket.id]['test10_animaux_duration'] = 0;
                test10_vars[socket.id]['test10_animaux_reponses'] = 0;
                test10_vars[socket.id]['test10_animaux_intrusions'] = 0;
                test10_vars[socket.id]['test10_animaux_oublis_a_mesure'] = 0;
                test10_vars[socket.id]['test10_animaux_erreurs'] = 0;
                test10_vars[socket.id]['test10_animaux_text_zone'] = "";
                test10_vars[socket.id]['test10_animaux_record'] = false;
            } else if (test10_vars[socket.id]['test10_subTest'] == 'fruits') {
                test10_vars[socket.id]['test10_fruits_duration'] = 0;
                test10_vars[socket.id]['test10_fruits_reponses'] = 0;
                test10_vars[socket.id]['test10_fruits_intrusions'] = 0;
                test10_vars[socket.id]['test10_fruits_oublis_a_mesure'] = 0;
                test10_vars[socket.id]['test10_fruits_erreurs'] = 0;
                test10_vars[socket.id]['test10_fruits_text_zone'] = "";
                test10_vars[socket.id]['test10_fruits_record'] = false;
            }
            sock.sendData(socket, true, null, 'Test10', { 'type' : 'run-subtest', 'value' : test10_vars[socket.id]['test10_subTest'] });    
            break;                        

        case 'select-duration': {
            let page = data['page'];

            if (page == 2) {
                if (test10_vars[socket.id]['test10_animaux_duration'] == data['value']) {
                    test10_vars[socket.id]['test10_animaux_duration'] = 0;
                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'unselect-duration', 'page' : page, 'value' : data['value'] });
                } else {
                    test10_vars[socket.id]['test10_animaux_duration'] = data['value'];
                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'select-duration', 'page' : page, 'value' : data['value'] });
                }
            } else if (page == 5) {
                if (test10_vars[socket.id]['test10_fruits_duration'] == data['value']) {
                    test10_vars[socket.id]['test10_fruits_duration'] = 0;
                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'unselect-duration', 'page' : page, 'value' : data['value'] });
                } else {
                    test10_vars[socket.id]['test10_fruits_duration'] = data['value'];
                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'select-duration', 'page' : page, 'value' : data['value'] });
                }
            }
            break;
        }

        case 'select-subtest':
            if (test10_vars[socket.id]['test10_subTest'] == data['value']) {
                test10_vars[socket.id]['test10_subTest'] = "";
                sock.sendData(socket, true, null, 'Test10', { 'type' : 'unselect-subtest', 'value' : data['value'] });
            } else {
                test10_vars[socket.id]['test10_subTest'] = data['value'];
                sock.sendData(socket, true, null, 'Test10', { 'type' : 'select-subtest', 'value' : data['value'] });
            }
            break;     
            
        case 'show-page': {
            let page = data['page'];

            switch (page) {
                case 2: case 3: case 5: case 6:
                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-page', 'page' : page });
                    break;
                
                case 4: 
                    test10_vars[socket.id]['test10_animaux_text_zone'] = data['text-zone']; 
                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-page', 'page' : page,
                                                             'reponses' : test10_vars[socket.id]['test10_animaux_reponses'],
                                                             'intrusions' : test10_vars[socket.id]['test10_animaux_intrusions'],
                                                             'oublis_a_mesure' : test10_vars[socket.id]['test10_animaux_oublis_a_mesure'],
                                                             'erreurs' : test10_vars[socket.id]['test10_animaux_erreurs'] });
                    break;

                case 7:
                    test10_vars[socket.id]['test10_fruits_text_zone'] = data['text-zone']; 
                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-page', 'page' : page,
                                                             'reponses' : test10_vars[socket.id]['test10_fruits_reponses'],
                                                             'intrusions' : test10_vars[socket.id]['test10_fruits_intrusions'],
                                                             'oublis_a_mesure' : test10_vars[socket.id]['test10_fruits_oublis_a_mesure'],
                                                             'erreurs' : test10_vars[socket.id]['test10_fruits_erreurs'] });
                    break;
            }
            break;
        }

        case 'start':
            let IDSocket_Patient = MyRooms.getIDPatientByIDClinician(socket.id);

            test10_vars[IDSocket_Patient] = socket.id;
            test10_vars[socket.id] = {
                'IDSocket_Clinician' : socket.id,
                'IDSocket_Patient' : IDSocket_Patient,
                'idSelectedSession' : data['idselectedsession'],                
                'pathSession' : null,
                'idPathFolder' : null,
                'idSelectedPatient' : null, 
                'test10_folderNameStoreVideoAudio' : null,
                'test10_upload_store_media' : null,
                'test10_subTest' : "",
                'test10_animaux_duration' : 0,
                'test10_animaux_reponses' : 0,
                'test10_animaux_intrusions' : 0,
                'test10_animaux_oublis_a_mesure' : 0,
                'test10_animaux_erreurs' : 0, 
                'test10_animaux_text_zone' : "",
                'test10_animaux_record' : false,
                'test10_fruits_duration' : 0,
                'test10_fruits_reponses' : 0,
                'test10_fruits_intrusions' : 0,
                'test10_fruits_oublis_a_mesure' : 0,
                'test10_fruits_erreurs' : 0, 
                'test10_fruits_text_zone' : "",
                'test10_fruits_record' : false
            }

            MySession.select_by_id(test10_vars[socket.id]['idSelectedSession'])
            .then(([mysession]) => {
                if (mysession.length == 1) {
                    test10_vars[socket.id]['pathSession'] = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                    Patient.select_by_idUser(mysession[0].id_patient)
                    .then(([patient]) => {
                        if (patient.length == 1) {
                            test10_vars[socket.id]['idSelectedPatient'] = mysession[0].id_patient;
                            test10_vars[socket.id]['idPathFolder'] = patient[0].id_path_folder;
                            test10_vars[socket.id]['test10_folderNameStoreVideoAudio'] = FileSystem.FOLDER_UPLOAD + test10_vars[socket.id]['idPathFolder'] + "/" + test10_vars[socket.id]['pathSession'] + "/FVSEM";
                            test10_vars[socket.id]['test10_upload_store_media'] = patient[0].upload_store_media;

                            sock.sendData(socket, true, null, 'Test10', { 'type' : 'start', 
                                                                          'id_session' : test10_vars[socket.id]['idSelectedSession'],
                                                                          'language' : data['language'],
                                                                          'shortcut' : data['shortcut']
                                                                        });
                            sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'start'});
                        }
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            break;

        case 'start-recording':
            if (test10_vars[socket.id]['test10_subTest'] == 'animaux') {
                test10_vars[socket.id]['test10_animaux_record'] = true;
                sock.sendData(socket, true, null, 'Test10', { 'type' : 'start-recording' });
                sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'start-recording' });
            } else if (test10_vars[socket.id]['test10_subTest'] == 'fruits') {
                test10_vars[socket.id]['test10_fruits_record'] = true;
                sock.sendData(socket, true, null, 'Test10', { 'type' : 'start-recording' });
                sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'start-recording' });
            }
            break;

        case "stop":                         
            sock.sendData(socket, true, null, 'Test10', { 'type' : data['type'] });
            sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : data['type'] });

            delete test10_vars[test10_vars[socket.id]['IDSocket_Patient']];
            delete test10_vars[socket.id];
            break;

        case "store-values":
            Test10_FVSEM.select_testDone_by_idSession(test10_vars[socket.id]['idSelectedSession'])
            .then(([test10_fvsem]) => {
                if (test10_fvsem.length == 1) {
                    let test_done = test10_fvsem[0].test_done;                                 
    
                    if (test10_vars[socket.id]['test10_subTest'] == 'animaux') {
                        test_done = test_done | 2;

                        let strVideo = "";
                        let videoExist = 0;

                        if (test10_vars[socket.id]['test10_animaux_record']) {
                            strVideo = "P-video_Animaux.webm";
                            videoExist = 1;
                        }
                            
                        Test10_FVSEM.update_animaux_by_idSession(test10_vars[socket.id]['idSelectedSession'], test_done, 
                                            test10_vars[socket.id]['test10_animaux_duration'], test10_vars[socket.id]['test10_animaux_reponses'],
                                            test10_vars[socket.id]['test10_animaux_intrusions'], test10_vars[socket.id]['test10_animaux_oublis_a_mesure'], 
                                            test10_vars[socket.id]['test10_animaux_erreurs'], test10_vars[socket.id]['test10_animaux_text_zone'], videoExist)
                        .then((results) => {                            
                            MyJson.updateData(test10_vars[socket.id]['idPathFolder'], test10_vars[socket.id]['pathSession'], "FVSEM", { 
                                "Animaux_Duree" : test10_vars[socket.id]['test10_animaux_duration'],
                                "Animaux_Reponses" : test10_vars[socket.id]['test10_animaux_reponses'],
                                "Animaux_Intrusions" : test10_vars[socket.id]['test10_animaux_intrusions'],
                                "Animaux_Oublis_A_Mesure" : test10_vars[socket.id]['test10_animaux_oublis_a_mesure'],
                                "Animaux_Erreurs" : test10_vars[socket.id]['test10_animaux_erreurs'],
                                "Animaux_Text_Zone" : test10_vars[socket.id]['test10_animaux_text_zone'],
                                "Animaux_Video" : test10_vars[socket.id]['test10_animaux_record'] == true ? test10_vars[socket.id]['test10_folderNameStoreVideoAudio'] + "/" + strVideo : ""
                            });

                            if (test10_vars[socket.id]['test10_animaux_record']) {   
                                if (test10_vars[socket.id]['test10_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test10_vars[socket.id]['IDSocket_Patient'], socket.id, "FVSEM");
                                    FileSystem.createFolder(test10_vars[socket.id]['test10_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test10_vars[socket.id]['idSelectedPatient'], "FVSEM", 
                                                                            test10_vars[socket.id]['test10_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'upload-files', 'sub-test' : test10_vars[socket.id]['test10_subTest'] });
                                } else if (test10_vars[socket.id]['test10_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'store-files'});
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'store-files', 
                                                                                            'sub-test' : test10_vars[socket.id]['test10_subTest'], 
                                                                                            'id_path_folder' : test10_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test10_vars[socket.id]['pathSession'] });
                                } else if (test10_vars[socket.id]['test10_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test10_vars[socket.id]['IDSocket_Patient'], socket.id, "FVSEM");
                                    FileSystem.createFolder(test10_vars[socket.id]['test10_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test10_vars[socket.id]['idSelectedPatient'], "FVSEM", 
                                                                            test10_vars[socket.id]['test10_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'upload-store-files', 
                                                                                            'sub-test' : test10_vars[socket.id]['test10_subTest'], 
                                                                                            'id_path_folder' : test10_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test10_vars[socket.id]['pathSession'] });
                                } else if (test10_vars[socket.id]['test10_upload_store_media'] == 3) {                                                                        
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'store-files-in-clinician',
                                                                                    'sub-test' : test10_vars[socket.id]['test10_subTest'],
                                                                                    'id_path_folder' : test10_vars[socket.id]['idPathFolder'], 
                                                                                    'path_session' : test10_vars[socket.id]['pathSession'] });
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'store-files-in-clinician' });
                                }
                            } else {
                                test10_vars[socket.id]['test10_subTest'] = "";                        
                                sock.sendData(socket, true, null, 'Test10', { 'type' : 'finish_animaux' }); 
                            } 
                        })
                        .catch(err => console.log(err));
                    } else if (test10_vars[socket.id]['test10_subTest'] == 'fruits') {
                        test_done = test_done | 1; 
                        
                        let strVideo = "";
                        let videoExist = 0;

                        if (test10_vars[socket.id]['test10_fruits_record']) {
                            strVideo = "P-video_Fruits.webm";
                            videoExist = 1;
                        }   
                        
                        Test10_FVSEM.update_fruits_by_idSession(test10_vars[socket.id]['idSelectedSession'], test_done, 
                                                test10_vars[socket.id]['test10_fruits_duration'], test10_vars[socket.id]['test10_fruits_reponses'],
                                                test10_vars[socket.id]['test10_fruits_intrusions'], test10_vars[socket.id]['test10_fruits_oublis_a_mesure'], 
                                                test10_vars[socket.id]['test10_fruits_erreurs'], test10_vars[socket.id]['test10_fruits_text_zone'], videoExist)
                        .then((results) => {
                            MyJson.updateData(test10_vars[socket.id]['idPathFolder'], test10_vars[socket.id]['pathSession'], "FVSEM", { 
                                "Fruits_Duree" : test10_vars[socket.id]['test10_fruits_duration'],
                                "Fruits_Reponses" : test10_vars[socket.id]['test10_fruits_reponses'],
                                "Fruits_Intrusions" : test10_vars[socket.id]['test10_fruits_intrusions'],
                                "Fruits_Oublis_A_Mesure" : test10_vars[socket.id]['test10_fruits_oublis_a_mesure'],
                                "Fruits_Erreurs" : test10_vars[socket.id]['test10_fruits_erreurs'],
                                "Fruits_Text_Zone" : test10_vars[socket.id]['test10_fruits_text_zone'],
                                "Fruits_Video" : test10_vars[socket.id]['test10_fruits_record'] == true ? test10_vars[socket.id]['test10_folderNameStoreVideoAudio']+ "/" + strVideo : ""
                            });

                            if (test10_vars[socket.id]['test10_fruits_record']) {   
                                if (test10_vars[socket.id]['test10_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test10_vars[socket.id]['IDSocket_Patient'], socket.id, "FVSEM");
                                    FileSystem.createFolder(test10_vars[socket.id]['test10_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test10_vars[socket.id]['idSelectedPatient'], "FVSEM", 
                                                                            test10_vars[socket.id]['test10_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'upload-files', 'sub-test' : test10_vars[socket.id]['test10_subTest'] });
                                } else if (test10_vars[socket.id]['test10_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'store-files'});
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'store-files', 
                                                                                            'sub-test' : test10_vars[socket.id]['test10_subTest'], 
                                                                                            'id_path_folder' : test10_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test10_vars[socket.id]['pathSession'] });
                                } else if (test10_vars[socket.id]['test10_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test10_vars[socket.id]['IDSocket_Patient'], socket.id, "FVSEM");
                                    FileSystem.createFolder(test10_vars[socket.id]['test10_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test10_vars[socket.id]['idSelectedPatient'], "FVSEM", 
                                                                            test10_vars[socket.id]['test10_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'upload-store-files', 
                                                                                            'sub-test' : test10_vars[socket.id]['test10_subTest'], 
                                                                                            'id_path_folder' : test10_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test10_vars[socket.id]['pathSession'] });
                                } else if (test10_vars[socket.id]['test10_upload_store_media'] == 3) {                                                                        
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'store-files-in-clinician',
                                                                                    'sub-test' : test10_vars[socket.id]['test10_subTest'],
                                                                                    'id_path_folder' : test10_vars[socket.id]['idPathFolder'], 
                                                                                    'path_session' : test10_vars[socket.id]['pathSession'] });
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'store-files-in-clinician' });
                                }
                            } else {
                                test10_vars[socket.id]['test10_subTest'] = "";                        
                                sock.sendData(socket, true, null, 'Test10', { 'type' : 'finish_fruits' }); 
                            } 
                        })
                        .catch(err => console.log(err));
                    }
                } else {                                
                    let test10_FVSEM = null;                    
                    let strVideo = "";
                    let videoExist = 0;
    
                    if (test10_vars[socket.id]['test10_subTest'] == 'animaux') {
                        let test_done = 2; // 10       
                        
                        if (test10_vars[socket.id]['test10_animaux_record']) {
                            strVideo = "P-video_Animaux.webm";
                            videoExist = 1;                        }


                        test10_FVSEM = new Test10_FVSEM(null, test10_vars[socket.id]['idSelectedSession'], test_done, 
                                                test10_vars[socket.id]['test10_animaux_duration'], test10_vars[socket.id]['test10_animaux_reponses'],
                                                test10_vars[socket.id]['test10_animaux_intrusions'], test10_vars[socket.id]['test10_animaux_oublis_a_mesure'], 
                                                test10_vars[socket.id]['test10_animaux_erreurs'], test10_vars[socket.id]['test10_animaux_text_zone'], 
                                                videoExist, 0, 0, 0, 0, 0, "", 0);
                    } else if (test10_vars[socket.id]['test10_subTest'] == 'fruits') {
                        test_done = 1; // 01
                        
                        if (test10_vars[socket.id]['test10_fruits_record']) {
                            strVideo = "P-video_Fruits.webm";
                            videoExist = 1;
                        }                        

                        test10_FVSEM = new Test10_FVSEM(null, test10_vars[socket.id]['idSelectedSession'], test_done, 
                                                0, 0, 0, 0, 0, "", 0, 
                                                test10_vars[socket.id]['test10_fruits_duration'], test10_vars[socket.id]['test10_fruits_reponses'], 
                                                test10_vars[socket.id]['test10_fruits_intrusions'], test10_vars[socket.id]['test10_fruits_oublis_a_mesure'], 
                                                test10_vars[socket.id]['test10_fruits_erreurs'], test10_vars[socket.id]['test10_fruits_text_zone'], videoExist);
                    }
            
                    test10_FVSEM
                    .insert()
                    .then((results) => {        
                        if (test10_vars[socket.id]['test10_subTest'] == 'animaux') {                                    
                            MyJson.updateData(test10_vars[socket.id]['idPathFolder'], test10_vars[socket.id]['pathSession'], "FVSEM", { 
                                "Animaux_Duree" : test10_vars[socket.id]['test10_animaux_duration'],
                                "Animaux_Reponses" : test10_vars[socket.id]['test10_animaux_reponses'],
                                "Animaux_Intrusions" : test10_vars[socket.id]['test10_animaux_intrusions'],
                                "Animaux_Oublis_A_Mesure" : test10_vars[socket.id]['test10_animaux_oublis_a_mesure'],
                                "Animaux_Erreurs" : test10_vars[socket.id]['test10_animaux_erreurs'],
                                "Animaux_Text_Zone" : test10_vars[socket.id]['test10_animaux_text_zone'],
                                "Animaux_Video" : test10_vars[socket.id]['test10_animaux_record'] == true ? test10_vars[socket.id]['test10_folderNameStoreVideoAudio'] + "/" + strVideo : ""
                            });

                            if (test10_vars[socket.id]['test10_animaux_record']) {   
                                if (test10_vars[socket.id]['test10_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test10_vars[socket.id]['IDSocket_Patient'], socket.id, "FVSEM");
                                    FileSystem.createFolder(test10_vars[socket.id]['test10_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test10_vars[socket.id]['idSelectedPatient'], "FVSEM", 
                                                                            test10_vars[socket.id]['test10_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'upload-files', 'sub-test' : test10_vars[socket.id]['test10_subTest'] });
                                } else if (test10_vars[socket.id]['test10_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'store-files'});
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'store-files', 
                                                                                            'sub-test' : test10_vars[socket.id]['test10_subTest'], 
                                                                                            'id_path_folder' : test10_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test10_vars[socket.id]['pathSession'] });
                                } else if (test10_vars[socket.id]['test10_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test10_vars[socket.id]['IDSocket_Patient'], socket.id, "FVSEM");
                                    FileSystem.createFolder(test10_vars[socket.id]['test10_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test10_vars[socket.id]['idSelectedPatient'], "FVSEM", 
                                                                            test10_vars[socket.id]['test10_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'upload-store-files', 
                                                                                            'sub-test' : test10_vars[socket.id]['test10_subTest'], 
                                                                                            'id_path_folder' : test10_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test10_vars[socket.id]['pathSession'] });
                                } else if (test10_vars[socket.id]['test10_upload_store_media'] == 3) {                                                                        
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'store-files-in-clinician',
                                                                                    'sub-test' : test10_vars[socket.id]['test10_subTest'],
                                                                                    'id_path_folder' : test10_vars[socket.id]['idPathFolder'], 
                                                                                    'path_session' : test10_vars[socket.id]['pathSession'] });
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'store-files-in-clinician' });
                                }
                            } else {
                                test10_vars[socket.id]['test10_subTest'] = "";                        
                                sock.sendData(socket, true, null, 'Test10', { 'type' : 'finish_animaux' }); 
                            }                            
                        } else if (test10_vars[socket.id]['test10_subTest'] == 'fruits') {
                            MyJson.updateData(test10_vars[socket.id]['idPathFolder'], test10_vars[socket.id]['pathSession'], "FVSEM", { 
                                "Fruits_Duree" : test10_vars[socket.id]['test10_fruits_duration'],
                                "Fruits_Reponses" : test10_vars[socket.id]['test10_fruits_reponses'],
                                "Fruits_Intrusions" : test10_vars[socket.id]['test10_fruits_intrusions'],
                                "Fruits_Oublis_A_Mesure" : test10_vars[socket.id]['test10_fruits_oublis_a_mesure'],
                                "Fruits_Erreurs" : test10_vars[socket.id]['test10_fruits_erreurs'],
                                "Fruits_Text_Zone" : test10_vars[socket.id]['test10_fruits_text_zone'],
                                "Fruits_Video" : test10_vars[socket.id]['test10_fruits_record'] == true ? test10_vars[socket.id]['test10_folderNameStoreVideoAudio'] + "/" + strVideo : ""
                            });

                            if (test10_vars[socket.id]['test10_fruits_record']) {   
                                if (test10_vars[socket.id]['test10_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test10_vars[socket.id]['IDSocket_Patient'], socket.id, "FVSEM");
                                    FileSystem.createFolder(test10_vars[socket.id]['test10_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test10_vars[socket.id]['idSelectedPatient'], "FVSEM", 
                                                                            test10_vars[socket.id]['test10_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'upload-files', 'sub-test' : test10_vars[socket.id]['test10_subTest'] });
                                } else if (test10_vars[socket.id]['test10_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'store-files'});
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'store-files', 
                                                                                            'sub-test' : test10_vars[socket.id]['test10_subTest'], 
                                                                                            'id_path_folder' : test10_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test10_vars[socket.id]['pathSession'] });
                                } else if (test10_vars[socket.id]['test10_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test10_vars[socket.id]['IDSocket_Patient'], socket.id, "FVSEM");
                                    FileSystem.createFolder(test10_vars[socket.id]['test10_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test10_vars[socket.id]['idSelectedPatient'], "FVSEM", 
                                                                            test10_vars[socket.id]['test10_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'upload-store-files', 
                                                                                            'sub-test' : test10_vars[socket.id]['test10_subTest'], 
                                                                                            'id_path_folder' : test10_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test10_vars[socket.id]['pathSession'] });
                                } else if (test10_vars[socket.id]['test10_upload_store_media'] == 3) {                                                                        
                                    sock.sendData(socket, true, null, 'Test10', { 'type' : 'store-files-in-clinician',
                                                                                    'sub-test' : test10_vars[socket.id]['test10_subTest'],
                                                                                    'id_path_folder' : test10_vars[socket.id]['idPathFolder'], 
                                                                                    'path_session' : test10_vars[socket.id]['pathSession'] });
                                    sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'store-files-in-clinician' });
                                }
                            } else {
                                test10_vars[socket.id]['test10_subTest'] = "";                        
                                sock.sendData(socket, true, null, 'Test10', { 'type' : 'finish_fruits' }); 
                            }
                        }
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            break;

        case 'stop-recording':
            sock.sendData(socket, false, test10_vars[socket.id]['IDSocket_Patient'], 'Test10', { 'type' : 'stop-recording' });
            break;
    }
};

function test10_minusReponses(socket, page) {    
    if (page == 3) {    
        if (test10_vars[socket.id]['test10_animaux_reponses'] > 0) {
            test10_vars[socket.id]['test10_animaux_reponses']--;
        }            
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-reponses', 'page' : page, 'value' : test10_vars[socket.id]['test10_animaux_reponses'] });
    } else if (page == 6) {
        if (test10_vars[socket.id]['test10_fruits_reponses'] > 0) {
            test10_vars[socket.id]['test10_fruits_reponses']--;
        }            
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-reponses', 'page' : page, 'value' : test10_vars[socket.id]['test10_fruits_reponses'] });
    }
}

function test10_plusReponses(socket, page) {
    if (page == 3) {    
        test10_vars[socket.id]['test10_animaux_reponses']++;
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-reponses', 'page' : page, 'value' : test10_vars[socket.id]['test10_animaux_reponses'] });
    } else if (page == 6) {
        test10_vars[socket.id]['test10_fruits_reponses']++;
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-reponses', 'page' : page, 'value' : test10_vars[socket.id]['test10_fruits_reponses'] });
    }
}

function test10_minusIntrusions(socket, page) {    
    if (page == 3) {    
        if (test10_vars[socket.id]['test10_animaux_intrusions'] > 0) {
            test10_vars[socket.id]['test10_animaux_intrusions']--;
        }            
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-intrusions', 'page' : page, 'value' : test10_vars[socket.id]['test10_animaux_intrusions'] });
    } else if (page == 6) {
        if (test10_vars[socket.id]['test10_fruits_intrusions'] > 0) {
            test10_vars[socket.id]['test10_fruits_intrusions']--;
        }            
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-intrusions', 'page' : page, 'value' : test10_vars[socket.id]['test10_fruits_intrusions'] });
    }    
}

function test10_plusIntrusions(socket, page) {   
    if (page == 3) {    
        test10_vars[socket.id]['test10_animaux_intrusions']++;
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-intrusions', 'page' : page, 'value' : test10_vars[socket.id]['test10_animaux_intrusions'] });
    } else if (page == 6) {
        test10_vars[socket.id]['test10_fruits_intrusions']++;
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-intrusions', 'page' : page, 'value' : test10_vars[socket.id]['test10_fruits_intrusions'] });
    } 
}

function test10_minusOublisAMesure(socket, page) {    
    if (page == 3) {    
        if (test10_vars[socket.id]['test10_animaux_oublis_a_mesure'] > 0) {
            test10_vars[socket.id]['test10_animaux_oublis_a_mesure']--;
        }            
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-oublis-a-mesure', 'page' : page, 'value' : test10_vars[socket.id]['test10_animaux_oublis_a_mesure'] });
    } else if (page == 6) {
        if (test10_vars[socket.id]['test10_fruits_oublis_a_mesure'] > 0) {
            test10_vars[socket.id]['test10_fruits_oublis_a_mesure']--;
        }            
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-oublis-a-mesure', 'page' : page, 'value' : test10_vars[socket.id]['test10_fruits_oublis_a_mesure'] });
    }
}

function test10_plusOublisAMesure(socket, page) {        
    if (page == 3) {    
        test10_vars[socket.id]['test10_animaux_oublis_a_mesure']++;
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-oublis-a-mesure', 'page' : page, 'value' : test10_vars[socket.id]['test10_animaux_oublis_a_mesure'] });
    } else if (page == 6) {
        test10_vars[socket.id]['test10_fruits_oublis_a_mesure']++;
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-oublis-a-mesure', 'page' : page, 'value' : test10_vars[socket.id]['test10_fruits_oublis_a_mesure'] });
    }
}

function test10_minusErreurs(socket, page) {    
    if (page == 3) {    
        if (test10_vars[socket.id]['test10_animaux_erreurs'] > 0) {
            test10_vars[socket.id]['test10_animaux_erreurs']--;
        }            
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-erreurs', 'page' : page, 'value' : test10_vars[socket.id]['test10_animaux_erreurs'] });
    } else if (page == 6) {
        if (test10_vars[socket.id]['test10_fruits_erreurs'] > 0) {
            test10_vars[socket.id]['test10_fruits_erreurs']--;
        }            
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-erreurs', 'page' : page, 'value' : test10_vars[socket.id]['test10_fruits_erreurs'] });
    }
}

function test10_plusErreurs(socket, page) {
    if (page == 3) {    
        test10_vars[socket.id]['test10_animaux_erreurs']++;
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-erreurs', 'page' : page, 'value' : test10_vars[socket.id]['test10_animaux_erreurs'] });
    } else if (page == 6) {
        test10_vars[socket.id]['test10_fruits_erreurs']++;
        sock.sendData(socket, true, null, 'Test10', { 'type' : 'show-erreurs', 'page' : page, 'value' : test10_vars[socket.id]['test10_fruits_erreurs'] });
    }
}

