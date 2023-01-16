import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  // border-bottom: 8px solid rgb(241 241 241);
  text-align: left;
  // padding: 165px 45px;
  margin-right: 50px;
  margin-left: auto;
  // float: left;
  margin-top: 200px;
  margin-bottom: 200px;
  width: 640px;
  height: auto;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);

  @media (max-width: 1000px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Title = styled.h1`
  color: black;
  // max-width: 640px;
  font-weight: bold;
  font-size: 50px;
  font-weight: 700;
  text-align: center;

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
  text-align: center;
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;
