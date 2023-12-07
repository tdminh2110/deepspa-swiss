let test17_countSecond;
let test17_idInterval;

let test17_DocumentEvents;

const TEST17_MAX_COLUMN = 4;
const TEST17_MAX_ROW = 6;

let test17_record_audio;
let test17_language;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

socket.on('Test17', function(data) {    
    let type = data['type'];
    
    switch (type) {
        case "finish":
            test17_OffDocumentEvents(); 

            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();

            playStream('SmallStream', clinicianStream_temp);
            playStream('LargeStream', patientStream_temp);

            $("#Run_Test17_Stroop_Vectoria").text("Run");
            $("#Run_Test17_Stroop_Vectoria").attr("class","btn btn-info btn-lg btn-block");
            $("#BackListTests_Stroop_Vectoria").removeAttr("disabled");            

            $('#MainNavigator').load('/tests/mainnavigator', function() {
                $('#Manage_Session').css("display", "block");            
                $('#Select_Sessions').load('/session/list-sessions?idpatient=' + idPatient);
                $('#list_Of_Tests').css("display", "block"); 
                $('#list_Of_Tests').load('/session/load-list-of-tests?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
            });

            break;

        case "pause": case "arreter":
            clearInterval(test17_idInterval);
            break;

        case "repeat":
            test17_countSecond = 0;

            if (data['page'] == 5) {                
                $("#txt-test17-page05-count-timer").val("0");
                test17_countTimer("#txt-test17-page05-count-timer");
            } else if (data['page'] == 9) {        
                $("#txt-test17-page09-count-timer").val("0");
                test17_countTimer("#txt-test17-page09-count-timer");
            } else if (data['page'] == 13) {        
                $("#txt-test17-page13-count-timer").val("0");
                test17_countTimer("#txt-test17-page13-count-timer");
            }
            break;

        case "reprendre":
            if (data['page'] == 5) {                
                test17_countTimer("#txt-test17-page05-count-timer");
            } else if (data['page'] == 9) {        
                test17_countTimer("#txt-test17-page09-count-timer");
            } else if (data['page'] == 13) {        
                test17_countTimer("#txt-test17-page13-count-timer");
            }
            break;

        case "reset":
            test17_countSecond = 0;
            if (data['page'] == 5) {                
                $("#txt-test17-page05-count-timer").val("0");
            } else if (data['page'] == 9) {        
                $("#txt-test17-page09-count-timer").val("0");
            } else if (data['page'] == 13) {        
                $("#txt-test17-page13-count-timer").val("0");
            }

            break;

        case "select-color":                        
            test17_selectColor(data['row'], data['col'], data['page']);            
            break;

        case "select-correction":                        
            test17_selectCorrection(data['row'], data['col'], data['page']);            
            break;

        case "set-start-recording":
            if (data['page'] == 5) {                
                if (test17_language == 'de')
                    $("#bt-test17-page05-control1").text("Start");
                else
                    $("#bt-test17-page05-control1").text("Commencer");

                test17_timerControl1(socket, data['page'], "#txt-test17-page05-count-timer", "#bt-test17-page05-control1", "#bt-test17-page05-control2", 
                                                                                        "#bt-test17-page05-retour", "#bt-test17-page05-continuer"); 
            } else if (data['page'] == 9) {        
                if (test17_language == 'de')
                    $("#bt-test17-page09-control1").text("Start");
                else
                    $("#bt-test17-page09-control1").text("Commencer");
                
                test17_timerControl1(socket, data['page'], "#txt-test17-page09-count-timer", "#bt-test17-page09-control1", "#bt-test17-page09-control2", 
                                                                                        "#bt-test17-page09-retour", "#bt-test17-page09-continuer"); 
            } else if (data['page'] == 13) {        
                if (test17_language == 'de')
                    $("#bt-test17-page13-control1").text("Start");
                else
                    $("#bt-test17-page13-control1").text("Commencer");                
                                
                test17_timerControl1(socket, data['page'], "#txt-test17-page13-count-timer", "#bt-test17-page13-control1", "#bt-test17-page13-control2", 
                                                                                        "#bt-test17-page13-retour", "#bt-test17-page13-continuer"); 
            }

            if (test17_record_audio == true) {
                setPatientStatus(0, 1, 1, 0);
            } else {
                setPatientStatus(0, 1, 0, 0);
            }
            break;

        case "set-status-recorded":
            if (data['page'] == 5) {                
                $("#txt-test17-page05-count-timer").val(data['count_timer']);                
                if (test17_language == 'de')
                    $("#bt-test17-page05-control1").text("Zurücksetzen");
                else                
                    $("#bt-test17-page05-control1").text("Réinitialiser");    
            } else if (data['page'] == 9) {        
                $("#txt-test17-page09-count-timer").val(data['count_timer']);
                if (test17_language == 'de')
                    $("#bt-test17-page09-control1").text("Zurücksetzen");
                else
                    $("#bt-test17-page09-control1").text("Réinitialiser");    
            } else if (data['page'] == 13) {        
                $("#txt-test17-page13-count-timer").val(data['count_timer']);
                if (test17_language == 'de')
                    $("#bt-test17-page13-control1").text("Zurücksetzen");
                else
                    $("#bt-test17-page13-control1").text("Réinitialiser");    
            }
            setPatientStatus(0, 1, 0, 0);
            break;

        case "show-page":          
            let page = data['page'];

            switch(page) {
                case 1: case 2: case 3: case 4: case 6: case 7: case 8: case 10: case 11: case 12:
                    $('#MainScreenGame').load('/tests/stroop_vectoria?page=' + page + '&language=' + test17_language, function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test17_OnDocumentEventsOnType(socket, page);

                            if ((page == 3) || (page == 7) || (page == 11)) {
                                setPatientStatus(0, 1, 0, 0);
                            } else if ((page == 2) || (page == 4) || (page == 6) || (page == 8) || (page == 10) || (page == 12)) {
                                setPatientStatus(1, 0, 0, 0);
                            }
                        }
                    });  
                    break;

                case 5: case 9: case 13:
                    $('#MainScreenGame').load('/tests/stroop_vectoria?page=' + page + '&language=' + test17_language, function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test17_OnDocumentEventsOnType(socket, page);      
                            socket.emit('Test17', { 'type' : 'old-status-of-page', 'page' : page });                                                      
                        }
                    });  
                    break;

                case 14:
                    $('#MainScreenGame').load('/tests/stroop_vectoria?page=' + page + '&language=' + test17_language +
                                                                             "&x1=" + data['x1'] + "&y1=" + data['y1'] + "&z1=" + data['z1'] + 
                                                                             "&x2=" + data['x2'] + "&y2=" + data['y2'] + "&z2=" + data['z2'] + 
                                                                             "&x3=" + data['x3'] + "&y3=" + data['y3'] + "&z3=" + data['z3'],
                        function(strResponse, strStatus, xhr) {
                            if (strStatus == "success") {                         
                                test17_OnDocumentEventsOnType(socket, page);       
                                setPatientStatus(1, 0, 0, 0);                                                     
                            }
                        }
                    );  
                    break;

            }            
            break;

        case "start":
            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();                     
            playStream('SmallStream', patientStream_temp);                       

            test17_DocumentEvents = [];

            test17_record_audio = data['record_audio'];
            test17_language = data['language'];
            
            $('#MainScreenGame').load('/tests/stroop_vectoria?page=1&language=' + test17_language, function(strResponse, strStatus, xhr) {
                if (strStatus == "success") {     
                    test17_OnDocumentEventsOnType(socket, 1);                    
                }
            });
            break;   

        case "start-recording": 
            test17_countSecond = 0;
            if (data['page'] == 5) {                
                test17_countTimer("#txt-test17-page05-count-timer");                
            } else if (data['page'] == 9) {        
                test17_countTimer("#txt-test17-page09-count-timer");                
            } else if (data['page'] == 13) {        
                test17_countTimer("#txt-test17-page13-count-timer");
            }
            
            if (test17_record_audio == true) {
                setPatientStatus(0, 1, 1, 0);
            } else {
                setPatientStatus(0, 1, 0, 0);
            }
            break;

        case "stop": 
            test17_OffDocumentEvents();

            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();

            playStream('SmallStream', clinicianStream_temp);
            playStream('LargeStream', patientStream_temp);

            $("#Run_Test17_Stroop_Vectoria").text("Run");
            $("#Run_Test17_Stroop_Vectoria").attr("class","btn btn-info btn-lg btn-block");
            $("#BackListTests_Stroop_Vectoria").removeAttr("disabled");
            $("#Test17_Stroop_Vectoria_Checkbox_Record_Audio").removeAttr("disabled");

            setPatientStatusDefault();
            break;

        case 'store-files':            
            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();

            playStream('SmallStream', clinicianStream_temp);
            playStream('LargeStream', patientStream_temp);

            $("#Run_Test17_Stroop_Vectoria").text("Run");
            $("#Run_Test17_Stroop_Vectoria").attr("class","btn btn-info btn-lg btn-block");
            $("#BackListTests_Stroop_Vectoria").removeAttr("disabled");            

            $('#MainNavigator').load('/tests/mainnavigator', function() {
                $('#Manage_Session').css("display", "block");            
                $('#Select_Sessions').load('/session/list-sessions?idpatient=' + idPatient);
                $('#list_Of_Tests').css("display", "block"); 
                $('#list_Of_Tests').load('/session/load-list-of-tests?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
            });

            test17_OffDocumentEvents();

            break;
        
        case "unselect-color":                        
            test17_unselectColor(data['row'], data['col'], data['page']);            
            break;

        case "unselect-correction":                        
            test17_unselectCorrection(data['row'], data['col'], data['page']);            
            break;

        case 'upload-files':
            $('#Wait_Upload_Tests').css("display", "block"); 
            $('#Wait_Upload_Tests').load('/wait/uploadingfiles');
            
            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();

            playStream('SmallStream', clinicianStream_temp);
            playStream('LargeStream', patientStream_temp);

            $("#Run_Test17_Stroop_Vectoria").text("Run");
            $("#Run_Test17_Stroop_Vectoria").attr("class","btn btn-info btn-lg btn-block");
            $("#BackListTests_Stroop_Vectoria").removeAttr("disabled");            

            $('#MainNavigator').load('/tests/mainnavigator', function() {
                $('#Manage_Session').css("display", "block");            
                $('#Select_Sessions').load('/session/list-sessions?idpatient=' + idPatient);
                $('#list_Of_Tests').css("display", "block"); 
                $('#list_Of_Tests').load('/session/load-list-of-tests?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
            });

            test17_OffDocumentEvents();

            break;
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function test17_OnDocumentEventsOnType(socket, page) {    
    test17_OffDocumentEvents();    
    switch (page) {
        case 1:
            test17_DocumentEvents.push("#bt-test17-page01-continuer");            

            $(document).on("click", "#bt-test17-page01-continuer", function(e) {                              
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 2 });
            });
            break;

        case 2:
            test17_DocumentEvents.push("#bt-test17-page02-retour");
            test17_DocumentEvents.push("#bt-test17-page02-continuer");

            $(document).on("click", "#bt-test17-page02-retour", function(e) {                   
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 1 });
            });

            $(document).on("click", "#bt-test17-page02-continuer", function(e) {                  
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 3 });          
            });
            break;

        case 3:
            test17_DocumentEvents.push("#bt-test17-page03-retour");
            test17_DocumentEvents.push("#bt-test17-page03-continuer");

            $(document).on("click", "#bt-test17-page03-retour", function(e) {                   
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 2 });
            });

            $(document).on("click", "#bt-test17-page03-continuer", function(e) {                  
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 4 });          
            });
            break;

        case 4:
            test17_DocumentEvents.push("#bt-test17-page04-retour");
            test17_DocumentEvents.push("#bt-test17-page04-continuer");

            $(document).on("click", "#bt-test17-page04-retour", function(e) {                   
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 3 });
            });

            $(document).on("click", "#bt-test17-page04-continuer", function(e) {                  
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 5 });          
            });
            break;

        case 5:
            test17_DocumentEvents.push("#bt-test17-page05-control1");
            test17_DocumentEvents.push("#bt-test17-page05-control2");
            test17_DocumentEvents.push("#bt-test17-page05-retour");
            test17_DocumentEvents.push("#bt-test17-page05-continuer"); 

            $(document).on("click", "#bt-test17-page05-control1", function(e) {     
                test17_timerControl1(socket, page, "#txt-test17-page05-count-timer", "#bt-test17-page05-control1", "#bt-test17-page05-control2", 
                                                                                        "#bt-test17-page05-retour", "#bt-test17-page05-continuer");                
            });
        
            $(document).on("click", "#bt-test17-page05-control2", function(e) {                
                test17_timerControl2(socket, page, "#txt-test17-page05-count-timer", "#bt-test17-page05-control1", "#bt-test17-page05-control2", 
                                                                                        "#bt-test17-page05-retour", "#bt-test17-page05-continuer");                
            });

            for(let i = 0; i < TEST17_MAX_ROW; i++)  {
                for(let j = 0; j < TEST17_MAX_COLUMN; j++) {
                    test17_DocumentEvents.push("#bt-test17-page05-color" + i + "-" + j);
                    test17_DocumentEvents.push("#bt-test17-page05-correction" + i + "-" + j);

                    $(document).on("click", "#bt-test17-page05-color" + i + "-" + j, function(e) {                                                                 
                        socket.emit('Test17', { 'type' : 'select-color', 'page' : 5, 'row' : i, 'col' : j }); 
                    });

                    $(document).on("click", "#bt-test17-page05-correction" + i + "-" + j, function(e) {                                                                 
                        socket.emit('Test17', { 'type' : 'select-correction', 'page' : 5, 'row' : i, 'col' : j }); 
                    });
                }
            }

            $(document).on("click", "#bt-test17-page05-retour", function(e) {                   
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 4 });
            });

            $(document).on("click", "#bt-test17-page05-continuer", function(e) {                  
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 6 });          
            });

            break;

        case 6:
            test17_DocumentEvents.push("#bt-test17-page06-retour");
            test17_DocumentEvents.push("#bt-test17-page06-continuer");

            $(document).on("click", "#bt-test17-page06-retour", function(e) {                   
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 5 });
            });

            $(document).on("click", "#bt-test17-page06-continuer", function(e) {                  
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 7 });          
            });
            break;

        case 7:
            test17_DocumentEvents.push("#bt-test17-page07-retour");
            test17_DocumentEvents.push("#bt-test17-page07-continuer");

            $(document).on("click", "#bt-test17-page07-retour", function(e) {                   
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 6 });
            });

            $(document).on("click", "#bt-test17-page07-continuer", function(e) {                  
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 8 });          
            });
            break;

        case 8:
            test17_DocumentEvents.push("#bt-test17-page08-retour");
            test17_DocumentEvents.push("#bt-test17-page08-continuer");

            $(document).on("click", "#bt-test17-page08-retour", function(e) {                   
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 7 });
            });

            $(document).on("click", "#bt-test17-page08-continuer", function(e) {                  
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 9 });          
            });
            break;

        case 9:
            test17_DocumentEvents.push("#bt-test17-page09-control1");
            test17_DocumentEvents.push("#bt-test17-page09-control2");
            test17_DocumentEvents.push("#bt-test17-page09-retour");
            test17_DocumentEvents.push("#bt-test17-page09-continuer");

            $(document).on("click", "#bt-test17-page09-control1", function(e) {     
                test17_timerControl1(socket, page, "#txt-test17-page09-count-timer", "#bt-test17-page09-control1", "#bt-test17-page09-control2", 
                                                                                        "#bt-test17-page09-retour", "#bt-test17-page09-continuer");                
            });
        
            $(document).on("click", "#bt-test17-page09-control2", function(e) {                
                test17_timerControl2(socket, page, "#txt-test17-page09-count-timer", "#bt-test17-page09-control1", "#bt-test17-page09-control2", 
                                                                                        "#bt-test17-page09-retour", "#bt-test17-page09-continuer");                
            });

            for(let i = 0; i < TEST17_MAX_ROW; i++)  {
                for(let j = 0; j < TEST17_MAX_COLUMN; j++) {
                    test17_DocumentEvents.push("#bt-test17-page09-color" + i + "-" + j);
                    test17_DocumentEvents.push("#bt-test17-page09-correction" + i + "-" + j);

                    $(document).on("click", "#bt-test17-page09-color" + i + "-" + j, function(e) {                                                                 
                        socket.emit('Test17', { 'type' : 'select-color', 'page' : 9, 'row' : i, 'col' : j }); 
                    });

                    $(document).on("click", "#bt-test17-page09-correction" + i + "-" + j, function(e) {                                                                 
                        socket.emit('Test17', { 'type' : 'select-correction', 'page' : 9, 'row' : i, 'col' : j }); 
                    });
                }
            }

            $(document).on("click", "#bt-test17-page09-retour", function(e) {                   
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 8 });
            });

            $(document).on("click", "#bt-test17-page09-continuer", function(e) {                  
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 10 });          
            });
            break;

        case 10:
            test17_DocumentEvents.push("#bt-test17-page10-retour");
            test17_DocumentEvents.push("#bt-test17-page10-continuer");

            $(document).on("click", "#bt-test17-page10-retour", function(e) {                   
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 9 });
            });

            $(document).on("click", "#bt-test17-page10-continuer", function(e) {                  
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 11 });          
            });
            break;

        case 11:
            test17_DocumentEvents.push("#bt-test17-page11-retour");
            test17_DocumentEvents.push("#bt-test17-page11-continuer");

            $(document).on("click", "#bt-test17-page11-retour", function(e) {                   
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 10 });
            });

            $(document).on("click", "#bt-test17-page11-continuer", function(e) {                  
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 12 });          
            });
            break;

        case 12:
            test17_DocumentEvents.push("#bt-test17-page12-retour");
            test17_DocumentEvents.push("#bt-test17-page12-continuer");

            $(document).on("click", "#bt-test17-page12-retour", function(e) {                   
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 11 });
            });

            $(document).on("click", "#bt-test17-page12-continuer", function(e) {                  
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 13 });          
            });
            break;

        case 13:
            test17_DocumentEvents.push("#bt-test17-page13-control1");
            test17_DocumentEvents.push("#bt-test17-page13-control2");
            test17_DocumentEvents.push("#bt-test17-page13-retour");
            test17_DocumentEvents.push("#bt-test17-page13-continuer");

            $(document).on("click", "#bt-test17-page13-control1", function(e) {     
                test17_timerControl1(socket, page, "#txt-test17-page13-count-timer", "#bt-test17-page13-control1", "#bt-test17-page13-control2", 
                                                                                        "#bt-test17-page13-retour", "#bt-test17-page13-continuer");                
            });
        
            $(document).on("click", "#bt-test17-page13-control2", function(e) {                
                test17_timerControl2(socket, page, "#txt-test17-page13-count-timer", "#bt-test17-page13-control1", "#bt-test17-page13-control2", 
                                                                                        "#bt-test17-page13-retour", "#bt-test17-page13-continuer");                
            });

            for(let i = 0; i < TEST17_MAX_ROW; i++)  {
                for(let j = 0; j < TEST17_MAX_COLUMN; j++) {
                    test17_DocumentEvents.push("#bt-test17-page13-color" + i + "-" + j);
                    test17_DocumentEvents.push("#bt-test17-page13-correction" + i + "-" + j);

                    $(document).on("click", "#bt-test17-page13-color" + i + "-" + j, function(e) {                                                                 
                        socket.emit('Test17', { 'type' : 'select-color', 'page' : 13, 'row' : i, 'col' : j }); 
                    });

                    $(document).on("click", "#bt-test17-page13-correction" + i + "-" + j, function(e) {                                                                 
                        socket.emit('Test17', { 'type' : 'select-correction', 'page' : 13, 'row' : i, 'col' : j }); 
                    });
                }
            }

            $(document).on("click", "#bt-test17-page13-retour", function(e) {                   
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 12 });
            });

            $(document).on("click", "#bt-test17-page13-continuer", function(e) {                  
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 14 });          
            });
            break;

        case 14:
            test17_DocumentEvents.push("#bt-test17-page14-retour");
            test17_DocumentEvents.push("#bt-test17-page14-terminer");

            $(document).on("click", "#bt-test17-page14-retour", function(e) {                   
                socket.emit('Test17', { 'type' : 'show-page', 'page' : 13 });
            });

            $(document).on("click", "#bt-test17-page14-terminer", function(e) {
                socket.emit('Test17', { 'type' : 'store-values' });                
            });
            break;
    }    
}

