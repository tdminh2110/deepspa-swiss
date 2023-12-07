exports.sendData = function(socket, direct, idSocket, message, object) {    
    if (direct == true) {        
        socket.emit(message, object);
    } else {        
        socket.broadcast.to(idSocket).emit(message, object);        
    }
}