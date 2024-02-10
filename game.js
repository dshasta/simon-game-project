var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var gameStarted = false;

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  userClickedPattern = [];

  $("h1").html("Level " + level);

  $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
  playSound(randomChosenColor);

  checkAnswer();
}

function playSound(name) {
  var buttonSound = new Audio("./sounds/" + name + ".mp3")
        buttonSound.play();

      
}


$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  var currentLevel = userClickedPattern.length - 1;
  checkAnswer(currentLevel);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
          // Delay before advancing to the next level
          setTimeout(function() {
              level++; // Increment level only after the delay
              $("h1").html("Level " + level); // Update the level display after the delay
              nextSequence(); // Move to the next level after the delay
          }, 1000);
      }
  } else {
      gameStarted = false;
      startOver(); // Reset the game to start over
  }
}

function gameOver(){
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);

  playSound("wrong");


}

function startOver() {
  level = 1;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false; // Ensure the game can be restarted on the next keypress
  gameOver();
  $("h1").html("Game Over, Press (or tap) Any Key to Start");
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


$(document).on("keydown touchstart", function(event) {
  // Prevent multiple starts on touch devices
  if (!gameStarted) {
      // Prevent the default action to avoid handling both touchstart and click events
      event.preventDefault(); 
      gameStarted = true;
      $("h1").html("Level " + level); // Update this line if you want to show the level at the start
      nextSequence(); // Initialize the first sequence of the game
  }
});
