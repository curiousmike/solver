export const buildInPuzzleLetterCounts = (word) => {
  const letterCounts = {};
  // for a yellow entry, you can have multiple entries
  // i.e., note how the third letter has two letters it can't be
  // [o] [c] [al] [] [a]
  //  G   G   Y    Y  Y
  // For a given YELLOW letter, we will always only have a count of 1 - this is the *minimum* letters the dictionary word could have - we don't know if it's 1 or more, so assume least case.
  // if we see two yellow o's at beginning as wrongspot, it could be manor OR kazoo
  let hasYellowHappened = {};
  word.forEach((entries) => {
    const letterString = entries.letter;
    const status = entries.status;
    for (var i = 0; i < letterString.length; i++) {
      const theLetter = letterString[i];
      if (theLetter !== "") {
        if (!letterCounts[theLetter]) {
          letterCounts[theLetter] = {};
          letterCounts[theLetter].count = 1;
        } else {
          if (status === "wrongspot" && !hasYellowHappened[theLetter]) {
            // We only count yellow as a single instance = "There must be at least 1 'e' - but could be more"
            letterCounts[theLetter].count = 1;
            hasYellowHappened[theLetter] = true;
          } else {
            if (status === "correct") {
              // There MUST be this letter here
              letterCounts[theLetter].count++;
            }
          }
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
