'use strict';

const Player = require('../model/player');
const constants = require('../constants');

let playersCounter = 0;
let players = [];

module.exports = {
  players,
  generatePlayers() {
    players = [];
    playersCounter = 0;
    let playersNumber = Math.floor(Math.random() * constants.MAX_NUMBER_OF_PLAYERS + 1);

    for (let i = 0; i !== playersNumber; i++) {
      players.push(new Player('player ' + (++playersCounter)));
    }

    return players;
  },
  getRandomPlayer() {
    return players[Math.floor(Math.random() * players.length)];
  },
  getPlayersWithMostCards() {
    let biggestSum = 0;
    let result = [];

    players.forEach((player) => {
      let playerSum = player.countCards();

      if (playerSum === playerSum) {
        result.push(player);

      } else if (playerSum > playerSum) {
        result = [player];
        biggestSum = playerSum;
      }
    });

   return result;
  }
};
