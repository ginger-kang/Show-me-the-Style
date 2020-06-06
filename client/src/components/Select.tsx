import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import  { USER_EXIST } from '../routes/Game/query';
import { Query } from "react-apollo"
import { useQuery } from '@apollo/react-hooks';
import GameLoading from './GameLoading';
import ErrorPage from './ErrorPage';

import ManDoodle from '../Images/doodle/DumpingDoodle.png';
import WomanDoodle from '../Images/doodle/SprintingDoodle.png';

const SelectPageContainer = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #0095ff29;
`;

const StartButton = styled.button`
    padding: 10px;
    margin-top: 20px;
    font-size: 1.5vw;
    color: white;
    border-radius: 6px;
    -webkit-transition: all 0.1s;
    transition: all 0.1s;
    background-color: black;

    &:hover {
        -ms-transform: scale(1.1);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
`;

const ManContainer = styled.div`
    width: 27%;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & img {
        margin-bottom: 25px;
        will-change: transform;
        transform: translate3d(0px, 39.1975px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
        transform-style: preserve-3d;
    }
`;

const WomanContainer = styled.div`
    width: 27%;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & img {
        margin-bottom: 25px;
        will-change: transform;
        transform: translate3d(0px, 39.1975px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
        transform-style: preserve-3d;
    }
`;

const ContentContainer = styled.div`
    width: 30%;
    color: black;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    margin-right: 30px;
    line-height: 1.3;

    & p {
        font-size: 1vw;
    }
`;

function SelectMenu() {
    let userId = window.sessionStorage.getItem('id');
    // userId = "moonseok";
    console.log(userId)
    const { loading, error, data } = useQuery(USER_EXIST, {
        variables: {userId},
    });

    if (loading) return <GameLoading />;
    if (error) return <ErrorPage />
    return (
        <SelectPageContainer>
            <ContentContainer>
                <span style={{fontSize: '2.5vw', color:'black'}}>어떤 스타일을 선호하시나요?</span>
                <p>소개팅 자리에 나갈 때 무슨 옷을 입고가실지 고민하고 있으신가요?</p>
                <p>자신의 여자친구, 남자친구를 친한 친구들 한테 소개시켜 줄 때 어떤 옷을 입히고 싶으신가요.</p>
            </ContentContainer>
            <ManContainer>
                <img src={ManDoodle} alt='manDoodle' style={{ width: '100%', minWidth: '200px'}} />
                <Link to="/game">
                    <StartButton>
                        MAN
                    </StartButton>
                </Link>
            </ManContainer>
            <WomanContainer>
                <img src={WomanDoodle} alt='womanDoodle' style={{ width: '100%', minWidth: '200px'}} />
                <Link to="/game">
                    <StartButton>
                        WOMAN
                    </StartButton>
                </Link>
            </WomanContainer>
        </SelectPageContainer>   
    );
}

export default SelectMenu;