import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /*justify-content: space-between;*/
  align-items: center;
  height: 100%;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
`;

export const FiveLetterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 128px;
  margin-bottom: 128px;
`;
export const LetterContainer = styled.input`
  width: 48px;
  height: 48px;
  font-size: 48px;
`;
export const LetterLabelContainer = styled.label`
  margin-right: 8px;
  margin-left: 8px;
`;

export const Button = styled.button`
  color: white;
  background-color: ${(props) =>
    props.buttonColor === "correct" ? "rgb(83, 141, 78)" : "rgb(181, 159, 59)"};

  outline: ${(props) => (props.buttonColor === 1 ? "2px solid red" : "")};
  outline: ${(props) => (props.buttonColor === 2 ? "2px solid #007AFF" : "")};
  min-width: 8%;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 4px;
`;

export const SolveButton = styled.button`
  color: white;
  background-color: white;
  color: black;
  outline: "2px solid #007AFF";
  min-width: 8%;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 4px;
`;
