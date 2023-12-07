let test17_page5_audioRecorder;
let test17_page5_mediaRecorder;
let test17_page5_recordedBlob;

let test17_page9_audioRecorder;
let test17_page9_mediaRecorder;
let test17_page9_recordedBlob;

let test17_page13_audioRecorder;
let test17_page13_mediaRecorder;
let test17_page13_recordedBlob;

let test17_idPathFolder;
let test17_pathSession;

let test17_language;

socket.on('Test17', function(data) {
    let type = data['type'];

    switch (type) {
        case "arreter":
            test17_arreter(data['page']);
            break;

        case "reset": 
            test17_resetParameters(0);
            break;

        case "repeat":
            test17_repeat(data['page']);
            break;

        case "show-page":         
            switch (data['page']) {
                case 2: case 4: case 6: case 8: case 10: case 12: case 14:
                    $('#MainScreenVideo').show();
                    $('#MainScreenGame').empty();
                    $('#MainScreenGame').hide(); 
                    break;

                case 3: case 5: case 7: case 9: case 11: case 13:
                    $('#MainScreenVideo').hide();
                    $('#MainScreenGame').show(); 
                    $('#MainScreenGame').load('/tests/stroop_vectoria?page=' + data['page'] + '&language=' + test17_language);
                    break;                
            }            
            break;

        case "start":
            test17_language = data['language'];
            break;
            
        case "start-recording":
            test17_startRecording(data['page']);
            break;

        case "stop":
            test17_resetParameters(0);
            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide(); 
            break;

        case "store-files":
            test17_idPathFolder = data["id_path_folder"];
            test17_pathSession = data["path_session"];

            test17_storeFiles();
            break;

        case "upload-files":            
            test17_uploadFiles();
            break;

        case "upload-store-files":
            test17_idPathFolder = data["id_path_folder"];
            test17_pathSession = data["path_session"];

            test17_uploadAndStoreFiles();
            break;
    }
});

function test17_arreter(page) {    
    if (page == 5) {        
        test17_page5_mediaRecorder.stop();         
    } else if (page == 9) {
        test17_page9_mediaRecorder.stop();
    } else if (page == 13) {
        test17_page13_mediaRecorder.stop();
    }
}

function test17_repeat(page) {    
    test17_startRecording(page);    
}

function test17_resetParameters(page) {
    if (page == 0) {
        test17_page5_audioRecorder = null;    
        test17_page5_mediaRecorder = null;
        test17_page5_recordedBlob = [];
        test17_page9_audioRecorder = null;
        test17_page9_mediaRecorder = null;
        test17_page9_recordedBlob = [];
        test17_page13_audioRecorder = null;
        test17_page13_mediaRecorder = null;
        test17_page13_recordedBlob = [];
    } else if (page == 5) {    
        test17_page5_audioRecorder = null;    
        test17_page5_mediaRecorder = null;
        test17_page5_recordedBlob = [];
    } else if (page == 9) {    
        test17_page9_audioRecorder = null;
        test17_page9_mediaRecorder = null;
        test17_page9_recordedBlob = [];
    } else if (page == 13) {
        test17_page13_audioRecorder = null;
        test17_page13_mediaRecorder = null;
        test17_page13_recordedBlob = [];
    } 
}

