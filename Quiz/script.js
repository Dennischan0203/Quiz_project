const startQuiz = document.getElementById('startScreen'); //start screen
const quizing = document.getElementById('quizing'); //quiz screen
const quizResult = document.getElementById('resultScreen'); //end screen
const quizContainer = document.getElementById('quiz-container'); // current screen

quizContainer.innerHTML = startQuiz.innerHTML;

const startButton = document.getElementById('start');

class Quiz{
    constructor(title, answers){
        this.title = title;
        let r_num;
        this.answers = [];
        let length = answers.length;
        for(let i = length; i > 0; i--){
            r_num = Math.floor(Math.random()*i);
            this.answers.push(answers[r_num]);
            answers.splice(r_num,1);
        };
    }
}

let questionNO = 0;
let progress_bar = 0;
let totalScore = 0;
const totalQuestions = 5;

const q1 = new Quiz("What is 1",['1','2','3','4']);
const q2 = new Quiz("What is 2",['1','2','3','4']);
const q3 = new Quiz("What is 3",['1','2','3','4']);
const q4 = new Quiz("What is 4",['1','2','3','4']);
const q5 = new Quiz("What is 5",['1','2','3','4']);

// Start the quiz

startButton.addEventListener('click', async()=>{
    gotoQuestions(q1,1);
    await nextQuestion(q2,2);
    await nextQuestion(q3,3);
    await nextQuestion(q4,4);
    await nextQuestion(q5,5);
    gotoResult();
}, { once: true });



function gotoQuestions(q, q_no){
    quizContainer.innerHTML = quizing.innerHTML;
    const current_progress = ((q_no-1)/totalQuestions)*100;
    const question = document.getElementById('question');
    const question_no = document.getElementById('current-question');
    const total_question = document.getElementById('total-question');
    const score = document.getElementById('current-score');
    const bar = document.querySelector('div.progress');
    question.textContent = q.title;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < q.answers.length; i++) {
        const a = document.createElement('button');
        a.textContent = q.answers[i];
        a.classList.add('answers');
        fragment.appendChild(a);
    }
    document.querySelector('div.select-section').appendChild(fragment);
    question_no.textContent = q_no;
    questionNO++;
    total_question.textContent = totalQuestions;
    score.textContent = totalScore;
    bar.id = `progress${current_progress}`;
}

async function nextQuestion(q,q_no){
    const answer_buttons = document.querySelector('.select-section');
    await new Promise(resolve => {
        answer_buttons.addEventListener('click', (e)=>{
            if(e.target.classList.contains('answers')){
                gotoQuestions(q,q_no);
            };
            resolve();
        }, { once: true });
    });
}

async function gotoResult(){
    const answer_buttons = document.querySelector('.select-section');
    await new Promise(resolve => {
        answer_buttons.addEventListener('click', (e)=>{
            if(e.target.classList.contains('answers')){
                quizContainer.innerHTML = quizResult.innerHTML;
            };
            resolve();
        }, { once: true });
    });
    console.log('hi')
    const restart = document.querySelector('#restart');
    console.log('hi2')
    restart.addEventListener('click',async()=>{
        gotoQuestions(q1,1);
        await nextQuestion(q2,2);
        await nextQuestion(q3,3);
        await nextQuestion(q4,4);
        await nextQuestion(q5,5);
        gotoResult();
    })
}