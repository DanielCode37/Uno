const freeCards = require("./cards.json");

module.exports = class Game {
	players = [];
	order = [];
	cardPool = [];
	cardOnStack;

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

		// If all cards are drawn
		if (this.allCardsUsed(cards)) return "cc";

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

	allCardsUsed(cards) {
		for (let i = 0; i < cards.length; i++) {
			if (freeCards[cards[i]] != 0) return false;
		}
		return true;
	}
}