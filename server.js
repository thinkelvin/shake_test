var express = require('express');
var app = express();
var port= process.env.PORT || 8080;
var timeStart;
var server = app.listen(port, function() {
    console.log('listening at:'+port);
    timeStart = new Date();
});
app.use(express.static('public'));
app.get('/', function(req, res){
    res.render('index');
});
console.log("my node server is up and running at Heroku!!!");
var socketPair = {}; // Object to store socketID: shake time

// Enable Socket Communication
var socket = require('socket.io');
var io = socket(server);

// waiting for new Socket connection
io.on('connection', newConnection);

// Whenever this is a new Socket connection, do the following
function newConnection(socket){
    console.log('new connection:'+socket.id);
    // For every new Socket connection
    socketPair[socket.id] = 0; // shake time set to zero at start
    console.log(Object.keys(socketPair).length);
    socket.on('shake', shakeMsg);
    function shakeMsg(data) {
        socketPair[socket.id] = Date.now();
        console.log(socket.id +": " + Date.now());
        socket.broadcast.emit('remoteShake',socket.id); // tell the other client about the shake 
    }
    
    // Client disconnects
    socket.on('disconnect', byeConnection);
    function byeConnection(){
        console.log('client disconnected: '+ socket.id);
        delete socketPair[socket.id];
    }
}




