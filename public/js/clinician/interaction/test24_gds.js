let test24_DocumentEvents;

let test24_language;

let test24_shortcut = 0;

socket.on('Test24', function(data) {    
    let type = data['type'];
    
    switch (type) {
        case "finish":
            offDocumentEvents(test24_DocumentEvents);
            test24_close();
            returnListOfTests();

            break;

        case "hide-continuer":
            $('#bt-test24-page' + data['page'] + '-continuer').css("display", "none");
            break;

        case "select-word":
            $('#bt-test24-page' + data['page'] + '-' + data['word']).attr("class", "btn btn-warning btn-lg btn-block");
            break;

        case "set-text":            
            if (data['page'] == 17) {
                $('#txt-test24-page17').val(data['text']);
            }
            break;

        case "show-page": {
            let page = data['page'];

            switch(page) {
                case 1: 
                    $('#MainScreenGame').load('/tests/gds?page=' + page + '&language=' + test24_language, 
                    function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test24_OnDocumentEventsOnType(socket, page);
                            setPatientStatus(1, 0, 0, 0);                               
                        }
                    });
                    break;

                case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
                    $('#MainScreenGame').load('/tests/gds?page=' + page + '&language=' + test24_language, function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test24_OnDocumentEventsOnType(socket, page);                            
                            setPatientStatus(0, 1, 0, 0);

                            socket.emit('Test24', { 'type' : 'old-status-of-page', 'page' : page, 'sender' : 'clinician' });
                        }
                    });
                    break;

                case 17:
                    $('#MainScreenGame').load('/tests/gds?page=' + page + '&language=' + test24_language + 
                                              '&score=' + data['score'], 
                        function(strResponse, strStatus, xhr) {
                        if (strStatus == "success") {
                            test24_OnDocumentEventsOnType(socket, page);                            
                            setPatientStatus(1, 0, 0, 0);

                            socket.emit('Test24', { 'type' : 'old-status-of-page', 'page' : page, 'sender' : 'clinician' });
                        }
                    });                                
                    break;
            }
            break;
        }

        case "show-continuer":
            $('#bt-test24-page' + data['page'] + '-continuer').css("display", "inline");
            break;

        case "start":
            $('#MainScreenVideo').hide();
            $('#MainScreenGame').show();                     
            playStream('SmallStream', patientStream_temp);

            test24_DocumentEvents = [];

            test24_language = data['language'];
            test24_shortcut = data['shortcut'];

            $('#MainScreenGame').load('/tests/gds?page=1&language=' + test24_language, function(strResponse, strStatus, xhr) {
                if (strStatus == "success") {     
                    test24_OnDocumentEventsOnType(socket, 1);
                }
            });
            break;

        case "stop":
            offDocumentEvents(test24_DocumentEvents);
            test24_close();
            setPatientStatusDefault();
                
            break;

        case "unselect-word": 
            $('#bt-test24-page' + data['page'] + '-' + data['word']).attr("class", "btn btn-secondary btn-lg btn-block");
            break;

    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function test24_OnDocumentEventsOnType(socket, page) {
    offDocumentEvents(test24_DocumentEvents);   

    switch(page) {
        case 1:
            test24_DocumentEvents.push("#bt-test24-page1-continuer");
            
            $(document).on("click", "#bt-test24-page1-continuer", function(e) {                
                socket.emit('Test24', { 'type' : 'show-page', 'page' : 2, 'sender' : 'clinician' });
            });
            break;

        case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
            test24_DocumentEvents.push('#bt-test24-page' + page + '-oui');
            test24_DocumentEvents.push('#bt-test24-page' + page + '-non');
            test24_DocumentEvents.push('#bt-test24-page' + page + '-retour');
            test24_DocumentEvents.push('#bt-test24-page' + page + '-continuer');

            $(document).on("click", '#bt-test24-page' + page +'-oui', function(e) {                
                socket.emit('Test24', { 'type' : 'select-word', 'page' : page, 'word' : 'oui', 'sender' : 'clinician' });
            });

            $(document).on("click", '#bt-test24-page' + page + '-non', function(e) {                
                socket.emit('Test24', { 'type' : 'select-word', 'page' : page, 'word' : 'non', 'sender' : 'clinician' });
            });

            $(document).on("click", '#bt-test24-page' + page +'-retour', function(e) {                
                socket.emit('Test24', { 'type' : 'show-page', 'page' : (page - 1), 'sender' : 'clinician' });
            });

            $(document).on("click", '#bt-test24-page' + page + '-continuer', function(e) {                
                socket.emit('Test24', { 'type' : 'show-page', 'page' : (page + 1), 'sender' : 'clinician' });
            });
            break;
        
        case 17:
            test24_DocumentEvents.push('#bt-test24-page17-retour');
            test24_DocumentEvents.push('#bt-test24-page17-terminer');

            $(document).on("click", '#bt-test24-page17-retour', function(e) {                
                socket.emit('Test24', { 'type' : 'show-page-and-store', 'page' : 16, 'commentaires' : $('#txt-test24-page17').val() });
            });

            $(document).on("click", '#bt-test24-page17-terminer', function(e) {                
                socket.emit('Test24', { 'type' : 'store-values', 'commentaires' : $('#txt-test24-page17').val() });
            });
            break;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function test24_close() {
    if (test24_shortcut == 0)            
        closeTest("#Run_Test24_GDS", "#BackListTests_GDS", "");
    else if (test24_shortcut == 1)
        closeTest("#Run_Test24_GDS_SC1", "#BackListTests_GDS_SC1", "");
}

