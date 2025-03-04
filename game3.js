const word = "TRIVIAAAA".split("");
let revealedLetters = new Array(word.length).fill("_");
let questionIndex = 0;
let questions = [
    { question: "¿Cuál es la capital de Francia?", options: ["Madrid", "París", "Berlín"], answer: "París" },
    { question: "¿Cuánto es 5 + 3?", answer: "8" },
    { question: "¿Cuál es el metal más ligero?", options: ["Oro", "Aluminio", "Litio"], answer: "Litio" },
    { question: "¿Qué gas respiramos principalmente?", answer: "o" },
    { question: "¿En qué continente se encuentra Egipto?", options: ["Asia", "África", "Europa"], answer: "África" },
    { question: "¿Cuál es el océano más grande del mundo?", answer: "o" },
    { question: "¿Cuál es el océano más grande del mundo?", answer: "o" },
    { question: "¿Cuál es el océano más grande del mundo?", answer: "o" },
    { question: "¿Cuál es el océano más grande del mundo?", answer: "o" }
];

function normalizeString(str) {
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

function displayWord() {
    document.getElementById("hiddenWord").textContent = revealedLetters.join(" ");
}

function loadQuestion() {
    if (questions.length === 0) {
        document.getElementById("question-container").innerHTML = "<h2>Que tengas una hermoso dia.</h2>";
        document.getElementById("prevQuestion").style.display = "none";
        document.getElementById("nextQuestion").style.display = "none";
        document.getElementById("feedback").textContent = "";
        return;
    }
    if (questionIndex >= questions.length) questionIndex = questions.length - 1;

    document.getElementById("feedback").textContent = "";
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";

    let q = questions[questionIndex];
    let questionElement = document.createElement("p");
    questionElement.textContent = `${questionIndex + 1}. ${q.question}`;
    questionContainer.appendChild(questionElement);

    if (q.options) {
        q.options.forEach(option => {
            let btn = document.createElement("button");
            btn.textContent = option;
            btn.onclick = () => checkAnswer(option);
            questionContainer.appendChild(btn);
        });
    } else {
        let input = document.createElement("input");
        input.type = "text";
        input.id = "userInput";
        questionContainer.appendChild(input);

        let submitBtn = document.createElement("button");
        submitBtn.textContent = "Enviar";
        submitBtn.onclick = () => checkAnswer(input.value);
        questionContainer.appendChild(submitBtn);
    }
    updateButtons();
}

function checkAnswer(userAnswer) {
    let correctAnswer = normalizeString(questions[questionIndex].answer);
    if (normalizeString(userAnswer) === correctAnswer) {
        revealLetters();
        questions.splice(questionIndex, 1);
        updateIndexes();
        loadQuestion();
    } else {
        document.getElementById("feedback").textContent = "Respuesta incorrecta, intenta de nuevo.";
        document.getElementById("feedback").classList.add("incorrect");
    }
    updateButtons();
}

function revealLetters() {
    for (let i = 0; i < word.length; i++) {
        if (revealedLetters[i] === "_") {
            revealedLetters[i] = word[i];
            break;
        }
    }
    displayWord();
}

function prevQuestion() {
    if (questionIndex > 0) {
        questionIndex--;
        loadQuestion();
    }
}

function nextQuestion() {
    if (questionIndex < questions.length - 1) {
        questionIndex++;
        loadQuestion();
    }
}

function updateIndexes() {
    if (questionIndex >= questions.length) questionIndex = questions.length - 1;
}

function updateButtons() {
    document.getElementById("prevQuestion").disabled = questionIndex === 0;
    document.getElementById("prevQuestion").classList.toggle("disabled", questionIndex === 0);
    document.getElementById("nextQuestion").disabled = questionIndex >= questions.length - 1;
    document.getElementById("nextQuestion").classList.toggle("disabled", questionIndex >= questions.length - 1);
}

document.getElementById("prevQuestion").addEventListener("click", prevQuestion);
document.getElementById("nextQuestion").addEventListener("click", nextQuestion);

displayWord();
loadQuestion();
