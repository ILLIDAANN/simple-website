
const questions = [
    { question: 'Past tense question 1', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correctIndex: 0 },
    // Add more questions as needed
 
];

let currentQuestion = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result');
const nextButton = document.getElementById('next-btn');

function loadQuestion() {
    const currentQuestionData = questions[currentQuestion];
    document.getElementById('question').innerText = currentQuestionData.question;

    for (let i = 1; i <= 4; i++) {
        document.getElementById(`btn-${i}`).innerText = currentQuestionData.options[i - 1];
        document.getElementById(`btn-${i}`).addEventListener('click', () => checkAnswer(i - 1));
    }
}

function checkAnswer(selectedIndex) {
    const currentQuestionData = questions[currentQuestion];
    if (selectedIndex === currentQuestionData.correctIndex) {
        score++;
    }

    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultText.innerText = `Your score: ${score}/${questions.length}`;

    if (currentQuestion === questions.length - 1) {
        nextButton.innerText = 'Finish';
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestion === questions.length - 1) {
        alert('Game Over! You can implement further actions here.');
        // Add actions for finishing the game
    } else {
        currentQuestion++;
        questionContainer.style.display = 'block';
        resultContainer.style.display = 'none';
        loadQuestion();
    }
});

// Initial question load
loadQuestion();
