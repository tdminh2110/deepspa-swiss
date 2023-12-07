let test14_discussion_libre_mediaRecorder;
let test14_discussion_libre_recordedBlob;

let test14_reconter_journee_mediaRecorder;
let test14_reconter_journee_recordedBlob;

let test14_number_file;

let test14_patient_DocumentEvents;

let test14_storeMedia;
let test14_idPathFolder;
let test14_pathSession;

socket.on('Test14', function(data) {    
    let type = data['type'];
    
    switch (type) { 
        case "dl": case "rj": {
            let instruction = data['instruction'];

            switch (instruction) {
                case "start-recording":
                    test14_startRecording(type);
                    break;

                case "store-files":                    
                    test14_storeMedia = "store_local";
                    test14_idPathFolder = data["id_path_folder"];
                    test14_pathSession = data["path_session"];
                    test14_number_file = data['number_file'];
                    test14_stop(type);

                    break;
                    
                case "upload-files":
                    test14_storeMedia = "upload_server";
                    test14_number_file = data['number_file'];
                    test14_stop(type);
                    break;

                case "upload-store-files":
                    test14_storeMedia = "upload_store";
                    test14_idPathFolder = data["id_path_folder"];
                    test14_pathSession = data["path_session"];
                    test14_number_file = data['number_file'];
                    test14_stop(type);
                    break;
            }
            break;
        }

        case "fcs": {            
            let instruction = data['instruction'];

            switch(instruction) {
                case "select-sentence": 
                    test14_patient_fcs_selectSentence(data['sentence'], data['page']);
                    break;

                case "show-page": {
                    let page = data['page'];

                    switch(page) {
                        case 1: case 2: case 3: case 4: 
                            $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=' + page, function(strResponse, strStatus, xhr) {                        
                                if (strStatus == "success") {                                                
                                    test14_Patient_OnDocumentEventsOnType(socket, type, page);
                                    socket.emit('Test14', { 'type' : type, 'instruction' : 'old-status-of-page', 'page' : page, 'sender' : 'patient' });
                                }
                            });
                            break;

                        case 5:
                            $('#MainScreenVideo').hide();
                            $('#MainScreenGame').show(); 
                            $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=' + page, function(strResponse, strStatus, xhr) {                        
                                if (strStatus == "success") {                                                
                                    test14_Patient_OnDocumentEventsOnType(socket, type, page);
                                    socket.emit('Test14', { 'type' : type, 'instruction' : 'old-status-of-page', 'page' : page, 'sender' : 'patient' });
                                }
                            });
                            break;

                        case 6:
                            test14_Patient_OffDocumentEvents();
                            $('#MainScreenVideo').show();
                            $('#MainScreenGame').empty();
                            $('#MainScreenGame').hide();
                            break;
                    }                    
                    break;
                }

                case "start":
                    $('#MainScreenVideo').hide();
                    $('#MainScreenGame').show(); 
                    $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=1');
                    break;

                case "unselect-sentence": 
                    test14_patient_fcs_unselectSentence(data['sentence'], data['page']);
                    break;
            }
            break;
        }

        case "gds": {
            let instruction = data['instruction'];

            switch(instruction) {
                case "hide-continuer":
                    test14_patient_gds_hideContinuer(data['page']);
                    break;

                case "select-word": 
                    test14_patient_gds_selectWord(data['word'], data['page']);
                    break;

                case "show-continuer":
                    test14_patient_gds_showContinuer(data['page']);
                    break;

                case "show-page": {
                    let page = data['page'];

                    switch(page) {
                        case 1: case 17:
                            $('#MainScreenVideo').show();
                            $('#MainScreenGame').empty();
                            $('#MainScreenGame').hide();
                            break;

                        case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
                            $('#MainScreenVideo').hide();
                            $('#MainScreenGame').show(); 
                            $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=' + page, function(strResponse, strStatus, xhr) {                        
                                if (strStatus == "success") {    
                                    test14_Patient_OnDocumentEventsOnType(socket, type, page);
                                    socket.emit('Test14', { 'type' : type, 'instruction' : 'old-status-of-page', 'page' : page, 'sender' : 'patient' });
                                }
                            });
                            break;
                    }                    
                    break;
                }

                case "unselect-word": 
                    test14_patient_gds_unselectWord(data['word'], data['page']);
                    break;
            }
        }

        case "start":
            test14_patient_resetParameters('');
            test14_patient_DocumentEvents = [];
            break;

        case "stop":             
            test14_patient_resetParameters('');
            
            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();
            break;
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test14_Patient_OnDocumentEventsOnType(socket, type, page) {    
    test14_Patient_OffDocumentEvents();
    
    switch (type) {
        case "fcs": {
            switch(page) {
                case 2: case 3: case 4: case 5:
                    for (let i = 1; i <= 7; i++) {                                        
                        test14_patient_DocumentEvents.push('#bt-test14-fcs-page0' + page + '-' + i);
                    }

                    for (let i = 1; i <= 7; i++) {                    
                        $(document).on('click', '#bt-test14-fcs-page0' + page + '-' + i, function(e) {
                            socket.emit('Test14', { 'type' : type, 'instruction' : 'select-sentence', 'page' : page, 'sentence' : i, 'sender' : 'patient' });
                        });
                    }
                    break;
            }
            break;
        }

        case "gds": {
            switch(page) {
                case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
                    test14_patient_DocumentEvents.push('#bt-test14-gds-page' + page + '-oui');
                    test14_patient_DocumentEvents.push('#bt-test14-gds-page' + page + '-non');
                    test14_patient_DocumentEvents.push('#bt-test14-gds-page' + page + '-retour');
                    test14_patient_DocumentEvents.push('#bt-test14-gds-page' + page + '-continuer');

                    $(document).on("click", '#bt-test14-gds-page' + page +'-oui', function(e) {                                        
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'select-word', 'page' : page, 'word' : 'oui', 'sender' : 'patient' });                        
                    });

                    $(document).on("click", '#bt-test14-gds-page' + page + '-non', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'select-word', 'page' : page, 'word' : 'non', 'sender' : 'patient' });
                    });

                    $(document).on("click", '#bt-test14-gds-page' + page +'-retour', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : (page - 1), 'sender' : 'patient' });
                    });

                    $(document).on("click", '#bt-test14-gds-page' + page + '-continuer', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : (page + 1), 'sender' : 'patient' });
                    });
                    break;
            }
            break;
        }
    }
}

