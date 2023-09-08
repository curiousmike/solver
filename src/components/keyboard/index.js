import { Container, KeyboardRow } from "./styles";
import SingleKey from "../singlekey";
const KeyboardRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

function Keyboard({ handleKeyPress, keyboardData, visible }) {
  return (
    <Container>
      {KeyboardRows.map((row, k) => (
        <KeyboardRow key={k}>
          {row.map((keyValue) => (
            <SingleKey
              data={keyboardData[keyValue]}
              keyString={keyValue.toUpperCase()}
              handleKeyPress={handleKeyPress}
            />
          ))}
        </KeyboardRow>
      ))}
    </Container>
  );
}

export default Keyboard;
