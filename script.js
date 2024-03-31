$(document).ready(function() {
    let currentQuestionIndex = 0;
    let score = 0;
    let answeredQuestions = 0; // Track the number of questions answered
    const questions = [
        { question: "Which planet is known as the 'Morning Star'?", choices: ["Venus", "Mars", "Mercury", "Jupiter"], correct: 0 },
        { question: "Who is often credited with inventing the World Wide Web?", choices: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Mark Zuckerberg"], correct: 1 },
        { question: "What is the chemical symbol for silver?", choices: ["Ag", "Au", "Fe", "Cu"], correct: 0 },
        { question: "Who developed the theory of relativity?", choices: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"], correct: 1 },
        { question: "Which animal is known as the 'ship of the desert'?", choices: ["Camel", "Horse", "Elephant", "Lion"], correct: 0 },
        { question: "What is the largest organ in the human body?", choices: ["Liver", "Heart", "Brain", "Skin"], correct: 3 },
        { question: "Who is the author of the Harry Potter series?", choices: ["J.K. Rowling", "Stephen King", "George R.R. Martin", "J.R.R. Tolkien"], correct: 0 },
        { question: "Which city is known as the 'City of Love'?", choices: ["Paris", "Rome", "Venice", "Vienna"], correct: 0 },
        { question: "What is the tallest mountain in the world?", choices: ["K2", "Mount Kilimanjaro", "Mount Everest", "Kangchenjunga"], correct: 2 },
        { question: "Who painted the famous artwork 'Starry Night'?", choices: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], correct: 0 },
        { question: "What is the currency of Japan?", choices: ["Yuan", "Euro", "Yen", "Dollar"], correct: 2 },
        { question: "Which gas is most abundant in the Earth's atmosphere?", choices: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Hydrogen"], correct: 0 },
        { question: "Who founded Microsoft?", choices: ["Steve Jobs", "Bill Gates", "Jeff Bezos", "Mark Zuckerberg"], correct: 1 },
        { question: "What is the largest desert in the world?", choices: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Antarctic Desert"], correct: 0 },
        { question: "Who wrote 'The Great Gatsby'?", choices: ["F. Scott Fitzgerald", "Ernest Hemingway", "Harper Lee", "J.D. Salinger"], correct: 0 }
    
    ];
  
    // Directly start the quiz upon page load
    displayQuestion();
  
    // Event listener for option selection
    $("#choices").on('click', '.option-box', function() {
      // Remove previous selection
      $(".option-box").removeClass("option-selected");
      // Add selection to clicked option
      $(this).addClass("option-selected");
    });
  
    $("#submit-answer").on('click', function() {
      const selected = $(".option-selected").index();
      if (selected === -1) {
          alert("Please select an option before submitting.");
          return; // Stop further processing
      }
    
      answeredQuestions++; // Increment answered questions counter
  
      if (selected == questions[currentQuestionIndex].correct) {
          score++;
          $("#feedback").text("Correct!").css('color', 'green');
      } else {
          $("#feedback").text("Wrong!").css('color', 'red');
      }
      
      if (currentQuestionIndex + 1 < questions.length) {
          $("#loading-message").show(); // Show loading message
      }
      
      currentQuestionIndex++;
      setTimeout(() => {
          $("#loading-message").hide(); // Hide loading message when ready to display next question
          if (currentQuestionIndex < questions.length) {
              displayQuestion();
          } else {
              showScore();
              $("#restart").show(); // Show the restart button at the end
              // Do not hide the Quit Quiz button here
          }
      }, 1000); // Adjust time as needed
    });
  
    $("#quit-quiz").on('click', function() {
        showScore(); // Show the score even if the user quits
        $("#restart").show(); // Show the restart button if the user quits
        $(this).hide(); // Hide the Quit Quiz button when the user quits
    });
  
    $("#restart").on('click', function() {
        // Reset quiz state
        currentQuestionIndex = 0;
        score = 0;
        answeredQuestions = 0; // Reset answered questions counter
        // Hide score and incorrect answers container if you decide to show them only at the end
        $("#score").empty();
        $("#incorrect-answers-container").hide();
        $("#incorrect-answers").empty().hide(); // If you're using incorrect answers feature
        $("#feedback").empty();
        $("#submit-answer").show(); // Make sure this button is visible again if hidden at the end
        $(this).hide(); // Hide the restart button when restarting the quiz
        $("#quit-quiz").show(); // Show the Quit Quiz button when restarting the quiz
        // Start the quiz again from the first question
        displayQuestion();
    });
    
  
    function displayQuestion() {
        $("#feedback").empty(); // Clear previous feedback
        $("#choices").empty(); // Clear previous choices
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            $("#question").text(question.question);
            question.choices.forEach(function(choice, i) {
                $("#choices").append(`<div class="option-box">${String.fromCharCode(65 + i)}: ${choice}</div>`);
            });
        }
    }
  
    function showScore() {
      $("#question").empty();
      $("#choices").empty();
      $("#submit-answer").hide();
      $("#feedback").empty();
      const totalQuestions = questions.length;
      const unansweredQuestions = totalQuestions - answeredQuestions;
      const answeredPercentage = (answeredQuestions / totalQuestions) * 100;
      $("#score").html(`<p>Your score is ${score} out of ${totalQuestions}.</p><p>You answered ${answeredPercentage.toFixed(2)}% of the questions.</p><p>You left ${unansweredQuestions} question(s) unanswered.`);
      // $("#restart").show(); // Hide the restart button
    }
  });
  