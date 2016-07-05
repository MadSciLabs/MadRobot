// Initialize sockets full scope
var socket = io();

// Initialize gamepad full scope
var hasGP = false;
var repGP;


// On document load
$(document).ready(function() {

    // Setup input controls in case there is no gamepad
    $(".dial").knob({
        "min" : 0,
        "max" : 1023,
        "width" : "150",
        "cursor" : true,
        "thickness" : .3,
        "fgColor" : "#222222",
        "skin" : "tron"
    });



    // Manage sockets
    socket.on('time', function(data) {
        console.log("time");
        console.log(data.time);
    });

    socket.on('error', console.error.bind(console));

    $("#hello").click(function(){
        socket.emit('messageIn', { data: 'data 2', id: '2' });
    });


    // Manage gamepad
    if(hasGamepad()) {
 
        var prompt = "Connect the gamepad and press any button.";
        $("#gamepadStart").text(prompt);

        $(window).on("gamepadconnected", function() {
            hasGP = true;
            $("#gamepadStart").html("Gamepad connected!");
            console.log("connection event");
            repGP = window.setInterval(reportOnGamepad,100);
        });

        $(window).on("gamepaddisconnected", function() {
            console.log("disconnection event");
            $("#gamepadStart").text(prompt);
            $("#gamepadStart").text(prompt);
            window.clearInterval(repGP);
        });

        //setup an interval for Chrome
        var checkGP = window.setInterval(function() {
            console.log('checkGP');
            if(navigator.getGamepads()[0]) {
                if(!hasGP) $(window).trigger("gamepadconnected");
                window.clearInterval(checkGP);
            }
        }, 500);
    }

});



// Gamepad functions

// Make sure gamepad is present 
function hasGamepad() {
    return "getGamepads" in navigator;
}

// Return gamepad data
function reportOnGamepad() {

    var gp = navigator.getGamepads()[0];
    var html = "";
        html += "id: "+gp.id+"<br/>";

    // Create object for gamepad data to JSON format
    var gamepadJSON = {};


    for(var i=0;i<gp.buttons.length;i++) {
        html+= "Button "+(i+1)+": ";
        if(gp.buttons[i].pressed) {
            html+= " pressed";
            gamepadJSON["button" + (i+1)] = 1;
        } else {
            gamepadJSON["button" + (i+1)] = 0;
        }

        html+= "<br/>";
    }

    for(var i=0;i<gp.axes.length; i+=2) {
        html+= "Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]+"<br/>";
        gamepadJSON["stick" + (Math.ceil(i/2)+1)] = gp.axes[i] + "," + gp.axes[i+1];
    }

    $("#gamepadDisplayData").html(html);



    // Send gamepad JSON socket data to server
    socket.emit('gamepad', JSON.stringify(gamepadJSON));

}