// FUNCTIONS

function addPattern() {
  var rand = Math.floor(Math.random() * 4);
  pattern.push(rand);
  setTimeout(() => {
    pressedAnimationName(colors[rand]);
    pressedAudioName(colors[rand]);
  }, 400);
}

function pressedAnimationName(color) {
  $("#" + color).addClass("pressed");
  setTimeout(() => {
    $("#" + color).removeClass("pressed");
  }, 200);
}
function pressedAudioName(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// CODE

var currInd = 0;
var pattern = [];
var colors = ["blue", "green", "red", "yellow"];
var started = false;
var level = 0;
$(document).keydown(function() {
  if (!started) {
    level++;
    $("#level-title").text("Level " + level);
    started = true;
    addPattern();
  }
});

$("div.btn").click(function(ev) {
  if (started) {
    var id = $(this).attr("id");
    pressedAnimationName(id);
    if (id == colors[pattern[currInd]]) {
      pressedAudioName(id);
      currInd++;
      if (currInd == pattern.length) {
        level++;
        $("#level-title").text("Level " + level);
        currInd = 0;
        addPattern();
      }
    } else {
      pressedAudioName("wrong");
      pattern = [];
      started = false;
      currInd = 0;
      level = 0;
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }
  }
});
