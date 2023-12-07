let test40_countSecond;
let test40_idInterval;

let test40_DocumentEvents;

let test40_page3_audioRecorder;
let test40_page3_mediaRecorder;
let test40_page3_recordedBlob;

let test40_page5_audioRecorder;
let test40_page5_mediaRecorder;
let test40_page5_recordedBlob;

let test40_page7_audioRecorder;
let test40_page7_mediaRecorder;
let test40_page7_recordedBlob;

let test40_idPathFolder;
let test40_pathSession;

const TEST40_MAX_COLUMN = 4;
const TEST40_MAX_ROW = 6;

let test40_record_audio;
let test40_language;

let test40_shortcut = 0;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

socket.on('Test40', function(data) {    
    let type = data['type'];
    
    switch (type) {
        case "arreter":
            clearInterval(test40_idInterval);

            if (test40_record_audio == true)
                test40_arreter(data['page']);

            break;
        
        case "finish":
            test40_OffDocumentEvents();
            test40_close();
            returnListOfTests();

            break;

        case "pause": case "arreter":
            clearInterval(test40_idInterval);
            break;

        case "reset": 
            if (test40_record_audio == true)
                test40_resetParameters(0);
            break;

        case "repeat":
            test40_countSecond = 0;

            if (data['page'] == 3) {                
                $("#txt-test40-page03-count-timer").val("0");
                test40_countTimer("#txt-test40-page03-count-timer");
            } else if (data['page'] == 5) {        
                $("#txt-test40-page05-count-timer").val("0");
                test40_countTimer("#txt-test40-page05-count-timer");
            } else if (data['page'] == 7) {        
                $("#txt-test40-page07-count-timer").val("0");
                test40_countTimer("#txt-test40-page07-count-timer");
            }

            if (test40_record_audio == true) 
                test40_repeat(data['page']);

            break;

        case "reprendre":
            if (data['page'] == 3) {                
                test40_countTimer("#txt-test40-page03-count-timer");
            } else if (data['page'] == 5) {        
                test40_countTimer("#txt-test40-page05-count-timer");
            } else if (data['page'] == 7) {        
                test40_countTimer("#txt-test40-page07-count-timer");
            }
            break;

        case "reset":
            test40_countSecond = 0;
            if (data['page'] == 3) {                
                $("#txt-test40-page03-count-timer").val("0");
            } else if (data['page'] == 5) {        
                $("#txt-test40-page05-count-timer").val("0");
            } else if (data['page'] == 7) {        
                $("#txt-test40-page07-count-timer").val("0");
            }

            break;

        case "select-color":                        
            test40_selectColor(data['row'], data['col'], data['page']);            
            break;

        case "select-correction":                        
            test40_selectCorrection(data['row'], data['col'], data['page']);            
            break;

        case "set-start-recording":
            if (data['page'] == 3) {                
                if (test40_language == 'de')
                    $("#bt-test40-page03-control1").text("Start");
                else
                    $("#bt-test40-page03-control1").text("Commencer");

                test40_timerControl1(socket, data['page'], "#txt-test40-page03-count-timer", "#bt-test40-page03-control1", "#bt-test40-page03-control2", 
                                                                                        "#bt-test40-page03-retour", "#bt-test40-page03-continuer"); 
            } else if (data['page'] == 5) {        
                if (test40_language == 'de')
                    $("#bt-test40-page05-control1").text("Start");
                else
                    $("#bt-test40-page05-control1").text("Commencer");
                
                test40_timerControl1(socket, data['page'], "#txt-test40-page05-count-timer", "#bt-test40-page05-control1", "#bt-test40-page05-control2", 
                                                                                        "#bt-test40-page05-retour", "#bt-test40-page05-continuer"); 
            } else if (data['page'] == 7) {        
                if (test40_language == 'de')
                    $("#bt-test40-page07-control1").text("Start");
                else
                    $("#bt-test40-page07-control1").text("Commencer");                
                                
                test40_timerControl1(socket, data['page'], "#txt-test40-page07-count-timer", "#bt-test40-page07-control1", "#bt-test40-page07-control2", 
                                                                                        "#bt-test40-page07-retour", "#bt-test40-page07-continuer"); 
            }

            if (test40_record_audio == true) {
                setPatientStatus(0, 1, 1, 0);
            } else {
                setPatientStatus(0, 1, 0, 0);
            }
            break;

        case "set-status-recorded":
            if (data['page'] == 3) {                
                $("#txt-test40-page03-count-timer").val(data['count_timer']);                
                if (test40_language == 'de')
                    $("#bt-test40-page03-control1").text("Zurücksetzen");
                else                
                    $("#bt-test40-page03-control1").text("Réinitialiser");    
            } else if (data['page'] == 5) {        
                $("#txt-test40-page05-count-timer").val(data['count_timer']);
                if (test40_language == 'de')
                    $("#bt-test40-page05-control1").text("Zurücksetzen");
                else
                    $("#bt-test40-page05-control1").text("Réinitialiser");    
            } else if (data['page'] == 7) {        
                $("#txt-test40-page07-count-timer").val(data['count_timer']);
                if (test40_language == 'de')
                    $("#bt-test40-page07-control1").text("Zurücksetzen");
                else
                    $("#bt-test40-page07-control1").text("Réinitialiser");    
            }
            setPatientStatus(0, 1, 0, 0);
            break;

        case "show-page":          
            let page = data['page'];

            switch(page) {
                case 1: case 2: case 4: case 6:
                    $('#MainScreenGame').load('/tests/stroop_victoria_2?page=' + page + '&language=' + test40_language, function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test40_OnDocumentEventsOnType(socket, page);
                            setPatientStatus(1, 0, 0, 0);
                        }
                    });  
                    break;

                case 3: case 5: case 7:
                    $('#MainScreenGame').load('/tests/stroop_victoria_2?page=' + page + '&language=' + test40_language, function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {                         
                            test40_OnDocumentEventsOnType(socket, page);
                            setPatientStatus(0, 1, 0, 0);  
                            socket.emit('Test40', { 'type' : 'old-status-of-page', 'page' : page });                                                      
                        }
                    });  
                    break;

                case 8:
                    $('#MainScreenGame').load('/tests/stroop_victoria_2?page=' + page + '&language=' + test40_language +
                                                                             "&x1=" + data['x1'] + "&y1=" + data['y1'] + "&z1=" + data['z1'] + 
                                                                             "&x2=" + data['x2'] + "&y2=" + data['y2'] + "&z2=" + data['z2'] + 
                                                                             "&x3=" + data['x3'] + "&y3=" + data['y3'] + "&z3=" + data['z3'],
                        function(strResponse, strStatus, xhr) {
                            if (strStatus == "success") {                         
                                test40_OnDocumentEventsOnType(socket, page);       
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

            test40_DocumentEvents = [];

            test40_record_audio = data['record_audio'];
            test40_language = data['language'];
            test40_shortcut = data['shortcut'];
            
            $('#MainScreenGame').load('/tests/stroop_victoria_2?page=1&language=' + test40_language, function(strResponse, strStatus, xhr) {
                if (strStatus == "success") {     
                    test40_OnDocumentEventsOnType(socket, 1);                    
                }
            });
            break;   

        case "start-recording": 
            test40_countSecond = 0;
            if (data['page'] == 3) {                
                test40_countTimer("#txt-test40-page03-count-timer");                
            } else if (data['page'] == 5) {        
                test40_countTimer("#txt-test40-page05-count-timer");                
            } else if (data['page'] == 7) {        
                test40_countTimer("#txt-test40-page07-count-timer");
            }
            
            if (test40_record_audio == true) {
                test40_startRecording(data['page']);

                setPatientStatus(0, 1, 1, 0);
            } else {
                setPatientStatus(0, 1, 0, 0);
            }
            break;

        case "stop": 
            test40_OffDocumentEvents();
            test40_close();
            $("#Test40_Stroop_Victoria_2_Checkbox_Record_Audio").removeAttr("disabled");
            setPatientStatusDefault();
            break;

        case 'store-files':            
            test40_close();
            returnListOfTests();
            test40_OffDocumentEvents();

            break;

        case "store-files-in-clinician":
            if (test40_record_audio == true) {
                test40_idPathFolder = data["id_path_folder"];
                test40_pathSession = data["path_session"];

                test40_storeFiles();

                test40_close();
                returnListOfTests();
                test40_OffDocumentEvents();
                setPatientStatusDefault();      
            }      
            break;
        
        case "unselect-color":                        
            test40_unselectColor(data['row'], data['col'], data['page']);            
            break;

        case "unselect-correction":                        
            test40_unselectCorrection(data['row'], data['col'], data['page']);            
            break;

        case 'upload-files':
            $('#Wait_Upload_Tests').css("display", "block"); 
            $('#Wait_Upload_Tests').load('/wait/uploadingfiles');
            
            test40_close();
            returnListOfTests();

            test40_OffDocumentEvents();

            break;
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function test40_OnDocumentEventsOnType(socket, page) {    
    test40_OffDocumentEvents();    
    switch (page) {
        case 1:
            test40_DocumentEvents.push("#bt-test40-page01-continuer");            

            $(document).on("click", "#bt-test40-page01-continuer", function(e) {                              
                socket.emit('Test40', { 'type' : 'show-page', 'page' : 2 });
            });
            break;

        case 2:
            test40_DocumentEvents.push("#bt-test40-page02-retour");
            test40_DocumentEvents.push("#bt-test40-page02-continuer");

            $(document).on("click", "#bt-test40-page02-retour", function(e) {                   
                socket.emit('Test40', { 'type' : 'show-page', 'page' : 1 });
            });

            $(document).on("click", "#bt-test40-page02-continuer", function(e) {                  
                socket.emit('Test40', { 'type' : 'show-page', 'page' : 3 });          
            });
            break;

        case 3:
            test40_DocumentEvents.push("#bt-test40-page03-control1");
            test40_DocumentEvents.push("#bt-test40-page03-control2");
            test40_DocumentEvents.push("#bt-test40-page03-retour");
            test40_DocumentEvents.push("#bt-test40-page03-continuer"); 

            $(document).on("click", "#bt-test40-page03-control1", function(e) {     
                test40_timerControl1(socket, page, "#txt-test40-page03-count-timer", "#bt-test40-page03-control1", "#bt-test40-page03-control2", 
                                                                                        "#bt-test40-page03-retour", "#bt-test40-page03-continuer");                
            });
        
            $(document).on("click", "#bt-test40-page03-control2", function(e) {                
                test40_timerControl2(socket, page, "#txt-test40-page03-count-timer", "#bt-test40-page03-control1", "#bt-test40-page03-control2", 
                                                                                        "#bt-test40-page03-retour", "#bt-test40-page03-continuer");                
            });

            for(let i = 0; i < TEST40_MAX_ROW; i++)  {
                for(let j = 0; j < TEST40_MAX_COLUMN; j++) {
                    test40_DocumentEvents.push("#bt-test40-page03-color" + i + "-" + j);
                    test40_DocumentEvents.push("#bt-test40-page03-correction" + i + "-" + j);

                    $(document).on("click", "#bt-test40-page03-color" + i + "-" + j, function(e) {                                                                 
                        socket.emit('Test40', { 'type' : 'select-color', 'page' : 3, 'row' : i, 'col' : j }); 
                    });

                    $(document).on("click", "#bt-test40-page03-correction" + i + "-" + j, function(e) {                                                                 
                        socket.emit('Test40', { 'type' : 'select-correction', 'page' : 3, 'row' : i, 'col' : j }); 
                    });
                }
            }

            $(document).on("click", "#bt-test40-page03-retour", function(e) {                   
                socket.emit('Test40', { 'type' : 'show-page', 'page' : 2 });
            });

            $(document).on("click", "#bt-test40-page03-continuer", function(e) {                  
                socket.emit('Test40', { 'type' : 'show-page', 'page' : 4 });          
            });

            break;

        case 4:
            test40_DocumentEvents.push("#bt-test40-page04-retour");
            test40_DocumentEvents.push("#bt-test40-page04-continuer");

            $(document).on("click", "#bt-test40-page04-retour", function(e) {                   
                socket.emit('Test40', { 'type' : 'show-page', 'page' : 3 });
            });

            $(document).on("click", "#bt-test40-page04-continuer", function(e) {                  
                socket.emit('Test40', { 'type' : 'show-page', 'page' : 5 });          
            });
            break;

        case 5:
            test40_DocumentEvents.push("#bt-test40-page05-control1");
            test40_DocumentEvents.push("#bt-test40-page05-control2");
            test40_DocumentEvents.push("#bt-test40-page05-retour");
            test40_DocumentEvents.push("#bt-test40-page05-continuer");

            $(document).on("click", "#bt-test40-page05-control1", function(e) {     
                test40_timerControl1(socket, page, "#txt-test40-page05-count-timer", "#bt-test40-page05-control1", "#bt-test40-page05-control2", 
                                                                                        "#bt-test40-page05-retour", "#bt-test40-page05-continuer");                
            });
        
            $(document).on("click", "#bt-test40-page05-control2", function(e) {                
                test40_timerControl2(socket, page, "#txt-test40-page05-count-timer", "#bt-test40-page05-control1", "#bt-test40-page05-control2", 
                                                                                        "#bt-test40-page05-retour", "#bt-test40-page05-continuer");                
            });

            for(let i = 0; i < TEST40_MAX_ROW; i++)  {
                for(let j = 0; j < TEST40_MAX_COLUMN; j++) {
                    test40_DocumentEvents.push("#bt-test40-page05-color" + i + "-" + j);
                    test40_DocumentEvents.push("#bt-test40-page05-correction" + i + "-" + j);

                    $(document).on("click", "#bt-test40-page05-color" + i + "-" + j, function(e) {                                                                 
                        socket.emit('Test40', { 'type' : 'select-color', 'page' : 5, 'row' : i, 'col' : j }); 
                    });

                    $(document).on("click", "#bt-test40-page05-correction" + i + "-" + j, function(e) {                                                                 
                        socket.emit('Test40', { 'type' : 'select-correction', 'page' : 5, 'row' : i, 'col' : j }); 
                    });
                }
            }

            $(document).on("click", "#bt-test40-page05-retour", function(e) {                   
                socket.emit('Test40', { 'type' : 'show-page', 'page' : 4 });
            });

            $(document).on("click", "#bt-test40-page05-continuer", function(e) {                  
                socket.emit('Test40', { 'type' : 'show-page', 'page' : 6 });          
            });
            break;

        case 6:
            test40_DocumentEvents.push("#bt-test40-page06-retour");
            test40_DocumentEvents.push("#bt-test40-page06-continuer");

            $(document).on("click", "#bt-test40-page06-retour", function(e) {                   
                socket.emit('Test40', { 'type' : 'show-page', 'page' : 5 });
            });

            $(document).on("click", "#bt-test40-page06-continuer", function(e) {                  
                socket.emit('Test40', { 'type' : 'show-page', 'page' : 7 });          
            });
            break;

        case 7:
            test40_DocumentEvents.push("#bt-test40-page07-control1");
            test40_DocumentEvents.push("#bt-test40-page07-control2");
            test40_DocumentEvents.push("#bt-test40-page07-retour");
            test40_DocumentEvents.push("#bt-test40-page07-continuer");

            $(document).on("click", "#bt-test40-page07-control1", function(e) {     
                test40_timerControl1(socket, page, "#txt-test40-page07-count-timer", "#bt-test40-page07-control1", "#bt-test40-page07-control2", 
                                                                                        "#bt-test40-page07-retour", "#bt-test40-page07-continuer");
            });
        
            $(document).on("click", "#bt-test40-page07-control2", function(e) {                
                test40_timerControl2(socket, page, "#txt-test40-page07-count-timer", "#bt-test40-page07-control1", "#bt-test40-page07-control2", 
                                                                                        "#bt-test40-page07-retour", "#bt-test40-page07-continuer");                
            });

            for(let i = 0; i < TEST40_MAX_ROW; i++)  {
                for(let j = 0; j < TEST40_MAX_COLUMN; j++) {
                    test40_DocumentEvents.push("#bt-test40-page07-color" + i + "-" + j);
                    test40_DocumentEvents.push("#bt-test40-page07-correction" + i + "-" + j);

                    $(document).on("click", "#bt-test40-page07-color" + i + "-" + j, function(e) {                                                                 
                        socket.emit('Test40', { 'type' : 'select-color', 'page' : 7, 'row' : i, 'col' : j }); 
                    });

                    $(document).on("click", "#bt-test40-page07-correction" + i + "-" + j, function(e) {                                                                 
                        socket.emit('Test40', { 'type' : 'select-correction', 'page' : 7, 'row' : i, 'col' : j }); 
                    });
                }
            }

            $(document).on("click", "#bt-test40-page07-retour", function(e) {                   
                socket.emit('Test40', { 'type' : 'show-page', 'page' : 6 });
            });

            $(document).on("click", "#bt-test40-page07-continuer", function(e) {                  
                socket.emit('Test40', { 'type' : 'show-page', 'page' : 8 });          
            });
            break;

        case 8:
            test40_DocumentEvents.push("#bt-test40-page08-retour");
            test40_DocumentEvents.push("#bt-test40-page08-terminer");

            $(document).on("click", "#bt-test40-page08-retour", function(e) {                   
                socket.emit('Test40', { 'type' : 'show-page', 'page' : 7 });
            });

            $(document).on("click", "#bt-test40-page08-terminer", function(e) {
                socket.emit('Test40', { 'type' : 'store-values' });                
            });
            break;
    }    
}

function test40_OffDocumentEvents() {      
    for(let i = 0; i < test40_DocumentEvents.length; i++) {        
        $(document).off("click", test40_DocumentEvents[i]);
    }
    test40_DocumentEvents = [];
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function test40_selectColor(row, col, page) {    
    switch (page) {
        case 3:
            $("#bt-test40-page03-color" + row + "-" + col).attr("class", "btn btn-secondary btn-lg");
            break;

        case 5:
            $("#bt-test40-page05-color" + row + "-" + col).attr("class", "btn btn-secondary btn-lg");
            break;

        case 7:
            $("#bt-test40-page07-color" + row + "-" + col).attr("class", "btn btn-secondary btn-lg");
            break;
    }
}

function test40_selectCorrection(row, col, page) {    
    switch (page) {
        case 3:
            $("#bt-test40-page03-correction" + row + "-" + col).attr("class", "btn btn-secondary btn-lg");
            break;

        case 5:
            $("#bt-test40-page05-correction" + row + "-" + col).attr("class", "btn btn-secondary btn-lg");
            break;

        case 7:
            $("#bt-test40-page07-correction" + row + "-" + col).attr("class", "btn btn-secondary btn-lg");
            break;
    }
}

function test40_unselectColor(row, col, page) {    
    switch (page) {
        case 3:
            $("#bt-test40-page03-color" + row + "-" + col).attr("class", "btn btn-outline-secondary btn-lg");
            break;

        case 5:
            $("#bt-test40-page05-color" + row + "-" + col).attr("class", "btn btn-outline-secondary btn-lg");
            break;

        case 7:
            $("#bt-test40-page07-color" + row + "-" + col).attr("class", "btn btn-outline-secondary btn-lg");
            break;
    }
}

function test40_unselectCorrection(row, col, page) {    
    switch (page) {
        case 3:
            $("#bt-test40-page03-correction" + row + "-" + col).attr("class", "btn btn-outline-secondary btn-lg");
            break;

        case 5:
            $("#bt-test40-page05-correction" + row + "-" + col).attr("class", "btn btn-outline-secondary btn-lg");
            break;

        case 7:
            $("#bt-test40-page07-correction" + row + "-" + col).attr("class", "btn btn-outline-secondary btn-lg");
            break;
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function test40_countTimer(txtCount) {    
    test40_idInterval = setInterval(frame, 1000);    
    function frame() {        
        test40_countSecond++;             
        $(txtCount).val(test40_countSecond);        
    }
}

function test40_timerControl1(socket, page, txtCount, control1, control2, retour, continuer) {
    if (test40_language == 'de') {
        if ($(control1).text() === "Start") {                    
            $(control1).text("Pause");
            $(control2).css("display", "inline");
            $(control2).text("Stoppen");
            $(retour).css("display", "none");
            $(continuer).css("display", "none");                    

            socket.emit('Test40', { 'type' : 'start-recording', 'page' : page });        
        } else if ($(control1).text() === "Pause") {
            $(control1).text("Wieder aufzunehmen");                    
            $(control2).text("Wiederholen");

            socket.emit('Test40', { 'type' : 'pause', 'page' : page });
        } else if ($(control1).text() === "Wieder aufzunehmen") {
            $(control1).text("Pause");
            $(control2).text("Stoppen");

            socket.emit('Test40', { 'type' : 'reprendre', 'page' : page });
        } else if ($(control1).text() === "Wiederholen") {
            $(control1).text("Pause");
            $(control2).css("display", "inline");
            $(control2).text("Stoppen");
            $(retour).css("display", "none");
            $(continuer).css("display", "none");

            socket.emit('Test40', { 'type' : 'repeat', 'page' : page });
        } else if ($(control1).text() === "Zurücksetzen") {
            $(control1).text("Start");        
            $(control1).css("display", "inline");
            $(control2).css("display", "none");
            $(retour).css("display", "inline");
            $(continuer).css("display", "inline");

            socket.emit('Test40', { 'type' : 'reset', 'page' : page });
        }
    } else {
        if ($(control1).text() === "Commencer") {                    
            $(control1).text("Pause");
            $(control2).css("display", "inline");
            $(control2).text("Arrêter");
            $(retour).css("display", "none");
            $(continuer).css("display", "none");                    

            socket.emit('Test40', { 'type' : 'start-recording', 'page' : page });        
        } else if ($(control1).text() === "Pause") {
            $(control1).text("Reprendre");                    
            $(control2).text("Répéter");

            socket.emit('Test40', { 'type' : 'pause', 'page' : page });
        } else if ($(control1).text() === "Reprendre") {
            $(control1).text("Pause");
            $(control2).text("Arrêter");

            socket.emit('Test40', { 'type' : 'reprendre', 'page' : page });
        } else if ($(control1).text() === "Répéter") {
            $(control1).text("Pause");
            $(control2).css("display", "inline");
            $(control2).text("Arrêter");
            $(retour).css("display", "none");
            $(continuer).css("display", "none");

            socket.emit('Test40', { 'type' : 'repeat', 'page' : page });
        } else if ($(control1).text() === "Réinitialiser") {
            $(control1).text("Commencer");        
            $(control1).css("display", "inline");
            $(control2).css("display", "none");
            $(retour).css("display", "inline");
            $(continuer).css("display", "inline");

            socket.emit('Test40', { 'type' : 'reset', 'page' : page });
        }
    }
}

function test40_timerControl2(socket, page, txtCount, control1, control2, retour, continuer) {
    if (test40_language == 'de') {
        if ($(control2).text() === "Stoppen") {                    
            $(control1).text("Zurücksetzen");
            $(control2).css("display", "none");
            $(retour).css("display", "inline");
            $(continuer).css("display", "inline");
    
            socket.emit('Test40', { 'type' : 'arreter', 'page' : page, 'count_timer' : test40_countSecond });
            setPatientStatus(0, 1, 0, 0);
        } else if ($(control2).text() === "Wiederholen") {                                                        
            $(control1).text("Pause");
            $(control2).text("Stoppen");
    
            socket.emit('Test40', { 'type' : 'repeat', 'page' : page });
        }
    } else {
        if ($(control2).text() === "Arrêter") {                    
            $(control1).text("Réinitialiser");
            $(control2).css("display", "none");
            $(retour).css("display", "inline");
            $(continuer).css("display", "inline");
    
            socket.emit('Test40', { 'type' : 'arreter', 'page' : page, 'count_timer' : test40_countSecond });
            setPatientStatus(0, 1, 0, 0);
        } else if ($(control2).text() === "Répéter") {                                                        
            $(control1).text("Pause");
            $(control2).text("Arrêter");
    
            socket.emit('Test40', { 'type' : 'repeat', 'page' : page });
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test40_close() {
    if (test40_shortcut == 0)            
        closeTest("#Run_Test40_Stroop_Victoria_2", "#BackListTests_Stroop_Victoria_2", "");
    else if (test40_shortcut == 1)
        closeTest("#Run_Test40_Stroop_Victoria_2_SC1", "#BackListTests_Stroop_Victoria_2_SC1", "");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test40_arreter(page) {    
    if (page == 3) {        
        test40_page3_mediaRecorder.stop();         
    } else if (page == 9) {
        test40_page5_mediaRecorder.stop();
    } else if (page == 13) {
        test40_page7_mediaRecorder.stop();
    }
}

function test40_repeat(page) {    
    test40_startRecording(page);    
}

function test40_resetParameters(page) {
    if (page == 0) {
        test40_page3_audioRecorder = null;    
        test40_page3_mediaRecorder = null;
        test40_page3_recordedBlob = [];
        test40_page5_audioRecorder = null;
        test40_page5_mediaRecorder = null;
        test40_page5_recordedBlob = [];
        test40_page7_audioRecorder = null;
        test40_page7_mediaRecorder = null;
        test40_page7_recordedBlob = [];
    } else if (page == 3) {    
        test40_page3_audioRecorder = null;    
        test40_page3_mediaRecorder = null;
        test40_page3_recordedBlob = [];
    } else if (page == 5) {    
        test40_page5_audioRecorder = null;
        test40_page5_mediaRecorder = null;
        test40_page5_recordedBlob = [];
    } else if (page == 7) {
        test40_page7_audioRecorder = null;
        test40_page7_mediaRecorder = null;
        test40_page7_recordedBlob = [];
    } 
}

function test40_startRecording(page) { 
    test40_resetParameters(page);       

    if (page == 3) {    
        try {    
            test40_page3_audioRecorder = new MediaStream(patientStream_temp.getAudioTracks());    
            test40_page3_mediaRecorder = new MediaRecorder(test40_page3_audioRecorder, {mimeType: 'audio/webm;codecs=opus'});  
        } catch (e) {
            return;
        }

        test40_page3_mediaRecorder.onstop = (event) => {            
        };

        test40_page3_mediaRecorder.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {            
                test40_page3_recordedBlob.push(event.data);
            }             
        });

        test40_page3_mediaRecorder.start(10); // collect 10ms of data
    } else if (page == 5) {
        try {    
            test40_page5_audioRecorder = new MediaStream(patientStream_temp.getAudioTracks());    
            test40_page5_mediaRecorder = new MediaRecorder(test40_page5_audioRecorder, {mimeType: 'audio/webm;codecs=opus'});  
        } catch (e) {
            return;
        }

        test40_page5_mediaRecorder.onstop = (event) => {         
        };

        test40_page5_mediaRecorder.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {            
                test40_page5_recordedBlob.push(event.data);
            }             
        });

        test40_page5_mediaRecorder.start(10); // collect 10ms of data
    } else if (page == 7) {
        try {    
            test40_page7_audioRecorder = new MediaStream(patientStream_temp.getAudioTracks());    
            test40_page7_mediaRecorder = new MediaRecorder(test40_page7_audioRecorder, {mimeType: 'audio/webm;codecs=opus'});
        } catch (e) {
            return;
        }

        test40_page7_mediaRecorder.onstop = (event) => {         
        };

        test40_page7_mediaRecorder.ondataavailable = ((event) => {
            if (event.data && event.data.size > 0) {            
                test40_page7_recordedBlob.push(event.data);
            }             
        });

        test40_page7_mediaRecorder.start(10); // collect 10ms of data
    }
}

function test40_storeFiles() {
    if (test40_page3_mediaRecorder != null) {
        let blobMain = new Blob(test40_page3_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test40_idPathFolder + '__' + test40_pathSession + '__Stroop_Victoria_2__audio1.webm');
        test40_resetParameters(3);
        console.log("Test40 audio1 stored");
    }

    if (test40_page5_mediaRecorder != null) {
        let blobMain = new Blob(test40_page5_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test40_idPathFolder + '__' + test40_pathSession + '__Stroop_Victoria_2__audio2.webm');
        test40_resetParameters(5);
        console.log("Test40 audio2 stored");
    }

    if (test40_page7_mediaRecorder != null) {
        let blobMain = new Blob(test40_page7_recordedBlob, {type: 'audio/webm'});
        saveAs(blobMain, test40_idPathFolder + '__' + test40_pathSession + '__Stroop_Vectoria_2__audio3.webm');
        test40_resetParameters(7);
        console.log("Test40 audio3 stored");
    }
}