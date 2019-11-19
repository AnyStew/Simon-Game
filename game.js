var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(".btn").click(function() {
  if (gameStarted) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1); // passing last answer index
  }
});

$(document).keypress(function() {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

function startOver() {
  gamePattern = [];
  gameStarted = false;
  level = 0;
}

function checkAnswer(lastAnswerIndex) {
  if (userClickedPattern[lastAnswerIndex] === gamePattern[lastAnswerIndex]) {
    $("#level-title").text("Right answer!");
    if (userClickedPattern.length === gamePattern.length) {
      gameStarted = false;
      $("#level-title").text("Going to next level!");
      setTimeout(function() {
        nextSequence();
        gameStarted = true;
      }, 1500);
    }
  } else {
    playSound('wrong');
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over. Press Any Key To Restart.");
    startOver();
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  animatePress(randomChosenColour);
  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);

  userClickedPattern = [];
}

function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function() {
      $("#" + name).removeClass("pressed");
    },
    100
  );
}

function playSound(color) {
  switch (color) {
    case "blue":
      var audioBlue = new Audio('sounds/blue.mp3');
      audioBlue.play();
      break;
    case "green":
      var audioGreen = new Audio('sounds/green.mp3');
      audioGreen.play();
      break;
    case "red":
      var audioRed = new Audio('sounds/red.mp3');
      audioRed.play();
      break;
    case "wrong":
      var audioWrong = new Audio('sounds/wrong.mp3');
      audioWrong.play();
      break;
    case "yellow":
      var audioYellow = new Audio('sounds/yellow.mp3');
      audioYellow.play();
      break;
    default:
      console.log(event);
  }
}
