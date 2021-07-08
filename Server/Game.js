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
		let i = 0;
		socket.on("request new card", () => {
			console.log(i++);
			socket.emit("new card", this.randomCard());
		});
	}

	randomCard() {
		const cards = [
			'b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6',
			'b7', 'b8', 'b9', 'b+', 'br', 'bs', 'r0',
			'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7',
			'r8', 'r9', 'r+', 'rr', 'rs', 'y0', 'y1',
			'y2', 'y3', 'y4', 'y5', 'y6', 'y7', 'y8',
			'y9', 'y+', 'yr', 'ys', 'g0', 'g1', 'g2',
			'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9',
			'g+', 'gr', 'gs', 'cc', 'c+'
		];
		let retry = false
		do {
			let random = cards[Math.round(Math.random() * (cards.length - 1))];
			if (freeCards[random] == 0) retry = true;
			else {
				freeCards[random]--;
				return random;
			}
		} while (retry);
	}
}