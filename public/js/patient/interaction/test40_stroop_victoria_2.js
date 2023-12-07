let test40_page3_audioRecorder;
let test40_page3_mediaRecorder;
let test40_page3_recordedBlob;

let test40_page5_audioRecorder;
let test40_page5_mediaRecorder;
let test40_page5_recordedBlob;

let test40_page7_audioRecorder;
let test40_page7_mediaRecorder;
let test40_page7_recordedBlob;

let test40_idPathFolder;
let test40_pathSession;

let test40_language;

socket.on('Test40', function(data) {
    let type = data['type'];

    switch (type) {
        case "arreter":
            test40_arreter(data['page']);
            break;

        case "reset": 
            test40_resetParameters(0);
            break;

        case "repeat":
            test40_repeat(data['page']);
            break;

        case "show-page":
            switch (data['page']) {
                case 2: case 4: case 6: case 8:
                    $('#MainScreenVideo').show();
                    $('#MainScreenGame').empty();
                    $('#MainScreenGame').hide(); 
                    break;

                case 3: case 5: case 7:
                    $('#MainScreenVideo').hide();
                    $('#MainScreenGame').show(); 
                    $('#MainScreenGame').load('/tests/stroop_victoria_2?page=' + data['page'] + '&language=' + test40_language);
                    break;                
            }            
            break;

        case "start":
            test40_language = data['language'];
            break;
            
        case "start-recording":
            test40_startRecording(data['page']);
            break;

        case "stop":
            test40_resetParameters(0);
            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide(); 
            break;

        case "store-files":
            test40_idPathFolder = data["id_path_folder"];
            test40_pathSession = data["path_session"];

            test40_storeFiles();
            break;

        case "upload-files":            
            test40_uploadFiles();
            break;

        case "upload-store-files":
            test40_idPathFolder = data["id_path_folder"];
            test40_pathSession = data["path_session"];

            test40_uploadAndStoreFiles();
            break;
    }
});

function test40_arreter(page) {    
    if (page == 3) {        
        test40_page3_mediaRecorder.stop();         
    } else if (page == 9) {
        test40_page5_mediaRecorder.stop();
    } else if (page == 13) {
        test40_page7_mediaRecorder.stop();
    }
}

function test40_repeat(page) {    
    test40_startRecording(page);    
}

function test40_resetParameters(page) {
    if (page == 0) {
        test40_page3_audioRecorder = null;    
        test40_page3_mediaRecorder = null;
        test40_page3_recordedBlob = [];
        test40_page5_audioRecorder = null;
        test40_page5_mediaRecorder = null;
        test40_page5_recordedBlob = [];
        test40_page7_audioRecorder = null;
        test40_page7_mediaRecorder = null;
        test40_page7_recordedBlob = [];
    } else if (page == 3) {    
        test40_page3_audioRecorder = null;    
        test40_page3_mediaRecorder = null;
        test40_page3_recordedBlob = [];
    } else if (page == 5) {    
        test40_page5_audioRecorder = null;
        test40_page5_mediaRecorder = null;
        test40_page5_recordedBlob = [];
    } else if (page == 7) {
        test40_page7_audioRecorder = null;
        test40_page7_mediaRecorder = null;
        test40_page7_recordedBlob = [];
    } 
}

