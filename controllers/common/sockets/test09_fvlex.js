const FileSystem = require('../filesystem');
const MyGlobals = require('../globals');
const MyUploadFiles = require('../uploadfiles');
const MyJson = require('../json');

const Patient = require('../../../models/patient');
const MySession = require('../../../models/session');
const Test09_FVLEX = require('../../../models/test_fvlex');

const MyRooms = require('../../common/roommanagement');
const sock = require('./senddata');

let test09_vars = {};

exports.test09_fvlex_socket = function(socket, data) {
    switch (data['type']) {
        case "finish":                        
            sock.sendData(socket, true, null, 'Test09', { 'type' : data['type'] });

            delete test09_vars[test09_vars[socket.id]['IDSocket_Patient']];
            delete test09_vars[socket.id];
            break;

        case "minus-erreurs":
            test09_minusErreurs(socket, data['page']);
            break;
        
        case "plus-erreurs":
            test09_plusErreurs(socket, data['page']);
            break;

        case "minus-intrusions":
            test09_minusIntrusions(socket, data['page']);
            break;
        
        case "plus-intrusions":
            test09_plusIntrusions(socket, data['page']);
            break;

        case "minus-oublis-a-mesure":
            test09_minusOublisAMesure(socket, data['page']);
            break;
                
        case "plus-oublis-a-mesure":
            test09_plusOublisAMesure(socket, data['page']);
            break;

        case "minus-reponses":
            test09_minusReponses(socket, data['page']);
            break;
        
        case "plus-reponses":
            test09_plusReponses(socket, data['page']);
            break;

        case "reset-recording":
            if (test09_vars[socket.id]['test09_subTest'] == 'p')
                test09_vars[socket.id]['test09_p_record'] = false;
            else if (test09_vars[socket.id]['test09_subTest'] == 'r')
                test09_vars[socket.id]['test09_r_record'] = false;                

            sock.sendData(socket, true, null, 'Test09', { 'type' : 'reset-recording' });
            sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'reset-recording' });
            break;

        case 'run-subtest':
            if (test09_vars[socket.id]['test09_subTest'] == 'p') {
                test09_vars[socket.id]['test09_p_duration'] = 0;
                test09_vars[socket.id]['test09_p_reponses'] = 0;
                test09_vars[socket.id]['test09_p_intrusions'] = 0;
                test09_vars[socket.id]['test09_p_oublis_a_mesure'] = 0;
                test09_vars[socket.id]['test09_p_erreurs'] = 0;
                test09_vars[socket.id]['test09_p_text_zone'] = "";
                test09_vars[socket.id]['test09_p_record'] = false;
            } else if (test09_vars[socket.id]['test09_subTest'] == 'r') {
                test09_vars[socket.id]['test09_r_duration'] = 0;
                test09_vars[socket.id]['test09_r_reponses'] = 0;
                test09_vars[socket.id]['test09_r_intrusions'] = 0;
                test09_vars[socket.id]['test09_r_oublis_a_mesure'] = 0;
                test09_vars[socket.id]['test09_r_erreurs'] = 0;
                test09_vars[socket.id]['test09_r_text_zone'] = "";
                test09_vars[socket.id]['test09_r_record'] = false;
            }
            sock.sendData(socket, true, null, 'Test09', { 'type' : 'run-subtest', 'value' : test09_vars[socket.id]['test09_subTest'] });    
            break;                        

        case 'select-duration': {
            let page = data['page'];

            if (page == 2) {
                if (test09_vars[socket.id]['test09_p_duration'] == data['value']) {
                    test09_vars[socket.id]['test09_p_duration'] = 0;
                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'unselect-duration', 'page' : page, 'value' : data['value'] });
                } else {
                    test09_vars[socket.id]['test09_p_duration'] = data['value'];
                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'select-duration', 'page' : page, 'value' : data['value'] });
                }
            } else if (page == 5) {
                if (test09_vars[socket.id]['test09_r_duration'] == data['value']) {
                    test09_vars[socket.id]['test09_r_duration'] = 0;
                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'unselect-duration', 'page' : page, 'value' : data['value'] });
                } else {
                    test09_vars[socket.id]['test09_r_duration'] = data['value'];
                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'select-duration', 'page' : page, 'value' : data['value'] });
                }
            }
            break;
        }

        case 'select-subtest':
            if (test09_vars[socket.id]['test09_subTest'] == data['value']) {
                test09_vars[socket.id]['test09_subTest'] = "";
                sock.sendData(socket, true, null, 'Test09', { 'type' : 'unselect-subtest', 'value' : data['value'] });
            } else {
                test09_vars[socket.id]['test09_subTest'] = data['value'];
                sock.sendData(socket, true, null, 'Test09', { 'type' : 'select-subtest', 'value' : data['value'] });
            }
            break;     
            
        case 'show-page': {
            let page = data['page'];

            switch (page) {
                case 2: case 3: case 5: case 6:
                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-page', 'page' : page });
                    break;
                
                case 4: 
                    test09_vars[socket.id]['test09_p_text_zone'] = data['text-zone']; 
                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-page', 'page' : page,
                                                             'reponses' : test09_vars[socket.id]['test09_p_reponses'],
                                                             'intrusions' : test09_vars[socket.id]['test09_p_intrusions'],
                                                             'oublis_a_mesure' : test09_vars[socket.id]['test09_p_oublis_a_mesure'],
                                                             'erreurs' : test09_vars[socket.id]['test09_p_erreurs'] });
                    break;

                case 7:
                    test09_vars[socket.id]['test09_r_text_zone'] = data['text-zone']; 
                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-page', 'page' : page,
                                                             'reponses' : test09_vars[socket.id]['test09_r_reponses'],
                                                             'intrusions' : test09_vars[socket.id]['test09_r_intrusions'],
                                                             'oublis_a_mesure' : test09_vars[socket.id]['test09_r_oublis_a_mesure'],
                                                             'erreurs' : test09_vars[socket.id]['test09_r_erreurs'] });
                    break;
            }
            break;
        }

        case 'start':
            let IDSocket_Patient = MyRooms.getIDPatientByIDClinician(socket.id);

            test09_vars[IDSocket_Patient] = socket.id;
            test09_vars[socket.id] = {
                'IDSocket_Clinician' : socket.id,
                'IDSocket_Patient' : IDSocket_Patient,
                'idSelectedSession' : data['idselectedsession'],                
                'pathSession' : null,
                'idPathFolder' : null,
                'idSelectedPatient' : null, 
                'test09_folderNameStoreVideoAudio' : null,
                'test09_upload_store_media' : null,
                'test09_subTest' : "",
                'test09_p_duration' : 0,
                'test09_p_reponses' : 0,
                'test09_p_intrusions' : 0,
                'test09_p_oublis_a_mesure' : 0,
                'test09_p_erreurs' : 0, 
                'test09_p_text_zone' : "",
                'test09_p_record' : false,
                'test09_r_duration' : 0,
                'test09_r_reponses' : 0,
                'test09_r_intrusions' : 0,
                'test09_r_oublis_a_mesure' : 0,
                'test09_r_erreurs' : 0, 
                'test09_r_text_zone' : "",
                'test09_r_record' : false
            }

            MySession.select_by_id(test09_vars[socket.id]['idSelectedSession'])
            .then(([mysession]) => {
                if (mysession.length == 1) {
                    test09_vars[socket.id]['pathSession'] = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                    Patient.select_by_idUser(mysession[0].id_patient)
                    .then(([patient]) => {
                        if (patient.length == 1) {
                            test09_vars[socket.id]['idSelectedPatient'] = mysession[0].id_patient;
                            test09_vars[socket.id]['idPathFolder'] = patient[0].id_path_folder;
                            test09_vars[socket.id]['test09_folderNameStoreVideoAudio'] = FileSystem.FOLDER_UPLOAD + test09_vars[socket.id]['idPathFolder'] + "/" + test09_vars[socket.id]['pathSession'] + "/FVLEX";
                            test09_vars[socket.id]['test09_upload_store_media'] = patient[0].upload_store_media;

                            sock.sendData(socket, true, null, 'Test09', { 'type' : 'start', 
                                                                          'id_session' : test09_vars[socket.id]['idSelectedSession'],
                                                                          'language' : data['language'],
                                                                          'shortcut' : data['shortcut']
                                                                        });
                            sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'start'});
                        }
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            break;

        case 'start-recording':
            if (test09_vars[socket.id]['test09_subTest'] == 'p') {
                test09_vars[socket.id]['test09_p_record'] = true;
                sock.sendData(socket, true, null, 'Test09', { 'type' : 'start-recording' });
                sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'start-recording' });
            } else if (test09_vars[socket.id]['test09_subTest'] == 'r') {
                test09_vars[socket.id]['test09_r_record'] = true;
                sock.sendData(socket, true, null, 'Test09', { 'type' : 'start-recording' });
                sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'start-recording' });
            }
            break;

        case "stop":                         
            sock.sendData(socket, true, null, 'Test09', { 'type' : data['type'] });
            sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : data['type'] });

            delete test09_vars[test09_vars[socket.id]['IDSocket_Patient']];
            delete test09_vars[socket.id];
            break;

        case "store-values":
            Test09_FVLEX.select_testDone_by_idSession(test09_vars[socket.id]['idSelectedSession'])
            .then(([test09_fvlex]) => {
                if (test09_fvlex.length == 1) {
                    let test_done = test09_fvlex[0].test_done;                                
    
                    if (test09_vars[socket.id]['test09_subTest'] == 'p') {
                        test_done = test_done | 2;

                        let strVideo = "";
                        let videoExist = 0;

                        if (test09_vars[socket.id]['test09_p_record']) {
                            strVideo = "P-video_P.webm";
                            videoExist = 1;
                        }
                            
                        Test09_FVLEX.update_p_by_idSession(test09_vars[socket.id]['idSelectedSession'], test_done, 
                                            test09_vars[socket.id]['test09_p_duration'], test09_vars[socket.id]['test09_p_reponses'],
                                            test09_vars[socket.id]['test09_p_intrusions'], test09_vars[socket.id]['test09_p_oublis_a_mesure'], 
                                            test09_vars[socket.id]['test09_p_erreurs'], test09_vars[socket.id]['test09_p_text_zone'], videoExist)
                        .then((results) => {                            
                            MyJson.updateData(test09_vars[socket.id]['idPathFolder'], test09_vars[socket.id]['pathSession'], "FVLEX", { 
                                "Lettre_P_Duree" : test09_vars[socket.id]['test09_p_duration'],
                                "Lettre_P_Reponses" : test09_vars[socket.id]['test09_p_reponses'],
                                "Lettre_P_Intrusions" : test09_vars[socket.id]['test09_p_intrusions'],
                                "Lettre_P_Oublis_A_Mesure" : test09_vars[socket.id]['test09_p_oublis_a_mesure'],
                                "Lettre_P_Erreurs" : test09_vars[socket.id]['test09_p_erreurs'],
                                "Lettre_P_Text_Zone" : test09_vars[socket.id]['test09_p_text_zone'],
                                "Lettre_P_Video" : test09_vars[socket.id]['test09_p_record'] == true ? test09_vars[socket.id]['test09_folderNameStoreVideoAudio'] + "/" + strVideo : ""
                            });

                            if (test09_vars[socket.id]['test09_p_record']) {   
                                if (test09_vars[socket.id]['test09_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test09_vars[socket.id]['IDSocket_Patient'], socket.id, "FVLEX");
                                    FileSystem.createFolder(test09_vars[socket.id]['test09_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test09_vars[socket.id]['idSelectedPatient'], "FVLEX", 
                                                                            test09_vars[socket.id]['test09_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'upload-files', 'sub-test' : test09_vars[socket.id]['test09_subTest'] });
                                } else if (test09_vars[socket.id]['test09_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'store-files'});
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'store-files', 
                                                                                            'sub-test' : test09_vars[socket.id]['test09_subTest'], 
                                                                                            'id_path_folder' : test09_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test09_vars[socket.id]['pathSession'] });
                                } else if (test09_vars[socket.id]['test09_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test09_vars[socket.id]['IDSocket_Patient'], socket.id, "FVLEX");
                                    FileSystem.createFolder(test09_vars[socket.id]['test09_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test09_vars[socket.id]['idSelectedPatient'], "FVLEX", 
                                                                            test09_vars[socket.id]['test09_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'upload-store-files', 
                                                                                            'sub-test' : test09_vars[socket.id]['test09_subTest'], 
                                                                                            'id_path_folder' : test09_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test09_vars[socket.id]['pathSession'] });
                                } else if (test09_vars[socket.id]['test09_upload_store_media'] == 3) {                                                                        
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'store-files-in-clinician',
                                                                                    'sub-test' : test09_vars[socket.id]['test09_subTest'],
                                                                                    'id_path_folder' : test09_vars[socket.id]['idPathFolder'], 
                                                                                    'path_session' : test09_vars[socket.id]['pathSession'] });
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'store-files-in-clinician' });
                                }                        
                            } else {
                                test09_vars[socket.id]['test09_subTest'] = "";                        
                                sock.sendData(socket, true, null, 'Test09', { 'type' : 'finish_p' }); 
                            }                            
                        })
                        .catch(err => console.log(err));
                    } else if (test09_vars[socket.id]['test09_subTest'] == 'r') {
                        test_done = test_done | 1; 
                        
                        let strVideo = "";
                        let videoExist = 0;

                        if (test09_vars[socket.id]['test09_r_record']) {
                            strVideo = "P-video_R.webm";
                            videoExist = 1;
                        }   
                        
                        Test09_FVLEX.update_r_by_idSession(test09_vars[socket.id]['idSelectedSession'], test_done, 
                                                test09_vars[socket.id]['test09_r_duration'], test09_vars[socket.id]['test09_r_reponses'],
                                                test09_vars[socket.id]['test09_r_intrusions'], test09_vars[socket.id]['test09_r_oublis_a_mesure'], 
                                                test09_vars[socket.id]['test09_r_erreurs'], test09_vars[socket.id]['test09_r_text_zone'], videoExist)
                        .then((results) => {
                            MyJson.updateData(test09_vars[socket.id]['idPathFolder'], test09_vars[socket.id]['pathSession'], "FVLEX", { 
                                "Lettre_R_Duree" : test09_vars[socket.id]['test09_r_duration'],
                                "Lettre_R_Reponses" : test09_vars[socket.id]['test09_r_reponses'],
                                "Lettre_R_Intrusions" : test09_vars[socket.id]['test09_r_intrusions'],
                                "Lettre_R_Oublis_A_Mesure" : test09_vars[socket.id]['test09_r_oublis_a_mesure'],
                                "Lettre_R_Erreurs" : test09_vars[socket.id]['test09_r_erreurs'],
                                "Lettre_R_Text_Zone" : test09_vars[socket.id]['test09_r_text_zone'],
                                "Lettre_R_Video" : test09_vars[socket.id]['test09_r_record'] == true ? test09_vars[socket.id]['test09_folderNameStoreVideoAudio']+ "/" + strVideo : ""
                            });

                            if (test09_vars[socket.id]['test09_r_record']) {   
                                if (test09_vars[socket.id]['test09_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test09_vars[socket.id]['IDSocket_Patient'], socket.id, "FVLEX");
                                    FileSystem.createFolder(test09_vars[socket.id]['test09_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test09_vars[socket.id]['idSelectedPatient'], "FVLEX", 
                                                                            test09_vars[socket.id]['test09_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'upload-files', 'sub-test' : test09_vars[socket.id]['test09_subTest'] });
                                } else if (test09_vars[socket.id]['test09_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'store-files'});
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'store-files', 
                                                                                            'sub-test' : test09_vars[socket.id]['test09_subTest'], 
                                                                                            'id_path_folder' : test09_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test09_vars[socket.id]['pathSession'] });
                                } else if (test09_vars[socket.id]['test09_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test09_vars[socket.id]['IDSocket_Patient'], socket.id, "FVLEX");
                                    FileSystem.createFolder(test09_vars[socket.id]['test09_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test09_vars[socket.id]['idSelectedPatient'], "FVLEX", 
                                                                            test09_vars[socket.id]['test09_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'upload-store-files', 
                                                                                            'sub-test' : test09_vars[socket.id]['test09_subTest'], 
                                                                                            'id_path_folder' : test09_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test09_vars[socket.id]['pathSession'] });
                                } if (test09_vars[socket.id]['test09_upload_store_media'] == 3) {
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'store-files-in-clinician',
                                                                                    'sub-test' : test09_vars[socket.id]['test09_subTest'],
                                                                                    'id_path_folder' : test09_vars[socket.id]['idPathFolder'], 
                                                                                    'path_session' : test09_vars[socket.id]['pathSession'] });
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'store-files-in-clinician' });
                                }
                            } else {
                                test09_vars[socket.id]['test09_subTest'] = "";                        
                                sock.sendData(socket, true, null, 'Test09', { 'type' : 'finish_r' }); 
                            } 
                        })
                        .catch(err => console.log(err));
                    }
                } else {                                
                    let test09_FVLEX = null;                      
                    let strVideo = "";
                    let videoExist = 0;
    
                    if (test09_vars[socket.id]['test09_subTest'] == 'p') {
                        let test_done = 2; // 10

                        if (test09_vars[socket.id]['test09_p_record']) {
                            strVideo = "P-video_P.webm";
                            videoExist = 1;
                        }

                        test09_FVLEX = new Test09_FVLEX(null, test09_vars[socket.id]['idSelectedSession'], test_done, 
                                                test09_vars[socket.id]['test09_p_duration'], test09_vars[socket.id]['test09_p_reponses'],
                                                test09_vars[socket.id]['test09_p_intrusions'], test09_vars[socket.id]['test09_p_oublis_a_mesure'], 
                                                test09_vars[socket.id]['test09_p_erreurs'], test09_vars[socket.id]['test09_p_text_zone'], 
                                                videoExist, 0, 0, 0, 0, 0, "", 0);
                    } else if (test09_vars[socket.id]['test09_subTest'] == 'r') {
                        test_done = 1; // 01    
                        
                        if (test09_vars[socket.id]['test09_r_record']) {
                            strVideo = "P-video_R.webm";
                            videoExist = 1;
                        }

                        test09_FVLEX = new Test09_FVLEX(null, test09_vars[socket.id]['idSelectedSession'], test_done, 
                                                0, 0, 0, 0, 0, "", 0, 
                                                test09_vars[socket.id]['test09_r_duration'], test09_vars[socket.id]['test09_r_reponses'], 
                                                test09_vars[socket.id]['test09_r_intrusions'], test09_vars[socket.id]['test09_r_oublis_a_mesure'], 
                                                test09_vars[socket.id]['test09_r_erreurs'], test09_vars[socket.id]['test09_r_text_zone'], videoExist);
                    }
            
                    test09_FVLEX
                    .insert()
                    .then((results) => {        
                        if (test09_vars[socket.id]['test09_subTest'] == 'p') {                                    
                            MyJson.updateData(test09_vars[socket.id]['idPathFolder'], test09_vars[socket.id]['pathSession'], "FVLEX", { 
                                "Lettre_P_Duree" : test09_vars[socket.id]['test09_p_duration'],
                                "Lettre_P_Reponses" : test09_vars[socket.id]['test09_p_reponses'],
                                "Lettre_P_Intrusions" : test09_vars[socket.id]['test09_p_intrusions'],
                                "Lettre_P_Oublis_A_Mesure" : test09_vars[socket.id]['test09_p_oublis_a_mesure'],
                                "Lettre_P_Erreurs" : test09_vars[socket.id]['test09_p_erreurs'],
                                "Lettre_P_Text_Zone" : test09_vars[socket.id]['test09_p_text_zone'],
                                "Lettre_P_Video" : test09_vars[socket.id]['test09_p_record'] == true ? test09_vars[socket.id]['test09_folderNameStoreVideoAudio'] + "/" + strVideo : ""
                            });

                            if (test09_vars[socket.id]['test09_p_record']) {   
                                if (test09_vars[socket.id]['test09_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test09_vars[socket.id]['IDSocket_Patient'], socket.id, "FVLEX");
                                    FileSystem.createFolder(test09_vars[socket.id]['test09_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test09_vars[socket.id]['idSelectedPatient'], "FVLEX", 
                                                                            test09_vars[socket.id]['test09_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'upload-files', 'sub-test' : test09_vars[socket.id]['test09_subTest'] });
                                } else if (test09_vars[socket.id]['test09_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'store-files'});
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'store-files', 
                                                                                            'sub-test' : test09_vars[socket.id]['test09_subTest'], 
                                                                                            'id_path_folder' : test09_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test09_vars[socket.id]['pathSession'] });
                                } else if (test09_vars[socket.id]['test09_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test09_vars[socket.id]['IDSocket_Patient'], socket.id, "FVLEX");
                                    FileSystem.createFolder(test09_vars[socket.id]['test09_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test09_vars[socket.id]['idSelectedPatient'], "FVLEX", 
                                                                            test09_vars[socket.id]['test09_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'upload-store-files', 
                                                                                            'sub-test' : test09_vars[socket.id]['test09_subTest'], 
                                                                                            'id_path_folder' : test09_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test09_vars[socket.id]['pathSession'] });
                                } if (test09_vars[socket.id]['test09_upload_store_media'] == 3) {
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'store-files-in-clinician',
                                                                                    'sub-test' : test09_vars[socket.id]['test09_subTest'],
                                                                                    'id_path_folder' : test09_vars[socket.id]['idPathFolder'], 
                                                                                    'path_session' : test09_vars[socket.id]['pathSession'] });
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'store-files-in-clinician' });
                                }
                            } else {
                                test09_vars[socket.id]['test09_subTest'] = "";                        
                                sock.sendData(socket, true, null, 'Test09', { 'type' : 'finish_p' }); 
                            }                             
                        } else if (test09_vars[socket.id]['test09_subTest'] == 'r') {
                            MyJson.updateData(test09_vars[socket.id]['idPathFolder'], test09_vars[socket.id]['pathSession'], "FVLEX", { 
                                "Lettre_R_Duree" : test09_vars[socket.id]['test09_r_duration'],
                                "Lettre_R_Reponses" : test09_vars[socket.id]['test09_r_reponses'],
                                "Lettre_R_Intrusions" : test09_vars[socket.id]['test09_r_intrusions'],
                                "Lettre_R_Oublis_A_Mesure" : test09_vars[socket.id]['test09_r_oublis_a_mesure'],
                                "Lettre_R_Erreurs" : test09_vars[socket.id]['test09_r_erreurs'],
                                "Lettre_R_Text_Zone" : test09_vars[socket.id]['test09_r_text_zone'],
                                "Lettre_R_Video" : test09_vars[socket.id]['test09_r_record'] == true ? test09_vars[socket.id]['test09_folderNameStoreVideoAudio'] + "/" + strVideo : ""
                            });

                            if (test09_vars[socket.id]['test09_r_record']) {   
                                if (test09_vars[socket.id]['test09_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test09_vars[socket.id]['IDSocket_Patient'], socket.id, "FVLEX");
                                    FileSystem.createFolder(test09_vars[socket.id]['test09_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test09_vars[socket.id]['idSelectedPatient'], "FVLEX", 
                                                                            test09_vars[socket.id]['test09_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'upload-files', 'sub-test' : test09_vars[socket.id]['test09_subTest'] });
                                } else if (test09_vars[socket.id]['test09_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'store-files'});
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'store-files', 
                                                                                            'sub-test' : test09_vars[socket.id]['test09_subTest'], 
                                                                                            'id_path_folder' : test09_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test09_vars[socket.id]['pathSession'] });
                                } else if (test09_vars[socket.id]['test09_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test09_vars[socket.id]['IDSocket_Patient'], socket.id, "FVLEX");
                                    FileSystem.createFolder(test09_vars[socket.id]['test09_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test09_vars[socket.id]['idSelectedPatient'], "FVLEX", 
                                                                            test09_vars[socket.id]['test09_folderNameStoreVideoAudio'], 1);                
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'upload-files'});
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'upload-store-files', 
                                                                                            'sub-test' : test09_vars[socket.id]['test09_subTest'], 
                                                                                            'id_path_folder' : test09_vars[socket.id]['idPathFolder'], 
                                                                                            'path_session' : test09_vars[socket.id]['pathSession'] });
                                } if (test09_vars[socket.id]['test09_upload_store_media'] == 3) {
                                    sock.sendData(socket, true, null, 'Test09', { 'type' : 'store-files-in-clinician',
                                                                                    'sub-test' : test09_vars[socket.id]['test09_subTest'],
                                                                                    'id_path_folder' : test09_vars[socket.id]['idPathFolder'], 
                                                                                    'path_session' : test09_vars[socket.id]['pathSession'] });
                                    sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'store-files-in-clinician' });
                                }
                            } else {
                                test09_vars[socket.id]['test09_subTest'] = "";                        
                                sock.sendData(socket, true, null, 'Test09', { 'type' : 'finish_r' }); 
                            } 
                        }
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            break;

        case 'stop-recording':
            sock.sendData(socket, true, null, 'Test09', { 'type' : 'stop-recording' });
            sock.sendData(socket, false, test09_vars[socket.id]['IDSocket_Patient'], 'Test09', { 'type' : 'stop-recording' });
            break;
    }
};

function test09_minusReponses(socket, page) {    
    if (page == 3) {    
        if (test09_vars[socket.id]['test09_p_reponses'] > 0) {
            test09_vars[socket.id]['test09_p_reponses']--;
        }            
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-reponses', 'page' : page, 'value' : test09_vars[socket.id]['test09_p_reponses'] });
    } else if (page == 6) {
        if (test09_vars[socket.id]['test09_r_reponses'] > 0) {
            test09_vars[socket.id]['test09_r_reponses']--;
        }            
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-reponses', 'page' : page, 'value' : test09_vars[socket.id]['test09_r_reponses'] });
    }
}

function test09_plusReponses(socket, page) {
    if (page == 3) {    
        test09_vars[socket.id]['test09_p_reponses']++;
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-reponses', 'page' : page, 'value' : test09_vars[socket.id]['test09_p_reponses'] });
    } else if (page == 6) {
        test09_vars[socket.id]['test09_r_reponses']++;
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-reponses', 'page' : page, 'value' : test09_vars[socket.id]['test09_r_reponses'] });
    }
}

function test09_minusIntrusions(socket, page) {    
    if (page == 3) {    
        if (test09_vars[socket.id]['test09_p_intrusions'] > 0) {
            test09_vars[socket.id]['test09_p_intrusions']--;
        }            
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-intrusions', 'page' : page, 'value' : test09_vars[socket.id]['test09_p_intrusions'] });
    } else if (page == 6) {
        if (test09_vars[socket.id]['test09_r_intrusions'] > 0) {
            test09_vars[socket.id]['test09_r_intrusions']--;
        }            
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-intrusions', 'page' : page, 'value' : test09_vars[socket.id]['test09_r_intrusions'] });
    }    
}

function test09_plusIntrusions(socket, page) {   
    if (page == 3) {    
        test09_vars[socket.id]['test09_p_intrusions']++;
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-intrusions', 'page' : page, 'value' : test09_vars[socket.id]['test09_p_intrusions'] });
    } else if (page == 6) {
        test09_vars[socket.id]['test09_r_intrusions']++;
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-intrusions', 'page' : page, 'value' : test09_vars[socket.id]['test09_r_intrusions'] });
    } 
}

function test09_minusOublisAMesure(socket, page) {    
    if (page == 3) {    
        if (test09_vars[socket.id]['test09_p_oublis_a_mesure'] > 0) {
            test09_vars[socket.id]['test09_p_oublis_a_mesure']--;
        }            
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-oublis-a-mesure', 'page' : page, 'value' : test09_vars[socket.id]['test09_p_oublis_a_mesure'] });
    } else if (page == 6) {
        if (test09_vars[socket.id]['test09_r_oublis_a_mesure'] > 0) {
            test09_vars[socket.id]['test09_r_oublis_a_mesure']--;
        }            
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-oublis-a-mesure', 'page' : page, 'value' : test09_vars[socket.id]['test09_r_oublis_a_mesure'] });
    }
}

function test09_plusOublisAMesure(socket, page) {        
    if (page == 3) {    
        test09_vars[socket.id]['test09_p_oublis_a_mesure']++;
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-oublis-a-mesure', 'page' : page, 'value' : test09_vars[socket.id]['test09_p_oublis_a_mesure'] });
    } else if (page == 6) {
        test09_vars[socket.id]['test09_r_oublis_a_mesure']++;
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-oublis-a-mesure', 'page' : page, 'value' : test09_vars[socket.id]['test09_r_oublis_a_mesure'] });
    }
}

function test09_minusErreurs(socket, page) {    
    if (page == 3) {    
        if (test09_vars[socket.id]['test09_p_erreurs'] > 0) {
            test09_vars[socket.id]['test09_p_erreurs']--;
        }            
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-erreurs', 'page' : page, 'value' : test09_vars[socket.id]['test09_p_erreurs'] });
    } else if (page == 6) {
        if (test09_vars[socket.id]['test09_r_erreurs'] > 0) {
            test09_vars[socket.id]['test09_r_erreurs']--;
        }            
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-erreurs', 'page' : page, 'value' : test09_vars[socket.id]['test09_r_erreurs'] });
    }
}

function test09_plusErreurs(socket, page) {
    if (page == 3) {    
        test09_vars[socket.id]['test09_p_erreurs']++;
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-erreurs', 'page' : page, 'value' : test09_vars[socket.id]['test09_p_erreurs'] });
    } else if (page == 6) {
        test09_vars[socket.id]['test09_r_erreurs']++;
        sock.sendData(socket, true, null, 'Test09', { 'type' : 'show-erreurs', 'page' : page, 'value' : test09_vars[socket.id]['test09_r_erreurs'] });
    }
}