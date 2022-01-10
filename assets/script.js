const questions = [
    {
      questionText: "Commonly used data types DO NOT include:",
      options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      answer: "3. alerts",
    },
    {
      questionText: "Arrays in JavaScript can be used to store ______.",
      options: [
        "1. numbers and strings",
        "2. other arrays",
        "3. booleans",
        "4. all of the above",
      ],
      answer: "4. all of the above",
    },
    {
      questionText:
        "String values must be enclosed within _____ when being assigned to variables.",
      options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
      answer: "3. quotes",
    },
    {
      questionText:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      options: [
        "1. JavaScript",
        "2. terminal/bash",
        "3. for loops",
        "4. console.log",
      ],
      answer: "4. console.log",
    },
    {
      questionText:
        "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
      options: ["1. break", "2. stop", "3. halt", "4. exit"],
      answer: "1. break",
    },
  ];
  
  // declarations
  let currQuestionNo = -1;
  let score = 90;
  let currQues = -1;
  let timeLeft;
  let highscores = []; // initials, score
  let currentSubmissions = 0;
  
  // Selectors
  const start = document.querySelector('.start');
  const container = document.querySelector('.container');
  const question = document.querySelector('.question');
  const startText = document.querySelectorAll('.startText');
  const option = document.querySelectorAll('.option');
  const correct = document.querySelector('.correct');
  const incorrect = document.querySelector('.incorrect');
  const allDoneEl = document.querySelector('.allDone');
  const scoreDisplay = document.querySelector('.scoreDisplay');
  const submitButton = document.querySelector('#submit');
  const time = document.querySelector('.time');
  const name = document.querySelector('#name');
  const highscoresDisplay = document.querySelector('.highscoresDisplay');
  const goBack = document.querySelector('.goBack');
  const clearHighscore = document.querySelector('.clearHighscore');
  const viewHighscoreSelector= document.querySelector('.viewHighscores');
  
  // event listeners
  start.addEventListener('click', startQuiz);
  option.forEach(op => op.addEventListener('click', checkAnswer));
  submitButton.addEventListener('click', addNameToHighscore);
  goBack.addEventListener('click', resetState);
  clearHighscore.addEventListener('click', clearHighscoresArray);
  viewHighscoreSelector.addEventListener('click', viewHighscore);
  
  if (localStorage.length != 0) {
      currentSubmissions = localStorage.length;
      for (let i = 0; i < localStorage.length; i++) {
          highscores[i] = new Array();
          highscores[i][0] = localStorage.key(i);
          highscores[i][1] = parseInt(localStorage.getItem(highscores[i][0]));
      }
  }
  
  // functions 
  function startQuiz() {
      timeLeft = setInterval(function() {
          if (score <= 0) {
              score = 0;
              allDone();
              clearInterval(timeLeft);
          }
          time.textContent = score--;
      }, 1000);
      viewHighscoreSelector.removeEventListener('click', viewHighscore);
      time.style.visibility = 'visible';
      startText.forEach(a => a.classList.add('hide'));
      start.classList.add('hide');
      nextQuestion();
  }
  
  function nextQuestion() {
      currQuestionNo++;
      if (currQuestionNo == questions.length) {
          clearInterval(timeLeft);
          allDone();
          return;
      }
      showQuestion();
  }
  
  function showQuestion() {
      question.textContent = questions[currQuestionNo].questionText;
      option.forEach((op, i) => {
          op.classList.remove('hide');
          op.textContent = questions[currQuestionNo].options[i];
      });
  }
  
  function checkAnswer() {
      if (this.textContent == questions[currQuestionNo].answer) {
          if (currQues == currQuestionNo)
              return;
          incorrect.classList.add('hide');
          correct.classList.remove('hide');
          currQues++;
          setTimeout(function () {
              correct.classList.add('hide');
              incorrect.classList.add('hide');
              nextQuestion();
          }, 500);
      } else {
          score -= 10;
          incorrect.classList.remove('hide');
      }
  }
  
  function allDone() {
      viewHighscoreSelector.addEventListener('click', viewHighscore);
      question.textContent = "All Done!"
      option.forEach(a => a.classList.add('hide'));
      correct.classList.add('hide');
      incorrect.classList.add('hide');
      scoreDisplay.classList.remove('hide');
      if (score < 0)
          score = 0;
      scoreDisplay.textContent = `Your final score is ${score}.`;
      allDoneEl.classList.remove('hide');
      time.style.visibility = 'hidden';
  }
  
  function addNameToHighscore(e) {
      e.preventDefault();
      if (name.value != '') {
          if (score < 0)
              score = 0;
          highscores[currentSubmissions] = new Array();
          highscores[currentSubmissions][0] = name.value;
          highscores[currentSubmissions][1] = score;
          currentSubmissions++;
          localStorage.setItem(name.value, score);
          console.log(localStorage);
          highscores.sort(compareSecondColumn);
          function compareSecondColumn(a, b) {
              if (a[1] === b[1]) 
                  return 0;
              else 
                  return (a[1] > b[1]) ? -1 : 1;
          }
          viewHighscore();
      }
  }
  
  function viewHighscore() {
      scoreDisplay.classList.add('hide');
      allDoneEl.classList.add('hide');
      goBack.classList.remove('hide');
      clearHighscore.classList.remove('hide');
      highscoresDisplay.classList.remove('hide');
      question.textContent = "Highscores";
      start.classList.add('hide');
      startText.forEach(a => a.classList.add('hide'));
      highscoresDisplay.textContent = '';
      for (let i = 0; i < highscores.length; i++) {
          let str = `${i + 1}. ${highscores[i][0]} - ${highscores[i][1]} <br>`;
          highscoresDisplay.insertAdjacentHTML('beforeend', str);
      }
  };
  
  function resetState() {
      viewHighscoreSelector.addEventListener('click', viewHighscore);
      question.textContent = 'Coding Quiz Challange';
      time.style.visibility = 'hidden';
      startText.forEach(a => a.classList.remove('hide'));
      start.classList.remove('hide');
      goBack.classList.add('hide');
      clearHighscore.classList.add('hide');
      highscoresDisplay.classList.add('hide');
      score = 90;
      currQuestionNo = -1;
      currQues = -1;
      time.textContent = '90';
  }
  
  function clearHighscoresArray() {
      while (highscores.length > 0) 
          highscores.pop();
      highscoresDisplay.textContent = '';
      localStorage.clear();
      currentSubmissions = 0;
      highscoresDisplay.classList.add('.hide');
      resetState();
  }
  
  // points to keep in mind for future projects
  // code refactoring can be much better
  // dry principle
  // plan much better so that less query selectors can do the job and functions can be much modular
  // better naming especilly with singular and plural terms