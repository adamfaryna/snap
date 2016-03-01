'use strict';

var Gameplay = require('./gameplay');

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
    printExitMessage();
    process.exit();
  }
}

function printExitMessage() {
  console.log('Thanks for playing. Bye!');
}

new Gameplay().play();
