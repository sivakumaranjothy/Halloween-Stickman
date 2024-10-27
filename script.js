const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const continueGameButton = document.getElementById("continue-game-button");
const resultsContainer = document.getElementById("results-container");
const resetButton = document.getElementById("reset-button");
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');

console.log(letterContainer, optionsContainer, userInputSection, newGameContainer);



//score it doesn't add score
//the time resets after every word snd it really fast says irene
//it doesn't start with how to playy -->
//logo
//font
//canvas bigger
//change the color of the done notes
//make it bigger
//have a color theme
//press keyboard while continue game is working--


window.onload = function() {
    // Show modal first
    let modal = document.getElementById("howToPlayModal");
    modal.style.display = "block";
    
    // Initialize the game
    initializer();
};





// Separate the initialization and modal display

document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById("howToPlayModal");
    const btn = document.getElementById("howToPlayBtn");
    const span = document.getElementsByClassName("close")[0];
    const startBtn = document.getElementById("startGameBtn");


    // Show modal immediately
    modal.style.display = "block";


    // Close button functionality
    span.onclick = function() {
        modal.style.display = "none";
    }


    // Start game button functionality
    startBtn.onclick = function() {
        modal.style.display = "none";
        initializer();
    }


    // Click outside modal to close
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});


// Keep your existing window.onload for game initialization


// options values for button
let options = {
    EASY: [
        "bat", "ghost", "witch", "pumpkin", "cat", "owl", "moon", "fog", "hat", "web",
        "mask", "rat", "boo", "batman", "spell", "scream", "clown", "scare", "fang", "tomb",
        "broom", "cauldron", "cloak", "doll", "beast", "spell", "demon", "bones", "crypt", "eyes",
        "candy", "fangs", "grave", "treat", "howl", "beetle", "boo", "lantern", "zombie", "fright",
        "skull", "shadow", "cloak", "spider", "web", "wolf", "haunt", "apple", "mask", "pot",
        "jackal", "tomb", "trick", "skull", "spook", "goblin", "scary", "jaws", "owl", "batty",
        "scary", "mummy", "bag", "treat", "pumpkin", "witchy", "ghost", "skull", "wolf", "trap",
        "gloom", "dusk", "wand", "spell", "boo", "shriek", "cobweb", "foggy", "pet", "spook",
        "claws", "brim", "cloak", "fangs", "night", "mask", "web", "candy", "fang", "bats",
        // 100 more words for easy level
    ],
    MEDIUM: [
        "haunted", "skeleton", "vampire", "phantom", "monster", "frankenstein", "cauldron", "tombstone",
        "pumpkin", "jackolantern", "gargoyle", "creature", "mummy", "specter", "nightmare", "werewolf",
        "zombie", "ghoul", "witchcraft", "coven", "blackcat", "superstition", "cauldron", "goblin", "banshee",
        "cryptkeeper", "scream", "shadows", "doppelganger", "grisly", "undead", "phantasm", "changeling", "mystic",
        "necromancer", "occult", "possession", "levitation", "haunting", "diabolical", "sorcery", "voodoo",
        "ghastly", "goblin", "poltergeist", "graveyard", "cauldron", "werewolves", "broomstick", "cobwebs",
        "screech", "fang", "brimstone", "soul", "spirits", "bloodcurdling", "hex", "crone", "ritual", "witchery",
        "midnight", "wicked", "gory", "hooded", "batwing", "devilry", "phantom", "grimoire", "incantation", "venom",
        // 100 more words for medium level
    ],
    HARD: [
        "necropolis", "phantasmagoria", "necronomicon", "lycanthropy", "poltergeist", "chupacabra", "werewolf",
        "hallucination", "apparition", "necromancer", "exorcism", "phantom", "doppelganger", "ghoulish", "transylvania",
        "abracadabra", "lycanthrope", "cryptozoology", "possession", "ectoplasm", "extraterrestrial", "phantasmagoric",
        "supernatural", "apparition", "hallucination", "paranormal", "telekinesis", "bioluminescence", "anathema",
        "morgue", "eldritch", "psychokinesis", "undead", "morbid", "spectral", "plasm", "occultism", "vampiric",
        "autopsy", "haemoglobin", "crucifix", "lycanthrope", "witchfinder", "ominous", "sacrificial", "transmogrify",
        "crematorium", "macabre", "chimera", "ouija", "banshee", "diabolism", "gorgon", "arcane", "therianthropy",
        // 100 more words for hard level
    ],
};
let score = 0;
let wordCounter = 0;
let gameTimer = null;
let gameTime = 0;
let isPaused = false;



const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};


