document.addEventListener("DOMContentLoaded", function () {
    const highscoresList = document.getElementById("highscores");
    const clearButton = document.getElementById("clear");
  
    // Fetch and display high scores
    displayHighScores();
  
    // Event listener for the "Clear Highscores" button
    clearButton.addEventListener("click", clearHighScores);
  
    function displayHighScores() {
      // Retrieve high scores from localStorage
      const highScores = JSON.parse(localStorage.getItem("highScore")) || [];
  
      // Clear existing list
      highscoresList.innerHTML = "";
  
      // Populate the list with high scores
      highScores.forEach(function (score, index) {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
        highscoresList.appendChild(li);
      });
    }
  
    function clearHighScores() {
      // Clear high scores from localStorage
      localStorage.removeItem("highScore");
      console.log("High scores cleared.");
  
      // Refresh the displayed high scores
      displayHighScores();
    }
  });
  