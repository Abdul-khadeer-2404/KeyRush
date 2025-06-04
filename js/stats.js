let testTimer;
let timeRemaining;
let testDuration = 30;

function startTimer() {
    timeRemaining = testDuration;
    updateTimer();
    
    testTimer = setInterval(() => {
        timeRemaining--;
        updateTimer();
        
        if (timeRemaining <= 0) {
            endTest();
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById('timer').textContent = timeRemaining;
}

function updateWPM() {
    document.getElementById('wpm').textContent = typingEngine.getWPM();
}

function endTest() {
    clearInterval(testTimer);
    typingEngine.isActive = false;
    
    const finalWpm = typingEngine.getWPM();
    const finalAccuracy = typingEngine.totalChars > 0 ? 
        Math.round((typingEngine.correctChars / typingEngine.totalChars) * 100) : 100;
    
    document.getElementById('finalWpm').textContent = finalWpm;
    document.getElementById('finalAccuracy').textContent = finalAccuracy + '%';
    document.getElementById('finalCharacters').textContent = typingEngine.totalChars;
    document.getElementById('finalErrors').textContent = typingEngine.incorrectChars;
    
    document.querySelector('.test-area').style.display = 'none';
    document.getElementById('results').classList.add('show');
}

function calculateTypingSpeed(chars, timeInMinutes) {
    return Math.round(chars / 5 / timeInMinutes);
}

function calculateAccuracy(correct, total) {
    return total > 0 ? Math.round((correct / total) * 100) : 100;
}