// Timer function
const updateGameTimer = () => {
    if (!isPaused) {
        gameTime++;
        document.getElementById('game-timer').textContent = formatTime(gameTime);
    }
};


// Start timer
const startGameTimer = () => {
    if (!gameTimer) {  // Only start if no timer exists
        gameTimer = setInterval(updateGameTimer, 1000);
    }
    isPaused = false;

};


// Pause timer
const pauseGameTimer = () => {
    isPaused = true;
};


// count
let win = 0;
let count = 0;
let chosenWord = "";


// Display option buttons
const displayOptions = () => {
    optionsContainer.innerHTML += '<h3>Please Select a level before you play</h3>';
    let buttonCon = document.createElement("div");
    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
    optionsContainer.append(buttonCon);
};



// Block all the Buttons
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");
    
    optionsButtons.forEach((button) => button.disabled = true);
    letterButtons.forEach((button) => button.disabled = true);
    
    continueGameButton.classList.remove("hide");
    
    // Compact results display
    resultsContainer.innerHTML = `
        <div class="results-box">
            <h2 class='${winCount === chosenWord.length ? 'win-msg' : 'lose-msg'}'>
                ${winCount === chosenWord.length ? 'Correct!' : 'Incorrect'}
            </h2>
            <p>Word: ${chosenWord}</p>
            <p>Score: ${score}</p>
            <p>Time: ${formatTime(gameTime)}</p>
        </div>
    `;
};


// Generate the word for the selected option
const generateWord = (optionValue) => {

    startGameTimer();
    
    
    
    
    let optionsButtons = document.querySelectorAll(".options");
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue.toLowerCase()) {
            button.classList.add("active");
        }
        button.disabled = true;
    });
    


    // If optionValue matches the button innerText, highlight the button
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue.toLowerCase()) {
            button.classList.add("active");
        }
        button.disabled = true;
        
    });


    // Clear previous word and hide letters initially
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = options[optionValue];
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)].toUpperCase();

    // Create display item with visible underscores
    let displayItem = '';
    for(let i = 0; i < chosenWord.length; i++) {
        displayItem += '<span class="dashes">_</span>';
    }
    userInputSection.innerHTML = displayItem;
};



// Initializer function (called when page loads or new game starts)
const initializer = () => {
    console.log("Initializer called");
    winCount = 0;
    count = 0;


    // Reset content and hide letters and the new game button
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");  // Ensure the new game button is hidden initially


    // Show the other elements when the game starts
    
    optionsContainer.classList.remove("hide");


    // Clear the letter container and set up new buttons
    letterContainer.innerHTML = "";


    // Create letter buttons (A-Z)
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(i);
        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");


            // Logic for checking correct and incorrect letters
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    if (char === button.innerText) {
                        dashes[index].innerText = char;
                        winCount += 1;


                        // Check if the player has won
                        if (winCount === charArray.length) {
                            winSound.play();
                            pauseGameTimer();
                            score += 1;  // Increment score first
                            updateScoreDisplay();  // Update the main score display
                            continueGameButton.classList.remove("hide");
                            document.getElementById("results-container").innerHTML = 
                                `<h2 class='win-msg'>Correct!!</h2>
                                 <p>The word was <span>${chosenWord}</span></p>
                                 <p>Current Score: ${score}</p>
                                 <p>Time: ${formatTime(gameTime)}</p>`;
                            blocker();
                        }
                    }
                });
            } else {
                count += 1;
                drawMan(count);


                // Check if the player lost
                if (count === 6) {
                    loseSound.play();
                    pauseGameTimer();
                    continueGameButton.classList.remove("hide");
                    document.getElementById("results-container").innerHTML = 
                        `<h2 class='lose-msg'>Incorrect</h2>
                         <p>The word was <span>${chosenWord}</span></p>
                         <p>Final Score: ${score}</p>
                         <p>Time: ${formatTime(gameTime)}</p>`;
                    updateScoreDisplay();
                    blocker();
                }
            }
           
            button.disabled = true;
        });
        letterContainer.append(button);
    }


    displayOptions();  // Display category options


    let { initialDrawing } = canvasCreator();
    initialDrawing();  // Initial drawing setup
    
};

const letterClick = (button) => {
    let charArray = chosenWord.split("");
    let dashes = document.getElementsByClassName("dashes");

    if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
            if (char === button.innerText) {
                dashes[index].innerText = char;
                winCount += 1;
                if (winCount === charArray.length) {
                    winSound.play();
                    score += 1;
                    updateScoreDisplay();
                    showResults();
                }
            }
        });
    } else {
        count += 1;
        drawMan(count);
        if (count === 6) {
            loseSound.play();
            showResults();
        }
    }
    button.disabled = true;
};



