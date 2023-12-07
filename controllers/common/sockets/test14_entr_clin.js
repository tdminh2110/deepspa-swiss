const FileSystem = require('../filesystem');
const MyGlobals = require('../globals');
const MyUploadFiles = require('../uploadfiles');
const MyJson = require('../json');

const Patient = require('../../../models/patient');
const MySession = require('../../../models/session');
const Test14_Entr_Clin = require('../../../models/test_entr_clin');

const MyRooms = require('../../common/roommanagement');
const sock = require('./senddata');

let test14_vars = {};

exports.test14_entr_clin_socket = function(socket, data) {
    let type = data['type'];
    switch (type) {
        case "c": {
            let instruction = data['instruction'];

            switch (instruction) {
                case "old-status-of-page":
                    test14_c_oldStatusOfPage(socket, type, data['page']);
                    break;
                
                case "store-values":
                    Test14_Entr_Clin.select_partie_by_idSession(test14_vars[socket.id]['idSelectedSession'])
                    .then(([test14_entr_clin]) => {          
                        if (test14_entr_clin.length == 1) {
                            let partie = test14_entr_clin[0].partie;

                            Test14_Entr_Clin.update_conclusion_by_idSession(test14_vars[socket.id]['idSelectedSession'], partie | 8, data['value'])
                            .then(() => {
                                MyJson.updateData(test14_vars[socket.id]['idPathFolder'], test14_vars[socket.id]['pathSession'], "Entr_Clin", { 
                                    "Conclusion_Commentaires" : data['value']
                                });
                                test14_vars[socket.id]['test14_subTest'] = "";
                                sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'finish' });
                            })
                            .catch(err => console.log(err));                                
                        } else {
                            let test14_entr_clin = new Test14_Entr_Clin(null, test14_vars[socket.id]['idSelectedSession'], 8, "", 
                                                                        0, "", 0, "", data['value'], 0, 0, 0, 0, 0, "", 0, 0, 0);
                            test14_entr_clin
                            .insert()
                            .then((results) => {
                                MyJson.updateData(test14_vars[socket.id]['idPathFolder'], test14_vars[socket.id]['pathSession'], "Entr_Clin", { 
                                    "Conclusion_Commentaires" : data['value']
                                });
                                test14_vars[socket.id]['test14_subTest'] = "";
                                sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'finish' });
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));                            
                    break;                                
            }
            break;
        }

        case "dl": {
            let instruction = data['instruction'];

            switch (instruction) {
                case "old-status-of-page":
                    test14_dl_oldStatusOfPage(socket, type, data['page']);
                    break;

                case "start-recording":
                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : instruction });
                    break;  
                    
                case "store-values": {
                    Test14_Entr_Clin.select_discussion_libre_by_idSession(test14_vars[socket.id]['idSelectedSession'])
                    .then(([test14_entr_clin]) => {          
                        if (test14_entr_clin.length == 1) {
                            let partie = test14_entr_clin[0].partie;
                            let number_of_file = test14_entr_clin[0].discussion_libre_number_files;

                            Test14_Entr_Clin.update_discussion_libre_by_idSession(test14_vars[socket.id]['idSelectedSession'], partie | 32, 
                                                                                  (number_of_file + 1), data['value'])
                            .then(() => {
                                let strVideoKey =  "Discussion_Libre_Video_" + (number_of_file + 1);
                                let strVideoValue =  "video_discussion_libre_" + (number_of_file + 1) + ".webm";

                                MyJson.updateData(test14_vars[socket.id]['idPathFolder'], test14_vars[socket.id]['pathSession'], "Entr_Clin", { 
                                    "Discussion_Libre_Number_Of_Files" : (number_of_file + 1),
                                    "Discussion_Libre_Commentaires" : data['value'],
                                    [strVideoKey] : test14_vars[socket.id]['test14_folderNameStoreVideoAudio'] + "/" + strVideoValue
                                });

                                test14_vars[socket.id]['test14_subTest'] = "";              

                                if (test14_vars[socket.id]['test14_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test14_vars[socket.id]['IDSocket_Patient'], socket.id, "Entr_Clin");
                                    FileSystem.createFolder(test14_vars[socket.id]['test14_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test14_vars[socket.id]['idSelectedPatient'], "Entr_Clin", 
                                                                              test14_vars[socket.id]['test14_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'upload-files' });
                                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'upload-files', 
                                                                                             'number_file' : (number_of_file + 1) });
                                } else if (test14_vars[socket.id]['test14_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'upload-files' });
                                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'store-files', 
                                                                                             'number_file' : (number_of_file + 1), 
                                                                                             'id_path_folder' : test14_vars[socket.id]['idPathFolder'], 
                                                                                             'path_session' : test14_vars[socket.id]['pathSession'] });
                                } else if (test14_vars[socket.id]['test14_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test14_vars[socket.id]['IDSocket_Patient'], socket.id, "Entr_Clin");
                                    FileSystem.createFolder(test14_vars[socket.id]['test14_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test14_vars[socket.id]['idSelectedPatient'], "Entr_Clin", 
                                                                              test14_vars[socket.id]['test14_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'upload-files' });
                                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'upload-store-files', 
                                                                                             'number_file' : (number_of_file + 1), 
                                                                                             'id_path_folder' : test14_vars[socket.id]['idPathFolder'], 
                                                                                             'path_session' : test14_vars[socket.id]['pathSession'] });
                                }
                            })
                            .catch(err => console.log(err));                                
                        } else {
                            let test14_entr_clin = new Test14_Entr_Clin(null, test14_vars[socket.id]['idSelectedSession'], 32, "", 1, data['value'], 
                                                                        0, "", "", 0, 0, 0, 0, 0, "", 0, 0, 0);
                            test14_entr_clin
                            .insert()
                            .then((results) => {
                                MyJson.updateData(test14_vars[socket.id]['idPathFolder'], test14_vars[socket.id]['pathSession'], "Entr_Clin", { 
                                    "Discussion_Libre_Number_Of_Files" : 1,
                                    "Discussion_Libre_Commentaires" : data['value'],
                                    "Discussion_Libre_Video_1" : test14_vars[socket.id]['test14_folderNameStoreVideoAudio'] + "/" + "video_discussion_libre_1.webm"
                                });

                                test14_vars[socket.id]['test14_subTest'] = "";

                                if (test14_vars[socket.id]['test14_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test14_vars[socket.id]['IDSocket_Patient'], socket.id, "Entr_Clin");
                                    FileSystem.createFolder(test14_vars[socket.id]['test14_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test14_vars[socket.id]['idSelectedPatient'], "Entr_Clin", 
                                                                              test14_vars[socket.id]['test14_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'upload-files' });
                                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'upload-files', 'number_file' : 1 });
                                } else if (test14_vars[socket.id]['test14_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'upload-files' });
                                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'store-files', 
                                                                                             'number_file' : 1, 
                                                                                             'id_path_folder' : test14_vars[socket.id]['idPathFolder'], 
                                                                                             'path_session' : test14_vars[socket.id]['pathSession'] });
                                } else if (test14_vars[socket.id]['test14_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test14_vars[socket.id]['IDSocket_Patient'], socket.id, "Entr_Clin");
                                    FileSystem.createFolder(test14_vars[socket.id]['test14_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test14_vars[socket.id]['idSelectedPatient'], "Entr_Clin", 
                                                                              test14_vars[socket.id]['test14_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'upload-files' });
                                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'upload-store-files', 
                                                                                             'number_file' : 1, 
                                                                                             'id_path_folder' : test14_vars[socket.id]['idPathFolder'], 
                                                                                             'path_session' : test14_vars[socket.id]['pathSession'] });
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

        case "fcs": {
            let instruction = data['instruction'];
            let page = data['page'];

            switch (instruction) {
                case "old-status-of-page":
                    test14_fcs_oldStatusOfPage(socket, type, page, data['sender']);
                    break;

                case "select-sentence": 
                    test14_fcs_selectSentence(socket, type, page, data['sentence'], data['sender']);
                    break;                            

                case "show-page":
                    if (page == 6) {
                        let s1 = test14_fcs_getScore(socket, 2);
                        let s2 = test14_fcs_getScore(socket, 3);
                        let s3 = test14_fcs_getScore(socket, 4);
                        let s4 = test14_fcs_getScore(socket, 5);

                        sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : instruction, 'page' : page, 'score' : (s1 + s2 + s3 + s4) });                                    
                    } else {                        
                        sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : instruction, 'page' : page });
                    }

                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : instruction, 'page' : page });
                    break;

                case "store-values": {
                    let s1 = test14_fcs_getScore(socket, 2);
                    let s2 = test14_fcs_getScore(socket, 3);
                    let s3 = test14_fcs_getScore(socket, 4);
                    let s4 = test14_fcs_getScore(socket, 5);

                    Test14_Entr_Clin.select_partie_by_idSession(test14_vars[socket.id]['idSelectedSession'])
                    .then(([test14_entr_clin]) => {          
                        if (test14_entr_clin.length == 1) {
                            let partie = test14_entr_clin[0].partie;                                        

                            Test14_Entr_Clin.update_fcs_by_idSession(test14_vars[socket.id]['idSelectedSession'], partie | 4, s1, s2, s3, s4)
                            .then(() => {
                                MyJson.updateData(test14_vars[socket.id]['idPathFolder'], test14_vars[socket.id]['pathSession'], "Entr_Clin", { 
                                    "FCS_Score" : (s1 + s2 +s3 +s4),
                                    "FCS_Mémoire" : s1,
                                    "FCS_Concentration" : s2,
                                    "FCS_Capacite_Mentale" : s3,
                                    "FCS_Vitalite" : s4
                                });
                                test14_vars[socket.id]['test14_subTest'] = "";                                            
                                sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'finish' });
                            })
                            .catch(err => console.log(err));                                
                        } else {
                            let test14_entr_clin = new Test14_Entr_Clin(null, test14_vars[socket.id]['idSelectedSession'], 
                                                                        4, "", 0, "", 0, "", "", s1, s2, s3, s4, 0, "", 0, 0, 0);
                            test14_entr_clin
                            .insert()
                            .then((results) => {
                                MyJson.updateData(test14_vars[socket.id]['idPathFolder'], test14_vars[socket.id]['pathSession'], "Entr_Clin", {
                                    "FCS_Score" : (s1 + s2 +s3 +s4), 
                                    "FCS_Mémoire" : s1,
                                    "FCS_Concentration" : s2,
                                    "FCS_Capacite_Mentale" : s3,
                                    "FCS_Vitalite" : s4
                                });
                                test14_vars[socket.id]['test14_subTest'] = "";
                                sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'finish' });
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

        case "finish": 
            sock.sendData(socket, true, null, 'Test14', { 'type' : data['type'] });

            delete test14_vars[test14_vars[socket.id]['IDSocket_Patient']];
            delete test14_vars[socket.id];
            break;

        case "gds": {
            let instruction = data['instruction'];
            let page = data['page'];

            switch (instruction) {
                case "old-status-of-page":
                    test14_gds_oldStatusOfPage(socket, type, page, data['sender']);
                    break;

                case "select-word": 
                    test14_gds_selectWord(socket, type, page, data['word'], data['sender']);
                    break;

                case "show-page":  
                    if (data['page'] != 17) {                            
                        sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : instruction, 'page' : page });

                        if (data['sender'] == 'clinician') {
                            sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : instruction, 'page' : page });
                        } else if (data['sender'] == 'patient') {
                            sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : instruction, 'page' : page });
                        }
                    } else {
                        let score = test14_gds_getScore(socket, data['sender']);

                        sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : instruction, 'page' : page, 'score' : score });

                        if (data['sender'] == 'clinician') {
                            sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : instruction, 'page' : page, 'score' : score });
                        } else if (data['sender'] == 'patient') {
                            sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : instruction, 'page' : page, 'score' : score });
                        }
                    }

                    break;

                case "show-page-and-store":
                    test14_vars[socket.id]['test14_gds_page17_commentaires'] = data['commentaires'];                        
                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : page });
                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : page });
                    break;

                case "store-values": {
                    let score = test14_gds_getScore(socket, 'clinician');

                    Test14_Entr_Clin.select_partie_by_idSession(test14_vars[socket.id]['idSelectedSession'])
                    .then(([test14_entr_clin]) => {          
                        if (test14_entr_clin.length == 1) {
                            let partie = test14_entr_clin[0].partie;                                        

                            Test14_Entr_Clin.update_gds_by_idSession(test14_vars[socket.id]['idSelectedSession'], partie | 2, score, data['commentaires'])
                            .then(() => {
                                MyJson.updateData(test14_vars[socket.id]['idPathFolder'], test14_vars[socket.id]['pathSession'], "Entr_Clin", {
                                    "GDS_Score" : score, 
                                    "GDS_Commentaires" : data['commentaires']
                                });
                                test14_vars[socket.id]['test14_subTest'] = "";                                            
                                sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'finish' });
                            })
                            .catch(err => console.log(err));                                
                        } else {
                            let test14_entr_clin = new Test14_Entr_Clin(null, test14_vars[socket.id]['idSelectedSession'], 
                                                                        2, "", 0, "", 0, "", "", 0, 0, 0, 0, score, data['commentaires'], 0, 0, 0);
                            test14_entr_clin
                            .insert()
                            .then((results) => {
                                MyJson.updateData(test14_vars[socket.id]['idPathFolder'], test14_vars[socket.id]['pathSession'], "Entr_Clin", {
                                    "GDS_Score" : score, 
                                    "GDS_Commentaires" : data['commentaires']
                                });
                                test14_vars[socket.id]['test14_subTest'] = "";
                                sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'finish' });
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

        case "hm": {
            let instruction = data['instruction'];

            switch (instruction) {
                case "old-status-of-page":
                    test14_hm_oldStatusOfPage(socket, type, data['page']);
                    break;

                case "store-values":
                    Test14_Entr_Clin.select_partie_by_idSession(test14_vars[socket.id]['idSelectedSession'])
                    .then(([test14_entr_clin]) => {          
                        if (test14_entr_clin.length == 1) {
                            let partie = test14_entr_clin[0].partie;

                            Test14_Entr_Clin.update_histoire_medicale_by_idSession(test14_vars[socket.id]['idSelectedSession'], partie | 64, data['value'])
                            .then(() => { 
                                MyJson.updateData(test14_vars[socket.id]['idPathFolder'], test14_vars[socket.id]['pathSession'], "Entr_Clin", { 
                                    "Histoire_Medicale_Commentaires" : data['value']
                                });

                                test14_vars[socket.id]['test14_subTest'] = "";
                                sock.sendData(socket, true, null, 'Test14', { 'type' : 'hm', 'instruction' : 'finish' });
                            })
                            .catch(err => console.log(err));                                
                        } else {
                            let test14_entr_clin = new Test14_Entr_Clin(null, test14_vars[socket.id]['idSelectedSession'], 64, data['value'], 
                                                                        0, "", 0, "", "", 0, 0, 0, 0, 0, "", 0, 0, 0);
                            test14_entr_clin
                            .insert()
                            .then((results) => {
                                MyJson.updateData(test14_vars[socket.id]['idPathFolder'], test14_vars[socket.id]['pathSession'], "Entr_Clin", { 
                                    "Histoire_Medicale_Commentaires" : data['value']
                                });

                                test14_vars[socket.id]['test14_subTest'] = "";
                                sock.sendData(socket, true, null, 'Test14', { 'type' : 'hm', 'instruction' : 'finish' });
                            })
                            .catch(err => console.log(err));
                        }
                    })
                    .catch(err => console.log(err));                            
                    break;                                
            }
            break;
        }

        case "ia": {                        
            let instruction = data['instruction'];
            let page = data['page'];

            switch (instruction) {
                case "old-status-of-page":
                    test14_ia_oldStatusOfPage(socket, type);
                    break;

                case "select-number": 
                    test14_ia_selectNumber(socket, type, data['index']);                                
                    break;                            

                case "show-page":
                    if (page == 3) {
                        let emoussement_affectif = test14_ia_getScore(socket, "emoussement_affectif");
                        let perte_d_initiative = test14_ia_getScore(socket, "perte_d_initiative");
                        let perte_d_interet = test14_ia_getScore(socket, "perte_d_interet");                                    

                        sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : instruction, 'page' : page, 
                                                                    'emoussement_affectif' : emoussement_affectif,
                                                                    'perte_d_initiative' : perte_d_initiative,
                                                                    'perte_d_interet' : perte_d_interet
                                                                    });                                    
                    } else {
                        sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : instruction, 'page' : page });
                    }                                
                    break;

                case "store-values": {
                    let emoussement_affectif = test14_ia_getScore(socket, "emoussement_affectif");
                    let perte_d_initiative = test14_ia_getScore(socket, "perte_d_initiative");
                    let perte_d_interet = test14_ia_getScore(socket, "perte_d_interet");

                    Test14_Entr_Clin.select_partie_by_idSession(test14_vars[socket.id]['idSelectedSession'])
                    .then(([test14_entr_clin]) => {          
                        if (test14_entr_clin.length == 1) {
                            let partie = test14_entr_clin[0].partie;                                        

                            Test14_Entr_Clin.update_ia_by_idSession(test14_vars[socket.id]['idSelectedSession'], partie | 1, 
                                                                    emoussement_affectif, perte_d_initiative, perte_d_interet)
                            .then(() => {
                                MyJson.updateData(test14_vars[socket.id]['idPathFolder'], test14_vars[socket.id]['pathSession'], "Entr_Clin", {
                                    "Inventaire_Apathie_Total" : (emoussement_affectif + perte_d_initiative + perte_d_interet),
                                    "Inventaire_Apathie_Emoussement_Affectif" : emoussement_affectif, 
                                    "Inventaire_Apathie_Perte_d_Initiative" : perte_d_initiative,
                                    "Inventaire_Apathie_Perte_d_Interet" : perte_d_interet
                                });
                                test14_vars[socket.id]['test14_subTest'] = "";                                            
                                sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'finish' });
                            })
                            .catch(err => console.log(err));                                
                        } else {
                            let test14_entr_clin = new Test14_Entr_Clin(null, test14_vars[socket.id]['idSelectedSession'], 
                                                                        1, "", 0, "", 0, "", "", 0, 0, 0, 0, 0, "", 
                                                                        emoussement_affectif, perte_d_initiative, perte_d_interet);
                            test14_entr_clin
                            .insert()
                            .then((results) => {
                                MyJson.updateData(test14_vars[socket.id]['idPathFolder'], test14_vars[socket.id]['pathSession'], "Entr_Clin", {
                                    "Inventaire_Apathie_Total" : (emoussement_affectif + perte_d_initiative + perte_d_interet),
                                    "Inventaire_Apathie_Emoussement_Affectif" : emoussement_affectif, 
                                    "Inventaire_Apathie_Perte_d_Initiative" : perte_d_initiative,
                                    "Inventaire_Apathie_Perte_d_Interet" : perte_d_interet
                                });
                                test14_vars[socket.id]['test14_subTest'] = "";
                                sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'finish' });
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

        case "rj": {
            let instruction = data['instruction'];

            switch (instruction) {
                case "old-status-of-page":
                    test14_rj_oldStatusOfPage(socket, type, data['page']);
                    break;

                case "start-recording":
                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : instruction });
                    break;  
                    
                case "store-values": {
                    Test14_Entr_Clin.select_raconter_journee_by_idSession(test14_vars[socket.id]['idSelectedSession'])
                    .then(([test14_entr_clin]) => {          
                        if (test14_entr_clin.length == 1) {
                            let partie = test14_entr_clin[0].partie;
                            let number_of_file = test14_entr_clin[0].raconter_journee_number_files;

                            Test14_Entr_Clin.update_raconter_journee_by_idSession(test14_vars[socket.id]['idSelectedSession'], partie | 16, 
                                                                                  (number_of_file + 1), data['value'])
                            .then(() => {
                                let strVideoKey =  "Raconter_Journee_Video_" + (number_of_file + 1);
                                let strVideoValue =  "video_reconter_journee_" + (number_of_file + 1) + ".webm";

                                MyJson.updateData(test14_vars[socket.id]['idPathFolder'], test14_vars[socket.id]['pathSession'], "Entr_Clin", { 
                                    "Raconter_Journee_Number_Of_Files" : (number_of_file + 1),
                                    "Raconter_Journee_Commentaires" : data['value'],
                                    [strVideoKey] : test14_vars[socket.id]['test14_folderNameStoreVideoAudio'] + "/" + strVideoValue
                                });

                                test14_vars[socket.id]['test14_subTest'] = "";

                                if (test14_vars[socket.id]['test14_upload_store_media'] == 0) {                          
                                    MyUploadFiles.add_UploadFiles(test14_vars[socket.id]['IDSocket_Patient'], socket.id, "Entr_Clin");
                                    FileSystem.createFolder(test14_vars[socket.id]['test14_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test14_vars[socket.id]['idSelectedPatient'], "Entr_Clin", 
                                                                              test14_vars[socket.id]['test14_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'upload-files' });
                                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'upload-files', 
                                                                                             'number_file' : (number_of_file + 1) });
                                } else if (test14_vars[socket.id]['test14_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'upload-files' });
                                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'store-files', 
                                                                                             'number_file' : (number_of_file + 1), 
                                                                                             'id_path_folder' : test14_vars[socket.id]['idPathFolder'], 
                                                                                             'path_session' : test14_vars[socket.id]['pathSession'] });
                                } else if (test14_vars[socket.id]['test14_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test14_vars[socket.id]['IDSocket_Patient'], socket.id, "Entr_Clin");
                                    FileSystem.createFolder(test14_vars[socket.id]['test14_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test14_vars[socket.id]['idSelectedPatient'], "Entr_Clin", 
                                                                              test14_vars[socket.id]['test14_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'upload-files' });
                                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'upload-store-files', 
                                                                                             'number_file' : (number_of_file + 1), 
                                                                                             'id_path_folder' : test14_vars[socket.id]['idPathFolder'], 
                                                                                             'path_session' : test14_vars[socket.id]['pathSession'] });
                                }
                            })
                            .catch(err => console.log(err));                                
                        } else {
                            let test14_entr_clin = new Test14_Entr_Clin(null, test14_vars[socket.id]['idSelectedSession'], 16, "", 
                                                                        0, "", 1, data['value'], "", 0, 0, 0, 0, 0, "", 0, 0, 0);
                            test14_entr_clin
                            .insert()
                            .then((results) => {
                                MyJson.updateData(test14_vars[socket.id]['idPathFolder'], test14_vars[socket.id]['pathSession'], "Entr_Clin", { 
                                    "Raconter_Journee_Number_Of_Files" : 1,
                                    "Raconter_Journee_Commentaires" : data['value'],
                                    "Raconter_Journee_Video_1" : test14_vars[socket.id]['test14_folderNameStoreVideoAudio'] + "/" + "video_reconter_journee_1.webm"
                                });

                                test14_vars[socket.id]['test14_subTest'] = "";                                

                                if (test14_vars[socket.id]['test14_upload_store_media'] == 0) {
                                    MyUploadFiles.add_UploadFiles(test14_vars[socket.id]['IDSocket_Patient'], socket.id, "Entr_Clin");
                                    FileSystem.createFolder(test14_vars[socket.id]['test14_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test14_vars[socket.id]['idSelectedPatient'], "Entr_Clin", 
                                                                              test14_vars[socket.id]['test14_folderNameStoreVideoAudio']);
                                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'upload-files' });
                                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'upload-files', 
                                                                                             'number_file' : 1 });
                                } else if (test14_vars[socket.id]['test14_upload_store_media'] == 1) {
                                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'upload-files' });
                                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'store-files', 
                                                                                             'number_file' : 1, 
                                                                                             'id_path_folder' : test14_vars[socket.id]['idPathFolder'], 
                                                                                             'path_session' : test14_vars[socket.id]['pathSession'] });
                                } else if (test14_vars[socket.id]['test14_upload_store_media'] == 2) {
                                    MyUploadFiles.add_UploadFiles(test14_vars[socket.id]['IDSocket_Patient'], socket.id, "Entr_Clin");
                                    FileSystem.createFolder(test14_vars[socket.id]['test14_folderNameStoreVideoAudio']);
                                    MyGlobals.add_PatientInformationForUpload(test14_vars[socket.id]['idSelectedPatient'], "Entr_Clin", 
                                                                              test14_vars[socket.id]['test14_folderNameStoreVideoAudio'], 1);
                                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'upload-files' });
                                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'upload-store-files', 
                                                                                             'number_file' : 1, 
                                                                                             'id_path_folder' : test14_vars[socket.id]['idPathFolder'], 
                                                                                             'path_session' : test14_vars[socket.id]['pathSession'] });
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

        case 'run-subtest': {
            sock.sendData(socket, true, null, 'Test14', { 'type' : test14_vars[socket.id]['test14_subTest'], 'instruction' : 'start' });

            if (test14_vars[socket.id]['test14_subTest'] == 'fcs') {
                test14_vars[socket.id]['test14_fcs_page2_selected_sentenses'] = [0, 0, 0, 0, 0, 0, 0];
                test14_vars[socket.id]['test14_fcs_page3_selected_sentenses'] = [0, 0, 0, 0, 0, 0, 0];
                test14_vars[socket.id]['test14_fcs_page4_selected_sentenses'] = [0, 0, 0, 0, 0, 0, 0];
                test14_vars[socket.id]['test14_fcs_page5_selected_sentenses'] = [0, 0, 0, 0, 0, 0, 0];

                sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : test14_vars[socket.id]['test14_subTest'], 
                                                                                                     'instruction' : 'start' });
            } else if (test14_vars[socket.id]['test14_subTest'] == 'gds') {
                test14_vars[socket.id]['test14_gds_page2_selected_words'] = [0, 0];  // Location 0: OUI; Location 1: NON
                test14_vars[socket.id]['test14_gds_page3_selected_words'] = [0, 0];
                test14_vars[socket.id]['test14_gds_page4_selected_words'] = [0, 0];
                test14_vars[socket.id]['test14_gds_page5_selected_words'] = [0, 0];
                test14_vars[socket.id]['test14_gds_page6_selected_words'] = [0, 0];
                test14_vars[socket.id]['test14_gds_page7_selected_words'] = [0, 0];
                test14_vars[socket.id]['test14_gds_page8_selected_words'] = [0, 0];
                test14_vars[socket.id]['test14_gds_page9_selected_words'] = [0, 0];
                test14_vars[socket.id]['test14_gds_page10_selected_words'] = [0, 0];
                test14_vars[socket.id]['test14_gds_page11_selected_words'] = [0, 0];
                test14_vars[socket.id]['test14_gds_page12_selected_words'] = [0, 0];
                test14_vars[socket.id]['test14_gds_page13_selected_words'] = [0, 0];
                test14_vars[socket.id]['test14_gds_page14_selected_words'] = [0, 0];
                test14_vars[socket.id]['test14_gds_page15_selected_words'] = [0, 0];
                test14_vars[socket.id]['test14_gds_page16_selected_words'] = [0, 0];

                test14_vars[socket.id]['test14_gds_page17_commentaires'] = "";

                sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : test14_vars[socket.id]['test14_subTest'], 
                                                                                                     'instruction' : 'start' });
            } else if (test14_vars[socket.id]['test14_subTest'] == 'ia') {
                test14_vars[socket.id]['test14_ia_page2_selected_numbers'] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }                        
            break;
        }

        case "select-subtest": {
            if (test14_vars[socket.id]['test14_subTest'] == data['value']) {
                test14_vars[socket.id]['test14_subTest'] = "";
                sock.sendData(socket, true, null, 'Test14', { 'type' : 'unselect-subtest', 'value' : data['value'] });
            } else {
                test14_vars[socket.id]['test14_subTest'] = data['value'];
                sock.sendData(socket, true, null, 'Test14', { 'type' : 'select-subtest', 'value' : test14_vars[socket.id]['test14_subTest'] });
            }
            break;
        }

        case "start": {
            let IDSocket_Patient = MyRooms.getIDPatientByIDClinician(socket.id);

            test14_vars[IDSocket_Patient] = socket.id;
            test14_vars[socket.id] = {
                'IDSocket_Clinician' : socket.id,
                'IDSocket_Patient' : IDSocket_Patient,
                'idSelectedSession' : data['idselectedsession'],                
                'pathSession' : null,
                'idPathFolder' : null,
                'idSelectedPatient' : null, 
                'test14_folderNameStoreVideoAudio' : null,
                'test14_upload_store_media' : null,
                'test14_subTest' : '',
                'test14_fcs_page2_selected_sentenses' : [0, 0, 0, 0, 0, 0, 0],
                'test14_fcs_page3_selected_sentenses' : [0, 0, 0, 0, 0, 0, 0],
                'test14_fcs_page4_selected_sentenses' : [0, 0, 0, 0, 0, 0, 0],
                'test14_fcs_page5_selected_sentenses' : [0, 0, 0, 0, 0, 0, 0],
                'test14_gds_page2_selected_words' : [0, 0],  // Location 0: OUI, Location 1: NON
                'test14_gds_page3_selected_words' : [0, 0],
                'test14_gds_page4_selected_words' : [0, 0],
                'test14_gds_page5_selected_words' : [0, 0],
                'test14_gds_page6_selected_words' : [0, 0],
                'test14_gds_page7_selected_words' : [0, 0],
                'test14_gds_page8_selected_words' : [0, 0],
                'test14_gds_page9_selected_words' : [0, 0],
                'test14_gds_page10_selected_words' : [0, 0],
                'test14_gds_page11_selected_words' : [0, 0],
                'test14_gds_page12_selected_words' : [0, 0],
                'test14_gds_page13_selected_words' : [0, 0],
                'test14_gds_page14_selected_words' : [0, 0],
                'test14_gds_page15_selected_words' : [0, 0],
                'test14_gds_page16_selected_words' : [0, 0],
                'test14_gds_page17_commentaires' : "",
                'test14_ia_page2_selected_numbers' : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }

            MySession.select_by_id(test14_vars[socket.id]['idSelectedSession'])
            .then(([mysession]) => {
                if (mysession.length == 1) {
                    test14_vars[socket.id]['pathSession'] = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                    Patient.select_by_idUser(mysession[0].id_patient)
                    .then(([patient]) => {
                        if (patient.length == 1) {
                            test14_vars[socket.id]['idSelectedPatient'] = mysession[0].id_patient;
                            test14_vars[socket.id]['idPathFolder'] = patient[0].id_path_folder;
                            test14_vars[socket.id]['test14_folderNameStoreVideoAudio'] = FileSystem.FOLDER_UPLOAD + test14_vars[socket.id]['idPathFolder'] + "/" + test14_vars[socket.id]['pathSession'] + "/Entr_Clin";
                            test14_vars[socket.id]['test14_upload_store_media'] = patient[0].upload_store_media;
                            
                            sock.sendData(socket, true, null, 'Test14', { 'type' : data['type'], 'id_session' : test14_vars[socket.id]['idSelectedSession'] });    
                            sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : data['type'] });    
                        }
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
            break;
        }

        case "stop": {                        
            sock.sendData(socket, true, null, 'Test14', { 'type' : data['type'] });
            sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : data['type'] }); 

            delete test14_vars[test14_vars[socket.id]['IDSocket_Patient']];
            delete test14_vars[socket.id];
            break;
        }
    }
};

