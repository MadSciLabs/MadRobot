$(document).ready(function() {

    var socket = io();

    socket.on('time', function(data) {
        console.log("time");
        console.log(data.time);
    });

    socket.on('error', console.error.bind(console));

    $("#hello").click(function(){
        socket.emit('messageIn', { data: 'data 2', id: '2' });
    }); 

});