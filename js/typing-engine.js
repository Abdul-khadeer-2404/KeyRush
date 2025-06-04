class TypingEngine {
    constructor() {
        this.currentText = [];
        this.currentInput = '';
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.totalChars = 0;
        this.isActive = false;
        this.startTime = null;
        this.lineHeight = 48;
        this.visibleLines = 3;
    }

    loadText(text) {
        if (Array.isArray(text)) {
            this.currentText = text;
        } else {
            this.currentText = text.split(' ');
        }
        this.reset();
        this.displayText();
    }

    reset() {
        this.currentInput = '';
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.correctChars = 0;
        this.incorrectChars = 0;
        this.totalChars = 0;
        this.isActive = false;
        this.startTime = null;
        const display = document.getElementById('textDisplay');
        if (display.querySelector('.text-content')) {
            display.querySelector('.text-content').style.transform = 'translateY(0)';
        }
    }

    displayText() {
        const display = document.getElementById('textDisplay');
        if (!display.querySelector('.text-content')) {
            display.innerHTML = '<div class="text-content"></div>';
        }
        const textContent = display.querySelector('.text-content');
        textContent.innerHTML = '';
        this.currentText.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            word.split('').forEach((char, charIndex) => {
                const charSpan = document.createElement('span');
                charSpan.className = 'char';
                charSpan.textContent = char;
                if (wordIndex === this.currentWordIndex && charIndex === this.currentCharIndex) {
                    charSpan.classList.add('current');
                }
                wordSpan.appendChild(charSpan);
            });
            if (wordIndex < this.currentText.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.className = 'char';
                spaceSpan.innerHTML = '&nbsp;';
                if (wordIndex === this.currentWordIndex && this.currentCharIndex === word.length) {
                    spaceSpan.classList.add('current');
                }
                wordSpan.appendChild(spaceSpan);
            }
            textContent.appendChild(wordSpan);
        });
    }

    processInput(inputValue) {
        if (!this.isActive) {
            this.isActive = true;
            this.startTime = Date.now();
            startTimer();
        }
        this.currentInput = inputValue;
        this.updateDisplay();
        this.calculateStats();
        this.updateScroll();
    }

    updateDisplay() {
        const words = document.querySelectorAll('.word');
        const currentWord = this.currentText[this.currentWordIndex];
        const expectedText = this.currentText.slice(0, this.currentWordIndex).join(' ') +
                           (this.currentWordIndex > 0 ? ' ' : '') + currentWord;
        let charIndex = 0;
        words.forEach((wordEl, wordIndex) => {
            const chars = wordEl.querySelectorAll('.char');
            chars.forEach((charEl, charIdx) => {
                charEl.className = 'char';
                if (charIndex < this.currentInput.length) {
                    if (this.currentInput[charIndex] === charEl.textContent ||
                        (charEl.innerHTML === '&nbsp;' && this.currentInput[charIndex] === ' ')) {
                        charEl.classList.add('correct');
                    } else {
                        charEl.classList.add('incorrect');
                    }
                } else if (charIndex === this.currentInput.length) {
                    charEl.classList.add('current');
                }
                charIndex++;
            });
        });
    }

    updateScroll() {
        const textContent = document.querySelector('.text-content');
        if (!textContent) return;
        const currentChar = document.querySelector('.char.current');
        if (!currentChar) return;
        const displayContainer = document.getElementById('textDisplay');
        const containerRect = displayContainer.getBoundingClientRect();
        const charRect = currentChar.getBoundingClientRect();
        const relativeTop = charRect.top - containerRect.top;
        const containerHeight = containerRect.height;
        if (relativeTop > containerHeight - this.lineHeight) {
            const currentTransform = textContent.style.transform;
            const currentOffset = currentTransform ?
                parseFloat(currentTransform.match(/-?\d+(\.\d+)?/)?.[0] || 0) : 0;
            const newOffset = Math.abs(currentOffset) + this.lineHeight;
            textContent.style.transform = `translateY(-${newOffset}px)`;
        }
    }

    calculateStats() {
        let correct = 0;
        let incorrect = 0;
        const expectedText = this.currentText.join(' ');
        for (let i = 0; i < this.currentInput.length; i++) {
            if (i < expectedText.length && this.currentInput[i] === expectedText[i]) {
                correct++;
            } else {
                incorrect++;
            }
        }
        this.correctChars = correct;
        this.incorrectChars = incorrect;
        this.totalChars = this.currentInput.length;
        const accuracy = this.totalChars > 0 ? Math.round((correct / this.totalChars) * 100) : 100;
        document.getElementById('accuracy').textContent = accuracy;
    }

    getWPM() {
        if (!this.startTime) return 0;
        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60;
        return Math.round((this.correctChars / 5) / timeElapsed) || 0;
    }

    isComplete() {
        const expectedText = this.currentText.join(' ');
        return this.currentInput.length >= expectedText.length;
    }
}