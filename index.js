const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function prompt(promptText) {
  return new Promise((resolve, reject) => {
    rl.question(promptText, resolve);
  });
}

// this is for testing purposes
async function start() {
  guessTheNumberGame();
}
async function guessTheNumberGame() {
  console.log(
    "Let's play a game where you (human) make up a number and I `(computer) try to guess it."
  );
  let max = await prompt("Choose your range greater than 1 \n");
  console.log(`Your range will be between 1 - ${max}`);
  let secretNumber = await prompt(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log(`You entered: ${secretNumber}`);
  if (secretNumber < 0 || secretNumber > 100 || isNaN(secretNumber)) {
    console.log(
      "Please, make sure to input a number between 1 - 100. Start over!"
    );
    process.exit();
  } else {
    console.log("Let's begin!");
  }
  function getRandomNumberFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let min = 1;
  const maxAttempts = Math.floor(Math.log2(max) + 1);

  let randomNumber = getRandomNumberFromRange(min, max);
  let attempts = 1;
  //games asks you to guess number
  while (true) {
    if (attempts > maxAttempts) {
      console.log("But I've run out of attempts. GAME OVER");
      process.exit();
    } else {
      let guessResponse = await prompt(
        `Attempt Number ${attempts}/${maxAttempts}.\nI think your number is ${randomNumber}.\nIs this right? Is your number higher or lower?\n   (R) - Right\n   (H) - Higher\n   (L) - Lower\n`
      );
      let guess = guessResponse.toLowerCase(); //sanitze input to lowercase
      if (guess === "r") {
        console.log(`Yay! I guessed correctly!\n End of game.`);
        playAgain();
        // write call back function outside of start to restart game
      } else if (guess === "h") {
        console.log(`Ok. The number is higher.`);
        min = randomNumber + 1;
        randomNumber = getRandomNumberFromRange(min, max);
      } else if (guess === "l") {
        console.log(`Ok. The number is lower.`);
        max = randomNumber - 1;
        randomNumber = getRandomNumberFromRange(min, max);
      } else {
        console.log(
          `Please answer (R) - Right\n   (H) - Higher\n   (L) - Lower\n `
        );
      }
      attempts++; // increment attempts by 1
    }
  }
}

start();
async function playAgain() {
  // this functions asks: "do you want to play again?"
  let response = await prompt("Would you like to play again(y/n)?\n");
  if (response.toLowerCase() === "y") {
    start();
  } else {
    process.exit();
  }
}
