import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-bottom: 8px solid rgb(241 241 241);
  text-align: left;
  padding: 165px 45px;
`;

export const Title = styled.h1`
  color: black;
  max-width: 640px;
  font-weight: bold;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  margin-top: 0;
  margin-right: 15%;

  @media (max-width: 600px) {
    font-size: 35px;
  }
`;

export const SubTitle = styled.h2`
  color: black;
  font-size: 26px;
  font-weight: light;
  margin: 16px auto;
  margin-right: 20%;
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;