function test14_Patient_OffDocumentEvents() {      

    for(let i = 0; i < test14_patient_DocumentEvents.length; i++) {
        $(document).off("click", test14_patient_DocumentEvents[i]);
    }
    test14_patient_DocumentEvents = [];
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test14_patient_fcs_selectSentence(order_number_of_sentence, page) {
    $('#bt-test14-fcs-page0' + page + '-' + order_number_of_sentence).attr("class", "btn btn-warning btn-lg btn-block");    
}

function test14_patient_fcs_unselectSentence(order_number_of_sentence, page) {        
    $('#bt-test14-fcs-page0' + page + '-' + order_number_of_sentence).attr("class", "btn btn-secondary btn-lg btn-block");    
}

function test14_patient_gds_hideContinuer(page) {    
    $('#bt-test14-gds-page' + page + '-continuer').css("display", "none");  
}

function test14_patient_gds_selectWord(word, page) {
    $('#bt-test14-gds-page' + page + '-' + word).attr("class", "btn btn-warning btn-lg btn-block");      
}

function test14_patient_gds_showContinuer(page) {    
    $('#bt-test14-gds-page' + page + '-continuer').css("display", "inline");  
}

function test14_patient_gds_unselectWord(word, page) {
    $('#bt-test14-gds-page' + page + '-' + word).attr("class", "btn btn-secondary btn-lg btn-block");        
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test14_patient_resetParameters(type) {   
    if (type == '') {
        test14_discussion_libre_mediaRecorder = null;
        test14_discussion_libre_recordedBlob = [];
        test14_reconter_journee_mediaRecorder = null;
        test14_reconter_journee_recordedBlob = [];
    } else if (type == 'dl') {    
        test14_discussion_libre_mediaRecorder = null;
        test14_discussion_libre_recordedBlob = [];
    } else if (type == 'rj') {    
        test14_reconter_journee_mediaRecorder = null;
        test14_reconter_journee_recordedBlob = [];
    }
}

function test14_resetParameters(type) {
    if (type == '') {
        test14_discussion_libre_mediaRecorder = null;
        test14_discussion_libre_recordedBlob = [];
        test14_reconter_journee_mediaRecorder = null;
        test14_reconter_journee_recordedBlob = [];
    } else if (type == 'dl') {
        test14_discussion_libre_mediaRecorder = null;
        test14_discussion_libre_recordedBlob = [];
    } else if (type == 'rj') {    
        test14_reconter_journee_mediaRecorder = null;
        test14_reconter_journee_recordedBlob = [];
    } 

    test14_storeMedia = "";
}

function test14_startRecording(type) { 
    test14_resetParameters(type); 
    selectTypeSupportedMediaRecorder();      

    if (type == 'dl') {    
        try {
            test14_discussion_libre_mediaRecorder = new MediaRecorder(recordStream_temp, typeSupportedMediaRecorder);  
        } catch (e) {
            return;
        }

        test14_discussion_libre_mediaRecorder.onstop = (event) => {            
            if (test14_storeMedia == "upload_server") {
                test14_uploadFiles(type, test14_number_file);
            } else if (test14_storeMedia == "store_local") {
                test14_storeFiles(type, test14_number_file);
            } else if (test14_storeMedia == "upload_store") {
                test14_uploadAndStoreFiles(type, test14_number_file);
            }
        };

        test14_discussion_libre_mediaRecorder.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {            
                test14_discussion_libre_recordedBlob.push(event.data);
            }             
        });

        test14_discussion_libre_mediaRecorder.start(10); // collect 10ms of data
    } else if (type == 'rj') {
        try {    
            test14_reconter_journee_mediaRecorder = new MediaRecorder(recordStream_temp, typeSupportedMediaRecorder);  
        } catch (e) {
            return;
        }

        test14_reconter_journee_mediaRecorder.onstop = (event) => {
            if (test14_storeMedia == "upload_server") {
                test14_uploadFiles(type, test14_number_file);
            } else if (test14_storeMedia == "store_local") {
                test14_storeFiles(type, test14_number_file);
            } else if (test14_storeMedia == "upload_store") {
                test14_uploadAndStoreFiles(type, test14_number_file);
            }
        };

        test14_reconter_journee_mediaRecorder.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {            
                test14_reconter_journee_recordedBlob.push(event.data);
            }             
        });

        test14_reconter_journee_mediaRecorder.start(10); // collect 10ms of data
    } 
}

