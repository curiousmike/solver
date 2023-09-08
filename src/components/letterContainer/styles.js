import styled from "styled-components";

export const SingleLetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0px;
  margin-right: 4px;
`;
export const LetterContainer = styled.input`
  font-size: 20px;
  height: 50%;
  background-color: lightgray;
`;

export const StatusButton = styled.button`
  color: white;
  background-color: ${(props) =>
    props.buttonColor === "correct" ? "rgb(83, 141, 78)" : "rgb(181, 159, 59)"};

  outline: ${(props) => (props.buttonColor === 1 ? "2px solid red" : "")};
  outline: ${(props) => (props.buttonColor === 2 ? "2px solid #007AFF" : "")};
  height: 50%;
  border-radius: 3px;
  margin-top: 8px;
`;
