const flashcard = document.getElementById('flashcard');
const cardFront = document.getElementById('card-front');
const cardBack = document.getElementById('card-back');
const prevBtn = document.getElementById('prev-btn');
const flipBtn = document.getElementById('flip-btn');
const nextBtn = document.getElementById('next-btn');
const currentCardNum = document.getElementById('current-card-num');
const totalCardsNum = document.getElementById('total-cards-num');
const userAnswer = document.getElementById('user-answer');
const checkBtn = document.getElementById('check-btn');
const feedbackMsg = document.getElementById('feedback-msg');
const categoryBadge = document.getElementById('category-badge');
const confettiContainer = document.getElementById('confetti-container');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');

const quizData = [
    // --- HTML  ---
    { question: "Which HTML tag is used for the biggest heading?", answer: "h1", type: "html" },
    { question: "Which tag is used to create a hyperlink or link?", answer: "a", type: "html" },
    { question: "What HTML tag is used to insert an image?", answer: "img", type: "html" },
    { question: "Which tag is used to create a line break?", answer: "br", type: "html" },
    
    // --- CSS  ---
    { question: "Which CSS property is used to change text color?", answer: "color", type: "css" },
    { question: "Which property is used to change the background color?", answer: "background-color", type: "css" },
    { question: "Which property controls the text size?", answer: "font-size", type: "css" },
    { question: "Which property is used to make text bold?", answer: "font-weight", type: "css" },

    // --- JAVASCRIPT  ---
    { question: "Which popup box is used to show a warning message to the user?", answer: "alert", type: "js" },
    { question: "How do you write a comment in JavaScript?", answer: "//", type: "js" },
    { question: "Which keyword is used to declare a variable that can change?", answer: "let", type: "js" },
    { question: "What is the extension of a JavaScript file? (.eg .html for html)", answer: ".js", type: "js" }
];

let currentIdx = 0;

function renderQuiz() {
    flashcard.classList.remove('flip');
    flipBtn.innerHTML = "🔍 Reveal Answer";
    userAnswer.value = '';
    feedbackMsg.className = 'feedback';
    feedbackMsg.innerText = '';

    const currentItem = quizData[currentIdx];
    cardFront.innerText = currentItem.question;
    cardBack.innerText = currentItem.answer;
    
    currentCardNum.innerText = currentIdx + 1;
    totalCardsNum.innerText = quizData.length;

    categoryBadge.innerText = currentItem.type;
    if(currentItem.type === "html") categoryBadge.style.backgroundColor = "#ea580c";
    else if(currentItem.type === "css") categoryBadge.style.backgroundColor = "#2563eb";
    else if(currentItem.type === "js") categoryBadge.style.backgroundColor = "#ca8a04";
}

function triggerConfettiBurst() {
    const colors = ['#fbbf24', '#f43f5e', '#3b82f6', '#10b981'];
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('star-particle');
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 0.3 + 's';
        particle.style.animationDuration = Math.random() * 1 + 1 + 's';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiContainer.appendChild(particle);
        setTimeout(() => { particle.remove(); }, 1500);
    }
}

// Button actions
flipBtn.addEventListener('click', () => {
    flashcard.classList.toggle('flip');
    flipBtn.innerHTML = flashcard.classList.contains('flip') ? "👁️ Hide Answer" : "🔍 Reveal Answer";
});

flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('flip');
});

nextBtn.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % quizData.length;
    renderQuiz();
});

prevBtn.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + quizData.length) % quizData.length;
    renderQuiz();
});

// Check Answer Logic 
checkBtn.addEventListener('click', () => {
    const userInput = userAnswer.value.trim().toLowerCase();
    const realAnswer = quizData[currentIdx].answer.toLowerCase();

    if (userInput === '') {
        feedbackMsg.innerText = "⚠️ Please type your answer first!";
        feedbackMsg.className = "feedback error";
        return;
    }

    
    if (userInput === realAnswer || realAnswer.includes(userInput)) {
        feedbackMsg.innerText = "Excellent Job! You nailed it! 🎉";
        feedbackMsg.className = "feedback success";
        correctSound.currentTime = 0;
        correctSound.play().catch(o => {});
        triggerConfettiBurst();
    } else {
        feedbackMsg.innerText = "Nice try! Give it another shot! 👍";
        feedbackMsg.className = "feedback error";
        wrongSound.currentTime = 0;
        wrongSound.play().catch(o => {});
    }
});

renderQuiz();