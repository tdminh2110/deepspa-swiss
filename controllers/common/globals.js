let patient_information_for_upload = {};
let clinician_information_for_upload = {};

module.exports.add_PatientInformationForUpload = function(idPatient, strTest, strPath, numberOfFiles) {
    if (patient_information_for_upload[idPatient] === undefined) {
        patient_information_for_upload[idPatient] = {};
    }

    if (patient_information_for_upload[idPatient][strTest] === undefined) {
        patient_information_for_upload[idPatient][strTest] = { 'path' : strPath, 'number' : numberOfFiles };
    } else {
        patient_information_for_upload[idPatient][strTest]['number'] = patient_information_for_upload[idPatient][strTest]['number'] + numberOfFiles;
    }
    
    //console.log(patient_information_for_upload);
    /*let addInfo = true;
    
    for(let i = 0; i < patient_information_for_upload.length; i++) {
        if ((patient_information_for_upload[i].idPatient == idPatient) && 
            (patient_information_for_upload[i].test === strTest)) {
            patient_information_for_upload[i].path = strPath;
            addInfo = false;
            break;
        }
    }

    if(addInfo == true) {
        let addedInfo = {
            'idPatient' : idPatient,
            'test' : strTest,
            'path' : strPath            
        }
        patient_information_for_upload.push(addedInfo);
    }*/
}

module.exports.popPathFromIDPatientAndTest_PatientInformationForUpload = function(idPatient, strTest) {
    if (patient_information_for_upload[idPatient][strTest] !== undefined) {
        let strPath = patient_information_for_upload[idPatient][strTest]['path'];

        if (patient_information_for_upload[idPatient][strTest]['number'] == 1) {
            delete patient_information_for_upload[idPatient][strTest];            

            if (Object.getOwnPropertyNames(patient_information_for_upload[idPatient]).length === 0) {  //Check obj is empty
                delete patient_information_for_upload[idPatient];
            }
        } else {
            patient_information_for_upload[idPatient][strTest]['number']--;
        }

        return strPath;
    }

    return "";
    /*for(let i = 0; i < patient_information_for_upload.length; i++) {
        if ((patient_information_for_upload[i].idPatient == idPatient) && 
            (patient_information_for_upload[i].test === strTest)) {
            
            let strPath = patient_information_for_upload[i].path;
            patient_information_for_upload.slice(i, 1);
            
            return strPath;
        }
    }

    return "";*/
}

module.exports.add_ClinicianInformationForUpload = function(idClinician, strTest, strPath, numberOfFiles) {
    if (clinician_information_for_upload[idClinician] === undefined) {
        clinician_information_for_upload[idClinician] = {};
    }

    if (clinician_information_for_upload[idClinician][strTest] === undefined) {
        clinician_information_for_upload[idClinician][strTest] = { 'path' : strPath, 'number' : numberOfFiles };
    } else {
        clinician_information_for_upload[idClinician][strTest]['number'] = clinician_information_for_upload[idClinician][strTest]['number'] + numberOfFiles;
    }
}

module.exports.popPathFromIDClinicianAndTest_ClinicianInformationForUpload = function(idClinician, strTest) {
    if (clinician_information_for_upload[idClinician][strTest] !== undefined) {
        let strPath = clinician_information_for_upload[idClinician][strTest]['path'];

        if (clinician_information_for_upload[idClinician][strTest]['number'] == 1) {
            delete clinician_information_for_upload[idClinician][strTest];            

            if (Object.getOwnPropertyNames(clinician_information_for_upload[idClinician]).length === 0) {  //Check obj is empty
                delete clinician_information_for_upload[idClinician];
            }
        } else {
            clinician_information_for_upload[idClinician][strTest]['number']--;
        }

        return strPath;
    }

    return "";
}