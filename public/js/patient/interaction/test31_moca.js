let test31_mediaRecorder;
let test31_recordedBlob;
let test31_record_video;

let test31_storeMedia;
let test31_idPathFolder;
let test31_pathSession;

socket.on('Test31', function(data) {
    let type = data['type'];

    switch (type) {
        case "hide-image":
            switch (data['page']) {
                case 3: case 5:
                    $('#MainScreenVideo').show();
                    $('#MainScreenGame').empty();
                    $('#MainScreenGame').hide();  
                    break;
            }
            break;

        case "stop":
            if (test31_record_video == true) {
                test31_resetParameters();
            }

            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();  
            break;

        case "show-image":
            switch (data['page']) {
                case 3: case 5:
                    $('#MainScreenVideo').hide();
                    $('#MainScreenGame').show(); 
                    $('#MainScreenGame').load('/tests/moca?page=' + data['page']);                    
                    break;
            }  
            break;

        case "start":
            test31_record_video = data['record_video'];
            if (test31_record_video == true) {
                test31_startRecording();
            }
            break;

        case 'store-files':
            test31_storeMedia = "store_local";
            test31_idPathFolder = data["id_path_folder"];
            test31_pathSession = data["path_session"];

            if (test31_record_video == true) {        
                test31_stopRecording();
            }
            break;

        case "store-files-in-clinician":
            test31_storeMedia = "";
            if (test31_record_video == true) {        
                test31_stopRecording();
            }
            break;

        case "upload-files": 
            test31_storeMedia = "upload_server";
        
            if (test31_record_video == true) {        
                test31_stopRecording();
            }
            break;

        case "upload-store-files":
            test31_storeMedia = "upload_store";
            test31_idPathFolder = data["id_path_folder"];
            test31_pathSession = data["path_session"];

            if (test31_record_video == true) {        
                test31_stopRecording();
            }
            break;
    }
});

function test31_resetParameters() {    
    test31_mediaRecorder = null;
    test31_recordedBlob = [];

    test31_storeMedia = "";
}

function test31_startRecording() { 
    test31_resetParameters();   
    selectTypeSupportedMediaRecorder();
    
    try {            
        test31_mediaRecorder = new MediaRecorder(recordStream_temp, typeSupportedMediaRecorder);                 
    } catch (e) {
        return;
    }

    test31_mediaRecorder.onstop = (event) => {        
        if (test31_storeMedia == "upload_server") {
            test31_uploadFiles('video.webm');
        } else if (test31_storeMedia == "store_local") {
            test31_storeFiles('video.webm');
        } else if (test31_storeMedia == "upload_store") {
            test31_uploadAndStoreFiles('video.webm');
        }
    };

    test31_mediaRecorder.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {            
            test31_recordedBlob.push(event.data);
        }             
    });

    test31_mediaRecorder.start(10); // collect 10ms of data    
}

function test31_stopRecording() {
    test31_mediaRecorder.stop();    
}

function test31_storeFiles(fileName) {    
    let blobMain = new Blob(test31_recordedBlob, {type: 'video/webm'});
    saveAs(blobMain, test31_idPathFolder + '__' + test31_pathSession + '__MOCA__' + fileName);

    test31_resetParameters();
    console.log("Test31 stored");
}

function test31_uploadFiles(fileName) {
    let formData = new FormData();      
    let blobMain = new Blob(test31_recordedBlob, {type: 'video/webm'});   
    formData.append('video', blobMain, fileName);            
    
    fetch('/patient/upload-singlefile-moca', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {
        test31_resetParameters();
        console.log("Test31 uploaded");
        socket.emit('Files-Uploaded', { 'test' : 'MOCA' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}

function test31_uploadAndStoreFiles(fileName) {
    let blobMain = new Blob(test31_recordedBlob, {type: 'video/webm'});
    saveAs(blobMain, test31_idPathFolder + '__' + test31_pathSession + '__MOCA__' + fileName);

    let formData = new FormData();
    formData.append('video', blobMain, fileName);            
    
    fetch('/patient/upload-singlefile-moca', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {
        test31_resetParameters();
        console.log("Test31 uploaded and stored");
        socket.emit('Files-Uploaded', { 'test' : 'MOCA' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}