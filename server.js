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
var allClients = [];
var NbClients = 0;
// Enable Socket Communication
var socket = require('socket.io');
var io = socket(server);
var trackNum = 0;

// waiting for new Socket connection
io.on('connection', newConnection);

// Whenever this is a new Socket connection, do the following
function newConnection(socket){
    console.log('new connection:'+socket.id);
    var clientData = {
        clientID: NbClients,
        trackPlay: trackNum
    }
    socket.emit('initClient', clientData);
    allClients[NbClients] = socket.id;
    NbClients++;
    trackNum = (trackNum+1)%4;
        // For every new Socket connection
    socketPair[socket.id] = -1; // shake time set to -1 at start
    //console.log(Object.keys(socketPair).length);
    socket.on('bump', shakeMsg);
    function shakeMsg(data) {
        socketPair[socket.id] = Date.now();
        //console.log(data.trackID+':'+data.trackPos);
        socket.broadcast.emit('remoteBump',data); // tell everyone except the sender
    //    io.emit('remoteBump',data.trackPos); // tell everyone 
       // check shake sync only both shake times >0
        var t1 = socketPair[allClients[0]];
        var t2 = socketPair[allClients[1]];
        //console.log(t1+','+t2);
        if (Math.abs(t1-t2)<3000) {
            //socket.broadcast.emit('syncShake','hello');
            io.emit('syncBump');
            console.log('sync Bump');
        }
        
    }
    
    // Client disconnects
    socket.on('disconnect', byeConnection);
    function byeConnection(){
        console.log('client disconnected: '+ socket.id);
        delete socketPair[socket.id];
        NbClients--;
    }
}




