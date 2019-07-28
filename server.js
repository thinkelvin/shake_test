// var clientStart;
var express = require('express');
var secure = require('ssl-express-www');
var app = express();
app.use(secure);
var port= process.env.PORT || 8080;
var timeStart;
var server = app.listen(port, function() {
    console.log('listening at:'+port);
    timeStart = new Date();
});
var indexResponse = function(req, res) {
    res.render('index');
}
app.use(express.static('public'));


app.get('/', function(req, res){
    //res.render('index');
    res.sendFile('index.html');
    console.log('index page sent');
});
app.get('/s', function(req, res){
    //console.log(req.params[0]);
   // clientStart = req.params[0];
    // res.render('index');
    // console.log(clientStart);
    res.sendFile('/public/index_s.html', {root: __dirname});
    console.log('route to s');
});
console.log("my node server is up and running at Heroku!!!");
var socketPair = {}; // Object to store socketID: shake time
var allClients = [];
var NbClients = 0; // number of connected clients
var Clients = 0; // serve as client ID, always increment up and unique
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
        clientID: Clients, // unique number
        trackPlay: trackNum
    }
    socket.emit('initClient', clientData); // return client info back to Browser
    allClients[Clients] = socket.id;
    Clients++;
    NbClients++;
    trackNum = (trackNum+1)%4;
 
    socket.on('trackShake', trackShakeMsg);
    function trackShakeMsg(data) {
        socket.broadcast.emit('trackSync',data);
    }

    socket.on('trackLocal', trackLocalMsg);
    function trackLocalMsg(data) {
          socket.emit('trackLocal', data);
    }
    // Client disconnects
    socket.on('disconnect', byeConnection);
    function byeConnection(){
        console.log('client disconnected: '+ socket.id);
        delete socketPair[socket.id];
        NbClients--;
        console.log('NbClients: ' + NbClients);
    }
}




