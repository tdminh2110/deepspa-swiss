let test26_DocumentEvents;

socket.on('Test26', function(data) {    
    let type = data['type'];
    
    switch (type) {
        case "show-commentaires":
            switch(data['subtest']) {
                case "Conclusions":
                    $("#txt-test26-conclusions-page1").val(data['commentaires']);
                    break;

                case "Entr_Clin":
                    $("#txt-test26-entr-clin-page1").val(data['commentaires']);
                    break;

                case "Historique":
                    $("#txt-test26-historique-page1").val(data['commentaires']);
                    break;

                case "Raconter":
                    $("#txt-test26-raconter-page1").val(data['commentaires']);
                    break;
            }
            break;

        case "start":
            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();                     
            playStream('SmallStream', patientStream_temp);

            test26_DocumentEvents = [];

            let subtest = data['subtest'];

            $('#MainScreenGame').load('/tests/deepspa?subtest=' + subtest + '&page=1', function(strResponse, strStatus, xhr) {
                if (strStatus == "success") {
                    test26_OnDocumentEventsOnType(socket, subtest, 1);
                    socket.emit('Test26', { 'type' : 'old-status-of-page', 'subtest' : subtest, 'page' : 1 });
                    
                    if ((subtest == "Entr_Clin") || (subtest == "Raconter")) {                            
                        setPatientStatus(1, 0, 0, 1);
                    }
                }
            });

            break;

        case "stop":
            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();

            playStream('SmallStream', clinicianStream_temp);
            playStream('LargeStream', patientStream_temp);

            $("#bt_select_session").removeAttr("disabled");  
            $("#BackListTests").removeAttr("disabled");
            $("#Test03_NegPosQ").removeAttr("disabled");
            $("#Test26_Entr_Clin").removeAttr("disabled");
            $("#Test26_Raconter").removeAttr("disabled");
            $("#Test26_Historique").removeAttr("disabled");
            $("#Test26_Conclusions").removeAttr("disabled");
            $("#Test30_MEMPHESTO_Interview").removeAttr("disabled");

            test26_OffDocumentEvents();
            setPatientStatusDefault();
                
            break;

        case 'store-files':            
            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();

            playStream('SmallStream', clinicianStream_temp);
            playStream('LargeStream', patientStream_temp);

            $("#bt_select_session").removeAttr("disabled");  
            $("#BackListTests").removeAttr("disabled");
            $("#Test03_NegPosQ").removeAttr("disabled");
            $("#Test26_Entr_Clin").removeAttr("disabled");
            $("#Test26_Raconter").removeAttr("disabled");
            $("#Test26_Historique").removeAttr("disabled");
            $("#Test26_Conclusions").removeAttr("disabled");
            $("#Test30_MEMPHESTO_Interview").removeAttr("disabled");

            test26_OffDocumentEvents();
            setPatientStatusDefault();

            break;

        case 'upload-files':
            $('#Wait_Upload_Tests').css("display", "block"); 
            $('#Wait_Upload_Tests').load('/wait/uploadingfiles');
            
            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();

            playStream('SmallStream', clinicianStream_temp);
            playStream('LargeStream', patientStream_temp);

            $("#bt_select_session").removeAttr("disabled");  
            $("#BackListTests").removeAttr("disabled");
            $("#Test03_NegPosQ").removeAttr("disabled");
            $("#Test26_Entr_Clin").removeAttr("disabled");
            $("#Test26_Raconter").removeAttr("disabled");
            $("#Test26_Historique").removeAttr("disabled");
            $("#Test26_Conclusions").removeAttr("disabled");
            $("#Test30_MEMPHESTO_Interview").removeAttr("disabled");

            test26_OffDocumentEvents();
            setPatientStatusDefault();

            break;

    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function test26_OnDocumentEventsOnType(socket, subtest, page) {    
    test26_OffDocumentEvents();
    
    switch(subtest) {
        case "Conclusions":
            if (page == 1) {
                test26_DocumentEvents.push("#bt-test26-conclusions-page1-stop");
                test26_DocumentEvents.push("#bt-test26-conclusions-page1-terminer");

                $(document).on("click", "#bt-test26-conclusions-page1-stop", function(e) {                
                    socket.emit('Test26', { 'type' : 'stop' });
                });
                
                $(document).on("click", "#bt-test26-conclusions-page1-terminer", function(e) {                
                    socket.emit('Test26', { 'type' : 'store-values', 'subtest' : subtest, 'value' : $('#txt-test26-conclusions-page1').val() });
                });
            }
            break;

        case "Entr_Clin":
            if (page == 1) {
                test26_DocumentEvents.push("#bt-test26-entr-clin-page1-stop");
                test26_DocumentEvents.push("#bt-test26-entr-clin-page1-terminer");

                $(document).on("click", "#bt-test26-entr-clin-page1-stop", function(e) {                
                    socket.emit('Test26', { 'type' : 'stop' });
                });
                
                $(document).on("click", "#bt-test26-entr-clin-page1-terminer", function(e) {                
                    socket.emit('Test26', { 'type' : 'store-values', 'subtest' : subtest, 'value' : $('#txt-test26-entr-clin-page1').val() });
                });
            }
            break;

        case "Historique":
            if (page == 1) {
                test26_DocumentEvents.push("#bt-test26-historique-page1-stop");
                test26_DocumentEvents.push("#bt-test26-historique-page1-terminer");

                $(document).on("click", "#bt-test26-historique-page1-stop", function(e) {                
                    socket.emit('Test26', { 'type' : 'stop' });
                });
                
                $(document).on("click", "#bt-test26-historique-page1-terminer", function(e) {                
                    socket.emit('Test26', { 'type' : 'store-values', 'subtest' : subtest, 'value' : $('#txt-test26-historique-page1').val() });
                });
            }
            break;

        case "Raconter":
            if (page == 1) {
                test26_DocumentEvents.push("#bt-test26-raconter-page1-stop");
                test26_DocumentEvents.push("#bt-test26-raconter-page1-terminer");

                $(document).on("click", "#bt-test26-raconter-page1-stop", function(e) {                
                    socket.emit('Test26', { 'type' : 'stop' });
                });
                
                $(document).on("click", "#bt-test26-raconter-page1-terminer", function(e) {                
                    socket.emit('Test26', { 'type' : 'store-values', 'subtest' : subtest, 'value' : $('#txt-test26-raconter-page1').val() });
                });
            }
            break;
    }
}

function test26_OffDocumentEvents() {      
    for(let i = 0; i < test26_DocumentEvents.length; i++) {        
        $(document).off("click", test26_DocumentEvents[i]);
    }
    test26_DocumentEvents = [];
}

