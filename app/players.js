'use strict';

require('./model/deck');
var Player = require('./model/player');
var constants = require('./constants');

var playersCounter = 0;
var players = [];

module.exports = {
  generatePlayers() {
    players = [];
    playersCounter = 0;
    let playersNumber = Math.floor(Math.random() * constants.MAX_NUMBER_OF_PLAYERS);

    for (let i = 0; i !== playersNumber; i++) {
      players.push(new Player('player ' + (++playersCounter)));
    }

    return players;
  },
  getRandomPlayer() {
    return players[Math.floor(Math.random() * players.length)];
  },
  players
};
