var countHTML = document.getElementById("count");
var guessesHTML = document.getElementById("letter");
var winsHTML = document.getElementById("wins");
var lossesHTML = document.getElementById("losses");
var nameHTML = document.getElementById("name");
var name2HTML = document.getElementById("name2");
var name3HTML = document.getElementById("name3");
var winsHTML = document.getElementById("wins");
var lossesHTML = document.getElementById("losses");
var timeHTML = document.getElementById("time");

var countRowHTML = document.getElementById("count-row");
var guessesRowHTML = document.getElementById("letter-row");
var winsRowHTML = document.getElementById("wins-row");
var lossesRowHTML = document.getElementById("losses-row");
var nameRowHTML = document.getElementById("name-row");
var name2RowHTML = document.getElementById("name2-row");
var winsRowHTML = document.getElementById("wins-row");
var lossesRowHTML = document.getElementById("losses-row");
var timeRowHTML = document.getElementById("time-row");

// Create reference to our reset button
// var newGameButton = document.getElementById("new-game-btn");

var x = document.getElementById("myAudio");

function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
}

var game = {
  band: "", // Name to guess
  bandMask: "", // Name to guess
  bandOffset: 0, //offset to band to guess
  guesses: "", // string of guessed chars.
  guessCnt: 0, // guess count remaining
  //guessCntStr: "", // guess count remaining
  winsCnt: 0,
  lossCnt: 0,

  guessMax: 12, //game constant # of guess allowed

  cntDown: 0, // count Down timer in seconds
 // cntDownInit: 45, //game constant # of seconds allowed
  cntDownInit: 10, //game constant # of seconds allowed
  initWinCnt: function() {
    this.winsCnt = 0;
    //winsHTML.textContent = this.winsCnt.toString();

    this.lossCnt = 0;
    //lossesHTML.textContent = this.lossCnt.toString();
  },
  initTimer: function() {
    this.cntDown = this.cntDownInit;
  },
  initGame: function() {
    // reset counters
    this.guesses = "";
    // guessesHTML.textContent = this.guesses;

    this.guessCnt = this.guessMax;
    // countHTML.textContent = this.guessCnt.toString();
    // randomly pick band
    this.bandOffset = Math.floor(Math.random() * bands.length);
    this.band = bands[this.bandOffset].Name;
    this.bandMask = this.createMask(this.band);
    // nameHTML.textContent = this.bandMask;
    // name2HTML.textContent = this.band;
    return 0;
  },
  updateDisplay: function() {
    // reset counters

    guessesHTML.textContent = this.guesses;

    countHTML.textContent = this.guessCnt.toString();
    // randomly pick band

    nameHTML.textContent = this.bandMask;
    name2HTML.textContent = this.band;
    name3HTML.textContent = this.band;
    winsHTML.textContent = this.winsCnt.toString();

    lossesHTML.textContent = this.lossCnt.toString();
    timeHTML.textContent = this.cntDown.toString();
    return 0;
  },
  createMask: function(str) {
    var s = "";
    for (i = 0; i < str.length; i++) {
      if (str[i] == " ")
        // is space char;
        s += " ";
      else s += "-";
    }
    return s;
  },
  isWinner: function(str) {
    // winner is when there is no "-" chars left
    var retval = true;
    for (i = 0; i < str.length && retval === true; i++) {
      if (str[i] == "-") retval = false;
    }
    return retval;
  },
  updateMask: function(key) {
    var s = "";
    for (i = 0; i < this.band.length; i++) {
      if (this.band[i].toLowerCase() == key) {
        s += this.band[i];
      } else {
        s += this.bandMask[i];
      }
    }
    return s;
  },
  processKey: function(key) {
    if (this.isValidKey(key)) {
      if (this.isNewKey(key)) {
        this.guesses += key;

        if (this.isKeyInName(key)) {
          this.bandMask = this.updateMask(key);
        }
        this.guessCnt--;
        // Guess all the letters? // Is this a winner?
        if (this.isWinner(this.bandMask)) {
          this.winsCnt++;
          this.initGame();
        } else if (this.guessCnt === 0) {
          // Ran out of guesses?
          this.lossCnt++;
          this.initGame();
        }
      }
      this.updateDisplay();
      // update guess count cnt
      // Is this a loser
    } // valid key?
  },
  isKeyInName: function(key) {
    var retval = false;
    for (var i = 0; i < this.band.length; i++) {
      if (key === this.band[i].toLowerCase()) {
        retval = true;
      }
    }
    return retval;
  },
  // WORKING HERE
  isValidKey: function(key) {
    var retval = false;
    if (key >= "a" && key <= "z") {
      retval = true;
    }
    return retval;
  },
  isNewKey: function(key) {
    var retval = true; // assume new value
    for (var i = 0; i < this.guesses.length; i++) {
      if (key === this.guesses[i]) {
        retval = false;
      }
    }
    return retval;
  },
  showDialog: function() {
    $("#myModal").modal();
    // $("#myModal").on("shown.bs.modal", function() {
      // $("#myInput").focus();
    // });
  },
  cntDownFunc: function() {
    game.cntDown--;

    if (game.cntDown === 0) {
      game.lossCnt++;
      game.showDialog();
      game.initTimer();
      game.initGame();
      game.updateDisplay();
    } 
      timeHTML.textContent = game.cntDown.toString();
      setTimeout(game.cntDownFunc, 1000);
    
  }
  // ,
  // WORKING HERE
  // IsGameOver: function() {
  //   retval = false;
  //   if (this.remainingGuesses === 0) {
  //     retval = true;
  //   }
  //   return 0;
  // },
  // isCorrectGuess: function(char) {
  //   var result = false;
  //   alert("Old Mileage: " + this.mileage);
  //   this.mileage = this.mileage + 24000;
  //   alert("New Mileage: " + this.mileage);
  //   alert("Car needs a tuneup!");

  //   this.isWorking = false;
  //   return result;
  // }
};

game.initWinCnt();
game.initGame();
game.initTimer();
game.updateDisplay();

// setup countdown timer 1 second
setTimeout(game.cntDownFunc, 1000);

// Add 'click' event listener
// newGameButton.addEventListener("click", game.newGame);

//  Listen for keyup event on document (DOM)
document.onkeyup = function(event) {
  console.log(event);

  // capture whatever keyboard key i just clicked
  var userKey = event.key;

  // if userKey is 'd', then run driveToWork
  game.processKey(userKey);
};