//Test 14/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test14_c_oldStatusOfPage(socket, type, page) {
    if (page == 1) {
        let conclusion_commentaires = "";
        Test14_Entr_Clin.select_conclusion_by_idSession(test14_vars[socket.id]['idSelectedSession'])
        .then(([test14_entr_clin]) => {         
            if (test14_entr_clin.length == 1) {
                conclusion_commentaires = test14_entr_clin[0].conclusion_commentaires;
            }
            sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'show-commentaires', 'page' : page, 
                                                          'commentaires' : conclusion_commentaires });
        })
        .catch(err => console.log(err));
    }
}

function test14_dl_oldStatusOfPage(socket, type, page) {
    if (page == 1) {
        let discussion_libre_commentaires = "";
        Test14_Entr_Clin.select_discussion_libre_by_idSession(test14_vars[socket.id]['idSelectedSession'])
        .then(([test14_entr_clin]) => {         
            if (test14_entr_clin.length == 1) {
                discussion_libre_commentaires = test14_entr_clin[0].discussion_libre_commentaires;
            }
            sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'show-commentaires', 'page' : page, 
                                                          'commentaires' : discussion_libre_commentaires });
        })
        .catch(err => console.log(err));
    }
}

function test14_fcs_getScore(socket, page) {
    let test14_page_selected_sentences = test14_fcs_selectSelectedSentences(socket.id, page);
    
    if (test14_page_selected_sentences[0] == 1) {
        return 3;
    } else if (test14_page_selected_sentences[1] == 1) {
        return 2;
    } else if (test14_page_selected_sentences[2] == 1) {
        return 1;
    } else if (test14_page_selected_sentences[3] == 1) {
        return -1;
    } else if (test14_page_selected_sentences[4] == 1) {
        return -2;
    } else if (test14_page_selected_sentences[5] == 1) {
        return -3;    
    } else if (test14_page_selected_sentences[6] == 1) {
        return 0;
    }
}

