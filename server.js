const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Game = require("./Server/Game");
const Player = require("./Server/Player");



app.use(express.static('public'));
http.listen(process.env.PORT || 3000, () => console.log("Server started"));

app.get("/", (req, res) => {
    res.sendFile("/index.html");
});



// init Game
const game = new Game();


// socket listeners
io.on("connection", (socket) => {
    socket.on("add user", (username) => {

        game.players.push(new Player(username, socket));

        // user is requesting new card
        socket.on("request new card", () => {
            socket.emit("new card", game.randomCard())
        });
    });
});

