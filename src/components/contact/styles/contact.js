import styled from "styled-components/macro";

export const Inner = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    max-width: 1000px;
    margin: auto;
    width: 100%;

    @media (max-width: 1000px) {
        flex-direction: column;
    }
`;

export const Pane = styled.div `
    width: 85%;
    margin: 0, 20px;
    display: flex;
    flex-direction: column;

    @media (max-width: 1000px) {
        flex-direction: column;
`;

export const Link = styled.a `
    text-decoration: none;
    color: black;
`;

export const Email = styled.a `
    text-decoration: none;
    color: black;
`;

export const Image = styled.img `
    max-width: 100%;
`;

export const Icon = styled.img `
    width: 30px;
    padding: 0;
    margin: 0 7px;
`;

export const IconLink = styled.a `
    padding: 0;
    margin: 0;
`;

export const Item = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

export const Container = styled.div `
    display:flex;
    justify-content: center;
    align-items: center;
    border-bottom: 3px solid rgb(241 241 241);

    @media (max-width: 1000px) {
        flex-direction: column;
        border-bottom: 3px solid rgb(241 241 241);
    }
`;

export const MainTitle = styled.h2 `
    text-align:center;
    font-weight:bold;
    font-size: 64px;
    margin-bottom: 10px;

`;
export const SubTitle = styled.p `
    text-align:center;
    color: gray;

    &::after{
        content: '';
        width: 82px;
        height: 6px;
        display: block;
        margin: 26px auto;
        background: #eee;
    }
`;

export const Name = styled.p `
    margin-top: 3px;
    text-align: center;
`;

export const IdPackage = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 8px;
    
`;