function test14_fcs_oldStatusOfPage(socket, type, page, sender) {
    let test14_page_selected_sentences;

    if (sender === 'clinician') {
        test14_page_selected_sentences = test14_fcs_selectSelectedSentences(socket.id, page);
    } else if (sender === 'patient') {
        test14_page_selected_sentences = test14_fcs_selectSelectedSentences(test14_vars[socket.id], page);
    }

    switch (page) {
        case 2: case 3: case 4: case 5: {
            for(let i = 0; i < test14_page_selected_sentences.length; i++) {                                    
                if (test14_page_selected_sentences[i] == 1) {                     
                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'select-sentence', 'page' : page, 'sentence' : (i + 1) });
                    break;                
                }
            }

            test14_fcs_showHideContinuerButton(socket, type, page, test14_page_selected_sentences, sender);
            break;
        }
    }
}

function test14_fcs_selectSentence(socket, type, page, order_number_of_sentence, sender) {
    let test14_page_selected_sentences;

    if (sender === 'clinician') {
        test14_page_selected_sentences = test14_fcs_selectSelectedSentences(socket.id, page);
    } else if (sender === 'patient') {
        test14_page_selected_sentences = test14_fcs_selectSelectedSentences(test14_vars[socket.id], page);
    }

    switch(page) {
        case 2: case 3: case 4: case 5:
            if (test14_page_selected_sentences[order_number_of_sentence - 1] == 0) {
                test14_page_selected_sentences[order_number_of_sentence - 1] = 1;            

                for (let i = 0; i < test14_page_selected_sentences.length; i++) {
                    if (i != (order_number_of_sentence - 1)) {                        
                        if (test14_page_selected_sentences[i] == 1) {
                            test14_page_selected_sentences[i] = 0;                            
                            sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'unselect-sentence', 'page' : page, 'sentence' : (i + 1) });
                            if (sender == "clinician") {
                                sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'unselect-sentence', 'page' : page, 'sentence' : (i + 1) });
                            } else if (sender == "patient") {
                                sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'unselect-sentence', 'page' : page, 'sentence' : (i + 1) });
                            }
                            break;
                        }
                    }
                }

                sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'select-sentence', 'page' : page, 'sentence' : order_number_of_sentence });
                if (sender == "clinician") {
                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'select-sentence', 'page' : page, 'sentence' : order_number_of_sentence });
                } else if (sender == "patient") {
                    sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'select-sentence', 'page' : page, 'sentence' : order_number_of_sentence });
                }
            } else {
                test14_page_selected_sentences[order_number_of_sentence - 1] = 0;            
                sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'unselect-sentence', 'page' : page, 'sentence' : order_number_of_sentence });
                if (sender == "clinician") {
                    sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'unselect-sentence', 'page' : page, 'sentence' : order_number_of_sentence });
                } else if (sender == "patient") {
                    sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'unselect-sentence', 'page' : page, 'sentence' : order_number_of_sentence });
                }
            }

            test14_fcs_showHideContinuerButton(socket, type, page, test14_page_selected_sentences, sender);

            break;
    }
}