window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    initializer();
});
const GameState = {
    INITIAL: 'initial',
    PLAYING: 'playing',
    PAUSED: 'paused',
    FINISHED: 'finished'
};

let currentGameState = GameState.INITIAL;

const updateGameState = (newState) => {
    currentGameState = newState;
    // Update UI based on state
};

const safeAudioPlay = async (audioElement) => {
    try {
        await audioElement.play();
    } catch (error) {
        console.log('Audio playback failed:', error);
    }
};
const isValidInput = (key) => {
    return /^[A-Z]$/i.test(key);
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const preloadAssets = async () => {
    const assets = [winSound, loseSound];
    const promises = assets.map(asset => {
        return new Promise((resolve, reject) => {
            asset.addEventListener('canplaythrough', resolve);
            asset.addEventListener('error', reject);
        });
    });
    await Promise.all(promises);
};
const cleanup = () => {
    document.removeEventListener('keydown', keyboardHandler);
    clearInterval(gameTimer);
};

window.addEventListener('beforeunload', cleanup);

const saveHighScore = () => {
    const highScores = JSON.parse(localStorage.getItem('hangmanHighScores') || '[]');
    highScores.push({
        score,
        time: gameTime,
        date: new Date().toISOString()
    });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem('hangmanHighScores', JSON.stringify(highScores.slice(0, 10)));
};

const handleKeyPress = debounce((event) => {
    // Your keyboard handling code
}, 100);



// Canvas creation

const canvasCreator = () => {
    let context = canvas.getContext("2d");
    
    canvas.width = 400;
    canvas.height = 300;
    
    context.strokeStyle = "#2F2F2F";
    context.lineWidth = 3;

    const drawLine = (fromX, fromY, toX, toY) => {
        context.beginPath();
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const drawSpiderWeb = (x, y) => {
        context.beginPath();
        context.arc(x, y, 15, 0, Math.PI * 2);
        context.stroke();
        drawLine(x-15, y, x+15, y);
        drawLine(x, y-15, x, y+15);
        drawLine(x-10, y-10, x+10, y+10);
        drawLine(x-10, y+10, x+10, y-10);
    };

    const drawGallows = () => {
        // Base structure
        drawLine(100, 250, 300, 250);  // Base
        drawLine(150, 50, 150, 250);   // Main post
        drawLine(150, 50, 250, 50);    // Top beam
        drawLine(150, 90, 190, 50);    // Support beam
        
        
        
        // Rope
        context.strokeStyle = "#593A2E";
        drawLine(250, 50, 250, 90);
        context.strokeStyle = "#2F2F2F";
    };

    const initialDrawing = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGallows();
    };

    const head = () => {
        drawGallows();
        context.beginPath();
        context.arc(250, 110, 20, 0, Math.PI * 2);
        context.stroke();
    };

    // Rest of body parts with drawGallows() at start of each function
    const body = () => {
        drawGallows();
        head();
        drawLine(250, 130, 250, 190);
    };

    const leftArm = () => {
        drawGallows();
        body();
        drawLine(250, 150, 220, 170);
    };

    const rightArm = () => {
        drawGallows();
        leftArm();
        drawLine(250, 150, 280, 170);
    };

    const leftLeg = () => {
        drawGallows();
        rightArm();
        drawLine(250, 190, 220, 220);
    };

    const rightLeg = () => {
        drawGallows();
        leftLeg();
        drawLine(250, 190, 280, 220);
    };

    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};



// Make sure this drawMan function is in your code
const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            head();
            body();
            break;
        case 3:
            head();
            body();
            leftArm();
            break;
        case 4:
            head();
            body();
            leftArm();
            rightArm();
            break;
        case 5:
            head();
            body();
            leftArm();
            rightArm();
            leftLeg();
            break;
        case 6:
            head();
            body();
            leftArm();
            rightArm();
            leftLeg();
            rightLeg();
            break;
        default:
            break;
    }
};





const audio = document.getElementById('myAudio');


        function playAudio() {


            while(true){
                audio.play();


            }
            
        }






// Get the modal
var modal = document.getElementById("howToPlayModal");


// Get the button that opens the modal
var btn = document.getElementById("howToPlayBtn");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
document.removeEventListener('keydown', keyboardHandler);

