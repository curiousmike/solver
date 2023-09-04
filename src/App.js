import "./App.css";
import { useState } from "react";

import { fiveLetterWords } from "./fiveLetterWords.js";
import {
  Container,
  LetterContainer,
  FiveLetterContainer,
  StatusButton,
  SolveButton,
  ResultContainer,
  Title,
  SingleLetterContainer,
  SolveButtonContainer,
  CommonWordContainer,
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
  const buildLetterCounts = () => {
    const letterCounts = {};
    currentWord.forEach((letter) => {
      const letterString = letter.letter;
      for (var i = 0; i < letterString.length; i++) {
        const theLetter = letterString[i];
        if (theLetter !== "") {
          if (!letterCounts[theLetter]) {
            letterCounts[theLetter] = {};
            letterCounts[theLetter].count = 1;
          } else {
            letterCounts[theLetter].count++;
          }
        }
      }
    });
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
    return letterCounts;
  };

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
        const currentWordLetterCounts = buildLetterCounts(currentWord);
        const dictionaryWordLetterCounts = buildLetterWholeCounts(
          dictionaryWord.word
        );
        for (const [key, value] of Object.entries(currentWordLetterCounts)) {
          if (!dictionaryWordLetterCounts[key]) {
            isValidWord = false;
            break;
          }
        }
      }

      if (isValidWord) {
        console.log("Valid : ", dictionaryWord.word);
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
  const handleRemoveKey = (key) => {
    if (key === "GO") {
      solveWord();
    } else {
      const updatedKeyboardData = { ...keyboardData };
      if (updatedKeyboardData[key]) {
        updatedKeyboardData[key] = 0;
      } else {
        updatedKeyboardData[key] = 1;
      }
      setKeyboardData(updatedKeyboardData);
      let unavailable = [];
      for (const [key, value] of Object.entries(updatedKeyboardData)) {
        if (value === 1) {
          unavailable.push(key.toLowerCase());
        }
      }
      setUnavailableLetters(unavailable);
    }
  };

  const updateKeyEntry = (e) => {
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
        }
      }
      updatedCurrentWord[index].letter = updatedLetters;
    }
    setCurrentWord(updatedCurrentWord);
  };

  // This says whether this letter is "in the right spot" or "in the puzzle but not at this spot"
  const updateKeyStatus = (e) => {
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

  const buildLetterContainers = () => {
    const containers = [];
    for (let i = 0; i < NUMBER_LETTERS; i++) {
      containers.push(
        <SingleLetterContainer>
          <LetterContainer
            type="text"
            id={`letter${i}`}
            name={`letter${i}`}
            data-id={i}
            maxLength="3"
            value={currentWord[i].letter}
            onChange={updateKeyEntry}
          />
          <StatusButton
            data-id={i}
            buttonColor={currentWord[i].status}
            onClick={updateKeyStatus}
          />
        </SingleLetterContainer>
      );
    }
    return containers;
  };

  const letterContainers = buildLetterContainers();
  return (
    <Container>
      <Title>Wordle Helper</Title>
      <FiveLetterContainer>{letterContainers}</FiveLetterContainer>
      <SolveButtonContainer>
        <SolveButton onClick={solveWord}>Solve</SolveButton>
        <CommonWordContainer>
          Only Common Words
          <input
            type="checkbox"
            checked={showOnlyCommonWords}
            onChange={() => setShowOnlyCommonWords(!showOnlyCommonWords)}
          />
        </CommonWordContainer>
      </SolveButtonContainer>
      <ResultContainer
        value={showOnlyCommonWords ? validCommonWordList : validWordList}
        readOnly
      />
      <Keyboard
        keyboardData={keyboardData}
        handleKeyPress={(e) => handleRemoveKey(e)}
        visible={true}
      />
    </Container>
  );
}

export default App;