function test14_fcs_selectSelectedSentences(IDSocket_Clinician, page) {
    switch (page) {
        case 2:
            return test14_vars[IDSocket_Clinician]['test14_fcs_page2_selected_sentenses'];

        case 3:
            return test14_vars[IDSocket_Clinician]['test14_fcs_page3_selected_sentenses'];
        
        case 4:
            return test14_vars[IDSocket_Clinician]['test14_fcs_page4_selected_sentenses'];
        
        case 5:
            return test14_vars[IDSocket_Clinician]['test14_fcs_page5_selected_sentenses'];
    }
}

function test14_fcs_showHideContinuerButton(socket, type, page, page_selected_sentences, sender) {
    let showContinuer = false;    

    for (let i = 0; i < page_selected_sentences.length; i++) {
        if (page_selected_sentences[i] == 1) {
            showContinuer = true;
            break;
        }                    
    }    

    if (sender == "clinician") {
        if (showContinuer == true) {
            sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'show-continuer', 'page' : page });                
        } else {
            sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'hide-continuer', 'page' : page });                
        }
    } else if (sender == "patient") {
        if (showContinuer == true) {
            sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'show-continuer', 'page' : page });                
        } else {
            sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'hide-continuer', 'page' : page });                
        }
    }
}

function test14_gds_getScore(socket, sender) {
    let score = 0;

    for(let i = 2; i <= 16; i++) {
        let test14_page_selected_words;

        if (sender === 'clinician') {
            test14_page_selected_words = test14_gds_selectSelectedWords(socket.id, i);
        } else if (sender === 'patient') {
            test14_page_selected_words = test14_gds_selectSelectedWords(test14_vars[socket.id], i);            
        }

        if ((i == 3) || (i == 4) || (i == 5) || (i == 7) || (i == 9) || (i == 10) || (i == 11) || (i == 13) || (i == 15) || (i == 16)) {
            if (test14_page_selected_words[0] == 1) {
                score++;
            }
        } else if ((i == 2) || (i == 6) || (i == 8) || (i == 12) || (i == 14)) {
            if (test14_page_selected_words[1] == 1) {
                score++;
            }
        }
    }

    return score;
}

