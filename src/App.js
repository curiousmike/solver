import "./App.css";
import { fiveLetterWords } from "./fiveLetterWords.js";
import { Container } from "./styles";

// This "appHeight" is the "fix" for iOS safari representing vh differently based on whether their footer is visible.
const appHeight = () => {
  const doc = document.documentElement;
  const height = window.innerHeight; // - 5
  doc.style.setProperty("--app-height", `${height}px`);
};
window.addEventListener("resize", appHeight);
appHeight();

const unavailableLetters = ["s"];

const status = {
  Unknown: 0,
  Wrong: 1,
  WrongSpot: 2,
  Correct: 3,
};

const currentWord = [
  { letter: "", status: status.Unknown },
  { letter: "p", status: status.WrongSpot },
  { letter: "a", status: status.Correct },
  { letter: "c", status: status.Correct },
  { letter: "e", status: status.Correct },
];
const buildLetterCounts = () => {
  const letterCounts = {};
  currentWord.forEach((letter) => {
    const theLetter = letter.letter;
    if (theLetter !== "") {
      if (!letterCounts[theLetter]) {
        letterCounts[theLetter] = {};
        letterCounts[theLetter].count = 1;
      } else {
        letterCounts[theLetter].count++;
      }
    }
  });
  // console.log('letterConts = ', letterCounts)
  return letterCounts;
};

const buildLetterWholeCounts = (word) => {
  const letterCounts = {};
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if (!letterCounts[letter]) {
      letterCounts[letter] = {};
      letterCounts[letter].count = 1;
    } else {
      letterCounts[letter].count++;
    }
  }
  // console.log('letterConts = ', letterCounts)
  return letterCounts;
};

const solveWord = () => {
  let count = 0;
  // let ridiculous = 0;
  let validWordList = [];
  console.log("start ...");

  fiveLetterWords.forEach((word) => {
    // const word = fiveLetterWords[0]
    let isValidWord = true;
    var validationIssue = null;
    for (let wordLetterIndex = 0; wordLetterIndex < 5; wordLetterIndex++) {
      count++;
      const letter = word[wordLetterIndex];
      if (currentWord[wordLetterIndex].status === status.Correct) {
        if (letter !== currentWord[wordLetterIndex].letter) {
          validationIssue = `Can only be ${currentWord[wordLetterIndex].letter} in spot ${wordLetterIndex}`;
          isValidWord = false;
          break;
        }
      } else if (currentWord[wordLetterIndex].status === status.Unknown) {
        for (let u = 0; u < unavailableLetters.length; u++) {
          count++;
          if (unavailableLetters[u] === letter) {
            isValidWord = false;
            validationIssue = `Letter not in puzzle: ${unavailableLetters[u]}`;
            break;
          }
        }
      } else if (
        currentWord[wordLetterIndex].status === status.WrongSpot &&
        letter === currentWord[wordLetterIndex].letter
      ) {
        isValidWord = false;
        validationIssue = `Wrong spot: ${letter} is in puzzle but not index ${wordLetterIndex}`;
        break;
      }
    }
    // final validation - verify every letter in currentWord shows up in the dictionary word
    // ocher should not be valid for ocean
    if (isValidWord) {
      const currentWordLetterCounts = buildLetterCounts(currentWord);
      const dictionaryWordLetterCounts = buildLetterWholeCounts(word);
      for (const [key, value] of Object.entries(currentWordLetterCounts)) {
        // console.log('key/value = ', key, value)
        count++;
        if (
          !dictionaryWordLetterCounts[key] ||
          dictionaryWordLetterCounts[key].count < value.count
        ) {
          // console.log('wrong')
          isValidWord = false;
          // validationIssue = `The dictionary word doesn't have enough letters: ${key}`;
          break;
        }
      }
    }

    if (isValidWord) {
      console.log("Valid : ", word);
      validWordList.push(word);
    } else {
      // console.log(`Invalid:  ${word} validation issue ${validationIssue}`)
    }
    count++;
    // if (count % 1000) {
    //   console.log(`Count ${count}`);
    // }
  });
  console.log("total iterations to find this list = ", count);
  console.log("validWordList = ", validWordList);
};
solveWord();

function App() {
  return (
    <Container>
      Total 5 Letter Words {fiveLetterWords.length}
      <br></br>
      First Word {fiveLetterWords[0]}
    </Container>
  );
}

export default App;
