import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import arrowIcon from '../../Images/arrowIcon.png';
import { url } from 'inspector';


interface NavigationStateProps {
    navState: any;
}

const NavigationContainer = styled.nav`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 0;
`;

interface NavButtonProps {
    url: any;
}

const NavButton = styled('button')<NavButtonProps>`
    width: 50px;
    z-index: 2;
    background: url(${({ url }) => url});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
`;

const NavButtonContainer = styled('div')`
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
`;

const NavLinkContainer = styled('div')<NavigationStateProps>`
    width: 70%;
    height: ${({navState}) => {
        if (navState) {
            return '60px';
        } else {
            return '0';
        }
    }};
    display: flex;
    justify-content: center;
    transition: .5s ease;
    z-index: ${({navState}) => {
        if (navState) {
            return '1';
        } else {
            return '0';
        }
    }};
`;

const HomeButton = styled.div`
    color: white;
    font-size: 40px;
    text-shadow: 2px 2px 2px rgba(0,0,0,0.5);
`;

const GameContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    background-color: #efefef;
`;

const LeftImageContainer = styled.section`
    position: relative;
    width: 50%;
    height: 100%;
    color: white;
    display: flex;
    flex-direction: column;
`;

interface LeftImageProps {
    url: any;
}

interface LeftImageContainerProps {
    state: 'START' | 'LEFTCLICK' | 'RIGHTCLICK' | 'MOVE';
}

const LeftImageBox = styled('div')<LeftImageContainerProps>`
    position: absolute;
    top: 11%;
    left: 11%;
    width: 77%;
    height: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0,0,0,.3);
    opacity: ${(state: any) => {
        if ( state === 'START' ) {
            return '1';
        } else if ( state === 'LEFTCLICK' ) {
            return '.5';
        } else if ( state === 'RIGHTCLICK' ) {
            return '.5';
        } else {
            return '1';
        }
    }};
    trasnition: all 0.5s ease;
`;

const LeftImage = styled('div')<LeftImageProps>`
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 10px 10px 10px;
    background: url(${({ url }) => url});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    &:hover {
        -ms-transform: scale(1.1);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
`;

const RightImageContainer = styled.section`
    position: relative;
    width: 50%;
    height: 100%;
    color: white;
    display: flex;
    flex-direction: column;
`;

interface RightImageProps {
    url: string;
}

interface RightImageBoxProps {
    state: 'START' | 'CLICK' | 'MOVE';
}

const RightImageBox = styled('div')<RightImageBoxProps>`
    position: absolute;
    top: 11%;
    left: 11%;
    width: 77%;
    height: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0,0,0,.3);
    trasnition: 'all .5s ease';
`;

const RightImage = styled('div')<RightImageProps>`
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 10px 10px 10px;
    background: url(${({ url }) => url});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    &:hover {
        -ms-transform: scale(1.1);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
`;

const VersusImageContainer = styled.div`
    position: absolute;
    top: 50%;
    font-size: 70px;
    font-weight: 700;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const VersusIcon = styled.div`
    width: 100%;
    height: 100%;
    text-shadow: 2.3px 2.3px 3px rgba(0, 0, 0, .5);
`;



interface gProps {
    state: any;
    // ClickState: any;
    LeftStyleImages: any;
    RightStyleImages: any;
    LeftClick: any;
    RightClick: any;
}

function Game ({ 
        state, 
        // ClickState,
        LeftStyleImages, 
        RightStyleImages,
        LeftClick,
        RightClick,
    }: gProps) {
    
    const [ navState, setNavState ] = useState(false);

    return (
        <>
            <NavigationContainer>
                <NavLinkContainer navState={navState}>
                    <Link to={'/'}>
                        <HomeButton>
                            HOME
                        </HomeButton>
                    </Link>
                </NavLinkContainer>
                <NavButtonContainer>
                    <NavButton url={arrowIcon} 
                        onClick={() => 
                            setNavState(!navState)
                        }
                    />
                </NavButtonContainer>
            </NavigationContainer>
            <GameContainer>
                <LeftImageContainer>
                    <LeftImageBox state={state}>
                            <LeftImage 
                                url={ LeftStyleImages.url } 
                                onClick={() => 
                                    LeftClick()
                                }
                            />
                    </LeftImageBox>
                </LeftImageContainer>
                <VersusImageContainer>
                    <VersusIcon>
                        <span style={{ color: 'white' }}>VS</span>
                    </VersusIcon>
                </VersusImageContainer>
                <RightImageContainer>
                    <RightImageBox state={state}>
                            <RightImage 
                                url={ RightStyleImages.url }
                                onClick={ () => 
                                    RightClick()
                                }    
                            />
                    </RightImageBox>
                </RightImageContainer>
            </GameContainer>
        </>
    );
}

export default Game;