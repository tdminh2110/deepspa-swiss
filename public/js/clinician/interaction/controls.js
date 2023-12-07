//Session ////////////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#Create_Session", function(e) {
    session_OffDocumentEvents(list_of_sessions_of_patient);
          
    $('#list_Of_Tests').css("display", "none");
    $('#Session_Take_Photo').css("display", "none");
    clearInterval(sessionIDInterval);
    sessionCountSecond = 0;
    $('#Session_Timer').css("display", "none");
    $('#Session_Timer_Start').css("display", "none");
    $('#Session_Timer_Stop').css("display", "none");  
    $('#Session_Timer_Reset').css("display", "none");
    $('#Select_Sessions').load('/session/create-session', function() {
        socket.emit('Clinician', { 'type' : 'get list of sessions', 'email' : myEmail });
    });
});

$(document).on("click", "#Save_Commentaires_Session", function(e) {
    $.ajax("/session/update-commentaires", {
        type: "POST",
        data: { 'idsession' :  idSelectedSession, 'commentaires' : $("#Commentaires_Session").val() },
        success: function (data, status, xhr) {
            $("#Save_Commentaires_Session").css('display', 'none');
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert("there is some error");
        }
    });
});

$(document).on("input", "#Commentaires_Session", function(e) {
    if ( $("#Save_Commentaires_Session").css('display') == 'none') {
        $("#Save_Commentaires_Session").css('display', 'inline');
    }
});

function session_OnDocumentEvents(listOfSessions) {
    for(let i = 0; i < listOfSessions.length; i++)  {
        $(document).on("click", "#" + listOfSessions[i], function(e) {  
            idSelectedSession = $(this).attr('value');
            selectedSessionName = $(this).text();
            $('#list_Of_Tests').css("display", "block"); 
            $('#list_Of_Tests').load('/session/load-list-of-tests?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
            $("#Window_Commentaires_Session").css("display", "block");
            $('#Window_Commentaires_Session').load('/session/load-commentaires?idsession=' + idSelectedSession);
            $('#Session_Take_Photo').css("display", "inline");

            clearInterval(sessionIDInterval);
            sessionCountSecond = 0;
            $('#Session_Timer').css("display", "inline");
            $('#Session_Timer_Start').css("display", "inline");
            $('#Session_Timer_Stop').css("display", "inline");  
            $('#Session_Timer_Reset').css("display", "inline");
            $('#Session_Timer').text("00:00:00");
            $('#Session_Timer_Start').removeAttr("disabled");
            $('#Session_Timer_Stop').attr('disabled', true);    
            $('#Session_Timer_Reset').removeAttr("disabled");
        });
    }
}

function session_OffDocumentEvents(listOfSessions) {        
    for(let i = 0; i < listOfSessions.length; i++)  {
        $(document).off("click", "#" + listOfSessions[i]);
    }
}

//Status of Patient ////////////////////////////////////////////////////////////////////////////////////////////////

function setPatientStatusDefault() {
    setPatientStatus(1, 0, 0, 0);
}

function setPatientStatus(statusSeeingClinician, statusSeeingContent, statusBeingRecordedAudio, statusBeingRecordedVideo) {
    if (statusSeeingClinician == 1) {
        $("#ImgSeeingClinician").css("display", "inline");
    } else if (statusSeeingClinician == 0) {
        $("#ImgSeeingClinician").css("display", "none");
    }

    if (statusSeeingContent == 1) {
        $("#ImgSeeingContent").css("display", "inline");
    } else if (statusSeeingContent == 0) {
        $("#ImgSeeingContent").css("display", "none");
    }

    if (statusBeingRecordedAudio == 1) {
        $("#ImgRecordingAudio").css("display", "inline");
    } else if (statusBeingRecordedAudio == 0) {
        $("#ImgRecordingAudio").css("display", "none");
    }

    if (statusBeingRecordedVideo == 1) {
        $("#ImgRecordingVideo").css("display", "inline");
    } else if (statusBeingRecordedVideo == 0) {
        $("#ImgRecordingVideo").css("display", "none");
    }

    if ((statusBeingRecordedVideo == 0) && (statusBeingRecordedAudio == 0)) {
        $("#ImgNoRecording").css("display", "inline");
    } else {
        $("#ImgNoRecording").css("display", "none");
    }
}

function setPatientUploading(statusUploadStoreMedia) {    
    if (statusUploadStoreMedia == 0) {
        $("#ImgUploadingServer").css("display", "inline");
        $("#ImgUploadingLocal").css("display", "none");
        $("#ImgUploadingServerLocal").css("display", "none");
    } else if (statusUploadStoreMedia == 1) {
        $("#ImgUploadingServer").css("display", "none");
        $("#ImgUploadingLocal").css("display", "inline");
        $("#ImgUploadingServerLocal").css("display", "none");
    } else if (statusUploadStoreMedia == 2) {
        $("#ImgUploadingServer").css("display", "none");
        $("#ImgUploadingLocal").css("display", "none");
        $("#ImgUploadingServerLocal").css("display", "inline");
    }
}

//Mute ///////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#MuteLocal", function(e) {
    //socket.disconnect();

    if (sendStream_temp.getAudioTracks()[0].enabled == true ) {
        sendStream_temp.getAudioTracks()[0].enabled = false;            
        $("#MuteLocal")
            .removeClass('fa-microphone-alt')
            .addClass('fa-microphone-alt-slash')

    } else {
        sendStream_temp.getAudioTracks()[0].enabled = true;            
        $("#MuteLocal")
            .removeClass('fa-microphone-alt-slash')
            .addClass('fa-microphone-alt')
    }
});