// Create a dedicated keyboard handler function
function keyboardHandler(event) {
    // First check if continue button is visible
    if (!continueGameButton.classList.contains('hide')) {
        // Only allow Enter key when continue screen is shown
        if (event.key === 'Enter') {
            continueGame();
        }
        event.preventDefault();
        return false;
    }
    
    // Regular gameplay keyboard handling
    let key = event.key.toUpperCase();
    let buttons = document.querySelectorAll(".letters:not(:disabled)");
    
    buttons.forEach(button => {
        if (button.innerText === key) {
            button.click();
            button.classList.add('active');
        }
    });

}


const continueGame = () => {
    wordCounter++;
        // Check if we've reached 6 words
        if (wordCounter >= 6) {
            // Show final stats and new game option
            newGameContainer.classList.remove("hide");
            continueGameButton.classList.add("hide");
            document.getElementById("results-container").innerHTML = "";
    
            newGameContainer.innerHTML = `
                <div class="final-stats">
                    <h2>Good Game 😎😎</h2>
                    <p>Final Score: ${score}</p>
                    <p>Total Time: ${formatTime(gameTime)}</p>
                    <p>Words Completed: ${wordCounter}</p>
                </div>
                <button id="new-game-button">New Game</button>
            `;
            
            // Add event listener to the new button
            document.getElementById("new-game-button").addEventListener("click", () => {
                score = 0;
                wordCounter = 0;
                gameTime = 0;
                resetGame();
            });
            
            return; // Stop the continue game flow
        }
    
     // Keep the current difficulty level
     
     // Update results container with current stats
     document.getElementById("results-container").innerHTML = `
         <div class="game-stats">
             <p>Current Score: ${score}</p>
             <p>Time: ${formatTime(gameTime)}</p>
         </div>
     `;
    // Reset game elements
    continueGameButton.classList.add("hide");
    document.getElementById("results-container").innerHTML = "";
    
    // Keep the current difficulty level
    let activeButton = document.querySelector(".options.active");
    let currentDifficulty = activeButton ? activeButton.innerText : null;
    
    // Generate new word with same difficulty
    if (currentDifficulty) {
        generateWord(currentDifficulty);
    }
    
    // Reset letter buttons
    letterContainer.innerHTML = "";
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(i);
        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");
            
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    if (char === button.innerText) {
                        dashes[index].innerText = char;
                        winCount += 1;
                        if (winCount === charArray.length) {
                            winSound.play();
                            score += 1;
                            updateScoreDisplay();
                            blocker();
                        }
                    }
                });
            } else {
                count += 1;
                drawMan(count);
                if (count === 6) {
                    loseSound.play();
                    blocker();
                }
            }
            button.disabled = true;
        });
        letterContainer.append(button);
    }
    
    winCount = 0;
    count = 0;
    
    let { initialDrawing } = canvasCreator();
    initialDrawing();
};


const updateScoreDisplay = () => {
    document.getElementById('score-display').textContent = `Score: ${score}`;
};


const resetGame = () => {

    clearInterval(gameTimer);
    gameTimer = null;
    gameTime = 0;
    document.getElementById('game-timer').textContent = '00:00';
    // Reset score
    score = 0;
    updateScoreDisplay();
    document.getElementById("results-container").innerHTML = "";
    
    
    // Reset timer
    clearInterval(gameTimer);
    gameTime = 0;
    document.getElementById('game-timer').textContent = '00:00';
    
    // Reset word counter
    wordCounter = 0;
    
    // Reset canvas
    let { initialDrawing } = canvasCreator();
    initialDrawing();
    
    // Enable all buttons
    let letterButtons = document.querySelectorAll(".letters");
    letterButtons.forEach((button) => {
        button.disabled = false;
        button.classList.remove('active');
    });
    
    // Reset options
    optionsContainer.innerHTML = "";
    displayOptions();
    
    // Hide continue and new game buttons
    continueGameButton.classList.add("hide");
    newGameContainer.classList.add("hide");
    
    // Reset keyboard input
    keyboardEnabled = true;
    
    // Initialize fresh game state
    initializer();
};

resetButton.addEventListener("click", resetGame);




// Add event listener for continue game button
continueGameButton.addEventListener("click", continueGame);


// New Game Button


newGameButton.addEventListener("click", initializer);

document.addEventListener('keydown', function(event) {
    // Only handle Enter key when results are visible
    if (document.getElementById("results-container").innerHTML !== "") {
        if (event.key === 'Enter') {
            continueGame();
        }
        return;
    }
    
    // Regular gameplay keyboard handling
    let key = event.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
        let buttons = document.querySelectorAll(".letters:not(:disabled)");
        buttons.forEach(button => {
            if (button.innerText === key) {
                button.click();
            }
        });
    }
});

// Updated blocker function with compact results

window.onload = initializer;



