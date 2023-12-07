let test26_entretien_clinique_mediaRecorder;
let test26_entretien_clinique_recordedBlob;

let test26_reconter_journee_mediaRecorder;
let test26_reconter_journee_recordedBlob;

let test26_number_file;

let test26_storeMedia;
let test26_idPathFolder;
let test26_pathSession;

let test26_subTest;

socket.on('Test26', function(data) {    
    let type = data['type'];
    
    switch (type) {
        case "start":
            test26_subTest = data['subtest'];
            test26_startRecording(test26_subTest);                    
            break;

        case "stop":             
            test26_patient_resetParameters(test26_subTest);
            
            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();
            break;

        case "store-files":        
            test26_storeMedia = "store_local";
            test26_idPathFolder = data["id_path_folder"];
            test26_pathSession = data["path_session"];
            test26_number_file = data['number_file'];
            test26_stop(data['subtest']);

            break;
            
        case "upload-files":
            test26_storeMedia = "upload_server";
            test26_number_file = data['number_file'];
            test26_stop(data['subtest']);
            break;

        case "upload-store-files":
            test26_storeMedia = "upload_store";
            test26_idPathFolder = data["id_path_folder"];
            test26_pathSession = data["path_session"];
            test26_number_file = data['number_file'];
            test26_stop(data['subtest']);
            break;
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test26_patient_resetParameters(subtest) {   
    if (subtest == 'Entr_Clin') {    
        test26_entretien_clinique_mediaRecorder = null;
        test26_entretien_clinique_recordedBlob = [];
    } else if (subtest == 'Raconter') {    
        test26_reconter_journee_mediaRecorder = null;
        test26_reconter_journee_recordedBlob = [];
    }

    test26_storeMedia = "";
}


function test26_startRecording(subtest) { 
    test26_patient_resetParameters(subtest); 
    selectTypeSupportedMediaRecorder();      

    if (subtest == 'Entr_Clin') { 
        try {
            test26_entretien_clinique_mediaRecorder = new MediaRecorder(recordStream_temp, typeSupportedMediaRecorder);  
        } catch (e) {
            return;
        }

        test26_entretien_clinique_mediaRecorder.onstop = (event) => {    
            console.log(test26_storeMedia);

            if (test26_storeMedia == "upload_server") {
                test26_uploadFiles(subtest, test26_number_file);
            } else if (test26_storeMedia == "store_local") {
                test26_storeFiles(subtest, test26_number_file);
            } else if (test26_storeMedia == "upload_store") {
                test26_uploadAndStoreFiles(subtest, test26_number_file);
            }
        };

        test26_entretien_clinique_mediaRecorder.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {            
                test26_entretien_clinique_recordedBlob.push(event.data);
            }             
        });

        test26_entretien_clinique_mediaRecorder.start(10); // collect 10ms of data
    } else if (subtest == 'Raconter') {
        try {    
            test26_reconter_journee_mediaRecorder = new MediaRecorder(recordStream_temp, typeSupportedMediaRecorder);  
        } catch (e) {
            return;
        }

        test26_reconter_journee_mediaRecorder.onstop = (event) => {
            if (test26_storeMedia == "upload_server") {
                test26_uploadFiles(subtest, test26_number_file);
            } else if (test26_storeMedia == "store_local") {
                test26_storeFiles(subtest, test26_number_file);
            } else if (test26_storeMedia == "upload_store") {
                test26_uploadAndStoreFiles(subtest, test26_number_file);
            }
        };

        test26_reconter_journee_mediaRecorder.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {            
                test26_reconter_journee_recordedBlob.push(event.data);
            }             
        });

        test26_reconter_journee_mediaRecorder.start(10); // collect 10ms of data
    } 
}

function test26_stop(subtest) {    
    if (subtest == "Entr_Clin") {
        test26_entretien_clinique_mediaRecorder.stop();   
    } else if (subtest == "Raconter") {
        test26_reconter_journee_mediaRecorder.stop();
    } 
}

function test26_storeFiles(subtest, number_file) {
    if (subtest == "Entr_Clin") {
        let blobMain = new Blob(test26_entretien_clinique_recordedBlob, {type: 'video/webm'});
        saveAs(blobMain, test26_idPathFolder + '__' + test26_pathSession + '__DeepSpa__video_entretien_clinique_' + number_file + '.webm');
        test26_patient_resetParameters(subtest);
        console.log("Test26 entretien clinique stored");
    } else if (subtest == "Raconter") {
        let blobMain = new Blob(test26_reconter_journee_recordedBlob, {type: 'video/webm'});
        saveAs(blobMain, test26_idPathFolder + '__' + test26_pathSession + '__DeepSpa__video_raconter_journee_' + number_file + '.webm');
        test26_patient_resetParameters(subtest);
        console.log("Test26 raconter journee stored");
    }
}

function test26_uploadFiles(subtest, number_file) {
    let formData = new FormData();
    
    if (subtest == "Entr_Clin") {
        let blobMain = new Blob(test26_entretien_clinique_recordedBlob, {type: 'video/webm'});
        formData.append('video', blobMain, 'video_entretien_clinique_' + number_file + '.webm');
    } else if (subtest == "Raconter") {
        let blobMain = new Blob(test26_reconter_journee_recordedBlob, {type: 'video/webm'});
        formData.append('video', blobMain, 'video_raconter_journee_' + number_file + '.webm');
    }

    fetch('/patient/upload-singlefile-deepspa', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {                    
        test26_patient_resetParameters(subtest);
        
        console.log("Test26 uploaded");

        socket.emit('Files-Uploaded', { 'test' : 'DeepSpa' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}

function test26_uploadAndStoreFiles(subtest, number_file) {
    let formData = new FormData();
    let subtest_local = subtest;
    
    if (subtest == "Entr_Clin") {
        let blobMain = new Blob(test26_entretien_clinique_recordedBlob, {type: 'video/webm'});
        saveAs(blobMain, test26_idPathFolder + '__' + test26_pathSession + '__DeepSpa__video_entretien_clinique_' + number_file + '.webm');
        formData.append('video', blobMain, 'video_entretien_clinique_' + number_file + '.webm');        
    } else if (subtest == "Raconter") {
        let blobMain = new Blob(test26_reconter_journee_recordedBlob, {type: 'video/webm'});
        saveAs(blobMain, test26_idPathFolder + '__' + test26_pathSession + '__DeepSpa__video_raconter_journee_' + number_file + '.webm');
        formData.append('video', blobMain, 'video_raconter_journee_' + number_file + '.webm');
    }

    fetch('/patient/upload-singlefile-deepspa', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {                    
        test26_patient_resetParameters(subtest_local);
        
        if (subtest_local == "Entr_Clin") {
            console.log("Test26 Entretien Clinique uploaded and stored");
        } else if (subtest_local == "Raconter") {
            console.log("Test26 Raconter Journee uploaded and stored");
        }

        socket.emit('Files-Uploaded', { 'test' : 'DeepSpa' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}