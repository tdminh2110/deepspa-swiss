let test39_mediaRecorder;
let test39_recordedBlob;
let test39_record_video;

let test39_storeMedia;
let test39_idPathFolder;
let test39_pathSession;

socket.on('Test39', function(data) {
    let type = data['type'];

    switch (type) {
        case "hide-word":
            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();
            break;

        case "show-page": {
            let page = data['page'];

            switch(page) {
                case 5: case 16: case 18: case 29: case 31: case 42: case 48: case 69:
                    $('#MainScreenVideo').show();
                    $('#MainScreenGame').empty();
                    $('#MainScreenGame').hide();                    
                    break;

                case 6: case 15: case 19: case 28: case 32: case 41: case 49: case 68:
                    $('#MainScreenVideo').hide();
                    $('#MainScreenGame').show();
                    $('#MainScreenGame').load('/tests/words_list?page=' + page);
                    break;

                case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: 
                case 20: case 21: case 22: case 23: case 24: case 25: case 26: case 27:
                case 33: case 34: case 35: case 36: case 37: case 38: case 39: case 40:
                case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57:
                case 58: case 59: case 60: case 61: case 62: case 63: case 64: case 65:
                case 66: case 67:
                    $('#MainScreenGame').load('/tests/words_list?page=' + page);
                    break;
            }                    
            break;
        }

        case "show-word":
            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();
            $('#MainScreenGame').load('/tests/words_list?page=' + data['page']);
            break;

        case "stop":
            if (test39_record_video == true) {
                test39_resetParameters();
            }

            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();
            break;

        case "start":
            test39_record_video = data['record_video'];
            if (test39_record_video == true) {
                test39_startRecording();
            }

            break;

        case 'store-files':
            test39_storeMedia = "store_local";
            test39_idPathFolder = data["id_path_folder"];
            test39_pathSession = data["path_session"];

            if (test39_record_video == true) {        
                test39_stopRecording();
            }
            break;

        case "upload-files": 
            test39_storeMedia = "upload_server";
        
            if (test39_record_video == true) {        
                test39_stopRecording();
            }
            break;

        case "upload-store-files":
            test39_storeMedia = "upload_store";
            test39_idPathFolder = data["id_path_folder"];
            test39_pathSession = data["path_session"];

            if (test39_record_video == true) {        
                test39_stopRecording();
            }
            break;
    }
});

function test39_resetParameters() {    
    test39_mediaRecorder = null;
    test39_recordedBlob = [];

    test39_storeMedia = "";
}

function test39_startRecording() { 
    test39_resetParameters();   
    selectTypeSupportedMediaRecorder();
    
    try {            
        test39_mediaRecorder = new MediaRecorder(recordStream_temp, typeSupportedMediaRecorder);                 
    } catch (e) {
        return;
    }

    test39_mediaRecorder.onstop = (event) => {        
        if (test39_storeMedia == "upload_server") {
            test39_uploadFiles('video.webm');
        } else if (test39_storeMedia == "store_local") {
            test39_storeFiles('video.webm');
        } else if (test39_storeMedia == "upload_store") {
            test39_uploadAndStoreFiles('video.webm');
        }
    };

    test39_mediaRecorder.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {            
            test39_recordedBlob.push(event.data);
        }             
    });

    test39_mediaRecorder.start(10); // collect 10ms of data    
}

function test39_stopRecording() {
    test39_mediaRecorder.stop();    
}

function test39_storeFiles(fileName) {    
    let blobMain = new Blob(test39_recordedBlob, {type: 'video/webm'});
    saveAs(blobMain, test39_idPathFolder + '__' + test39_pathSession + '__Words_List__' + fileName);

    test39_resetParameters();
    console.log("Test39 stored");
}

function test39_uploadFiles(fileName) {
    let formData = new FormData();      
    let blobMain = new Blob(test39_recordedBlob, {type: 'video/webm'});   
    formData.append('video', blobMain, fileName);            
    
    fetch('/patient/upload-singlefile-words-list', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {
        test39_resetParameters();
        console.log("Test39 uploaded");
        socket.emit('Files-Uploaded', { 'test' : 'Words_List' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}

function test39_uploadAndStoreFiles(fileName) {
    let blobMain = new Blob(test39_recordedBlob, {type: 'video/webm'});
    saveAs(blobMain, test39_idPathFolder + '__' + test39_pathSession + '__Words_List__' + fileName);

    let formData = new FormData();
    formData.append('video', blobMain, fileName);            
    
    fetch('/patient/upload-singlefile-words-list', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {
        test39_resetParameters();
        console.log("Test39 uploaded and stored");
        socket.emit('Files-Uploaded', { 'test' : 'Words_List' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}