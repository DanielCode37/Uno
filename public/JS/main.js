const socket = io();

socket.emit("add user", (prompt("Enter your name:")));
socket.emit("test", "s");


socket.on("new card", (card) => {
    console.log("..................................");
    document.getElementById("deck").insertAdjacentHTML("beforeend", `<img src='./cards/${card}.png' alt='${card}'>`);
})

setInterval(() => {
    console.log("----------------------");
    socket.emit("request new card");
}, 300);