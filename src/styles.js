import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
`;

export const Title = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  font-size: 40px;
`;

export const FiveLetterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  min-height: 20%;
`;

export const ResultContainer = styled.textarea`
  font-size: 20px;
  width: 90%;
  margin: 2px 2px 2px 2px;
  height: 25%;
  background-color: lightgray;
  resize: none;
`;

export const CommonWordContainer = styled.div`
  margin-left: 20%;
  display: flex;
`;

export const SolveButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const SolveButton = styled.button`
  font-size: 18px;
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 4px 0.3em 0.3em 0;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #ffffff;
  background-color: #4eb5f1;
  text-align: center;
  transition: all 0.2s;
`;

export const OnlyCommonCheckbox = styled.input`
  -webkit-appearance: none;
         display: inline-block;
         width: 40px;
         height: 40px;
         background-color: gray;
         border-radius: 5px;
         border: 3px solid lightgray;
         margin-right: 10px;
      }
      input[type=checkbox]:checked {
         background-color: lightgreen;
      }`;
