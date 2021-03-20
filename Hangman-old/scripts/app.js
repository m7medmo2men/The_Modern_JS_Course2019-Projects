const puzzle = document.getElementById("puzzle");
const guessesEl = document.getElementById("guesses");
const resetBtn = document.getElementById("reset");

let game;
const startGame = async () => {
  const word = await getPuzzleAsync(2);
  console.log(word);
  game = new Hangman(word, 3);
  renderHTML();
};

const renderHTML = () => {
  // puzzle.textContent = game.getPuzzle();
  puzzle.innerHTML = ''
  const word = game.getPuzzle().split('');
  word.forEach((el) => {
    const element = document.createElement('span');
    element.textContent = el;
    puzzle.appendChild(element);
  })
  guessesEl.textContent = game.getStatus();
};

window.addEventListener("keypress", (e) => {
  const key = e.key;
  game.guess(key);
  game.calculateStatus();
  renderHTML();
});

resetBtn.addEventListener("click", startGame);

startGame().then((data) => {
  renderHTML();
});

// Many ways for async coding
// getPuzzle1((error, puzzle) => {
//   if (error) {
//     console.log(`Error: ${error}`);
//   } else {
//     console.log(puzzle);
//   }
// });

// getPuzzle2(3).then((data) => {
//   console.log(data);
// });

// getPuzzleFetch()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// getPuzzleAsync(2).then((data) => {
//   console.log(data);
// });
