const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("HELLO WORLD")
});

app.listen(process.env.PORT || 5000, console.log("Server started"));