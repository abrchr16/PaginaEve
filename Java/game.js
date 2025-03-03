const words = ['Deslumbras como el sol']; // Lista de palabras con espacios
let selectedWord = words[Math.floor(Math.random() * words.length)]; // Selecciona una palabra aleatoria
let displayedWord = selectedWord.split(' ').map(word => {
    return word.split('').map(letter => {
        // Si es un caracter especial, lo dejamos visible, de lo contrario, lo reemplazamos por un guión bajo
        return /[a-zA-ZáéíóúÁÉÍÓÚ]/.test(letter) ? '_' : letter;
    });
}); // Palabra oculta con guiones bajos para las letras, dejando visibles los caracteres especiales
let attempts = 9; // Número de intentos
let wrongLetters = []; // Letras incorrectas
let usedLetters = []; // Letras ya adivinadas

// Actualiza la visualización de la palabra
function updateWordDisplay() {
    let displayString = displayedWord.map((word, index) => {
        // Unimos las letras de cada palabra con un espacio normal entre letras
        let wordDisplay = word.join(' ');

        // Si no es la última palabra, agregamos un espacio grande entre palabras
        if (index < displayedWord.length - 1) {
            return wordDisplay + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; // Espacio grande entre palabras
        } else {
            return wordDisplay; // Última palabra sin espacio extra
        }
    }).join(''); // Unimos todas las palabras

    // Actualiza el contenido en el HTML
    document.getElementById('wordDisplay').innerHTML = displayString;
}

// Actualiza los intentos restantes
function updateAttempts() {
    document.getElementById('attempts').textContent = attempts;
}

// Actualiza las letras incorrectas
function updateWrongLetters() {
    document.getElementById('wrongLetters').textContent = wrongLetters.join(', ');
}

// Bloquear el juego si se quedan sin intentos
function blockGame() {
    document.getElementById('guessButton').disabled = true; // Deshabilitar el botón
}

// Maneja la adivinanza del jugador
document.getElementById('guessButton').addEventListener('click', function () {
    // Obtener el valor ingresado por el jugador
    const guess = document.getElementById('guessInput').value.trim().toLowerCase(); // .trim() quita los espacios antes y después de la entrada

    // Validamos que el input no esté vacío
    if (guess === '') {
        document.getElementById('message').textContent = 'Por favor, ingresa una letra.';
        return; // Detener la ejecución si la entrada es vacía
    }

    // Validar que solo se ingrese una letra
    if (guess.length === 1) {
        if (usedLetters.includes(guess)) {
            // Si la letra ya fue usada, mostrar mensaje sin perder intentos
            document.getElementById('message').textContent = 'Ya has adivinado esa letra.';
            return;
        }

        usedLetters.push(guess); // Marcar la letra como usada
        let correctGuess = false;

        // Recorrer cada palabra en la frase
        for (let i = 0; i < displayedWord.length; i++) {
            for (let j = 0; j < displayedWord[i].length; j++) {
                // Comprobamos si la letra ingresada es correcta y si está oculta
                if (selectedWord.split(' ')[i][j].toLowerCase() === guess && displayedWord[i][j] === '_') {
                    displayedWord[i][j] = selectedWord.split(' ')[i][j]; // Reemplazamos el guion bajo con la letra correcta
                    correctGuess = true;
                }
            }
        }

        if (correctGuess) {
            updateWordDisplay(); // Actualizar la visualización de la palabra
        } else {
            attempts--; // Si la letra no está en la palabra, reduce los intentos
            wrongLetters.push(guess); // Añadir la letra incorrecta
            updateAttempts();
            updateWrongLetters();
        }

        // Verificar si el jugador ha ganado o perdido
        if (attempts === 0) {
            document.getElementById('message').textContent = '¡Perdiste! La frase era: ' + selectedWord;
            blockGame(); // Bloquear el juego si se quedan sin intentos
        } else if (!displayedWord.some(word => word.includes('_'))) {
            document.getElementById('message').textContent = '¡Ganaste!'
            blockGame(); // Bloquear el juego si se adivinan todas las letras
        }
    } else {
        document.getElementById('message').textContent = 'Por favor, ingresa solo una letra.';
    }

    // Limpiar la entrada
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').focus();
});

// Inicializa el juego
updateWordDisplay();
updateAttempts();
