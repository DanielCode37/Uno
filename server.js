const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Game = require("./Server/Game");



app.use(express.static('public'));
http.listen(process.env.PORT || 3000, () => console.log("Server started"));

app.get("/", (req, res) => {
    res.sendFile("/index.html");
});



// init Game
const game = new Game();


// new connection
io.on("connection", (socket) => {
    socket.setMaxListeners(1000);
    game.addUser(socket);
});