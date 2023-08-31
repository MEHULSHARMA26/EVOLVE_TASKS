const startBtn = document.querySelector('.start-button');
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');

const continueBtn = document.querySelector('.continue-btn');
const quizSelection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');

const resultBox=document.querySelector('.result-box');

startBtn.onclick = () => {
  popupInfo.classList.add('active');
  main.classList.add('active');
};
exitBtn.onclick = () => {
  popupInfo.classList.remove('active');
  main.classList.remove('active');
};
continueBtn.onclick = () => {
  quizSelection.classList.add('active');
  popupInfo.classList.remove('active');
  main.classList.remove('active');
  quizBox.classList.add('active');
  showQuestions(0);
  questionCounter(1);
  headerScore();
};

let questionCount = 0;
let questionNumb = 1;
let userScore=0;
const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestions(questionCount);

    questionNumb++;
    questionCounter(questionNumb);
  } else {
    
    showResultBox();
  }
};

const optionList = document.querySelector('.option-list');
///getting questions and answers from array
function showQuestions(index) {
  const questionText = document.querySelector('.question-text');
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]} </span></div> 
    <div class="option"><span>${questions[index].options[2]} </span></div> 
    <div class="option"><span>${questions[index].options[3]} </span></div> `;

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll('.option');

  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;
  
  if (userAnswer != correctAnswer) {
    userScore++;
    headerScore();
    console.log('correctAnswer');
  } else {
    
    console.log('answer is wrong');
    answer.classList.add('incorrect');
  }
  for(let i =0 ;i< allOptions;i++){
    optionList.children[i].classList.add('disabled');
  }
}

function questionCounter(index) {
  const questionTotal = document.querySelector('.question-total');

  questionTotal.textContent = `${index} of ${questions.length} Questions `;
}
function headerScore(){
    const headerScoreText=document.querySelector('.header-score');
    headerScoreText.textContent = `Score:${userScore}/${questions.length}`;
}
function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText =document.querySelector('.score-text');
    scoreText.textContent =`Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.score-text');
    const progressValue=document.querySelector('.progress-value');
    let progressStartValue = 0;
    let progressEndValue=60;
    let speed = 20;

    let progress= setInterval(() => {
        progressStartValue++;
        progressValue.textContent =`${progressStartValue}%`;
        if(progressStartValue == progressEndValue ){
            clearInterval(progress);
        }
    },speed);
}