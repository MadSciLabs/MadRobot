<<<<<<< Updated upstream
var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    url= require('url'),
    fs = require('fs')
  


// Http handler function
function handler (req, res) {

    // Using URL to parse the requested URL
    var path = url.parse(req.url).pathname;
    var arrPath = path.split('/')

    // Managing the root route
    if (path == '/') {
        index = fs.readFile(__dirname+'/public/index.html', 
            function(error,data) {

                if (error) {
                    res.writeHead(500);
                    return res.end("Error: unable to load index.html");
                }

                res.writeHead(200,{'Content-Type': 'text/html'});
                res.end(data);
            });

    /***************
    * Get response from Alexa
    ***************/
    } else if (arrPath[1] == 'alexa') {

	console.log(arrPath[2]);
        res.setHeader('Content-Type', 'application/json');

	#Now send to robot

	res.end(JSON.stringify({status:"ok"}));

    // Managing the route for the javascript files
    } else if( /\.(js)$/.test(path) ) {
        index = fs.readFile(__dirname+'/public'+path, 
            function(error,data) {
=======
var express  = require('express');
var app      = express();
var server   = require('http').createServer(app);
var io       = require('socket.io')(server);
 
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  //send the index.html in our public directory
  res.sendfile('index.html');
});
>>>>>>> Stashed changes

server.listen(5000, function () {
  console.log('Listening on port 5000...');
});




// Send current time to all connected clients
function sendTime() {
    console.log("send time")
    io.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 1000);

// Emit welcome message on connection
io.on('connection', function(socket) {

<<<<<<< Updated upstream
console.log("connection");

// Use socket to communicate with this particular client only, sending it it's own id
socket.on('messageIn', function() {
  console.log('messageIn');
});
=======
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.on('messageIn', function() {
      console.log('messageIn');
    });
>>>>>>> Stashed changes

    socket.on('gamepad', function(data) {
      console.log('gamepad');
      console.log(data);
    });

});