function test14_gds_oldStatusOfPage(socket, type, page, sender) {
    let test14_page_selected_words;

    if (sender === 'clinician') {
        test14_page_selected_words = test14_gds_selectSelectedWords(socket.id, page);
    } else if (sender === 'patient') {
        test14_page_selected_words = test14_gds_selectSelectedWords(test14_vars[socket.id], page);
    }

    switch (page) {
        case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: {
            if (test14_page_selected_words[0] == 1) {
                sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'select-word', 'page' : page, 'word' : 'oui' });
                sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'show-continuer', 'page' : page });
            } else if (test14_page_selected_words[1] == 1) {
                sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'select-word', 'page' : page, 'word' : 'non' });
                sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'show-continuer', 'page' : page });
            }

            break;
        }

        case 17:         
            sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'set-text', 'page' : page, 
                                                          'text' : test14_vars[socket.id]['test14_gds_page17_commentaires'] });
            break;
    }
}

function test14_gds_selectSelectedWords(IDSocket_Clinician, page) {
    switch (page) {
        case 2:
            return test14_vars[IDSocket_Clinician]['test14_gds_page2_selected_words'];

        case 3:
            return test14_vars[IDSocket_Clinician]['test14_gds_page3_selected_words'];

        case 4:            
            return test14_vars[IDSocket_Clinician]['test14_gds_page4_selected_words'];

        case 5:
            return test14_vars[IDSocket_Clinician]['test14_gds_page5_selected_words'];

        case 6:
            return test14_vars[IDSocket_Clinician]['test14_gds_page6_selected_words'];

        case 7:
            return test14_vars[IDSocket_Clinician]['test14_gds_page7_selected_words'];

        case 8:
            return test14_vars[IDSocket_Clinician]['test14_gds_page8_selected_words'];

        case 9:
            return test14_vars[IDSocket_Clinician]['test14_gds_page9_selected_words'];

        case 10:
            return test14_vars[IDSocket_Clinician]['test14_gds_page10_selected_words'];

        case 11:
            return test14_vars[IDSocket_Clinician]['test14_gds_page11_selected_words'];

        case 12:
            return test14_vars[IDSocket_Clinician]['test14_gds_page12_selected_words'];

        case 13:
            return test14_vars[IDSocket_Clinician]['test14_gds_page13_selected_words'];

        case 14:
            return test14_vars[IDSocket_Clinician]['test14_gds_page14_selected_words'];

        case 15:
            return test14_vars[IDSocket_Clinician]['test14_gds_page15_selected_words'];

        case 16:
            return test14_vars[IDSocket_Clinician]['test14_gds_page16_selected_words'];
    }
}

