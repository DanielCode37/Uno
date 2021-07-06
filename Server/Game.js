const { Socket } = require("socket.io");
const freeCards = require("./freeCards.json");
const Player = require("./Player.js");

module.exports = class Game {
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

	addUser(username, socket) {
		this.players.push(new Player(username, socket));
	}


	socketHandler() {
		this.socket.on("add user", (username) => {
			this.players.push({ id: this.socket.id, username: username, deck: [] });
		});

		this.socket.on("disconnecting", (reason) => {
		});

		this.socket.on("new card", () => {
			let card = this.randomCard();
			for (let player of this.players) {
				if (player.id == this.socket.id) player.deck.push(card);
			}
			console.log(this.players);
			this.socket.to(this.socket.id).emit("new card", card);
		});
	}

	randomCard() {
		// TODO: make fourth case and change to " *4" 
		// Just made for simplicity
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