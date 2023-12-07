let test10_mediaRecorderMain;
let test10_recordedBlobMain;

let test10_idPathFolder;
let test10_pathSession;

socket.on('Test10', function(data) {
    let type = data['type'];

    switch (type) {
        case "restart-recording":
            test10_reset();
            break;

        case "start-recording":                
            test10_startRecording();
            break;

        case "stop":
            test10_reset();
            break;
            
        case "stop-recording":            
            test10_stopRecording();
            break;

        case 'store-files': {
            test10_idPathFolder = data["id_path_folder"];
            test10_pathSession = data["path_session"];

            let strFileName = "";

            if (data['sub-test'] == 'animaux') {
                strFileName = "P-video_Animaux.webm";
            } else if (data['sub-test'] == 'fruits') {
                strFileName = "P-video_Fruits.webm";
            } 
            
            test10_storeFiles(strFileName);
            break;
        }

        case "upload-files": {
            let strFileName = "";

            if (data['sub-test'] == 'animaux') {
                strFileName = "P-video_Animaux.webm";
            } else if (data['sub-test'] == 'fruits') {
                strFileName = "P-video_Fruits.webm";
            } 
            
            test10_uploadFiles(strFileName);
            break;
        }

        case "upload-store-files": {
            test10_idPathFolder = data["id_path_folder"];
            test10_pathSession = data["path_session"];

            let strFileName = "";

            if (data['sub-test'] == 'animaux') {
                strFileName = "P-video_Animaux.webm";
            } else if (data['sub-test'] == 'fruits') {
                strFileName = "P-video_Fruits.webm";
            } 
            
            test10_uploadAndStoreFiles(strFileName);            
            break;
        }
    }
});

function test10_startRecording() { 
    test10_reset();   
    selectTypeSupportedMediaRecorder();

    try {            
        test10_mediaRecorderMain = new MediaRecorder(recordStream_temp, typeSupportedMediaRecorder);                 
    } catch (e) {
        return;
    }

    test10_mediaRecorderMain.onstop = (event) => {         
    };

    test10_mediaRecorderMain.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {            
            test10_recordedBlobMain.push(event.data);
        }             
    });

    test10_mediaRecorderMain.start(10); // collect 10ms of data
}

function test10_stopRecording() {
    test10_mediaRecorderMain.stop();    
}

function test10_reset() {
    test10_mediaRecorderMain = null;
    test10_recordedBlobMain = [];
}

function test10_storeFiles(fileName) {    
    let blobMain = new Blob(test10_recordedBlobMain, {type: 'video/webm'});
    saveAs(blobMain, test10_idPathFolder + '__' + test10_pathSession + '__FVSEM__' + fileName);    
    
    test10_reset();    
    console.log("Test10 stored");
}

function test10_uploadFiles(fileName) {
    let formData = new FormData();            
    let blobMain = new Blob(test10_recordedBlobMain, {type: 'video/webm'});
    formData.append('video', blobMain, fileName);            
    
    fetch('/patient/upload-singlefile-fvsem', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {                    
        test10_reset();
        
        console.log("Test10 uploaded");

        socket.emit('Files-Uploaded', { 'test' : 'FVSEM' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}

function test10_uploadAndStoreFiles(fileName) {
    let blobMain = new Blob(test10_recordedBlobMain, {type: 'video/webm'});
    saveAs(blobMain, test10_idPathFolder + '__' + test10_pathSession + '__FVSEM__' + fileName);

    let formData = new FormData();    
    formData.append('video', blobMain, fileName);            
    
    fetch('/patient/upload-singlefile-fvsem', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {                    
        test10_reset();
        
        console.log("Test10 uploaded and stored");

        socket.emit('Files-Uploaded', { 'test' : 'FVSEM' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}