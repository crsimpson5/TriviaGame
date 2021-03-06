
var questions = []

var intervalId;
var time;
var timerRunning = false;

var correctAs;
var incorrectAs;
var unansweredAs;

var numQuestions;
var sq; // selected question
var correctA;

function intializeQs() {

  // first answer is the correct one
  questions = [
    {
      q: "When was the first moon landing?",
      a: [
        "1969",
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
    },
    {
      q: "Which rocket sent the Apollo 11 crew to the moon?",
      a: [
        "Saturn V",
        "Atlas V",
        "Space Shuttle",
        "Soyuz"
      ]
    },
    {
      q: "What was the name of the Apollo 11 Lunar Module?",
      a: [
        "Eagle",
        "Snoopy",
        "Intrepid",
        "Aquarius"
      ]
    },
    {
      q: "Where did the Apollo 11 crew land on the moon?",
      a: [
        "Sea of Tranquility",
        "Ocean of Storms",
        "Fra Mauro",
        "Hadley Rille/Apennine"
      ]
    },
    {
      q: "How long was the Apollo 11 mission from launch to landing",
      a: [
        "8 days",
        "2 days",
        "13 hours",
        "13 days"
      ]
    },
    {
      q: "What was the Apollo 11 crew size?",
      a: [
        "3 members",
        "2 members",
        "4 members",
        "5 members"
      ]
    },
    {
      q: "Who was the commander of the Apollo 11 mission?",
      a: [
        "Neil Armstrong",
        "Michael Collins",
        "Buzz Aldrin",
        "Alan Shepard"
      ]
    },
    {
      q: "Where was the Apollo 11 rocket launched from?",
      a: [
        "Kennedy Space Center",
        "Vandenberg Air Force Base",
        "Baikonur Cosmodrome",
        "Spaceport America"
      ]
    },
    {
      q: "Where did the Apollo 11 crew land back on earth?",
      a: [
        "Pacific Ocean",
        "Atlantic Ocean",
        "Florida",
        "Kazakhstan"
      ]
    },
    {
      q: "Who was the Apollo 11 Lunar Module Pilot?",
      a: [
        "Buzz Aldrin",
        "Neil Armstrong",
        "Michael Collins",
        "Alan Shepard"
      ]
    }
  ];

  numQuestions = questions.length;
}

function startTimer() {

  if (!timerRunning) {

    $("#timer").text("Time remaining: " + time + " seconds");

    intervalId = setInterval(function () {

      // if there's time left update time display
      if (time > 0) {
        time--;
        $("#timer").text("Time remaining: " + time + " seconds");
      }
      // else stop timer and show correct answer
      else {

        stopTimer();
        unansweredAs++;

        $("#question").empty();
        $("#answers").empty();

        $("#answers").append("<h2>Out of time!</h2>");
        $("#answers").append("<h3>Correct answer: " + correctA + "</h3>");

        setTimeout(nextQuestion, 5000);
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

  // empty fields
  $("#timer").empty();
  $("#question").empty();
  $("#answers").empty();
  $("#question-count").empty();
  $(".divider").remove();

  // display results and show start button to play again
  $("#game-over").append("<h2>All done, here's how you did!</h2>");
  $("#game-over").append("<div class='divider'></div>");
  $("#game-over").append("<h3>Correct answers: " + correctAs + "</h3>");
  $("#game-over").append("<h3>Incorrect answers: " + incorrectAs + "</h3>");
  $("#game-over").append("<h3>Unawnsered: " + unansweredAs + "</h3>");

  $("#start-btn").text("Play again?");
  $("#start-btn").show();
}

function nextQuestion() {

  var sa; // selected answer

  // check if there are any questions left to answer
  if (questions.length > 0) {

    time = 30;

    $("#answers").empty();
    startTimer();

    // select random index of remaining question
    sq = Math.floor(Math.random() * questions.length);

    // set the correct answer for this question
    correctA = questions[sq].a[0];

    $("#question").text(questions[sq].q);

    // display each answer
    while (questions[sq].a.length > 0) {

      // select random answer to display
      sa = Math.floor(Math.random() * questions[sq].a.length);

      newAns = $("<button class='answer-btn'>" + questions[sq].a[sa] + "</button>");
      questions[sq].a.splice(sa, 1);

      $("#answers").append(newAns);
    }

    questions.splice(sq, 1);

    // display which question user is on
    $("#question-count").text("Question " + (numQuestions - questions.length) + " of " + numQuestions);
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
  $("#start-text").remove();
  $(".divider").remove();
  $("<div class='divider'></div>").insertAfter("#timer");

  intializeQs();
  nextQuestion();
}

function checkAnswer() {

  var answer = $(this).text();
  
  stopTimer();
  $("#question").empty();
  $("#answers").empty();

  // check if selected answer is correct
  if (answer === correctA) {
    correctAs++;

    $("#answers").append("<h2>Correct!</h2>");
    setTimeout(nextQuestion, 3000);
  }
  // else display correct answer
  else {
    incorrectAs++;

    $("#answers").append("<h2>Wrong!</h2>");
    $("#answers").append("<h3>Correct answer: " + correctA + "</h3>");
    setTimeout(nextQuestion, 5000);
  }
}

$("#start-btn").on("click", startGame);

$(document).on("click", ".answer-btn", checkAnswer);
