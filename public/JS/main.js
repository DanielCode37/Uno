const socket = io();

socket.emit("add user", (prompt("Enter your name:")));


socket.on("new card", (card) => {
    alert()
    document.getElementById("deck").insertAdjacentHTML("beforeend", `<img src='./cards/${card}.png' alt='${card}'>`);
})

addEventListener("keydown", (e) => {
    console.log(e.key);
    if (e.key == "Enter") {
        socket.emit("new card");
    }
});