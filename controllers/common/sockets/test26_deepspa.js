const FileSystem = require('../filesystem');
const MyGlobals = require('../globals');
const MyUploadFiles = require('../uploadfiles');
const MyJson = require('../json');

const Patient = require('../../../models/patient');
const MySession = require('../../../models/session');
const Test26_DeepSpa = require('../../../models/test_deepspa');

const MyRooms = require('../../common/roommanagement');
const sock = require('./senddata');

let test26_vars = {};

exports.test26_deepspa_socket = function(socket, data) {
    switch (data['type']) {
        case "old-status-of-page":
            switch(data['subtest']) {
                case "Conclusions":                    
                    Test26_DeepSpa.select_conclusions_by_idSession(test26_vars[socket.id]['idSelectedSession'])
                    .then(([test26_deepspa]) => {
                        let conclusions_commentaires = "";         
                        if (test26_deepspa.length == 1) {
                            conclusions_commentaires = test26_deepspa[0].conclusion_commentaires;
                        }
                        sock.sendData(socket, true, null, 'Test26', { 'type' : 'show-commentaires', 'subtest' : data['subtest'], 
                                                                    'commentaires' : conclusions_commentaires });
                    })
                    .catch(err => console.log(err));
                    break;

                case "Entr_Clin":
                    Test26_DeepSpa.select_entretien_clinique_by_idSession(test26_vars[socket.id]['idSelectedSession'])
                    .then(([test26_deepspa]) => {
                        let partie;
                        let entretien_clinique_commentaires = "Évaluation clinique" + "\n" +
                                                                "# Plainte mnésique: " + "\n" +
                                                                "# Thymie: Moral: " + "\n" +
                                                                "- Niveau de Stress? " + "\n" +
                                                                "- Anxiété? " + "\n" +
                                                                "# Quotidien " + "\n" +
                                                                "- Sommeil: " + "\n" +
                                                                "- Appétit: " + "\n" +
                                                                "# Autonomie: " + "\n" +
                                                                "# Activités de la vie quotidien: " + "\n" +
                                                                "# Comportement pendant le bilan: ";         
                        if (test26_deepspa.length == 1) {
                            partie = test26_deepspa[0].partie;
                            if ((partie & 8) == 8) {                            
                                entretien_clinique_commentaires = test26_deepspa[0].entretien_clinique_commentaires;
                            }
                        }                        
                        
                        sock.sendData(socket, true, null, 'Test26', { 'type' : 'show-commentaires', 'subtest' : data['subtest'], 
                                                                    'commentaires' : entretien_clinique_commentaires });
                    })
                    .catch(err => console.log(err));
                    break;

                case "Historique":                    
                    Test26_DeepSpa.select_historique_du_patient_by_idSession(test26_vars[socket.id]['idSelectedSession'])
                    .then(([test26_deepspa]) => {
                        let historique_commentaires = "";         
                        if (test26_deepspa.length == 1) {
                            historique_commentaires = test26_deepspa[0].historique_du_patient_commentaires;
                        }
                        sock.sendData(socket, true, null, 'Test26', { 'type' : 'show-commentaires', 'subtest' : data['subtest'], 
                                                                    'commentaires' : historique_commentaires });
                    })
                    .catch(err => console.log(err));
                    break;

                case "Raconter":                    
                    Test26_DeepSpa.select_raconter_journee_by_idSession(test26_vars[socket.id]['idSelectedSession'])
                    .then(([test26_deepspa]) => {         
                        let raconter_journee_commentaires = "";
                        if (test26_deepspa.length == 1) {
                            raconter_journee_commentaires = test26_deepspa[0].raconter_journee_commentaires;
                        }
                        sock.sendData(socket, true, null, 'Test26', { 'type' : 'show-commentaires', 'subtest' : data['subtest'], 
                                                                    'commentaires' : raconter_journee_commentaires });
                    })
                    .catch(err => console.log(err));
                    break;
            }
            break;

        case "start":
            let IDSocket_Patient = MyRooms.getIDPatientByIDClinician(socket.id);

            test26_vars[IDSocket_Patient] = socket.id;
            test26_vars[socket.id] = {
                'IDSocket_Clinician' : socket.id,
                'IDSocket_Patient' : IDSocket_Patient,
                'idSelectedSession' : data['idselectedsession'],                
                'pathSession' : null,
                'idPathFolder' : null,
                'idSelectedPatient' : null, 
                'test26_folderNameStoreVideoAudio' : null,
                'test26_upload_store_media' : null,
                'test26_subTest' : data['test']
            }

            MySession.select_by_id(test26_vars[socket.id]['idSelectedSession'])
            .then(([mysession]) => {
                if (mysession.length == 1) {
                    test26_vars[socket.id]['pathSession'] = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                    Patient.select_by_idUser(mysession[0].id_patient)
                    .then(([patient]) => {
                        if (patient.length == 1) {
                            test26_vars[socket.id]['idSelectedPatient'] = mysession[0].id_patient;
                            test26_vars[socket.id]['idPathFolder'] = patient[0].id_path_folder;
                            test26_vars[socket.id]['test26_folderNameStoreVideoAudio'] = FileSystem.FOLDER_UPLOAD + test26_vars[socket.id]['idPathFolder'] + "/" + test26_vars[socket.id]['pathSession'] + "/DeepSpa";
                            test26_vars[socket.id]['test26_upload_store_media'] = patient[0].upload_store_media;
                            
                            sock.sendData(socket, true, null, 'Test26', { 'type' : data['type'], 'subtest' : data['subtest'], 'id_session' : test26_vars[socket.id]['idSelectedSession'] });    
                            sock.sendData(socket, false, test26_vars[socket.id]['IDSocket_Patient'], 'Test26', { 'type' : data['type'], 'subtest' : data['subtest'] });    
                        }
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            break;

        case "stop":
            sock.sendData(socket, true, null, 'Test26', { 'type' : data['type'] });
            sock.sendData(socket, false, test26_vars[socket.id]['IDSocket_Patient'], 'Test26', { 'type' : data['type'] });

            delete test26_vars[test26_vars[socket.id]['IDSocket_Patient']];
            delete test26_vars[socket.id];
            break;

        case "store-values": {
            switch(data['subtest']) {
                case "Conclusions": {
                    Test26_DeepSpa.select_conclusions_by_idSession(test26_vars[socket.id]['idSelectedSession'])
                    .then(([test26_deepspa]) => {          
                        if (test26_deepspa.length == 1) {
                            let partie = test26_deepspa[0].partie;

                            Test26_DeepSpa.update_conclusions_du_patient_by_idSession(test26_vars[socket.id]['idSelectedSession'], partie | 1, data['value'])
                            .then(() => {
                                MyJson.updateData(test26_vars[socket.id]['idPathFolder'], test26_vars[socket.id]['pathSession'], "DeepSpa", {
                                    "Conclusions_Commentaires" : data['value']
                                });

                                test26_vars[socket.id]['test26_subTest'] = "";    
                                
                                sock.sendData(socket, true, null, 'Test26', { 'type' : 'stop' });
                            })
                            .catch(err => console.log(err));                                
                        } else {
                            let test26_deepspa = new Test26_DeepSpa(null, test26_vars[socket.id]['idSelectedSession'], 2, 0, "", 
                                                                        0, "", "", data["value"]);
                            test26_deepspa
                            .insert()
                            .then((results) => {
                                MyJson.updateData(test26_vars[socket.id]['idPathFolder'], test26_vars[socket.id]['pathSession'], "DeepSpa", {
                                    "Conclusions_Commentaires" : data['value']
                                });

                                test26_vars[socket.id]['test26_subTest'] = "";

                                sock.sendData(socket, true, null, 'Test26', { 'type' : 'stop' });
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));                            
                    break;
                }

                case "Entr_Clin": {
                    Test26_DeepSpa.select_entretien_clinique_by_idSession(test26_vars[socket.id]['idSelectedSession'])
                    .then(([test26_deepspa]) => {          
                        if (test26_deepspa.length == 1) {
                            let partie = test26_deepspa[0].partie;
                            let number_of_file = test26_deepspa[0].entretien_clinique_number_files;

                            Test26_DeepSpa.update_entretien_clinique_by_idSession(test26_vars[socket.id]['idSelectedSession'], partie | 8, 
                                                                                    (number_of_file + 1), data['value'])
                            .then(() => {
                                let strVideoKey =  "Entretien_Clinique_Video_" + (number_of_file + 1);
                                let strVideoValue =  "video_entretien_clinique_" + (number_of_file + 1) + ".webm";

                                MyJson.updateData(test26_vars[socket.id]['idPathFolder'], test26_vars[socket.id]['pathSession'], "DeepSpa", { 
                                    "Entretien_Clinique_Number_Of_Files" : (number_of_file + 1),
                                    "Entretien_Clinique_Commentaires" : data['value'],
                                    [strVideoKey] : test26_vars[socket.id]['test26_folderNameStoreVideoAudio'] + "/" + strVideoValue
                                });

                                test26_vars[socket.id]['test26_subTest'] = "";              

                                if (test26_vars[socket.id]['test26_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test26_vars[socket.id]['IDSocket_Patient'], socket.id, "DeepSpa");
                                    FileSystem.createFolder(test26_vars[socket.id]['test26_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test26_vars[socket.id]['idSelectedPatient'], "DeepSpa", 
                                                                                test26_vars[socket.id]['test26_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test26', { 'type' : 'upload-files' });
                                    sock.sendData(socket, false, test26_vars[socket.id]['IDSocket_Patient'], 'Test26', { 'type' : 'upload-files', 'subtest' : data['subtest'], 
                                                                                                'number_file' : (number_of_file + 1) });
                                } else if (test26_vars[socket.id]['test26_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test26', { 'type' : 'store-files' });
                                    sock.sendData(socket, false, test26_vars[socket.id]['IDSocket_Patient'], 'Test26', { 'type' : 'store-files', 'subtest' : data['subtest'], 
                                                                                                'number_file' : (number_of_file + 1), 
                                                                                                'id_path_folder' : test26_vars[socket.id]['idPathFolder'], 
                                                                                                'path_session' : test26_vars[socket.id]['pathSession'] });
                                } else if (test26_vars[socket.id]['test26_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test26_vars[socket.id]['IDSocket_Patient'], socket.id, "DeepSpa");
                                    FileSystem.createFolder(test26_vars[socket.id]['test26_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test26_vars[socket.id]['idSelectedPatient'], "DeepSpa", 
                                                                                test26_vars[socket.id]['test26_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test26', { 'type' : 'upload-files' });
                                    sock.sendData(socket, false, test26_vars[socket.id]['IDSocket_Patient'], 'Test26', { 'type' : 'upload-store-files', 'subtest' : data['subtest'], 
                                                                                                'number_file' : (number_of_file + 1), 
                                                                                                'id_path_folder' : test26_vars[socket.id]['idPathFolder'], 
                                                                                                'path_session' : test26_vars[socket.id]['pathSession'] });
                                }
                            })
                            .catch(err => console.log(err));                                
                        } else {
                            let test26_deepspa = new Test26_DeepSpa(null, test26_vars[socket.id]['idSelectedSession'], 8, 1, data['value'], 
                                                                        0, "", "", "");
                            test26_deepspa
                            .insert()
                            .then((results) => {
                                MyJson.updateData(test26_vars[socket.id]['idPathFolder'], test26_vars[socket.id]['pathSession'], "DeepSpa", { 
                                    "Entretien_Clinique_Number_Of_Files" : 1,
                                    "Entretien_Clinique_Commentaires" : data['value'],
                                    "Entretien_Clinique_Video_1" : test26_vars[socket.id]['test26_folderNameStoreVideoAudio'] + "/" + "video_entretien_clinique_1.webm"
                                });

                                test26_vars[socket.id]['test26_subTest'] = "";

                                if (test26_vars[socket.id]['test26_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test26_vars[socket.id]['IDSocket_Patient'], socket.id, "DeepSpa");
                                    FileSystem.createFolder(test26_vars[socket.id]['test26_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test26_vars[socket.id]['idSelectedPatient'], "DeepSpa", 
                                                                                test26_vars[socket.id]['test26_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test26', { 'type' : 'upload-files' });
                                    sock.sendData(socket, false, test26_vars[socket.id]['IDSocket_Patient'], 'Test26', { 'type' : 'upload-files', 'subtest' : data['subtest'], 
                                                                                                'number_file' : 1 });
                                } else if (test26_vars[socket.id]['test26_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test26', { 'type' : 'store-files' });
                                    sock.sendData(socket, false, test26_vars[socket.id]['IDSocket_Patient'], 'Test26', { 'type' : 'store-files', 'subtest' : data['subtest'], 
                                                                                                'number_file' : 1, 
                                                                                                'id_path_folder' : test26_vars[socket.id]['idPathFolder'], 
                                                                                                'path_session' : test26_vars[socket.id]['pathSession'] });
                                } else if (test26_vars[socket.id]['test26_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test26_vars[socket.id]['IDSocket_Patient'], socket.id, "DeepSpa");
                                    FileSystem.createFolder(test26_vars[socket.id]['test26_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test26_vars[socket.id]['idSelectedPatient'], "DeepSpa", 
                                                                                test26_vars[socket.id]['test26_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test26', { 'type' : 'upload-files' });
                                    sock.sendData(socket, false, test26_vars[socket.id]['IDSocket_Patient'], 'Test26', { 'type' : 'upload-store-files', 'subtest' : data['subtest'], 
                                                                                                'number_file' : 1, 
                                                                                                'id_path_folder' : test26_vars[socket.id]['idPathFolder'], 
                                                                                                'path_session' : test26_vars[socket.id]['pathSession'] });
                                }
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));                            
                    break;
                }

                case "Historique": {
                    Test26_DeepSpa.select_historique_du_patient_by_idSession(test26_vars[socket.id]['idSelectedSession'])
                    .then(([test26_deepspa]) => {          
                        if (test26_deepspa.length == 1) {
                            let partie = test26_deepspa[0].partie;

                            Test26_DeepSpa.update_historique_du_patient_by_idSession(test26_vars[socket.id]['idSelectedSession'], partie | 2, data['value'])
                            .then(() => {
                                MyJson.updateData(test26_vars[socket.id]['idPathFolder'], test26_vars[socket.id]['pathSession'], "DeepSpa", {
                                    "Historique_Du_Patient_Commentaires" : data['value']
                                });

                                test26_vars[socket.id]['test26_subTest'] = "";    
                                
                                sock.sendData(socket, true, null, 'Test26', { 'type' : 'stop' });
                            })
                            .catch(err => console.log(err));                                
                        } else {
                            let test26_deepspa = new Test26_DeepSpa(null, test26_vars[socket.id]['idSelectedSession'], 2, 0, "", 
                                                                        0, "", data["value"], "");
                            test26_deepspa
                            .insert()
                            .then((results) => {
                                MyJson.updateData(test26_vars[socket.id]['idPathFolder'], test26_vars[socket.id]['pathSession'], "DeepSpa", {
                                    "Historique_Du_Patient_Commentaires" : data['value']
                                });

                                test26_vars[socket.id]['test26_subTest'] = "";

                                sock.sendData(socket, true, null, 'Test26', { 'type' : 'stop' });
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));                            
                    break;
                }
                
                case "Raconter": {
                    Test26_DeepSpa.select_raconter_journee_by_idSession(test26_vars[socket.id]['idSelectedSession'])
                    .then(([test26_deepspa]) => {          
                        if (test26_deepspa.length == 1) {
                            let partie = test26_deepspa[0].partie;
                            let number_of_file = test26_deepspa[0].raconter_journee_number_files;

                            Test26_DeepSpa.update_raconter_journee_by_idSession(test26_vars[socket.id]['idSelectedSession'], partie | 4, 
                                                                                    (number_of_file + 1), data['value'])
                            .then(() => {
                                let strVideoKey =  "Raconter_Journee_Video_" + (number_of_file + 1);
                                let strVideoValue =  "video_raconter_journee_" + (number_of_file + 1) + ".webm";

                                MyJson.updateData(test26_vars[socket.id]['idPathFolder'], test26_vars[socket.id]['pathSession'], "DeepSpa", { 
                                    "Raconter_Journee_Number_Of_Files" : (number_of_file + 1),
                                    "Raconter_Journee_Commentaires" : data['value'],
                                    [strVideoKey] : test26_vars[socket.id]['test26_folderNameStoreVideoAudio'] + "/" + strVideoValue
                                });

                                test26_vars[socket.id]['test26_subTest'] = "";              

                                if (test26_vars[socket.id]['test26_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test26_vars[socket.id]['IDSocket_Patient'], socket.id, "DeepSpa");
                                    FileSystem.createFolder(test26_vars[socket.id]['test26_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test26_vars[socket.id]['idSelectedPatient'], "DeepSpa", 
                                                                                test26_vars[socket.id]['test26_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test26', { 'type' : 'upload-files' });
                                    sock.sendData(socket, false, test26_vars[socket.id]['IDSocket_Patient'], 'Test26', { 'type' : 'upload-files', 'subtest' : data['subtest'], 
                                                                                                'number_file' : (number_of_file + 1) });
                                } else if (test26_vars[socket.id]['test26_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test26', { 'type' : 'store-files' });
                                    sock.sendData(socket, false, test26_vars[socket.id]['IDSocket_Patient'], 'Test26', { 'type' : 'store-files', 'subtest' : data['subtest'], 
                                                                                                'number_file' : (number_of_file + 1), 
                                                                                                'id_path_folder' : test26_vars[socket.id]['idPathFolder'], 
                                                                                                'path_session' : test26_vars[socket.id]['pathSession'] });
                                } else if (test26_vars[socket.id]['test26_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test26_vars[socket.id]['IDSocket_Patient'], socket.id, "DeepSpa");
                                    FileSystem.createFolder(test26_vars[socket.id]['test26_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test26_vars[socket.id]['idSelectedPatient'], "DeepSpa", 
                                                                                test26_vars[socket.id]['test26_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test26', { 'type' : 'upload-files' });
                                    sock.sendData(socket, false, test26_vars[socket.id]['IDSocket_Patient'], 'Test26', { 'type' : 'upload-store-files', 'subtest' : data['subtest'], 
                                                                                                'number_file' : (number_of_file + 1), 
                                                                                                'id_path_folder' : test26_vars[socket.id]['idPathFolder'], 
                                                                                                'path_session' : test26_vars[socket.id]['pathSession'] });
                                }
                            })
                            .catch(err => console.log(err));                                
                        } else {
                            let test26_deepspa = new Test26_DeepSpa(null, test26_vars[socket.id]['idSelectedSession'], 4, 0, "", 
                                                                        1, data["value"], "", "");
                            test26_deepspa
                            .insert()
                            .then((results) => {
                                MyJson.updateData(test26_vars[socket.id]['idPathFolder'], test26_vars[socket.id]['pathSession'], "DeepSpa", { 
                                    "Raconter_Journee_Number_Of_Files" : 1,
                                    "Raconter_Journee_Commentaires" : data['value'],
                                    "Raconter_Journee_Video_1" : test26_vars[socket.id]['test26_folderNameStoreVideoAudio'] + "/" + "video_raconter_journee_1.webm"
                                });

                                test26_vars[socket.id]['test26_subTest'] = "";

                                if (test26_vars[socket.id]['test26_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test26_vars[socket.id]['IDSocket_Patient'], socket.id, "DeepSpa");
                                    FileSystem.createFolder(test26_vars[socket.id]['test26_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test26_vars[socket.id]['idSelectedPatient'], "DeepSpa", 
                                                                                test26_vars[socket.id]['test26_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test26', { 'type' : 'upload-files' });
                                    sock.sendData(socket, false, test26_vars[socket.id]['IDSocket_Patient'], 'Test26', { 'type' : 'upload-files', 'subtest' : data['subtest'], 
                                                                                                'number_file' : 1 });
                                } else if (test26_vars[socket.id]['test26_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test26', { 'type' : 'store-files' });
                                    sock.sendData(socket, false, test26_vars[socket.id]['IDSocket_Patient'], 'Test26', { 'type' : 'store-files', 'subtest' : data['subtest'], 
                                                                                                'number_file' : 1, 
                                                                                                'id_path_folder' : test26_vars[socket.id]['idPathFolder'], 
                                                                                                'path_session' : test26_vars[socket.id]['pathSession'] });
                                } else if (test26_vars[socket.id]['test26_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test26_vars[socket.id]['IDSocket_Patient'], socket.id, "DeepSpa");
                                    FileSystem.createFolder(test26_vars[socket.id]['test26_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test26_vars[socket.id]['idSelectedPatient'], "DeepSpa", 
                                                                                test26_vars[socket.id]['test26_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test26', { 'type' : 'upload-files' });
                                    sock.sendData(socket, false, test26_vars[socket.id]['IDSocket_Patient'], 'Test26', { 'type' : 'upload-store-files', 'subtest' : data['subtest'], 
                                                                                                'number_file' : 1, 
                                                                                                'id_path_folder' : test26_vars[socket.id]['idPathFolder'], 
                                                                                                'path_session' : test26_vars[socket.id]['pathSession'] });
                                }
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));                            
                    break;
                }  
            }  
            break;          
        }
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