// Taking a photo ////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#Session_Take_Photo", function(e) {    
    socket.emit('Clinician', { 'type' : 'take-photo', 'idselectedsession' : idSelectedSession });  
});

// Session Timer ////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#Session_Timer_Start", function(e) {
    $('#Session_Timer_Start').attr('disabled', true);
    $('#Session_Timer_Stop').removeAttr("disabled");
    $('#Session_Timer_Reset').attr('disabled', true);

    sessionIDInterval = setInterval(frame, 1000);

    function frame() {
        sessionCountSecond++;

        let hours = parseInt(sessionCountSecond / 3600);
        let minutes = parseInt((sessionCountSecond - hours * 3600) / 60);
        let seconds = parseInt(sessionCountSecond - hours * 3600 - minutes * 60);

        $('#Session_Timer').text(String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0'));
    }
});

$(document).on("click", "#Session_Timer_Stop", function(e) {
    $('#Session_Timer_Start').removeAttr("disabled");
    $('#Session_Timer_Stop').attr('disabled', true);    
    $('#Session_Timer_Reset').removeAttr("disabled");

    clearInterval(sessionIDInterval);
});

$(document).on("click", "#Session_Timer_Reset", function(e) {
    $('#Session_Timer_Start').removeAttr("disabled");
    $('#Session_Timer_Stop').attr('disabled', true);    
    $('#Session_Timer_Reset').removeAttr("disabled");

    sessionCountSecond = 0;
    $('#Session_Timer').text("00:00:00");
});

//////////////////////////////////////////////////////////////////////////////////////////////////

function returnListOfTests() {
    $('#MainNavigator').load('/tests/mainnavigator', function() {
        $('#Manage_Session').css("display", "block");            
        $('#Select_Sessions').load('/session/list-sessions?idpatient=' + idPatient);
        $('#list_Of_Tests').css("display", "block"); 
        $('#list_Of_Tests').load('/session/load-list-of-tests?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
    }); 
}

$(document).on("click", "#BackListTests", function(e) {    
    returnListOfTests();
});

//Group BREF & MMSE /////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#TestGroup_BREF_MMSE", function(e) {
    $('#list_Of_Tests').load('/session/load-list-of-tests-bref-mmse?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
});

//Group DEEPSPA /////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#TestGroup_DEEPSPA", function(e) {
    $('#list_Of_Tests').load('/session/load-list-of-tests-deepspa?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);    
});

//Group DENOMINATION /////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#TestGroup_DENOMINATION", function(e) {
    $('#list_Of_Tests').load('/session/load-list-of-tests-denomination?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);    
});

//Group DESCRIPTIONS /////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#TestGroup_DESCRIPTIONS", function(e) {
    $('#list_Of_Tests').load('/session/load-list-of-tests-descriptions?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);    
});

//Group ECHELLES CLINIQUES /////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#TestGroup_Echelles_Cliniques", function(e) {
    $('#list_Of_Tests').load('/session/load-list-of-tests-echelles-cliniques?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
});

//Group FLUENCES /////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#TestGroup_FLUENCES", function(e) {
    $('#list_Of_Tests').load('/session/load-list-of-tests-fluences?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
});

//Group ORTHOPHONIE /////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#TestGroup_ORTHOPHONIE", function(e) {
    $('#list_Of_Tests').load('/session/load-list-of-tests-orthophonie?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
});

//Group PRAXIES /////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#TestGroup_PRAXIES", function(e) {
    $('#list_Of_Tests').load('/session/load-list-of-tests-praxies?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
});

