import './App.css';
import { fiveLetterWords } from "./fiveLetterWords.js";
import { Container } from './styles';

// This "appHeight" is the "fix" for iOS safari representing vh differently based on whether their footer is visible.
const appHeight = () => {
  const doc = document.documentElement
  const height =  window.innerHeight // - 5
  doc.style.setProperty('--app-height', `${height}px`)
}
window.addEventListener('resize', appHeight)
appHeight();
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
                  'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
                  'y', 'z']
// const availableLetters = {
//   'a' : true, 'b': true, 'c': true, 'd': true, 'e': true,
//   'f': true, 'g': true, 'h': true, 'i': true, 'j': true, 'k': true,
//   'l': true, 'm': true, 'n': true, 'o': true, 'p': true, 'q': true,
//   'r': true, 's': true, 't':true, 'u': true, 'v': true, 'w': true,
//   'x': true, 'y': true, 'z': true
// }
const unavailableLetters = ['l']

const status = {
  Unknown: 0,
  Wrong: 1,
  WrongSpot: 2,
  Correct: 3
}

const currentWord = [ 
  {letter: 'a', status: status.Unknown}, 
  {letter: 'b', status: status.Unknown},
  {letter: 'a', status: status.Unknown},
  {letter: 'c', status: status.Unknown},
  {letter: 'i', status: status.Unknown}
]
const isWord = (wordToCheck) => {
  //return fiveLetterWords.includes(isWord)
  for (let i = 0; i < fiveLetterWords.length; i++) {
    const word = fiveLetterWords[i]
    console.log('dictionary word = ', word)
    if (word === wordToCheck) {
       console.log('match = ', wordToCheck)
    return true }
  }
  return false
}
const solveWord = () => {
  let count = 0;
  let ridiculous = 0
  console.log('start ...')
  fiveLetterWords.forEach ( (word) => {
    // const word = fiveLetterWords[0]
    let isValidWord = true
    let validationIssue = null
    for (let wordLetterIndex = 0; wordLetterIndex < 5; wordLetterIndex++) {
      const letter = word[wordLetterIndex]
      if (currentWord[wordLetterIndex].status === status.Correct) {
        // then current index = OK
        if (letter !== currentWord[wordLetterIndex].letter) {
          validationIssue = `Can only be ${currentWord[wordLetterIndex].letter} `
          isValidWord = false
          break
        }
      } else
      if (currentWord[wordLetterIndex].status === status.Unknown) {
        // then current index = OK
        for (let u = 0; 0 < unavailableLetters.length; u++) {
          if (unavailableLetters[u] === letter) {
            isValidWord = false
            validationIssue = `Letter ${unavailableLetters[u]} cannot be used`
            break
          }
        }
      } 
      else if (currentWord[wordLetterIndex].status === status.WrongSpot)
      {
        // we know this is a valid letter, but not in this spot.
        isValidWord = false
        validationIssue = `Letter ${letter} is in puzzle but not index ${wordLetterIndex}`
        break
      }
      if (isValidWord) {
        console.log('valid word = ', word)
      } else {
        console.log('validation issue  =',validationIssue)
      }
      console.log('letter = ', letter)
    }
    count++
    if(count > 10) {
      console.log('count > 10')
      return
    }
   })
}
solveWord()

function App() {
  return (
    <Container>
      Total 5 Letter Words {fiveLetterWords.length}<br></br>
      First Word {fiveLetterWords[0]}
    </Container>
  );
}

export default App;
