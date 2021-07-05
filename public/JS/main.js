const socket = io();

socket.emit("add user", (prompt("Enter your name:")))