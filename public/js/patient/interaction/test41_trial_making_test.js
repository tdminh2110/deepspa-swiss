let test41_mediaRecorder;
let test41_recordedBlob;
let test41_record_video;

let test41_storeMedia;
let test41_idPathFolder;
let test41_pathSession;

socket.on('Test41', function(data) {
    let type = data['type'];

    switch (type) {
        case "stop":
            if (test41_record_video == true) {
                test41_resetParameters();
            }
            break;

        case "start":
            test41_record_video = data['record_video'];
            if (test41_record_video == true) {
                test41_startRecording();
            }
            break;

        case 'store-files':
            test41_storeMedia = "store_local";
            test41_idPathFolder = data["id_path_folder"];
            test41_pathSession = data["path_session"];

            if (test41_record_video == true) {        
                test41_stopRecording();
            }
            break;

        case "store-files-in-clinician":
            test41_storeMedia = "";
            if (test41_record_video == true) {        
                test41_stopRecording();
            }
            break;

        case "upload-files": 
            test41_storeMedia = "upload_server";
        
            if (test41_record_video == true) {        
                test41_stopRecording();
            }
            break;

        case "upload-store-files":
            test41_storeMedia = "upload_store";
            test41_idPathFolder = data["id_path_folder"];
            test41_pathSession = data["path_session"];

            if (test41_record_video == true) {        
                test41_stopRecording();
            }
            break;
    }
});

function test41_resetParameters() {    
    test41_mediaRecorder = null;
    test41_recordedBlob = [];

    test41_storeMedia = "";
}

function test41_startRecording() { 
    test41_resetParameters();   
    selectTypeSupportedMediaRecorder();
    
    try {            
        test41_mediaRecorder = new MediaRecorder(recordStream_temp, typeSupportedMediaRecorder);                 
    } catch (e) {
        return;
    }

    test41_mediaRecorder.onstop = (event) => {        
        if (test41_storeMedia == "upload_server") {
            test41_uploadFiles('video.webm');
        } else if (test41_storeMedia == "store_local") {
            test41_storeFiles('video.webm');
        } else if (test41_storeMedia == "upload_store") {
            test41_uploadAndStoreFiles('video.webm');
        }
    };

    test41_mediaRecorder.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {            
            test41_recordedBlob.push(event.data);
        }             
    });

    test41_mediaRecorder.start(10); // collect 10ms of data    
}

function test41_stopRecording() {
    test41_mediaRecorder.stop();    
}

function test41_storeFiles(fileName) {    
    let blobMain = new Blob(test41_recordedBlob, {type: 'video/webm'});
    saveAs(blobMain, test41_idPathFolder + '__' + test41_pathSession + '__Trial_Making_Test__' + fileName);

    test41_resetParameters();
    console.log("Test41 stored");
}

function test41_uploadFiles(fileName) {
    let formData = new FormData();      
    let blobMain = new Blob(test41_recordedBlob, {type: 'video/webm'});   
    formData.append('video', blobMain, fileName);            
    
    fetch('/patient/upload-singlefile-trial-making-test', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {
        test41_resetParameters();
        console.log("Test41 uploaded");
        socket.emit('Files-Uploaded', { 'test' : 'Trial_Making_Test' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}

function test41_uploadAndStoreFiles(fileName) {
    let blobMain = new Blob(test41_recordedBlob, {type: 'video/webm'});
    saveAs(blobMain, test41_idPathFolder + '__' + test41_pathSession + '__Trial_Making_Test__' + fileName);

    let formData = new FormData();
    formData.append('video', blobMain, fileName);            
    
    fetch('/patient/upload-singlefile-trial-making-test', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {
        test41_resetParameters();
        console.log("Test41 uploaded and stored");
        socket.emit('Files-Uploaded', { 'test' : 'Trial_Making_Test' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}