import styled from "styled-components/macro";

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 1000px;
  margin: auto;
  width: 100%;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const Pane = styled.div`
    width: 85%;
    margin: 0, 20px;
    display: flex;
    flex-direction: row;

    @media (max-width: 1000px) {
        flex-direction: row;
`;

export const Description = styled.div`
    display: flex;
    flex-direction: column;

    @media (max-width: 1000px) {
        flex-direction: column;
`;

export const Image = styled.img`
  width: 150px;

  border-radius: 200px;
  max-width: 100%;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 300px;
  // border-bottom: 3px solid rgb(241 241 241);

  @media (max-width: 1000px) {
    flex-direction: column;
    // border-bottom: 3px solid rgb(241 241 241);
  }

  &::after {
    content: "";
    width: 1000px;
    height: 6px;
    display: block;
    margin: 26px auto;
    background: #eee;
  }
`;

export const MainTitle = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 64px;
  margin-bottom: 10px;
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

export const Star = styled.p`
  margin-top: 3px;
  text-align: center;
`;

export const Text = styled.p`
  margin-top: 3px;
  text-align: left;
`;
