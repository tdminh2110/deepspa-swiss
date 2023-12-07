function sendHeartBeat() {        
    setTimeout(sendHeartBeat, 8000);
    socket.emit('ping_minh', { 'value' : 'Clinician'});
}    
setTimeout(sendHeartBeat, 8000);

socket.on("pong_minh", function(data) {
    //console.log(data['value']);
});

socket.on('Who are you ?', function(data) {      
    socket.emit('Patient', { 'type' : 'email', 'value' : myEmail });    
});  

socket.on('Patient', function(data) {    
    switch (data['type']) {
        case 'create peer':            
            if (USE_STUN_TURN_SERVER == true) {
                //peer = new Peer('myEmailp', CONFIG_STUN_TURN_SERVER);
                //peer = new Peer({ key: 'peerjs', host : '9000-bc396def-f531-4002-8e68-07bb62c3f577.ws-us02.gitpod.io', secure : true, port : 443, debug : 3, config : CONFIG_STUN_TURN_SERVER.config });
                //peer = new Peer({ key: 'peerjs', host : 'deepspa-telemedicine.herokuapp.com', secure : true, port : 443, debug : 3, config : CONFIG_STUN_TURN_SERVER.config });
                peer = new Peer({ key: 'peerjs', path : "/peerserver", host : 'deepspa-telemedicine.com', secure : true, port : 443, debug : 3, config : CONFIG_STUN_TURN_SERVER.config });
            } else {
                //peer = new Peer();
                peer = new Peer('myEmail', CONFIG_NON_STUN_TURN_SERVER);
            }                                  
            managePeer();
            break;   
            
        case 'create local video':            
            navigator.mediaDevices.getUserMedia(CONFIG_STREAM_LOCAL)
            .then(stream => {
                patientStream_temp = stream;                    
                socket.emit('Patient', { 'type' : 'created local video', 'email' : myEmail });
            });            
            break;

        case 'IDPeer_Clinician':  
            navigator.mediaDevices.getUserMedia(CONFIG_STREAM_REMOTE)
            .then(stream => {         
                recordStream_temp = stream;                
                let call = peer.call(data['value'], stream);

                socket.emit('Patient', { 'type' : 'create data connetion of peers', 'email' : myEmail });

                call.on('stream', clinicianStream => {
                    clinicianStream_temp = clinicianStream;            
                    playStream('clinicianStream', clinicianStream);
                });
            });            
            break;  

        case "Create_DataConnection":            
            dataConnectionPeer = peer.connect(data['idpeer_clinician']);
            console.log("Creation Peer of Patient: ");     
            console.log(dataConnectionPeer);
            manageDataConnection(dataConnectionPeer);
            break;

        case "Connection Already Exist":            
            $('#MainScreenVideo').hide();
            
            $('#MainScreenGame').show();    
            $('#MainScreenGame').load('/patient/connection-already-exists');
            break;

        case "Room Already Exist":            
            $('#MainScreenVideo').hide();
            
            $('#MainScreenGame').show();    
            $('#MainScreenGame').load('/patient/room-already-exists');
            break;

        case "take-photo": {
            let instruction = data['instruction'];
            let snapshotNumber = data['snapshot_number'];
            
            let imageCapture = new ImageCapture(recordStream_temp.getVideoTracks()[0]);
            

            imageCapture.takePhoto()
            .then(blob => {
                switch (instruction) {
                    case 'upload-files': {                    
                        let formData = new FormData();
                        formData.append('image', blob, 'Snapshot_' + snapshotNumber + '.png');            
                        
                        fetch('/patient/upload-singlefile-snapshot', {
                            method: 'POST',
                            body: formData,
                            headers: new Headers({
                                'enctype': 'multipart/form-data'
                            })
                        }).then(function(response) {
                            console.log("Snapshot uploaded");
                            socket.emit('Files-Uploaded', { 'test' : 'TakePhoto' });
                        }).catch(function(err) {
                            alert("Loi: " + err);
                        });

                        break;
                    }
                    
                    case 'store-files': {
                        saveAs(blob, data["id_path_folder"] + '__' + data["path_session"] + '__Snapshot__Snapshot_' + snapshotNumber + '.png');
                        break;
                    }

                    case 'upload-store-files': {      
                        saveAs(blob, data["id_path_folder"] + '__' + data["path_session"] + '__Snapshot__Snapshot_' + snapshotNumber + '.png');
                        
                        let formData = new FormData();
                        formData.append('image', blob, 'Snapshot_' + snapshotNumber + '.png');            
                        
                        fetch('/patient/upload-singlefile-snapshot', {
                            method: 'POST',
                            body: formData,
                            headers: new Headers({
                                'enctype': 'multipart/form-data'
                            })
                        }).then(function(response) {
                            console.log("Snapshot uploaded");
                            socket.emit('Files-Uploaded', { 'test' : 'TakePhoto' });
                        }).catch(function(err) {
                            alert("Loi: " + err);
                        });

                        break;
                    }
                }
            })
            .catch(error => console.error('takePhoto() error:', error));

            break;
        }
    }
});

socket.on('connect', () => {
    setCookie("idsocketpatient", socket.id, 1);
});

socket.on('disconnect', () => {   
});