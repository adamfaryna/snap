'use strict';

class Player {
  constructor(name) {
    this.name = name;
    this.cards = [];
  }

  giveCard() {
    return this.cards.pop();
  }

  grabCards(cards) {
    this.cards.push(...cards);
  }

  grabCard(card) {
    this.cards.push(card);
  }
}

module.exports = Player;
