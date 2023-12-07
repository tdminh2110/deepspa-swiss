function sendHeartBeat() {        
    setTimeout(sendHeartBeat, 8000);
    socket.emit('ping_minh', { 'value' : 'Clinician'});
}    
setTimeout(sendHeartBeat, 8000);

socket.on("pong_minh", function(data) {
    //console.log(data['value']);
});

socket.on("Who are you ?", function(data) {
    socket.emit('Clinician', { 'type' : 'email', 'value' : myEmail });        
});

socket.on("Files-Uploaded", function(data) {    
    $('#Wait_Upload_Tests').css("display", "none");
});

socket.on('Clinician', function(data) {   
    switch (data['type']) {
        case 'create peer':            
            if (USE_STUN_TURN_SERVER == true) {
                //peer = new Peer('peerjsc', { key: 'peerjs', host : 'deepspa-telemedicine.com', secure : true, port : 443, debug : 3, path : "/", proxied : true, config : CONFIG_STUN_TURN_SERVER.config }); 

                //peer = new Peer('myEmailc', CONFIG_STUN_TURN_SERVER);
                peer = new Peer({ key: 'peerjs', path : "/peerserver", host : 'deepspa-telemedicine.com', secure : true, port : 443, debug : 3, config : CONFIG_STUN_TURN_SERVER.config });
                //peer = new Peer({ key: 'peerjs', host : 'deepspa-telemedicine.herokuapp.com', secure : true, port : 443, debug : 3, config : CONFIG_STUN_TURN_SERVER.config });
                //peer = new Peer({ key: 'peerjs', host : 'deepspa-telemedicine.com', secure : true, port : 443, debug : 3, proxied : true, config : CONFIG_STUN_TURN_SERVER.config });                
            } else {
                //peer = new Peer();
                peer = new Peer('myEmail', CONFIG_NON_STUN_TURN_SERVER);
            }                                  
            managePeer();
            break;
        
        case 'create local video':            
            navigator.mediaDevices.getUserMedia(CONFIG_STREAM_LOCAL)
            .then(stream => {    
                clinicianStream_temp = stream;
                playStream('SmallStream', stream);                
                socket.emit('Clinician', { 'type' : 'created local video', 'email' : myEmail });
            });
            break;

        case "IDPeer_Patient":
            navigator.mediaDevices.getUserMedia(CONFIG_STREAM_REMOTE)
            .then(stream => {                
                sendStream_temp = stream;
                let call = peer.call(data['value'], stream);

                socket.emit('Clinician', { 'type' : 'create data connetion of peers', 'email' : myEmail });

                call.on('stream', patientStream => {
                    patientStream_temp = patientStream;
                    playStream('LargeStream', patientStream);                   
                });
            });
            break;

        case "Create_DataConnection":            
            dataConnectionPeer = peer.connect(data['idpeer_patient']);
            console.log("Creation Peer of Clinician: ");     
            console.log(dataConnectionPeer);
            manageDataConnection(dataConnectionPeer);            
            break;

        case "IDPatient":
            idPatient = data['value'];          
            list_of_sessions_of_patient = data['listOfSessions'];
            upload_store_media = data['storeMedia'];

            setPatientUploading(upload_store_media);
            
            $('#Manage_Session').css("display", "block");            
            $('#Select_Sessions').load('/session/list-sessions?idpatient=' + idPatient);
            $("#StatusConnectionPatient")
                .removeClass('text-danger')
                .addClass('text-primary');
            session_OnDocumentEvents(list_of_sessions_of_patient);
            break;

        case "patient disconnect":
            session_OffDocumentEvents(list_of_sessions_of_patient);
            $('#Manage_Session').css("display", "none");
            $('#list_Of_Tests').css("display", "none");            
            $("#StatusConnectionPatient")
                .removeClass('text-primary')
                .addClass('text-danger');

            idPatient = 0;
            list_of_sessions_of_patient = [];
            break;

        case "Connection Already Exist":
            $('#MainNavigator').hide();
            $('#MainScreenVideo').hide();
            $('#RightNavigator').hide();
            $('#MainScreenGame').show();                
    
            $('#MainScreenGame').load('/clinician/connection-already-exists');
            break;

        case "list of sessions":
            list_of_sessions_of_patient = data['listOfSessions'];
            $('#Manage_Session').css("display", "block");            
            $('#Select_Sessions').load('/session/list-sessions?idpatient=' + idPatient);
            $("#StatusConnectionPatient")
                .removeClass('text-danger')
                .addClass('text-primary');

            session_OnDocumentEvents(list_of_sessions_of_patient);
            $("#Window_Commentaires_Session").css('display', 'none');
            break;

        case "upload-files":
            $('#Wait_Upload_Tests').css("display", "block"); 
            $('#Wait_Upload_Tests').load('/wait/uploadingfiles');
            break;
    }
});

socket.on('connect', () => {
    setCookie("idsocketclinician", socket.id, 1);

    $("#StatusConnectionClinician")
        .removeClass('text-danger')
        .addClass('text-primary');   
});

socket.on('disconnect', () => {   
   $("#StatusConnectionClinician")
        .removeClass('text-primary')
        .addClass('text-danger');   
});