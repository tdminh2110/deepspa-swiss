let test14_idSelectedSession;

let test14_DocumentEvents;


//////////////////////////////////////////////////////////////////////////////////////////////////////////

socket.on('Test14', function(data) {    
    let type = data['type'];
    
    switch (type) {
        case "c": {
            let instruction = data['instruction'];

            switch(instruction) {
                case "finish":
                    $('#MainScreenGame').load('/tests/entr_clin?type=start&id_session=' + test14_idSelectedSession, function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test14_OnDocumentEventsOnType(socket, "start", 0);
                        }
                    });
                    break;

                case "show-commentaires":
                    $("#txt-test14-c-page01").val(data['commentaires']);
                    break;

                case "start":
                    $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=1', function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test14_OnDocumentEventsOnType(socket, type, 1);
                            socket.emit('Test14', { 'type' : type, 'instruction' : 'old-status-of-page', 'page' : 1 });
                        }
                    });                
                    break;
            }
            
            break;
        }

        case "dl": case "rj": {
            let instruction = data['instruction'];

            switch(instruction) {
                case "show-commentaires":
                    if (type == 'dl') {
                        $("#txt-test14-dl-page01").val(data['commentaires']);
                    } else if (type == 'rj') {
                        $("#txt-test14-rj-page01").val(data['commentaires']);
                    }
                    break;

                case "start":
                    $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=1', function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test14_OnDocumentEventsOnType(socket, type, 1);
                            socket.emit('Test14', { 'type' : type, 'instruction' : 'old-status-of-page', 'page' : 1 });
                            socket.emit('Test14', { 'type' : type, 'instruction' : 'start-recording' });
                            setPatientStatus(1, 0, 0, 1);
                        }
                    });   
                    break;
                    
                case 'upload-files':
                    $('#Wait_Upload_Tests').css("display", "block"); 
                    $('#Wait_Upload_Tests').load('/wait/uploadingfiles');

                    $('#MainScreenGame').load('/tests/entr_clin?type=start&id_session=' + test14_idSelectedSession, function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test14_OnDocumentEventsOnType(socket, "start", 0);
                            setPatientStatus(1, 0, 0, 0);
                        }
                    });

                    break;
            }
            
            break;
        }

        case "fcs": {
            let instruction = data['instruction'];

            switch(instruction) {
                case "finish":
                    $('#MainScreenGame').load('/tests/entr_clin?type=start&id_session=' + test14_idSelectedSession, function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test14_OnDocumentEventsOnType(socket, "start", 0);
                        }
                    });
                    break;

                case "hide-continuer":
                    $('#bt-test14-fcs-page0' + data['page'] + '-continuer').css("display", "none");        
                    break;

                case "select-sentence": 
                    test14_fcs_selectSentence(data['sentence'], data['page']);
                    break;  
                    
                case "show-continuer":
                    $('#bt-test14-fcs-page0' + data['page'] + '-continuer').css("display", "inline");        
                    break;

                case "show-page": {
                    let page = data['page'];

                    switch(page) {
                        case 1: 
                            $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=' + page, function(strResponse, strStatus, xhr) {
                                if (strStatus == "success") {
                                    test14_OnDocumentEventsOnType(socket, type, page);
                                    setPatientStatus(0, 1, 0, 0);
                                }
                            });
                            break;

                        case 2: case 3: case 4: case 5:
                            $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=' + page, function(strResponse, strStatus, xhr) {
                                if (strStatus == "success") {
                                    test14_OnDocumentEventsOnType(socket, type, page);
                                    socket.emit('Test14', { 'type' : type, 'instruction' : 'old-status-of-page', 'page' : page, 'sender' : 'clinician' });
                                    if (page == 5) {
                                        setPatientStatus(0, 1, 0, 0);
                                    }
                                }
                            });
                            break;

                        case 6:
                            $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=' + page + '&score=' + data['score'], function(strResponse, strStatus, xhr) {
                                if (strStatus == "success") {
                                    test14_OnDocumentEventsOnType(socket, type, page);                               
                                    setPatientStatus(1, 0, 0, 0);
                                }
                            });                               
                            break;
                    }
                    break;
                }

                case "start":
                    $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=1', function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test14_OnDocumentEventsOnType(socket, type, 1);
                            setPatientStatus(0, 1, 0, 0);
                        }
                    });
                    break;

                case "unselect-sentence": 
                    test14_fcs_unselectSentence(data['sentence'], data['page']);
                    break;                
            }
            break;
        }

        case "finish":
            test14_OffDocumentEvents(); 

            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();

            playStream('SmallStream', clinicianStream_temp);
            playStream('LargeStream', patientStream_temp);

            $("#Run_Test14_Entr_Clin").text("Run");
            $("#Run_Test14_Entr_Clin").attr("class","btn btn-info btn-lg btn-block");
            $("#BackListTests_Entr_Clin").removeAttr("disabled");            

            $('#MainNavigator').load('/tests/mainnavigator', function() {
                $('#Manage_Session').css("display", "block");            
                $('#Select_Sessions').load('/session/list-sessions?idpatient=' + idPatient);
                $('#list_Of_Tests').css("display", "block"); 
                $('#list_Of_Tests').load('/session/load-list-of-tests?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
            });

            break;

        case "gds": {
            let instruction = data['instruction'];

            switch(instruction) {
                case "finish":
                    $('#MainScreenGame').load('/tests/entr_clin?type=start&id_session=' + test14_idSelectedSession, function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test14_OnDocumentEventsOnType(socket, "start", 0);
                        }
                    });
                    break;

                case "hide-continuer":
                    test14_gds_hideContinuer(data['page']);
                    break;

                case "select-word":
                    test14_gds_selectWord(data['word'], data['page']);                        
                    break;

                case "set-text":            
                    if (data['page'] == 17) {
                        $('#txt-test14-gds-page17').val(data['text']);
                    }
                    break;

                case "show-continuer":
                    test14_gds_showContinuer(data['page']);
                    break;

                case "show-page": {
                    let page = data['page'];

                    switch(page) {
                        case 1: 
                            $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=' + page, function(strResponse, strStatus, xhr) {
                                if (strStatus == "success") {
                                    test14_OnDocumentEventsOnType(socket, type, page);
                                    setPatientStatus(1, 0, 0, 0);                               
                                }
                            });
                            break;

                        case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
                            $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=' + page, function(strResponse, strStatus, xhr) {
                                if (strStatus == "success") {
                                    test14_OnDocumentEventsOnType(socket, type, page);
                                    socket.emit('Test14', { 'type' : type, 'instruction' : 'old-status-of-page', 'page' : page, 'sender' : 'clinician' });
                                    setPatientStatus(0, 1, 0, 0);
                                }
                            });
                            break;

                        case 17:
                            $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=' + page + '&score=' + data['score'], function(strResponse, strStatus, xhr) {
                                if (strStatus == "success") {
                                    test14_OnDocumentEventsOnType(socket, type, page);
                                    socket.emit('Test14', { 'type' : type, 'instruction' : 'old-status-of-page', 'page' : page, 'sender' : 'clinician' });
                                    setPatientStatus(1, 0, 0, 0);
                                }
                            });                                
                            break;
                    }
                    break;
                }

                case "start":
                    $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=1', function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test14_OnDocumentEventsOnType(socket, type, 1);
                        }
                    });                
                    break;

                case "unselect-word": 
                    test14_gds_unselectWord(data['word'], data['page']);
                    break;
            }
            break;
        }

        case "hm": {
            let instruction = data['instruction'];

            switch(instruction) {
                case "finish":
                    $('#MainScreenGame').load('/tests/entr_clin?type=start&id_session=' + test14_idSelectedSession, function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test14_OnDocumentEventsOnType(socket, "start", 0);
                        }
                    });
                    break;

                case "show-commentaires":
                    $("#txt-test14-hm-page01").val(data['commentaires']);
                    break;

                case "start":
                    $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=1', function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test14_OnDocumentEventsOnType(socket, type, 1);
                            socket.emit('Test14', { 'type' : type, 'instruction' : 'old-status-of-page', 'page' : 1 });
                        }
                    });                
                    break;
            }
            
            break;
        }

        case "ia": {
            let instruction = data['instruction'];

            switch(instruction) {
                case "finish":
                    $('#MainScreenGame').load('/tests/entr_clin?type=start&id_session=' + test14_idSelectedSession, function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test14_OnDocumentEventsOnType(socket, "start", 0);
                        }
                    });
                    break;

                case "hide-continuer":
                    $('#bt-test14-ia-page2-continuer').css("display", "none");        
                    break;

                case "select-number":
                    test14_ia_selectNumber(data['index']);
                    break;

                case "show-page": {
                    let page = data['page'];

                    switch(page) {
                        case 1: 
                            $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=' + page, function(strResponse, strStatus, xhr) {
                                if (strStatus == "success") {
                                    test14_OnDocumentEventsOnType(socket, type, page);                               
                                }
                            });
                            break;

                        case 2: 
                            $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=' + page, function(strResponse, strStatus, xhr) {
                                if (strStatus == "success") {
                                    test14_OnDocumentEventsOnType(socket, type, page);
                                    socket.emit('Test14', { 'type' : type, 'instruction' : 'old-status-of-page', 'page' : page });
                                }
                            });
                            break;

                        case 3:
                            $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=' + page + '&emoussement_affectif=' + data['emoussement_affectif'] +
                                                                                                          '&perte_d_initiative=' + data['perte_d_initiative'] +
                                                                                                          '&perte_d_interet=' + data['perte_d_interet']
                            , function(strResponse, strStatus, xhr) {
                                if (strStatus == "success") {
                                    test14_OnDocumentEventsOnType(socket, type, page);                               
                                }
                            });                               
                            break;
                    }
                    break;
                }

                case "show-continuer":
                    $('#bt-test14-ia-page2-continuer').css("display", "inline");        
                    break;

                case "start":
                    $('#MainScreenGame').load('/tests/entr_clin?type=' + type + '&page=1', function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test14_OnDocumentEventsOnType(socket, type, 1);
                        }
                    });                
                    break;

                case "unselect-number":
                    test14_ia_unselectNumber(data['index']);
                    break;
            }
        }

        case 'select-subtest':                  
            test14_select_subTest(data['value']);   
            break;

        case "start":            
            test14_DocumentEvents = [];
            test14_idSelectedSession = data['id_session'];  

            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();                     
            playStream('SmallStream', patientStream_temp);  

            $('#MainScreenGame').load('/tests/entr_clin?type=start&id_session=' + test14_idSelectedSession, function(strResponse, strStatus, xhr) {
                if (strStatus == "success") {
                    test14_OnDocumentEventsOnType(socket, type, 0);
                }
            });
            break;

        case "stop": 
            test14_OffDocumentEvents();

            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();

            playStream('SmallStream', clinicianStream_temp);
            playStream('LargeStream', patientStream_temp);

            $("#Run_Test14_Entr_Clin").text("Run");
            $("#Run_Test14_Entr_Clin").attr("class","btn btn-info btn-lg btn-block");
            $("#BackListTests_Entr_Clin").removeAttr("disabled");

            setPatientStatusDefault();

            break;

        case 'unselect-subtest':              
            test14_unselect_subTest(data['value']);   
            break;
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test14_OnDocumentEventsOnType(socket, type, page) {    
    test14_OffDocumentEvents();

    switch (type) {
        case "c": {
            if (page == 1) {
                test14_DocumentEvents.push("#bt-test14-c-page01-terminer");
                
                $(document).on("click", "#bt-test14-c-page01-terminer", function(e) {                
                    socket.emit('Test14', { 'type' : 'c', 'instruction' : 'store-values', 'value' : $('#txt-test14-c-page01').val() });
                });
            }
            break;
        }

        case "dl": {
            if (page == 1) {
                test14_DocumentEvents.push("#bt-test14-dl-page01-terminer");
                
                $(document).on("click", "#bt-test14-dl-page01-terminer", function(e) {
                    socket.emit('Test14', { 'type' : 'dl', 'instruction' : 'store-values', 'value' : $('#txt-test14-dl-page01').val() });
                });
            }
            break;
        }

        case "fcs": {
            switch(page) {
                case 1:
                    test14_DocumentEvents.push("#bt-test14-fcs-page01-continuer");
                    
                    $(document).on("click", "#bt-test14-fcs-page01-continuer", function(e) {                                        
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : 2 });
                    });
                    break;
                
                case 2: case 3: case 4: case 5: {
                    for (let i = 1; i <= 7; i++) {                                        
                        test14_DocumentEvents.push('#bt-test14-fcs-page0' + page + '-' + i);
                    }

                    test14_DocumentEvents.push('#bt-test14-fcs-page0' + page + '-retour');
                    test14_DocumentEvents.push('#bt-test14-fcs-page0' + page + '-continuer');

                    for (let i = 1; i <= 7; i++) {                    
                        $(document).on('click', '#bt-test14-fcs-page0' + page + '-' + i, function(e) {
                            socket.emit('Test14', { 'type' : type, 'instruction' : 'select-sentence', 'page' : page, 'sentence' : i, 'sender' : 'clinician' });
                        });
                    }

                    $(document).on("click", '#bt-test14-fcs-page0' + page +'-retour', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : (page - 1) });
                    });

                    $(document).on("click", '#bt-test14-fcs-page0' + page + '-continuer', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : (page + 1) });
                    });

                    break;
                }

                case 6:
                    test14_DocumentEvents.push('#bt-test14-fcs-page06-retour');
                    test14_DocumentEvents.push('#bt-test14-fcs-page06-terminer');

                    $(document).on("click", '#bt-test14-fcs-page06-retour', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : 5 });
                    });

                    $(document).on("click", '#bt-test14-fcs-page06-terminer', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'store-values' });
                    });
                    break;
            }
            break;
        }

        case "gds": {
            switch(page) {
                case 1:
                    test14_DocumentEvents.push("#bt-test14-gds-page01-continuer");
                    
                    $(document).on("click", "#bt-test14-gds-page01-continuer", function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : 2, 'sender' : 'clinician' });
                    });
                    break;

                case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
                    test14_DocumentEvents.push('#bt-test14-gds-page' + page + '-oui');
                    test14_DocumentEvents.push('#bt-test14-gds-page' + page + '-non');
                    test14_DocumentEvents.push('#bt-test14-gds-page' + page + '-retour');
                    test14_DocumentEvents.push('#bt-test14-gds-page' + page + '-continuer');

                    $(document).on("click", '#bt-test14-gds-page' + page +'-oui', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'select-word', 'page' : page, 'word' : 'oui', 'sender' : 'clinician' });
                    });

                    $(document).on("click", '#bt-test14-gds-page' + page + '-non', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'select-word', 'page' : page, 'word' : 'non', 'sender' : 'clinician' });
                    });

                    $(document).on("click", '#bt-test14-gds-page' + page +'-retour', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : (page - 1), 'sender' : 'clinician' });
                    });

                    $(document).on("click", '#bt-test14-gds-page' + page + '-continuer', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : (page + 1), 'sender' : 'clinician' });
                    });
                    break;
                
                case 17:
                    test14_DocumentEvents.push('#bt-test14-gds-page17-retour');
                    test14_DocumentEvents.push('#bt-test14-gds-page17-terminer');

                    $(document).on("click", '#bt-test14-gds-page17-retour', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'show-page-and-store', 'page' : 16, 'commentaires' : $('#txt-test14-gds-page17').val() });
                    });

                    $(document).on("click", '#bt-test14-gds-page17-terminer', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'store-values', 'commentaires' : $('#txt-test14-gds-page17').val() });
                    });
                    break;
            }
        }

        case "hm": {
            if (page == 1) {
                test14_DocumentEvents.push("#bt-test14-hm-page01-terminer");
                
                $(document).on("click", "#bt-test14-hm-page01-terminer", function(e) {                
                    socket.emit('Test14', { 'type' : 'hm', 'instruction' : 'store-values', 'value' : $('#txt-test14-hm-page01').val() });
                });
            }
            break;
        }

        case "ia": {
            switch(page) {
                case 1:
                    test14_DocumentEvents.push("#bt-test14-ia-page1-continuer");
                    
                    $(document).on("click", "#bt-test14-ia-page1-continuer", function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : 2 });
                    });
                    break;

                case 2:
                    for (let i = 1; i <= 15; i++) {                                        
                        test14_DocumentEvents.push('#bt-test14-ia-page2-' + i);
                    }

                    test14_DocumentEvents.push('#bt-test14-ia-page2-retour');
                    test14_DocumentEvents.push('#bt-test14-ia-page2-continuer');

                    for (let i = 1; i <= 15; i++) {                    
                        $(document).on('click', '#bt-test14-ia-page2-' + i, function(e) {
                            socket.emit('Test14', { 'type' : type, 'instruction' : 'select-number', 'index' : i });
                        });
                    }

                    $(document).on("click", '#bt-test14-ia-page2-retour', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : 1 });
                    });

                    $(document).on("click", '#bt-test14-ia-page2-continuer', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : 3 });
                    });
                    break;

                case 3:
                    test14_DocumentEvents.push('#bt-test14-ia-page3-retour');
                    test14_DocumentEvents.push('#bt-test14-ia-page3-terminer');

                    $(document).on("click", '#bt-test14-ia-page3-retour', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'show-page', 'page' : 2 });
                    });

                    $(document).on("click", '#bt-test14-ia-page3-terminer', function(e) {                
                        socket.emit('Test14', { 'type' : type, 'instruction' : 'store-values' });
                    });
                    break;
            }
            break;
        }

        case "rj": {
            if (page == 1) {
                test14_DocumentEvents.push("#bt-test14-rj-page01-terminer");
                
                $(document).on("click", "#bt-test14-rj-page01-terminer", function(e) {
                    socket.emit('Test14', { 'type' : 'rj', 'instruction' : 'store-values', 'value' : $('#txt-test14-rj-page01').val() });                    
                });
            }
            break;
        }

        case "start": {
            for (let i = 1; i <= 7; i++) { 
                test14_DocumentEvents.push('#bt-test14-start-' + i);    
            }
            test14_DocumentEvents.push("#bt-test14-start-continuer");

            $(document).on("click", "#bt-test14-start-1", function(e) {                
                socket.emit('Test14', { 'type' : 'select-subtest', 'value' : "hm" });
            });

            $(document).on("click", "#bt-test14-start-2", function(e) {                
                socket.emit('Test14', { 'type' : 'select-subtest', 'value' : "dl" });
            });

            $(document).on("click", "#bt-test14-start-3", function(e) {                
                socket.emit('Test14', { 'type' : 'select-subtest', 'value' : "rj" });
            });

            $(document).on("click", "#bt-test14-start-4", function(e) {                
                socket.emit('Test14', { 'type' : 'select-subtest', 'value' : "c" });
            });

            $(document).on("click", "#bt-test14-start-5", function(e) {                
                socket.emit('Test14', { 'type' : 'select-subtest', 'value' : "fcs" });
            });

            $(document).on("click", "#bt-test14-start-6", function(e) {                
                socket.emit('Test14', { 'type' : 'select-subtest', 'value' : "gds" });
            });
        
            $(document).on("click", "#bt-test14-start-7", function(e) {                
                socket.emit('Test14', { 'type' : 'select-subtest', 'value' : "ia" });
            });
            
            $(document).on("click", "#bt-test14-start-continuer", function(e) {                  
                if ($("#bt-test14-start-continuer").text() === "Commencer") {
                    socket.emit('Test14', { 'type' : 'run-subtest' });
                } else if ($("#bt-test14-start-continuer").text() === "Terminer") {
                    socket.emit('Test14', { 'type' : 'finish' });
                }                
            });
            break;
        }
    }
}

