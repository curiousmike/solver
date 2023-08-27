import { Container, LetterContainer } from "./styles";

function SingleKey({ keyString, handleKeyPress, data }) {
  // 0 = not used
  // 1 = in game but wrong spot
  // 2 = in game RIGHT spot !
  // 3 = unused
  const keyColor = 0; // data["key-" + keyString.toLowerCase()];
  return (
    <Container
      goKey={keyString === "GO"}
      keyColor={keyColor}
      onClick={() => handleKeyPress(keyString)}
    >
      <LetterContainer>{keyString}</LetterContainer>
    </Container>
  );
}

export default SingleKey;
