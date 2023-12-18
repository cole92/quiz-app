// Accesing elements
const question = document.querySelector('#question');
const choices = Array.from(document.getElementsByClassName('choices-text'));
const progressText = document.querySelector("#progressText");
const scoresText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const loader = document.querySelector("#loader");
const game = document.querySelector('#game');
// Initializing variables to track the quiz state
let currentQuestions = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
// Empty array for quiz questions
let questions = [];
// Fetching quiz questions from the Open Trivia Database API
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
.then(response => response.json())
.then(loadedQuestionsObj => {
    questions = loadedQuestionsObj.results.map(loadedQuestionElement => {
        const formattedQuestion = {
            question: loadedQuestionElement.question
        }
        const answerChoices = [...loadedQuestionElement.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random()*4) +1;
        answerChoices.splice(formattedQuestion.answer-1, 0, loadedQuestionElement.correct_answer);

        answerChoices.map((choice, index) => {
            formattedQuestion['choice'+(index+1)] = choice;
        })
        return formattedQuestion;
    })
    startGame();
})

// Konstante 
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
}

const getNewQuestion = () => {
    if (availableQuestions === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerHTML = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestions = availableQuestions[questionIndex];
    question.innerHTML = currentQuestions.question;
}
