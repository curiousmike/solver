import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 33%;
  width: 100%;
  background-color: black;
  border-top: 2px solid #7777;
  --webkit-user-select: none;
  user-select: none;
`;

export const KeyboardRow = styled.div`
  display: flex;
  justify-content: space-around;
  width: 95%;
  align-self: center;
  background-color: black;
  height: 33%;
  margin-bottom: 8px;
`;
