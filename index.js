// Import the readline module to handle input and output
const readline = require("readline");
// Create an interface to read from standard input and output
const rl = readline.createInterface(process.stdin, process.stdout);

// Function to prompt the user with a question and return their input as a promise
async function prompt(promptText) {
  return new Promise((resolve, reject) => {
    rl.question(promptText, resolve);
  });
}

// Function to start the game; used for testing purposes
async function start() {
  await guessTheNumberGame();
}

// Main function for the "Guess The Number" game where the user thinks of a number and the computer guesses
async function guessTheNumberGame() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );

  // Prompt the user to choose a range for the game
  let max = await prompt("Choose your range greater than 1 \n");
  max = parseInt(max);
  if (isNaN(max) || max <= 1) {
    console.log("Invalid range. Please start the game again.");
    process.exit();
  }
  console.log(`Your range will be between 1 - ${max}`);

  // Prompt the user to enter their secret number
  let secretNumber = await prompt(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  secretNumber = parseInt(secretNumber);
  console.log(`You entered: ${secretNumber}`);

  // Validate the secret number to ensure it's within the range and is a number
  if (secretNumber < 1 || secretNumber > max || isNaN(secretNumber)) {
    console.log(
      `Please, make sure to input a number between 1 - ${max}. Start over!`
    );
    process.exit();
  } else {
    console.log("Let's begin!");
  }

  // Function to generate a random number between min and max (inclusive)
  function getRandomNumberFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Initialize the minimum range and calculate the maximum number of attempts
  let min = 1;
  const maxAttempts = Math.floor(Math.log2(max) + 1);

  // Generate the first random guess
  let randomNumber = getRandomNumberFromRange(min, max);
  let attempts = 1;

  // Main loop to handle guessing until the correct number is found or attempts run out
  while (true) {
    // Check if the maximum number of attempts has been reached
    if (attempts > maxAttempts) {
      console.log("But I've run out of attempts. GAME OVER");
      process.exit();
    } else {
      // Prompt the user to respond to the guess
      let guessResponse = await prompt(
        `Attempt Number ${attempts}/${maxAttempts}.\nI think your number is ${randomNumber}.\nIs this right? Is your number higher or lower?\n   (R) - Right\n   (H) - Higher\n   (L) - Lower\n`
      );
      // Sanitize input to lowercase
      let guess = guessResponse.toLowerCase();

      // Check if the guess is correct
      if (guess === "r") {
        console.log(`Yay! I guessed correctly!\n End of game.`);
        playAgain(); // Ask if the user wants to play again
        break;
      } else if (guess === "h") {
        // If the guess is too low, update the minimum range and generate a new guess
        if (randomNumber >= secretNumber) {
          console.log(`Inconsistent response detected. Please don't cheat!`);
          process.exit();
        }
        console.log(`Ok. The number is higher.`);
        min = randomNumber + 1;
        randomNumber = getRandomNumberFromRange(min, max);
      } else if (guess === "l") {
        // If the guess is too high, update the maximum range and generate a new guess
        if (randomNumber <= secretNumber) {
          console.log(`Inconsistent response detected. Please don't cheat!`);
          process.exit();
        }
        console.log(`Ok. The number is lower.`);
        max = randomNumber - 1;
        randomNumber = getRandomNumberFromRange(min, max);
      } else {
        // Handle invalid input
        console.log(
          `Please answer (R) - Right\n   (H) - Higher\n   (L) - Lower\n `
        );
      }
      // Increment the number of attempts
      attempts++;
    }
  }
}

// Function to ask the user if they want to play again
async function playAgain() {
  let response = await prompt("Would you like to play again(y/n)?\n");
  if (response.toLowerCase() === "y") {
    start(); // Restart the game if the user wants to play again
  } else {
    process.exit(); // Exit the program if the user doesn't want to play again
  }
}

// Additional game where the computer picks a number and the user tries to guess it
async function guessTheNumber() {
  // Program picks a random number between 1-100
  const secretNumber = Math.floor(Math.random() * 101);
  // Uncomment the line below to see the secret number for testing
  // console.log("secretNumber", secretNumber);

  // Explains the game to the user
  console.log(
    "Let's play a game where I (computer) make up a number and you (human) try to guess it correctly"
  );

  // Ask the user to guess the number
  let userGuess = await prompt(`What's the number you want to guess 1-100?\n`);
  userGuess = parseInt(userGuess);

  while (true) {
    // Check if the user guessed the secret number correctly
    if (userGuess === secretNumber) {
      console.log("Yay, you did it!");
      playAgain(); // Replace process.exit() with a call to playAgain to ask if the user wants to play again
      break;
    } else if (userGuess > secretNumber) {
      // If the guess is too high
      console.log(`Try a lower number`);
    } else {
      // If the guess is too low
      console.log(`Try a higher number`);
    }
    // Prompt the user to guess again
    userGuess = parseInt(await prompt("Guess again \n"));
  }
}

// Start the game
start();

// ~ To run this code, open Terminal and enter 'node guess_game.js'
