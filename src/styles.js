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
  margin-top: 32px;
`;
export const LetterContainer = styled.input`
  width: 32px;
`;
export const LetterLabelContainer = styled.label`
  margin-right: 8px;
  margin-left: 8px;
`;
