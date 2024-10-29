const API = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;

const fetchItem = async () => {
    try {
        const response = await fetch(API);
        const data = await response.json(); // Convierte la respuesta a JSON
        return data.results; 
    } catch (error) {
        console.log(error);
    }
};


let currentQuestionIndex = 0;
let questions = [];  

const loadQuestions = async () => {
    questions = await fetchItem();
    displayQuestion();
};

// Mostrar preguntas
const displayQuestion = () => {
    const questionData = questions[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');

    questionElement.innerHTML = questionData.question; 

    optionsElement.innerHTML = '';

    const answers = [...questionData.incorrect_answers, questionData.correct_answer];
    answers.sort(() => Math.random() - 0.5);  // Posiciones aleatorias

    answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('option-button');
        button.onclick = () => checkAnswer(answer, questionData.correct_answer);
        optionsElement.appendChild(button);
    });
};

const checkAnswer = (selectedAnswer, correctAnswer) => {
    if (selectedAnswer === correctAnswer) {
        alert('¡Correcto!');
    } else {
        alert('Incorrecto. La respuesta correcta era: ' + correctAnswer);
    }
    loadNextQuestion();
};

const loadNextQuestion = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        alert('¡Has terminado el quiz!');
        currentQuestionIndex = 0;
        loadQuestions();
    }
};

loadQuestions();
