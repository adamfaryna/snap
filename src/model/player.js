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

  countCards() {
    let sum = 0;

    this.cards.forEach((card) => {
      sum += card.value;
    });

    return sum;
  }
}

module.exports = Player;
