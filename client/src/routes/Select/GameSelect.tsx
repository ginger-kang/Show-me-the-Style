import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';
import priceTag from '../../Images/priceTag.png';
import blackFloatDoodle from '../../Images/doodle/BlackFloatDoodle.svg';
import FloatDoodle from '../../Images/doodle/FloatDoodle.svg';
import { AiOutlineHome } from 'react-icons/ai';

const GameSelectContainer = styled.main`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.bgColor};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const GameSelectNavContainer = styled.nav`
  width: 100%;
  height: 50px;
  background: ${(props) => props.theme.bgColor};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.01);

  & a {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      border-bottom: 1px solid ${(props) => props.theme.linkHoverBorderColor};
    }
  }

  & svg {
    color: ${(props) => props.theme.textColor};
  }
`;

const SelectGame = styled.section`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const StyleGameContainer = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const PriceGameContainer = styled.section`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const PriceContentContainer = styled.article`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 1.25;
  text-align: center;
  color: ${(props) => props.theme.textColor};

  & p {
    font-size: 1vw;
  }
`;

const PriceStartButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  font-size: 1.1vw;
  width: 9vw;
  height: 3.5vw;
  min-width: 80px;
  min-height: 35px;
  border-radius: 6px;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;

  &:hover {
    background: ${(props) => props.theme.pointColor};
    color: white;
  }
`;

const PriceTagImageContainer = styled.figure`
  width: 330px;
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;

  @media screen and (min-width: 1100px) {
    width: 600px;
    height: 435px;
  }
`;

const PriceTitle = styled.h1`
  font-size: 2.5vw;
  color: ${(props) => props.theme.textColor};
`;

const StyleDoodleContainer = styled.figure`
  width: 330px;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;

  @media screen and (min-width: 1100px) {
    width: 600px;
    height: 435px;
  }
`;

const StyleContentContainer = styled.article`
  width: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 1.25;
  text-align: center;
  color: ${(props) => props.theme.textColor};

  & p {
    font-size: 1.2vw;
  }
`;

const StyleStartButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  font-size: 1.1vw;
  width: 9vw;
  height: 3.5vw;
  min-width: 80px;
  min-height: 35px;
  border-radius: 6px;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;

  &:hover {
    background: ${(props) => props.theme.pointColor};
    color: white;
  }
`;

const StyleTitle = styled.h1`
  font-size: 2.5vw;
  color: ${(props) => props.theme.textColor};
`;

export default function GameSelect() {
  const themeContext = useContext(ThemeContext);

  return (
    <GameSelectContainer>
      <GameSelectNavContainer>
        <Link to="/">
          <AiOutlineHome size={30} />
        </Link>
      </GameSelectNavContainer>
      <SelectGame>
        <StyleGameContainer>
          <StyleDoodleContainer>
            {themeContext.bgColor === '#ffffff' ? (
              <img
                src={blackFloatDoodle}
                alt="blackfloatdoodle"
                style={{ width: '100%', height: '100%', minWidth: '200px' }}
              />
            ) : (
              <img
                src={FloatDoodle}
                alt="floatdoodle"
                style={{ width: '100%', height: '100%', minWidth: '200px' }}
              />
            )}
          </StyleDoodleContainer>
          <StyleContentContainer>
            <StyleTitle>제목</StyleTitle>
            <p>스타일을 찾아라</p>
            <Link to="/style">
              <StyleStartButton>시작</StyleStartButton>
            </Link>
          </StyleContentContainer>
        </StyleGameContainer>
        <PriceGameContainer>
          <PriceTagImageContainer>
            <img
              src={priceTag}
              alt="priceTag"
              style={{ width: '60%', minWidth: '100px' }}
            />
          </PriceTagImageContainer>
          <PriceContentContainer>
            <PriceTitle>뭐가 더 비쌀까</PriceTitle>
            <p>더 비싼 옷을 맞춰보세요. 옷 정보와 가격도 알아보세요!</p>
            <Link to="/game">
              <PriceStartButton>시작</PriceStartButton>
            </Link>
          </PriceContentContainer>
        </PriceGameContainer>
      </SelectGame>
    </GameSelectContainer>
  );
}
