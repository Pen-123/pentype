// script.js
const wordsList = [
  "pen","skibidi","rizz","sigma","federation","ink","collapse","agent",
  "civilization","core","overheat","gamma","alpha","speed","type",
  "monkey","pentype","evolution","protocol","archive"
];

const timeLimit = 30;
let timeLeft = timeLimit;
let timerInterval;
let currentWord = "";
let currentIndex = 0;
let letterIndex = 0;
let mistakes = 0;
let started = false;

const wordsDiv = document.getElementById("words");
const input = document.getElementById("type-input");
const wpmSpan = document.getElementById("wpm");
const accSpan = document.getElementById("acc");
const timerSpan = document.getElementById("timer");
const restartBtn = document.getElementById("restart");

function pickWords() {
  const picked = [];
  for (let i = 0; i < 30; i++) {
    picked.push(wordsList[Math.floor(Math.random() * wordsList.length)]);
  }
  return picked;
}

function renderWords() {
  const arr = pickWords();
  wordsDiv.innerHTML = "";
  arr.forEach((w, wi) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";
    w.split("").forEach((letter, li) => {
      const span = document.createElement("span");
      span.innerText = letter;
      span.className = "letter";
      wordSpan.appendChild(span);
    });
    // add a space span
    const space = document.createElement("span");
    space.innerText = " ";
    wordSpan.appendChild(space);
    wordsDiv.appendChild(wordSpan);
  });
  // set first word span
  currentWord = arr[0];
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerSpan.textContent = timeLeft;
    if (timeLeft <= 0) finishTest();
  }, 1000);
}

function finishTest() {
  clearInterval(timerInterval);
  input.disabled = true;
  const wordCount = currentIndex + (letterIndex > 0 ? 1 : 0);
  const wpm = Math.round((wordCount / timeLimit) * 60);
  const acc = Math.round(((wordCount * currentWord.length - mistakes) / (wordCount * currentWord.length)) * 100) || 0;
  wpmSpan.textContent = wpm;
  accSpan.textContent = acc + "%";
}

function resetTest() {
  clearInterval(timerInterval);
  timeLeft = timeLimit;
  currentIndex = 0;
  letterIndex = 0;
  mistakes = 0;
  started = false;
  input.disabled = false;
  input.value = "";
  timerSpan.textContent = timeLimit;
  wpmSpan.textContent = "0";
  accSpan.textContent = "100%";
  renderWords();
}

input.addEventListener("input", () => {
  if (!started) {
    started = true;
    startTimer();
  }

  const wordSpans = Array.from(wordsDiv.querySelectorAll(".word"));
  const letterSpans = Array.from(wordSpans[currentIndex].querySelectorAll(".letter"));
  const typed = input.value;

  if (typed[letterIndex] == null) {
    // backspace or removed
    letterSpans[letterIndex].classList.remove("correct", "wrong");
    letterIndex--;
    if (letterIndex < 0) letterIndex = 0;
  } else if (typed[letterIndex] === letterSpans[letterIndex].innerText) {
    letterSpans[letterIndex].classList.add("correct");
  } else {
    letterSpans[letterIndex].classList.add("wrong");
    mistakes++;
  }

  letterIndex++;

  // if finish word
  if (letterIndex === letterSpans.length) {
    currentIndex++;
    letterIndex = 0;
    input.value = "";
  }
});

restartBtn.addEventListener("click", resetTest);

renderWords();
