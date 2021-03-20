const Hangman = function (word, guesses) {
  this.word = word.toLowerCase().split("");
  this.guesses = guesses;
  this.guessedLetter = [];
  this.status = "playing";
};

Hangman.prototype.getPuzzle = function () {
  let puzzle = "";
  this.word.forEach((letter) => {
    if (this.guessedLetter.includes(letter) || letter === "") {
      puzzle += letter;
    } else {
      puzzle += "*";
    }
  });
  return puzzle;
};

Hangman.prototype.guess = function (letter) {
  letter = letter.toLowerCase();

  if (this.status !== "playing") return;

  if (!this.guessedLetter.includes(letter)) {
    if (this.word.includes(letter)) {
      this.guessedLetter.push(letter);
    } else {
      this.guesses--;
    }
  }
};

Hangman.prototype.calculateStatus = function () {
  let finished = this.word.every((el) => this.guessedLetter.includes(el));

  // let finished = true;
  // this.word.forEach((el) => {
  //   if (!this.guessedLetter.includes(el)) {
  //     finished = false;
  //   }
  // });

  if (this.guesses === 0) {
    this.status = "failed";
  } else {
    this.status = !finished ? "playing" : "finished";
  }
};

Hangman.prototype.getStatus = function () {
  if (this.status === "failed") {
    return `Nice Try! The Word Was ${this.word.join("")}`;
  } else if (this.status === "finished") {
    return `Great Work , You guessed The word`;
  } else {
    return `Guesses Left : ${this.guesses}`;
  }
};

const game1 = new Hangman("Momen", 3);
console.log(game1.getPuzzle());
window.addEventListener("keypress", (e) => {
  const key = e.key;
  game1.guess(key);
  console.log(game1.getPuzzle());
});
