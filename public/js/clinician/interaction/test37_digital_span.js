let test37_audioRecorder_patient;
let test37_mediaRecorder_patient;
let test37_recordedBlob_patient;
let test37_record_audio;

let test37_storeMedia;
let test37_idPathFolder;
let test37_pathSession;

let test37_DocumentEvents;

let test37_shortcut = 0;

//////////////////////////////////////////////////////////////////////////////////////////////////

socket.on('Test37', function(data) {    
    let type = data['type'];
    
    switch (type) {
        case "finish":
            offDocumentEvents(test37_DocumentEvents);
            test37_close();
            returnListOfTests();

            break;

        case "hide-continuer":
            $('#bt-test37-page' + data['page'] + '-continuer').css("display", "none");        
            break;

        case 'select-word': {
            let page = data['page'];
            let action = data['action'];
            let status = data['status'];

            if (status == 1) {
                if ((action == 1) || (action == 3)) {
                    $('#bt-test37-page' + page + '-' + action).attr("class", "btn btn-warning");
                    $('#bt-test37-page' + page + '-' + (action + 1)).attr("class", "btn btn-secondary");
                } else if ((action == 2) || (action == 4)) {
                    $('#bt-test37-page' + page + '-' + (action - 1)).attr("class", "btn btn-secondary");
                    $('#bt-test37-page' + page + '-' + action).attr("class", "btn btn-warning");
                }
            } else {
                $('#bt-test37-page' + page + '-' + action).attr("class", "btn btn-secondary");
            }

            break;
        }

        case "show-continuer":
            $('#bt-test37-page' + data['page'] + '-continuer').css("display", "inline");        
            break;

        case 'show-page': {
            let page = data['page'];

            switch(page) {
                case 1: case 8:
                    $('#MainScreenGame').load('/tests/digital_span?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test37_OnDocumentEventsOnPage(socket, page);
                        }
                    });  
                    break;

                case 2: case 3: case 4: case 5: case 6: case 7: case 9: case 10: case 11:
                case 12: case 13: case 14:
                    $('#MainScreenGame').load('/tests/digital_span?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test37_OnDocumentEventsOnPage(socket, page);
                            socket.emit('Test37', { 'type' : 'old-status-of-page', 'page' : page });
                        }
                    });  
                    break;

                case 15:
                    $('#MainScreenGame').load('/tests/digital_span?page=' + page +
                        '&vor=' + data['vor'] + '&ruc=' + data['ruc'], 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test37_OnDocumentEventsOnPage(socket, page);
                        }
                    });
                    break;
            }

            break;
        }
        
        case 'start':
            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();
            playStream('SmallStream', patientStream_temp);

            test37_record_audio = data['record_audio'];
            if (test37_record_audio == true) {
                test37_startRecording();
            }

            test37_DocumentEvents = [];

            test37_shortcut = data['shortcut'];

            $('#MainScreenGame').load('/tests/digital_span?page=1', function(strResponse, strStatus, xhr) {
                if (strStatus == "success") {     
                    test37_OnDocumentEventsOnPage(socket, 1);

                    if (test37_record_audio == true) {
                        setPatientStatus(1, 0, 1, 0);
                    } else {
                        setPatientStatus(1, 0, 0, 0);
                    }
                }  
            });
            
            break;
        
        case 'stop':
            offDocumentEvents(test37_DocumentEvents);
            test37_close();
            setPatientStatusDefault();
            break;
            
        case "store-files":
            if (test37_record_audio == true) {
                test37_close();
                returnListOfTests();
                offDocumentEvents(test37_DocumentEvents);
                setPatientStatusDefault();      
            }      
            break;

        case "store-files-in-clinician":
            if (test37_record_audio == true) {
                test37_storeMedia = "store_local";
                test37_idPathFolder = data["id_path_folder"];
                test37_pathSession = data["path_session"];

                test37_stopRecording();

                test37_close();
                returnListOfTests();
                offDocumentEvents(test37_DocumentEvents);
                setPatientStatusDefault();      
            }      
            break;

        case 'upload-files':            
            $('#Wait_Upload_Tests').css("display", "block"); 
            $('#Wait_Upload_Tests').load('/wait/uploadingfiles');            

            test37_close();
            returnListOfTests();
            offDocumentEvents(test37_DocumentEvents);
            setPatientStatusDefault();
            break;
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////