function test14_gds_selectWord(socket, type, page, word, sender) {
    let test14_page_selected_words;

    if (sender === 'clinician') {
        test14_page_selected_words = test14_gds_selectSelectedWords(socket.id, page);
    } else if (sender === 'patient') {
        test14_page_selected_words = test14_gds_selectSelectedWords(test14_vars[socket.id], page);
    }

    switch(page) {
        case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
            if (word == 'oui') {
                if (test14_page_selected_words[0] == 0) {    
                    test14_page_selected_words[0] = 1;   
                    
                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'select-word', 'page' : page, 'word' : 'oui' });

                    if (sender == "clinician") {
                        sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'select-word', 'page' : page, 'word' : 'oui' });
                    } else if (sender == "patient") {
                        sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'select-word', 'page' : page, 'word' : 'oui' });
                    }

                    if (test14_page_selected_words[1] == 1) {
                        test14_page_selected_words[1] = 0;

                        sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'unselect-word', 'page' : page, 'word' : 'non' });
                        if (sender == "clinician") {
                            sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'unselect-word', 'page' : page, 'word' : 'non' });
                        } else if (sender == "patient") {
                            sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'unselect-word', 'page' : page, 'word' : 'non' });
                        }
                    }

                    if (test14_page_selected_words[1] == 0) {
                        sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'show-continuer', 'page' : page });

                        if (sender == "clinician") {
                            sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'show-continuer', 'page' : page });
                        } else if (sender == "patient") {
                            sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'show-continuer', 'page' : page });
                        }
                    }
                } else if (test14_page_selected_words[0] == 1) {
                    test14_page_selected_words[0] = 0;  
                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'unselect-word', 'page' : page, 'word' : 'oui' });

                    if (sender == "clinician") {
                        sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'unselect-word', 'page' : page, 'word' : 'oui' });
                    } else if (sender == "patient") {
                        sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'unselect-word', 'page' : page, 'word' : 'oui' });
                    }

                    
                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'hide-continuer', 'page' : page });

                    if (sender == "clinician") {
                        sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'hide-continuer', 'page' : page });
                    } else if (sender == "patient") {
                        sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'hide-continuer', 'page' : page });
                    }                    
                }    
            } else if (word == 'non') {
                if (test14_page_selected_words[1] == 0) {    
                    test14_page_selected_words[1] = 1;    
                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'select-word', 'page' : page, 'word' : 'non' });

                    if (sender == "clinician") {
                        sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'select-word', 'page' : page, 'word' : 'non' });
                    } else if (sender == "patient") {
                        sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'select-word', 'page' : page, 'word' : 'non' });
                    }

                    if (test14_page_selected_words[0] == 1) {
                        test14_page_selected_words[0] = 0;

                        sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'unselect-word', 'page' : page, 'word' : 'oui' });
                        if (sender == "clinician") {
                            sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'unselect-word', 'page' : page, 'word' : 'oui' });
                        } else if (sender == "patient") {
                            sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'unselect-word', 'page' : page, 'word' : 'oui' });
                        }
                    }

                    if (test14_page_selected_words[0] == 0) {                    
                        sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'show-continuer', 'page' : page });

                        if (sender == "clinician") {
                            sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'show-continuer', 'page' : page });
                        } else if (sender == "patient") {
                            sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'show-continuer', 'page' : page });
                        }
                    }
                } else if (test14_page_selected_words[1] == 1) {
                    test14_page_selected_words[1] = 0;    
                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'unselect-word', 'page' : page, 'word' : 'non' });

                    if (sender == "clinician") {
                        sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'unselect-word', 'page' : page, 'word' : 'non' });
                    } else if (sender == "patient") {
                        sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'unselect-word', 'page' : page, 'word' : 'non' });
                    }

                    
                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'hide-continuer', 'page' : page });

                    if (sender == "clinician") {
                        sock.sendData(socket, false, test14_vars[socket.id]['IDSocket_Patient'], 'Test14', { 'type' : type, 'instruction' : 'hide-continuer', 'page' : page });
                    } else if (sender == "patient") {
                        sock.sendData(socket, false, test14_vars[socket.id], 'Test14', { 'type' : type, 'instruction' : 'hide-continuer', 'page' : page });
                    }
                }
            }
            break;
    }
}

