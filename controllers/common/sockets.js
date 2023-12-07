const Patient = require('../../models/patient');
const User = require('../../models/user');
const MySession = require('../../models/session');
const MyUploadFiles = require('./uploadfiles');
const FileSystem = require('./filesystem');
const MyGlobals = require('./globals');

const Test09_FVLEX_Socket = require('./sockets/test09_fvlex');
const Test10_FVSEM_Socket = require('./sockets/test10_fvsem');
const Test14_Entr_Clin_Socket = require('./sockets/test14_entr_clin');
const Test24_GDS_Socket = require('./sockets/test24_gds');
const Test26_DeepSpa_Socket = require('./sockets/test26_deepspa');
const Test31_MOCA_Socket = require('./sockets/test31_moca');
const Test37_Digital_Span_Socket = require('./sockets/test37_digital_span');
const Test38_BNT_15_Socket = require('./sockets/test38_bnt_15');
const Test39_Words_List_Socket = require('./sockets/test39_words_list');
const Test40_Stroop_Victoria_2_Socket = require('./sockets/test40_stroop_victoria_2');

const sock = require('./sockets/senddata');
const MyRooms = require('./roommanagement');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    startSocketServer: function (app) {
        //io = socketio.listen(app);
        io = require('socket.io')(app, {'pingTimeout' : 30000, 'pingInterval' : 10000 });

        io.sockets.on('connection', function (socket) {
            console.log("New connection: " + socket.id);

            socket.emit("Who are you ?", { 'type' : 'Chao' });

            socket.on('ping_minh', (data, fn) => {                
                sock.sendData(socket, true, null, 'pong_minh', { 'value' : 'Server' });
            });

            socket.on('connect_error', (error) => {
               console.log('connect_error: ' + error);
            });

            socket.on('connect_timeout', (timeout) => {
                console.log('connect_timeout: ' + timeout);
            });

            socket.on('error', (error) => {
                console.log('error: ' + error);
            });

            socket.on('disconnect', disconnect => {                    
                console.log("Disconnect-------------------");

                MyRooms.disconnect(socket.id);

                console.log("--------------------------");
            });            
            
            //arg1: where to send to server
            //type: Type of message
            //value            
            socket.on('Clinician', (data, fn) => {
                switch (data['type']) {
                    case 'disconnect':
                        if (io.sockets.sockets[data['idsocket']]) {                            
                            MyRooms.disconnect(data['idsocket']);
                            io.sockets.sockets[data['idsocket']].disconnect();
                        }
                        break;
                    
                    case 'email':
                        let emailClinician = data['value'];

                        if (!MyRooms.isExistEmailClinician(emailClinician)) {
                            User.select_emailPatient_by_emailClinician(emailClinician)
                            .then(([users]) => {
                                let listEmailPatients = [];
                                for (let i = 0; i < users.length; i++) {
                                    listEmailPatients.push('#' + users[i].email);
                                }
                                MyRooms.clinicianJoinRoom(socket.id, null, emailClinician, listEmailPatients);
                                socket.emit("Clinician", { "type" : "create peer" });
                            })
                            .catch(err => console.log(err));
                        } else {
                            socket.emit("Clinician", { "type" : "Connection Already Exist" });
                        }
                        break;
                    
                    case 'idpeer': {
                        let idPeer_Clinician = data['value'];
                        let email_Clinician = data['email'];

                        MyRooms.clinicianUpdateIDPeerByEmail(email_Clinician, idPeer_Clinician);
                        socket.emit("Clinician", { "type" : "create local video" });

                        break;
                    }

                    case 'created local video': {
                        let email_Clinician = data['email'];
                        let patient_socket = MyRooms.getPatientInfoByEmailClinician(email_Clinician);

                        if (patient_socket != null) {
                            if (patient_socket.idPeer != null) {
                                socket.emit('Clinician', { 'type' : 'IDPeer_Patient', 'value' : patient_socket.idPeer});
                                MySession.select_by_idPatient_orderby_createdNumber(patient_socket.idPatient)
                                .then(([sessions]) => {
                                    let listSessions = [];
                                    for (let i = 0; i < sessions.length; i++) {
                                        listSessions.push("S_" + sessions[i].created_date + "-" + sessions[i].created_number);
                                    }

                                    Patient.select_by_idUser(patient_socket.idPatient)
                                    .then(([patient]) => {
                                        socket.emit('Clinician', { 'type' : 'IDPatient', 'value' : patient_socket.idPatient, 'listOfSessions' : listSessions, 'storeMedia' : patient[0].upload_store_media });
                                    })
                                    .catch(err => console.log(err));
                                })
                                .catch(err => console.log(err));
                            }
                        }                        
                        break;
                    }

                    case 'create data connetion of peers': {
                        let email_Clinician = data['email'];
                        let patient_socket = MyRooms.getPatientInfoByEmailClinician(email_Clinician);

                        socket.emit('Clinician', { 'type' : 'Create_DataConnection', 'idpeer_patient' : patient_socket.idPeer});                        
                        break;
                    }

                    case 'get list of sessions': {
                        let email_Clinician = data['email'];
                        let patient_socket = MyRooms.getPatientInfoByEmailClinician(email_Clinician);

                        if (patient_socket != null) {
                            MySession.select_by_idPatient_orderby_createdNumber(patient_socket.idPatient)                        
                            .then(([sessions]) => {
                                let listSessions = [];
                                for (let i = 0; i < sessions.length; i++) {
                                    listSessions.push("S_" + sessions[i].created_date + "-" + sessions[i].created_number);
                                }
                                socket.emit('Clinician', { 'type' : 'list of sessions', 'listOfSessions' : listSessions });                                
                            })
                            .catch(err => console.log(err));
                        }
                        break;
                    }

                    case 'take-photo': {
                        let IDSession = data['idselectedsession'];

                        MySession.select_by_id(IDSession)
                        .then(([mysession]) => {
                            if (mysession.length == 1) {
                                let idSelectedPatient = mysession[0].id_patient;
                                let pathSession = "S_" + mysession[0].created_date + "-" + mysession[0].created_number.toString();
                                let snapshotNumber = mysession[0].snapshot_number;
                                
                                Patient.select_by_idUser(idSelectedPatient)
                                .then(([patient]) => {
                                    if (patient.length == 1) {
                                        let idPathFolder = patient[0].id_path_folder;
                                        let upload_store_media = patient[0].upload_store_media;                                        
                                        let folderNameStorePhoto = FileSystem.FOLDER_UPLOAD + idPathFolder + "/" + pathSession + "/Snapshot";

                                        let IDSocket_Patient = MyRooms.getIDPatientByIDClinician(socket.id);
                                        snapshotNumber++;

                                        MySession.update_snapshot_number_by_id(IDSession, snapshotNumber)
                                        .then(() => {
                                            if (upload_store_media == 0) {
                                                MyUploadFiles.add_UploadFiles(IDSocket_Patient, socket.id, "TakePhoto");
                                                FileSystem.createFolder(folderNameStorePhoto);
                                                MyGlobals.add_PatientInformationForUpload(idSelectedPatient, "TakePhoto", folderNameStorePhoto, 1);

                                                sock.sendData(socket, true, null, 'Clinician', { 'type' : 'upload-files'});
                                                sock.sendData(socket, false, IDSocket_Patient, 'Patient', { 'type' : 'take-photo', 
                                                                                                            'instruction' : 'upload-files', 
                                                                                                            'snapshot_number' : snapshotNumber });
                                            } else if (upload_store_media == 1) {
                                                sock.sendData(socket, false, IDSocket_Patient, 'Patient', { 'type' : 'take-photo', 'instruction' : 'store-files', 
                                                                                            'id_path_folder' : idPathFolder, 
                                                                                            'path_session' : pathSession,
                                                                                            'snapshot_number' : snapshotNumber });
                                            } else if (upload_store_media == 2) {
                                                MyUploadFiles.add_UploadFiles(IDSocket_Patient, socket.id, "TakePhoto");
                                                FileSystem.createFolder(folderNameStorePhoto);
                                                MyGlobals.add_PatientInformationForUpload(idSelectedPatient, "TakePhoto", folderNameStorePhoto, 1);

                                                sock.sendData(socket, true, null, 'Clinician', { 'type' : 'upload-files'});
                                                sock.sendData(socket, false, IDSocket_Patient, 'Patient', { 'type' : 'take-photo', 'instruction' : 'upload-store-files', 
                                                                                                            'id_path_folder' : idPathFolder, 
                                                                                                            'path_session' : pathSession,
                                                                                                            'snapshot_number' : snapshotNumber });
                                            } 
                                        })
                                        .catch(err => console.log(err));
                                    }
                                })
                                .catch(err => console.log(err));
                            }
                        })
                        .catch(err => console.log(err));
                        break;
                    }
                }
            });

            //arg1: where to send to server
            //type: Type of message
            //value 
            socket.on('Patient', (data, fn) => {
                switch (data['type']) {
                    case 'disconnect':
                        if (io.sockets.sockets[data['idsocket']]) {                            
                            MyRooms.disconnect(data['idsocket']);
                            io.sockets.sockets[data['idsocket']].disconnect();
                        }
                        break;

                    case 'email':
                        let emailPatient = data['value'];

                        if (!MyRooms.isExistEmailPatient(emailPatient)) {                            
                            User.select_emailClinician_by_emailPatient(emailPatient)
                            .then(([users]) => {
                                if (users.length == 1) {
                                    let emailClinician = users[0].email;
                                    if (!MyRooms.isConnectedToRoomEmailClinician(emailClinician)) {
                                        User.search_by_email(emailPatient)
                                        .then(([users]) => {
                                            if (users.length == 1) {    
                                                MyRooms.patientJoinRoom(socket.id, null, users[0].id, emailPatient, emailClinician);                                                                                               
                                                socket.emit("Patient", { "type" : "create peer" });                                    
                                            }   
                                            else
                                                console.log("Not OK");
                                        })
                                        .catch(err => console.log(err));
                                    } else {
                                        socket.emit("Patient", { "type" : "Room Already Exist" });
                                    }
                                }
                            })
                            .catch(err => console.log(err));                            
                        } else {                            
                            socket.emit("Patient", { "type" : "Connection Already Exist" });
                        }
                        break; 

                    case 'idpeer': {
                        let idPeer_Patient = data['value'];
                        let email_Patient = data['email'];

                        MyRooms.patientUpdateIDPeerByEmail(email_Patient, idPeer_Patient);
                        socket.emit("Patient", { "type" : "create local video" });
                        break;
                    }

                    case 'created local video': {                        
                        let email_Patient = data['email'];
                        let patient_socket = MyRooms.getPatientInfoByEmailPatient(email_Patient);
                        let clinician_socket = MyRooms.getClinicianInfoByEmailPatient(email_Patient);
                        
                        if (clinician_socket != null) {                            
                            if (clinician_socket.idPeer != null) {
                                socket.emit('Patient', { 'type' : 'IDPeer_Clinician', 'value' : clinician_socket.idPeer});  
                                MySession.select_by_idPatient_orderby_createdNumber(patient_socket.idPatient) 
                                .then(([sessions]) => {
                                    let listSessions = [];
                                    for (let i = 0; i < sessions.length; i++) {
                                        listSessions.push("S_" + sessions[i].created_date + "-" + sessions[i].created_number);
                                    }

                                    Patient.select_by_idUser(patient_socket.idPatient)
                                    .then(([patient]) => {
                                        socket.broadcast.to(clinician_socket.idSocket).emit('Clinician', { 'type' : 'IDPatient', 'value' : patient_socket.idPatient, 'listOfSessions' : listSessions, 'storeMedia' : patient[0].upload_store_media });
                                    })
                                    .catch(err => console.log(err));                                    
                                })
                                .catch(err => console.log(err));
                            }
                        }                        
                        break;
                    }
                        
                    case 'create data connetion of peers': {
                        let email_Patient = data['email'];
                        let clinician_socket = MyRooms.getClinicianInfoByEmailPatient(email_Patient);
                        
                        socket.emit('Patient', { 'type' : 'Create_DataConnection', 'idpeer_clinician' : clinician_socket.idPeer});
                        break;
                    }
                }
            });

            socket.on('Files-Uploaded', (data, fn) => {                
                let IDSocket_Clinician = MyUploadFiles.getIDSocketClinician_UploadFiles(socket.id);
                MyUploadFiles.remove_UploadFiles(socket.id, data['test']);
                if (MyUploadFiles.checkEmpty_UploadFiles(socket.id)) {
                    sock.sendData(socket, false, IDSocket_Clinician, 'Files-Uploaded', {});
                }
            });

            socket.on('Test09', (data, fn) => {
                Test09_FVLEX_Socket.test09_fvlex_socket(socket, data);
            });

            socket.on('Test10', (data, fn) => {                
                Test10_FVSEM_Socket.test10_fvsem_socket(socket, data);
            });

            socket.on('Test14', (data, fn) => {
                Test14_Entr_Clin_Socket.test14_entr_clin_socket(socket, data);
            });

            socket.on('Test24', (data, fn) => {
                Test24_GDS_Socket.test24_gds_socket(socket, data);
            });

            socket.on('Test26', (data, fn) => {
                Test26_DeepSpa_Socket.test26_deepspa_socket(socket, data);
            });            

            socket.on('Test31', (data, fn) => {
                Test31_MOCA_Socket.test31_moca_socket(socket, data);
            });            

            socket.on('Test37', (data, fn) => {
                Test37_Digital_Span_Socket.test37_digital_span_socket(socket, data);
            });

            socket.on('Test38', (data, fn) => {
                Test38_BNT_15_Socket.test38_bnt_15_socket(socket, data);
            });

            socket.on('Test39', (data, fn) => {
                Test39_Words_List_Socket.test39_words_list_socket(socket, data);
            });

            socket.on('Test40', (data, fn) => {
                Test40_Stroop_Victoria_2_Socket.test40_stroop_victoria_2_socket(socket, data);
            });
        });
    }
};