function test14_OffDocumentEvents() {      

    for(let i = 0; i < test14_DocumentEvents.length; i++) {
        $(document).off("click", test14_DocumentEvents[i]);
    }
    test14_DocumentEvents = [];
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test14_fcs_selectSentence(order_number_of_sentence, page) {
    $('#bt-test14-fcs-page0' + page + '-' + order_number_of_sentence).attr("class", "btn btn-warning btn-lg btn-block");    
}

function test14_fcs_unselectSentence(order_number_of_sentence, page) {        
    $('#bt-test14-fcs-page0' + page + '-' + order_number_of_sentence).attr("class", "btn btn-secondary btn-lg btn-block");    
}

function test14_gds_hideContinuer(page) {    
    $('#bt-test14-gds-page' + page + '-continuer').css("display", "none");  
}

function test14_gds_selectWord(word, page) {
    $('#bt-test14-gds-page' + page + '-' + word).attr("class", "btn btn-warning btn-lg btn-block");    
}

function test14_gds_showContinuer(page) {    
    $('#bt-test14-gds-page' + page + '-continuer').css("display", "inline");  
}

function test14_gds_unselectWord(word, page) {
    $('#bt-test14-gds-page' + page + '-' + word).attr("class", "btn btn-secondary btn-lg btn-block");        
}

function test14_ia_selectNumber(index) {
    $('#bt-test14-ia-page2-' + index).attr("class", "btn btn-warning btn-lg btn-block");    
}

function test14_ia_unselectNumber(index) {
    $('#bt-test14-ia-page2-' + index).attr("class", "btn btn-secondary btn-lg btn-block");    
}

function test14_select_subTest(value) {
    switch (value) {
        case "hm":
            $('#bt-test14-start-1').attr("class","btn btn-warning btn-lg btn-block");
            $('#bt-test14-start-2').attr("class","btn btn-secondary btn-lg btn-block");            
            $('#bt-test14-start-3').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-4').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-5').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-6').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-7').attr("class","btn btn-secondary btn-lg btn-block");
            break;

        case "dl":
            $('#bt-test14-start-1').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-2').attr("class","btn btn-warning btn-lg btn-block");            
            $('#bt-test14-start-3').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-4').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-5').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-6').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-7').attr("class","btn btn-secondary btn-lg btn-block");
            break;

        case "rj":
            $('#bt-test14-start-1').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-2').attr("class","btn btn-secondary btn-lg btn-block");            
            $('#bt-test14-start-3').attr("class","btn btn-warning btn-lg btn-block");
            $('#bt-test14-start-4').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-5').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-6').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-7').attr("class","btn btn-secondary btn-lg btn-block");
            break;
        
        case "c":
            $('#bt-test14-start-1').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-2').attr("class","btn btn-secondary btn-lg btn-block");            
            $('#bt-test14-start-3').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-4').attr("class","btn btn-warning btn-lg btn-block");
            $('#bt-test14-start-5').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-6').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-7').attr("class","btn btn-secondary btn-lg btn-block");
            break;

        case "fcs":
            $('#bt-test14-start-1').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-2').attr("class","btn btn-secondary btn-lg btn-block");            
            $('#bt-test14-start-3').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-4').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-5').attr("class","btn btn-warning btn-lg btn-block");
            $('#bt-test14-start-6').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-7').attr("class","btn btn-secondary btn-lg btn-block");
            break;

        case "gds":
            $('#bt-test14-start-1').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-2').attr("class","btn btn-secondary btn-lg btn-block");            
            $('#bt-test14-start-3').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-4').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-5').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-6').attr("class","btn btn-warning btn-lg btn-block");
            $('#bt-test14-start-7').attr("class","btn btn-secondary btn-lg btn-block");
            break;
        
        case "ia":
            $('#bt-test14-start-1').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-2').attr("class","btn btn-secondary btn-lg btn-block");            
            $('#bt-test14-start-3').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-4').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-5').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-6').attr("class","btn btn-secondary btn-lg btn-block");
            $('#bt-test14-start-7').attr("class","btn btn-warning btn-lg btn-block");
            break;
    }
    $("#bt-test14-start-continuer").text("Commencer");
}

function test14_unselect_subTest(value) {
    switch (value) {
        case "hm":
            $('#bt-test14-start-1').attr("class","btn btn-secondary btn-lg btn-block");            
            break;

        case "dl":
            $('#bt-test14-start-2').attr("class","btn btn-secondary btn-lg btn-block");            
            break;

        case "rj":
            $('#bt-test14-start-3').attr("class","btn btn-secondary btn-lg btn-block");            
            break;
        
        case "c":
            $('#bt-test14-start-4').attr("class","btn btn-secondary btn-lg btn-block");            
            break;

        case "fcs":
            $('#bt-test14-start-5').attr("class","btn btn-secondary btn-lg btn-block");            
            break;

        case "gds":
            $('#bt-test14-start-6').attr("class","btn btn-secondary btn-lg btn-block");            
            break;
        
        case "ia":
            $('#bt-test14-start-7').attr("class","btn btn-secondary btn-lg btn-block");            
            break;
    }
    $("#bt-test14-start-continuer").text("Terminer");
}