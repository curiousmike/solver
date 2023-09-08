import "./App.css";
import "./scrabble.css";
import { useState } from "react";

import { fiveLetterWords } from "./fiveLetterWords.js";
import { buildLetterContainers } from "./components/letterContainer/letterContainer.js";
import {
  buildInPuzzleLetterCounts,
  buildDictionaryWordLetterCounts,
} from "./utils/utils";
import {
  Container,
  FiveLetterContainer,
  SolveButton,
  ResultContainer,
  Title,
  SolveButtonContainer,
  CommonWordContainer,
  ScrabbleHeader,
  OnlyCommonCheckbox,
} from "./styles";
import Keyboard from "./components/keyboard";

const NUMBER_LETTERS = 5;
// This "appHeight" is the "fix" for iOS safari representing vh differently based on whether their footer is visible.
const appHeight = () => {
  const doc = document.documentElement;
  const height = window.innerHeight; // - 5
  doc.style.setProperty("--app-height", `${height}px`);
};
window.addEventListener("resize", appHeight);
appHeight();

const status = {
  Unknown: "unknown",
  WrongSpot: "wrongspot",
  Correct: "correct",
};
const startingCurrentWord = [
  { letter: "", status: status.WrongSpot },
  { letter: "", status: status.WrongSpot },
  { letter: "", status: status.WrongSpot },
  { letter: "", status: status.WrongSpot },
  { letter: "", status: status.WrongSpot },
];

