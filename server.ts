const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const freeCards = require("./freeCards.json");

app.use(express.static('public'));
http.listen(process.env.PORT || 3000, () => console.log("Server started"));

app.get("/", (req, res) => {
    res.sendFile("/index.html");
});



// Game Variables
const players = [];
const order = [];


// new connection
io.on("connection", (socket) => {
    socket.setMaxListeners(10000);
    socket.on("add user", (username) => {
        players.push({ id: socket.id, username: username });
        console.log(players);
    });

    socket.on("disconnecting", (reason) => {
    });
});


