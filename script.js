const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Markup Language", "Hyper Tool Markup Language"],
        answer: 0
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        answer: 0
    },
    {
        question: "Which programming language is known as the language of the web?",
        options: ["Python", "JavaScript", "Java", "C#"],
        answer: 1
    },
    {
        question: "What tag is used to define an image in HTML?",
        options: ["<img>", "<picture>", "<photo>", "<image>"],
        answer: 0
    },
    {
        question: "Which CSS property changes text color?",
        options: ["color", "font-color", "text-color", "background-color"],
        answer: 0
    },
    {
        question: "What is the correct syntax for linking CSS?",
        options: ["<css href='style.css'>", "<link rel='stylesheet' href='style.css'>", "<style src='style.css'>", "<stylesheet>"],
        answer: 1
    },
    {
        question: "Which HTML attribute specifies a unique ID?",
        options: ["class", "id", "name", "unique"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("time");
const resultsContainer = document.getElementById("results-container");
const finalScore = document.getElementById("final-score");
const feedback = document.getElementById("feedback");

function loadQuestion() {
    const current = quizData[currentQuestion];
    questionText.textContent = current.question;

    optionsContainer.innerHTML = "";
    current.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.textContent = option;
        button.dataset.index = index;
        button.addEventListener("click", () => selectOption(button));
        optionsContainer.appendChild(button);
    });

    submitBtn.disabled = true;
    nextBtn.disabled = true;
    resetTimer();
    startTimer();
}

function selectOption(button) {
    document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
    button.classList.add("selected");
    submitBtn.disabled = false;
}

function validateAnswer() {
    const selectedOption = document.querySelector(".option.selected");
    if (!selectedOption) return;

    const selectedIndex = parseInt(selectedOption.dataset.index);
    const correctIndex = quizData[currentQuestion].answer;

    if (selectedIndex === correctIndex) {
        score++;
    }

    stopTimer();
    submitBtn.disabled = true;
    nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.querySelector("main").classList.add("hidden");
    resultsContainer.classList.remove("hidden");
    resultsContainer.style.display = "block";
    finalScore.textContent = `${score} / ${quizData.length}`;
    feedback.textContent = score >= 5 ? "Great job!" : "Keep practicing!";
}

function startTimer() {
    timerEl.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            validateAnswer();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    timeLeft = 15;
}

submitBtn.addEventListener("click", validateAnswer);
nextBtn.addEventListener("click", nextQuestion);

loadQuestion();
