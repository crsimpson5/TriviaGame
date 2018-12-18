
var questions = []

var intervalId;
var time;
var timerRunning = false;

var correctAs;
var incorrectAs;
var unansweredAs;


var sq; // selected question
var correctA;

function intializeQs() {

  questions = [
    {
      q: "When was the first moon landing?",
      a: [
        "1969", // first answer is the correct one
        "1958",
        "1971",
        "1968"
      ]
    },
    {
      q: "In the Apollo 11 mission, which astronaut stayed in orbit while the others landed on the moon?",
      a: [
        "Michael Collins",
        "Buzz Aldrin",
        "Neil Armstrong",
        "Alan Shepard"
      ]
    }];
}

function startTimer() {

  if (!timerRunning) {

    $("#timer").text("Time remaining: " + time + " seconds");

    intervalId = setInterval(function () {

      if (time > 0) {
        time--;
        $("#timer").text("Time remaining: " + time + " seconds");
      }
      else {

        stopTimer();
        unansweredAs++;

        $("#question").empty();
        $("#answers").empty();

        // show correct answer
        $("#answers").append("<h2>Out of time!</h2>");
        $("#answers").append("<h2>Correct answer: " + correctA + "</h2>");

        // go to next question after 7 seconds
        setTimeout(nextQuestion, 3000);

      }

    }, 1000);
    timerRunning = true;
  }
}

function stopTimer() {

  clearInterval(intervalId);
  timerRunning = false;
}

function gameOver() {

  $("#timer").empty();
  $("#question").empty();
  $("#answers").empty();

  $("#game-over").text("All done, here's how you did!");
  $("#game-over").append("<h3>Correct answers: " + correctAs + "</h3>")
  $("#game-over").append("<h3>Incorrect answers: " + incorrectAs + "</h3>")
  $("#game-over").append("<h3>Unawnsered: " + unansweredAs + "</h3>")

  $("#start-btn").text("Play again?");
  $("#start-btn").show();

}

function nextQuestion() {

  var sa; // selected answer

  if (questions.length > 0) {
    time = 5;
    $("#answers").empty();

    // display timer
    startTimer();

    // select random quesiton
    sq = Math.floor(Math.random() * questions.length);

    // set the correct answer for this question
    correctA = questions[sq].a[0];

    $("#question").text(questions[sq].q);

    while (questions[sq].a.length > 0) {

      // select random answer to display
      sa = Math.floor(Math.random() * questions[sq].a.length);

      newAns = $("<h2 class='answer-btn'>" + questions[sq].a[sa] + "</h2>");
      questions[sq].a.splice(sa, 1);

      $("#answers").append(newAns);
    }

    questions.splice(sq, 1);
  }
  else {
    gameOver();
  }
}

function startGame() {

  correctAs = 0;
  incorrectAs = 0;
  unansweredAs = 0;

  $("#game-over").empty();
  $("#start-btn").hide();

  intializeQs();
  nextQuestion();
}

function checkAnswer(selectedBtn) {

  stopTimer();
  $("#question").empty();
  $("#answers").empty();

  if (selectedBtn.text() === correctA) {
    correctAs++;

    $("#answers").append("<h2>Correct!</h2>");
  }
  else {
    incorrectAs++;

    $("#answers").append("<h2>Wrong!</h2>");
    $("#answers").append("<h2>Correct answer: " + correctA + "</h2>");
  }

  setTimeout(nextQuestion, 3000);
}

$("#start-btn").on("click", startGame);

$("body").on("click", ".answer-btn", function() { checkAnswer($(this)) });



























/*

Display start button
When button is clicked display first question and start the timer


*/