// Stats values
var countHTML = document.getElementById("count");
var guessesHTML = document.getElementById("letter");
var winsHTML = document.getElementById("wins");
var lossesHTML = document.getElementById("losses");
var nameHTML = document.getElementById("name");
var name2HTML = document.getElementById("name2");
var winsHTML = document.getElementById("wins");
var lossesHTML = document.getElementById("losses");
var timeHTML = document.getElementById("time");
var newGameBtnHTML = document.getElementById("new-game-btn");
// Stats containers
var countRowHTML = document.getElementById("count-row");
var guessesRowHTML = document.getElementById("letter-row");
var winsRowHTML = document.getElementById("wins-row");
var lossesRowHTML = document.getElementById("losses-row");
var nameRowHTML = document.getElementById("name-row");
var name2RowHTML = document.getElementById("name2-row");
var winsRowHTML = document.getElementById("wins-row");
var lossesRowHTML = document.getElementById("losses-row");
var timeRowHTML = document.getElementById("time-row");
// Modal ids
var modalTitleHTML = document.getElementById("modal-title");
var modalHeaderHTML = document.getElementById("modal-header");
var modalBodyHTML = document.getElementById("modal-body");
var modalBtnHTML = document.getElementById("modal-btn");
var modalBtnXHTML = document.getElementById("modal-btn-x");
// Hints values
var hintActiveYearsHTML = document.getElementById("active-years");
var hintoriginHTML = document.getElementById("origin");
var hintinfoHTML = document.getElementById("info");
var hintLeadSingerHTML = document.getElementById("lead-singer");
var hintBandMembersHTML = document.getElementById("band-members");
var hintAlbumsHTML = document.getElementById("albums");
var hintSongsHTML = document.getElementById("songs");

// Create reference to our reset button
// var newGameButton = document.getElementById("new-game-btn");

var x = document.getElementById("myAudio");

function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
}

var hints = {
  ay: "--",
  orig: "--",
  info: "--",
  singer: "--",
  bandmem: "--",
  albums: "--",
  songs: "--",
  ayT: 1,
  originT: 3,
  infoT: 4,
  singerT: 7,
  bandmemT: 8,
  albumsT: 9,
  songsT: 11,
  initHints: function() {
    this.ay = "--";
    this.origin = "--";
    this.info = "--";
    this.singer = "--";
    this.bandmem = "--";
    this.albums = "--";
    this.songs = "--";
  },
  displayHints: function() {
    hintActiveYearsHTML.innerHTML = this.ay;
    hintoriginHTML.innerHTML = this.origin;
    hintinfoHTML.innerHTML = this.info;
    hintLeadSingerHTML.innerHTML = this.singer;
    hintBandMembersHTML.innerHTML = this.bandmem;
    hintAlbumsHTML.innerHTML = this.albums;
    hintSongsHTML.innerHTML = this.songs;
  },
  updateHints: function(time, maxTime) {
    var T = maxTime - time;

    switch (T) {
      case this.ayT:
        this.ay = bands[game.bandOffset].dates;
        break;
      case this.originT:
        this.origin = bands[game.bandOffset].origin;
        break;
      case this.infoT:
        this.info = bands[game.bandOffset].info;
        break;
      case this.singerT:
        this.singer = bands[game.bandOffset].leadSinger;
        break;
      case this.bandmemT:
        this.bandmem = bands[game.bandOffset].bandMembers;
        break;
      case this.albumsT:
        this.albums = bands[game.bandOffset].albums;
        break;
      case this.songsT:
        this.songs = bands[game.bandOffset].songs;
        break;
      default:
    } // switch
  } // updateHints
}; //hints object

var game = {
  // START of Varables
  // START of Varables
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
  firstGame: true, // is this the first game ?
  dialogOpen: false,
  // cntDownInit: 45, //game constant # of seconds allowed
  cntDownInit: 30, //game constant # of seconds allowed
  timeout: false,
  // END of Varables -- start member functions() AKA methods
  // END of Varables -- start member functions() AKA methods
  newGame: function() {
    // start from scratch (including win/loses)
    if (game.firstGame === true) {
      game.initWinCnt();
      game.firstGame = false;
    }
    game.dialogOpen = false;
    //init game
    game.initGame();
    game.initTimer();
    game.updateDisplay();
    hints.initHints();
    hints.displayHints();

    if (game.timeout !== false) {
      clearTimeout(game.timeout);
    }

    game.timeout = setTimeout(game.cntDownFunc, 1000);
    // init hints
    // TBD
  },
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
    //this.bandOffset++; // debugging data
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
    winsHTML.textContent = this.winsCnt.toString();

    lossesHTML.textContent = this.lossCnt.toString();
    timeHTML.textContent = this.cntDown.toString();
    return 0;
  },
  updateModalDisplay: function(bannermgs, answer) {
    modalBodyHTML.textContent = answer;
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
          game.updateDisplay();
          game.showDialog("You are a Winner", this.band);
          // game.initTimer();
          // game.initGame();
          // this.initGame();
        } else if (this.guessCnt === 0) {
          // Ran out of guesses?
          this.lossCnt++;
          game.updateDisplay();
          game.showDialog("Sorry, you lost", this.band);
          // game.initTimer();
          // game.initGame();
          // this.initGame();
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
  showDialog: function(headMsg, bodyMsg) {
    modalHeaderHTML.textContent = headMsg;
    modalBodyHTML.textContent = bodyMsg;

    $("#myModal").modal({
      backdrop: "static",
      keyboard: false // to prevent closing with Esc button (if you want this too)
    });

    this.dialogOpen = true;
    // $("#myModal").on("shown.bs.modal", function() {
    // $("#myInput").focus();
    // });
  },
  cntDownFunc: function() {
    // stop counter when dialog is Open
    if (game.dialogOpen !== true) {
      game.cntDown--;
    }

    if (game.cntDown === 0 && game.dialogOpen !== true) {
      game.lossCnt++;
      game.showDialog("Sorry, you lost", game.band);
      // game.initTimer();
      // game.initGame();
      game.updateDisplay();
    }
    hints.updateHints(game.cntDown, game.cntDownInit);
    hints.displayHints();
    timeHTML.textContent = game.cntDown.toString();
    game.timeout = setTimeout(game.cntDownFunc, 1000);
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

// game.initWinCnt();
// game.initGame();
// game.initTimer();
// game.updateDisplay();

//game.newGame();

// setup countdown timer 1 second

// Add 'click' event listener
modalBtnHTML.addEventListener("click", game.newGame);

modalBtnXHTML.addEventListener("click", game.newGame);

newGameBtnHTML.addEventListener("click", game.newGame);

//  Listen for keyup event on document (DOM)
document.onkeyup = function(event) {
  console.log(event);

  // capture whatever keyboard key i just clicked
  var userKey = event.key;

  // if userKey is 'd', then run driveToWork
  game.processKey(userKey);
};
