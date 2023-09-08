import { LetterContainer, StatusButton, SingleLetterContainer } from "./styles";
const NUMBER_LETTERS = 5;

export const buildLetterContainers = (
  currentWord,
  updateLetterValue,
  updateLetterStatus
) => {
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
          onChange={updateLetterValue}
        />
        <StatusButton
          data-id={i}
          buttonColor={currentWord[i].status}
          onClick={updateLetterStatus}
        />
      </SingleLetterContainer>
    );
  }
  return containers;
};
