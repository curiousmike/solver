import { Container, LetterContainer } from "./styles";

function SingleKey({ keyString, handleKeyPress, data }) {
  // 0 = not used
  // 1 = in game but wrong spot
  // 2 = in game RIGHT spot !
  // 3 = unused
  const keyColor = data === 1 ? 0 : 3;
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