//Group Stroop /////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#TestGroup_Stroop", function(e) {
    $('#list_Of_Tests').load('/session/load-list-of-tests-stroop?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
});

//Group TEST MÉMOIRE /////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#TestGroup_Tests_Memoire", function(e) {
    $('#list_Of_Tests').load('/session/load-list-of-tests-tests-memoire?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
});

//Group User Evaluation /////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#TestGroup_User_Evaluation", function(e) {
    $('#list_Of_Tests').load('/session/load-list-of-tests-user-evaluation?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
});

//Group Tests Expansion /////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#TestGroup_UPD_RMC", function(e) {
    $('#list_Of_Tests').load('/session/load-list-of-tests-upd-rmc?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function openTest(buttonNameTest, nameTestURL, buttonNameRunTest, buttonBack, checkBoxAudioVideo, socketTest, 
                  typeOfRecord, listTestURL, shortCutNumber) {
    $(document).on("click", buttonNameTest, function(e) {
        $('#MainNavigator').load('/tests/inputtests?test=' + nameTestURL + '&sessionname=' + selectedSessionName);
    });

    $(document).on("click", buttonNameRunTest, function(e) {
        if ($(buttonNameRunTest).text() === "Run") {
            $(buttonNameRunTest)
                .text("Interrompre")
                .removeClass("btn-info")
                .addClass("btn-danger");
            $(buttonBack).attr("disabled", true); 

            if (checkBoxAudioVideo != "") {
                $(checkBoxAudioVideo).attr("disabled", true);
                if ($(checkBoxAudioVideo).prop("checked") == true) {
                    socket.emit(socketTest, { 'type' : 'start', 
                                              'idselectedsession' : idSelectedSession, 
                                              [typeOfRecord] : true,
                                              'language' : $("#selectLanguage").val(),
                                              'shortcut' : shortCutNumber
                                            });
                } else {
                    socket.emit(socketTest, { 'type' : 'start', 
                                              'idselectedsession' : idSelectedSession, 
                                              [typeOfRecord] : false,
                                              'language' : $("#selectLanguage").val(),
                                              'shortcut' : shortCutNumber
                                            });
                }
            } else {
                socket.emit(socketTest, { 'type' : 'start', 
                                          'idselectedsession' : idSelectedSession,
                                          'language' : $("#selectLanguage").val(),
                                          'shortcut' : shortCutNumber
                                        });
            }
        } else if ($(buttonNameRunTest).text() === "Interrompre") {
            socket.emit(socketTest, { 'type' : 'stop' });
        }
    });

    $(document).on("click", buttonBack, function(e) {    
        $('#MainNavigator').load('/tests/mainnavigator', function() {
            $('#Manage_Session').css("display", "block");            
            $('#Select_Sessions').load('/session/list-sessions?idpatient=' + idPatient);
            $('#list_Of_Tests').css("display", "block"); 
            $('#list_Of_Tests').load('/session/' + listTestURL + '?idsession=' + idSelectedSession + '&sessionname=' + selectedSessionName);
        });    
    });
}

function closeTest(buttonNameRunTest, buttonBack, checkBoxAudioVideo) {
    $('#MainScreenVideo').show();
    $('#MainScreenGame').empty();
    $('#MainScreenGame').hide();

    playStream('SmallStream', clinicianStream_temp);
    playStream('LargeStream', patientStream_temp);

    $(buttonNameRunTest).text("Run");
    $(buttonNameRunTest).attr("class","btn btn-info btn-lg btn-block");
    $(buttonBack).removeAttr("disabled");
    if (checkBoxAudioVideo != "")
        $(checkBoxAudioVideo).removeAttr("disabled");
}

openTest("#Test09_FVLEX", "test09_fvlex", "#Run_Test09_FVLEX", "#BackListTests_FVLEX", 
        "", "Test09", "", "load-list-of-tests-fluences", 0);

openTest("#Test09_FVLEX_SC1", "test09_fvlex_sc1", "#Run_Test09_FVLEX_SC1", "#BackListTests_FVLEX_SC1", 
        "", "Test09", "", "load-list-of-tests", 1);

openTest("#Test10_FVSEM", "test10_fvsem", "#Run_Test10_FVSEM", "#BackListTests_FVSEM", 
        "", "Test10", "", "load-list-of-tests-fluences", 0);

openTest("#Test10_FVSEM_SC1", "test10_fvsem_sc1", "#Run_Test10_FVSEM_SC1", "#BackListTests_FVSEM_SC1", 
        "", "Test10", "", "load-list-of-tests", 1);