function test40_startRecording(page) { 
    test40_resetParameters(page);       

    if (page == 3) {    
        try {    
            test40_page3_audioRecorder = new MediaStream(recordStream_temp.getAudioTracks());    
            test40_page3_mediaRecorder = new MediaRecorder(test40_page3_audioRecorder, {mimeType: 'audio/webm;codecs=opus'});  
        } catch (e) {
            return;
        }

        test40_page3_mediaRecorder.onstop = (event) => {            
        };

        test40_page3_mediaRecorder.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {            
                test40_page3_recordedBlob.push(event.data);
            }             
        });

        test40_page3_mediaRecorder.start(10); // collect 10ms of data
    } else if (page == 5) {
        try {    
            test40_page5_audioRecorder = new MediaStream(recordStream_temp.getAudioTracks());    
            test40_page5_mediaRecorder = new MediaRecorder(test40_page5_audioRecorder, {mimeType: 'audio/webm;codecs=opus'});  
        } catch (e) {
            return;
        }

        test40_page5_mediaRecorder.onstop = (event) => {         
        };

        test40_page5_mediaRecorder.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {            
                test40_page5_recordedBlob.push(event.data);
            }             
        });

        test40_page5_mediaRecorder.start(10); // collect 10ms of data
    } else if (page == 7) {
        try {    
            test40_page7_audioRecorder = new MediaStream(recordStream_temp.getAudioTracks());    
            test40_page7_mediaRecorder = new MediaRecorder(test40_page7_audioRecorder, {mimeType: 'audio/webm;codecs=opus'});
        } catch (e) {
            return;
        }

        test40_page7_mediaRecorder.onstop = (event) => {         
        };

        test40_page7_mediaRecorder.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {            
                test40_page7_recordedBlob.push(event.data);
            }             
        });

        test40_page7_mediaRecorder.start(10); // collect 10ms of data
    }
}

function test40_storeFiles() {
    if (test40_page3_mediaRecorder != null) {
        let blobMain = new Blob(test40_page3_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test40_idPathFolder + '__' + test40_pathSession + '__Stroop_Victoria_2__audio1.webm');
        test40_resetParameters(3);
        console.log("Test40 audio1 stored");
    }

    if (test40_page5_mediaRecorder != null) {
        let blobMain = new Blob(test40_page5_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test40_idPathFolder + '__' + test40_pathSession + '__Stroop_Victoria_2__audio2.webm');
        test40_resetParameters(5);
        console.log("Test40 audio2 stored");
    }

    if (test40_page7_mediaRecorder != null) {
        let blobMain = new Blob(test40_page7_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test40_idPathFolder + '__' + test40_pathSession + '__Stroop_Vectoria_2__audio3.webm');
        test40_resetParameters(7);
        console.log("Test40 audio3 stored");
    }
}

function test40_uploadFiles() {
    let formData = new FormData();
    
    if (test40_page3_mediaRecorder != null) {
        let blobMain = new Blob(test40_page3_recordedBlob, {type: 'audio/webm'});
        formData.append('audios', blobMain, 'audio1.webm');
    }

    if (test40_page5_mediaRecorder != null) {
        let blobMain = new Blob(test40_page5_recordedBlob, {type: 'audio/webm'});
        formData.append('audios', blobMain, 'audio2.webm');
    }

    if (test40_page7_mediaRecorder != null) {
        let blobMain = new Blob(test40_page7_recordedBlob, {type: 'audio/webm'});
        formData.append('audios', blobMain, 'audio3.webm');
    } 

    fetch('/patient/upload-multifiles-stroop-victoria-2', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {                    
        test40_resetParameters(0);
        
        console.log("Test40 uploaded");

        socket.emit('Files-Uploaded', { 'test' : 'Stroop_Victoria_2' });  
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}

function test40_uploadAndStoreFiles() {
    let formData = new FormData();

    if (test40_page3_mediaRecorder != null) {
        let blobMain = new Blob(test40_page3_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test40_idPathFolder + '__' + test40_pathSession + '__Stroop_Victoria_2__audio1.webm');
        formData.append('audios', blobMain, 'audio1.webm');
    }

    if (test40_page5_mediaRecorder != null) {
        let blobMain = new Blob(test40_page5_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test40_idPathFolder + '__' + test40_pathSession + '__Stroop_Victoria_2__audio2.webm');
        formData.append('audios', blobMain, 'audio2.webm');
    }

    if (test40_page7_mediaRecorder != null) {
        let blobMain = new Blob(test40_page7_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test40_idPathFolder + '__' + test40_pathSession + '__Stroop_Victoria_2__audio3.webm');
        formData.append('audios', blobMain, 'audio3.webm');
    }

    fetch('/patient/upload-multifiles-stroop-victoria-2', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {                    
        test40_resetParameters(0);
        
        console.log("Test40 uploaded and stored");

        socket.emit('Files-Uploaded', { 'test' : 'Stroop_Victoria_2' }); 
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}