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
  margin-top: 64px;
  margin-bottom: 64px;
`;
export const LetterContainer = styled.input`
  width: 48px;
  height: 48px;
  font-size: 48px;
`;
export const SingleLetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
`;
export const ResultContainer = styled.textarea`
  width: 512px;
  height: 256px;
  font-size: 24px;
  margin-top: 16px;
  margin-bottom: 64px;
`;

export const Title = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 48px;
`;

export const Button = styled.button`
  color: white;
  background-color: ${(props) =>
    props.buttonColor === "correct" ? "rgb(83, 141, 78)" : "rgb(181, 159, 59)"};

  outline: ${(props) => (props.buttonColor === 1 ? "2px solid red" : "")};
  outline: ${(props) => (props.buttonColor === 2 ? "2px solid #007AFF" : "")};
  min-width: 75%;
  min-height: 75%;
  border-radius: 3px;
  margin-top: 8px;
`;

export const SolveButton = styled.button`
  color: white;
  background-color: white;
  color: black;
  outline: "2px solid #007AFF";
  min-width: 18%;
  min-height: 10%;
  font-size: 24px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 4px;
`;
