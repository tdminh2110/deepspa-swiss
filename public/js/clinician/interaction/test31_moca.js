let test31_DocumentEvents;

let test31_mediaRecorder_patient;
let test31_recordedBlob_patient;
let test31_record_video;

let test31_storeMedia;
let test31_idPathFolder;
let test31_pathSession;

let test31_language;

let test31_countSecond = 0;
let test31_idInterval;

let test31_shortcut = 0;

socket.on('Test31', function(data) {
    let type = data['type'];

    switch (type) {
        case "finish":
            offDocumentEvents(test31_DocumentEvents);   
            test31_close();         
            returnListOfTests();

            break;

        case "hide-image": {
            let page = data['page'];

            switch (page) {
                case 3:
                    if (test31_language == 'de') 
                        $("#bt-test31-page3-1").text("ANZEIGEN");
                    else
                        $("#bt-test31-page3-1").text("Afficher l'image");
                    $('#img-test31-page3').css('display','none');
                    break;

                case 5:
                    if (test31_language == 'de') 
                        $("#bt-test31-page5-1").text("ANZEIGEN");
                    else
                        $("#bt-test31-page5-1").text("Afficher les images");
                    $('#img-test31-page5').css('display','none');
                    break;
            }

            if (test31_record_video == true) {
                setPatientStatus(1, 0, 0, 1);
            } else {
                setPatientStatus(1, 0, 0, 0);
            }

            break;
        }

        case "hide-selected-item": {
            let page = data['page'];

            $('#lbl-test31-page' + page + '-' + (data['index'] + 1)).css('display','none');
            $('#bt-test31-page' + page + '-' + (data['index'] + 1)).css('display','none');
            break;
        }

        case "select-score": {
            let page = data['page'];

            switch (page) {
                case 2: case 7: case 8: case 9:
                    if (data['score'] == 0) 
                        $('#bt-test31-page' + page).attr("class", "btn btn-secondary btn-lg");
                    else
                        $('#bt-test31-page' + page).attr("class", "btn btn-warning btn-lg");

                    break;

                case 3:
                    if (data['score'] == 0) 
                        $('#bt-test31-page' + page + '-2').attr("class", "btn btn-secondary btn-lg");
                    else
                        $('#bt-test31-page' + page + '-2').attr("class", "btn btn-warning btn-lg");

                    break;

                case 4: case 6: case 10: case 11: case 13: case 14: case 15: case 16: case 17:
                    if (data['score'] == 0) 
                        $('#bt-test31-page' + page + '-' + (data['index'] + 1)).attr("class", "btn btn-secondary btn-lg");
                    else
                        $('#bt-test31-page' + page + '-' + (data['index'] + 1)).attr("class", "btn btn-warning btn-lg");

                    break;

                case 5: 
                    if (data['score'] == 0) 
                        $('#bt-test31-page' + page + '-' + (data['index'] + 2)).attr("class", "btn btn-secondary btn-lg");
                    else
                        $('#bt-test31-page' + page + '-' + (data['index'] + 2)).attr("class", "btn btn-warning btn-lg");

                    break;
            }
            break;
        }

        case "set-text":
            if (data['page'] == 18) {
                $('#txt-test31-page18').val(data['text']);
            }
            break;

        case "show-image": {
            let page = data['page'];

            switch (page) {
                case 3:
                    if (test31_language == 'de')
                        $("#bt-test31-page3-1").text("VERSTECKEN"); 
                    else                             
                        $("#bt-test31-page3-1").text("Cacher l'image");
                    $('#img-test31-page3').css('display','inline');
                    $('#bt-test31-page3-2').css('display','inline');                                        
                    break;

                case 5:
                    if (test31_language == 'de')        
                        $("#bt-test31-page5-1").text("VERSTECKEN");
                    else
                        $("#bt-test31-page5-1").text("Cacher les images");
                    $('#img-test31-page5').css('display','inline');
                    $('#lbl-test31-page5').css('display','inline');
                    $('#bt-test31-page5-2').css('display','inline');
                    $('#bt-test31-page5-3').css('display','inline');
                    $('#bt-test31-page5-4').css('display','inline');
                    break;
            }

            if (test31_record_video == true) {
                setPatientStatus(0, 1, 0, 1);
            } else {
                setPatientStatus(0, 1, 0, 0);
            }

            break;
        }

        case "show-page": {      
            let page = data['page'];

            switch(page) {
                case 1: 
                    $('#MainScreenGame').load('/tests/moca?page=' + page + '&language=' + test31_language, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test31_OnDocumentEventsOnPage(socket, page);
                        }
                    });  
                    break;
                
                case 2: case 4: case 6:
                    $('#MainScreenGame').load('/tests/moca?page=' + page + '&language=' + test31_language, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {       
                            test31_OnDocumentEventsOnPage(socket, page);

                            if (test31_record_video == true) {
                                setPatientStatus(1, 0, 0, 1);
                            } else {
                                setPatientStatus(1, 0, 0, 0);
                            }

                            socket.emit('Test31', { 'type' : 'old-status-of-page', 'page' : page });
                        }
                    });  
                    break;

                case 3:
                    $('#MainScreenGame').load('/tests/moca?page=' + page + '&language=' + test31_language, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            if (data['show_button_2'] == 1)
                                $('#bt-test31-page3-2').css('display','inline');
                            
                            test31_OnDocumentEventsOnPage(socket, page);                            
                            socket.emit('Test31', { 'type' : 'old-status-of-page', 'page' : page });
                        }
                    });
                    break;

                case 5:
                    $('#MainScreenGame').load('/tests/moca?page=' + page + '&language=' + test31_language, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            if (data['show_button_2'] == 1) {
                                $('#lbl-test31-page5').css('display','inline');
                                $('#bt-test31-page5-2').css('display','inline');
                                $('#bt-test31-page5-3').css('display','inline');
                                $('#bt-test31-page5-4').css('display','inline');
                            }
                            
                            test31_OnDocumentEventsOnPage(socket, page);                            
                            socket.emit('Test31', { 'type' : 'old-status-of-page', 'page' : page });
                        }
                    });
                    break;

                case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17:
                    $('#MainScreenGame').load('/tests/moca?page=' + page + '&language=' + test31_language, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {       
                            test31_OnDocumentEventsOnPage(socket, page);
                            socket.emit('Test31', { 'type' : 'old-status-of-page', 'page' : page });
                        }
                    });  
                    break;
                
                case 18:
                    $('#MainScreenGame').load('/tests/moca?page=' + page + '&language=' + test31_language + 
                        '&a=' + data['a'] + '&b=' + data['b'] +
                        '&c=' + data['c'] + '&d=' + data['d'] + '&e=' + data['e'] + '&f=' + data['f'] +
                        '&g=' + data['g'] + '&h=' + data['h'] + '&i=' + data['i'] + '&j=' + data['j'] +
                        '&k=' + data['k'] + '&l=' + data['l'] + '&m=' + data['m'] + '&n=' + data['n'] +
                        '&o=' + data['o'] + '&p=' + data['p'] + '&q=' + data['q'] + 
                        '&F1=' + data['F1'] + '&F2=' + data['F2'] + '&F3=' + data['F3'] + 
                        '&date=' + data['date'] + '&mois=' + data['mois'] + '&annee=' + data['annee'] + 
                        '&jour=' + data['jour'] + '&endroit=' + data['endroit'] + '&ville=' + data['ville'], 
                        function(strResponse, strStatus, xhr) {
                            if (strStatus == "success") {                         
                                test31_OnDocumentEventsOnPage(socket, page);
                                socket.emit('Test31', { 'type' : 'old-status-of-page', 'page' : page });
                            }
                        }
                    );
                    break;
            }            
            break;
        }

        case "show-words":
            if (data['page'] == 12)
                $('#txt-test31-page12-2').val(data['value']);
            break;

        case "start":
            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();                     
            playStream('SmallStream', patientStream_temp);

            test31_record_video = data['record_video'];
            if (test31_record_video == true) {
                test31_startRecording();
            }

            test31_DocumentEvents = [];

            test31_language = data['language'];
            test31_shortcut = data['shortcut'];

            $('#MainScreenGame').load('/tests/moca?page=1&language=' + test31_language, function(strResponse, strStatus, xhr) {
                if (strStatus == "success") {     
                    test31_OnDocumentEventsOnPage(socket, 1);
                    if (test31_record_video == true) {
                        setPatientStatus(1, 0, 0, 1);
                    } else {
                        setPatientStatus(1, 0, 0, 0);
                    }
                }
            });
            break; 

        case "stop": 
            offDocumentEvents(test31_DocumentEvents);
            test31_close();
            setPatientStatusDefault();
            break;

        case "store-files":
            if (test31_record_video == true) {
                test31_close();
                returnListOfTests();
                offDocumentEvents(test31_DocumentEvents);
                setPatientStatusDefault();      
            }      
            break;

        case "store-files-in-clinician":
            if (test31_record_video == true) {
                test31_storeMedia = "store_local";
                test31_idPathFolder = data["id_path_folder"];
                test31_pathSession = data["path_session"];

                test31_stopRecording();

                test31_close();
                returnListOfTests();
                offDocumentEvents(test31_DocumentEvents);
                setPatientStatusDefault();      
            }      
            break;

        case 'upload-files':            
            $('#Wait_Upload_Tests').css("display", "block"); 
            $('#Wait_Upload_Tests').load('/wait/uploadingfiles');            

            test31_close();
            returnListOfTests();
            offDocumentEvents(test31_DocumentEvents);
            setPatientStatusDefault();
            break;
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test31_OnDocumentEventsOnPage(socket, page) {
    offDocumentEvents(test31_DocumentEvents);
    switch (page) {
        case 1:
            test31_DocumentEvents.push("#bt-test31-page1-continuer");            

            $(document).on("click", "#bt-test31-page1-continuer", function(e) {
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 2: case 7: case 8: case 9:
            test31_DocumentEvents.push('#bt-test31-page' + page);
            test31_DocumentEvents.push('#bt-test31-page' + page + '-retour');
            test31_DocumentEvents.push('#bt-test31-page' + page + '-continuer');

            $(document).on("click", '#bt-test31-page' + page, function(e) { 
                socket.emit('Test31', { 'type' : 'select-score', 'page' : page });
            });

            $(document).on("click", '#bt-test31-page' + page +'-retour', function(e) { 
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", '#bt-test31-page' + page + '-continuer', function(e) {                
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 3: 
            test31_DocumentEvents.push('#bt-test31-page' + page + "-1");
            test31_DocumentEvents.push('#bt-test31-page' + page + "-2");
            test31_DocumentEvents.push('#bt-test31-page' + page + '-retour');
            test31_DocumentEvents.push('#bt-test31-page' + page + '-continuer');

            $(document).on("click", '#bt-test31-page' + page + "-1", function(e) { 
                socket.emit('Test31', { 'type' : 'show-image', 'page' : page });
            });

            $(document).on("click", '#bt-test31-page' + page + "-2", function(e) { 
                socket.emit('Test31', { 'type' : 'select-score', 'page' : page });
            });

            $(document).on("click", '#bt-test31-page' + page +'-retour', function(e) {
                socket.emit('Test31', { 'type' : 'hide-image', 'page' : page });
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", '#bt-test31-page' + page + '-continuer', function(e) {
                socket.emit('Test31', { 'type' : 'hide-image', 'page' : page });              
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 4: 
            for(let i = 1; i <= 3; i++) {
                test31_DocumentEvents.push('#bt-test31-page' + page + '-' + i);
            }

            test31_DocumentEvents.push('#bt-test31-page' + page + '-retour');
            test31_DocumentEvents.push('#bt-test31-page' + page + '-continuer');

            for(let i = 1; i <= 3; i++) {
                $(document).on("click", '#bt-test31-page' + page + '-' + i, function(e) { 
                    socket.emit('Test31', { 'type' : 'select-score', 'page' : page, 'index' : (i - 1) });
                });
            }

            $(document).on("click", '#bt-test31-page' + page +'-retour', function(e) {
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", '#bt-test31-page' + page + '-continuer', function(e) { 
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 5: 
            for(let i = 1; i <= 4; i++) {
                test31_DocumentEvents.push('#bt-test31-page' + page + '-' + i);
            }

            test31_DocumentEvents.push('#bt-test31-page' + page + '-retour');
            test31_DocumentEvents.push('#bt-test31-page' + page + '-continuer');

            $(document).on("click", '#bt-test31-page' + page + "-1", function(e) { 
                socket.emit('Test31', { 'type' : 'show-image', 'page' : page });
            });

            for(let i = 2; i <= 4; i++) {
                $(document).on("click", '#bt-test31-page' + page + '-' + i, function(e) { 
                    socket.emit('Test31', { 'type' : 'select-score', 'page' : page, 'index' : (i - 2) });
                });
            }

            $(document).on("click", '#bt-test31-page' + page +'-retour', function(e) {
                socket.emit('Test31', { 'type' : 'hide-image', 'page' : page });
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", '#bt-test31-page' + page + '-continuer', function(e) {
                socket.emit('Test31', { 'type' : 'hide-image', 'page' : page });
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 6: 
            for(let i = 1; i <= 10; i++) {
                test31_DocumentEvents.push('#bt-test31-page' + page + '-' + i);
            }

            test31_DocumentEvents.push('#bt-test31-page' + page + '-retour');
            test31_DocumentEvents.push('#bt-test31-page' + page + '-continuer');

            for(let i = 1; i <= 10; i++) {
                $(document).on("click", '#bt-test31-page' + page + '-' + i, function(e) { 
                    socket.emit('Test31', { 'type' : 'select-score', 'page' : page, 'index' : (i - 1) });
                });
            }

            $(document).on("click", '#bt-test31-page' + page +'-retour', function(e) {
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", '#bt-test31-page' + page + '-continuer', function(e) { 
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 10: case 14: 
            for(let i = 1; i <= 5; i++) {
                test31_DocumentEvents.push('#bt-test31-page' + page + '-' + i);
            }

            test31_DocumentEvents.push('#bt-test31-page' + page + '-retour');
            test31_DocumentEvents.push('#bt-test31-page' + page + '-continuer');

            for(let i = 1; i <= 5; i++) {
                $(document).on("click", '#bt-test31-page' + page + '-' + i, function(e) { 
                    socket.emit('Test31', { 'type' : 'select-score', 'page' : page, 'index' : (i - 1) });
                });
            }

            $(document).on("click", '#bt-test31-page' + page +'-retour', function(e) {
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", '#bt-test31-page' + page + '-continuer', function(e) { 
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 11: case 13:
            for(let i = 1; i <= 2; i++) {
                test31_DocumentEvents.push('#bt-test31-page' + page + '-' + i);
            }

            test31_DocumentEvents.push('#bt-test31-page' + page + '-retour');
            test31_DocumentEvents.push('#bt-test31-page' + page + '-continuer');

            for(let i = 1; i <= 2; i++) {
                $(document).on("click", '#bt-test31-page' + page + '-' + i, function(e) { 
                    socket.emit('Test31', { 'type' : 'select-score', 'page' : page, 'index' : (i - 1) });
                });
            }

            $(document).on("click", '#bt-test31-page' + page +'-retour', function(e) {
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", '#bt-test31-page' + page + '-continuer', function(e) { 
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 12: 
            for(let i = 1; i <= 4; i++) {
                test31_DocumentEvents.push('#bt-test31-page' + page + '-' + i);
            }

            test31_DocumentEvents.push('#bt-test31-page' + page + '-retour');
            test31_DocumentEvents.push('#bt-test31-page' + page + '-continuer');

            
            $(document).on("click", '#bt-test31-page' + page + '-1', function(e) { 
                test31_timerControl1(60, '#txt-test31-page12-1', '#bt-test31-page12-1', '#bt-test31-page12-2', '#bt-test31-page12-retour', '#bt-test31-page12-continuer');
            });

            $(document).on("click", '#bt-test31-page' + page + '-2', function(e) { 
                test31_timerControl2("#txt-test31-page12-1", "#bt-test31-page12-1");
            });

            $(document).on("click", '#bt-test31-page' + page + '-3', function(e) { 
                socket.emit('Test31', { 'type' : 'plus-words', 'page' : page });
            });

            $(document).on("click", '#bt-test31-page' + page + '-4', function(e) { 
                socket.emit('Test31', { 'type' : 'minus-words', 'page' : page });
            });
            

            $(document).on("click", '#bt-test31-page' + page +'-retour', function(e) {
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", '#bt-test31-page' + page + '-continuer', function(e) {                 
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 15: case 16:
            for(let i = 1; i <= 5; i++) {
                test31_DocumentEvents.push('#bt-test31-page' + page + '-' + i);
            }

            test31_DocumentEvents.push('#bt-test31-page' + page + '-retour');
            test31_DocumentEvents.push('#bt-test31-page' + page + '-continuer');

            for(let i = 1; i <= 5; i++) {
                $(document).on("click", '#bt-test31-page' + page + '-' + i, function(e) { 
                    socket.emit('Test31', { 'type' : 'select-score', 'page' : page, 'index' : (i - 1) });
                });
            }

            $(document).on("click", '#bt-test31-page' + page +'-retour', function(e) {
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", '#bt-test31-page' + page + '-continuer', function(e) { 
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page + 1), 'prev-page' : page });
            });
            break;

        case 17: 
            for(let i = 1; i <= 6; i++) {
                test31_DocumentEvents.push('#bt-test31-page' + page + '-' + i);
            }

            test31_DocumentEvents.push('#bt-test31-page' + page + '-retour');
            test31_DocumentEvents.push('#bt-test31-page' + page + '-continuer');

            for(let i = 1; i <= 6; i++) {
                $(document).on("click", '#bt-test31-page' + page + '-' + i, function(e) { 
                    socket.emit('Test31', { 'type' : 'select-score', 'page' : page, 'index' : (i - 1) });
                });
            }

            $(document).on("click", '#bt-test31-page' + page +'-retour', function(e) {
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page - 1), 'prev-page' : page });
            });

            $(document).on("click", '#bt-test31-page' + page + '-continuer', function(e) {
                socket.emit('Test31', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 18:
            test31_DocumentEvents.push('#bt-test31-page' + page + '-retour');
            test31_DocumentEvents.push('#bt-test31-page' + page + '-terminer');

            $(document).on("click", '#bt-test31-page' + page +'-retour', function(e) { 
                socket.emit('Test31', { 'type' : 'show-page-and-store', 'page' : (page - 1), 'remarques' : $('#txt-test31-page18').val() });
            });

            $(document).on("click", '#bt-test31-page' + page + '-terminer', function(e) {                
                socket.emit('Test31', { 'type' : 'store-values', 'remarques' : $('#txt-test31-page18').val() });
            });
            break;
    }    
    
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test31_countTimer(countSecond, txtCount, control2, retour, continuer) {    
    test31_idInterval = setInterval(frame, 1000);    
    function frame() {
        if (test31_countSecond == countSecond) {
            clearInterval(test31_idInterval);    
            $(control2).css("display", "inline");
            $(retour).css("display", "inline");
            $(continuer).css("display", "inline");
        } else {
            test31_countSecond++;             
            $(txtCount).val(test31_countSecond);
        }
    }
}

function test31_timerControl1(countSecond, txtCount, control1, control2, retour, continuer) {
    if ($(control1).text() === "Start") { 
        test31_countTimer(countSecond, txtCount, control2, retour, continuer);
        $(control1).text("Stop");
        $(control2).css("display", "none");
        $(retour).css("display", "none");
        $(continuer).css("display", "none");
    } else if ($(control1).text() === "Stop") {        
        clearInterval(test31_idInterval);
        $(control1).text("Start");
        $(control2).css("display", "inline");
        $(retour).css("display", "inline");
        $(continuer).css("display", "inline");
    }
}

function test31_timerControl2(txtCount, control1) {
    clearInterval(test31_idInterval);     
    test31_countSecond = 0;            
    $(control1).text("Start");  
    $(txtCount).val(0);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test31_close() {
    if (test31_shortcut == 0)            
        closeTest("#Run_Test31_MOCA", "#BackListTests_MOCA", "#Test31_MOCA_Checkbox_Record_Video");
    else if (test31_shortcut == 1)
        closeTest("#Run_Test31_MOCA_SC1", "#BackListTests_MOCA_SC1", "#Test31_MOCA_Checkbox_Record_Video");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test31_resetParameters() {    
    test31_mediaRecorder_patient = null;
    test31_recordedBlob_patient = [];
    
    test31_storeMedia = ""; 
}

function test31_startRecording() { 
    test31_resetParameters();   
    selectTypeSupportedMediaRecorder();
    
    try { 
        test31_mediaRecorder_patient = new MediaRecorder(patientStream_temp, typeSupportedMediaRecorder);              
    } catch (e) {
        return;
    }

    test31_mediaRecorder_patient.onstop = (event) => {
        if (test31_storeMedia == "store_local") {
            test31_storeFiles_patient('patient_video.webm');
        }
    };

    test31_mediaRecorder_patient.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {            
            test31_recordedBlob_patient.push(event.data);
        }             
    });

    test31_mediaRecorder_patient.start(10); // collect 10ms of data
}

function test31_stopRecording() {
    test31_mediaRecorder_patient.stop();
}

function test31_storeFiles_patient(fileName) {    
    let blobMain = new Blob(test31_recordedBlob_patient, {type: 'video/webm'});
    saveAs(blobMain, test31_idPathFolder + '__' + test31_pathSession + '__MOCA__' + fileName);

    test31_resetParameters();
    console.log("Test31 patient stored");
}