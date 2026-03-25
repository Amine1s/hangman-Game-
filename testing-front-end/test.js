// letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// array from leters
const lettersArray = Array.from(letters);
// console.log(lettersArray);
// select letter container
let lettersContainer = document.querySelector(".letters");
//generate letters
lettersArray.forEach((letter) => {
  //creat span
  let span = document.createElement("span");

  //creat letter text

  let theLetter = document.createTextNode(letter);
  // append theLetter to span
  span.appendChild(theLetter);

  // add class to span
  span.className = "letter-box";
  //apend span to letter container
  lettersContainer.appendChild(span);
});
// object of words + categories
const words = {
  programing: [
    "php",
    "javascript",
    "typescript",
    "go",
    "python",
    "scala",
    "r",
    "fprtran",
  ],
  movies: [
    "up",
    "coco",
    "prestige",
    "inception",
    "parasite",
    "interstellar",
    "whiplash",
    "memento",
  ],
  games: ["cod", "delta force", "pbg"],
  contries: ["morocco", "algeria", "syria", "palastine", "yemen", "egypt"],
};
// get random property

let allKeys = Object.keys(words);
//random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
//category
let randomPropName = allKeys[randomPropNumber];
//category`s words
let randomPropValue = words[randomPropName];
// random number deprnd on words length
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
//
let randomNumberValue = randomPropValue[randomValueNumber];

//set category info

document.querySelector(".game-info .category span").innerHTML = randomPropName;

//select leters guess container
let letterGuessContainer = document.querySelector(".letters-guess");

// convert chosen word to array
let lettersAndSpace = Array.from(randomNumberValue);

// creat span depend on word

lettersAndSpace.forEach((letter) => {
  // creat empty span
  let emptySpan = document.createElement("span");
  // if letter is space
  if (letter === " ") {
    //add class to empty span
    emptySpan.className = "space";
  }
  // appand span to letters guess container
  letterGuessContainer.appendChild(emptySpan);
});

// select Guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong attempts
let wrongAttempts = 0;

// sellect draw element
let theDraw = document.querySelector(".hangMan-draw");

// handel clicking letters
document.addEventListener("click", (e) => {
  //set default statuss
  let courentStatus = false;
  //
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // get clicked letter
    let clickedLetter = e.target.innerHTML.toLowerCase();
    // console.log(lettersAndSpace);

    // chosen word
    let chosenWord = Array.from(randomNumberValue.toLowerCase());
    chosenWord.forEach((wordLetter, Wordindex) => {
      //if the clicked letter is one of word's letters
      if (clickedLetter == wordLetter) {
        //set status to correct
        courentStatus = true;
        // loop on all guess spans
        guessSpans.forEach((span, spanIndex) => {
          if (Wordindex === spanIndex) {
            span.innerHTML = wordLetter;
          }
        });
      }
    });
    //outside loop
    console.log(courentStatus);
    // if letter is wrong
    if (courentStatus !== true) {
      // increace wrong attempts
      wrongAttempts++;

      //add class wrong on drawelement
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // play loosing sound
      document.getElementById("failed").play();
      if (wrongAttempts === 8) {

        endGame();

        lettersContainer.classList.add("finished")
      }
    }
    // play success sound
    else{
      document.getElementById("success").play();
    }
  }
});

// endGame function
function endGame() {
  //creat popup
  let popup = document.createElement("div");
  //creat text
  let popupTxt = document.createTextNode(
    `Game Over, the word is ${randomNumberValue}`,
  );
  // apend text to popup
  popup.appendChild(popupTxt);
  // add class on popup
  popup.className = 'popup';
  // append to body
  document.body.appendChild(popup);
}