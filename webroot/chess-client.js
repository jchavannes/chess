$(function() {
    var Chess = {
        addBoard: function() {
            $('body').append("<div id='chess'></div>");
            $('#chess').html(function() {
                var html = "", id;
                for (var number = 8; number >= 1; number--) {
                    for (var letter = 1; letter <= 8; letter ++) {
                        id = String.fromCharCode(64 + letter) + number;
                        html += "<div class='cell' id='" + id + "'></div>";
                    }
                }
                return html;
            });
        }
    };
    var socket = io.connect('ws://192.168.56.102:8026');
    socket.on('connect', function () {
        var sessionId = (typeof localStorage.sessionId != "undefined") ? localStorage.sessionId : "";
        socket.emit('startSession', {sessionId: sessionId});
    });
    socket.on('setSessionId', function(data) {
        localStorage.sessionId = data.sessionId;
    });
    socket.on('sendUsers', function(data) {
        if (data.users) {
            $('#users').html(function() {
                var html = "";
                for (var i = 0; i < data.users.length; i++) {
                    html += "<div id='" + data.users[i].id +"'>" + data.users[i].name +"</div>"
                }
                return html;
            });
        }
    });
});
