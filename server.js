const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const freeCards = require("./freeCards.json");

app.use(express.static('public'));

// app.use((req, res, next) => {
//     req.io = io;
//     next();
// });

app.get("/", (req, res) => {
    res.sendFile("/index.html");
});

app.listen(process.env.PORT || 3000, () => console.log("Server started"));