function test17_OffDocumentEvents() {      
    for(let i = 0; i < test17_DocumentEvents.length; i++) {        
        $(document).off("click", test17_DocumentEvents[i]);
    }
    test17_DocumentEvents = [];
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function test17_selectColor(row, col, page) {    
    switch (page) {
        case 5:
            $("#bt-test17-page05-color" + row + "-" + col).attr("class", "btn btn-secondary btn-lg");
            break;

        case 9:
            $("#bt-test17-page09-color" + row + "-" + col).attr("class", "btn btn-secondary btn-lg");
            break;

        case 13:
            $("#bt-test17-page13-color" + row + "-" + col).attr("class", "btn btn-secondary btn-lg");
            break;
    }
}

function test17_selectCorrection(row, col, page) {    
    switch (page) {
        case 5:
            $("#bt-test17-page05-correction" + row + "-" + col).attr("class", "btn btn-secondary btn-lg");
            break;

        case 9:
            $("#bt-test17-page09-correction" + row + "-" + col).attr("class", "btn btn-secondary btn-lg");
            break;

        case 13:
            $("#bt-test17-page13-correction" + row + "-" + col).attr("class", "btn btn-secondary btn-lg");
            break;
    }
}

function test17_unselectColor(row, col, page) {    
    switch (page) {
        case 5:
            $("#bt-test17-page05-color" + row + "-" + col).attr("class", "btn btn-outline-secondary btn-lg");
            break;

        case 9:
            $("#bt-test17-page09-color" + row + "-" + col).attr("class", "btn btn-outline-secondary btn-lg");
            break;

        case 13:
            $("#bt-test17-page13-color" + row + "-" + col).attr("class", "btn btn-outline-secondary btn-lg");
            break;
    }
}

function test17_unselectCorrection(row, col, page) {    
    switch (page) {
        case 5:
            $("#bt-test17-page05-correction" + row + "-" + col).attr("class", "btn btn-outline-secondary btn-lg");
            break;

        case 9:
            $("#bt-test17-page09-correction" + row + "-" + col).attr("class", "btn btn-outline-secondary btn-lg");
            break;

        case 13:
            $("#bt-test17-page13-correction" + row + "-" + col).attr("class", "btn btn-outline-secondary btn-lg");
            break;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function test17_countTimer(txtCount) {    
    test17_idInterval = setInterval(frame, 1000);    
    function frame() {        
        test17_countSecond++;             
        $(txtCount).val(test17_countSecond);        
    }
}

function test17_timerControl1(socket, page, txtCount, control1, control2, retour, continuer) {
    if (test17_language == 'de') {
        if ($(control1).text() === "Start") {                    
            $(control1).text("Pause");
            $(control2).css("display", "inline");
            $(control2).text("Stoppen");
            $(retour).css("display", "none");
            $(continuer).css("display", "none");                    

            socket.emit('Test17', { 'type' : 'start-recording', 'page' : page });        
        } else if ($(control1).text() === "Pause") {
            $(control1).text("Wieder aufzunehmen");                    
            $(control2).text("Wiederholen");

            socket.emit('Test17', { 'type' : 'pause', 'page' : page });
        } else if ($(control1).text() === "Wieder aufzunehmen") {
            $(control1).text("Pause");
            $(control2).text("Stoppen");

            socket.emit('Test17', { 'type' : 'reprendre', 'page' : page });
        } else if ($(control1).text() === "Wiederholen") {
            $(control1).text("Pause");
            $(control2).css("display", "inline");
            $(control2).text("Stoppen");
            $(retour).css("display", "none");
            $(continuer).css("display", "none");

            socket.emit('Test17', { 'type' : 'repeat', 'page' : page });
        } else if ($(control1).text() === "Zurücksetzen") {
            $(control1).text("Start");        
            $(control1).css("display", "inline");
            $(control2).css("display", "none");
            $(retour).css("display", "inline");
            $(continuer).css("display", "inline");

            socket.emit('Test17', { 'type' : 'reset', 'page' : page });
        }
    } else {
        if ($(control1).text() === "Commencer") {                    
            $(control1).text("Pause");
            $(control2).css("display", "inline");
            $(control2).text("Arrêter");
            $(retour).css("display", "none");
            $(continuer).css("display", "none");                    

            socket.emit('Test17', { 'type' : 'start-recording', 'page' : page });        
        } else if ($(control1).text() === "Pause") {
            $(control1).text("Reprendre");                    
            $(control2).text("Répéter");

            socket.emit('Test17', { 'type' : 'pause', 'page' : page });
        } else if ($(control1).text() === "Reprendre") {
            $(control1).text("Pause");
            $(control2).text("Arrêter");

            socket.emit('Test17', { 'type' : 'reprendre', 'page' : page });
        } else if ($(control1).text() === "Répéter") {
            $(control1).text("Pause");
            $(control2).css("display", "inline");
            $(control2).text("Arrêter");
            $(retour).css("display", "none");
            $(continuer).css("display", "none");

            socket.emit('Test17', { 'type' : 'repeat', 'page' : page });
        } else if ($(control1).text() === "Réinitialiser") {
            $(control1).text("Commencer");        
            $(control1).css("display", "inline");
            $(control2).css("display", "none");
            $(retour).css("display", "inline");
            $(continuer).css("display", "inline");

            socket.emit('Test17', { 'type' : 'reset', 'page' : page });
        }
    }
}

function test17_timerControl2(socket, page, txtCount, control1, control2, retour, continuer) {
    if (test17_language == 'de') {
        if ($(control2).text() === "Stoppen") {                    
            $(control1).text("Zurücksetzen");
            $(control2).css("display", "none");
            $(retour).css("display", "inline");
            $(continuer).css("display", "inline");
    
            socket.emit('Test17', { 'type' : 'arreter', 'page' : page, 'count_timer' : test17_countSecond });
            setPatientStatus(0, 1, 0, 0);
        } else if ($(control2).text() === "Wiederholen") {                                                        
            $(control1).text("Pause");
            $(control2).text("Stoppen");
    
            socket.emit('Test17', { 'type' : 'repeat', 'page' : page });
        }
    } else {
        if ($(control2).text() === "Arrêter") {                    
            $(control1).text("Réinitialiser");
            $(control2).css("display", "none");
            $(retour).css("display", "inline");
            $(continuer).css("display", "inline");
    
            socket.emit('Test17', { 'type' : 'arreter', 'page' : page, 'count_timer' : test17_countSecond });
            setPatientStatus(0, 1, 0, 0);
        } else if ($(control2).text() === "Répéter") {                                                        
            $(control1).text("Pause");
            $(control2).text("Arrêter");
    
            socket.emit('Test17', { 'type' : 'repeat', 'page' : page });
        }
    }
}