function test14_stop(type) {    
    if (type == "dl") {
        test14_discussion_libre_mediaRecorder.stop();   
    } else if (type == "rj") {
        test14_reconter_journee_mediaRecorder.stop();
    } 
}

function test14_storeFiles(type, number_file) {
    if (type == "dl") {
        let blobMain = new Blob(test14_discussion_libre_recordedBlob, {type: 'video/webm'});
        saveAs(blobMain, test14_idPathFolder + '__' + test14_pathSession + '__Entr_Clin__video_discussion_libre_' + number_file + '.webm');
        test14_resetParameters(type);
        console.log("Test14 discussion libre stored");
        socket.emit('Files-Uploaded', { 'test' : 'Entr_Clin' });  
    } else if (type == "rj") {
        let blobMain = new Blob(test14_reconter_journee_recordedBlob, {type: 'video/webm'});
        saveAs(blobMain, test14_idPathFolder + '__' + test14_pathSession + '__Entr_Clin__video_reconter_journee_' + number_file + '.webm');
        test14_resetParameters(type);
        console.log("Test14 reconter journee stored");
        socket.emit('Files-Uploaded', { 'test' : 'Entr_Clin' });
    }
}

function test14_uploadFiles(type, number_file) {
    let formData = new FormData();
    
    if (type == "dl") {
        let blobMain = new Blob(test14_discussion_libre_recordedBlob, {type: 'video/webm'});
        formData.append('video', blobMain, 'video_discussion_libre_' + number_file + '.webm');
    } else if (type == "rj") {
        let blobMain = new Blob(test14_reconter_journee_recordedBlob, {type: 'video/webm'});
        formData.append('video', blobMain, 'video_reconter_journee_' + number_file + '.webm');
    }

    fetch('/patient/upload-singlefile-entr_clin', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {                    
        test14_resetParameters(type);
        
        console.log("Test14 uploaded");

        socket.emit('Files-Uploaded', { 'test' : 'Entr_Clin' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}

function test14_uploadAndStoreFiles(type, number_file) {
    let formData = new FormData();
    let type_local = type;
    
    if (type == "dl") {
        let blobMain = new Blob(test14_discussion_libre_recordedBlob, {type: 'video/webm'});
        saveAs(blobMain, test14_idPathFolder + '__' + test14_pathSession + '__Entr_Clin__video_discussion_libre_' + number_file + '.webm');
        formData.append('video', blobMain, 'video_discussion_libre_' + number_file + '.webm');        
    } else if (type == "rj") {
        let blobMain = new Blob(test14_reconter_journee_recordedBlob, {type: 'video/webm'});
        saveAs(blobMain, test14_idPathFolder + '__' + test14_pathSession + '__Entr_Clin__video_reconter_journee_' + number_file + '.webm');
        formData.append('video', blobMain, 'video_reconter_journee_' + number_file + '.webm');
    }

    fetch('/patient/upload-singlefile-entr_clin', {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'enctype': 'multipart/form-data' // the enctype is important to work with multer on the server
        })
    }).then(function(response) {                    
        test14_resetParameters(type_local);
        
        if (type_local == "dl") {
            console.log("Test14 DL uploaded and stored");
        } else if (type_local == "rj") {
            console.log("Test14 RJ uploaded and stored");
        }

        socket.emit('Files-Uploaded', { 'test' : 'Entr_Clin' });
    }).catch(function(err) {
        alert("Loi: " + err);
    }); 
}