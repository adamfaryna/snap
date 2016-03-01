'use strict';

const EventEmitter = require('events').EventEmitter;
const PoolOfCards = require('./poolofcards');
const playersAPI = require('./players');
const promptAPI = require('./prompts');

function printWelcomeMessage() {
  console.log('Welcome to snap game!');
}

class Gameplay {
  constructor(numberOfPlayers) {
    this.players = playersAPI.generatePlayers(numberOfPlayers);
  }

  play() {
    promptAPI.init();
    printWelcomeMessage();

    var playSurface = [];
    var machingMethod = null;
    var numberOfDecks = null;
    var poolOfCards = null;

    var eventEmitter = new EventEmitter();
    eventEmitter.on('newCardOnTheTable', checkCardsAndGrab);

    function checkCardsAndGrab() {
      let firstCard = playSurface[playSurface.length() - 2];
      let secondCard = playSurface[playSurface.length() - 1];

      if (compareCards(firstCard, secondCard)) {
        let player = playersAPI.getRandomPlayer();
        player.grabCards(playSurface);

        if (checkIfThePlayerIsWinner(player)) {
          announceWinnerAndExit(player);
        }

        playSurface = [];
      }
    }

    function checkIfThePlayerIsWinner(player) {
      return player.cards.length === poolOfCards.cards.length;
    }

    function announceWinnerAndExit(player) {
      console.log('The winner is player ' + player.name + '!');
      process.exit(0);
    }

    function compareCards(firstCard, secondCard) {
      switch (machingMethod) {
        case 'suit': return firstCard.suit === secondCard.suit;
        case 'value': return firstCard.value === secondCard.value;
        case 'both':return firstCard.suit === secondCard.suit && firstCard.value === secondCard.value;
      }
    }

    promptAPI.askForNumberOfDecks().then((result) => {
      numberOfDecks = result;
      poolOfCards = new PoolOfCards(numberOfDecks);

    }).then(promptAPI.askForNumberCardsMaching).then((result) => {
      machingMethod = result;

    }).then(() => {
      poolOfCards.shuffle();

    }).then(() => {
      shareCardsToPlayers();

    }).then(() => {
      putCardsOnTable();
    });

    function shareCardsToPlayers() {
      for (let i = 0; i !== poolOfCards.length; i++) {
        for (let j = 0; j !== this.players.length; i++) {
          this.players[j].grabCard(poolOfCards[i]);
        }
      }
    }

    function putCardsOnTable() {
      var i = 0;

      (function timeout() {
        setTimeout(() => {
          playSurface.push(this.players[i++].giveCard());

          if (i !== this.players.length) {
            timeout();

          } else {
            i = 0;
          }
        }, 500);
      })();
    }
  }
}

module.exports = Gameplay;
