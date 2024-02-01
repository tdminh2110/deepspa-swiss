let test39_idSelectedSession;

let test39_DocumentEvents;

let test39_mediaRecorder_patient;
let test39_recordedBlob_patient;
let test39_record_video;

let test39_storeMedia;
let test39_idPathFolder;
let test39_pathSession;

let test39_countSecond;
let test39_idInterval;

let test39_shortcut = 0;

socket.on('Test39', function(data) {
    let type = data['type'];

    switch (type) {    
        case "finish":
            offDocumentEvents(test39_DocumentEvents);
            test39_close();
            returnListOfTests();

            break;

        case "finish_subtest":
            $('#MainScreenGame').load('/tests/words_list?page=1', 
            function(strResponse, strStatus, xhr) {
                if (strStatus == "success") {                         
                    test39_OnDocumentEventsOnPage(socket, 1);
                }
            });
            break;

        case "hide-continuer":
            $('#bt-test39-page' + data['page'] + '-continuer').css("display", "none");
            break;

        case "hide-image": {
            $("#bt-test39-page70-1").text("ANZEIGEN");
            $('#img-test39-page70').css('display','none');

            if (test39_record_video == true) {
                setPatientStatus(1, 0, 0, 1);
            } else {
                setPatientStatus(1, 0, 0, 0);
            }

            break;
        }    

        case "hide-word":
            $('#bt-test39-page' + data['page'] + '-1').text("Wort anzeigen ['Kirche']");
            $('#bt-test39-page' + data['page'] + '-1').attr("class","btn btn-secondary btn-lg btn-block");
            if (test39_record_video == true) {
                setPatientStatus(1, 0, 0, 1);
            } else {
                setPatientStatus(1, 0, 0, 0);
            }
            break;

        case "select-subtest":
            $('#bt-test39-page1-' + data['value']).attr("class","btn btn-warning btn-lg btn-block");
            break;

        case "select-word": {
            let page = data['page'];
            let number_word = data['word'];

            if ((page == 16) || (page == 29) || (page == 42) || (page == 46) || 
                ((page >= 49) && (page <= 68)))
                $('#bt-test39-page' + page + '-' + number_word).attr("class","btn btn-warning btn-lg btn-block");
            else if (page == 70)
                $('#bt-test39-page' + page + '-' + (number_word + 1)).attr("class","btn btn-warning btn-lg btn-block");
            else
                $('#bt-test39-page' + page).attr("class","btn btn-warning btn-lg btn-block");

            break;
        }

        case "show-continuer":
            $('#bt-test39-page' + data['page'] + '-continuer').css("display", "inline");
            break;

        case "show-error":
            $('#lbl-test39-page1').text(data['error']);
            break;

        case "show-image": {
            $("#bt-test39-page70-1").text("VERSTECKEN");                                            
            $('#img-test39-page70').css('display','inline');
            
            if (test39_record_video == true) {
                setPatientStatus(0, 1, 0, 1);
            } else {
                setPatientStatus(0, 1, 0, 0);
            }

            break;
        }

        case "show-number": {
            $('#txt-test39-page' + data['page'] + '-' + data['word']).val(data['value']);
            break;
        }

        case "show-page": {      
            let page = data['page'];

            switch(page) {
                case 1: case 5: case 18: case 31: case 48:
                    $('#MainScreenGame').load('/tests/words_list?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test39_OnDocumentEventsOnPage(socket, page);
                            if (test39_record_video == true) {
                                setPatientStatus(1, 0, 0, 1);
                            } else {
                                setPatientStatus(1, 0, 0, 0);
                            }
                        }
                    });  
                    break;

                case 2: case 3: case 4: case 44: case 45: 
                    $('#MainScreenGame').load('/tests/words_list?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test39_OnDocumentEventsOnPage(socket, page);
                        }
                    });  
                    break;

                case 6: case 15: case 19: case 28: case 32: case 41: case 49: case 68:
                    $('#MainScreenGame').load('/tests/words_list?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test39_OnDocumentEventsOnPage(socket, page);
                            if (test39_record_video == true) {
                                setPatientStatus(0, 1, 0, 1);
                            } else {
                                setPatientStatus(0, 1, 0, 0);
                            }
                            socket.emit('Test39', { 'type' : 'old-status-of-page', 'page' : page });
                        }
                    });
                    break;

                case 7: case 8: case 9: case 10: case 11: case 12:
                case 13: case 14: case 20: case 21: case 22: case 23: case 24: 
                case 25: case 26: case 27: case 33: case 34: case 35: case 36:
                case 37: case 38: case 39: case 40: case 50: case 51: case 52: 
                case 53: case 54: case 55: case 56: case 57: case 58: case 59:
                case 60: case 61: case 62: case 63: case 64: case 65: case 66: 
                case 67:                 
                    $('#MainScreenGame').load('/tests/words_list?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test39_OnDocumentEventsOnPage(socket, page);
                            socket.emit('Test39', { 'type' : 'old-status-of-page', 'page' : page });
                        }
                    });  
                    break;

                case 16: case 29: case 42:
                    $('#MainScreenGame').load('/tests/words_list?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test39_OnDocumentEventsOnPage(socket, page);
                            if (test39_record_video == true) {
                                setPatientStatus(1, 0, 0, 1);
                            } else {
                                setPatientStatus(1, 0, 0, 0);
                            }
                            socket.emit('Test39', { 'type' : 'old-status-of-page', 'page' : page });
                            test39_countSecond = 0;
                            test39_countTimer('#txt-test39-page' + page + '-count-timer');
                        }
                    });
                    break;

                case 17: case 30: case 43:
                    $('#MainScreenGame').load('/tests/words_list?page=' + page + 
                        '&knl=' + data['knl'] + '&lernen=' + data['lernen'] + 
                        '&lernen_int=' + data['lernen_int'],
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test39_OnDocumentEventsOnPage(socket, page);
                        }
                    });  
                    break;

                case 46:
                    $('#MainScreenGame').load('/tests/words_list?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test39_OnDocumentEventsOnPage(socket, page);
                            socket.emit('Test39', { 'type' : 'old-status-of-page', 'page' : page });
                            test39_countSecond = 0;
                            test39_countTimer('#txt-test39-page' + page + '-count-timer');
                        }
                    });
                    break;

                case 47:
                    $('#MainScreenGame').load('/tests/words_list?page=' + page + 
                        '&abrufen=' + data['abrufen'] + '&abrufen_int=' + data['abrufen_int'] +
                        '&value_word1=' + data['value_word1'] + '&value_word2=' + data['value_word2'] +
                        '&value_word3=' + data['value_word3'] + '&value_word4=' + data['value_word4'] +
                        '&value_word5=' + data['value_word5'] + '&value_word6=' + data['value_word6'] +
                        '&value_word7=' + data['value_word7'] + '&value_word8=' + data['value_word8'] +
                        '&value_word9=' + data['value_word9'] + '&value_word10=' + data['value_word10'],
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test39_OnDocumentEventsOnPage(socket, page);
                        }
                    });  
                    break;

                case 69:
                    $('#MainScreenGame').load('/tests/words_list?page=' + page + 
                        '&r_ja=' + data['r_ja'] + '&r_nein=' + data['r_nein'] + 
                        '&f_ja=' + data['f_ja'] + '&f_nein=' + data['f_nein'],
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test39_OnDocumentEventsOnPage(socket, page);
                            if (test39_record_video == true) {
                                setPatientStatus(1, 0, 0, 1);
                            } else {
                                setPatientStatus(1, 0, 0, 0);
                            }
                        }
                    });  
                    break;

                case 70:
                    $('#MainScreenGame').load('/tests/words_list?page=' + page, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test39_OnDocumentEventsOnPage(socket, page);
                            if (test39_record_video == true) {
                                setPatientStatus(1, 0, 0, 1);
                            } else {
                                setPatientStatus(1, 0, 0, 0);
                            }
                            socket.emit('Test39', { 'type' : 'old-status-of-page', 'page' : page });
                        }
                    });  
                    break;

                case 71:
                    $('#MainScreenGame').load('/tests/words_list?page=' + page + 
                        '&fiabz=' + data['fiabz'],
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test39_OnDocumentEventsOnPage(socket, page);
                            if (test39_record_video == true) {
                                setPatientStatus(1, 0, 0, 1);
                            } else {
                                setPatientStatus(1, 0, 0, 0);
                            }
                        }
                    });  
                    break;
            }            
            break;
        }

        case "show-text":
            $('#txta-test39-page' + data['page']).val(data['text']);
            break;

        case "show-value":
            $('#txt-test39-page' + data['page']).val(data['value']);
            break;
            
        case "show-word":
            $('#bt-test39-page' + data['page'] + '-1').text("Wort verbergen ['Kirche’]");
            $('#bt-test39-page' + data['page'] + '-1').attr("class","btn btn-warning btn-lg btn-block");
            if (test39_record_video == true) {
                setPatientStatus(0, 1, 0, 1);
            } else {
                setPatientStatus(0, 1, 0, 0);
            }
            break;

        case "start":
            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();                     
            playStream('SmallStream', patientStream_temp);

            test39_DocumentEvents = [];

            test39_idSelectedSession = data['id_session'];
            test39_record_video = data['record_video'];
            test39_shortcut = data['shortcut'];

            if (test39_record_video == true) {
                test39_startRecording();
            }

            $('#MainScreenGame').load('/tests/words_list?page=1&id_session=' + test39_idSelectedSession, 
            function(strResponse, strStatus, xhr) {
                if (strStatus == "success") {     
                    test39_OnDocumentEventsOnPage(socket, 1);
                    if (test39_record_video == true) {
                        setPatientStatus(1, 0, 0, 1);
                    } else {
                        setPatientStatus(1, 0, 0, 0);
                    }
                }
            });
            break; 

        case "stop":
            test39_countSecond = 0;
            clearInterval(test39_idInterval);
            offDocumentEvents(test39_DocumentEvents);
            test39_close();
            setPatientStatusDefault();
            break;

        case "store-files":
            if (test39_record_video == true) {
                test39_close();
                returnListOfTests();
                offDocumentEvents(test39_DocumentEvents);
                setPatientStatusDefault();      
            }      
            break;

        case "store-files-in-clinician":
            if (test39_record_video == true) {
                test39_storeMedia = "store_local";
                test39_idPathFolder = data["id_path_folder"];
                test39_pathSession = data["path_session"];

                test39_stopRecording();

                test39_close();
                returnListOfTests();
                offDocumentEvents(test39_DocumentEvents);
                setPatientStatusDefault();      
            }      
            break;

        case "unselect-subtest":
            $('#bt-test39-page1-' + data['value']).attr("class","btn btn-secondary btn-lg btn-block");
            break;

        case "unselect-word": {
            let page = data['page'];
            let number_word = data['word'];

            if ((page == 16) || (page == 29) || (page == 42) || (page == 46) ||
                ((page >= 49) && (page <= 68)) )
                $('#bt-test39-page' + page + '-' + number_word).attr("class","btn btn-secondary btn-lg btn-block");
            else if (page == 70)
                $('#bt-test39-page' + page + '-' + (number_word + 1)).attr("class","btn btn-secondary btn-lg btn-block");
            else
                $('#bt-test39-page' + page).attr("class","btn btn-secondary btn-lg btn-block");
            break;
        }

        case 'upload-files':            
            $('#Wait_Upload_Tests').css("display", "block"); 
            $('#Wait_Upload_Tests').load('/wait/uploadingfiles');            

            test39_close();
            returnListOfTests();
            offDocumentEvents(test39_DocumentEvents);
            setPatientStatusDefault();
            break;
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test39_OnDocumentEventsOnPage(socket, page) {
    offDocumentEvents(test39_DocumentEvents);

    switch (page) {
        case 1:
            test39_DocumentEvents.push('#bt-test39-page' + page + '-1');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-2');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-3');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-4');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-terminer');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-continuer');

            $(document).on("click", "#bt-test39-page" + page + "-1", function(e) {            
                socket.emit('Test39', { 'type' : 'select-subtest', 'page' : page, 'value' : 1 });
            });
        
            $(document).on("click", "#bt-test39-page" + page + "-2", function(e) {            
                socket.emit('Test39', { 'type' : 'select-subtest', 'page' : page, 'value' : 2 });
            });

            $(document).on("click", "#bt-test39-page" + page + "-3", function(e) {            
                socket.emit('Test39', { 'type' : 'select-subtest', 'page' : page, 'value' : 3 });
            });

            $(document).on("click", "#bt-test39-page" + page + "-4", function(e) {            
                socket.emit('Test39', { 'type' : 'select-subtest', 'page' : page, 'value' : 4 });
            });

            $(document).on("click", "#bt-test39-page" + page + "-terminer", function(e) {
                socket.emit('Test39', { 'type' : 'store-values', 'page' : page });
            });

            $(document).on("click", "#bt-test39-page" + page + "-continuer", function(e) {
                socket.emit('Test39', { 'type' : 'show-page', 'page' : (page + 1) });
            });

            break;

        case 2: case 44:
            test39_DocumentEvents.push('#bt-test39-page' + page + '-continuer');

            $(document).on("click", "#bt-test39-page" + page + "-continuer", function(e) {
                socket.emit('Test39', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 3: case 4: case 5: case 17: case 18: case 30: case 31: case 45: 
            test39_DocumentEvents.push('#bt-test39-page' + page + '-retour');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-continuer');

            $(document).on("click", "#bt-test39-page" + page + "-retour", function(e) {
                socket.emit('Test39', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", "#bt-test39-page" + page + "-continuer", function(e) {
                socket.emit('Test39', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 6: case 7: case 8: case 9: case 10: case 11: case 12:
        case 13: case 14: case 15: case 19: case 20: case 21: case 22: case 23:
        case 24: case 25: case 26: case 27: case 28: case 32: case 33: case 34:
        case 35: case 36: case 37: case 38: case 39: case 40: case 41:
            test39_DocumentEvents.push('#bt-test39-page' + page);
            test39_DocumentEvents.push('#bt-test39-page' + page + '-retour');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-continuer');

            $(document).on("click", "#bt-test39-page" + page, function(e) {            
                socket.emit('Test39', { 'type' : 'select-word', 'page' : page });
            });

            $(document).on("click", "#bt-test39-page" + page + "-retour", function(e) {
                socket.emit('Test39', { 'type' : 'show-page', 'page' : (page - 1) });
            });        

            $(document).on("click", "#bt-test39-page" + page + "-continuer", function(e) {
                socket.emit('Test39', { 'type' : 'show-page', 'page' : (page + 1) });
            });

            break;

        case 16: case 29: case 42: 
            for(let i = 1; i <= 10; i++) {
                test39_DocumentEvents.push('#bt-test39-page' + page + '-' + i);
            }
            test39_DocumentEvents.push('#bt-test39-page' + page + '-minus');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-plus');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-retour');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-continuer');

            for(let i = 1; i <= 10; i++) {
                $(document).on("click", '#bt-test39-page' + page + '-' + i, function(e) { 
                    socket.emit('Test39', { 'type' : 'select-word', 'page' : page, 'word' : i });
                });
            }

            $(document).on("click", '#bt-test39-page' + page + '-minus', function(e) {
                socket.emit('Test39', { 'type' : 'minus-number', 'page' : page });
            });
        
            $(document).on("click", '#bt-test39-page' + page + '-plus', function(e) {
                socket.emit('Test39', { 'type' : 'plus-number', 'page' : page });
            });

            $(document).on("click", "#bt-test39-page" + page + "-retour", function(e) {
                test39_countSecond = 0;
                clearInterval(test39_idInterval);
                socket.emit('Test39', { 'type' : 'show-page-and-store', 'page-show' : (page - 1), 'page-store' : page, 
                                        'text' : $('#txta-test39-page' + page).val() });
            });        

            $(document).on("click", "#bt-test39-page" + page + "-continuer", function(e) {
                test39_countSecond = 0;
                clearInterval(test39_idInterval);
                socket.emit('Test39', { 'type' : 'show-page-and-store', 'page-show' : (page + 1), 'page-store' : page, 
                                        'text' : $('#txta-test39-page' + page).val() });
            });            

            break;        
        
        case 43: case 47: case 69: case 71:
            test39_DocumentEvents.push('#bt-test39-page' + page + '-retour');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-terminer');

            $(document).on("click", "#bt-test39-page" + page + "-retour", function(e) {
                socket.emit('Test39', { 'type' : 'show-page', 'page' : (page - 1) });
            });

            $(document).on("click", "#bt-test39-page" + page + "-terminer", function(e) {
                socket.emit('Test39', { 'type' : 'store-values', 'page' : page });
            });
            break;

        case 48:            
            test39_DocumentEvents.push('#bt-test39-page' + page + '-1');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-continuer');

            $(document).on("click", "#bt-test39-page" + page + "-1", function(e) {
                socket.emit('Test39', { 'type' : 'show-word', 'page' : page, 'text' : $('#bt-test39-page' + page + '-1').text() });
            });

            $(document).on("click", "#bt-test39-page" + page + "-continuer", function(e) {
                socket.emit('Test39', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;

        case 46:
            for(let i = 1; i <= 10; i++) {
                test39_DocumentEvents.push('#bt-test39-page' + page + '-' + i);
            }

            for(let i = 1; i <= 11; i++) {
                test39_DocumentEvents.push('#bt-test39-page' + page + '-minus' + '-' + i);
                test39_DocumentEvents.push('#bt-test39-page' + page + '-plus' + '-' + i);
            }

            test39_DocumentEvents.push('#bt-test39-page' + page + '-retour');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-continuer');

            for(let i = 1; i <= 10; i++) {
                $(document).on("click", '#bt-test39-page' + page + '-' + i, function(e) { 
                    socket.emit('Test39', { 'type' : 'select-word', 'page' : page, 'word' : i });
                });
            }

            for(let i = 1; i <= 11; i++) {
                $(document).on("click", '#bt-test39-page' + page + '-minus' + '-' + i, function(e) {
                    socket.emit('Test39', { 'type' : 'minus-number', 'page' : page, 'word' : i });
                });
            
                $(document).on("click", '#bt-test39-page' + page + '-plus' + '-' + i, function(e) {
                    socket.emit('Test39', { 'type' : 'plus-number', 'page' : page, 'word' : i });
                });
            }            

            $(document).on("click", "#bt-test39-page" + page + "-retour", function(e) {
                test39_countSecond = 0;
                clearInterval(test39_idInterval);
                socket.emit('Test39', { 'type' : 'show-page-and-store', 'page-show' : (page - 1), 'page-store' : page, 
                                        'text' : $('#txta-test39-page' + page).val() });
            });        

            $(document).on("click", "#bt-test39-page" + page + "-continuer", function(e) {
                test39_countSecond = 0;
                clearInterval(test39_idInterval);
                socket.emit('Test39', { 'type' : 'show-page-and-store', 'page-show' : (page + 1), 'page-store' : page, 
                                        'text' : $('#txta-test39-page' + page).val() });
            });            

            break;

        case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: 
        case 57: case 58: case 59: case 60: case 61: case 62: case 63: case 64: 
        case 65: case 66: case 67: case 68:
            test39_DocumentEvents.push('#bt-test39-page' + page + '-1');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-2');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-retour');
            test39_DocumentEvents.push('#bt-test39-page' + page + '-continuer');

            $(document).on("click", '#bt-test39-page' + page + '-1', function(e) { 
                socket.emit('Test39', { 'type' : 'select-word', 'page' : page, 'word' : 1 });
            });

            $(document).on("click", '#bt-test39-page' + page + '-2', function(e) { 
                socket.emit('Test39', { 'type' : 'select-word', 'page' : page, 'word' : 2 });
            });
            
            $(document).on("click", "#bt-test39-page" + page + "-retour", function(e) {
                socket.emit('Test39', { 'type' : 'show-page', 'page' : (page - 1) });
            });        

            $(document).on("click", "#bt-test39-page" + page + "-continuer", function(e) {
                socket.emit('Test39', { 'type' : 'show-page', 'page' : (page + 1) });
            });        

            break;

        case 70:
            for(let i = 1; i <= 4; i++) {
                test39_DocumentEvents.push('#bt-test39-page' + page + '-' + i);
            }
            test39_DocumentEvents.push('#bt-test39-page' + page + '-continuer');

            $(document).on("click", '#bt-test39-page' + page + "-1", function(e) { 
                socket.emit('Test39', { 'type' : 'show-image', 'page' : page });
            });

            for(let i = 2; i <= 4; i++) {
                $(document).on("click", '#bt-test39-page' + page + '-' + i, function(e) { 
                    socket.emit('Test39', { 'type' : 'select-word', 'page' : page, 'word' : (i - 1) });
                });
            }
            
            $(document).on("click", "#bt-test39-page" + page + "-continuer", function(e) {
                socket.emit('Test39', { 'type' : 'hide-image', 'page' : page });
                socket.emit('Test39', { 'type' : 'show-page', 'page' : (page + 1) });
            });
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test39_countTimer(txtCount) {    
    test39_idInterval = setInterval(frame, 1000);    
    function frame() {
        test39_countSecond++;             
        $(txtCount).val(test39_countSecond);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test39_close() {
    if (test39_shortcut == 0)            
        closeTest("#Run_Test39_Words_List", "#BackListTests_Words_List", "#Test39_Words_List_Checkbox_Record_Video");
    else if (test39_shortcut == 1)
        closeTest("#Run_Test39_Words_List_SC1", "#BackListTests_Words_List_SC1", "#Test39_Words_List_Checkbox_Record_Video");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test39_resetParameters() {    
    test39_mediaRecorder_patient = null;
    test39_recordedBlob_patient = [];

    test39_storeMedia = "";
}

function test39_startRecording() { 
    test39_resetParameters();   
    selectTypeSupportedMediaRecorder();
    
    try {            
        test39_mediaRecorder_patient = new MediaRecorder(patientStream_temp, typeSupportedMediaRecorder);                 
    } catch (e) {
        return;
    }

    test39_mediaRecorder_patient.onstop = (event) => {        
        if (test39_storeMedia == "store_local") {
            test39_storeFiles_patient('patient_video.webm');
        }
    };

    test39_mediaRecorder_patient.ondataavailable = ((event) => {
        if (event.data && event.data.size > 0) {            
            test39_recordedBlob_patient.push(event.data);
        }             
    });

    test39_mediaRecorder_patient.start(10); // collect 10ms of data    
}

function test39_stopRecording() {
    test39_mediaRecorder_patient.stop();
}

function test39_storeFiles_patient(fileName) {    
    let blobMain = new Blob(test39_recordedBlob_patient, {type: 'video/webm'});
    saveAs(blobMain, test39_idPathFolder + '__' + test39_pathSession + '__Words_List__' + fileName);

    test39_resetParameters();
    console.log("Test39 patient stored");
}