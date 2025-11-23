// API URL
const URL = 'http://localhost:5000';

const startQuiz = document.getElementById('startScreen'); //start screen
const quizing = document.getElementById('quizing'); //quiz screen
const quizResult = document.getElementById('resultScreen'); //end screen
const quizContainer = document.getElementById('quiz-container'); // current screen

quizContainer.innerHTML = startQuiz.innerHTML;

const startButton = document.getElementById('start');

class Quiz{
    constructor(id, title, answers, correct_answer){
        this.id = id;
        this.title = title;
        let r_num;
        let correctANS;
        switch(correct_answer){
            case 'A':
                correctANS = 0;
                break;
            case 'B':
                correctANS = 1;
                break;
            case 'C':
                correctANS = 2;
                break;
            case 'D':
                correctANS = 3;
                break;
        }
        this.correct_answer = answers[correctANS];
        this.answers = [];
        let length = answers.length;
        for(let i = length; i > 0; i--){
            r_num = Math.floor(Math.random()*i);
            this.answers.push(answers[r_num]);
            answers.splice(r_num,1);
        };
    }
}

let questionNO = 1;
let progress_bar = 0;
let totalScore = 0;
const totalQuestions = 5;
let quiz_completed = [];

// Start the quiz
startButton.addEventListener('click', async()=>{
    startTheQuiz();
}, { once: true });

async function startTheQuiz(){
    gotoQuestions(await createQuiz());

}

async function getQuiz() {
    try{
        const response = await fetch(`${URL}/quizQ`);
        if (!response.ok) throw new Error('not ok');
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error(error);
    };
}

async function createQuiz() {
    const quizData = await getQuiz(); // wait for the data
    if (!quizData) return; // exit if there was an error
    if (quiz_completed.includes(quizData.quiz[0].question)){
        return await createQuiz();
    }else{
        quiz_completed.push(quizData.quiz[0].question);
    }
        
    const q = new Quiz(
        quizData.quiz[0].id,
        quizData.quiz[0].question,
        [quizData.quiz[0].optionA, quizData.quiz[0].optionB, quizData.quiz[0].optionC, quizData.quiz[0].optionD],
        quizData.quiz[0].correctOption
    );
    return q;
}

async function gotoQuestions(q){
    quizContainer.innerHTML = quizing.innerHTML;
    const current_progress = ((questionNO -1)/totalQuestions)*100;
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
    question_no.textContent = questionNO;
    total_question.textContent = totalQuestions;
    score.textContent = totalScore;
    bar.id = `progress${current_progress}`;
    questionNO++;
    nextQuestion(q);
}

async function nextQuestion(q){
    const answer_buttons = document.querySelector('.select-section');
    await new Promise(resolve => {
        answer_buttons.addEventListener('click', async(e)=>{
            if(e.target.textContent == q.correct_answer){
                totalScore++;
            };
            if(totalQuestions < questionNO){
                gotoResult();
            }else{
                gotoQuestions(await createQuiz());
            }
            resolve();
        }, { once: true });
    });
}

async function gotoResult(){
    quizContainer.innerHTML = quizResult.innerHTML;
    const final_score = document.querySelector('#final-score');
    const max_score = document.querySelector('#max-score');
    const result_message = document.querySelector('#result-message');
    final_score.textContent = totalScore;
    max_score.textContent = totalQuestions;
    switch(totalScore){
        case 0:
            result_message.textContent = 'Try it again!';
            break;
        case 1:
            case 0:
            result_message.textContent = 'Nice Try!';
            break;
        case 2:
            result_message.textContent = 'Not bad!';
            break;
        case 3:
            result_message.textContent = 'Good job!';
            break;
        case 4:
            result_message.textContent = 'Awesome!';
            break;
        case 5:
            result_message.textContent = 'Impressive !!! You nailed it !';
            break;
    }
    const restart = document.querySelector('#restart');
    restart.addEventListener('click',async()=>{
        questionNO = 1;
        totalScore = 0;
        quiz_completed = [];
        startTheQuiz();
    })
}