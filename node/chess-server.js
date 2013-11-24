// Author: Jason Chavannes (jasonc.me)
var io = require('socket.io').listen(8026);

io.sockets.on('connection', function(socket) {
    socket.on('startSession', function(data) {
        for (var i = 0; i < Server.Sessions.length; i++) {
            if (Server.Sessions[i].sessionId == data.sessionId) {
                Server.Sessions[i].setSocket(socket);
                return;
            }
        }
        new Session(socket);
    });
    socket.on('disconnect', function() {
        Server.SendUsers();
    });
});

var Server = {
    Sessions: [],
    SendUsersTimeout: null,
    SendUsers: function() {
        if (this.SendUsersTimeout == null) {
            this.SendUsersTimeout = setTimeout(function() {
                var users = [], i;
                for (i = 0; i < Server.Sessions.length; i++) {
                    if (!Server.Sessions[i].socket.disconnected) {
                        users.push({
                            sessionId: Server.Sessions[i].sessionId,
                            name:      Server.Sessions[i].name
                        });
                    }
                }
                for (i = 0; i < Server.Sessions.length; i++) {
                    if (!Server.Sessions[i].socket.disconnected) {
                        Server.Sessions[i].socket.emit('sendUsers', {users: users});
                    }
                }
                Server.SendUsersTimeout = null;
            }, 50);
        }
    }
};

var Session = function(socket) {
    this.id        = Server.Sessions.length;
    this.name      = "Player " + (this.id + 1);
    this.sessionId = socket.id;
    Server.Sessions[this.id] = this;
    this.setSocket(socket);
    var self = this;
    this.socket.on('setName', function(data) {
        if (data.name) {
            self.name = data.name.replace(/([^A-Za-z0-9])/, "");
        }
    });
};
Session.prototype.setSocket = function(socket) {
    this.socket = socket;
    this.socket.emit('setSessionId', {sessionId: this.sessionId});
    Server.SendUsers();
};

var PieceTypes = {
    King:   "King",
    Queen:  "Queen",
    Bishop: "Bishop",
    Knight: "Knight",
    Rook:   "Rook",
    Pawn:   "Pawn"
};
var ChessGame = function () {};
ChessGame.prototype = {
    DarkPieces: {
        R1: {cell: "A8", type: PieceTypes.Rook},
        K1: {cell: "B8", type: PieceTypes.Knight},
        B1: {cell: "C8", type: PieceTypes.Bishop},
        Q:  {cell: "D8", type: PieceTypes.Queen},
        K:  {cell: "E8", type: PieceTypes.King},
        B2: {cell: "F8", type: PieceTypes.Bishop},
        K2: {cell: "G8", type: PieceTypes.Knight},
        R2: {cell: "H8", type: PieceTypes.Rook},
        P1: {cell: "A7", type: PieceTypes.Pawn},
        P2: {cell: "B7", type: PieceTypes.Pawn},
        P3: {cell: "C7", type: PieceTypes.Pawn},
        P4: {cell: "D7", type: PieceTypes.Pawn},
        P5: {cell: "E7", type: PieceTypes.Pawn},
        P6: {cell: "F7", type: PieceTypes.Pawn},
        P7: {cell: "G7", type: PieceTypes.Pawn},
        P8: {cell: "H7", type: PieceTypes.Pawn}
    },
    LightPieces: {
        R1: {cell: "A1", type: PieceTypes.Rook},
        K1: {cell: "B1", type: PieceTypes.Knight},
        B1: {cell: "C1", type: PieceTypes.Bishop},
        Q:  {cell: "D1", type: PieceTypes.Queen},
        K:  {cell: "E1", type: PieceTypes.King},
        B2: {cell: "F1", type: PieceTypes.Bishop},
        K2: {cell: "G1", type: PieceTypes.Knight},
        R2: {cell: "H1", type: PieceTypes.Rook},
        P1: {cell: "A2", type: PieceTypes.Pawn},
        P2: {cell: "B2", type: PieceTypes.Pawn},
        P3: {cell: "C2", type: PieceTypes.Pawn},
        P4: {cell: "D2", type: PieceTypes.Pawn},
        P5: {cell: "E2", type: PieceTypes.Pawn},
        P6: {cell: "F2", type: PieceTypes.Pawn},
        P7: {cell: "G2", type: PieceTypes.Pawn},
        P8: {cell: "H2", type: PieceTypes.Pawn}
    }
};
