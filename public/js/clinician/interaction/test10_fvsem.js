let test10_idSelectedSession;

let test10_duration;
let test10_countSecond;
let test10_idInterval;

let test10_ID_objects_page03 = ['#txt-test10-page03-1', '#txt-test10-page03-2', '#txt-test10-page03-3', '#txt-test10-page03-4'];
let test10_ID_objects_page06 = ['#txt-test10-page06-1', '#txt-test10-page06-2', '#txt-test10-page06-3', '#txt-test10-page06-4'];

let test10_mediaRecorder_patient;
let test10_recordedBlob_patient;
let test10_record_video;

let test10_idPathFolder;
let test10_pathSession;
let test10_language;

let test10_shortcut = 0;

socket.on('Test10', function(data) {
    let type = data['type'];

    switch (type) {
        case "finish":
            test10_OffDocumentEvents(); 
            test10_duration = 0; 

            test10_close();            

            returnListOfTests();

            break;
        
        case "finish_animaux": case "finish_fruits":
            $("#Test10_FVSEM_Checkbox_Record_Video").removeAttr("disabled");

            test10_duration = 0;

            $('#MainScreenGame').load('/tests/fvsem?page=1&id_session=' + test10_idSelectedSession + 
                                      '&language=' + test10_language); 
            break;

        case "show-erreurs":
            test10_showErreurs(data['page'], data['value']);            
            break;

        case "show-intrusions":
            test10_showIntrusions(data['page'], data['value']);            
            break;

        case "show-oublis-a-mesure":
            test10_showOublisAMesure(data['page'], data['value']);            
            break;

        case "show-reponses":
            test10_showReponses(data['page'], data['value']);            
            break;

        case "start-recording":                
            test10_startRecording();
            break;

        case "stop":             
            test10_duration = 0;            
            clearInterval(test10_idInterval);

            test10_close();
            $("#Test10_FVSEM_Checkbox_Record_Video").removeAttr("disabled");

            test10_OffDocumentEvents();
            setPatientStatusDefault();
            break;

        case "reset-recording":
            test10_resetParameters();
            break;

        case 'run-subtest':            
            if (data['value'] == "animaux") {
                $('#MainScreenGame').load('/tests/fvsem?page=2&language=' + test10_language);
            } else if (data['value'] == "fruits") {
                $('#MainScreenGame').load('/tests/fvsem?page=5&language=' + test10_language);
            }
            break;

        case 'select-duration':            
            test10_select_duration(data['page'], data['value']);            
            break;

        case 'select-subtest':                                                   
            test10_select_subTest(data['value']);   
            break; 

        case 'show-page':
            let page = data['page'];

            switch (page) {
                case 3: case 6:
                    $('#MainScreenGame').load('/tests/fvsem?page=' + page + 
                                              '&duration=' + test10_duration +
                                              '&language=' + test10_language);
                    break;

                case 4: case 7:                   
                    $('#MainScreenGame').load('/tests/fvsem?page=' + page + 
                                              '&reponses=' + data['reponses'] + 
                                              '&intrusions=' + data['intrusions'] + 
                                              '&oublis_a_mesure=' + data['oublis_a_mesure'] + 
                                              '&erreurs=' + data['erreurs'] +
                                              '&language=' + test10_language);
                    break;
            }
            break;

        case "start":
            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();                     
            playStream('SmallStream', patientStream_temp);                 
            
            test10_duration = 0;

            test10_idSelectedSession = data['id_session'];
            test10_language = data['language'];
            test10_shortcut = data['shortcut'];
            
            $('#MainScreenGame').load('/tests/fvsem?page=1&id_session=' + test10_idSelectedSession +
                                      '&language=' + test10_language);

            test10_OnDocumentEvents(socket);

            break;

        case "stop-recording":            
            test10_stopRecording();
            break;

        case 'store-files':            
            $("#Test10_FVSEM_Checkbox_Record_Video").removeAttr("disabled");
            
            test10_duration = 0;

            $('#MainScreenGame').load('/tests/fvsem?page=1&id_session=' + test10_idSelectedSession +
                                      '&language=' + test10_language);
            break;

        case "store-files-in-clinician":
            if (test10_record_video == true) {
                $("#Test10_FVSEM_Checkbox_Record_Video").removeAttr("disabled");

                test10_idPathFolder = data["id_path_folder"];
                test10_pathSession = data["path_session"];

                test10_duration = 0;

                let strFileName = "";

                if (data['sub-test'] == 'animaux') {
                    strFileName = "P-video_Animaux.webm";
                } else if (data['sub-test'] == 'fruits') {
                    strFileName = "P-video_Fruits.webm";
                } 
            
                test10_storeFiles_patient(strFileName);

                $('#MainScreenGame').load('/tests/fvsem?page=1&id_session=' + test10_idSelectedSession +
                                      '&language=' + test10_language);
            }      
            break;

        case 'unselect-duration':            
            test10_unselect_duration(data['page'], data['value']);            
            break;

        case 'unselect-subtest':            
            test10_unselect_subTest(data['value']);   
            break;

        case 'upload-files':            
            $('#Wait_Upload_Tests').css("display", "block"); 
            $('#Wait_Upload_Tests').load('/wait/uploadingfiles');
            
            $("#Test10_FVSEM_Checkbox_Record_Video").removeAttr("disabled");
            
            test10_duration = 0;

            $('#MainScreenGame').load('/tests/fvsem?page=1&id_session=' + test10_idSelectedSession +
                                      '&language=' + test10_language);
            break;
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test10_OnDocumentEvents(socket, subtest) {
    //Page 01 //////////////////////////////////

    $(document).on("click", "#bt-test10-page01-1", function(e) {            
        socket.emit('Test10', { 'type' : 'select-subtest', 'value' : "animaux" });
    });

    $(document).on("click", "#bt-test10-page01-2", function(e) {          
        socket.emit('Test10', { 'type' : 'select-subtest', 'value' : "fruits" });
    });


    $(document).on("click", "#bt-test10-page01-continuer", function(e) {
        let continuer_button = test10_language == "de" ? "Weiter" : "Continuer";
        let terminer_button = test10_language == "de" ? "Beenden" : "Terminer";
        
        if ($("#bt-test10-page01-continuer").text() === continuer_button) {
            $("#Test10_FVSEM_Checkbox_Record_Video").attr("disabled", true);
            if ($("#Test10_FVSEM_Checkbox_Record_Video").prop("checked") == true) {                        
                test10_record_video = true;
                socket.emit('Test10', { 'type' : 'run-subtest' });                        
            } else {
                test10_record_video = false;
                socket.emit('Test10', { 'type' : 'run-subtest' });
            }
        } else if ($("#bt-test10-page01-continuer").text() === terminer_button) {
            socket.emit('Test10', { 'type' : 'finish' });
        }
    });

    //Page 02 //////////////////////////////////

    $(document).on("click", "#bt-test10-page02-1", function(e) {   
        test10_duration = 1;        
        socket.emit('Test10', { 'type' : 'select-duration', 'page' : 2, 'value' : test10_duration });
    });

    $(document).on("click", "#bt-test10-page02-2", function(e) {          
        test10_duration = 2;
        socket.emit('Test10', { 'type' : 'select-duration', 'page' : 2, 'value' : test10_duration });
    });

    $(document).on("click", "#bt-test10-page02-commencer", function(e) {          
        socket.emit('Test10', { 'type' : 'show-page', 'page' : 3 });
    });

    //Page 03 //////////////////////////////////

    $(document).on("click", "#bt-test10-page03-control1", function(e) {  
        if (test10_duration == 1) {
            test10_timerControl1(60, "#txt-test10-page03-count-timer", "#bt-test10-page03-control1", "#bt-test10-page03-control2", "#bt-test10-page03-continuer");
        } else if (test10_duration == 2) {
            test10_timerControl1(120, "#txt-test10-page03-count-timer", "#bt-test10-page03-control1", "#bt-test10-page03-control2", "#bt-test10-page03-continuer");
        }
    });

    $(document).on("click", "#bt-test10-page03-control2", function(e) {  
        if (test10_duration == 1) {
            test10_timerControl2("#txt-test10-page03-count-timer", "#bt-test10-page03-control1");
        } else if (test10_duration == 2) {
            test10_timerControl2("#txt-test10-page03-count-timer", "#bt-test10-page03-control1");
        }
    });

    $(document).on("click", "#bt-test10-page03-minus-1", function(e) {  
        socket.emit('Test10', { 'type' : 'minus-reponses', 'page' : 3 });
    });

    $(document).on("click", "#bt-test10-page03-plus-1", function(e) {  
        socket.emit('Test10', { 'type' : 'plus-reponses', 'page' : 3 });
    });

    $(document).on("click", "#bt-test10-page03-minus-2", function(e) {  
        socket.emit('Test10', { 'type' : 'minus-intrusions', 'page' : 3 });
    });

    $(document).on("click", "#bt-test10-page03-plus-2", function(e) {  
        socket.emit('Test10', { 'type' : 'plus-intrusions', 'page' : 3 });
    });

    $(document).on("click", "#bt-test10-page03-minus-3", function(e) {  
        socket.emit('Test10', { 'type' : 'minus-oublis-a-mesure', 'page' : 3 });
    });

    $(document).on("click", "#bt-test10-page03-plus-3", function(e) {  
        socket.emit('Test10', { 'type' : 'plus-oublis-a-mesure', 'page' : 3 });
    });

    $(document).on("click", "#bt-test10-page03-minus-4", function(e) {  
        socket.emit('Test10', { 'type' : 'minus-erreurs', 'page' : 3 });
    });

    $(document).on("click", "#bt-test10-page03-plus-4", function(e) {  
        socket.emit('Test10', { 'type' : 'plus-erreurs', 'page' : 3 });
    });

    $(document).on("click", "#bt-test10-page03-continuer", function(e) {                          
        socket.emit('Test10', { 'type' : 'show-page', 'page' : 4, 'text-zone' : $('#txta-test10-page03-1').val() });
    });

    //Page 04 //////////////////////////////////

    $(document).on("click", "#bt-test10-page04-terminer", function(e) {
        socket.emit('Test10', { 'type' : 'store-values' });        
    });  
    
    //Page 05 //////////////////////////////////

    $(document).on("click", "#bt-test10-page05-1", function(e) {   
        test10_duration = 1;        
        socket.emit('Test10', { 'type' : 'select-duration', 'page' : 5, 'value' : test10_duration });
    });

    $(document).on("click", "#bt-test10-page05-2", function(e) {          
        test10_duration = 2;
        socket.emit('Test10', { 'type' : 'select-duration', 'page' : 5, 'value' : test10_duration });
    });

    $(document).on("click", "#bt-test10-page05-commencer", function(e) {          
        socket.emit('Test10', { 'type' : 'show-page', 'page' : 6 });
    });

    //Page 06 //////////////////////////////////

    $(document).on("click", "#bt-test10-page06-control1", function(e) {  
        if (test10_duration == 1) {
            test10_timerControl1(60, "#txt-test10-page06-count-timer", "#bt-test10-page06-control1", "#bt-test10-page06-control2", "#bt-test10-page06-continuer");
        } else if (test10_duration == 2) {
            test10_timerControl1(120, "#txt-test10-page06-count-timer", "#bt-test10-page06-control1", "#bt-test10-page06-control2", "#bt-test10-page06-continuer");
        }
    });

    $(document).on("click", "#bt-test10-page06-control2", function(e) {  
        if (test10_duration == 1) {
            test10_timerControl2("#txt-test10-page06-count-timer", "#bt-test10-page06-control1");
        } else if (test10_duration == 2) {
            test10_timerControl2("#txt-test10-page06-count-timer", "#bt-test10-page06-control1");
        }
    });

    $(document).on("click", "#bt-test10-page06-minus-1", function(e) {  
        socket.emit('Test10', { 'type' : 'minus-reponses', 'page' : 6 });
    });

    $(document).on("click", "#bt-test10-page06-plus-1", function(e) {  
        socket.emit('Test10', { 'type' : 'plus-reponses', 'page' : 6 });
    });

    $(document).on("click", "#bt-test10-page06-minus-2", function(e) {  
        socket.emit('Test10', { 'type' : 'minus-intrusions', 'page' : 6 });
    });

    $(document).on("click", "#bt-test10-page06-plus-2", function(e) {  
        socket.emit('Test10', { 'type' : 'plus-intrusions', 'page' : 6 });
    });

    $(document).on("click", "#bt-test10-page06-minus-3", function(e) {  
        socket.emit('Test10', { 'type' : 'minus-oublis-a-mesure', 'page' : 6 });
    });

    $(document).on("click", "#bt-test10-page06-plus-3", function(e) {  
        socket.emit('Test10', { 'type' : 'plus-oublis-a-mesure', 'page' : 6 });
    });

    $(document).on("click", "#bt-test10-page06-minus-4", function(e) {  
        socket.emit('Test10', { 'type' : 'minus-erreurs', 'page' : 6 });
    });

    $(document).on("click", "#bt-test10-page06-plus-4", function(e) {  
        socket.emit('Test10', { 'type' : 'plus-erreurs', 'page' : 6 });
    });

    $(document).on("click", "#bt-test10-page06-continuer", function(e) {                          
        socket.emit('Test10', { 'type' : 'show-page', 'page' : 7, 'text-zone' : $('#txta-test10-page06-1').val() });
    });

    //Page 07 //////////////////////////////////

    $(document).on("click", "#bt-test10-page07-terminer", function(e) {
        socket.emit('Test10', { 'type' : 'store-values' });
    });
}

function test10_OffDocumentEvents(subtest) {
    $(document).off("click", "#bt-test10-page01-1");
    $(document).off("click", "#bt-test10-page01-2");
    $(document).off("click", "#bt-test10-page01-3");
    $(document).off("click", "#bt-test10-page01-4");
    $(document).off("click", "#bt-test10-page01-continuer");    
    
    $(document).off("click", "#bt-test10-page02-1");
    $(document).off("click", "#bt-test10-page02-2");            
    $(document).off("click", "#bt-test10-page02-commencer");             

    $(document).off("click", "#bt-test10-page03-control1");
    $(document).off("click", "#bt-test10-page03-control2");  
    $(document).off("click", "#bt-test10-page03-minus-1");
    $(document).off("click", "#bt-test10-page03-plus-1");  
    $(document).off("click", "#bt-test10-page03-minus-2");
    $(document).off("click", "#bt-test10-page03-plus-2");  
    $(document).off("click", "#bt-test10-page03-minus-3");
    $(document).off("click", "#bt-test10-page03-plus-3");  
    $(document).off("click", "#bt-test10-page03-minus-4");
    $(document).off("click", "#bt-test10-page03-plus-4");      
    $(document).off("click", "#bt-test10-page03-continuer");  
    
    $(document).off("click", "#bt-test10-page04-terminer");  

    $(document).off("click", "#bt-test10-page05-1");
    $(document).off("click", "#bt-test10-page05-2");            
    $(document).off("click", "#bt-test10-page05-commencer");             

    $(document).off("click", "#bt-test10-page06-control1");
    $(document).off("click", "#bt-test10-page06-control2");  
    $(document).off("click", "#bt-test10-page06-minus-1");
    $(document).off("click", "#bt-test10-page06-plus-1");  
    $(document).off("click", "#bt-test10-page06-minus-2");
    $(document).off("click", "#bt-test10-page06-plus-2");  
    $(document).off("click", "#bt-test10-page06-minus-3");
    $(document).off("click", "#bt-test10-page06-plus-3");  
    $(document).off("click", "#bt-test10-page06-minus-4");
    $(document).off("click", "#bt-test10-page06-plus-4");      
    $(document).off("click", "#bt-test10-page06-continuer");  
    
    $(document).off("click", "#bt-test10-page07-terminer");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test10_select_subTest(value) {
    switch (value) {
        case "animaux":
            $('#bt-test10-page01-1').attr("class","btn btn-warning btn-lg btn-block");
            $('#bt-test10-page01-2').attr("class","btn btn-secondary btn-lg btn-block");            
            break;

        case "fruits":
            $('#bt-test10-page01-1').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test10-page01-2').attr("class","btn btn-warning btn-lg btn-block");            
            break;
    }
    $("#bt-test10-page01-continuer").text(test10_language == "de" ? "Weiter" : "Continuer");
}

function test10_unselect_subTest(value) {
    switch (value) {
        case "animaux":
            $('#bt-test10-page01-1').attr("class","btn btn-secondary btn-lg btn-block");            

        case "fruits":
            $('#bt-test10-page01-2').attr("class","btn btn-secondary btn-lg btn-block");            
            break;
    }
    $("#bt-test10-page01-continuer").text(test10_language == "de" ? "Beende" : "Terminer");
}

function test10_select_duration(page, value) {
    switch (value) {
        case 1:
            if (page == 2) {
                $('#bt-test10-page02-1').attr("class","btn btn-warning btn-lg btn-block");
                $('#bt-test10-page02-2').attr("class","btn btn-secondary btn-lg btn-block");    
                $("#bt-test10-page02-commencer").css("display", "inline");
            } else if (page == 5) {             
                $('#bt-test10-page05-1').attr("class","btn btn-warning btn-lg btn-block");
                $('#bt-test10-page05-2').attr("class","btn btn-secondary btn-lg btn-block");    
                $("#bt-test10-page05-commencer").css("display", "inline");
            }
            break;

        case 2:
            if (page == 2) {
                $('#bt-test10-page02-1').attr("class","btn btn-secondary btn-lg btn-block");
                $('#bt-test10-page02-2').attr("class","btn btn-warning btn-lg btn-block");    
                $("#bt-test10-page02-commencer").css("display", "inline");
            } else if (page == 5) { 
                $('#bt-test10-page05-1').attr("class","btn btn-secondary btn-lg btn-block");
                $('#bt-test10-page05-2').attr("class","btn btn-warning btn-lg btn-block");    
                $("#bt-test10-page05-commencer").css("display", "inline");          
            }
            break;
    }
    
}

function test10_unselect_duration(page, value) {
    switch (value) {
        case 1:
            if (page == 2) {
                $('#bt-test10-page02-1').attr("class","btn btn-secondary btn-lg btn-block");    
                $("#bt-test10-page02-commencer").css("display", "none");
            } else if (page == 5) {
                $('#bt-test10-page05-1').attr("class","btn btn-secondary btn-lg btn-block");    
                $("#bt-test10-page05-commencer").css("display", "none");
            }
            break;

        case 2:
            if (page == 2) {                
                $('#bt-test10-page02-2').attr("class","btn btn-secondary btn-lg btn-block");    
                $("#bt-test10-page02-commencer").css("display", "none");
            } else if (page == 5) {
                $('#bt-test10-page05-2').attr("class","btn btn-secondary btn-lg btn-block");    
                $("#bt-test10-page05-commencer").css("display", "none");
            }
            break;
    }    
}

function test10_selectListObjects(page) {
    switch (page) {
        case 3:
            return test10_ID_objects_page03;        

        case 6:
            return test10_ID_objects_page06; 
    }
}

function test10_showErreurs(page, value) {    
    let listObjects = test10_selectListObjects(page);
    $(listObjects[3]).val(value);
}

function test10_showIntrusions(page, value) {    
    let listObjects = test10_selectListObjects(page);
    $(listObjects[1]).val(value);
}

function test10_showOublisAMesure(page, value) {    
    let listObjects = test10_selectListObjects(page);
    $(listObjects[2]).val(value);
}

function test10_showReponses(page, value) {    
    let listObjects = test10_selectListObjects(page);
    $(listObjects[0]).val(value);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test10_countTimer(countSecond, txtCount, control2, continuer) {    
    test10_idInterval = setInterval(frame, 1000);    
    function frame() {
        if (test10_countSecond == countSecond) {
            clearInterval(test10_idInterval);    
            $(control2).css("display", "inline");
            $(continuer).css("display", "inline");
            if (test10_record_video == true) {        
                socket.emit('Test10', { 'type' : 'stop-recording' });
                setPatientStatus(1, 0, 0, 0);
            }
        } else {
            test10_countSecond++;             
            $(txtCount).val(test10_countSecond);
        }
    }
}

function test10_timerControl1(countSecond, txtCount, control1, control2, continuer) {
    let start_button = test10_language == "de" ? "Beginnen" : "Commencer";
    let stop_button = test10_language == "de" ? "Halt" : "Arrêter";

    if ($(control1).text() === start_button) {
        test10_countSecond = 0;            
        test10_countTimer(countSecond, txtCount, control2, continuer);
        $(control1).text(test10_language == "de" ? "Halt" : "Arrêter");
        $(control2).css("display", "none");
        $(continuer).css("display", "none");

        if (test10_record_video == true) {
            socket.emit('Test10', { 'type' : 'start-recording' });
            setPatientStatus(1, 0, 0, 1);
        }
    } else if ($(control1).text() === stop_button) {        
        clearInterval(test10_idInterval);
        $(control2).css("display", "inline");
        $(continuer).css("display", "inline");

        if (test10_record_video == true) {
            socket.emit('Test10', { 'type' : 'stop-recording' });
            setPatientStatus(1, 0, 0, 0);
        }
    }
}

function test10_timerControl2(txtCount, control1) {
    clearInterval(test10_idInterval);     
    test10_countSecond = 0;            
    $(control1).text(test10_language == "de" ? "Beginnen" : "Commencer");  
    $(txtCount).val(0);  

    if (test10_record_video == true) {
        socket.emit('Test10', { 'type' : 'restart-recording' });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test10_close() {
    if (test10_shortcut == 0)            
        closeTest("#Run_Test10_FVSEM", "#BackListTests_FVSEM", "");
    else if (test10_shortcut == 1)
        closeTest("#Run_Test10_FVSEM_SC1", "#BackListTests_FVSEM_SC1", "");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test10_resetParameters() {    
    test10_mediaRecorder_patient = null;
    test10_recordedBlob_patient = [];
}

function test10_startRecording() { 
    test10_resetParameters();   
    selectTypeSupportedMediaRecorder();
    
    try { 
        test10_mediaRecorder_patient = new MediaRecorder(patientStream_temp, typeSupportedMediaRecorder);              
    } catch (e) {
        return;
    }

    test10_mediaRecorder_patient.onstop = (event) => {
    };

    test10_mediaRecorder_patient.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {            
            test10_recordedBlob_patient.push(event.data);
        }             
    });

    test10_mediaRecorder_patient.start(10); // collect 10ms of data
}

function test10_stopRecording() {
    test10_mediaRecorder_patient.stop();
}

function test10_storeFiles_patient(fileName) {    
    let blobMain = new Blob(test10_recordedBlob_patient, {type: 'video/webm'});
    saveAs(blobMain, test10_idPathFolder + '__' + test10_pathSession + '__FVSEM__' + fileName);

    test10_resetParameters();
    console.log("Test10 patient stored");
}