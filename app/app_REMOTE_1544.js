var express  = require('express');
var app      = express();
var server   = require('http').createServer(app);
var io       = require('socket.io')(server);
 
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  //send the index.html in our public directory
  res.sendfile('index.html');
});

server.listen(5000, function () {
  console.log('Listening on port 5000...');
});




// Send current time to all connected clients
function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

// Emit welcome message on connection
io.on('connection', function(socket) {

    // Use socket to communicate with this particular client only, sending it it's own id
    socket.on('messageIn', function() {
      console.log('messageIn');
    });

    socket.on('gamepad', function(data) {
      console.log('gamepad');
      console.log(data);
    });

});