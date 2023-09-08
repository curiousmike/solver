export const buildInPuzzleLetterCounts = (word) => {
  const letterCounts = {};
  word.forEach((letter) => {
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

export const buildDictionaryWordLetterCounts = (word) => {
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
