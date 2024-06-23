let test41_DocumentEvents;

let test41_mediaRecorder_patient;
let test41_recordedBlob_patient;
let test41_record_video;

let test41_storeMedia;
let test41_idPathFolder;
let test41_pathSession;

let test41_countSecond = 0;
let test41_idInterval;

socket.on('Test41', function(data) {
    let type = data['type'];

    switch (type) {
        case "finish":
            offDocumentEvents(test41_DocumentEvents);   
            test41_close();         
            returnListOfTests();

            break;
        
        case "show-page": {      
            let page = data['page'];

            switch(page) {
                case 1: 
                    $('#MainScreenGame').load('/tests/trial_making_test?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test41_OnDocumentEventsOnPage(socket, page);
                        }
                    });  
                    break;
                
                case 2: case 3:
                    $('#MainScreenGame').load('/tests/trial_making_test?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {       
                            test41_OnDocumentEventsOnPage(socket, page);
                       
                            socket.emit('Test41', { 'type' : 'old-status-of-page', 'page' : page });
                        }
                    });  
                    break;
                
                case 4:
                    $('#MainScreenGame').load('/tests/trial_making_test?page=' + page + 
                        '&a_time=' + data['a_time'] + '&b_time=' + data['b_time'], 
                        function(strResponse, strStatus, xhr) {
                            if (strStatus == "success") {                         
                                test41_OnDocumentEventsOnPage(socket, page);
                            }
                        }
                    );
                    break;
            }            
            break;
        }

        case "show-time":
            test41_countSecond = data['time'];     
            $('#txt-test41-page' + data['page']).val(data['time']);
            break;

        case "start":
            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();                     
            playStream('SmallStream', patientStream_temp);

            test41_record_video = data['record_video'];
            if (test41_record_video == true) {
                test41_startRecording();
            }

            test41_DocumentEvents = [];

            $('#MainScreenGame').load('/tests/trial_making_test?page=1', function(strResponse, strStatus, xhr) {
                if (strStatus == "success") {     
                    test41_OnDocumentEventsOnPage(socket, 1);
                    if (test41_record_video == true) {
                        setPatientStatus(1, 0, 0, 1);
                    } else {
                        setPatientStatus(1, 0, 0, 0);
                    }
                }
            });
            break; 

        case "stop": 
            offDocumentEvents(test41_DocumentEvents);
            test41_close();
            setPatientStatusDefault();
            break;

        case "store-files":
            if (test41_record_video == true) {
                test41_close();
                returnListOfTests();
                offDocumentEvents(test41_DocumentEvents);
                setPatientStatusDefault();      
            }      
            break;

        case "store-files-in-clinician":
            if (test41_record_video == true) {
                test41_storeMedia = "store_local";
                test41_idPathFolder = data["id_path_folder"];
                test41_pathSession = data["path_session"];

                test41_stopRecording();

                test41_close();
                returnListOfTests();
                offDocumentEvents(test41_DocumentEvents);
                setPatientStatusDefault();      
            }      
            break;

        case 'upload-files':            
            $('#Wait_Upload_Tests').css("display", "block"); 
            $('#Wait_Upload_Tests').load('/wait/uploadingfiles');            

            test41_close();
            returnListOfTests();
            offDocumentEvents(test41_DocumentEvents);
            setPatientStatusDefault();
            break;
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test41_OnDocumentEventsOnPage(socket, page) {
    offDocumentEvents(test41_DocumentEvents);
    switch (page) {
        case 1:
            test41_DocumentEvents.push("#bt-test41-page1-continuer");            

            $(document).on("click", "#bt-test41-page1-continuer", function(e) {
                socket.emit('Test41', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 2: case 3:
            test41_DocumentEvents.push('#bt-test41-page' + page + '-' + 1);
            test41_DocumentEvents.push('#bt-test41-page' + page + '-' + 2);
            test41_DocumentEvents.push('#bt-test41-page' + page + '-retour');
            test41_DocumentEvents.push('#bt-test41-page' + page + '-continuer');

            $(document).on("click", '#bt-test41-page' + page + '-1', function(e) { 
                if (page == 2)
                    test41_timerControl1(100, '#txt-test41-page' + page, '#bt-test41-page' + page + '-1', '#bt-test41-' + page + '-2', '#bt-test41-page' + page + '-retour', '#bt-test41-page' + page + '-continuer');
                else if (page == 3)
                    test41_timerControl1(300, '#txt-test41-page' + page, '#bt-test41-page' + page + '-1', '#bt-test41-' + page + '-2', '#bt-test41-page' + page + '-retour', '#bt-test41-page' + page + '-continuer');
            });

            $(document).on("click", '#bt-test41-page' + page + '-2', function(e) { 
                test41_timerControl2("#txt-test41-page" + page, "#bt-test41-page" + page + "-1");
            });

            $(document).on("click", '#bt-test41-page' + page +'-retour', function(e) {
                test41_countSecond = 0;
                clearInterval(test41_idInterval);
                socket.emit('Test41', { 'type' : 'show-page-and-store', 'page-show' : (page - 1), 
                                        'page-store' : page, 'time' : $('#txt-test41-page' + page).val() });
            });

            $(document).on("click", '#bt-test41-page' + page + '-continuer', function(e) {                
                test41_countSecond = 0;
                clearInterval(test41_idInterval);
                socket.emit('Test41', { 'type' : 'show-page-and-store', 'page-show' : (page + 1), 
                                        'page-store' : page, 'time' : $('#txt-test41-page' + page).val() });
            });
            break;

        case 4:
            test41_DocumentEvents.push('#bt-test41-page' + page + '-retour');
            test41_DocumentEvents.push('#bt-test41-page' + page + '-terminer');

            $(document).on("click", '#bt-test41-page' + page +'-retour', function(e) { 
                socket.emit('Test41', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", '#bt-test41-page' + page + '-terminer', function(e) {                
                socket.emit('Test41', { 'type' : 'store-values' });
            });
            break;
    }    
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test41_countTimer(countSecond, txtCount, control2, retour, continuer) {    
    test41_idInterval = setInterval(frame, 1000);    
    function frame() {
        if (test41_countSecond == countSecond) {
            clearInterval(test41_idInterval);    
            $(control2).css("display", "inline");
            $(retour).css("display", "inline");
            $(continuer).css("display", "inline");
        } else {
            test41_countSecond++;             
            $(txtCount).val(test41_countSecond);
        }
    }
}

function test41_timerControl1(countSecond, txtCount, control1, control2, retour, continuer) {
    if ($(control1).text() === "Start") { 
        test41_countTimer(countSecond, txtCount, control2, retour, continuer);
        $(control1).text("Stop");
        $(control2).css("display", "none");
        $(retour).css("display", "none");
        $(continuer).css("display", "none");
    } else if ($(control1).text() === "Stop") {        
        clearInterval(test41_idInterval);
        $(control1).text("Start");
        $(control2).css("display", "inline");
        $(retour).css("display", "inline");
        $(continuer).css("display", "inline");
    }
}

function test41_timerControl2(txtCount, control1) {
    clearInterval(test41_idInterval);     
    test41_countSecond = 0;            
    $(control1).text("Start");  
    $(txtCount).val(0);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test41_close() {    
    closeTest("#Run_Test41_Trial_Making_Test", "#BackListTests_Trial_Making_Test", "#Test41_Trial_Making_Test_Checkbox_Record_Video");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test41_resetParameters() {    
    test41_mediaRecorder_patient = null;
    test41_recordedBlob_patient = [];
    
    test41_storeMedia = ""; 
}

function test41_startRecording() { 
    test41_resetParameters();   
    selectTypeSupportedMediaRecorder();
    
    try { 
        test41_mediaRecorder_patient = new MediaRecorder(patientStream_temp, typeSupportedMediaRecorder);
    } catch (e) {
        return;
    }

    test41_mediaRecorder_patient.onstop = (event) => {
        if (test41_storeMedia == "store_local") {
            test41_storeFiles_patient('patient_video.webm');
        }
    };

    test41_mediaRecorder_patient.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {            
            test41_recordedBlob_patient.push(event.data);
        }             
    });

    test41_mediaRecorder_patient.start(10); // collect 10ms of data
}

function test41_stopRecording() {
    test41_mediaRecorder_patient.stop();
}

function test41_storeFiles_patient(fileName) {    
    let blobMain = new Blob(test41_recordedBlob_patient, {type: 'video/webm'});
    saveAs(blobMain, test41_idPathFolder + '__' + test41_pathSession + '__Trial_Making_Test__' + fileName);

    test41_resetParameters();
    console.log("Test41 patient stored");
}