
let userClickedPattern = [];
let gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

$(document).ready()

$(document).on("keypress", function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence() {
  
  level += 1;
  $("h1").text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

 playSound(randomChosenColour);
 userClickedPattern = [];

}

$(".btn").on('click', function(e) {
  // console.log(e.target.id)
  let userChosenColour = e.target.id;
  //(e)がなかったらこの書き方
  // var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
 
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}


function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // console.log("success");

    if(userClickedPattern.length === gamePattern.length) {
      setTimeout (function() {
        nextSequence();
      }, 1000);
    }

  } else {
    $("body").addClass("game-over");
    setTimeout (function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    // console.log("wrong");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  
}