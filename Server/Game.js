const { Socket } = require("socket.io");
const freeCards = require("./freeCards.json");
const Player = require("./Player.js");

module.exports = class Game {
	players = [];
	order = [];
	cardPool = [];
	cardOnStack;

	addUser(socket) {
		socket.on("add user", (username) => {
			this.players.push(new Player(username, socket));
			this.socketHandler(socket);
		});
	}

	/** @param {Socket} socket */
	socketHandler(socket) {
		socket.on("request new card", () => {
			socket.emit("new card", this.randomCard());
		});
	}

	randomCard() {
		// TODO: make fourth case and change to " *4" 
		// Just made for simplicity
		// TODO: do while for everthing
		let cardString = "";
		let repeat = false;
		switch (Math.round(Math.random() * 3)) {
			case 0:
				do {
					const random = Math.round(Math.random() * 9);
					if (freeCards.yellow[random] != 0) {
						cardString = "y" + random;
						freeCards.yellow[random]--;
					}
					else repeat = true;
				} while (repeat);
				break;
			case 1:
				do {
					const random = Math.round(Math.random() * 9);
					if (freeCards.green[random] != 0) {
						cardString = "g" + random;
						freeCards.green[random]--;
					}
					else repeat = true;
				} while (repeat);
				break;
			case 2:
				do {
					const random = Math.round(Math.random() * 9);
					if (freeCards.red[random] != 0) {
						cardString = "r" + random;
						freeCards.red[random]--;
					}
					else repeat = true;
				} while (repeat);
				break;
			case 3:
				do {
					const random = Math.round(Math.random() * 9);
					if (freeCards.blue[random] != 0) {
						cardString = "b" + random;
						freeCards.blue[random]--;
					}
					else repeat = true;
				} while (repeat);
				break;
		}
		return cardString;
	}
}