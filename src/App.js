import "./App.css";
import { useState, useEffect, useRef } from "react";

import { fiveLetterWords } from "./fiveLetterWords.js";
import {
  Container,
  LetterContainer,
  FiveLetterContainer,
  LetterLabelContainer,
} from "./styles";
import Keyboard from "./components/keyboard";

// This "appHeight" is the "fix" for iOS safari representing vh differently based on whether their footer is visible.
const appHeight = () => {
  const doc = document.documentElement;
  const height = window.innerHeight; // - 5
  doc.style.setProperty("--app-height", `${height}px`);
};
window.addEventListener("resize", appHeight);
appHeight();

let unavailableLetters = ["s"];

const status = {
  Unknown: 0,
  WrongSpot: 1,
  Correct: 2,
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
  const [keyboardData, setKeyboardData] = useState({});

  const handleKey = (key) => {
    if (key === "GO") {
      // solveWord()
    } else {
      const updatedKeyboardData = { ...keyboardData };
      if (updatedKeyboardData[key]) {
        updatedKeyboardData[key] = 0;
      } else {
        updatedKeyboardData[key] = 1;
      }
      console.log("updatedKeybarod ", updatedKeyboardData);
      setKeyboardData(updatedKeyboardData);
      unavailableLetters = [];
      for (const [key, value] of Object.entries(updatedKeyboardData)) {
        if (value === 1) {
          unavailableLetters.push(key);
        }
      }
      console.log("unavail = ", unavailableLetters);
      console.log("key = ", key);
    }
  };

  const updateKeyEntry = (e) => {
    const index = e.target.getAttribute("data-id");
    const letter = e.target.value;
    currentWord[index].letter = letter;
    currentWord[index].status = status.Unknown;
  };

  console.log("keyboardData = ", keyboardData);
  return (
    <Container>
      Total 5 Letter Words {fiveLetterWords.length}
      <br></br>
      First Word {fiveLetterWords[0]}
      <FiveLetterContainer>
        <LetterLabelContainer for="letter0">First</LetterLabelContainer>
        <LetterContainer
          data-id="0"
          type="text"
          id="letter0"
          name="letter0"
          onChange={updateKeyEntry}
        />
        <LetterLabelContainer for="letter1">Second</LetterLabelContainer>
        <LetterContainer
          type="text"
          id="letter1"
          name="letter1"
          data-id="1"
          onChange={updateKeyEntry}
        />
        <LetterLabelContainer for="letter2">Third </LetterLabelContainer>
        <LetterContainer
          type="text"
          id="letter2"
          name="letter2"
          data-id="2"
          onChange={updateKeyEntry}
        />
        <LetterLabelContainer for="letter3">Fourth</LetterLabelContainer>
        <LetterContainer
          type="text"
          id="letter3"
          name="letter3"
          data-id="3"
          onChange={updateKeyEntry}
        />
        <LetterLabelContainer for="letter4">Fifth Letter </LetterLabelContainer>
        <LetterContainer
          type="text"
          id="letter4"
          name="letter4"
          data-id="4"
          onChange={updateKeyEntry}
        />
      </FiveLetterContainer>
      <Keyboard
        keyboardData={keyboardData}
        handleKeyPress={(e) => handleKey(e)}
        visible={true}
      />
    </Container>
  );
}

export default App;
