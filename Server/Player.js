const { Socket } = require("socket.io");

module.exports = class Player {
    username;
    socket;
    numOfCards = 0;

    /**
     * @param {String} username 
     * @param {Socket} socket 
     */
    constructor(username, socket) {
        this.username = username;
        this.socket = socket;
    }
}