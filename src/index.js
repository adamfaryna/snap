'use strict';

const Gameplay = require('./gameplay');

process.stdin.resume(); //so the program will not close instantly

process.on('exit', exitHandler.bind(null, {cleanup: true}));
process.on('SIGINT', exitHandler.bind(null, {exit: true}));
process.on('uncaughtException', exitHandler.bind(null, {exit: true}));

function exitHandler(options, err) {
  if (options.cleanup) {
    printExitMessage();

  } else if (err) {
    console.log('Something bad happened: ' + err.stack);

  } else if (options.exit) {
    process.exit();
  }
}

function printExitMessage() {
  console.log('\nThanks for playing. Bye!');
}

new Gameplay().play();
