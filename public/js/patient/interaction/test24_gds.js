let test24_patient_DocumentEvents;
let test24_language;

socket.on('Test24', function(data) {
    let type = data['type'];

    switch (type) {
        case "hide-continuer":
            $('#bt-test24-page' + data['page'] + '-continuer').css("display", "none"); 
            break;

        case "select-word": 
            $('#bt-test24-page' + data['page'] + '-' + data['word']).attr("class", "btn btn-warning btn-lg btn-block");
            break;

        case "show-continuer":
            $('#bt-test24-page' + data['page'] + '-continuer').css("display", "inline"); 
            break;

        case "show-page": {
            let page = data['page'];

            switch(page) {
                case 1: case 17:
                    $('#MainScreenVideo').show();
                    $('#MainScreenGame').empty();
                    $('#MainScreenGame').hide();
                    break;

                case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
                    $('#MainScreenVideo').hide();
                    $('#MainScreenGame').show(); 
                    $('#MainScreenGame').load('/tests/gds?page=' + page + '&language=' + test24_language, 
                        function(strResponse, strStatus, xhr) {                        
                        if (strStatus == "success") {
                            test24_Patient_OnDocumentEventsOnType(socket, page);
                            socket.emit('Test24', { 'type' : 'old-status-of-page', 'page' : page, 'sender' : 'patient' });
                        }
                    });
                    break;
            }                    
            break;
        }

        case "start":          
            test24_patient_DocumentEvents = [];
            test24_language = data['language'];
            break;

        case 'stop':
            $('#MainScreenVideo').show();
            $('#MainScreenGame').empty();
            $('#MainScreenGame').hide();  
            break;

        case "unselect-word": 
            $('#bt-test24-page' + data['page'] + '-' + data['word']).attr("class", "btn btn-secondary btn-lg btn-block");
            break;
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function test24_Patient_OnDocumentEventsOnType(socket, page) { 
    test24_Patient_OffDocumentEvents();

    test24_patient_DocumentEvents.push('#bt-test24-page' + page + '-oui');
    test24_patient_DocumentEvents.push('#bt-test24-page' + page + '-non');
    test24_patient_DocumentEvents.push('#bt-test24-page' + page + '-retour');
    test24_patient_DocumentEvents.push('#bt-test24-page' + page + '-continuer');

    $(document).on("click", '#bt-test24-page' + page +'-oui', function(e) {                                        
        socket.emit('Test24', { 'type' : 'select-word', 'page' : page, 'word' : 'oui', 'sender' : 'patient' });                        
    });

    $(document).on("click", '#bt-test24-page' + page + '-non', function(e) {                
        socket.emit('Test24', { 'type' : 'select-word', 'page' : page, 'word' : 'non', 'sender' : 'patient' });
    });

    $(document).on("click", '#bt-test24-page' + page +'-retour', function(e) {
        socket.emit('Test24', { 'type' : 'show-page', 'page' : (page - 1), 'sender' : 'patient' });
    });

    $(document).on("click", '#bt-test24-page' + page + '-continuer', function(e) {                
        socket.emit('Test24', { 'type' : 'show-page', 'page' : (page + 1), 'sender' : 'patient' });
    });
}

function test24_Patient_OffDocumentEvents() {      
    for(let i = 0; i < test24_patient_DocumentEvents.length; i++) {        
        $(document).off("click", test24_patient_DocumentEvents[i]);
    }
    test24_patient_DocumentEvents = [];
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