function App() {
  const [keyboardData, setKeyboardData] = useState({});
  const [currentWord, setCurrentWord] = useState(startingCurrentWord);
  const [unavailableLetters, setUnavailableLetters] = useState([]);
  const [validWordList, setValidWordList] = useState([]);
  const [validCommonWordList, setCommonWordList] = useState([]);
  const [showOnlyCommonWords, setShowOnlyCommonWords] = useState(true);

  const solveWord = () => {
    const validWords = [];
    const commonWords = [];

    fiveLetterWords.forEach((dictionaryWord) => {
      let isValidWord = true;
      var validationIssue = null;
      for (
        let wordLetterIndex = 0;
        wordLetterIndex < NUMBER_LETTERS;
        wordLetterIndex++
      ) {
        const letter = dictionaryWord.word[wordLetterIndex];
        if (currentWord[wordLetterIndex].status === status.Correct) {
          if (letter !== currentWord[wordLetterIndex].letter) {
            validationIssue = `Can only be ${currentWord[wordLetterIndex].letter} in spot ${wordLetterIndex}`;
            isValidWord = false;
            break;
          }
        } else if (
          currentWord[wordLetterIndex].status === status.Unknown ||
          currentWord[wordLetterIndex].letter === ""
        ) {
          for (let u = 0; u < unavailableLetters.length; u++) {
            if (unavailableLetters[u] === letter) {
              isValidWord = false;
              validationIssue = `Letter not in puzzle: ${unavailableLetters[u]}`;
              break;
            }
          }
        } else if (currentWord[wordLetterIndex].status === status.WrongSpot) {
          // If you have "abc" as wrongSpot in the 0th option, ensure that our current letter is not a, b or c
          for (var i = 0; i < currentWord[wordLetterIndex].letter.length; i++) {
            const currentWordLetter = currentWord[wordLetterIndex].letter[i];
            if (letter === currentWordLetter) {
              isValidWord = false;
              validationIssue = `Wrong spot: ${letter} is in puzzle but not index ${wordLetterIndex}`;
              break;
            }
          }
          for (let u = 0; u < unavailableLetters.length; u++) {
            if (unavailableLetters[u] === letter) {
              isValidWord = false;
              validationIssue = `Letter not in puzzle: ${unavailableLetters[u]}`;
              break;
            }
          }
        }
      }
      // final validation - verify every letter in currentWord shows up in the dictionary word
      //
      // ocher should not be valid for ocean if we said there is an 'a' in the 3rd and 5th letter
      //
      // [o] [c] [al] [] [a]
      //  G   G   Y    Y  Y
      // should generate OCTAL

      // [Z] [] [s] [on] [o]
      //  G  Y   Y   Y    Y
      // should generate zones

      if (isValidWord) {
        const currentWordLetterCounts = buildInPuzzleLetterCounts(currentWord);
        const dictionaryWordLetterCounts = buildDictionaryWordLetterCounts(
          dictionaryWord.word
        );
        for (const [key, value] of Object.entries(currentWordLetterCounts)) {
          // "T":  2
          if (!dictionaryWordLetterCounts[key]) {
            // Did 'potato' have a value of 2 for "T"?
            isValidWord = false;
            break;
          }
        }
      }

      if (isValidWord) {
        validWords.push(dictionaryWord.word);
        if (dictionaryWord.common === 1) {
          commonWords.push(dictionaryWord.word);
        }
      }
    });
    setValidWordList(validWords);
    setCommonWordList(commonWords);
  };

  // This method is for tapping on keyboard to say 'the letter "Z" is _not_ in the puzzle
  const handleRemoveLetterFromPuzzle = (key) => {
    if (key === "GO") {
      solveWord();
    } else {
      const updatedKeyboardData = { ...keyboardData };
      if (updatedKeyboardData[key.toLowerCase()]) {
        updatedKeyboardData[key.toLowerCase()] = 0;
      } else {
        updatedKeyboardData[key.toLowerCase()] = 1;
      }
      setKeyboardData(updatedKeyboardData);
      let unavailable = [];
      for (const [key, value] of Object.entries(updatedKeyboardData)) {
        if (value === 1) {
          unavailable.push(key.toLowerCase());
          // now, verify unavailable letters aren't in your puzzle def
          // if you just pressed "N", make sure it's not in the your word
          for (let n = 0; n < 5; n++) {
            for (let m = 0; m < currentWord[n].letter.length; m++) {
              const letter = currentWord[n].letter[m];
              if (letter === key.toLowerCase()) {
                // currentWord[n].letter can be an array of up to 3 letters
                // this will break that
                // i.e. if the user clicked "N" on the keyboard to remove it
                // and you have "ANQ" as letters here, i don't want to remove the "A" and "Q" but this does for now
                const updatedCurrentWord = [...currentWord];
                updatedCurrentWord[n].letter = "";
                updatedCurrentWord[n].status = status.Unknown;
                setCurrentWord(updatedCurrentWord);
              }
            }
          }
        }
      }

      setUnavailableLetters(unavailable);
    }
  };

  const updateLetterValue = (e) => {
    const index = e.target.getAttribute("data-id");
    const regex = new RegExp("[A-Za-z]");
    const string = e.target.value;
    const updatedCurrentWord = [...currentWord];
    if (string === "") {
      updatedCurrentWord[index].letter = "";
      updatedCurrentWord[index].status = status.Unknown;
    } else {
      let updatedLetters = "";
      for (let i = 0; i < string.length; i++) {
        let letter = string[i];
        if (regex.test(letter)) {
          updatedLetters += letter ? letter.toLowerCase() : "";
          updatedCurrentWord[index].status =
            letter !== "" ? status.WrongSpot : status.Unknown;

          //test to see if you just added a letter in your updatedWord that you marked as unavailable on keyboard
          unavailableLetters.forEach((unavailableLetter, index) => {
            if (unavailableLetter === letter.toLowerCase()) {
              // you have 'N' as unavailable on the keyboard - but you just typed it.  so, make it safe again
              const updatedUnavailable = [...unavailableLetters];
              updatedUnavailable.splice(index, 1);
              setUnavailableLetters(updatedUnavailable);

              const updatedKeyboardData = { ...keyboardData };
              if (updatedKeyboardData[letter.toLowerCase()]) {
                updatedKeyboardData[letter.toLowerCase()] = 0;
              }
              setKeyboardData(updatedKeyboardData);
            }
          });
        }
      }
      updatedCurrentWord[index].letter = updatedLetters;
    }
    setCurrentWord(updatedCurrentWord);
  };

  // This says whether this letter is "in the right spot" or "in the puzzle but not at this spot"
  const updateLetterStatus = (e) => {
    const index = e.target.getAttribute("data-id");
    const updatedCurrentWord = [...currentWord];

    if (updatedCurrentWord[index].status === status.WrongSpot) {
      updatedCurrentWord[index].status = status.Correct;
    } else if (
      updatedCurrentWord[index].status === status.Correct ||
      updatedCurrentWord[index].status === status.Unknown
    ) {
      updatedCurrentWord[index].status = status.WrongSpot;
    }
    setCurrentWord(updatedCurrentWord);
  };

  const letterContainers = buildLetterContainers(
    currentWord,
    updateLetterValue,
    updateLetterStatus
  );
  const scrabbleStyle = { "--n": 5 };
  return (
    <Container>
      <div className="scrabblecontainer">
        <span className="scrabble" style={scrabbleStyle}>
          <span>WORDLE</span>
          <span> </span>
          <span>HELPER</span>
        </span>
      </div>
      <FiveLetterContainer>{letterContainers}</FiveLetterContainer>
      <SolveButtonContainer>
        <SolveButton onClick={solveWord}>Solve</SolveButton>
        <CommonWordContainer>
          Only Common Words
          <OnlyCommonCheckbox
            type="checkbox"
            checked={showOnlyCommonWords}
            onChange={() => setShowOnlyCommonWords(!showOnlyCommonWords)}
          />
        </CommonWordContainer>
      </SolveButtonContainer>
      <ResultContainer
        value={showOnlyCommonWords ? validCommonWordList : validWordList}
        readOnly
        placeholder="Press solve button to see results"
      />
      <Keyboard
        keyboardData={keyboardData}
        handleKeyPress={(e) => handleRemoveLetterFromPuzzle(e)}
        visible={true}
      />
    </Container>
  );
}

export default App;