function test14_hm_oldStatusOfPage(socket, type, page) {
    if (page == 1) {
        let histoire_medicale_commentaires = "";
        Test14_Entr_Clin.select_histoire_medicale_by_idSession(test14_vars[socket.id]['idSelectedSession'])
        .then(([test14_entr_clin]) => {         
            if (test14_entr_clin.length == 1) {
                histoire_medicale_commentaires = test14_entr_clin[0].histoire_medicale_commentaires;
            }

            sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'show-commentaires', 'page' : page, 
                                                          'commentaires' : histoire_medicale_commentaires });
        })
        .catch(err => console.log(err));
    }
}

function test14_ia_getScore(socket, kind_of_computation) {
    switch(kind_of_computation) {
        case "emoussement_affectif":
            for(let i = 0; i <= 4; i++) {
                if (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][i] == 1) {
                    return i;
                }
            }
            break;

        case "perte_d_initiative":
            for(let i = 0; i <= 4; i++) {
                if (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][i + 5] == 1) {
                    return i;
                }
            }
            break;
        
        case "perte_d_interet":
            for(let i = 0; i <= 4; i++) {
                if (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][i + 10] == 1) {
                    return i;
                }
            }
            break;        
    }
    return 0;
}

function test14_ia_oldStatusOfPage(socket, type) {
    for(let i = 0; i < test14_vars[socket.id]['test14_ia_page2_selected_numbers'].length; i++) {                                    
        if (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][i] == 1) {                     
            sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'select-number', 'index' : (i + 1) });            
        }
    }
    test14_ia_showHideContinuerButton(socket, type);
}

