const allLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

$(document).ready(function() {
  //////////////////////////////
  // Setup the game
  /////////////////////////////
  let secretsList = ["cat","lynx","phone","zeus","olympic"]; // <------------ enter more words here
  // Choose a secret word randomly from secretsList
  let secretWord = secretsList[Math.floor(Math.random() * secretsList.length)];

   // You can only guess wrong 6 times (head, body, left arm, right arm, left leg, rigth leg)
  let maxWrongGuesses = 3;
  let wrongGuesses = 0; // The number of times you have guessed wrong
  let correctGuesses = 0; // The number of letters you found correctly
  let guesses = []; // All the guesses you have made

  let $wrongGuesses = $("#wrong-guesses");

  $("#maximumincorrect").html(maxWrongGuesses)

   for (let i = 0; i < secretWord.length; i++) {
    $("#word-spaces").append(`<div id="word-space-${i}" class="word-space"></div>`);
  }

  //////////////////////////////
  // Check a guess
  /////////////////////////////
  function handleGuess() {
    const guess = $("#guess-box").val();
    
    console.log('im a button' + guess);
    console.log('is ok guess result: ' + isOkGuess(guess));
    guesses.push(guess)
    $wrongGuesses.append(guess)
    
    if (guessOnWord(guess)){
      correctGuesses=correctGuesses+1
      console.log(correctGuesses)
      $("#numbercorrect").html(correctGuesses)

      const allIndices = getAllIndexes(secretWord, guess);
      for (let i = 0; i < allIndices.length; i++) {
        const j = allIndices[i];
        $(`#word-space-${j}`).html(guess);}
    }
    else{
      wrongGuesses=wrongGuesses+1
      console.log(wrongGuesses)
      $("#numberincorrect").html(wrongGuesses)

      if (wrongGuesses==maxWrongGuesses){
        debugger;
      alert("GAME OVER")
     Restart()
     
      
      }
    }
    
  }

  //////////////////////////////
  // Make sure the guess is a single letter
  // '' is wrong
  // '6' is wrong
  // 'ga' is wrong
  // 'b' is correct
  /////////////////////////////
  function isOkGuess(guess) {
    if (guess.length === 0) {
      alert("You didn't guess anything!");
      return false;
    }
    if (!isLetter(guess)) {
      alert('That is not a letter!');
      return false;
    }
    if (guesses.indexOf(guess) >= 0) {
      alert("You already guessed that!");
      return false;
    }
    return true;
  }

   //////////////////////////////
  // Check that guess is a letter
  /////////////////////////////
  function isLetter(guess) {
    return allLetters.includes(guess);
  }
  console.log('sdfd');
  $("#im-a-button").click(function() {
    handleGuess()
    
  });
  function guessOnWord(guess){
    const guessIsCorrect = secretWord.includes(guess);
    console.log('answer'+ guessIsCorrect)
    return guessIsCorrect
  }


  function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

function Restart() {
secretWord = secretsList[Math.floor(Math.random() * secretsList.length)];

   // You can only guess wrong 6 times (head, body, left arm, right arm, left leg, rigth leg)
  maxWrongGuesses = 6;
  wrongGuesses = 0; // The number of times you have guessed wrong
  correctGuesses = 0; // The number of letters you found correctly
  guesses = []; // All the guesses you have made

  $wrongGuesses = $("#wrong-guesses");

  $("#maximumincorrect").html(maxWrongGuesses)
  $("#numberincorrect").html("");
  $("#numbercorrect").html("");
  $("#wrong-guesses").html("");
  $("#word-spaces").empty();
   for (let i = 0; i < secretWord.length; i++) {
    $("#word-spaces").append(`<div id="word-space-${i}" class="word-space"></div>`);
  }
}
});

