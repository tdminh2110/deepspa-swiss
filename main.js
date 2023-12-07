const path = require('path');
var fs = require('fs');
var http = require('http');
var https = require('https');

//const { ExpressPeerServer } = require('peer');

/////////////////////////////////////////////////////////////////////////////////////////////

const USE_HTTPS = false;
const PORT_NUMBER = 8080;

/////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const errorController = require('./controllers/error');

const webApp = express();

webApp.set('view engine', 'ejs');
webApp.set('views', 'views');

const adminRoutes = require('./routes/admin');
const clinicianRoutes = require('./routes/clinician');
const patientRoutes = require('./routes/patient');
const testRoutes = require('./routes/tests');
const sessionRoutes = require('./routes/session');
const waitRoutes = require('./routes/wait');
const logInOutRoutes = require('./routes/log-in-out');

const sockets = require('./controllers/common/sockets');

webApp.use(bodyParser.urlencoded({ extended: false}));
webApp.use(express.static(path.join(__dirname, 'public')));
webApp.use(
    session({
        secret: 'our secret',
        resave: false,
        saveUninitialized: false
    })
);

let httpsServer;
let httpServer;

if (USE_HTTPS == true) {
    const privateKey = fs.readFileSync('./server.key'); 
    const certificate = fs.readFileSync('./server.cert'); 

    const options = {
        key: privateKey,
        cert: certificate
    }; 
    
    httpsServer = https.createServer(options, webApp);
    sockets.startSocketServer(httpsServer);
    httpsServer.listen(PORT_NUMBER);

    /*const peerServer = ExpressPeerServer(httpsServer, {
        debug: true,
        path: '/'
    });

    webApp.use('/peerjs', peerServer);*/

} else {
    httpServer = http.createServer(webApp);
    sockets.startSocketServer(httpServer);
    httpServer.listen(PORT_NUMBER);

    /*const peerServer = ExpressPeerServer(httpServer, {
        debug: true,
        path: '/'
    });

    webApp.use('/peerjs', peerServer);*/
}

webApp.use('/admin', adminRoutes);
webApp.use('/clinician', clinicianRoutes);
webApp.use('/patient', patientRoutes);
webApp.use('/tests', testRoutes);
webApp.use('/session', sessionRoutes);
webApp.use('/wait', waitRoutes);

webApp.use(logInOutRoutes);
webApp.use(errorController.get404);

//openssl req -nodes -new -x509 -keyout server.key -out server.cert