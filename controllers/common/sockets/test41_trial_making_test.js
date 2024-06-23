const FileSystem = require('../filesystem');
const MyGlobals = require('../globals');
const MyUploadFiles = require('../uploadfiles');
const MyJson = require('../json');

const Patient = require('../../../models/patient');
const MySession = require('../../../models/session');
const Test41_Trial_Making_Test = require('../../../models/test_trial_making_test');

const MyRooms = require('../../common/roommanagement');
const sock = require('./senddata');

let test41_vars = {};

exports.test41_trial_making_test_socket = function(socket, data) {
    switch (data['type']) {        

        case 'old-status-of-page': {
            sock.sendData(socket, true, null, 'Test41', { 'type' : 'show-time', 'page' : data['page'], 'time' : test41_vars[socket.id]['test41_page' + data['page'] + '_time'] });

            break;
        }
            
        case 'show-page': {
            let page = data['page'];

            switch (page) {
                case 1 : case 2: case 3:
                    sock.sendData(socket, true, null, 'Test41', { 'type' : data['type'], 'page' : page });
                    break;                
            }
            break;
        }

        case "show-page-and-store": 
            test41_vars[socket.id]['test41_page' + data['page-store'] + '_time'] = data['time'];

            if (data['page-show'] != 4) {                
                sock.sendData(socket, true, null, 'Test41', { 'type' : 'show-page', 'page' : data['page-show'] });
            } else {
                sock.sendData(socket, true, null, 'Test41', { 'type' : 'show-page', 'page' : data['page-show'], 
                        'a_time' : test41_vars[socket.id]['test41_page2_time'],
                        'b_time' : test41_vars[socket.id]['test41_page3_time'] });
            }

            break;

        case 'start':
            let IDSocket_Patient = MyRooms.getIDPatientByIDClinician(socket.id);

            test41_vars[IDSocket_Patient] = socket.id;
            test41_vars[socket.id] = {
                'IDSocket_Clinician' : socket.id,
                'IDSocket_Patient' : IDSocket_Patient,
                'idSelectedSession' : data['idselectedsession'],                
                'pathSession' : null,
                'idPathFolder' : null,
                'idSelectedPatient' : null, 
                'test41_folderNameStoreVideoAudio' : null,
                'test41_upload_store_media' : null,
                'test41_record_video' : null,
                'test41_page2_time' : 0,
                'test41_page3_time' : 0
            }            

            MySession.select_by_id(test41_vars[socket.id]['idSelectedSession'])
            .then(([mysession]) => {
                if (mysession.length == 1) {
                    test41_vars[socket.id]['pathSession'] = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                    Patient.select_by_idUser(mysession[0].id_patient)
                    .then(([patient]) => {
                        if (patient.length == 1) {
                            test41_vars[socket.id]['idPathFolder'] = patient[0].id_path_folder;
                            test41_vars[socket.id]['test41_record_video'] = data['record_video'];
                            test41_vars[socket.id]['idSelectedPatient'] = mysession[0].id_patient;                                        
                            test41_vars[socket.id]['test41_folderNameStoreVideoAudio'] = FileSystem.FOLDER_UPLOAD + test41_vars[socket.id]['idPathFolder'] + "/" + test41_vars[socket.id]['pathSession'] + "/Trial_Making_Test";
                            test41_vars[socket.id]['test41_upload_store_media'] = patient[0].upload_store_media;
                    
                            sock.sendData(socket, true, null, 'Test41', { 'type' : 'start',
                                                                          'record_video' : data['record_video'],
                                                                          'shortcut' : data['shortcut']
                                                                        });
                            sock.sendData(socket, false, test41_vars[socket.id]['IDSocket_Patient'], 'Test41', { 'type' : 'start', 'record_video' : data['record_video'] });
                        }
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            break;

        case "stop":                         
            sock.sendData(socket, true, null, 'Test41', { 'type' : data['type'] });
            sock.sendData(socket, false, test41_vars[socket.id]['IDSocket_Patient'], 'Test41', { 'type' : data['type'] });

            delete test41_vars[test41_vars[socket.id]['IDSocket_Patient']];
            delete test41_vars[socket.id];
            break;

        case "store-values": {
            let record_video = 0;
            let path_record_video = "";

            if (test41_vars[socket.id]['test41_record_video'] == true) {
                record_video = 1;
                path_record_video = test41_vars[socket.id]['test41_folderNameStoreVideoAudio'] + "/" + "video.webm";
            }

            let a_time = test41_vars[socket.id]['test41_page2_time'];
            let b_time = test41_vars[socket.id]['test41_page3_time'];

            Test41_Trial_Making_Test.select_by_idSession(test41_vars[socket.id]['idSelectedSession'])
            .then(([test41_trial_making_test]) => {
                if (test41_trial_making_test.length == 1) {
                    Test41_Trial_Making_Test.update_by_idSession(test41_vars[socket.id]['idSelectedSession'], record_video, 
                                                        a_time, b_time)
                    .then(() => {
                        MyJson.updateData(test41_vars[socket.id]['idPathFolder'], test41_vars[socket.id]['pathSession'], "Trial_Making_Test", {
                            "Trial_Making_A_Time" : a_time, "Trial_Making_B_Time" : b_time, 
                            "Video" : path_record_video
                        });

                        if (test41_vars[socket.id]['test41_record_video'] == true) {
                            if (test41_vars[socket.id]['test41_upload_store_media'] == 0) {
                                MyUploadFiles.add_UploadFiles(test41_vars[socket.id]['IDSocket_Patient'], socket.id, "Trial_Making_Test");
                                FileSystem.createFolder(test41_vars[socket.id]['test41_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test41_vars[socket.id]['idSelectedPatient'], "Trial_Making_Test", 
                                                                    test41_vars[socket.id]['test41_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test41', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test41_vars[socket.id]['IDSocket_Patient'], 'Test41', { 'type' : 'upload-files' });
                            } else if (test41_vars[socket.id]['test41_upload_store_media'] == 1) {
                                sock.sendData(socket, true, null, 'Test41', { 'type' : 'store-files'});
                                sock.sendData(socket, false, test41_vars[socket.id]['IDSocket_Patient'], 'Test41', { 'type' : 'store-files', 
                                                                                'id_path_folder' : test41_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test41_vars[socket.id]['pathSession'] });
                            } else if (test41_vars[socket.id]['test41_upload_store_media'] == 2) {
                                MyUploadFiles.add_UploadFiles(test41_vars[socket.id]['IDSocket_Patient'], socket.id, "Trial_Making_Test");
                                FileSystem.createFolder(test41_vars[socket.id]['test41_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test41_vars[socket.id]['idSelectedPatient'], "Trial_Making_Test", 
                                                                            test41_vars[socket.id]['test41_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test41', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test41_vars[socket.id]['IDSocket_Patient'], 'Test41', { 'type' : 'upload-store-files', 
                                                                                'id_path_folder' : test41_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test41_vars[socket.id]['pathSession'] });
                            } else if (test41_vars[socket.id]['test41_upload_store_media'] == 3) {
                                sock.sendData(socket, true, null, 'Test41', { 'type' : 'store-files-in-clinician',
                                                                                'id_path_folder' : test41_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test41_vars[socket.id]['pathSession'] });
                                sock.sendData(socket, false, test41_vars[socket.id]['IDSocket_Patient'], 'Test41', { 'type' : 'store-files-in-clinician' });
                            }
                        } else {
                            sock.sendData(socket, true, null, 'Test41', { 'type' : 'finish' });
                        }

                        delete test41_vars[test41_vars[socket.id]['IDSocket_Patient']];
                        delete test41_vars[socket.id];
                    })
                    .catch(err => console.log(err));
                } else {
                    const test41_Trial_Making_Test = new Test41_Trial_Making_Test(null, test41_vars[socket.id]['idSelectedSession'], 
                                    record_video, a_time, b_time);
                    test41_Trial_Making_Test
                    .insert()
                    .then((results) => {
                        MyJson.updateData(test41_vars[socket.id]['idPathFolder'], test41_vars[socket.id]['pathSession'], "Trial_Making_Test", {
                            "Trial_Making_A_Time" : a_time, "Trial_Making_B_Time" : b_time, 
                            "Video" : path_record_video
                        });

                        if (test41_vars[socket.id]['test41_record_video'] == true) {
                            if (test41_vars[socket.id]['test41_upload_store_media'] == 0) {
                                MyUploadFiles.add_UploadFiles(test41_vars[socket.id]['IDSocket_Patient'], socket.id, "Trial_Making_Test");
                                FileSystem.createFolder(test41_vars[socket.id]['test41_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test41_vars[socket.id]['idSelectedPatient'], "Trial_Making_Test", 
                                                                    test41_vars[socket.id]['test41_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test41', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test41_vars[socket.id]['IDSocket_Patient'], 'Test41', { 'type' : 'upload-files' });
                            } else if (test41_vars[socket.id]['test41_upload_store_media'] == 1) {
                                sock.sendData(socket, true, null, 'Test41', { 'type' : 'store-files'});
                                sock.sendData(socket, false, test41_vars[socket.id]['IDSocket_Patient'], 'Test41', { 'type' : 'store-files', 
                                                                                'id_path_folder' : test41_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test41_vars[socket.id]['pathSession'] });
                            } else if (test41_vars[socket.id]['test41_upload_store_media'] == 2) {
                                MyUploadFiles.add_UploadFiles(test41_vars[socket.id]['IDSocket_Patient'], socket.id, "Trial_Making_Test");
                                FileSystem.createFolder(test41_vars[socket.id]['test41_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test41_vars[socket.id]['idSelectedPatient'], "Trial_Making_Test", 
                                                                            test41_vars[socket.id]['test41_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test41', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test41_vars[socket.id]['IDSocket_Patient'], 'Test41', { 'type' : 'upload-store-files', 
                                                                                'id_path_folder' : test41_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test41_vars[socket.id]['pathSession'] });
                            } else if (test41_vars[socket.id]['test41_upload_store_media'] == 3) {
                                sock.sendData(socket, true, null, 'Test41', { 'type' : 'store-files-in-clinician',
                                                                                'id_path_folder' : test41_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test41_vars[socket.id]['pathSession'] });
                                sock.sendData(socket, false, test41_vars[socket.id]['IDSocket_Patient'], 'Test41', { 'type' : 'store-files-in-clinician' });
                            }
                        } else {
                            sock.sendData(socket, true, null, 'Test41', { 'type' : 'finish' });
                        }

                        delete test41_vars[test41_vars[socket.id]['IDSocket_Patient']];
                        delete test41_vars[socket.id];
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            
            break;
        }
    }
};

//Test 41/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
