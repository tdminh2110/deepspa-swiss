//const SOCKET_SERVER = io('https://testleonid.herokuapp.com/');
//const SOCKET_SERVER = io('https://tmcd-leonid.eu/');
const SOCKET_SERVER = io('https://deepspa-telemedicine.com/');
//const SOCKET_SERVER = "https://cursa:8080";

//const PEER_SERVER = "deepspa-telemedicine.com";
//const PEER_SERVER_PORT = 8080;

const USE_STUN_TURN_SERVER = true;

//Account tdminh
/*const CONFIG_STUN_TURN_SERVER = {
    config: {
                'iceServers': [{ 
                    urls: ["stun:eu-turn1.xirsys.com"]
                }, {
                    username: "3be6db1a-495e-11e9-8859-8741069e5961",
                    credential: "3be6db88-495e-11e9-aef3-1b4a17b9ce1b",
                    urls: [
                        "turn:eu-turn1.xirsys.com:80?transport=udp",
                        "turn:eu-turn1.xirsys.com:3478?transport=udp",
                        "turn:eu-turn1.xirsys.com:80?transport=tcp",
                        "turn:eu-turn1.xirsys.com:3478?transport=tcp",
                        "turns:eu-turn1.xirsys.com:443?transport=tcp",
                        "turns:eu-turn1.xirsys.com:5349?transport=tcp"
                    ]}
                ]
            }
};*/

//Acount Rachid
const CONFIG_STUN_TURN_SERVER = {
    config: {
                'iceServers': [{ 
                    urls: ["stun:eu-turn1.xirsys.com"]
                }, {
                    username: "dhNDqoDkuY4GawwVgGJ7x_sowecXHHghdVpwCM6c591DVjYHSn6D00wG8SFrLt3vAAAAAF2bB2tyYWNoaWRndWVyY2hvdWNoZQ==",
                    credential: "1f055238-e8e6-11e9-8d3c-4a049da423ff",
                    urls: [
                        "turn:eu-turn2.xirsys.com:80?transport=udp",
                        "turn:eu-turn2.xirsys.com:3478?transport=udp",
                        "turn:eu-turn2.xirsys.com:80?transport=tcp",
                        "turn:eu-turn2.xirsys.com:3478?transport=tcp",
                        "turns:eu-turn2.xirsys.com:443?transport=tcp",
                        "turns:eu-turn2.xirsys.com:5349?transport=tcp"
                    ]}
                ]
            }
};

//Account Francois
/*const CONFIG_STUN_TURN_SERVER = {    
    config: {
                "iceServers": [{ 
                    urls: ["stun:eu-turn1.xirsys.com"]
                    }, {
                        username: "_0Yck1mqKeSXaHiH1otrtRmE8qbWiJNrtjIpTZwCrLHOB_g9mqQcLArTQHcXE6ZcAAAAAF3wuqRmcmFuY29pc2JyZW1vbmQ=",
                        credential: "eb216662-1bfa-11ea-930d-169b39aff842",
                        urls: [
                            "turn:eu-turn1.xirsys.com:80?transport=udp",
                            "turn:eu-turn1.xirsys.com:3478?transport=udp",
                            "turn:eu-turn1.xirsys.com:80?transport=tcp",
                            "turn:eu-turn1.xirsys.com:3478?transport=tcp",
                            "turns:eu-turn1.xirsys.com:443?transport=tcp",
                            "turns:eu-turn1.xirsys.com:5349?transport=tcp"
                        ]}
                    ]
                }
};*/

/*const CONFIG_NON_STUN_TURN_SERVER = {
    host: PEER_SERVER,
    port: PEER_SERVER_PORT,
    path: '/peerserver'    
};*/

const QVGA_CONSTRAINTS = {width: {exact: 320}, height: {exact: 240}};  
const VGA_CONSTRAINTS = {width: {exact: 640}, height: {exact: 480}};  
const HD_CONSTRAINTS = {width: {exact: 1280}, height: {exact: 720}};  
const FULLHD_CONSTRAINTS = {width: {exact: 1920}, height: {exact: 1080}};  
const FOURK_CONSTRAINTS = {width: {exact: 4096}, height: {exact: 2160}};  
const EIGHTK_CONSTRAINTS = {width: {exact: 7680}, height: {exact: 4320}};

const CONFIG_STREAM_LOCAL = {    
    audio : false, 
    video : HD_CONSTRAINTS
};

const CONFIG_STREAM_REMOTE = {    
    audio : true, 
    video : HD_CONSTRAINTS
};

const WIDTH_VIDEO_EXTRA = 1000;
const WIDTH_VIDEO_LARGE = 850;
const WIDTH_VIDEO_NORMAL = 700;
const WIDTH_VIDEO_MEDIUM = 550;
const WIDTH_VIDEO_SMALL = 400;

//////////////////////////////////////////////////////////////////////////////////////////////////

let peer;
let dataConnectionPeer = null;

//const socket = io(SOCKET_SERVER, {transports: ['websocket']} );

let socket = io(SOCKET_SERVER, {transports: ['websocket']} );

//////////////////////////////////////////////////////////////////////////////////////////////////

function playStream(idVideoTag, stream) {
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;    
    video.controls = false;    
    video.play();   
}


