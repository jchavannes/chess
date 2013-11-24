var gameSetup = {
    A8: "Rook",
    B8: "Knight",
    C8: "Bishop",
    D8: "Queen",
    E8: "King",
    F8: "Bishop",
    G8: "Knight",
    H8: "Rook",
    A7: "Pawn",
    B7: "Pawn",
    C7: "Pawn",
    D7: "Pawn",
    E7: "Pawn",
    F7: "Pawn",
    G7: "Pawn",
    H7: "Pawn",
    A2: "Pawn",
    B2: "Pawn",
    C2: "Pawn",
    D2: "Pawn",
    E2: "Pawn",
    F2: "Pawn",
    G2: "Pawn",
    H2: "Pawn",
    A1: "Rook",
    B1: "Knight",
    C1: "Bishop",
    D1: "Queen",
    E1: "King",
    F1: "Bishop",
    G1: "Knight",
    H1: "Rook"
};
$(function() {
    var Piece = function() {};
    Piece.prototype = {
        location: "A1",
        type:     "pawn",
        side:     "black"
    };
    var Chess = {
        pieces: [],
        movePiece: function(piece, location) {

        }
    };
    $('#chess').html(function() {
        var html = "", id, text, piece;
        for (var number = 8; number >= 1; number--) {
            for (var letter = 1; letter <= 8; letter ++) {
                id = String.fromCharCode(64 + letter) + number;
                text = "";
                if (typeof gameSetup[id] != "undefined") {
                    piece = new Piece();
                    piece.location = id;
                    piece.type = gameSetup[id];
                    text = gameSetup[id].substring(0,2);
                }
                html += "<div class='cell' id='" + id + "'>" + text + "</div>";
                Chess.pieces.push()
            }
        }
        return html;
    });
});
