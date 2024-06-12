function increaseTextSize() {
    document.body.style.fontSize = 'larger';
}

function decreaseTextSize() {
    document.body.style.fontSize = 'smaller';
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

function toggleTextToSpeech() {
    const allText = document.body.innerText || document.body.textContent;
    const utterance = new SpeechSynthesisUtterance(allText);
    window.speechSynthesis.speak(utterance);
}