function test14_ia_selectNumber(socket, type, index) {
    let index_arr = index - 1;

    if (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][index_arr] == 0) {
        test14_vars[socket.id]['test14_ia_page2_selected_numbers'][index_arr] = 1;

        if ((index_arr >= 0) && (index_arr <= 4)) {
            for(let i = 0; i <= 4; i++) {
                if ((i != index_arr) && (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][i] == 1)) {
                    test14_vars[socket.id]['test14_ia_page2_selected_numbers'][i] = 0;
                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'unselect-number', 'index' : (i + 1) });
                    break;
                }
            }
        } else if ((index_arr >= 5) && (index_arr <= 9)) {
            for(let i = 5; i <= 9; i++) {
                if ((i != index_arr) && (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][i] == 1)) {
                    test14_vars[socket.id]['test14_ia_page2_selected_numbers'][i] = 0;
                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'unselect-number', 'index' : (i + 1) });
                    break;
                }
            }
        } else if ((index_arr >= 10) && (index_arr <= 14)) {
            for(let i = 10; i <= 14; i++) {
                if ((i != index_arr) && (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][i] == 1)) {
                    test14_vars[socket.id]['test14_ia_page2_selected_numbers'][i] = 0;
                    sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'unselect-number', 'index' : (i + 1) });
                    break;
                }
            }
        }

        sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'select-number', 'index' : (index_arr + 1) });
    } else if (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][index_arr] == 1) {
        test14_vars[socket.id]['test14_ia_page2_selected_numbers'][index_arr] = 0;
        sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'unselect-number', 'index' : (index_arr + 1) });
    }

    test14_ia_showHideContinuerButton(socket, type);
}

function test14_ia_showHideContinuerButton(socket, type) {
    if ( ((test14_vars[socket.id]['test14_ia_page2_selected_numbers'][0] == 1) || (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][1] == 1) || 
          (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][2] == 1) || (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][3] == 1) || 
          (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][4] == 1)) && 
         ((test14_vars[socket.id]['test14_ia_page2_selected_numbers'][5] == 1) || (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][6] == 1) || 
          (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][7] == 1) || (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][8] == 1) || 
          (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][9] == 1)) &&  
         ((test14_vars[socket.id]['test14_ia_page2_selected_numbers'][10] == 1) || (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][11] == 1) || 
          (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][12] == 1) || (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][13] == 1) || 
          (test14_vars[socket.id]['test14_ia_page2_selected_numbers'][14] == 1)) ) {
        sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'show-continuer' });
    } else {
        sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'hide-continuer' });
    }
}

function test14_rj_oldStatusOfPage(socket, type, page) {
    if (page == 1) {
        let raconter_journee_commentaires = "";
        Test14_Entr_Clin.select_raconter_journee_by_idSession(test14_vars[socket.id]['idSelectedSession'])
        .then(([test14_entr_clin]) => {         
            if (test14_entr_clin.length == 1) {
                raconter_journee_commentaires = test14_entr_clin[0].raconter_journee_commentaires;
            }
            sock.sendData(socket, true, null, 'Test14', { 'type' : type, 'instruction' : 'show-commentaires', 'page' : page, 
                                                          'commentaires' : raconter_journee_commentaires });
        })
        .catch(err => console.log(err));
    }
}