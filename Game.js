const { Socket } = require("socket.io");
const Chat = require("./Chat");
const freeCards = require("./freeCards.json");

module.exports = class Game {
    Chat = new Chat;
    players = [];
    order = [];
    cardPool = [];
    cardOnStack;

    constructor() {

    }

    /** @param {Socket} socket */
    set io(socket) {
        this.socket = socket;
        this.socketHandler();
    }


    socketHandler() {
        this.socket.on("add user", (username) => {
            this.players.push({ id: this.socket.id, username: username });
            console.log(this.players);
        });

        this.socket.on("disconnecting", (reason) => {
        });
    }

    randomCard() {

    }

}