function test37_OnDocumentEventsOnPage(socket, page) {
    offDocumentEvents(test37_DocumentEvents);

    switch (page) {
        case 1:
            test37_DocumentEvents.push('#bt-test37-page' + page + '-continuer');

            $(document).on("click", "#bt-test37-page" + page + "-continuer", function(e) {
                socket.emit('Test37', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 2: case 3: case 4: case 5: case 6: case 7: case 9: case 10: case 11: case 12: 
        case 13: case 14:
            test37_DocumentEvents.push('#btaudio-test37-page' + page + '-1');
            test37_DocumentEvents.push('#btaudio-test37-page' + page + '-2');
        
            for(let i = 1; i <= 4; i++) {
                test37_DocumentEvents.push('#bt-test37-page' + page + '-' + i);
            }

            test37_DocumentEvents.push('#bt-test37-page' + page + '-retour');
            test37_DocumentEvents.push('#bt-test37-page' + page + '-continuer');

            $(document).on("click", '#btaudio-test37-page' + page + '-1', function(e) {
                socket.emit('Test37', { 'type' : 'play-audio', 'page' : page, 'audio' : 1 });
            });

            $(document).on("click", '#btaudio-test37-page' + page + '-2', function(e) {
                socket.emit('Test37', { 'type' : 'play-audio', 'page' : page, 'audio' : 2 });
            });

            for(let i = 1; i <= 4; i++) {
                $(document).on("click", '#bt-test37-page' + page + '-' + i, function(e) { 
                    socket.emit('Test37', { 'type' : 'select-word', 'page' : page, 'action' : i });
                });
            }

            $(document).on("click", '#bt-test37-page' + page +'-retour', function(e) { 
                socket.emit('Test37', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", '#bt-test37-page' + page + '-continuer', function(e) {                
                socket.emit('Test37', { 'type' : 'show-page', 'page' : (page + 1) });
            });

            break;

        case 8:            
            test37_DocumentEvents.push('#bt-test37-page' + page + '-retour');
            test37_DocumentEvents.push('#bt-test37-page' + page + '-continuer');
            
            $(document).on("click", '#bt-test37-page' + page +'-retour', function(e) { 
                socket.emit('Test37', { 'type' : 'show-page', 'page' : (page - 1), 'prev-page' : page });
            });

            $(document).on("click", '#bt-test37-page' + page + '-continuer', function(e) {                
                socket.emit('Test37', { 'type' : 'show-page', 'page' : (page + 1) });
            });

            break;

        case 15:
            test37_DocumentEvents.push("#bt-test37-page" + page + "-retour");
            test37_DocumentEvents.push("#bt-test37-page" + page + "-terminer");

            $(document).on("click", "#bt-test37-page" + page + "-retour", function(e) { 
                socket.emit('Test37', { 'type' : 'show-page', 'page' : (page - 1), 'prev-page' : page });
            });

            $(document).on("click", "#bt-test37-page" + page + "-terminer", function(e) {                  
                socket.emit('Test37', { 'type' : 'store-values' });
            });
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test37_close() {
    if (test37_shortcut == 0)            
        closeTest("#Run_Test37_Digital_Span", "#BackListTests_Digital_Span", "#Test37_Digital_Span_Checkbox_Record_Audio");
    else if (test37_shortcut == 1)
        closeTest("#Run_Test37_Digital_Span_SC1", "#BackListTests_Digital_Span_SC1", "#Test37_Digital_Span_Checkbox_Record_Audio");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test37_resetParameters() {    
    test37_audioRecorder_patient = null;
    test37_mediaRecorder_patient = null;
    test37_recordedBlob_patient = [];
    
    test37_storeMedia = ""; 
}

function test37_startRecording() { 
    test37_resetParameters();
    
    try {
        test37_audioRecorder_patient = new MediaStream(patientStream_temp.getAudioTracks());            
        test37_mediaRecorder_patient = new MediaRecorder(test37_audioRecorder_patient, {mimeType: 'audio/webm;codecs=opus'});
    } catch (e) {
        return;
    }

    test37_mediaRecorder_patient.onstop = (event) => {
        if (test37_storeMedia == "store_local") {
            test37_storeFiles_patient('patient_audio.webm');
        }
    };

    test37_mediaRecorder_patient.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {            
            test37_recordedBlob_patient.push(event.data);
        }             
    });

    test37_mediaRecorder_patient.start(10); // collect 10ms of data
}

function test37_stopRecording() {
    test37_mediaRecorder_patient.stop();
}

function test37_storeFiles_patient(fileName) {    
    let blobMain = new Blob(test37_recordedBlob_patient, {type: 'audio/webm'});
    saveAs(blobMain, test37_idPathFolder + '__' + test37_pathSession + '__Digital_Span__' + fileName);

    test37_resetParameters();
    console.log("Test37 patient stored");
}