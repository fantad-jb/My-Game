buttonColor = ["green", "red", "yellow", "blue"];

gamePattern = [];
userChosenColor = [];

level = 0;

start = false;

$(document).keypress(function() {
  /* Act on the event */
  if(!start) {
    $(".big-title").text("Level: " + level);
    nextSequence();
    start = true;
  }
});

$(".btn").click(function() {
  /* Act on the event */
  var buttonUserChosen = $(this).attr("id");
  userChosenColor.push(buttonUserChosen);
  makeSound(buttonUserChosen);
  animatePress(buttonUserChosen);
  checkAnswer(userChosenColor.length - 1);
});

function animatePress(buttonClicked) {
  $("." + buttonClicked).addClass("pressed");
  setTimeout(function() {
    $("." + buttonClicked).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userChosenColor[currentLevel]) {
    console.log("Success");
    if(gamePattern.length === userChosenColor.length) {
      setTimeout(function() {
        nextSequence();
      },1000);
    }
  } else {
    console.log("Wrong");
    $("body").addClass('game-over');
    setTimeout(function() {
      $("body").removeClass('game-over');
    }, 1000);
    $(".big-title").text("Game Over! Press Any Key to Restart");
    gameOver();
  }
}

function nextSequence() {
  userChosenColor = [];
  level++;
  $(".big-title").text("Level: " + level);
  var randomColor = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomColor];
  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
  makeSound(randomChosenColor);
}

function makeSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function gameOver() {
  level = 0;
  gamePattern = [];
  start = false;
}
