const FileSystem = require('../filesystem');
const MyGlobals = require('../globals');
const MyUploadFiles = require('../uploadfiles');
const MyJson = require('../json');

const Patient = require('../../../models/patient');
const MySession = require('../../../models/session');
const Test40_Stroop_Victoria_2 = require('../../../models/test_stroop_victoria_2');

const MyRooms = require('../../common/roommanagement');
const sock = require('./senddata');

let test40_vars = {};

exports.test40_stroop_victoria_2_socket = function(socket, data) {
    switch (data['type']) {
        case "old-status-of-page":
            test40_oldStatusOfPage(socket, data['page']);
            break;

        case "select-color":
            test40_selectColor(socket, data['page'], data['row'], data['col']);
            break;

        case "select-correction":
            test40_selectCorrection(socket, data['page'], data['row'], data['col']);
            break;

        case "show-page":                         
            if (data['page'] == 8) {
                let y1 = 0, z1 = 0, y2 = 0, z2 = 0, y3 = 0, z3 = 0;

                for(let i = 0; i < test40_vars[socket.id]['TEST40_MAX_ROW']; i++) {
                    for(let j = 0; j < test40_vars[socket.id]['TEST40_MAX_COLUMN']; j++) {
                        if ((test40_vars[socket.id]['test40_page3_selected_colors'][i][j] == 2) || 
                            (test40_vars[socket.id]['test40_page3_selected_colors'][i][j] == 3)) {
                            y1++;
                            if (test40_vars[socket.id]['test40_page3_selected_colors'][i][j] == 3) {
                                z1++;
                            }
                        }

                        if ((test40_vars[socket.id]['test40_page5_selected_colors'][i][j] == 2) || 
                            (test40_vars[socket.id]['test40_page5_selected_colors'][i][j] == 3)) {
                            y2++;
                            if (test40_vars[socket.id]['test40_page5_selected_colors'][i][j] == 3) {
                                z2++;
                            }
                        }

                        if ((test40_vars[socket.id]['test40_page7_selected_colors'][i][j] == 2) || 
                            (test40_vars[socket.id]['test40_page7_selected_colors'][i][j] == 3)) {
                            y3++;
                            if (test40_vars[socket.id]['test40_page7_selected_colors'][i][j] == 3) {
                                z3++;
                            }
                        }
                    }
                }

                sock.sendData(socket, true, null, 'Test40', { 'type' : data['type'], 'page' : data['page'], 
                                                              'x1' : test40_vars[socket.id]['test40_count_timer_record_1'], 'y1' : y1, 'z1' : z1, 
                                                              'x2' : test40_vars[socket.id]['test40_count_timer_record_2'], 'y2' : y2, 'z2' : z2, 
                                                              'x3' : test40_vars[socket.id]['test40_count_timer_record_3'], 'y3' : y3, 'z3' : z3 });
                sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : data['type'], 'page' : data['page'] });

            } else {
                sock.sendData(socket, true, null, 'Test40', { 'type' : data['type'], 'page' : data['page'] });

                if (data['page'] != 1) {
                    sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : data['type'], 'page' : data['page'] });  
                }
            }
            break;

        case "start":
            let IDSocket_Patient = MyRooms.getIDPatientByIDClinician(socket.id);

            test40_vars[IDSocket_Patient] = socket.id;
            test40_vars[socket.id] = {
                'IDSocket_Clinician' : socket.id,
                'IDSocket_Patient' : IDSocket_Patient,
                'idSelectedSession' : data['idselectedsession'],                
                'pathSession' : null,
                'idPathFolder' : null,
                'idSelectedPatient' : null, 
                'test40_folderNameStoreVideoAudio' : null,
                'test40_upload_store_media' : null,
                'TEST40_MAX_COLUMN' : 4,
                'TEST40_MAX_ROW' : 6,
                'test40_page3_selected_colors' : null,
                'test40_page5_selected_colors' : null,
                'test40_page7_selected_colors' : null,
                'test40_record_audio' : false,
                'test40_record_1' : false,
                'test40_record_2' : false,
                'test40_record_3' : false,
                'test40_count_timer_record_1' : 0,
                'test40_count_timer_record_2' : 0,
                'test40_count_timer_record_3' : 0                
            }

            test40_variableInitialization(socket);

            MySession.select_by_id(test40_vars[socket.id]['idSelectedSession'])
            .then(([mysession]) => {
                if (mysession.length == 1) {
                    test40_vars[socket.id]['pathSession'] = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                    Patient.select_by_idUser(mysession[0].id_patient)
                    .then(([patient]) => {
                        if (patient.length == 1) {
                            test40_vars[socket.id]['idSelectedPatient'] = mysession[0].id_patient;
                            test40_vars[socket.id]['test40_record_audio'] = data['record_audio'];
                            test40_vars[socket.id]['idPathFolder'] = patient[0].id_path_folder;
                            test40_vars[socket.id]['test40_folderNameStoreVideoAudio'] = FileSystem.FOLDER_UPLOAD + test40_vars[socket.id]['idPathFolder'] + "/" + test40_vars[socket.id]['pathSession'] + "/Stroop_Victoria_2";
                            test40_vars[socket.id]['test40_upload_store_media'] = patient[0].upload_store_media;

                            sock.sendData(socket, true, null, 'Test40', { 'type' : data['type'], 
                                                                          'id_session' : test40_vars[socket.id]['idSelectedSession'], 
                                                                          'record_audio' : data['record_audio'], 
                                                                          'language' : data['language'],
                                                                          'shortcut' : data['shortcut'] });

                            sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : 'start', 'language' : data['language'] });
                        }
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            break;

        case "start-recording": {
            let page = data['page'];

            sock.sendData(socket, true, null, 'Test40', { 'type' : data['type'], 'page' : page });

            if (test40_vars[socket.id]['test40_record_audio'] == true) {            
                if (page == 3) {
                    test40_vars[socket.id]['test40_record_1'] = true;                        
                } else if (page == 5) {
                    test40_vars[socket.id]['test40_record_2'] = true;                        
                } else if (page == 7) {
                    test40_vars[socket.id]['test40_record_3'] = true;                        
                }

                sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : data['type'], 'page' : page });
            }            
            break;
        }

        case "stop":                        
            sock.sendData(socket, true, null, 'Test40', { 'type' : data['type'] });
            sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : data['type'] });
            
            delete test40_vars[test40_vars[socket.id]['IDSocket_Patient']];
            delete test40_vars[socket.id];
            break;

        case "store-values": {
            let y1 = 0, z1 = 0, audio1 = 0, y2 = 0, z2 = 0, audio2 = 0, y3 = 0, z3 = 0, audio3 = 0, countAudio = 0;

            for(let i = 0; i < test40_vars[socket.id]['TEST40_MAX_ROW']; i++) {
                for(let j = 0; j < test40_vars[socket.id]['TEST40_MAX_COLUMN']; j++) {
                    if ((test40_vars[socket.id]['test40_page3_selected_colors'][i][j] == 2) || 
                        (test40_vars[socket.id]['test40_page3_selected_colors'][i][j] == 3)) {
                        y1++;
                        if (test40_vars[socket.id]['test40_page3_selected_colors'][i][j] == 3) {
                            z1++;
                        }
                    }

                    if ((test40_vars[socket.id]['test40_page5_selected_colors'][i][j] == 2) || 
                        (test40_vars[socket.id]['test40_page5_selected_colors'][i][j] == 3)) {
                        y2++;
                        if (test40_vars[socket.id]['test40_page5_selected_colors'][i][j] == 3) {
                            z2++;
                        }
                    }

                    if ((test40_vars[socket.id]['test40_page7_selected_colors'][i][j] == 2) || 
                        (test40_vars[socket.id]['test40_page7_selected_colors'][i][j] == 3)) {
                        y3++;
                        if (test40_vars[socket.id]['test40_page7_selected_colors'][i][j] == 3) {
                            z3++;
                        }
                    }
                }
            }

            let pathAudio1 = "";
            let pathAudio2 = "";
            let pathAudio3 = "";

            if (test40_vars[socket.id]['test40_record_1'] == true) {
                pathAudio1 = test40_vars[socket.id]['test40_folderNameStoreVideoAudio'] + "/audio1.webm";
                audio1 = 1;
                countAudio++;
            }

            if (test40_vars[socket.id]['test40_record_2'] == true) {
                pathAudio2 = test40_vars[socket.id]['test40_folderNameStoreVideoAudio'] + "/audio2.webm";
                audio2 = 1;
                countAudio++;
            }

            if (test40_vars[socket.id]['test40_record_3'] == true) {
                pathAudio3 = test40_vars[socket.id]['test40_folderNameStoreVideoAudio'] + "/audio3.webm";
                audio3 = 1;
                countAudio++;
            }

            Test40_Stroop_Victoria_2.select_by_idSession(test40_vars[socket.id]['idSelectedSession'])
            .then(([test40_stroop_victoria_2]) => {
                if (test40_stroop_victoria_2.length == 1) {
                    Test40_Stroop_Victoria_2.update_by_idSession(test40_vars[socket.id]['idSelectedSession'], 
                                                      test40_vars[socket.id]['test40_count_timer_record_1'], y1, z1, audio1, 
                                                      test40_vars[socket.id]['test40_count_timer_record_2'], y2, z2, audio2, 
                                                      test40_vars[socket.id]['test40_count_timer_record_3'], y3, z3, audio3)
                    .then(() => {
                        MyJson.updateData(test40_vars[socket.id]['idPathFolder'], test40_vars[socket.id]['pathSession'], "Stroop_Victoria_2", { 
                            "Time_1" : test40_vars[socket.id]['test40_count_timer_record_1'],
                            "Number_Of_Errors_1" : y1,
                            "Number_Of_Corrections_1" : z1,
                            "Audio_1" : pathAudio1,
                            "Time_2" : test40_vars[socket.id]['test40_count_timer_record_2'],
                            "Number_Of_Errors_2" : y2,
                            "Number_Of_Corrections_2" : z2,
                            "Audio_2" : pathAudio2,
                            "Time_3" : test40_vars[socket.id]['test40_count_timer_record_3'],
                            "Number_Of_Errors_3" : y3,
                            "Number_Of_Corrections_3" : z3,
                            "Audio_3" : pathAudio3
                        });

                        if ((test40_vars[socket.id]['test40_record_1'] == true) || 
                            (test40_vars[socket.id]['test40_record_2'] == true) || 
                            (test40_vars[socket.id]['test40_record_3'] == true)) {
                            if (test40_vars[socket.id]['test40_upload_store_media'] == 0) {
                                MyUploadFiles.add_UploadFiles(test40_vars[socket.id]['IDSocket_Patient'], socket.id, "Stroop_Victoria_2");
                                FileSystem.createFolder(test40_vars[socket.id]['test40_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test40_vars[socket.id]['idSelectedPatient'], "Stroop_Victoria_2", 
                                                                          test40_vars[socket.id]['test40_folderNameStoreVideoAudio'], countAudio);
                                sock.sendData(socket, true, null, 'Test40', { 'type' : 'upload-files' });
                                sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : 'upload-files' });
                            } else if (test40_vars[socket.id]['test40_upload_store_media'] == 1) {
                                sock.sendData(socket, true, null, 'Test40', { 'type' : 'store-files' });
                                sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : 'store-files', 
                                                                                         'id_path_folder' : test40_vars[socket.id]['idPathFolder'], 
                                                                                         'path_session' : test40_vars[socket.id]['pathSession'] });
                            } else if (test40_vars[socket.id]['test40_upload_store_media'] == 2) {
                                MyUploadFiles.add_UploadFiles(test40_vars[socket.id]['IDSocket_Patient'], socket.id, "Stroop_Victoria_2");
                                FileSystem.createFolder(test40_vars[socket.id]['test40_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test40_vars[socket.id]['idSelectedPatient'], "Stroop_Victoria_2", 
                                                                          test40_vars[socket.id]['test40_folderNameStoreVideoAudio'], countAudio);
                                sock.sendData(socket, true, null, 'Test40', { 'type' : 'upload-files' });
                                sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : 'upload-store-files', 
                                                                                         'id_path_folder' : test40_vars[socket.id]['idPathFolder'], 
                                                                                         'path_session' : test40_vars[socket.id]['pathSession'] });
                            } else if (test40_vars[socket.id]['test40_upload_store_media'] == 3) {
                                sock.sendData(socket, true, null, 'Test40', { 'type' : 'store-files-in-clinician',
                                                                                'id_path_folder' : test40_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test40_vars[socket.id]['pathSession'] });
                                sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : 'store-files-in-clinician' });
                            }
                        } else {
                            sock.sendData(socket, true, null, 'Test40', { 'type' : 'finish' }); 
                        }

                        delete test40_vars[test40_vars[socket.id]['IDSocket_Patient']];
                        delete test40_vars[socket.id];
                    })
                    .catch(err => console.log(err));
                } else {
                    const test40_Stroop_Victoria_2 = new Test40_Stroop_Victoria_2(null, test40_vars[socket.id]['idSelectedSession'], 
                                                            test40_vars[socket.id]['test40_count_timer_record_1'], y1, z1, audio1, 
                                                            test40_vars[socket.id]['test40_count_timer_record_2'], y2, z2, audio2, 
                                                            test40_vars[socket.id]['test40_count_timer_record_3'], y3, z3, audio3);
                    test40_Stroop_Victoria_2
                    .insert()
                    .then((results) => { 
                        MyJson.updateData(test40_vars[socket.id]['idPathFolder'], test40_vars[socket.id]['pathSession'], "Stroop_Victoria_2", { 
                            "Time_1" : test40_vars[socket.id]['test40_count_timer_record_1'],
                            "Number_Of_Errors_1" : y1,
                            "Number_Of_Corrections_1" : z1,
                            "Audio_1" : pathAudio1,
                            "Time_2" : test40_vars[socket.id]['test40_count_timer_record_2'],
                            "Number_Of_Errors_2" : y2,
                            "Number_Of_Corrections_2" : z2,
                            "Audio_2" : pathAudio2,
                            "Time_3" : test40_vars[socket.id]['test40_count_timer_record_3'],
                            "Number_Of_Errors_3" : y3,
                            "Number_Of_Corrections_3" : z3,
                            "Audio_3" : pathAudio3
                        });

                        if ((test40_vars[socket.id]['test40_record_1'] == true) || 
                            (test40_vars[socket.id]['test40_record_2'] == true) || 
                            (test40_vars[socket.id]['test40_record_3'] == true)) {
                            if (test40_vars[socket.id]['test40_upload_store_media'] == 0) {
                                MyUploadFiles.add_UploadFiles(test40_vars[socket.id]['IDSocket_Patient'], socket.id, "Stroop_Victoria_2");
                                FileSystem.createFolder(test40_vars[socket.id]['test40_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test40_vars[socket.id]['idSelectedPatient'], "Stroop_Victoria_2", 
                                                                          test40_vars[socket.id]['test40_folderNameStoreVideoAudio'], countAudio);
                                sock.sendData(socket, true, null, 'Test40', { 'type' : 'upload-files' });
                                sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : 'upload-files' });
                            } else if (test40_vars[socket.id]['test40_upload_store_media'] == 1) {
                                sock.sendData(socket, true, null, 'Test40', { 'type' : 'store-files' });
                                sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : 'store-files', 
                                                                                         'id_path_folder' : test40_vars[socket.id]['idPathFolder'], 
                                                                                         'path_session' : test40_vars[socket.id]['pathSession'] });
                            } else if (test40_vars[socket.id]['test40_upload_store_media'] == 2) {
                                MyUploadFiles.add_UploadFiles(test40_vars[socket.id]['IDSocket_Patient'], socket.id, "Stroop_Victoria_2");
                                FileSystem.createFolder(test40_vars[socket.id]['test40_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test40_vars[socket.id]['idSelectedPatient'], "Stroop_Victoria_2", 
                                                                          test40_vars[socket.id]['test40_folderNameStoreVideoAudio'], countAudio);
                                sock.sendData(socket, true, null, 'Test40', { 'type' : 'upload-files' });
                                sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : 'upload-store-files', 
                                                                                         'id_path_folder' : test40_vars[socket.id]['idPathFolder'], 
                                                                                         'path_session' : test40_vars[socket.id]['pathSession'] });
                            } else if (test40_vars[socket.id]['test40_upload_store_media'] == 3) {
                                sock.sendData(socket, true, null, 'Test40', { 'type' : 'store-files-in-clinician',
                                                                                'id_path_folder' : test40_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test40_vars[socket.id]['pathSession'] });
                                sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : 'store-files-in-clinician' });
                            }
                        } else {
                            sock.sendData(socket, true, null, 'Test40', { 'type' : 'finish' }); 
                        }

                        delete test40_vars[test40_vars[socket.id]['IDSocket_Patient']];
                        delete test40_vars[socket.id];
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));                        
            
            break;
        }

        case 'arreter': {
            let page = data['page'];

            if (page == 3) {
                test40_vars[socket.id]['test40_count_timer_record_1'] = data['count_timer'];
            } else if (page == 5) {
                test40_vars[socket.id]['test40_count_timer_record_2'] = data['count_timer'];
            } else if (page == 7) {
                test40_vars[socket.id]['test40_count_timer_record_3'] = data['count_timer'];
            }  

            sock.sendData(socket, true, null, 'Test40', { 'type' : data['type'], 'page' : page });

            if (test40_vars[socket.id]['test40_record_audio'] == true) {
                sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : data['type'], 'page' : page });
            }
            break;                    
        }

        case 'repeat': {
            let page = data['page'];

            sock.sendData(socket, true, null, 'Test40', { 'type' : data['type'], 'page' : page });

            if (test40_vars[socket.id]['test40_record_audio'] == true) {            
                sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : data['type'], 'page' : page });
            }
            break;                    
        }
        
        case "pause": case "reprendre":
            sock.sendData(socket, true, null, 'Test40', { 'type' : data['type'], 'page' : data['page'] });
            break;                    

        case "reset": {
            let page = data['page'];

            if (page == 3) {
                test40_vars[socket.id]['test40_record_1'] = false;  
                test40_vars[socket.id]['test40_count_timer_record_1'] = 0;                      
            } else if (page == 5) {
                test40_vars[socket.id]['test40_record_2'] = false;  
                test40_vars[socket.id]['test40_count_timer_record_2'] = 0;
            } else if (page == 7) {
                test40_vars[socket.id]['test40_record_3'] = false;        
                test40_vars[socket.id]['test40_count_timer_record_3'] = 0;                
            }  

            sock.sendData(socket, true, null, 'Test40', { 'type' : data['type'], 'page' : page });

            if (test40_vars[socket.id]['test40_record_audio'] == true) {
                sock.sendData(socket, false, test40_vars[socket.id]['IDSocket_Patient'], 'Test40', { 'type' : data['type'], 'page' : page });
            }
            break;
        }
    }
};

