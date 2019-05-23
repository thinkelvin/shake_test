var express = require('express');
var app = express();
var port= process.env.PORT || 8080;
var server = app.listen(port, function() {
    console.log('listening at:'+port);
});
app.use(express.static('public'));
app.get('/', function(req, res){
    res.render('index');
});
console.log("my socket server is running at port:3000");

var socket = require('socket.io');
var io = socket(server);
io.on('connection', newConnection);

function newConnection(socket){
    console.log('new connection:'+socket.id);
    socket.on('disconnect', byeConnection);
    function byeConnection(socket){
        console.log('client disconnected:'+ socket.id);
    }
    socket.on('mouse', mouseMsg);
    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
    }
}



