'use strict';

const Deck = require('./deck');

class PoolOfCards {
  constructor(decksNumber) {
    this.cards = [];

    for (let i = 0; i !== decksNumber; i++) {
      this.cards.push(...new Deck().cards);
    }
  }

  shuffle() {
    for(let j, x, i = this.cards.length; i;) {
      j = Math.floor(Math.random() * i);
      x = this.cards[--i];
      this.cards[i] = this.cards[j];
      this.cards[j] = x;
    }
  }
}

module.exports = PoolOfCards;
