
// variable declaration
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

startGame();
function startGame(){
  $(document).keydown(function(event){
    if (!start){
      $("#level-title").text("Level "+level);
      nextSequence();
      start =true;
    }
  });
}

  $(".btn").click(function(event){
    var userChosenColor =  $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
  });



    function checkAnswer(currentLevel){

      if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
          setTimeout(function(){
            nextSequence()
          },1000)
        }

      }
      else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart!")
        startOver();

      }
    }

    function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

      $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
      playSound(randomChosenColour);
}



function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
  }


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed")
  },100);
}
