function managePeer() {
    peer.on('open', id => {          
        socket.emit('Patient', { 'type' : 'idpeer', 'email' : myEmail, 'value' : id });    
    });
    
    peer.on('connection', function(dataConnection) {
        console.log("Connection Peer of Patient: ");     
        console.log(dataConnectionPeer);

        if (dataConnectionPeer == null) {                
            dataConnectionPeer = dataConnection;
            manageDataConnection(dataConnectionPeer);
        }
    });
    
    peer.on('call', call => {
        navigator.mediaDevices.getUserMedia(CONFIG_STREAM_REMOTE)
        .then(stream => {        
            recordStream_temp = stream;        
            call.answer(stream);
            call.on('stream', clinicianStream => {
                clinicianStream_temp = clinicianStream;
                playStream('clinicianStream', clinicianStream);            
            });
        })
        .catch(err => alert(err));
    });

    peer.on('error', err => {
        console.log(err);
    });
    
    peer.on('disconnected', function() {
        dataConnectionPeer.send("Patient - Disconnect to STUN or TURN server !!!");
        console.log("Patient - Disconnect to STUN or TURN server !!!");
    });
    
    peer.on('close', function() {
        dataConnectionPeer.send("Patient - Close to STUN or TURN server !!!");
        console.log("Patient - Close to STUN or TURN server !!!");    
    });
}

function manageDataConnection(dataConnection) {
    dataConnection.on('error', (error) => {
        console.error(error);
    });

    dataConnection.on('open', () => {        
    });

    dataConnection.on('data', (data) => {        
    });

    dataConnection.on('close', () => {            
        dataConnectionPeer = null;    
    });
}