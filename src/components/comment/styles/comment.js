import styled from "styled-components/macro";

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // max-width: 1000px;
  margin: auto;
  width: 95%;
  height: 250px;
  // border: 1px solid black;
  border-radius: 50px;
  background-color: turquoise;

  // @media (max-width: 900px) {
  //   flex-direction: column;
  // }
`;

export const Pane = styled.div`
  width: 85%;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  // width: 50px;

  max-width: 25%;
  border-radius: 9999px;
  margin: 0 15px;
`;

export const Item = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: center;
  margin-bottom: 20px;
  // padding-right: 20px;
`;

export const Container = styled.div`
  margin: auto 300px;
  @media (min-width: 475px) {
    margin: auto 40px;
  }

  &::after {
    content: "";
    // width: 3000px;
    height: 6px;
    display: block;
    padding: 0 3000px;
    margin: 135px -3000px;
    background: #eee;
  }
`;

export const MainTitle = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 64px;
  margin-bottom: 10px;
  @media (max-width: 900px) {
    text-align: center;
    font-size: 50px;
`;

export const SubTitle = styled.p`
  text-align: center;
  color: gray;

  &::after {
    content: "";
    width: 82px;
    height: 6px;
    display: block;
    margin: 26px auto;
    background: #eee;
  }
`;

export const Text = styled.p`
  white-space: nowrap;
  margin-top: 3px;
  text-align: left;
  @media (min-width: 200px) {
    font-size: 14px;
`;

export const Review = styled.p`
  white-space: pre-wrap;
  margin: 10px 50px;
  text-align: left;
`;
