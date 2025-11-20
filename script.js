const words = [
  "pen", "skibidi", "rizz", "sigma", "federation", "ink", "collapse", "agent",
  "civilization", "core", "overheat", "gamma", "alpha", "speed", "type",
  "monkey", "pentype", "evolution", "protocol", "archive"
];

let timeLeft = 30;
let timerInterval;
let currIndex = 0;
let mistakes = 0;
let started = false;

const box = document.getElementById("word-box");
const input = document.getElementById("type-input");
const restart = document.getElementById("restart");
const wpmSpan = document.getElementById("wpm");
const accSpan = document.getElementById("acc");
const timerSpan = document.getElementById("timer");

function generateWords() {
  let generated = [];
  for (let i = 0; i < 50; i++) generated.push(words[Math.floor(Math.random() * words.length)]);
  box.innerHTML = generated.map((w, i) => `<span id='w${i}'>${w}</span>`).join(" ");
}

generateWords();

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

  const typedWords = currIndex;
  const wpm = Math.floor((typedWords / 30) * 60);
  const acc = Math.floor(((currIndex - mistakes) / currIndex) * 100) || 0;

  wpmSpan.textContent = wpm;
  accSpan.textContent = acc + "%";
}

input.addEventListener("input", () => {
  if (!started) {
    started = true;
    startTimer();
  }

  const currentWord = document.getElementById(`w${currIndex}`).textContent;
  if (input.value.trim() === currentWord) {
    document.getElementById(`w${currIndex}`).style.color = "#ffaa00";
    currIndex++;
    input.value = "";
  }
});

restart.addEventListener("click", () => {
  timeLeft = 30;
  currIndex = 0;
  mistakes = 0;
  started = false;
  input.disabled = false;
  input.value = "";
  timerSpan.textContent = 30;
  generateWords();
});
