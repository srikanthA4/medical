// Generate a random number with four digits and no duplicates
function generateNumber() {
  let digits = Array.from({length: 10}, (_, i) => i);
  let number = "";
  for (let i = 0; i < 4; i++) {
    let index = Math.floor(Math.random() * digits.length);
    number += digits[index];
    digits.splice(index, 1);
  }
  return number;
}

// Evaluate the user's guess and return the result as a string
function evaluateGuess(guess, number) {
  let result = "";
  for (let i = 0; i < 4; i++) {
    if (guess[i] == number[i]) {
      result += "+";
    } else if (number.includes(guess[i])) {
      result += "-";
    } else {
      result += "*";
    }
  }
  return result;
}

// Play the game
function playGame() {
  // Get the user's name
  let name = prompt("Enter your name:");
  console.log(`Welcome, ${name}!`);
  
  // Generate the random number
  let number = generateNumber();
  let guesses = 0;
  let bestScore = Infinity;
  
  // Loop until the user guesses the number
  while (true) {
    // Get the user's guess
    let guess = prompt("Enter a four-digit number:");
    if (guess.length != 4 || !guess.match(/^\d+$/)) {
      console.log("Invalid input. Please enter a four-digit number.");
      continue;
    }
    guess = guess.split("").map(Number);
    
    // Evaluate the user's guess and display the result
    let result = evaluateGuess(guess, number);
    console.log(result);
    
    // Update the number of guesses
    guesses++;
    
    // Check if the user guessed the number correctly
    if (result == "++++") {
      console.log(`Congratulations, ${name}! You guessed the number in ${guesses} guesses.`);
      
      // Save the user's score to a database
      // (This code assumes the existence of a database connection and a "scores" table.)
      let now = new Date();
      let timestamp = now.toISOString().slice(0, 19).replace("T", " ");
      dbConnection.query("INSERT INTO scores (name, guesses, time) VALUES (?, ?, ?)", [name, guesses, timestamp], (err) => {
        if (err) {
          console.log(err.message);
        }
      });
      
      // Update the best score
      if (guesses < bestScore) {
        bestScore = guesses;
      }
      
      // Ask the user if they want to play again
      let playAgain = prompt("Do you want to play again? (y/n):");
      if (playAgain.toLowerCase() == "y") {
        playGame();
      } else {
        break;
      }
    }
  }
}

// Start the game
playGame();
