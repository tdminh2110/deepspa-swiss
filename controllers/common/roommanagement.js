let rooms = {};

module.exports.clinicianJoinRoom = function(IDSocket, IDPeer_Clinician, emailClinician, listEmailPatients) {
    let myRooms = Object.keys(rooms);
    let createNewRoom = true;

    for(let i = 0; i < myRooms.length; i++) {
        let room = myRooms[i];
        if (listEmailPatients.includes(room)) {
            rooms[emailClinician] = {
                'clinician_socket' : { 'idSocket' : IDSocket, 'idPeer' : IDPeer_Clinician, 'email' : emailClinician },
                'patient_socket' : rooms[room]['patient_socket']
            }
            delete rooms[room];
            createNewRoom = false;
            break;
        }
    }

    if (createNewRoom) {
        rooms[emailClinician] = {
            'clinician_socket' : { 'idSocket' : IDSocket, 'idPeer' : IDPeer_Clinician, 'email' : emailClinician },
            'patient_socket' : null
        }
    }
}

module.exports.clinicianUpdateIDPeerByEmail = function(emailClinician, IDPeer_Clinician) {
    let myRooms = Object.keys(rooms);
    
    if (myRooms.includes(emailClinician)) {
        rooms[emailClinician]['clinician_socket']['idPeer'] = IDPeer_Clinician;
    }
}

module.exports.disconnect = function(IDSocket) {
    let myRooms = Object.keys(rooms);
    for(let i = 0; i < myRooms.length; i++) {
        let room = myRooms[i];

        if (rooms[room]['clinician_socket'] != null) {
            if (rooms[room]['clinician_socket']['idSocket'] == IDSocket) {
                rooms[room]['clinician_socket'] = null;

                if (rooms[room]['patient_socket'] == null) {
                    delete rooms[room];
                } else {
                    rooms['#' + rooms[room]['patient_socket'].email] = rooms[room];
                    delete rooms[room];
                }

                break;
            }
        }

        if (rooms[room]['patient_socket'] != null) {
            if (rooms[room]['patient_socket']['idSocket'] == IDSocket) {
                rooms[room]['patient_socket'] = null;

                if (rooms[room]['clinician_socket'] == null) {
                    delete rooms[room];
                }

                break;
            }
        }
    }
}

module.exports.isConnectedToRoomEmailClinician = function(emailClinician) {
    let myRooms = Object.keys(rooms);

    if (myRooms.includes(emailClinician)) {
        if (rooms[emailClinician]['patient_socket'] != null) {
            return true;
        } else {
            return false;
        }
    }    
    return false;
}

module.exports.isExistEmailClinician = function(emailClinician) {
    return Object.keys(rooms).includes(emailClinician);
}

module.exports.isExistEmailPatient = function(emailPatient) {
    let myRooms = Object.keys(rooms);
    for(let i = 0; i < myRooms.length; i++) {
        let room = myRooms[i];

        if (rooms[room]['patient_socket'] != null) {
            if (rooms[room]['patient_socket']['email'] == emailPatient) {
                return true;
            }
        }
    }

    return false;
}

module.exports.patientJoinRoom = function(IDSocket, IDPeer_Patient, IDPatient, emailPatient, emailClinician) {    
    let myRooms = Object.keys(rooms);

    if (myRooms.includes(emailClinician)) {
        rooms[emailClinician]['patient_socket'] = { 'idSocket' : IDSocket, 'idPeer' : IDPeer_Patient, 'idPatient' : IDPatient, 'email' : emailPatient }        
    } else {
        rooms['#' + emailPatient] = {
            'clinician_socket' : null,
            'patient_socket' : { 'idSocket' : IDSocket, 'idPeer' : IDPeer_Patient, 'idPatient' : IDPatient, 'email' : emailPatient }
        }
    }
}

module.exports.patientUpdateIDPeerByEmail = function(emailPatient, IDPeer_Patient) {
    let myRooms = Object.keys(rooms);

    for(let i = 0; i < myRooms.length; i++) {
        let room = myRooms[i];

        if (rooms[room]['patient_socket'] != null) {
            if (rooms[room]['patient_socket']['email'] == emailPatient) {
                rooms[room]['patient_socket']['idPeer'] = IDPeer_Patient;
                break;
            }
        }
    }
}



//-------------------------------------------------------------------------------------------------------------------------------------

module.exports.getKeyOfRooms = function() {
    return Object.keys(rooms);
}

module.exports.getClinicianInfoByEmailPatient = function(emailPatient) {
    let myRooms = Object.keys(rooms);

    for(let i = 0; i < myRooms.length; i++) {
        let room = myRooms[i];

        if (rooms[room]['patient_socket'] != null) {
            if (rooms[room]['patient_socket']['email'] == emailPatient) {
                return rooms[room]['clinician_socket'];
            }
        }
    }

    return null;
}

module.exports.getIDPatientByIDClinician = function(IDClinician) {
    let myRooms = Object.keys(rooms);

    for(let i = 0; i < myRooms.length; i++) {
        let room = myRooms[i];

        if (rooms[room]['clinician_socket'] != null) {
            if (rooms[room]['clinician_socket']['idSocket'] == IDClinician) {
                return rooms[room]['patient_socket']['idSocket'];
            }
        }
    }

    return null;
}

module.exports.getPatientInfoByEmailClinician = function(emailClinician) {
    let myRooms = Object.keys(rooms);

    if (myRooms.includes(emailClinician)) {
        return rooms[emailClinician]['patient_socket'];
    } else {
        return null;
    }
}

module.exports.getPatientInfoByEmailPatient = function(emailPatient) {
    let myRooms = Object.keys(rooms);

    for(let i = 0; i < myRooms.length; i++) {
        let room = myRooms[i];

        if (rooms[room]['patient_socket'] != null) {
            if (rooms[room]['patient_socket']['email'] == emailPatient) {
                return rooms[room]['patient_socket'];
            }
        }
    }

    return null;
}

module.exports.getRooms = function() {
    return rooms;
}