function test40_oldStatusOfPage(socket, page) {
    let test40_page_selected_colors = test40_selectSelectedColors(socket, page);
    
    if (page == 3) {
        if (test40_vars[socket.id]['test40_record_1'] == true) {
            sock.sendData(socket, true, null, 'Test40', { 'type' : 'set-status-recorded', 'page' : page, 
                                                          'count_timer' : test40_vars[socket.id]['test40_count_timer_record_1'] });
        } else {
            sock.sendData(socket, true, null, 'Test40', { 'type' : 'set-start-recording', 'page' : page });
        }
    } else if (page == 5) {
        if (test40_vars[socket.id]['test40_record_2'] == true) {
            sock.sendData(socket, true, null, 'Test40', { 'type' : 'set-status-recorded', 'page' : page, 
                                                          'count_timer' : test40_vars[socket.id]['test40_count_timer_record_2'] });
        } else {
            sock.sendData(socket, true, null, 'Test40', { 'type' : 'set-start-recording', 'page' : page });
        }
    } else if (page == 7) {
        if (test40_vars[socket.id]['test40_record_3'] == true) {
            sock.sendData(socket, true, null, 'Test40', { 'type' : 'set-status-recorded', 'page' : page, 
                                                          'count_timer' : test40_vars[socket.id]['test40_count_timer_record_3'] });
        } else {
            sock.sendData(socket, true, null, 'Test40', { 'type' : 'set-start-recording', 'page' : page });
        }
    } 

    for(let i = 0; i < test40_vars[socket.id]['TEST40_MAX_ROW']; i++) {                        
        for(let j = 0; j < test40_vars[socket.id]['TEST40_MAX_COLUMN']; j++) {
            if (test40_page_selected_colors[i][j] == 2) {
                sock.sendData(socket, true, null, 'Test40', { 'type' : 'select-color', 'page' : page, 'row' : i, 'col' : j });
            } else if (test40_page_selected_colors[i][j] == 3) {
                sock.sendData(socket, true, null, 'Test40', { 'type' : 'select-color', 'page' : page, 'row' : i, 'col' : j });
                sock.sendData(socket, true, null, 'Test40', { 'type' : 'select-correction', 'page' : page, 'row' : i, 'col' : j });
            }
        }
    }
}

