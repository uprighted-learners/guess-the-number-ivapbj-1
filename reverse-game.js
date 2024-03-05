const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

async function prompt(promptText) {
  return new Promise((resolve, reject) => {
    rl.question(promptText, resolve);
  });
}
//this comment is for testing purposes
async function start() {
  await guessTheNumber();
}
async function guessTheNumber() {
  // program picks a random number between 1-100
  const secretNumber = Math.floor(Math.random() * 101);
  // console.log("secretNumber", secretNumber);
  // tells info needed to play game
  console.log(
    "Let's play a game where I (computer) make up a number and you (human) try to guess it correctly"
  );

  //games asks you to guess number
  let userGuess = await prompt(`Whats the number you want to guess 1-100?\n`);
  userGuess = parseInt(userGuess);

  while (true) {
    // check to see if the user guessed the secret number correctly
    if (parseInt(userGuess) === secretNumber) {
      console.log(" Yay, you did it!");
      process.exit(); //replace this with a call to function- to run the start function(its a callback)

      // if not, determine if the number that the user guessed is higher or lower
    } else if (userGuess > secretNumber) {
      console.log(`try a lower number`);
    } else {
      console.log(`try a higher number`);
    }
    userGuess = parseInt(await prompt("Guess again \n"));
  }
}

start();
// ~ To run this code, open Terminal and enter 'node reverse_game.js'
