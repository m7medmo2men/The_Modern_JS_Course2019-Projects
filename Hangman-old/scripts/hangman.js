class Hangman {
  constructor(word, guesses) {
    this.word = word.toLowerCase().split("");
    this.original = [...this.word];
    this.word = this.word.filter((el) => el !== " ");
    this.guesses = guesses;
    this.guessedLetter = [];
    this.status = "playing";
  }

  getPuzzle() {
    let puzzle = "";
    this.original.forEach((letter) => {
      if (this.guessedLetter.includes(letter) || letter === " ") {
        puzzle += letter;
      } else {
        puzzle += "*";
      }
    });
    return puzzle;
  }

  guess(letter) {
    letter = letter.toLowerCase();

    if (this.status !== "playing") return;

    if (!this.guessedLetter.includes(letter)) {
      if (this.word.includes(letter)) {
        this.guessedLetter.push(letter);
      } else {
        this.guesses--;
      }
    }
  }

  calculateStatus() {
    let finished = this.word.every((el) => this.guessedLetter.includes(el));

    if (this.guesses === 0) {
      this.status = "failed";
    } else {
      this.status = !finished ? "playing" : "finished";
    }
  }

  getStatus() {
    if (this.status === "failed") {
      return `Nice Try! The Word Was ${this.original.join("")}`;
    } else if (this.status === "finished") {
      return `Great Work , You guessed The word`;
    } else {
      return `Guesses Left : ${this.guesses}`;
    }
  }
}
