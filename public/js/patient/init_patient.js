let typeSupportedMediaRecorder = null;

let clinicianStream_temp = null;
let patientStream_temp = null;
let recordStream_temp = null;

/////////////////////////////////////////////////////////////////////////////////////////////////////

function selectTypeSupportedMediaRecorder() {
    typeSupportedMediaRecorder = {mimeType: 'video/webm;codecs=vp9'};    
    if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorder.mimeType)) {
        typeSupportedMediaRecorder = {mimeType: 'video/webm;codecs=vp8'};
        if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorder.mimeType)) {      
            typeSupportedMediaRecorder = {mimeType: 'video/webm'};
            if (!MediaRecorder.isTypeSupported(typeSupportedMediaRecorder.mimeType)) {        
                typeSupportedMediaRecorder = {mimeType: ''};
            }
        }        
    }
}

$(document).on("click", "#LogOut", function(e) {
    socket.disconnect();
    dataConnectionPeer = null;
    peer.disconnect();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
