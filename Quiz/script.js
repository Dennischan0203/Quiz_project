const startQuiz = document.getElementById('startScreen'); //start screen
const quizing = document.getElementById('quizing'); //quiz screen
const quizResult = document.getElementById('resultScreen'); //end screen
const quizContainer = document.getElementById('quiz-container'); // current screen

quizContainer.innerHTML = startQuiz.innerHTML;

const startButton = document.getElementById('start');

startButton.addEventListener('click', gotoQuestions);

let question_no = 0;
let progress_bar = 0;
let score = 0;

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

        /*r_num = Math.floor(Math.random()*4);
        this.answer1 = answers[r_num];
        answers.splice(r_num,1);
        r_num = Math.floor(Math.random()*3);
        this.answer2 = answers[r_num];
        answers.splice(r_num,1);
        r_num = Math.floor(Math.random()*2);
        this.answer3 = answers[r_num];
        answers.splice(r_num,1);
        r_num = Math.floor(Math.random()*1);
        this.answer4 = answers[r_num];
        answers.splice(r_num,1);*/
    }
}

function gotoQuestions(){
    quizContainer.innerHTML = quizing.innerHTML;
    const question = document.getElementById('question');
    const question_no = document.getElementById('current-question');
    const total_question = document.getElementById('total-question');
    const score = document.getElementById('current-score');
    const bar = document.querySelector('div.progress');
    const q1 = new Quiz("What is Question1",['1','2','3','4']);
    question.textContent = q1.title;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < q1.answers.length; i++) {
        const a = document.createElement('button');
        a.textContent = q1.answers[i];
        a.classList.add('answers');
        fragment.appendChild(a);
    }
    document.querySelector('div.select-section').appendChild(fragment);
    /*a1.textContent = q1.answer1;
    a2.textContent = q1.answer2;
    a3.textContent = q1.answer3;
    a4.textContent = q1.answer4;*/
}