let test38_mediaRecorder;
let test38_recordedBlob;
let test38_record_video;

let test38_storeMedia;
let test38_idPathFolder;
let test38_pathSession;

socket.on('Test38', function(data) {
    let type = data['type'];

    switch (type) {
        case "show-page": {
            let page = data['page'];

            switch(page) {
                case 5: case 6: case 7: case 8: case 9: case 10: case 11:
                case 12: case 13: case 14: case 15: case 16: case 17:
                    $('#MainScreenGame').load('/tests/bnt_15?page=' + page);
                    break;

                case 4: case 18:
                    $('#MainScreenVideo').hide();
                    $('#MainScreenGame').show();
                    $('#MainScreenGame').load('/tests/bnt_15?page=' + page);
                    break;

                case 3: case 19:
                    $('#MainScreenVideo').show();
                    $('#MainScreenGame').empty();
                    $('#MainScreenGame').hide();                    
                    break;
            }                    
            break;
        }

        case "stop":
            if (test38_record_video == true) {
                test38_resetParameters();
            }

            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();
            break;

        case "start":
            test38_record_video = data['record_video'];
            if (test38_record_video == true) {
                test38_startRecording();
            }

            break;

        case 'store-files':
            test38_storeMedia = "store_local";
            test38_idPathFolder = data["id_path_folder"];
            test38_pathSession = data["path_session"];

            if (test38_record_video == true) {        
                test38_stopRecording();
            }
            break;

        case "store-files-in-clinician":
            test38_storeMedia = "";
            if (test38_record_video == true) {        
                test38_stopRecording();
            }
            break;

        case "upload-files": 
            test38_storeMedia = "upload_server";
        
            if (test38_record_video == true) {        
                test38_stopRecording();
            }
            break;

        case "upload-store-files":
            test38_storeMedia = "upload_store";
            test38_idPathFolder = data["id_path_folder"];
            test38_pathSession = data["path_session"];

            if (test38_record_video == true) {        
                test38_stopRecording();
            }
            break;
    }
});

function test38_resetParameters() {    
    test38_mediaRecorder = null;
    test38_recordedBlob = [];

    test38_storeMedia = "";
}

function test38_startRecording() { 
    test38_resetParameters();   
    selectTypeSupportedMediaRecorder();
    
    try {            
        test38_mediaRecorder = new MediaRecorder(recordStream_temp, typeSupportedMediaRecorder);                 
    } catch (e) {
        return;
    }

    test38_mediaRecorder.onstop = (event) => {        
        if (test38_storeMedia == "upload_server") {
            test38_uploadFiles('video.webm');
        } else if (test38_storeMedia == "store_local") {
            test38_storeFiles('video.webm');
        } else if (test38_storeMedia == "upload_store") {
            test38_uploadAndStoreFiles('video.webm');
        }
    };

    test38_mediaRecorder.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {            
            test38_recordedBlob.push(event.data);
        }             
    });

    test38_mediaRecorder.start(10); // collect 10ms of data    
}

function test38_stopRecording() {
    test38_mediaRecorder.stop();    
}

function test38_storeFiles(fileName) {    
    let blobMain = new Blob(test38_recordedBlob, {type: 'video/webm'});
    saveAs(blobMain, test38_idPathFolder + '__' + test38_pathSession + '__BNT_15__' + fileName);

    test38_resetParameters();
    console.log("Test38 stored");
}

function test38_uploadFiles(fileName) {
    let formData = new FormData();      
    let blobMain = new Blob(test38_recordedBlob, {type: 'video/webm'});   
    formData.append('video', blobMain, fileName);            
    
    fetch('/patient/upload-singlefile-bnt-15', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {
        test38_resetParameters();
        console.log("Test38 uploaded");
        socket.emit('Files-Uploaded', { 'test' : 'BNT_15' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}

function test38_uploadAndStoreFiles(fileName) {
    let blobMain = new Blob(test38_recordedBlob, {type: 'video/webm'});
    saveAs(blobMain, test38_idPathFolder + '__' + test38_pathSession + '__BNT_15__' + fileName);

    let formData = new FormData();
    formData.append('video', blobMain, fileName);            
    
    fetch('/patient/upload-singlefile-bnt-15', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {
        test38_resetParameters();
        console.log("Test38 uploaded and stored");
        socket.emit('Files-Uploaded', { 'test' : 'BNT_15' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}