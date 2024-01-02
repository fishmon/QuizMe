document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start");
    const questionsContainer = document.getElementById("questions");
    const finalScoreContainer = document.getElementById("final-score-container");
    const finalScoreElement = document.getElementById("final-score");
    const initialsInput = document.getElementById("initials");
    const submitButton = document.getElementById("submit");
    const timerElement = document.getElementById("timer");
    const timeElement = document.getElementById("time");
    const highscoreElement = document.getElementById("highscore");
  
    // Retrieve highscore from localStorage
    let highScore = parseInt(localStorage.getItem("highScore")) || 0;
    highscoreElement.textContent = highScore;
  
    let currentQuestionIndex = 0;
    let timer;
    let timeLeft = 90; // Initial time in seconds
  
    startButton.addEventListener("click", startQuiz);
    submitButton.addEventListener("click", saveScore);
  
    function startQuiz() {
      startButton.style.display = "none";
      questionsContainer.classList.remove("hide");
      loadQuestion();
      startTimer();
    }
  
    function loadQuestion() {
      const questionTitle = document.getElementById("question-title");
      const choicesContainer = document.getElementById("choices");
      const currentQuestion = questions[currentQuestionIndex];
  
      questionTitle.textContent = currentQuestion.question;
      choicesContainer.innerHTML = "";
  
      currentQuestion.choices.forEach(function (choice) {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", function () {
          checkAnswer(choice, currentQuestion.correctAnswer);
        });
        choicesContainer.appendChild(choiceButton);
      });
    }
  
    function checkAnswer(userAnswer, correctAnswer) {
      if (userAnswer === correctAnswer) {
        // Correct answer
      } else {
        // Incorrect answer, subtract time
        timeLeft -= 10; // 
      }
  
      currentQuestionIndex++;
  
      if (currentQuestionIndex < questions.length) {
        loadQuestion();
      } else {
        endQuiz();
      }
    }
  
    function startTimer() {
      timer = setInterval(function () {
        timeLeft--;
  
        if (timeLeft <= 0) {
          endQuiz();
        } else {
          updateTimer();
        }
      }, 1000);
    }
  
    function updateTimer() {
      timeElement.textContent = timeLeft;
    }
  
    function endQuiz() {
        clearInterval(timer);
        questionsContainer.classList.add("hide");
        finalScoreContainer.classList.remove("hide");
        finalScoreElement.textContent = timeLeft;
      
        // Retrieve existing high scores from localStorage
        const existingHighScores = JSON.parse(localStorage.getItem("highScore")) || [];
      
        // Create a new score object
        const initials = initialsInput.value;
        const newScore = { initials: initials, score: timeLeft };
              
        // Add the new score to the existing scores
        existingHighScores.push(newScore);
      
        // Sort scores in descending order
        existingHighScores.sort((a, b) => b.score - a.score);
      
        // Store the updated scores in localStorage
        localStorage.setItem("highScore", JSON.stringify(existingHighScores));
      
        // Update highscore if the current score is higher
        if (timeLeft > highScore) {
          highScore = timeLeft;
          highscoreElement.textContent = highScore;
        }
      }
      
  
    function saveScore() {
      const initials = initialsInput.value;
      console.log("Score saved:", initials, timeLeft);
  
      // Redirect to highscores page or perform any other action as needed
      window.location.href = "./highscores.html";
    }
  });
  