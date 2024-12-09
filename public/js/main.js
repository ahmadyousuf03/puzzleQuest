document.addEventListener("DOMContentLoaded", async () => {
    const submitButton = document.getElementById("submit-answer");
    const hintButton = document.getElementById("hint-button");
    const feedbackContainer = document.getElementById("feedback");
    const feedbackMessage = document.getElementById("feedback-message");
    const answerInput = document.getElementById("answer-input");
    const hintText = document.getElementById("hint-text");
    let currentPuzzle = null;
  
    // Load a random puzzle from the backend
    async function loadPuzzle() {
      const response = await fetch('/api/puzzles');
      const puzzles = await response.json();
      currentPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
      document.getElementById("puzzle-question").textContent = currentPuzzle.question;
      hintText.textContent = currentPuzzle.hint;
      hintText.style.display = "none";
    }
  
    // Submit the user's answer and show feedback
    async function submitAnswer() {
      const userAnswer = answerInput.value.trim();
      const response = await fetch('/api/puzzles/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ puzzleId: currentPuzzle.id, answer: userAnswer }),
      });
  
      const data = await response.json();
      if (data.correct) {
        feedbackMessage.textContent = "Correct! Great job!";
        feedbackContainer.style.color = "green";
      } else {
        feedbackMessage.textContent = `Incorrect. The correct answer is: ${data.answer}`;
        feedbackContainer.style.color = "red";
      }
      feedbackContainer.style.display = "block";
    }
  
    // Show the hint
    function showHint() {
      hintText.style.display = "block";
    }
  
    submitButton.addEventListener("click", submitAnswer);
    hintButton.addEventListener("click", showHint);
  
    loadPuzzle();
  });
  