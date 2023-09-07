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
  width: 80%;
  margin: 8px 8px 8px 8px;
  height: 25%;
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
  color: white;
  background-color: white;
  color: black;
  outline: "2px solid #007AFF";
  font-size: 16px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 12px;
`;
