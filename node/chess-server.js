var io = require('socket.io').listen(8026);

io.sockets.on('connection', function(socket) {
   socket.emit('hello');
});