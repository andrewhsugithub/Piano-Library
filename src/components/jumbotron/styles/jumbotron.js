import styled from "styled-components/macro";

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: ${({ direction }) => direction};
  max-width: 1100px;
  margin: auto;
  width: 100%;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const Pane = styled.div`
  width: 45%;
  margin: 0, 20px;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 45px;
    text-align: center;
  }
`;

export const Heading = styled.p`
    z-index: 1;
    position: relative;
    font: Arial
    font-size: 20px;
    font-weight: 600;
    text-transform: capitalize;
    line-height: 1.4;
`;

export const Title = styled.h3`
  font-size: 50px;
  line-height: 1.1;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    font-size: 35px;
  }
`;

export const SubTitle = styled.p`
  font-size: 26px;
  font-weight: normal;
  line-height: normal;
  color: #94989a;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid rgb(241 241 241);
  padding: 50px 5%;
  color: black;
  overflow: hidden;
`;

export const Container = styled.div`
  media (max-width: 1000px) {
    ${Item}:last-of-type h2 {
      margin-bottom: 50px;
    }
  }
`;

export const MainTitle = styled.h2`
  z-index: 1;
  text-align: center;
  font-size: 64px;
  font-weight: 600;
  text-transform: capitalize;
  line-height: 1;
  margin-bottom: 8px;
`;

export const MainSubTitle = styled.p`
  text-align: center;
  color: #94989a;
  --bs-text-opacity: 1;
`;
