var express  = require('express');
var app      = express();
var server   = require('http').createServer(app);
var io       = require('socket.io')(server);
 
app.use(express.static(__dirname + '/public'));


/** SET ROUTES **/

// Home page
app.get('/', function(req, res) {
  //send the index.html in our public directory
  res.sendfile('index.html');
});

/**************
// ALEXA
**************/
app.get('/alexa/:c', function(request, res) {

	_action = request.params.c;

	//SEND THE COMMAND
	io.emit('alexa', _action);

        console.log("alexa : " + _action);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({status: "ok dc test"}));
});


/** END SET ROUTES **/



// Start server
server.listen(5000, function () {
  console.log('Listening on port 5000...');
});




// Send current time to all connected clients
function sendTime() {
  console.log("send time")
  io.emit('time', { time: new Date().toJSON() });
}

//Forward Gamepad messages to 
function sendControl(_var, _val) {

  console.log("Send Control")
  io.emit(_var, _val);
}

// Send current time every 10 secs
//setInterval(sendTime, 10000);

// Emit welcome message on connection
io.on('connection', function(socket) {


  console.log("connection");

  // Use socket to communicate with this particular client only, sending it it's own id
  socket.on('messageIn', function() {
    console.log('messageIn');
  });


    socket.on('gamepad', function(data) {
      console.log('gamepad');
      console.log(data);

	_data = JSON.parse(data);

      for (var an in _data) {
	console.log(an + " " + _data[an]);
        sendControl(an, _data[an]);
      }

      //Send control to python script
    });

});
