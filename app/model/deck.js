'use strict';

const constants = require('../constants.js');
const Card = require('./card');

class Deck {
  constructor() {
    this.cards = [];

    constants.CARD_COLORS.forEach((color) => {
      for (let v = 1; v !== constants.CARD_VALUES_NUMBER; v++) {
        this.cards.push(new Card(color, v));
      }
    });
  }
}

module.exports = Deck;
