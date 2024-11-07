let grid = new Array(6).fill("");
for (let i = 0; i < grid.length; i++) {
  grid[i] = new Array(6).fill("");
}

function canPlace(word, row, col, direction, letterPos) {
  let wordLength = word.length;
  if (row - letterPos < 0 || col - letterPos < 0) {
    return false;
  }
  if (direction === "down" && row + wordLength > grid.length) {
    return false;
  } else if (direction === "across" && col + wordLength > grid[0].length) {
    return false;
  } else if (direction === "down") {
    for (let i = 0; i < wordLength; i++) {
      if (
        grid[row + i - letterPos][col] !== "" ||
        grid[row + i - letterPos][col] === word[i]
      ) {
        return false;
      }
    }
  } else if (direction === "across") {
    for (let i = 0; i < wordLength; i++) {
      if (
        grid[row][col + i - letterPos] !== "" &&
        grid[row][col + i - letterPos] !== word[i]
      ) {
        return false;
      }
    }
  }
  return true;
}
function placeWord(word, row, col, direction, letterPos) {
  let wordLength = word.length;

  if (direction === "across") {
    for (let i = 0; i < wordLength; i++) {
      grid[row][col + i - letterPos] = word[i];
    }
  } else if (direction === "down") {
    for (let i = 0; i < wordLength; i++) {
      grid[row + i - letterPos][col] = word[i];
    }
  }
}

function crossword(words, maxWords) {
  //shuffle(words);

  let word = words.pop();
  if (canPlace(word, 0, 2, "down", 0)) placeWord(word, 0, 2, "down", 0);

  let count = 1;
  while (count < maxWords && words.length > 0) {
    let word = words.pop();
    placedWord = false;
    for (letter of word) {
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          if (grid[y][x] === letter) {
            //TODO: randomize direction
            letterPos = word.indexOf(letter);
            if (canPlace(word, y, x, "down", letterPos)) {
              placeWord(word, y, x, "down", letterPos);
              count++;
              placedWord = true;
              break;
            } else if (canPlace(word, y, x, "across", letterPos)) {
              placeWord(word, y, x, "across", letterPos);
              count++;
              placedWord = true;
              break;
            }
          }
        }
        if (placedWord) break;
      }
      if (placedWord) break;
    }
  }
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

let arr = ["dad", "dog", "cat", "bat", "batteg"];
crossword(arr, 4);

console.log(grid);
