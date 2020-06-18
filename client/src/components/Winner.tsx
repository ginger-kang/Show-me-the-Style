import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImageUpload from './ImageUpload';
import DancingDoodle from '../Images/doodle/DancingDoodle.svg';
import BottomLine from '../Images/BottomLine.svg';

const WinnerContainer = styled.section`
  width: 100%;
  height: 95vh;
  background: ${(props) => props.theme.thirdBgColor};
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: row;
  overflow: hidden;
  justify-content: center;
  position: relative;
`;

interface scrollPosition {
  scrollPos: number;
}

const ImageUploadContainer = styled('div')<scrollPosition>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 15px;

  @media screen and (max-width: 710px) {
    flex-direction: column;
  }

  & img {
    will-change: transform;
    transform: translateX(${({ scrollPos }) => scrollPos}%);
    transform-style: preserve-3d;
    transition: all 1.7s ease;
  }
`;

const UserInputContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
`;

const BottomLineContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transition: 0.1s ease;

  transform: translateX(-50%);

  & svg {
    & line {
      stroke: ${(props) => props.theme.borderColor};
    }
  }
`;

function Winner() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const getCurrentScroll = () => {
    if (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100 >=
      60
    ) {
      setScrollPosition(0);
    } else if (
      ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100 <
      60
    ) {
      setScrollPosition(-150);
    }
  };

  window.addEventListener('scroll', getCurrentScroll);

  return (
    <>
      <WinnerContainer>
        <UserInputContainer>
          <span
            style={{
              color: `${({ props }: { props: any }) => props.theme.textColor}`,
              fontSize: '2vw',
            }}
          >
            자신의 스타일을 뽐내보세요
          </span>
          <ImageUploadContainer scrollPos={scrollPosition}>
            <img
              src={DancingDoodle}
              alt="dancingdoodle"
              style={{ width: '70%', minWidth: '300px' }}
            />
            <ImageUpload />
          </ImageUploadContainer>
        </UserInputContainer>
        <BottomLineContainer>
          <svg
            width="159"
            height="3"
            viewBox="0 0 159 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0.993976"
              y1="2.00002"
              x2="158.994"
              y2="1.04821"
              stroke="#242CE3"
              strokeWidth="2"
            />
          </svg>
        </BottomLineContainer>
      </WinnerContainer>
    </>
  );
}

export default Winner;
