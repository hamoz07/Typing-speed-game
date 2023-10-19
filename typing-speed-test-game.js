// the words
const words = [
  "Hello",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Paradigm",
  "Styling",
  "Cascade",
  "Coding",
  "Funny",
  "Working",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
  "Apple",
  "Banana",
  "Car",
  "Dog",
  "Elephant",
  "Fish",
  "Guitar",
  "House",
  "Island",
  "Jungle",
  "Kangaroo",
  "Lemon",
  "Monkey",
  "Ninja",
  "Orange",
  "Pizza",
  "Queen",
  "Robot",
  "Sun",
  "Tiger",
  "Umbrella",
  "Volcano",
  "Watermelon",
  "Xylophone",
  "Yacht",
  "Zebra",
  "Spoon",
  "Chair",
  "Laptop",
  "Mountain",
  "Rainbow",
  "Book",
  "Fire",
  "Camera",
  "Ocean",
  "Moon",
  "Star",
  "Diamond",
  "Music",
  "Sunflower",
  "Butterfly",
  "Rain",
  "Coffee",
  "Candle",
  "Bridge",
  "Key",
  "Dream",
  "Adventure",
  "Laughter",
  "Whisper",
  "Mystery",
];

// Rank the words based on difficulty level
const rankedWords = words.sort((a, b) => a.length - b.length);

// Difficulty Levels
const levels = {
  Easy: 7,
  Normal: 5,
  Hard: 3,
};

// Words for each difficulty level
const easyWords = rankedWords.slice(0, 20);
const normalWords = rankedWords.slice(21, 50);
const hardWords = rankedWords.slice(51, 76);



// DOM elements
const selectElement = document.querySelector("select");
const lvl = document.querySelector(".message .lvl");
const lvlSecs = document.querySelector(".message .seconds");
const startBtn = document.querySelector(".start");
const the_word = document.querySelector(".the-word");
const main_input = document.querySelector(".input");
const upcoming_words = document.querySelector(".upcoming-words");
const time_left = document.querySelector(".time span");
const gotScore = document.querySelector(".score .got");
const totalScore = document.querySelector(".score .total");
const finish = document.querySelector(".finish");

let defaultLevel = "Easy";
let defaultLevelSecs = levels[defaultLevel];

// Event listener for level selection
selectElement.addEventListener("change", function () {
  defaultLevel = selectElement.value;
  defaultLevelSecs = levels[defaultLevel];

  lvl.innerHTML = defaultLevel;
  lvlSecs.innerHTML = defaultLevelSecs;
  time_left.innerHTML = defaultLevelSecs;

  if (defaultLevel === "Easy") {
    totalScore.innerHTML = easyWords.length;
  } else if (defaultLevel === "Normal") {
    totalScore.innerHTML = normalWords.length;
  } else {
    totalScore.innerHTML = hardWords.length;
  }

});

// Disabling features and customizing elements
main_input.onpaste = function () {
  return false;
};

the_word.oncopy = function () {
  return false;
};

main_input.onfocus = function () {
  main_input.style.borderWidth = "5px";
};

main_input.onblur = function () {
  main_input.style.borderWidth = "3px";
};

// Game process
startBtn.onclick = function () {
  this.remove();
  main_input.focus();
  main_input.style.borderWidth = "4px";
  genWord();
  document.querySelector(".select-container").remove();
  document.querySelector(".message").style.width = "100%";
};

selectElement.onblur = function () {
  selectElement.style.cssText = "border-width: 0px;";
};

selectElement.onclick = function () {
  selectElement.style.cssText = "border: 3px solid #2196f3ba;";
};

function genWord() {
  if (defaultLevel === "Easy") {
    return generateWord(easyWords);
  } else if (defaultLevel === "Normal") {
    return generateWord(normalWords);
  } else {
    return generateWord(hardWords);
  }
}

function generateWord(wordList) {
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  const wordIndex = wordList.indexOf(randomWord);

  wordList.splice(wordIndex, 1);

  the_word.innerHTML = randomWord;

  upcoming_words.innerHTML = "";

  for (let i = 0; i < wordList.length; i++) {
    const div = document.createElement("div");
    const divText = document.createTextNode(wordList[i]);
    div.appendChild(divText);
    upcoming_words.appendChild(div);
  }

  startPlaying();
}

function startPlaying() {
  time_left.innerHTML = defaultLevelSecs;
  lvlSecs.innerHTML = defaultLevelSecs;
  handleTimeLeft();
}

let start;

function handleTimeLeft() {
  start = setInterval(() => {
    time_left.innerHTML--;
    lvlSecs.innerHTML--;
    if (time_left.innerHTML === "0") {
      clearInterval(start);
      if (the_word.innerHTML.toLowerCase() === main_input.value.toLowerCase()) {
        checkVal();
      } else {
        gameOver();
      }
    }
  }, 1000);
}

function checkVal() {
  main_input.value = "";
  gotScore.innerHTML++;
  document.getElementsByClassName("correctWord")[0].textContent =
    "Correct Word";
    if (easyWords.length === 0 || normalWords.length === 0 || hardWords.length === 0) {
      win();
    } else {
      genWord();
    }
    
}

function win() {
  main_input.value = "";
  the_word.remove();
  upcoming_words.remove();
  const successDiv = document.createElement("div");
  const successMsg = document.createTextNode(
    `You Win!, ${document.getElementsByClassName("score")[0].textContent}`
  );
  successDiv.className = "good";
  successDiv.appendChild(successMsg);
  finish.appendChild(successDiv);
}

function gameOver() {
  main_input.value = "";
  document.getElementsByClassName("correctWord")[0].remove();
  const gameOverDiv = document.createElement("div");
  const tryAgainBtn = document.createElement("button");
  const gameOverMsg = document.createTextNode(
    `Game Over, ${document.getElementsByClassName("score")[0].textContent}`
  );
  const tryAgainBtnTxt = document.createTextNode(
    "try again"
  );
  
  gameOverDiv.className = "bad flex-data";
  tryAgainBtn.addEventListener("click",()=>{
    location.reload()
  });
  gameOverDiv.appendChild(gameOverMsg);
  tryAgainBtn.appendChild(tryAgainBtnTxt);
  gameOverDiv.prepend(tryAgainBtn)
  finish.appendChild(gameOverDiv);
}

