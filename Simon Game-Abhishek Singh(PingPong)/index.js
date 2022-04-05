var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

 // Used jQuery to detect when a keyboard key has been pressed, when that happens for the first time calling f'n "nextSequence()".
$(document).keypress(function() {
  if (!started) {

    // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {

  //8.6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  // Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 5);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
    playSound(randomChosenColour);
}

// function nextSequence() {
//
//   var randomNumber = Math.floor(Math.random() * 4);
//   var randomChosenColour = buttonColours[randomNumber];
//   gamePattern.push(randomChosenColour);
//
//   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
//
//   var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
//   audio.play();
// }




// Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  // this is used that will store the "id" ofthe button which will be pressed at store it to the variable also remeber the syntax;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  //if I will keep this console.log outside this then it will not show the output in the console.


  // In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);
  //this both above and down are called as calling a function
  animatePress(userChosenColour);

  //8.2 Calling checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
  //e.g. If the user has pressed red, green, red, yellow, the index of the last answer is 3.
  //whatever be the inside the f'n is called as the passing the value of the parameter to the function
});


//8.3 this is the real functioning or say the real logic of the game;
function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

  console.log("success");

  //8.4 If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //8.5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
} else {

      console.log("wrong");
      playSound("wrong");
      //9.2 In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      // here we have chosen a class that will produce a back-ground color to the background of the body when the game
      // gets over
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      //here the text is added to the id-level title

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Refresh the Game to Restart");
      startover(reset);

    }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();


}

function startover(reset) {
  //HERE WE HAVE LEARNED A NEW THING IS THAT WE HAVE RESTARTED A NEW VALUE TO THE PARAMETER
  level = 0;
  gamePattern = [];
  started = false;
  //WHAT WE ARE DOING HERE IS WE ARE RESTARTING THE INITIAL VALUES WHICH ARE BEING ALREADY PROVIDED ABOVE IN THE CODE;
}

function animatePress(currentColour) {
  //this will add the class to the key that will be pressed by the user
  //and here we have used the id because the id for every key is unique in the above given.
  $("#" + currentColour).addClass(".pressed");

//This same timeout f'n I have also used in the DrumKit project. What It will do is basically it will remove the effect
// that was applied to it after 100 milliseconds after pressing it
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
  //this 100 above is basically the 100ms
}





// If this type of O/P is shown in console the you are ready with the jQury code:
// $("h1");
// S.fn.init [h1#level-title, prevObject: S.fn.init(1)]


//MADE WITH LOVE BY ABHISHEK SINGH
