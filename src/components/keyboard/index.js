import { Container, KeyboardRow } from "./styles";
import SingleKey from "../singlekey";
const KeyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["GO", "Z", "X", "C", "V", "B", "N", "M", "<="],
];

function Keyboard({ handleKeyPress, keyboardData, visible }) {
  return (
    <Container>
      {KeyboardRows.map((row, k) => (
        <KeyboardRow key={k}>
          {row.map((keyValue) => (
            <SingleKey
              data={keyboardData[keyValue]}
              keyString={keyValue}
              handleKeyPress={handleKeyPress}
            />
          ))}
        </KeyboardRow>
      ))}
    </Container>
  );
}

export default Keyboard;