function test17_startRecording(page) { 
    test17_resetParameters(page);       

    if (page == 5) {    
        try {    
            test17_page5_audioRecorder = new MediaStream(recordStream_temp.getAudioTracks());    
            test17_page5_mediaRecorder = new MediaRecorder(test17_page5_audioRecorder, {mimeType: 'audio/webm;codecs=opus'});  
        } catch (e) {
            return;
        }

        test17_page5_mediaRecorder.onstop = (event) => {            
        };

        test17_page5_mediaRecorder.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {            
                test17_page5_recordedBlob.push(event.data);
            }             
        });

        test17_page5_mediaRecorder.start(10); // collect 10ms of data
    } else if (page == 9) {
        try {    
            test17_page9_audioRecorder = new MediaStream(recordStream_temp.getAudioTracks());    
            test17_page9_mediaRecorder = new MediaRecorder(test17_page9_audioRecorder, {mimeType: 'audio/webm;codecs=opus'});  
        } catch (e) {
            return;
        }

        test17_page9_mediaRecorder.onstop = (event) => {         
        };

        test17_page9_mediaRecorder.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {            
                test17_page9_recordedBlob.push(event.data);
            }             
        });

        test17_page9_mediaRecorder.start(10); // collect 10ms of data
    } else if (page == 13) {
        try {    
            test17_page13_audioRecorder = new MediaStream(recordStream_temp.getAudioTracks());    
            test17_page13_mediaRecorder = new MediaRecorder(test17_page13_audioRecorder, {mimeType: 'audio/webm;codecs=opus'});  
        } catch (e) {
            return;
        }

        test17_page13_mediaRecorder.onstop = (event) => {         
        };

        test17_page13_mediaRecorder.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {            
                test17_page13_recordedBlob.push(event.data);
            }             
        });

        test17_page13_mediaRecorder.start(10); // collect 10ms of data
    }
}

function test17_storeFiles() {
    if (test17_page5_mediaRecorder != null) {
        let blobMain = new Blob(test17_page5_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test17_idPathFolder + '__' + test17_pathSession + '__Stroop_Vectoria__audio1.webm');
        test17_resetParameters(5);
        console.log("Test17 audio1 stored");
    }

    if (test17_page9_mediaRecorder != null) {
        let blobMain = new Blob(test17_page9_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test17_idPathFolder + '__' + test17_pathSession + '__Stroop_Vectoria__audio2.webm');
        test17_resetParameters(9);
        console.log("Test17 audio2 stored");
    }

    if (test17_page13_mediaRecorder != null) {
        let blobMain = new Blob(test17_page13_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test17_idPathFolder + '__' + test17_pathSession + '__Stroop_Vectoria__audio3.webm');
        test17_resetParameters(13);
        console.log("Test17 audio3 stored");
    }
}

function test17_uploadFiles() {
    let formData = new FormData();
    
    if (test17_page5_mediaRecorder != null) {
        let blobMain = new Blob(test17_page5_recordedBlob, {type: 'audio/webm'});
        formData.append('audios', blobMain, 'audio1.webm');
    }

    if (test17_page9_mediaRecorder != null) {
        let blobMain = new Blob(test17_page9_recordedBlob, {type: 'audio/webm'});
        formData.append('audios', blobMain, 'audio2.webm');
    }

    if (test17_page13_mediaRecorder != null) {
        let blobMain = new Blob(test17_page13_recordedBlob, {type: 'audio/webm'});
        formData.append('audios', blobMain, 'audio3.webm');
    } 

    fetch('/patient/upload-multifiles-stroop-vectoria', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {                    
        test17_resetParameters(0);
        
        console.log("Test17 uploaded");

        socket.emit('Files-Uploaded', { 'test' : 'Stroop_Vectoria' });  
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}

function test17_uploadAndStoreFiles() {
    let formData = new FormData();

    if (test17_page5_mediaRecorder != null) {
        let blobMain = new Blob(test17_page5_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test17_idPathFolder + '__' + test17_pathSession + '__Stroop_Vectoria__audio1.webm');
        formData.append('audios', blobMain, 'audio1.webm');
    }

    if (test17_page9_mediaRecorder != null) {
        let blobMain = new Blob(test17_page9_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test17_idPathFolder + '__' + test17_pathSession + '__Stroop_Vectoria__audio2.webm');
        formData.append('audios', blobMain, 'audio2.webm');
    }

    if (test17_page13_mediaRecorder != null) {
        let blobMain = new Blob(test17_page13_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test17_idPathFolder + '__' + test17_pathSession + '__Stroop_Vectoria__audio3.webm');
        formData.append('audios', blobMain, 'audio3.webm');
    }

    fetch('/patient/upload-multifiles-stroop-vectoria', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {                    
        test17_resetParameters(0);
        
        console.log("Test17 uploaded and stored");

        socket.emit('Files-Uploaded', { 'test' : 'Stroop_Vectoria' }); 
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}