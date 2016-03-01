'use strict';

const Deck = require('./model/deck');

class PoolOfCards {
  constructor(decksNumber) {
    this.cards = [];

    for (let i = 0; i !== decksNumber; i++) {
      let deck = new Deck();
      this.cards.push(deck.cards);
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