openTest("#Test14_Entr_Clin", "test14_entr_clin", "#Run_Test14_Entr_Clin", "#BackListTests_Entr_Clin", 
        "", "Test14", "", "load-list-of-tests", 0);

openTest("#Test15_Eval_Acc_Version_1", "test15_eval_acc", "#Run_Test15_Eval_Acc", "#BackListTests_Eval_Acc", 
        "", "Test15", "", "load-list-of-tests-user-evaluation", 0);

openTest("#Test19_Eval_Acc_Version_2", "test19_eval_acc", "#Run_Test19_Eval_Acc", "#BackListTests_Eval_Acc_Version_2", 
        "", "Test19", "", "load-list-of-tests-user-evaluation", 0);

openTest("#Test24_GDS", "test24_gds", "#Run_Test24_GDS", "#BackListTests_GDS", 
        "", "Test24", "", "load-list-of-tests-echelles-cliniques", 0);

openTest("#Test24_GDS_SC1", "test24_gds_sc1", "#Run_Test24_GDS_SC1", "#BackListTests_GDS_SC1", 
        "", "Test24", "", "load-list-of-tests", 1);

/////////////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#Test26_Entr_Clin", function(e) {
    $("#bt_select_session").attr("disabled", true);  
    $("#BackListTests").attr("disabled", true);
    $("#Test03_NegPosQ").attr("disabled", true);
    $("#Test26_Entr_Clin").attr("disabled", true);
    $("#Test26_Raconter").attr("disabled", true);
    $("#Test26_Historique").attr("disabled", true);
    $("#Test26_Conclusions").attr("disabled", true);
    $("#Test30_MEMPHESTO_Interview").attr("disabled", true);

    socket.emit('Test26', { 'type' : 'start', 'subtest' : 'Entr_Clin', 'idselectedsession' : idSelectedSession });
});

$(document).on("click", "#Test26_Raconter", function(e) {  
    $("#BackListTests").attr("disabled", true);
    $("#Test03_NegPosQ").attr("disabled", true);
    $("#Test26_Entr_Clin").attr("disabled", true);
    $("#Test26_Raconter").attr("disabled", true);
    $("#Test26_Historique").attr("disabled", true);
    $("#Test26_Conclusions").attr("disabled", true);
    $("#Test30_MEMPHESTO_Interview").attr("disabled", true);

    socket.emit('Test26', { 'type' : 'start', 'subtest' : 'Raconter', 'idselectedsession' : idSelectedSession });
});

$(document).on("click", "#Test26_Historique", function(e) {  
    $("#BackListTests").attr("disabled", true);
    $("#Test03_NegPosQ").attr("disabled", true);
    $("#Test26_Entr_Clin").attr("disabled", true);
    $("#Test26_Raconter").attr("disabled", true);
    $("#Test26_Historique").attr("disabled", true);
    $("#Test26_Conclusions").attr("disabled", true);
    $("#Test30_MEMPHESTO_Interview").attr("disabled", true);

    socket.emit('Test26', { 'type' : 'start', 'subtest' : 'Historique', 'idselectedsession' : idSelectedSession });
});

$(document).on("click", "#Test26_Conclusions", function(e) {  
    $("#BackListTests").attr("disabled", true);
    $("#Test03_NegPosQ").attr("disabled", true);
    $("#Test26_Entr_Clin").attr("disabled", true);
    $("#Test26_Raconter").attr("disabled", true);
    $("#Test26_Historique").attr("disabled", true);
    $("#Test26_Conclusions").attr("disabled", true);
    $("#Test30_MEMPHESTO_Interview").attr("disabled", true);

    socket.emit('Test26', { 'type' : 'start', 'subtest' : 'Conclusions', 'idselectedsession' : idSelectedSession });
});

////////////////////////////////////////////////////////////////////////////////////////////////////

openTest("#Test27_Dessin_Horloge", "test27_dessin_horloge", "#Run_Test27_Dessin_Horloge", "#BackListTests_Dessin_Horloge", 
        "#Test27_Dessin_Horloge_Checkbox_Record_Video", 'Test27', "record_video", "load-list-of-tests-bref-mmse", 0);

openTest("#Test30_MEMPHESTO_Interview", "test30_memphesto_interview", "#Run_Test30_MEMPHESTO_Interview", "#BackListTests_MEMPHESTO_Interview", 
        "#Test30_MEMPHESTO_Interview_Checkbox_Record_Video", 'Test30', "record_video", "load-list-of-tests-deepspa", 0);

openTest("#Test31_MOCA", "test31_moca", "#Run_Test31_MOCA", "#BackListTests_MOCA", "#Test31_MOCA_Checkbox_Record_Video",
        'Test31', "record_video", "load-list-of-tests-bref-mmse", 0);

