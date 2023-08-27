import styled from "styled-components";

export const Container = styled.div`
  color: white;
  background-color: ${(props) =>
    props.keyColor === 2
      ? "rgb(83, 141, 78)"
      : (props) =>
          props.keyColor === 1
            ? "rgb(181, 159, 59)"
            : props.keyColor === 0 || props.keyColor === -1
            ? "rgb(58, 58, 60)"
            : "gray"};
  background-color: ${(props) => (props.goKey ? "#007AFF" : "")};
  outline: ${(props) => (props.keyColor === -1 ? "2px solid red" : "")};
  outline: ${(props) => (props.keyColor === 3 ? "2px solid #007AFF" : "")};
  min-width: 8%;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 4px;
`;

export const LetterContainer = styled.div`
  align-self: center;
  margin: 4px;
`;
