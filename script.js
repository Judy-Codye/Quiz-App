const questions = [
  { q: "What is 2+2?", options: ["3","4","5","6"], answer: "4" },
  { q: "Capital of France?", options: ["Berlin","London","Paris","Madrid"], answer: "Paris" },
  { q: "HTML stands for?", options: ["HyperText Markup Language","Hot Mail","How to Make Lasagna","Hyper Trainer Marking Language"], answer: "HyperText Markup Language" },
  { q: "Which planet is known as the Red Planet?", options: ["Venus","Mars","Jupiter","Saturn"], answer: "Mars" },
  { q: "Who wrote 'Romeo and Juliet'?", options: ["William Wordsworth","William Shakespeare","Jane Austen","Mark Twain"], answer: "William Shakespeare" },
  { q: "What is the boiling point of water at sea level?", options: ["90°C","100°C","110°C","120°C"], answer: "100°C" },
  { q: "Which gas do plants use for photosynthesis?", options: ["Oxygen","Carbon Dioxide","Nitrogen","Hydrogen"], answer: "Carbon Dioxide" },
  { q: "Which is the largest ocean on Earth?", options: ["Atlantic","Indian","Pacific","Arctic"], answer: "Pacific" },
  { q: "In which year did World War II end?", options: ["1945","1939","1942","1950"], answer: "1945" },
  { q: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci","Pablo Picasso","Vincent van Gogh","Claude Monet"], answer: "Leonardo da Vinci" },
  { q: "Which is the smallest prime number?", options: ["1","2","3","5"], answer: "2" },
  { q: "Which country invented paper?", options: ["India","China","Egypt","Greece"], answer: "China" },
  { q: "CSS stands for?", options: ["Cascading Style Sheets","Creative Style System","Computer Styled Sections","Colorful Style Sheets"], answer: "Cascading Style Sheets" },
  { q: "Which device is used to measure temperature?", options: ["Barometer","Thermometer","Hygrometer","Anemometer"], answer: "Thermometer" },
  { q: "What is the chemical symbol for Gold?", options: ["G","Au","Ag","Go"], answer: "Au" },
  { q: "Which planet is closest to the Sun?", options: ["Mercury","Venus","Earth","Mars"], answer: "Mercury" },
  { q: "What is the square root of 64?", options: ["6","7","8","9"], answer: "8" },
  { q: "Which programming language is used for web apps?", options: ["Python","JavaScript","C++","Java"], answer: "JavaScript" },
  { q: "Which continent is the Sahara Desert in?", options: ["Asia","Africa","Australia","South America"], answer: "Africa" },
  { q: "How many days are in a leap year?", options: ["365","366","364","360"], answer: "366" },
  { q: "Which country is famous for the Eiffel Tower?", options: ["Italy","France","Germany","Spain"], answer: "France" },
  { q: "In computing, 'HTTP' stands for?", options: ["HyperText Transfer Protocol","HyperText Transmission Process","High Transfer Text Protocol","Hyper Terminal Text Program"], answer: "HyperText Transfer Protocol" },
  { q: "What is the freezing point of water?", options: ["0°C","-5°C","5°C","10°C"], answer: "0°C" },
  { q: "Which is the largest mammal?", options: ["African Elephant","Blue Whale","Giraffe","White Rhino"], answer: "Blue Whale" },
  { q: "What is 15 × 3?", options: ["45","35","40","50"], answer: "45" },
  { q: "Which programming language is mainly for styling web pages?", options: ["HTML","CSS","JavaScript","PHP"], answer: "CSS" },
  { q: "Which part of the plant conducts photosynthesis?", options: ["Root","Stem","Leaf","Flower"], answer: "Leaf" },
  { q: "How many continents are there?", options: ["5","6","7","8"], answer: "7" },
  { q: "In which galaxy is the Earth located?", options: ["Andromeda","Milky Way","Whirlpool","Sombrero"], answer: "Milky Way" },
  { q: "Which blood type is known as the universal donor?", options: ["O-","O+","A+","B+"], answer: "O-" }
];

while (questions.length < 30) {
  questions.push(...questions);
}
questions.length = 30; 

// =========================
// REGISTRATION
// =========================
function registerUser() {
  let name = document.getElementById('regName').value;
  let email = document.getElementById('regEmail').value;
  let pass = document.getElementById('regPass').value;

  if (!name || !email || !pass) {
    alert("Fill all fields");
    return;
  }
  let users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.email === email)) {
    alert("Email already registered");
    return;
  }
  users.push({name, email, pass});
  localStorage.setItem('users', JSON.stringify(users));
  alert("Registration successful!");
  showLogin();
}

function showLogin() {
  document.getElementById('registerDiv').classList.add('hidden');
  document.getElementById('loginDiv').classList.remove('hidden');
}

// =========================
// LOGIN
// =========================
function loginUser() {
  let email = document.getElementById('loginEmail').value;
  let pass = document.getElementById('loginPass').value;
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let user = users.find(u => u.email === email && u.pass === pass);

  if (!user) {
    alert("Invalid credentials");
    return;
  }
  localStorage.setItem('currentUser', JSON.stringify(user));
  startQuiz();
}

// =========================
// QUIZ
// =========================
let currentQ = 0;
let score = 0;
let answers = {};
let timerInterval;

function startQuiz() {
  document.getElementById('loginDiv').classList.add('hidden');
  document.getElementById('quizDiv').classList.remove('hidden');
  startTimer(30 * 60); // 30 minutes
  showQuestion();
}

function showQuestion() {
  let qObj = questions[currentQ];
  document.getElementById('questionText').innerText = `Q${currentQ+1}: ${qObj.q}`;
  let optsHTML = "";
  qObj.options.forEach(opt => {
    optsHTML += `<label><input type="radio" name="option" value="${opt}" ${answers[currentQ]===opt?'checked':''}> ${opt}</label><br>`;
  });
  document.getElementById('optionsDiv').innerHTML = optsHTML;
}

function nextQuestion() {
  let selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    answers[currentQ] = selected.value;
    if (selected.value === questions[currentQ].answer) score++;
  }
  currentQ++;
  if (currentQ < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// =========================
// TIMER
// =========================
function startTimer(seconds) {
  let timerDisplay = document.getElementById('timer');
  timerInterval = setInterval(() => {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    timerDisplay.textContent = `Time Left: ${min}:${sec < 10 ? '0' : ''}${sec}`;
    seconds--;
    if (seconds < 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// =========================
// RESULT
// =========================
function endQuiz() {
  clearInterval(timerInterval);
  let percentage = ((score / questions.length) * 100).toFixed(2);
  
  let user = JSON.parse(localStorage.getItem('currentUser'));
  let history = JSON.parse(localStorage.getItem('quizHistory')) || {};
  if (!history[user.email]) history[user.email] = [];
  history[user.email].push({score, total: questions.length, percentage, date: new Date().toLocaleString()});
  localStorage.setItem('quizHistory', JSON.stringify(history));

  document.getElementById('quizDiv').classList.add('hidden');
  document.getElementById('resultDiv').classList.remove('hidden');
  document.getElementById('scoreText').innerText = `You got ${score} out of ${questions.length} (${percentage}%)`;

  let historyList = document.getElementById('historyList');
  historyList.innerHTML = "";
  history[user.email].forEach(h => {
    historyList.innerHTML += `<li>${h.date} - ${h.score}/${h.total} (${h.percentage}%)</li>`;
  });
}