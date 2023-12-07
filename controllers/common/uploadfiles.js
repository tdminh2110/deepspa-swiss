let upload_files = {};

module.exports.add_UploadFiles = function(IDSocket_Patient, IDSocket_Clinician, nameTest) {
    if (upload_files[IDSocket_Patient] === undefined) {
        upload_files[IDSocket_Patient] = {};
    } 

    if (upload_files[IDSocket_Patient][nameTest] === undefined) {            
        upload_files[IDSocket_Patient]['IDSocket_Clinician'] = IDSocket_Clinician;
        upload_files[IDSocket_Patient][nameTest] = 1;
    } else {
        upload_files[IDSocket_Patient][nameTest]++;
    }
}

//return true if empty
module.exports.checkEmpty_UploadFiles = function(IDSocket_Patient) {
    if ((upload_files[IDSocket_Patient] !== undefined) && 
        (Object.getOwnPropertyNames(upload_files[IDSocket_Patient]).length !== 0)) {
        return false;        
    } else {
        return true;
    }
}

module.exports.getIDSocketClinician_UploadFiles = function(IDSocket_Patient) {
    if ((upload_files[IDSocket_Patient] !== undefined) && 
        (Object.getOwnPropertyNames(upload_files[IDSocket_Patient]).length !== 0)) {
        return upload_files[IDSocket_Patient]['IDSocket_Clinician'];
    } else {        
        return "";
    }
}

module.exports.remove_UploadFiles = function(IDSocket_Patient, nameTest) {
    if (upload_files[IDSocket_Patient] !== undefined) {
        if (upload_files[IDSocket_Patient][nameTest] !== undefined) {            
            if (upload_files[IDSocket_Patient][nameTest] == 1) {
                delete upload_files[IDSocket_Patient][nameTest];
                delete upload_files[IDSocket_Patient]['IDSocket_Clinician'];

                if (Object.getOwnPropertyNames(upload_files[IDSocket_Patient]).length === 0) {  //Check obj is empty                            
                    delete upload_files[IDSocket_Patient];
                }
            } else {
                upload_files[IDSocket_Patient][nameTest]--;
            }
        }
    }
}