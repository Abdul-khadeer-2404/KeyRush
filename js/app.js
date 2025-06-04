const typingEngine = new TypingEngine();
let currentMode = 'words';

function initializeTest() {
    if (currentMode === 'words') {
        typingEngine.loadText(generateWords(200));
    } else {
        typingEngine.loadText(getRandomQuote());
    }
}

function resetTest() {
    clearInterval(testTimer);
    typingEngine.reset();
    
    document.getElementById('inputField').value = '';
    document.getElementById('wpm').textContent = '0';
    document.getElementById('accuracy').textContent = '100';
    document.getElementById('timer').textContent = testDuration;
    
    document.querySelector('.test-area').style.display = 'block';
    document.getElementById('results').classList.remove('show');
    
    initializeTest();
    document.getElementById('inputField').focus();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeTest();
    
    const inputField = document.getElementById('inputField');
    inputField.addEventListener('input', function(e) {
        if (typingEngine.isComplete()) {
            endTest();
            return;
        }
        
        typingEngine.processInput(e.target.value);
        updateWPM();
    });

    inputField.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            resetTest();
        }
    });

    document.querySelectorAll('[data-time]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('[data-time]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            testDuration = parseInt(this.dataset.time);
            resetTest();
        });
    });

    document.querySelectorAll('[data-mode]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentMode = this.dataset.mode;
            resetTest();
        });
    });

    inputField.focus();
});

setInterval(updateWPM, 500);