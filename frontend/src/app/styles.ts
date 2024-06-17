import styled from "styled-components";

export const StyledPage = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 98%;
`;

export const StyledHeader = styled.div`
  padding: 20px;
  margin: 15px;
  background-color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
`;

export const StyledBody = styled.div`
  padding: 20px;
  margin: 0px 0px 0 90px;
  background-color: #ffffff;
  width: 90%;
  max-height: 90vh;
  border-radius: 15px;
  box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
`;
