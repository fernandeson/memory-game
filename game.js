// ---------------------- GLOBAL VARIABLES ---------------------- //
var level = 1; // goes from 1 to 10
var totalClicks = 0; // click counter
var firstClick = true;
var numberOfCards = 0; // goes from 4 to 40 (increases 4 at each levelUp)
var userGuesses = []; // list of user's guesses
var images = []; // array of images urls

// ---------------------- FUNCTIONS ---------------------- //
// Starts new game according to level
function newGame(gameLevel) {
  // start over - clears everything
  $(".cards").empty();
  images = [];
  totalClicks = 0;

  $("#level").text("Level:" + gameLevel);
  $("#clicks").text("Clicks: " + totalClicks);

  numberOfCards = 4 * gameLevel; // total of cards to play with: level-1: 4cards; level-2: 8; level3: 12; ... ; level10: 40cards;

  // creates HTML elements <img> (cards)
  for (var i=0; i<numberOfCards; i++) {
    var newCard = $("<img id='img" + i + "' class='card-img card-back'>");
    $(".cards").append(newCard);
    newCard.attr("src", "images/lotus.png");
  };

  // viewport width according to number of cards
    if (gameLevel <= 4) {
      $(".cards").css("max-width", "70vw");
    } else if (gameLevel > 4) {
      $(".cards").css("max-width", "90vw");
    }

  // populates images array
  for (var i=0; i<(numberOfCards/2); i++){
    images.push("images/" + i + ".png");
    images.push("images/" + i + ".png");
  };
  // shuffle images array with Fisher-Yates method
  for (var i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = images[i];
    images[i] = images[j];
    images[j] = temp;
  }
};

// Flips card and changes img url - animation function
function flipCard(element) {
  element.toggleClass("card-front card-back");
  setTimeout(function(){
    if (element.hasClass("card-front")) {
      element.attr("src", images[element.attr("id").slice(3)]);
    } else if (element.hasClass("card-back")) {
      element.attr("src", "images/lotus.png");
    }
  },200);
};

// Checks if user guesses are a match
function checkGuess() {
  setTimeout(function(){
    if (userGuesses.length === 2){
        if (images[userGuesses[0]] === images[userGuesses[1]]) {
          $("#img" + userGuesses[0]).addClass("frozen-card");
          $("#img" + userGuesses[1]).addClass("frozen-card");
          checkScore();
        } else {
          flipCard($("#img" + userGuesses[0]));
          flipCard($("#img"+ userGuesses[1]));
        }
      userGuesses = [];
      firstClick = true;
      $(".card-back").css("pointer-events", "");
    }
  }, 1000);
};

// Checks if all cards were guessed
function checkScore() {
  if ($("img.frozen-card").length === $("img").length) {
    $("img").addClass("vibrate");
    setTimeout(function(){
      if (level > 10) {
        alert("You Won!! Start again for more fun..");
        level = 1;
        newGame(level);
      } else {
        level ++;
        newGame(level);
      }
    }, 1200);
  }
}

// ---------------------- EVENT LISTENERS ---------------------- //
// on load start game:
$(document).ready(function() {
  setTimeout(function(){ newGame(level); }, 2000);
});

// on <img> click:
$(".cards").on("click", "img", function(){
  if (firstClick === false) {
    $(".card-back").css("pointer-events", "none");

    flipCard($(this));

    userGuesses.push($(this).attr("id").slice(3));
    checkGuess();

    totalClicks ++;
    $("#clicks").text("Clicks: " + totalClicks);

  } else if (firstClick === true) {
    flipCard($(this));

    userGuesses.push($(this).attr("id").slice(3));

    totalClicks ++;
    $("#clicks").text("Clicks: " + totalClicks);

    firstClick = false;
  }
});
