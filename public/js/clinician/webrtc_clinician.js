function managePeer() {
    peer.on('open', function(id) {            
        socket.emit('Clinician', { 'type' : 'idpeer', 'email' : myEmail, 'value' : id });
    });

    peer.on('connection', function(dataConnection) {   
        console.log("Connection Peer of Clinician: ");     
        console.log(dataConnectionPeer);     
        if (dataConnectionPeer == null) {                
            dataConnectionPeer = dataConnection;
            manageDataConnection(dataConnectionPeer);
        }
    });

    peer.on('call', call => {
        navigator.mediaDevices.getUserMedia(CONFIG_STREAM_REMOTE)
        .then(stream => {
            sendStream_temp = stream;
            call.answer(stream);
            call.on('stream', patientStream => {
                patientStream_temp = patientStream;
                playStream('LargeStream', patientStream)            
            });
        })
        .catch(err => alert(err));
    });

    peer.on('disconnected', function() {
        dataConnectionPeer.send("Clinician - Disconnect to STUN or TURN server !!!");
        console.log("Clinician - Disconnect to STUN or TURN server !!!");
    });

    peer.on('error', err => {
        console.log(err);
    });

    peer.on('close', function() {
        dataConnectionPeer.send("Clinician - Close to STUN or TURN server !!!");
        console.log("Clinician - Close to STUN or TURN server !!!");    
    });
}

function manageDataConnection(dataConnection) {
    dataConnection.on('error', (error) => {
        console.error(error);
    });

    dataConnection.on('open', () => {        
    });

    dataConnection.on('data', (data) => {        
        /*switch(data['type']) {
            case "clinician disconnect":                
                console.log("Clinician disconnect");
                break;
        }*/
    });

    dataConnection.on('close', () => {
        dataConnectionPeer = null;
    });
}