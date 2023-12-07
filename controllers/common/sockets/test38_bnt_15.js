const FileSystem = require('../filesystem');
const MyGlobals = require('../globals');
const MyUploadFiles = require('../uploadfiles');
const MyJson = require('../json');

const Patient = require('../../../models/patient');
const MySession = require('../../../models/session');
const Test38_BNT_15 = require('../../../models/test_bnt_15');

const MyRooms = require('../../common/roommanagement');
const sock = require('./senddata');

let test38_vars = {};

exports.test38_bnt_15_socket = function(socket, data) {
    switch (data['type']) {
        case "old-status-of-page": {
            let page = data['page'];

            if (test38_vars[socket.id]['test38_page' + page + '_selected_scores'][1] == 1) {    
                sock.sendData(socket, true, null, 'Test38', { 'type' : 'select-word', 'page' : page, 'word' : 'false' });
            } else if (test38_vars[socket.id]['test38_page' + page + '_selected_scores'][2] == 1) { 
                sock.sendData(socket, true, null, 'Test38', { 'type' : 'select-word', 'page' : page, 'word' : 'true' });
            }

            sock.sendData(socket, true, null, 'Test38', { 'type' : 'set-text', 'page' : page, 
                'text' : test38_vars[socket.id]['test38_page' + page + '_selected_scores'][0] });

            test38_showHideContinuerButton(socket, page);

            break;
        }

        case "select-word": {
            let page = data['page'];
            let page_selected_scores = test38_vars[socket.id]['test38_page' + page + '_selected_scores'];

            if (data['word'] == 'true') {
                if (page_selected_scores[2] == 1) {
                    page_selected_scores[2] = 0;
                    sock.sendData(socket, true, null, 'Test38', { 'type' : 'unselect-word', 'page' : page, 'word' : 'true' });
                } else {
                    page_selected_scores[2] = 1;
                    page_selected_scores[1] = 0;
                    sock.sendData(socket, true, null, 'Test38', { 'type' : 'select-word', 'page' : page, 'word' : 'true' });
                    sock.sendData(socket, true, null, 'Test38', { 'type' : 'unselect-word', 'page' : page, 'word' : 'false' });
                }
            } else {
                if (page_selected_scores[1] == 1) {
                    page_selected_scores[1] = 0;
                    sock.sendData(socket, true, null, 'Test38', { 'type' : 'unselect-word', 'page' : page, 'word' : 'false' });
                } else {
                    page_selected_scores[1] = 1;
                    page_selected_scores[2] = 0;
                    sock.sendData(socket, true, null, 'Test38', { 'type' : 'select-word', 'page' : page, 'word' : 'false' });
                    sock.sendData(socket, true, null, 'Test38', { 'type' : 'unselect-word', 'page' : page, 'word' : 'true' });
                }
            }

            test38_showHideContinuerButton(socket, page);

            break;
        }

        case "show-page": {
            let page = data['page'];

            if(page != 19)
                sock.sendData(socket, true, null, 'Test38', { 'type' : data['type'], 'page' : page }); 
                
            if(page == 4 || page == 18)
                sock.sendData(socket, false, test38_vars[socket.id]['IDSocket_Patient'], 'Test38', { 'type' : data['type'], 'page' : page }); 
            
            break;            
        }

        case "show-page-and-store": {
            let page_show = data['page-show'];

            test38_vars[socket.id]['test38_page' + data['page-store'] + '_selected_scores'][0] = data['text'];
            
            if(page_show != 19) {    
                sock.sendData(socket, true, null, 'Test38', { 'type' : 'show-page', 'page' : page_show });

                if (page_show >= 3 && page_show <= 19) {
                    sock.sendData(socket, false, test38_vars[socket.id]['IDSocket_Patient'], 'Test38', { 'type' : 'show-page', 'page' : page_show });
                }
            } else {
                let haufig = test38_vars[socket.id]['test38_page4_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page5_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page6_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page7_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page8_selected_scores'][2];

                let mittel = test38_vars[socket.id]['test38_page9_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page10_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page11_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page12_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page13_selected_scores'][2];

                let selten = test38_vars[socket.id]['test38_page14_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page15_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page16_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page17_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page18_selected_scores'][2];
                
                sock.sendData(socket, true, null, 'Test38', { 'type' : 'show-page', 'page' : page_show, 
                             'haufig' : haufig, 'mittel' : mittel, 'selten' : selten });
                
                sock.sendData(socket, false, test38_vars[socket.id]['IDSocket_Patient'], 'Test38', { 'type' : 'show-page', 'page' : page_show });
            }

            break;
        }

        case "start":
            let IDSocket_Patient = MyRooms.getIDPatientByIDClinician(socket.id);

            test38_vars[IDSocket_Patient] = socket.id;
            test38_vars[socket.id] = {
                'IDSocket_Clinician' : socket.id,
                'IDSocket_Patient' : IDSocket_Patient,
                'idSelectedSession' : data['idselectedsession'],
                'pathSession' : null,
                'idPathFolder' : null,
                'idSelectedPatient' : null, 
                'test38_folderNameStoreVideoAudio' : null,
                'test38_upload_store_media' : null,
                'test38_record_video' : null,
                'test38_page4_selected_scores' : ["", 0, 0],
                'test38_page5_selected_scores' : ["", 0, 0],
                'test38_page6_selected_scores' : ["", 0, 0],
                'test38_page7_selected_scores' : ["", 0, 0],
                'test38_page8_selected_scores' : ["", 0, 0],
                'test38_page9_selected_scores' : ["", 0, 0],
                'test38_page10_selected_scores' : ["", 0, 0],
                'test38_page11_selected_scores' : ["", 0, 0],
                'test38_page12_selected_scores' : ["", 0, 0],
                'test38_page13_selected_scores' : ["", 0, 0],
                'test38_page14_selected_scores' : ["", 0, 0],
                'test38_page15_selected_scores' : ["", 0, 0],
                'test38_page16_selected_scores' : ["", 0, 0],
                'test38_page17_selected_scores' : ["", 0, 0],
                'test38_page18_selected_scores' : ["", 0, 0]
            }

            MySession.select_by_id(test38_vars[socket.id]['idSelectedSession'])
            .then(([mysession]) => {
                if (mysession.length == 1) {
                    test38_vars[socket.id]['pathSession'] = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                    Patient.select_by_idUser(mysession[0].id_patient)
                    .then(([patient]) => {
                        if (patient.length == 1) {
                            test38_vars[socket.id]['idPathFolder'] = patient[0].id_path_folder;
                            test38_vars[socket.id]['test38_record_video'] = data['record_video'];
                            test38_vars[socket.id]['idSelectedPatient'] = mysession[0].id_patient;                                        
                            test38_vars[socket.id]['test38_folderNameStoreVideoAudio'] = FileSystem.FOLDER_UPLOAD + test38_vars[socket.id]['idPathFolder'] + "/" + test38_vars[socket.id]['pathSession'] + "/BNT_15";
                            test38_vars[socket.id]['test38_upload_store_media'] = patient[0].upload_store_media;
                            
                            sock.sendData(socket, true, null, 'Test38', { 'type' : 'start', 'record_video' : data['record_video'], 'shortcut' : data['shortcut'] });
                            sock.sendData(socket, false, test38_vars[socket.id]['IDSocket_Patient'], 'Test38', { 'type' : 'start', 'record_video' : data['record_video'] });
                        }
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            break;

        case "store-values": {
            let record_video = 0;
            let path_record_video = "";

            if (test38_vars[socket.id]['test38_record_video'] == true) {
                record_video = 1;
                path_record_video = test38_vars[socket.id]['test38_folderNameStoreVideoAudio'] + "/" + "video.webm";
            }
            
            let haufig = test38_vars[socket.id]['test38_page4_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page5_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page6_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page7_selected_scores'][2] +
                             test38_vars[socket.id]['test38_page8_selected_scores'][2];

            let mittel = test38_vars[socket.id]['test38_page9_selected_scores'][2] +
                            test38_vars[socket.id]['test38_page10_selected_scores'][2] +
                            test38_vars[socket.id]['test38_page11_selected_scores'][2] +
                            test38_vars[socket.id]['test38_page12_selected_scores'][2] +
                            test38_vars[socket.id]['test38_page13_selected_scores'][2];

            let selten = test38_vars[socket.id]['test38_page14_selected_scores'][2] +
                            test38_vars[socket.id]['test38_page15_selected_scores'][2] +
                            test38_vars[socket.id]['test38_page16_selected_scores'][2] +
                            test38_vars[socket.id]['test38_page17_selected_scores'][2] +
                            test38_vars[socket.id]['test38_page18_selected_scores'][2];
            

            Test38_BNT_15.select_by_idSession(test38_vars[socket.id]['idSelectedSession'])
            .then(([test38_bnt_15]) => {
                if (test38_bnt_15.length == 1) {
                    Test38_BNT_15.update_by_idSession(test38_vars[socket.id]['idSelectedSession'], record_video, 
                            haufig, mittel, selten, 
                            test38_vars[socket.id]['test38_page4_selected_scores'][0],
                            test38_vars[socket.id]['test38_page5_selected_scores'][0],
                            test38_vars[socket.id]['test38_page6_selected_scores'][0],
                            test38_vars[socket.id]['test38_page7_selected_scores'][0],
                            test38_vars[socket.id]['test38_page8_selected_scores'][0],
                            test38_vars[socket.id]['test38_page9_selected_scores'][0],
                            test38_vars[socket.id]['test38_page10_selected_scores'][0],
                            test38_vars[socket.id]['test38_page11_selected_scores'][0],
                            test38_vars[socket.id]['test38_page12_selected_scores'][0],
                            test38_vars[socket.id]['test38_page13_selected_scores'][0],
                            test38_vars[socket.id]['test38_page14_selected_scores'][0],
                            test38_vars[socket.id]['test38_page15_selected_scores'][0],
                            test38_vars[socket.id]['test38_page16_selected_scores'][0],
                            test38_vars[socket.id]['test38_page17_selected_scores'][0],
                            test38_vars[socket.id]['test38_page18_selected_scores'][0])
                    .then(() => {
                        MyJson.updateData(test38_vars[socket.id]['idPathFolder'], test38_vars[socket.id]['pathSession'], "BNT_15", {
                            "häufig" : haufig,
                            "mittel" : mittel,
                            "selten" : selten,
                            "total" : haufig + mittel + selten,
                            "[Baum]" : test38_vars[socket.id]['test38_page4_selected_scores'][0],
                            "[Bett]" : test38_vars[socket.id]['test38_page5_selected_scores'][0],
                            "[Pfeife]" : test38_vars[socket.id]['test38_page6_selected_scores'][0],
                            "[Blume]" : test38_vars[socket.id]['test38_page7_selected_scores'][0],
                            "[Haus]" : test38_vars[socket.id]['test38_page8_selected_scores'][0],
                            "[Kanu]" : test38_vars[socket.id]['test38_page9_selected_scores'][0],
                            "[Zahnbürste]" : test38_vars[socket.id]['test38_page10_selected_scores'][0],
                            "[Vulkan]" : test38_vars[socket.id]['test38_page11_selected_scores'][0],
                            "[Maske]" : test38_vars[socket.id]['test38_page12_selected_scores'][0],
                            "[Kamel]" : test38_vars[socket.id]['test38_page13_selected_scores'][0],
                            "[Mundharmonika]" : test38_vars[socket.id]['test38_page14_selected_scores'][0],
                            "[Zange]" : test38_vars[socket.id]['test38_page15_selected_scores'][0],
                            "[Hängematte]" : test38_vars[socket.id]['test38_page16_selected_scores'][0],
                            "[Trichter]" : test38_vars[socket.id]['test38_page17_selected_scores'][0],
                            "[Dominosteine]" : test38_vars[socket.id]['test38_page18_selected_scores'][0],
                            "Video" : path_record_video
                        });

                        if (test38_vars[socket.id]['test38_record_video'] == true) {
                            if (test38_vars[socket.id]['test38_upload_store_media'] == 0) {
                                MyUploadFiles.add_UploadFiles(test38_vars[socket.id]['IDSocket_Patient'], socket.id, "BNT_15");
                                FileSystem.createFolder(test38_vars[socket.id]['test38_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test38_vars[socket.id]['idSelectedPatient'], "BNT_15", 
                                                                    test38_vars[socket.id]['test38_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test38', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test38_vars[socket.id]['IDSocket_Patient'], 'Test38', { 'type' : 'upload-files' });
                            } else if (test38_vars[socket.id]['test38_upload_store_media'] == 1) {
                                sock.sendData(socket, true, null, 'Test38', { 'type' : 'store-files'});
                                sock.sendData(socket, false, test38_vars[socket.id]['IDSocket_Patient'], 'Test38', { 'type' : 'store-files', 
                                                                                'id_path_folder' : test38_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test38_vars[socket.id]['pathSession'] });
                            } else if (test38_vars[socket.id]['test38_upload_store_media'] == 2) {
                                MyUploadFiles.add_UploadFiles(test38_vars[socket.id]['IDSocket_Patient'], socket.id, "BNT_15");
                                FileSystem.createFolder(test38_vars[socket.id]['test38_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test38_vars[socket.id]['idSelectedPatient'], "BNT_15", 
                                                                            test38_vars[socket.id]['test38_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test38', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test38_vars[socket.id]['IDSocket_Patient'], 'Test38', { 'type' : 'upload-store-files', 
                                                                                'id_path_folder' : test38_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test38_vars[socket.id]['pathSession'] });
                            } else if (test38_vars[socket.id]['test38_upload_store_media'] == 3) {
                                sock.sendData(socket, true, null, 'Test38', { 'type' : 'store-files-in-clinician',
                                                                                'id_path_folder' : test38_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test38_vars[socket.id]['pathSession'] });
                                sock.sendData(socket, false, test38_vars[socket.id]['IDSocket_Patient'], 'Test38', { 'type' : 'store-files-in-clinician' });
                            }
                        } else {
                            sock.sendData(socket, true, null, 'Test38', { 'type' : 'finish' });
                        }

                        delete test38_vars[test38_vars[socket.id]['IDSocket_Patient']];
                        delete test38_vars[socket.id];
                    })
                    .catch(err => console.log(err));
                } else {
                    const test38_BNT_15 = new Test38_BNT_15(null, test38_vars[socket.id]['idSelectedSession'], record_video, 
                                                    haufig, mittel, selten, 
                                                    test38_vars[socket.id]['test38_page4_selected_scores'][0],
                                                    test38_vars[socket.id]['test38_page5_selected_scores'][0],
                                                    test38_vars[socket.id]['test38_page6_selected_scores'][0],
                                                    test38_vars[socket.id]['test38_page7_selected_scores'][0],
                                                    test38_vars[socket.id]['test38_page8_selected_scores'][0],
                                                    test38_vars[socket.id]['test38_page9_selected_scores'][0],
                                                    test38_vars[socket.id]['test38_page10_selected_scores'][0],
                                                    test38_vars[socket.id]['test38_page11_selected_scores'][0],
                                                    test38_vars[socket.id]['test38_page12_selected_scores'][0],
                                                    test38_vars[socket.id]['test38_page13_selected_scores'][0],
                                                    test38_vars[socket.id]['test38_page14_selected_scores'][0],
                                                    test38_vars[socket.id]['test38_page15_selected_scores'][0],
                                                    test38_vars[socket.id]['test38_page16_selected_scores'][0],
                                                    test38_vars[socket.id]['test38_page17_selected_scores'][0],
                                                    test38_vars[socket.id]['test38_page18_selected_scores'][0]);
                    test38_BNT_15
                    .insert()
                    .then((results) => {
                        MyJson.updateData(test38_vars[socket.id]['idPathFolder'], test38_vars[socket.id]['pathSession'], "BNT_15", {
                            "häufig" : haufig,
                            "mittel" : mittel,
                            "selten" : selten,
                            "total" : haufig + mittel + selten,
                            "[Baum]" : test38_vars[socket.id]['test38_page4_selected_scores'][0],
                            "[Bett]" : test38_vars[socket.id]['test38_page5_selected_scores'][0],
                            "[Pfeife]" : test38_vars[socket.id]['test38_page6_selected_scores'][0],
                            "[Blume]" : test38_vars[socket.id]['test38_page7_selected_scores'][0],
                            "[Haus]" : test38_vars[socket.id]['test38_page8_selected_scores'][0],
                            "[Kanu]" : test38_vars[socket.id]['test38_page9_selected_scores'][0],
                            "[Zahnbürste]" : test38_vars[socket.id]['test38_page10_selected_scores'][0],
                            "[Vulkan]" : test38_vars[socket.id]['test38_page11_selected_scores'][0],
                            "[Maske]" : test38_vars[socket.id]['test38_page12_selected_scores'][0],
                            "[Kamel]" : test38_vars[socket.id]['test38_page13_selected_scores'][0],
                            "[Mundharmonika]" : test38_vars[socket.id]['test38_page14_selected_scores'][0],
                            "[Zange]" : test38_vars[socket.id]['test38_page15_selected_scores'][0],
                            "[Hängematte]" : test38_vars[socket.id]['test38_page16_selected_scores'][0],
                            "[Trichter]" : test38_vars[socket.id]['test38_page17_selected_scores'][0],
                            "[Dominosteine]" : test38_vars[socket.id]['test38_page18_selected_scores'][0],
                            "Video" : path_record_video
                        });

                        if (test38_vars[socket.id]['test38_record_video'] == true) {
                            if (test38_vars[socket.id]['test38_upload_store_media'] == 0) {
                                MyUploadFiles.add_UploadFiles(test38_vars[socket.id]['IDSocket_Patient'], socket.id, "BNT_15");
                                FileSystem.createFolder(test38_vars[socket.id]['test38_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test38_vars[socket.id]['idSelectedPatient'], "BNT_15", 
                                                                    test38_vars[socket.id]['test38_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test38', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test38_vars[socket.id]['IDSocket_Patient'], 'Test38', { 'type' : 'upload-files' });
                            } else if (test38_vars[socket.id]['test38_upload_store_media'] == 1) {
                                sock.sendData(socket, true, null, 'Test38', { 'type' : 'store-files'});
                                sock.sendData(socket, false, test38_vars[socket.id]['IDSocket_Patient'], 'Test38', { 'type' : 'store-files', 
                                                                                'id_path_folder' : test38_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test38_vars[socket.id]['pathSession'] });
                            } else if (test38_vars[socket.id]['test38_upload_store_media'] == 2) {
                                MyUploadFiles.add_UploadFiles(test38_vars[socket.id]['IDSocket_Patient'], socket.id, "BNT_15");
                                FileSystem.createFolder(test38_vars[socket.id]['test38_folderNameStoreVideoAudio']);
                                MyGlobals.add_PatientInformationForUpload(test38_vars[socket.id]['idSelectedPatient'], "BNT_15", 
                                                                            test38_vars[socket.id]['test38_folderNameStoreVideoAudio'], 1);
                                sock.sendData(socket, true, null, 'Test38', { 'type' : 'upload-files'});
                                sock.sendData(socket, false, test38_vars[socket.id]['IDSocket_Patient'], 'Test38', { 'type' : 'upload-store-files', 
                                                                                'id_path_folder' : test38_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test38_vars[socket.id]['pathSession'] });
                            } else if (test38_vars[socket.id]['test38_upload_store_media'] == 3) {
                                sock.sendData(socket, true, null, 'Test38', { 'type' : 'store-files-in-clinician',
                                                                                'id_path_folder' : test38_vars[socket.id]['idPathFolder'], 
                                                                                'path_session' : test38_vars[socket.id]['pathSession'] });
                                sock.sendData(socket, false, test38_vars[socket.id]['IDSocket_Patient'], 'Test38', { 'type' : 'store-files-in-clinician' });
                            }
                        } else {
                            sock.sendData(socket, true, null, 'Test38', { 'type' : 'finish' });
                        }

                        delete test38_vars[test38_vars[socket.id]['IDSocket_Patient']];
                        delete test38_vars[socket.id];
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            
            break;
        }

        case "stop":                         
            sock.sendData(socket, true, null, 'Test38', { 'type' : data['type'] });
            sock.sendData(socket, false, test38_vars[socket.id]['IDSocket_Patient'], 'Test38', { 'type' : data['type'] });

            delete test38_vars[test38_vars[socket.id]['IDSocket_Patient']];
            delete test38_vars[socket.id];
            break; 
    }
};

//Test 38/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test38_showHideContinuerButton(socket, page) {
    if ((test38_vars[socket.id]['test38_page' + page + '_selected_scores'][1] == 1) || 
        (test38_vars[socket.id]['test38_page' + page + '_selected_scores'][2] == 1))
        sock.sendData(socket, true, null, 'Test38', { 'type' : 'show-continuer', 'page' : page });
    else
        sock.sendData(socket, true, null, 'Test38', { 'type' : 'hide-continuer', 'page' : page });

}