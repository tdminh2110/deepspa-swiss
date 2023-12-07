let test09_idSelectedSession;

let test09_duration;
let test09_countSecond;
let test09_idInterval;

let test09_ID_objects_page03 = ['#txt-test09-page03-1', '#txt-test09-page03-2', '#txt-test09-page03-3', '#txt-test09-page03-4'];
let test09_ID_objects_page06 = ['#txt-test09-page06-1', '#txt-test09-page06-2', '#txt-test09-page06-3', '#txt-test09-page06-4'];

let test09_mediaRecorder_patient;
let test09_recordedBlob_patient;
let test09_record_video;

let test09_idPathFolder;
let test09_pathSession;
let test09_language;

let test09_shortcut = 0;

socket.on('Test09', function(data) {
    let type = data['type'];

    switch (type) {
        case "finish":
            test09_OffDocumentEvents(); 
            test09_duration = 0; 

            test09_close();            

            returnListOfTests();

            break;

        case "finish_p": case "finish_r":
            $("#Test09_FVLEX_Checkbox_Record_Video").removeAttr("disabled");

            test09_duration = 0;            

            $('#MainScreenGame').load('/tests/fvlex?page=1&id_session=' + test09_idSelectedSession + 
                                      '&language=' + test09_language); 
            break;

        case "show-erreurs":
            test09_showErreurs(data['page'], data['value']);            
            break;

        case "show-intrusions":
            test09_showIntrusions(data['page'], data['value']);            
            break;

        case "show-oublis-a-mesure":
            test09_showOublisAMesure(data['page'], data['value']);            
            break;

        case "show-reponses":
            test09_showReponses(data['page'], data['value']);            
            break;

        case "start-recording":                
            test09_startRecording();
            break;

        case "stop": 
            test09_duration = 0;
            clearInterval(test09_idInterval);

            test09_close();
            $("#Test09_FVLEX_Checkbox_Record_Video").removeAttr("disabled");

            test09_OffDocumentEvents();
            setPatientStatusDefault();
            break;

        case "reset-recording":
            test09_resetParameters();
            break;

        case 'run-subtest':            
            if (data['value'] == "p") {
                $('#MainScreenGame').load('/tests/fvlex?page=2&language=' + test09_language);
            } else if (data['value'] == "r") {
                $('#MainScreenGame').load('/tests/fvlex?page=5&language=' + test09_language);
            }
            break;

        case 'select-duration':            
            test09_select_duration(data['page'], data['value']);            
            break;

        case 'select-subtest':
            test09_select_subTest(data['value']);   
            break; 

        case 'show-page':
            let page = data['page'];

            switch (page) {
                case 3: case 6:
                    $('#MainScreenGame').load('/tests/fvlex?page=' + page + 
                                              '&duration=' + test09_duration +
                                              '&language=' + test09_language);
                    break;

                case 4: case 7:                                 
                    $('#MainScreenGame').load('/tests/fvlex?page=' + page + 
                                              '&reponses=' + data['reponses'] + 
                                              '&intrusions=' + data['intrusions'] + 
                                              '&oublis_a_mesure=' + data['oublis_a_mesure'] + 
                                              '&erreurs=' + data['erreurs'] +
                                              '&language=' + test09_language);
                    break;
            }
            break;

        case "start":
            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();                     
            playStream('SmallStream', patientStream_temp);                 
            
            test09_duration = 0;

            test09_idSelectedSession = data['id_session'];
            test09_language = data['language'];
            test09_shortcut = data['shortcut'];
            
            $('#MainScreenGame').load('/tests/fvlex?page=1&id_session=' + test09_idSelectedSession +
                                      '&language=' + test09_language);

            test09_OnDocumentEvents(socket);

            break;

        case "stop-recording":            
            test09_stopRecording();
            break;

        case 'store-files':
            $("#Test09_FVLEX_Checkbox_Record_Video").removeAttr("disabled");
            
            test09_duration = 0;

            $('#MainScreenGame').load('/tests/fvlex?page=1&id_session=' + test09_idSelectedSession +
                                      '&language=' + test09_language);
            break;

        case "store-files-in-clinician":
            if (test09_record_video == true) {
                $("#Test09_FVLEX_Checkbox_Record_Video").removeAttr("disabled");

                test09_idPathFolder = data["id_path_folder"];
                test09_pathSession = data["path_session"];

                test09_duration = 0;

                let strFileName = "";

                if (data['sub-test'] == 'p') {
                    strFileName = "P-video_P.webm";
                } else if (data['sub-test'] == 'r') {
                    strFileName = "P-video_R.webm";
                } 
            
                test09_storeFiles_patient(strFileName);

                $('#MainScreenGame').load('/tests/fvlex?page=1&id_session=' + test09_idSelectedSession +
                    '&language=' + test09_language);
            }      
            break;

        case 'unselect-duration':            
            test09_unselect_duration(data['page'], data['value']);            
            break;

        case 'unselect-subtest':
            test09_unselect_subTest(data['value']);   
            break;

        case 'upload-files':            
            $('#Wait_Upload_Tests').css("display", "block"); 
            $('#Wait_Upload_Tests').load('/wait/uploadingfiles');

            $("#Test09_FVLEX_Checkbox_Record_Video").removeAttr("disabled");
            
            test09_duration = 0;

            $('#MainScreenGame').load('/tests/fvlex?page=1&id_session=' + test09_idSelectedSession +
                                      '&language=' + test09_language);
            break;
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test09_OnDocumentEvents(socket, subtest) {
    //Page 01 //////////////////////////////////

    $(document).on("click", "#bt-test09-page01-1", function(e) {            
        socket.emit('Test09', { 'type' : 'select-subtest', 'value' : "p" });
    });

    $(document).on("click", "#bt-test09-page01-2", function(e) {          
        socket.emit('Test09', { 'type' : 'select-subtest', 'value' : "r" });
    });

    $(document).on("click", "#bt-test09-page01-continuer", function(e) {    
        let continuer_button = test09_language == "de" ? "Weiter" : "Continuer";
        let terminer_button = test09_language == "de" ? "Beenden" : "Terminer";
        
        if ($("#bt-test09-page01-continuer").text() === continuer_button) {
            $("#Test09_FVLEX_Checkbox_Record_Video").attr("disabled", true);
            if ($("#Test09_FVLEX_Checkbox_Record_Video").prop("checked") == true) {                        
                test09_record_video = true;
                socket.emit('Test09', { 'type' : 'run-subtest' });                        
            } else {
                test09_record_video = false;
                socket.emit('Test09', { 'type' : 'run-subtest' });
            }
        } else if ($("#bt-test09-page01-continuer").text() === terminer_button) {
            socket.emit('Test09', { 'type' : 'finish' });
        }
    });

    //Page 02 //////////////////////////////////

    $(document).on("click", "#bt-test09-page02-1", function(e) {   
        test09_duration = 1;        
        socket.emit('Test09', { 'type' : 'select-duration', 'page' : 2, 'value' : test09_duration });
    });

    $(document).on("click", "#bt-test09-page02-2", function(e) {          
        test09_duration = 2;
        socket.emit('Test09', { 'type' : 'select-duration', 'page' : 2, 'value' : test09_duration });
    });

    $(document).on("click", "#bt-test09-page02-commencer", function(e) {          
        socket.emit('Test09', { 'type' : 'show-page', 'page' : 3 });
    });

    //Page 03 //////////////////////////////////

    $(document).on("click", "#bt-test09-page03-control1", function(e) {  
        if (test09_duration == 1) {
            test09_timerControl1(60, "#txt-test09-page03-count-timer", "#bt-test09-page03-control1", "#bt-test09-page03-control2", "#bt-test09-page03-continuer");
        } else if (test09_duration == 2) {
            test09_timerControl1(120, "#txt-test09-page03-count-timer", "#bt-test09-page03-control1", "#bt-test09-page03-control2", "#bt-test09-page03-continuer");
        }
    });

    $(document).on("click", "#bt-test09-page03-control2", function(e) {  
        if (test09_duration == 1) {
            test09_timerControl2("#txt-test09-page03-count-timer", "#bt-test09-page03-control1");
        } else if (test09_duration == 2) {
            test09_timerControl2("#txt-test09-page03-count-timer", "#bt-test09-page03-control1");
        }
    });

    $(document).on("click", "#bt-test09-page03-minus-1", function(e) {
        socket.emit('Test09', { 'type' : 'minus-reponses', 'page' : 3 });
    });

    $(document).on("click", "#bt-test09-page03-plus-1", function(e) {
        socket.emit('Test09', { 'type' : 'plus-reponses', 'page' : 3 });
    });

    $(document).on("click", "#bt-test09-page03-minus-2", function(e) {
        socket.emit('Test09', { 'type' : 'minus-intrusions', 'page' : 3 });
    });

    $(document).on("click", "#bt-test09-page03-plus-2", function(e) {
        socket.emit('Test09', { 'type' : 'plus-intrusions', 'page' : 3 });
    });

    $(document).on("click", "#bt-test09-page03-minus-3", function(e) {
        socket.emit('Test09', { 'type' : 'minus-oublis-a-mesure', 'page' : 3 });
    });

    $(document).on("click", "#bt-test09-page03-plus-3", function(e) {
        socket.emit('Test09', { 'type' : 'plus-oublis-a-mesure', 'page' : 3 });
    });

    $(document).on("click", "#bt-test09-page03-minus-4", function(e) {
        socket.emit('Test09', { 'type' : 'minus-erreurs', 'page' : 3 });
    });

    $(document).on("click", "#bt-test09-page03-plus-4", function(e) {
        socket.emit('Test09', { 'type' : 'plus-erreurs', 'page' : 3 });
    });

    $(document).on("click", "#bt-test09-page03-continuer", function(e) {
        socket.emit('Test09', { 'type' : 'show-page', 'page' : 4, 'text-zone' : $('#txta-test09-page03-1').val() });
    });

    //Page 04 //////////////////////////////////

    $(document).on("click", "#bt-test09-page04-terminer", function(e) {
        socket.emit('Test09', { 'type' : 'store-values' });        
    });  
    
    //Page 05 //////////////////////////////////

    $(document).on("click", "#bt-test09-page05-1", function(e) {   
        test09_duration = 1;        
        socket.emit('Test09', { 'type' : 'select-duration', 'page' : 5, 'value' : test09_duration });
    });

    $(document).on("click", "#bt-test09-page05-2", function(e) {          
        test09_duration = 2;
        socket.emit('Test09', { 'type' : 'select-duration', 'page' : 5, 'value' : test09_duration });
    });

    $(document).on("click", "#bt-test09-page05-commencer", function(e) {          
        socket.emit('Test09', { 'type' : 'show-page', 'page' : 6 });
    });

    //Page 06 //////////////////////////////////

    $(document).on("click", "#bt-test09-page06-control1", function(e) {  
        if (test09_duration == 1) {
            test09_timerControl1(60, "#txt-test09-page06-count-timer", "#bt-test09-page06-control1", "#bt-test09-page06-control2", "#bt-test09-page06-continuer");
        } else if (test09_duration == 2) {
            test09_timerControl1(120, "#txt-test09-page06-count-timer", "#bt-test09-page06-control1", "#bt-test09-page06-control2", "#bt-test09-page06-continuer");
        }
    });

    $(document).on("click", "#bt-test09-page06-control2", function(e) {  
        if (test09_duration == 1) {
            test09_timerControl2("#txt-test09-page06-count-timer", "#bt-test09-page06-control1");
        } else if (test09_duration == 2) {
            test09_timerControl2("#txt-test09-page06-count-timer", "#bt-test09-page06-control1");
        }
    });

    $(document).on("click", "#bt-test09-page06-minus-1", function(e) {  
        socket.emit('Test09', { 'type' : 'minus-reponses', 'page' : 6 });
    });

    $(document).on("click", "#bt-test09-page06-plus-1", function(e) {  
        socket.emit('Test09', { 'type' : 'plus-reponses', 'page' : 6 });
    });

    $(document).on("click", "#bt-test09-page06-minus-2", function(e) {  
        socket.emit('Test09', { 'type' : 'minus-intrusions', 'page' : 6 });
    });

    $(document).on("click", "#bt-test09-page06-plus-2", function(e) {  
        socket.emit('Test09', { 'type' : 'plus-intrusions', 'page' : 6 });
    });

    $(document).on("click", "#bt-test09-page06-minus-3", function(e) {  
        socket.emit('Test09', { 'type' : 'minus-oublis-a-mesure', 'page' : 6 });
    });

    $(document).on("click", "#bt-test09-page06-plus-3", function(e) {  
        socket.emit('Test09', { 'type' : 'plus-oublis-a-mesure', 'page' : 6 });
    });

    $(document).on("click", "#bt-test09-page06-minus-4", function(e) {  
        socket.emit('Test09', { 'type' : 'minus-erreurs', 'page' : 6 });
    });

    $(document).on("click", "#bt-test09-page06-plus-4", function(e) {  
        socket.emit('Test09', { 'type' : 'plus-erreurs', 'page' : 6 });
    });

    $(document).on("click", "#bt-test09-page06-continuer", function(e) {
        socket.emit('Test09', { 'type' : 'show-page', 'page' : 7, 'text-zone' : $('#txta-test09-page06-1').val() });
    });

    //Page 07 //////////////////////////////////

    $(document).on("click", "#bt-test09-page07-terminer", function(e) {
        socket.emit('Test09', { 'type' : 'store-values' });        
    });
}

function test09_OffDocumentEvents(subtest) {
    $(document).off("click", "#bt-test09-page01-1");
    $(document).off("click", "#bt-test09-page01-2");    
    $(document).off("click", "#bt-test09-page01-continuer");    
    
    $(document).off("click", "#bt-test09-page02-1");
    $(document).off("click", "#bt-test09-page02-2");            
    $(document).off("click", "#bt-test09-page02-commencer");             

    $(document).off("click", "#bt-test09-page03-control1");
    $(document).off("click", "#bt-test09-page03-control2");  
    $(document).off("click", "#bt-test09-page03-minus-1");
    $(document).off("click", "#bt-test09-page03-plus-1");  
    $(document).off("click", "#bt-test09-page03-minus-2");
    $(document).off("click", "#bt-test09-page03-plus-2");  
    $(document).off("click", "#bt-test09-page03-minus-3");
    $(document).off("click", "#bt-test09-page03-plus-3");  
    $(document).off("click", "#bt-test09-page03-minus-4");
    $(document).off("click", "#bt-test09-page03-plus-4");      
    $(document).off("click", "#bt-test09-page03-continuer");  
    
    $(document).off("click", "#bt-test09-page04-terminer");  

    $(document).off("click", "#bt-test09-page05-1");
    $(document).off("click", "#bt-test09-page05-2");            
    $(document).off("click", "#bt-test09-page05-commencer");             

    $(document).off("click", "#bt-test09-page06-control1");
    $(document).off("click", "#bt-test09-page06-control2");  
    $(document).off("click", "#bt-test09-page06-minus-1");
    $(document).off("click", "#bt-test09-page06-plus-1");  
    $(document).off("click", "#bt-test09-page06-minus-2");
    $(document).off("click", "#bt-test09-page06-plus-2");  
    $(document).off("click", "#bt-test09-page06-minus-3");
    $(document).off("click", "#bt-test09-page06-plus-3");  
    $(document).off("click", "#bt-test09-page06-minus-4");
    $(document).off("click", "#bt-test09-page06-plus-4");      
    $(document).off("click", "#bt-test09-page06-continuer");  
    
    $(document).off("click", "#bt-test09-page07-terminer");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test09_select_subTest(value) {
    switch (value) {
        case "p":
            $('#bt-test09-page01-1').attr("class","btn btn-warning btn-lg btn-block");
            $('#bt-test09-page01-2').attr("class","btn btn-secondary btn-lg btn-block");            
            break;

        case "r":
            $('#bt-test09-page01-1').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test09-page01-2').attr("class","btn btn-warning btn-lg btn-block");            
            break;
    }
    $("#bt-test09-page01-continuer").text(test09_language == "de" ? "Weiter" : "Continuer");
}

function test09_unselect_subTest(value) {
    switch (value) {
        case "p":
            $('#bt-test09-page01-1').attr("class","btn btn-secondary btn-lg btn-block");            

        case "r":
            $('#bt-test09-page01-2').attr("class","btn btn-secondary btn-lg btn-block");            
            break;
    }
    $("#bt-test09-page01-continuer").text(test09_language == "de" ? "Beende" : "Terminer");
}

function test09_select_duration(page, value) {
    switch (value) {
        case 1:
            if (page == 2) {
                $('#bt-test09-page02-1').attr("class","btn btn-warning btn-lg btn-block");
                $('#bt-test09-page02-2').attr("class","btn btn-secondary btn-lg btn-block");    
                $("#bt-test09-page02-commencer").css("display", "inline");
            } else if (page == 5) {             
                $('#bt-test09-page05-1').attr("class","btn btn-warning btn-lg btn-block");
                $('#bt-test09-page05-2').attr("class","btn btn-secondary btn-lg btn-block");    
                $("#bt-test09-page05-commencer").css("display", "inline");
            }
            break;

        case 2:
            if (page == 2) {
                $('#bt-test09-page02-1').attr("class","btn btn-secondary btn-lg btn-block");
                $('#bt-test09-page02-2').attr("class","btn btn-warning btn-lg btn-block");    
                $("#bt-test09-page02-commencer").css("display", "inline");
            } else if (page == 5) { 
                $('#bt-test09-page05-1').attr("class","btn btn-secondary btn-lg btn-block");
                $('#bt-test09-page05-2').attr("class","btn btn-warning btn-lg btn-block");    
                $("#bt-test09-page05-commencer").css("display", "inline");          
            }
            break;
    }
    
}

function test09_unselect_duration(page, value) {
    switch (value) {
        case 1:
            if (page == 2) {
                $('#bt-test09-page02-1').attr("class","btn btn-secondary btn-lg btn-block");    
                $("#bt-test09-page02-commencer").css("display", "none");
            } else if (page == 5) {
                $('#bt-test09-page05-1').attr("class","btn btn-secondary btn-lg btn-block");    
                $("#bt-test09-page05-commencer").css("display", "none");
            }
            break;

        case 2:
            if (page == 2) {                
                $('#bt-test09-page02-2').attr("class","btn btn-secondary btn-lg btn-block");    
                $("#bt-test09-page02-commencer").css("display", "none");
            } else if (page == 5) {
                $('#bt-test09-page05-2').attr("class","btn btn-secondary btn-lg btn-block");    
                $("#bt-test09-page05-commencer").css("display", "none");
            }
            break;
    }    
}

function test09_selectListObjects(page) {
    switch (page) {
        case 3:
            return test09_ID_objects_page03;        

        case 6:
            return test09_ID_objects_page06; 
    }
}

function test09_showErreurs(page, value) {    
    let listObjects = test09_selectListObjects(page);
    $(listObjects[3]).val(value);
}

function test09_showIntrusions(page, value) {    
    let listObjects = test09_selectListObjects(page);
    $(listObjects[1]).val(value);
}

function test09_showOublisAMesure(page, value) {    
    let listObjects = test09_selectListObjects(page);
    $(listObjects[2]).val(value);
}

function test09_showReponses(page, value) {    
    let listObjects = test09_selectListObjects(page);
    $(listObjects[0]).val(value);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test09_countTimer(countSecond, txtCount, control2, continuer) {    
    test09_idInterval = setInterval(frame, 1000);    
    function frame() {
        if (test09_countSecond == countSecond) {
            clearInterval(test09_idInterval);    
            $(control2).css("display", "inline");
            $(continuer).css("display", "inline");

            if (test09_record_video == true) {        
                socket.emit('Test09', { 'type' : 'stop-recording' });  
                setPatientStatus(1, 0, 0, 0);
            }
        } else {
            test09_countSecond++;             
            $(txtCount).val(test09_countSecond);
        }
    }
}

function test09_timerControl1(countSecond, txtCount, control1, control2, continuer) {
    let start_button = test09_language == "de" ? "Beginnen" : "Commencer";
    let stop_button = test09_language == "de" ? "Halt" : "Arrêter";

    if ($(control1).text() === start_button) {
        test09_countSecond = 0;            
        test09_countTimer(countSecond, txtCount, control2, continuer);
        $(control1).text(test09_language == "de" ? "Halt" : "Arrêter");
        $(control2).css("display", "none");
        $(continuer).css("display", "none");

        if (test09_record_video == true) {
            socket.emit('Test09', { 'type' : 'start-recording' });
            setPatientStatus(1, 0, 0, 1);
        }
    } else if ($(control1).text() === stop_button) {        
        clearInterval(test09_idInterval);
        $(control2).css("display", "inline");
        $(continuer).css("display", "inline");

        if (test09_record_video == true) {
            socket.emit('Test09', { 'type' : 'stop-recording' });
            setPatientStatus(1, 0, 0, 0);
        }
    }
}

function test09_timerControl2(txtCount, control1) {
    clearInterval(test09_idInterval);     
    test09_countSecond = 0;            
    $(control1).text(test09_language == "de" ? "Beginnen" : "Commencer");  
    $(txtCount).val(0);  

    if (test09_record_video == true) {
        socket.emit('Test09', { 'type' : 'reset-recording' });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test09_close() {
    if (test09_shortcut == 0)            
        closeTest("#Run_Test09_FVLEX", "#BackListTests_FVLEX", "");
    else if (test09_shortcut == 1)
        closeTest("#Run_Test09_FVLEX_SC1", "#BackListTests_FVLEX_SC1", "");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test09_resetParameters() {    
    test09_mediaRecorder_patient = null;
    test09_recordedBlob_patient = [];
}

function test09_startRecording() { 
    test09_resetParameters();   
    selectTypeSupportedMediaRecorder();
    
    try { 
        test09_mediaRecorder_patient = new MediaRecorder(patientStream_temp, typeSupportedMediaRecorder);              
    } catch (e) {
        return;
    }

    test09_mediaRecorder_patient.onstop = (event) => {
    };

    test09_mediaRecorder_patient.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {            
            test09_recordedBlob_patient.push(event.data);
        }             
    });

    test09_mediaRecorder_patient.start(10); // collect 10ms of data
}

function test09_stopRecording() {
    test09_mediaRecorder_patient.stop();
}

function test09_storeFiles_patient(fileName) {    
    let blobMain = new Blob(test09_recordedBlob_patient, {type: 'video/webm'});
    saveAs(blobMain, test09_idPathFolder + '__' + test09_pathSession + '__FVLEX__' + fileName);

    test09_resetParameters();
    console.log("Test09 patient stored");
}