//SC: Shortcut 1
openTest("#Test31_MOCA_SC1", "test31_moca_sc1", "#Run_Test31_MOCA_SC1", "#BackListTests_MOCA_SC1", "#Test31_MOCA_Checkbox_Record_Video",
        'Test31', "record_video", "load-list-of-tests", 1);

openTest("#Test32_D2", "test32_d2", "#Run_Test32_D2", "#BackListTests_D2", "#Test32_D2_Checkbox_Record_Video",
        'Test32', "record_video", "load-list-of-tests-descriptions", 0);

openTest("#Test33_WAIS_IV", "test33_wais_iv", "#Run_Test33_WAIS_IV", "#BackListTests_WAIS_IV", "#Test33_WAIS_IV_Checkbox_Record_Video",
        'Test33', "record_video", "load-list-of-tests-descriptions", 0);

openTest("#Test34_Zoo", "test34_zoo", "#Run_Test34_Zoo", "#BackListTests_Zoo", "#Test34_Zoo_Checkbox_Record_Video",
        'Test34', "record_video", "load-list-of-tests-descriptions", 0);

openTest("#Test35_Code_WAIS", "test35_code_wais", "#Run_Test35_Code_WAIS", "#BackListTests_Code_WAIS", "#Test35_Code_WAIS_Checkbox_Record_Video",
        'Test35', "record_video", "load-list-of-tests-descriptions", 0);

openTest("#Test36_NPI", "test36_npi", "#Run_Test36_NPI", "#BackListTests_NPI", "#Test36_NPI_Checkbox_Record_Video",
        'Test36', "record_video", "load-list-of-tests-echelles-cliniques", 0);

openTest("#Test37_Digital_Span", "test37_digital_span", "#Run_Test37_Digital_Span", "#BackListTests_Digital_Span", 
        "#Test37_Digital_Span_Checkbox_Record_Audio", "Test37", "record_audio", "load-list-of-tests-tests-memoire", 0);

openTest("#Test37_Digital_Span_SC1", "test37_digital_span_sc1", "#Run_Test37_Digital_Span_SC1", "#BackListTests_Digital_Span_SC1", 
        "#Test37_Digital_Span_Checkbox_Record_Audio", "Test37", "record_audio", "load-list-of-tests", 1);

openTest("#Test38_BNT_15", "test38_bnt_15", "#Run_Test38_BNT_15", "#BackListTests_BNT_15", 
        "#Test38_BNT_15_Checkbox_Record_Video", "Test38", "record_video", "load-list-of-tests-denomination", 0);

openTest("#Test38_BNT_15_SC1", "test38_bnt_15_sc1", "#Run_Test38_BNT_15_SC1", "#BackListTests_BNT_15_SC1", 
        "#Test38_BNT_15_Checkbox_Record_Video", "Test38", "record_video", "load-list-of-tests", 1);

openTest("#Test39_Words_List", "test39_words_list", "#Run_Test39_Words_List", "#BackListTests_Words_List", 
        "#Test39_Words_List_Checkbox_Record_Video", "Test39", "record_video", "load-list-of-tests-tests-memoire", 0);

openTest("#Test39_Words_List_SC1", "test39_words_list_sc1", "#Run_Test39_Words_List_SC1", "#BackListTests_Words_List_SC1", 
        "#Test39_Words_List_Checkbox_Record_Video", "Test39", "record_video", "load-list-of-tests", 1);

openTest("#Test40_Stroop_Victoria_2", "test40_stroop_victoria_2", "#Run_Test40_Stroop_Victoria_2", "#BackListTests_Stroop_Victoria_2", 
        "#Test40_Stroop_Victoria_2_Checkbox_Record_Audio", "Test40", "record_audio", "load-list-of-tests-stroop", 0);

openTest("#Test40_Stroop_Victoria_2_SC1", "test40_stroop_victoria_2_sc1", "#Run_Test40_Stroop_Victoria_2_SC1", "#BackListTests_Stroop_Victoria_2_SC1", 
        "#Test40_Stroop_Victoria_2_Checkbox_Record_Audio", "Test40", "record_audio", "load-list-of-tests", 1);

//Common Function////////////////////////////////////////////////////////////////////////////////////////////////////////

function offDocumentEvents(documentEvents) {
    for(let i = 0; i < documentEvents.length; i++) {        
        $(document).off("click", documentEvents[i]);
    }
    documentEvents = [];
}

//Initialization /////////////////////////////////////////////////////////////////////////////////////////

setPatientStatusDefault();
