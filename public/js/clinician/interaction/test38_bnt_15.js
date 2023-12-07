let test38_DocumentEvents;

let test38_mediaRecorder;
let test38_recordedBlob;
let test38_record_video;

let test38_storeMedia;
let test38_idPathFolder;
let test38_pathSession;

let test38_countSecond;
let test38_idInterval;

let test38_shortcut = 0;

socket.on('Test38', function(data) {
    let type = data['type'];

    switch (type) {
        case "finish":
            offDocumentEvents(test38_DocumentEvents);
            test38_close();
            returnListOfTests();

            break;
        
        case "hide-continuer":
            $('#bt-test38-page' + data['page'] + '-continuer').css("display", "none");
            break;

        case "select-word":
            if (data['word'] == 'true')
                $('#bt-test38-page' + data['page'] + '-2').attr("class", "btn btn-warning btn-lg btn-block");
            else
                $('#bt-test38-page' + data['page'] + '-1').attr("class", "btn btn-warning btn-lg btn-block");

            break;

        case "set-text":
            $('#txt-test38-page' + data['page']).val(data['text']);
            break;

        case "show-continuer":
            $('#bt-test38-page' + data['page'] + '-continuer').css("display", "inline");
            break;

        case "show-page": {      
            let page = data['page'];

            switch(page) {
                case 1: case 2: 
                    $('#MainScreenGame').load('/tests/bnt_15?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test38_OnDocumentEventsOnPage(socket, page);
                        }
                    });  
                    break;

                case 3:
                    $('#MainScreenGame').load('/tests/bnt_15?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test38_OnDocumentEventsOnPage(socket, page);
                            if (test38_record_video == true) {
                                setPatientStatus(1, 0, 0, 1);
                            } else {
                                setPatientStatus(1, 0, 0, 0);
                            }
                            test38_countSecond = 0;
                            clearInterval(test38_idInterval);
                        }
                    });  
                    break;

                case 4: case 18:
                    $('#MainScreenGame').load('/tests/bnt_15?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test38_OnDocumentEventsOnPage(socket, page);

                            if (test38_record_video == true) 
                                setPatientStatus(0, 1, 0, 1);
                            else
                                setPatientStatus(0, 1, 0, 0);

                            socket.emit('Test38', { 'type' : 'old-status-of-page', 'page' : page });
                            test38_countSecond = 0;
                            clearInterval(test38_idInterval);
                            test38_countTimer('#txt-test38-page' + page + '-count-timer', 10);
                        }
                    });  
                    break;

                case 5: case 6: case 7: case 8: case 9: case 10: 
                case 11: case 12: case 13: case 14: case 15: case 16:
                case 17:
                    $('#MainScreenGame').load('/tests/bnt_15?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test38_OnDocumentEventsOnPage(socket, page);
                            socket.emit('Test38', { 'type' : 'old-status-of-page', 'page' : page });
                            test38_countSecond = 0;
                            clearInterval(test38_idInterval);
                            test38_countTimer('#txt-test38-page' + page + '-count-timer', 10);
                        }
                    });  
                    break;

                case 19:
                    $('#MainScreenGame').load('/tests/bnt_15?page=' + page + 
                        '&haufig=' + data['haufig'] + '&mittel=' + data['mittel'] + 
                        '&selten=' + data['selten'], 
                        function(strResponse, strStatus, xhr) {
                            if (strStatus == "success") {   
                                test38_OnDocumentEventsOnPage(socket, page);
                                test38_countSecond = 0;
                                clearInterval(test38_idInterval);
                            }
                        }
                    );
                    break;
            }            
            break;
        }

        case "start":
            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();                     
            playStream('SmallStream', patientStream_temp);

            test38_DocumentEvents = [];

            test38_record_video = data['record_video'];
            if (test38_record_video == true) {
                test38_startRecording();
            }

            test38_shortcut = data['shortcut'];

            $('#MainScreenGame').load('/tests/bnt_15?page=1', function(strResponse, strStatus, xhr) {
                if (strStatus == "success") {     
                    test38_OnDocumentEventsOnPage(socket, 1);
                    if (test38_record_video == true) {
                        setPatientStatus(1, 0, 0, 1);
                    } else {
                        setPatientStatus(1, 0, 0, 0);
                    }
                }
            });
            break; 

        case "stop":
            test38_countSecond = 0;
            clearInterval(test38_idInterval);
            offDocumentEvents(test38_DocumentEvents);
            test38_close();

            setPatientStatusDefault();
            break;

        case "unselect-word":
            if (data['word'] == 'true')
                $('#bt-test38-page' + data['page'] + '-2').attr("class", "btn btn-secondary btn-lg btn-block");
            else
                $('#bt-test38-page' + data['page'] + '-1').attr("class", "btn btn-secondary btn-lg btn-block");
                
            break;

        case "store-files":
            if (test38_record_video == true) {
                test38_close();
                returnListOfTests();
                offDocumentEvents(test38_DocumentEvents);
                setPatientStatusDefault();      
            }      
            break;

        case "store-files-in-clinician":
            if (test38_record_video == true) {
                test38_storeMedia = "store_local";
                test38_idPathFolder = data["id_path_folder"];
                test38_pathSession = data["path_session"];

                test38_stopRecording();

                test38_close();
                returnListOfTests();
                offDocumentEvents(test38_DocumentEvents);
                setPatientStatusDefault();      
            }      
            break;

        case 'upload-files':            
            $('#Wait_Upload_Tests').css("display", "block"); 
            $('#Wait_Upload_Tests').load('/wait/uploadingfiles');            

            test38_close();
            returnListOfTests();
            offDocumentEvents(test38_DocumentEvents);
            setPatientStatusDefault();
            break;
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test38_OnDocumentEventsOnPage(socket, page) {
    offDocumentEvents(test38_DocumentEvents);

    switch (page) {
        case 1:
            test38_DocumentEvents.push("#bt-test38-page1-continuer");            

            $(document).on("click", "#bt-test38-page1-continuer", function(e) {
                socket.emit('Test38', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 2: case 3: 
            test38_DocumentEvents.push('#bt-test38-page' + page + '-retour');
            test38_DocumentEvents.push('#bt-test38-page' + page + '-continuer');

            $(document).on("click", '#bt-test38-page' + page +'-retour', function(e) {
                socket.emit('Test38', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", '#bt-test38-page' + page + '-continuer', function(e) {                
                socket.emit('Test38', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 4: case 5: case 6: case 7: case 8: case 9: case 10: 
        case 11: case 12: case 13: case 14: case 15: case 16:
        case 17: case 18:
            test38_DocumentEvents.push('#bt-test38-page' + page + '-1');
            test38_DocumentEvents.push('#bt-test38-page' + page + '-2');        
            test38_DocumentEvents.push('#bt-test38-page' + page + '-retour');
            test38_DocumentEvents.push('#bt-test38-page' + page + '-continuer');

            $(document).on("click", '#bt-test38-page' + page +'-1', function(e) {
                socket.emit('Test38', { 'type' : 'select-word', 'page' : page, 'word' : 'false' });
            });

            $(document).on("click", '#bt-test38-page' + page + '-2', function(e) {                
                socket.emit('Test38', { 'type' : 'select-word', 'page' : page, 'word' : 'true' });
            });

            $(document).on("click", '#bt-test38-page' + page +'-retour', function(e) {
                socket.emit('Test38', { 'type' : 'show-page-and-store', 'page-show' : (page - 1), 'page-store' : page, 
                    'text' : $('#txt-test38-page' + page).val()
                });
            });

            $(document).on("click", '#bt-test38-page' + page + '-continuer', function(e) {                
                socket.emit('Test38', { 'type' : 'show-page-and-store', 'page-show' : (page + 1), 'page-store' : page, 
                    'text' : $('#txt-test38-page' + page).val()
                });
            });
            break;

        case 19: 
            test38_DocumentEvents.push('#bt-test38-page' + page + '-retour');
            test38_DocumentEvents.push('#bt-test38-page' + page + '-terminer');

            $(document).on("click", '#bt-test38-page' + page +'-retour', function(e) {
                socket.emit('Test38', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", '#bt-test38-page' + page + '-terminer', function(e) {                
                socket.emit('Test38', { 'type' : 'store-values' });
            });
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test38_countTimer(txtCount, countSecond) {    
    test38_idInterval = setInterval(frame, 1000);    
    function frame() {
        if (test38_countSecond < countSecond) {
            test38_countSecond++;             
            $(txtCount).val(test38_countSecond);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test38_close() {
    if (test38_shortcut == 0)            
        closeTest("#Run_Test38_BNT_15", "#BackListTests_BNT_15", "#Test38_BNT_15_Checkbox_Record_Video");
    else if (test38_shortcut == 1)
        closeTest("#Run_Test38_BNT_15_SC1", "#BackListTests_BNT_15_SC1", "#Test38_BNT_15_Checkbox_Record_Video");
}
            
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test38_resetParameters() {    
    test38_mediaRecorder_patient = null;
    test38_recordedBlob_patient = [];
    
    test38_storeMedia = ""; 
}

function test38_startRecording() { 
    test38_resetParameters();   
    selectTypeSupportedMediaRecorder();
    
    try { 
        test38_mediaRecorder_patient = new MediaRecorder(patientStream_temp, typeSupportedMediaRecorder);              
    } catch (e) {
        return;
    }

    test38_mediaRecorder_patient.onstop = (event) => {
        if (test38_storeMedia == "store_local") {
            test38_storeFiles_patient('patient_video.webm');
        }
    };

    test38_mediaRecorder_patient.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {            
            test38_recordedBlob_patient.push(event.data);
        }             
    });

    test38_mediaRecorder_patient.start(10); // collect 10ms of data
}

function test38_stopRecording() {
    test38_mediaRecorder_patient.stop();
}

function test38_storeFiles_patient(fileName) {    
    let blobMain = new Blob(test38_recordedBlob_patient, {type: 'video/webm'});
    saveAs(blobMain, test38_idPathFolder + '__' + test38_pathSession + '__BNT_15__' + fileName);

    test38_resetParameters();
    console.log("Test38 patient stored");
}