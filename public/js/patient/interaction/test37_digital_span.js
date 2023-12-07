let test37_audioRecorder;
let test37_mediaRecorder;
let test37_recordedBlob;
let test37_record_audio;

let test37_storeMedia;
let test37_idPathFolder;
let test37_pathSession;

socket.on('Test37', function(data) {
    let type = data['type'];

    switch (type) {
        case "play-audio":
            $("#btaudio-test37-page" + data['page'] + '-' + data['audio']).click();
            break;

        case "show-page": {
            let page = data['page'];

            switch(page) {
                case 1: case 8: case 15:
                    $('#MainScreenGame').empty();
                    $('#MainScreenGame').hide();
                    break;

                case 2: case 7: case 9: case 14:
                    $('#MainScreenGame').show();
                    $('#MainScreenGame').load('/tests/digital_span?page=' + page);
                    break;

                
                case 3: case 4: case 5: case 6:
                case 10: case 11: case 12: case 13:
                    $('#MainScreenGame').load('/tests/digital_span?page=' + page);
                    break;
            }                    
            break;
        }

        case "stop":
            if (test37_record_audio == true) {
                test37_resetParameters();
            }  
            break;

        case "start":
            test37_record_audio = data['record_audio'];
            if (test37_record_audio == true) {
                test37_startRecording();
            }
            break;

        case 'store-files':
            test37_storeMedia = "store_local";
            test37_idPathFolder = data["id_path_folder"];
            test37_pathSession = data["path_session"];

            if (test37_record_audio == true) {        
                test37_stopRecording();
            }
            break;

        case "store-files-in-clinician":
            test37_storeMedia = "";
            if (test37_record_video == true) {        
                test37_stopRecording();
            }
            break;

        case 'upload-files': 
            test37_storeMedia = "upload_server";
        
            if (test37_record_audio == true) {        
                test37_stopRecording();
            }
            break;

        case "upload-store-files":
            test37_storeMedia = "upload_store";
            test37_idPathFolder = data["id_path_folder"];
            test37_pathSession = data["path_session"];

            if (test37_record_audio == true) {        
                test37_stopRecording();
            }
            break;
    }
});

function test37_resetParameters() {
    test37_audioRecorder = null;    
    test37_mediaRecorder = null;
    test37_recordedBlob = [];

    test37_storeMedia = "";
}

function test37_startRecording() { 
    test37_resetParameters();       
    
    try {            
        test37_audioRecorder = new MediaStream(recordStream_temp.getAudioTracks());            
        test37_mediaRecorder = new MediaRecorder(test37_audioRecorder, {mimeType: 'audio/webm;codecs=opus'});                 
    } catch (e) {
        return;
    }

    test37_mediaRecorder.onstop = (event) => {
        if (test37_storeMedia == "upload_server") {
            test37_uploadFiles('audio.webm');
        } else if (test37_storeMedia == "store_local") {
            test37_storeFiles('audio.webm');
        } else if (test37_storeMedia == "upload_store") {
            test37_uploadAndStoreFiles('audio.webm');
        }
    };

    test37_mediaRecorder.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {            
            test37_recordedBlob.push(event.data);
        }             
    });

    test37_mediaRecorder.start(10); // collect 10ms of data    
}

function test37_stopRecording() {
    test37_mediaRecorder.stop();    
}

function test37_storeFiles(fileName) {    
    let blobMain = new Blob(test37_recordedBlob, {type: 'audio/webm'});   
    saveAs(blobMain, test37_idPathFolder + '__' + test37_pathSession + '__Digital_Span__' + fileName);
    
    test37_resetParameters();
    console.log("Test37 stored");
}

function test37_uploadFiles(fileName) {
    let formData = new FormData();      
    let blobMain = new Blob(test37_recordedBlob, {type: 'audio/webm'});   
    formData.append('audio', blobMain, fileName);            
    
    fetch('/patient/upload-singlefile-digital-span', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {
        test37_resetParameters();
        console.log("Test37 uploaded");
        socket.emit('Files-Uploaded', { 'test' : 'Digital_Span' });   
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}

function test37_uploadAndStoreFiles(fileName) {
    let blobMain = new Blob(test37_recordedBlob, {type: 'audio/webm'});   
    saveAs(blobMain, test37_idPathFolder + '__' + test37_pathSession + '__Digital_Span__' + fileName);
    
    let formData = new FormData();
    formData.append('audio', blobMain, fileName);            
    
    fetch('/patient/upload-singlefile-digital-span', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {
        test37_resetParameters();
        console.log("Test37 uploaded and stored");
        socket.emit('Files-Uploaded', { 'test' : 'Digital_Span' });   
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}