var clinicianStream_temp = null;
var patientStream_temp = null;
let sendStream_temp = null;

let idPatient = null;
let list_of_sessions_of_patient = null;
let idSelectedSession = null;
let selectedSessionName = null;

let sessionCountSecond = 0;
let sessionIDInterval;

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

////////////////////////////////////////////////////////////////////////////////////////////////////