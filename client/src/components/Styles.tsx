import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineAppstore } from 'react-icons/ai';
import { PHOTOS } from '../query';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import GameLoading from '../components/GameLoading';
import ErrorPage from '../components/ErrorPage';
import StylesPhotos from './StylesPhotos';
import BackButton from '../Images/BackButton.svg';
import { TiArrowBackOutline } from 'react-icons/ti';
import { AiOutlineHome } from 'react-icons/ai';

const StylesContainer = styled.section`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  @media screen and (max-width: 1040px) {
    height: auto;
  }
`;

const StylesNavContainer = styled.nav`
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: ${(props) => props.theme.styleNavColor};
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.01);

  & svg {
    color: ${(props) => props.theme.textColor};
  }
`;

interface gridLayoutProps {
  layoutNumber: number;
}

const StylePhotoWrapper = styled('section')<gridLayoutProps>`
  width: auto;
  display: grid;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-columns: ${({ layoutNumber }) => {
    if (layoutNumber === 3) {
      return 'repeat(3, 1fr)';
    } else if (layoutNumber === 2) {
      return 'repeat(2, 1fr)';
    } else {
      return 'repeat(1, 1fr);';
    }
  }};

  @media screen and (max-width: 1500px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 1040px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 845px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const LayoutButtonContainer = styled.div`
  width: 40px;
  height: 40px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  cursor: pointer;
`;

function Styles() {
  const [layoutNumber, setLayoutNumber] = useState(3);

  return (
    <Query
      query={PHOTOS}
      notifyOnNetworkStatusChange={true}
      fetchPolicy={'cache-and-network'}
    >
      {({ loading, error, data }: any) => {
        if (loading) {
          return <GameLoading />;
        }
        if (error) {
          return <ErrorPage />;
        }
        if (data) {
          console.log(data);
        }
        return (
          <StylesContainer>
            <StylesNavContainer>
              <Link to="/select">
                <TiArrowBackOutline size={30} />
              </Link>
              <Link to="/">
                <AiOutlineHome size={30} />
              </Link>
              <LayoutButtonContainer>
                <AiOutlineAppstore size={30} />
              </LayoutButtonContainer>
            </StylesNavContainer>
            <StylePhotoWrapper layoutNumber={layoutNumber}>
              {data &&
                data.Photos.map((photo: any) => (
                  <StylesPhotos PhotoData={photo} layoutNumber={layoutNumber} />
                ))}
            </StylePhotoWrapper>
          </StylesContainer>
        );
      }}
    </Query>
  );
}

export default Styles;
