var PeerServer = require('peer').PeerServer;

var server = PeerServer({
    port: 9000,
    path: '/peerserver',
    proxied : true
});

console.log("Srart PeerJS Server");
