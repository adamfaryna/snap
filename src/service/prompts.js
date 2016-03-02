'use strict';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

function init() {
  setDefaultPrompt();
}

function setDefaultPrompt() {
  rl.setPrompt('> ');
}

function askForNumberOfDecks() {
  return new Promise((resolve) => {
    console.log('With how many playing card decks do you want to play with?');

    rl.on('line', function askForNumberOfDecksEvent(answer) {
      let number = ~~Number(answer.trim().toLowerCase());

      if (String(number) === answer && number >= 1) {
        rl.removeListener('line', askForNumberOfDecksEvent);
        resolve(number);

      } else {
        console.log('Write a positive number greater than 0.');
        rl.prompt();
      }
    });

    rl.prompt();
  });
}

function askForNumberCardsMaching() {
  console.log('Should the cards be matched on suit, value or both?');

  const correctValues = ['suit', 'value', 'both'];
  let prompt = 'Choose one of (';

  correctValues.forEach((val) => {
    prompt += ' \'' + val + '\' ';
  });

  prompt += ') > ';

  function askForAnswerAndCheckIt() {
    console.log(prompt);
    rl.prompt();
  }

  return new Promise((resolve) => {
    rl.on('line', function askForAnswerAndCheckItEvent(answer) {
      answer = answer.trim().toLowerCase();

      for (let i = 0; i !== correctValues.length; i++) {
        if (~answer.indexOf(correctValues[i])) {
          rl.removeListener('line', askForAnswerAndCheckItEvent);
          resolve(answer);
          return;
        }
      }

      askForAnswerAndCheckIt();
    });

    askForAnswerAndCheckIt();
  });
}

module.exports = {
  init,
  askForNumberOfDecks,
  askForNumberCardsMaching
};