function test40_selectSelectedColors(socket, page) {
    switch (page) {
        case 3:
            return test40_vars[socket.id]['test40_page3_selected_colors'];

        case 5:
            return test40_vars[socket.id]['test40_page5_selected_colors'];

        case 7:
            return test40_vars[socket.id]['test40_page7_selected_colors'];
    }
}

function test40_selectColor(socket, page, row, col) {    
    let test40_page_selected_colors = test40_selectSelectedColors(socket, page);

    if (test40_page_selected_colors[row][col] == 0) {
        test40_page_selected_colors[row][col] = 2;
        sock.sendData(socket, true, null, 'Test40', { 'type' : 'select-color', 'page' : page, 'row' : row, 'col' : col });
    } else {
        test40_page_selected_colors[row][col] = 0;
        sock.sendData(socket, true, null, 'Test40', { 'type' : 'unselect-color', 'page' : page, 'row' : row, 'col' : col });
        sock.sendData(socket, true, null, 'Test40', { 'type' : 'unselect-correction', 'page' : page, 'row' : row, 'col' : col });
    }
}

function test40_selectCorrection(socket, page, row, col) {    
    let test40_page_selected_colors = test40_selectSelectedColors(socket, page);

    if (test40_page_selected_colors[row][col] == 2) {
        test40_page_selected_colors[row][col] = test40_page_selected_colors[row][col] | 1;
        sock.sendData(socket, true, null, 'Test40', { 'type' : 'select-correction', 'page' : page, 'row' : row, 'col' : col });
    } else if (test40_page_selected_colors[row][col] == 3) {
        test40_page_selected_colors[row][col] = 2;        
        sock.sendData(socket, true, null, 'Test40', { 'type' : 'unselect-correction', 'page' : page, 'row' : row, 'col' : col });
    }
}

