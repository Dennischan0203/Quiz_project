const startQuiz = document.getElementById('startScreen'); //start screen
const quizing = document.getElementById('quizing'); //quiz screen
const quizResult = document.getElementById('resultScreen'); //end screen
const quizContainer = document.getElementById('quiz-container'); // current screen

quizContainer.innerHTML = startQuiz.innerHTML;

const startButton = document.getElementById('start');

startButton.addEventListener('click', gotoQuestions);

let questionNO = 0;
let progress_bar = 0;
let totalScore = 0;
const totalQuestions = 5;

class Quiz{
    constructor(title, answers){
        this.title = title;
        let r_num;
        this.answers = [];
        let length = answers.length;
        for(let i = length+1; i > 1; i--){
            r_num = Math.floor(Math.random()*length);
            this.answers.push(answers[r_num]);
            answers.splice(r_num,1);
            length--;
        };
    }
}

function gotoQuestions(){
    quizContainer.innerHTML = quizing.innerHTML;
    const question = document.getElementById('question');
    const question_no = document.getElementById('current-question');
    const total_question = document.getElementById('total-question');
    const score = document.getElementById('current-score');
    const bar = document.querySelector('div.progress');
    const q1 = new Quiz("What is XXXX",['1','2','3','4']);
    question.textContent = q1.title;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < q1.answers.length; i++) {
        const a = document.createElement('button');
        a.textContent = q1.answers[i];
        a.classList.add('answers');
        fragment.appendChild(a);
    }
    document.querySelector('div.select-section').appendChild(fragment);
    question_no.textContent = questionNO;
    questionNO++;
    total_question.textContent = totalQuestions;
    score.textContent = totalScore;
    bar.className = 'progress0';
}