'use strict';

const EventEmitter = require('events').EventEmitter;
const PoolOfCards = require('./model/poolofcards');
const playersAPI = require('./service/players');
const promptAPI = require('./service/prompts');

function printWelcomeMessage() {
  console.log('Welcome to snap game!');
}

class Gameplay {
  constructor() {}

  play(numberOfPlayers) {
    promptAPI.init();
    printWelcomeMessage();

    let players = playersAPI.generatePlayers(numberOfPlayers);
    let playSurface = [];
    let machingMethod = null;
    let poolOfCards = null;

    let eventEmitter = new EventEmitter();
    eventEmitter.on('newCardOnTheTable', function checkCardsAndGrab() {
      if (playSurface.length < 2) {
        return;
      }

      let firstCard = playSurface[playSurface.length - 2];
      let secondCard = playSurface[playSurface.length - 1];

      if (compareCards(firstCard, secondCard)) {
        let player = playersAPI.getRandomPlayer();
        player.grabCards(playSurface);
        console.log('Player ' + player.name + ' grabs cards: ' + JSON.stringify(playSurface));

        if (checkIfThePlayerIsWinner(player)) {
          eventEmitter.emit('stopPuttingCardsOnTable');
          announceWinnerAndExit(player);
        }

        playSurface = [];
      }
    });

    function checkIfThePlayerIsWinner(player) {
      return player.cards.length === poolOfCards.cards.length;
    }

    function announceWinnerAndExit(player) {
      console.log('The winner is player ' + player.name + '!');
      process.exit(0);
    }

    function announceWinnersAndExit() {
      let result = playersAPI.getPlayersWithMostCards();
      let message = result.length === 1 ? 'The winner is' : 'The winners are';

      result.forEach((player) => {
        message += ' ' + player.name;
      });

      message += '!';
      console.log(message);
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
      poolOfCards = new PoolOfCards(result);

    }).then(promptAPI.askForNumberCardsMaching).then((result) => {
      machingMethod = result;

    }).then(() => {
      console.log('Shuffle cards.');
      poolOfCards.shuffle();
      console.log('Cards shuffled.');

    }).then(() => {
      console.log('Share cards to players.');
      shareCardsToPlayers();
      console.log('Cards shared to players.');

    }).then(() => {
      console.log('Put cards on the table.');
      putCardsOnTable();
    });

    function shareCardsToPlayers() {
      for (let i = 0, j = 0; i !== poolOfCards.cards.length; i++) {
        j = j === players.length - 1 ? 0 : j + 1;
        players[j].grabCard(poolOfCards.cards[i]);
      }
    }

    function putCardsOnTable() {
      let i = 0;
      var ticker;

      (function timeout() {
        ticker = setTimeout(() => {
          let player = players[i++];
          let card = player.giveCard();

          if (!card) {
            announceWinnersAndExit();
            return;
          }

          playSurface.push(card);
          eventEmitter.emit('newCardOnTheTable');
          console.log('Player ' + player.name + ' put card ' + card.value + ' ' + card.suit + ' on the table.');

          if (i === players.length) {
            i = 0;
          }

          timeout();
        }, 500);
      })();

      eventEmitter.once('stopPuttingCardsOnTable', () => {
        clearTimeout(ticker);
        announceWinnersAndExit();
      });
    }
  }
}

module.exports = Gameplay;
