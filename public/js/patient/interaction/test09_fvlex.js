let test09_mediaRecorderMain;
let test09_recordedBlobMain;

let test09_idPathFolder;
let test09_pathSession;

socket.on('Test09', function(data) {
    let type = data['type'];

    switch (type) {
        case "reset-recording":
            test09_reset();
            break;

        case "start-recording":                
            test09_startRecording();
            break;

        case "stop":
            test09_reset();
            break;
            
        case "stop-recording":            
            test09_stopRecording();
            break;

        case 'store-files': {
            test09_idPathFolder = data["id_path_folder"];
            test09_pathSession = data["path_session"];

            let strFileName = "";

            if (data['sub-test'] == 'p') {
                strFileName = "P-video_P.webm";
            } else if (data['sub-test'] == 'r') {
                strFileName = "P-video_R.webm";
            } 
            
            test09_storeFiles(strFileName);
            break;
        }

        case "upload-files": {
            let strFileName = "";

            if (data['sub-test'] == 'p') {
                strFileName = "P-video_P.webm";
            } else if (data['sub-test'] == 'r') {
                strFileName = "P-video_R.webm";
            } 
            
            test09_uploadFiles(strFileName);
            break;
        }

        case "upload-store-files": {
            test09_idPathFolder = data["id_path_folder"];
            test09_pathSession = data["path_session"];

            let strFileName = "";

            if (data['sub-test'] == 'p') {
                strFileName = "P-video_P.webm";
            } else if (data['sub-test'] == 'r') {
                strFileName = "P-video_R.webm";
            } 
            
            test09_uploadAndStoreFiles(strFileName);            
            break;
        }
    }
});

function test09_startRecording() { 
    test09_reset();   
    selectTypeSupportedMediaRecorder();

    try {            
        test09_mediaRecorderMain = new MediaRecorder(recordStream_temp, typeSupportedMediaRecorder);                 
    } catch (e) {
        return;
    }

    test09_mediaRecorderMain.onstop = (event) => {         
    };

    test09_mediaRecorderMain.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {            
            test09_recordedBlobMain.push(event.data);
        }             
    });

    test09_mediaRecorderMain.start(10); // collect 10ms of data
}

function test09_stopRecording() {
    test09_mediaRecorderMain.stop();    
}

function test09_reset() {
    test09_mediaRecorderMain = null;
    test09_recordedBlobMain = [];
}

function test09_storeFiles(fileName) {    
    let blobMain = new Blob(test09_recordedBlobMain, {type: 'video/webm'});
    saveAs(blobMain, test09_idPathFolder + '__' + test09_pathSession + '__FVLEX__' + fileName);
    
    test09_reset();    
    console.log("Test09 stored");
}

function test09_uploadFiles(fileName) {
    let formData = new FormData();            
    let blobMain = new Blob(test09_recordedBlobMain, {type: 'video/webm'});
    formData.append('video', blobMain, fileName);            
    
    fetch('/patient/upload-singlefile-fvlex', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {                    
        test09_reset();
        
        console.log("Test09 uploaded");

        socket.emit('Files-Uploaded', { 'test' : 'FVLEX' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}

function test09_uploadAndStoreFiles(fileName) {
    let blobMain = new Blob(test09_recordedBlobMain, {type: 'video/webm'});
    saveAs(blobMain, test09_idPathFolder + '__' + test09_pathSession + '__FVLEX__' + fileName);

    let formData = new FormData();    
    formData.append('video', blobMain, fileName);            
    
    fetch('/patient/upload-singlefile-fvlex', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {                    
        test09_reset();
        
        console.log("Test09 uploaded and stored");

        socket.emit('Files-Uploaded', { 'test' : 'FVLEX' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}