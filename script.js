let secretNumber = 0;
      let attempts = 0;
      let guesses = [];
      let gamesWon = 0;
      let bestScore = null;

      function initGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        guesses = [];
        updateDisplay();
        $("#feedback").html("");
        $("#guessInput").val("").prop("disabled", false).focus();
        $("#guessBtn").prop("disabled", false);
      }

      function updateDisplay() {
        $("#attempts").text(attempts);
        $("#bestScore").text(bestScore === null ? "-" : bestScore);
        $("#gamesWon").text(gamesWon);

        let historyHTML = "";
        guesses.forEach(function (g) {
          let badgeClass = g < secretNumber ? "badge-warning" : "badge-info";
          historyHTML +=
            '<span class="label label-default guess-badge">' + g + "</span>";
        });
        $("#guessHistory").html(
          historyHTML || '<span class="text-muted">No guesses yet</span>'
        );
      }

      function makeGuess() {
        let guess = parseInt($("#guessInput").val());

        if (isNaN(guess) || guess < 1 || guess > 100) {
          $("#feedback").html(
            '<span class="text-warning"><span class="glyphicon glyphicon-exclamation-sign"></span> Please enter a number between 1 and 100</span>'
          );
          return;
        }

        attempts++;
        guesses.push(guess);
        updateDisplay();

        if (guess === secretNumber) {
          $("#feedback").html(
            '<span class="text-success"><span class="glyphicon glyphicon-star"></span> Congratulations! You got it in ' +
              attempts +
              " attempts!</span>"
          );
          $("#guessInput").prop("disabled", true);
          $("#guessBtn").prop("disabled", true);
          gamesWon++;

          if (bestScore === null || attempts < bestScore) {
            bestScore = attempts;
          }
          updateDisplay();
        } else if (guess < secretNumber) {
          $("#feedback").html(
            '<span class="text-info"><span class="glyphicon glyphicon-arrow-up"></span> Too low! Try higher...</span>'
          );
        } else {
          $("#feedback").html(
            '<span class="text-info"><span class="glyphicon glyphicon-arrow-down"></span> Too high! Try lower...</span>'
          );
        }

        $("#guessInput").val("").focus();
      }

      $(document).ready(function () {
        initGame();

        $("#guessBtn").click(function () {
          makeGuess();
        });

        $("#guessInput").keypress(function (e) {
          if (e.which === 13) {
            makeGuess();
          }
        });

        $("#newGameBtn").click(function () {
          initGame();
        });
      });