// DOM elements and the latest result
const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
// Loading high scores or setting an empty array
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 5
finalScore.innerHTML = mostRecentScore
// Enabling the save button when there is input
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})
// Saving the high score
const saveHighScore = e => {
    e.preventDefault();

    const scoreObj = {
        name: username.value,
        score: mostRecentScore
    }
    highScores.push(scoreObj);
    highScores.sort((a,b) => b.score-a.score);
    highScores.splice(MAX_HIGH_SCORES);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('index.html')
}