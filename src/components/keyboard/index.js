import { Container, KeyboardRow } from "./styles";
import SingleKey from "../singlekey";
const KeyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["GO", "Z", "X", "C", "V", "B", "N", "M", "<="],
];

function Keyboard({ handleKeyPress, keyboardData, visible }) {
  // console.log('keyboardData = ', keyboardData);
  return (
    <Container>
      {visible &&
        KeyboardRows.map((row, k) => (
          <KeyboardRow key={k}>
            {row.map((keyValue, i) => (
              <SingleKey
                data={keyboardData}
                keyString={keyValue}
                key={i}
                handleKeyPress={handleKeyPress}
              />
            ))}
          </KeyboardRow>
        ))}
    </Container>
  );
}

export default Keyboard;