function test40_variableInitialization(socket) {
    test40_vars[socket.id]['test40_page3_selected_colors'] = new Array(test40_vars[socket.id]['TEST40_MAX_ROW']);        
    test40_vars[socket.id]['test40_page5_selected_colors'] = new Array(test40_vars[socket.id]['TEST40_MAX_ROW']);
    test40_vars[socket.id]['test40_page7_selected_colors'] = new Array(test40_vars[socket.id]['TEST40_MAX_ROW']);
    
    for(let i = 0; i < test40_vars[socket.id]['TEST40_MAX_ROW']; i++) {
        test40_vars[socket.id]['test40_page3_selected_colors'][i] = new Array(test40_vars[socket.id]['TEST40_MAX_COLUMN']);
        test40_vars[socket.id]['test40_page5_selected_colors'][i] = new Array(test40_vars[socket.id]['TEST40_MAX_COLUMN']);
        test40_vars[socket.id]['test40_page7_selected_colors'][i] = new Array(test40_vars[socket.id]['TEST40_MAX_COLUMN']);

        for(let j = 0; j < test40_vars[socket.id]['TEST40_MAX_COLUMN']; j++) {
            test40_vars[socket.id]['test40_page3_selected_colors'][i][j] = 0;
            test40_vars[socket.id]['test40_page5_selected_colors'][i][j] = 0;
            test40_vars[socket.id]['test40_page7_selected_colors'][i][j] = 0;
        }
    }
}