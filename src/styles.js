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
  margin-top: 24px;
  margin-bottom: 24px;
`;
export const LetterContainer = styled.input`
  width: 20px;
  height: 20px;
  font-size: 20px;
`;
export const SingleLetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;
export const ResultContainer = styled.textarea`
  width: 100%;
  height: 256px;
  font-size: 20px;
  margin-top: 16px;
  margin-bottom: 16px;
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
  min-width: 14%;
  min-height: 8%;
  font-size: 16px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 12px;
`;
