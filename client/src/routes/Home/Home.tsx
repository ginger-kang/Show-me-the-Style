import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import google from '../../Images/google.png';
import KakaoLogin from 'react-kakao-login'
import gql from "graphql-tag";
import { useLazyQuery } from '@apollo/react-hooks';
import SelectMenu from '../../components/Select';
import Winner from '../../components/Winner';
import {USER_EXIST,PHOTOS} from '../Game/query';
import client from '../../apollo';
import sittingDoodle from '../../Images/doodle/GroovySittingDoodle.png';


const HomeContainer = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const LoginNavContainer = styled.nav`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginButton = styled.button`
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 110px;
    height: 42px;
    padding: 9px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1.5px solid black;
    border-radius: 10px;
    background: black;
    font-size: 20px;
    transition: all .1s ease;

    &:hover {
        -ms-transform: scale(1.1);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
`;

interface LoginBoxProps {
    loginState: any;
}

const LoginBox = styled('div') <LoginBoxProps>`
    position: fixed;
    top: 250px;
    display: ${({ loginState }) => {
        if (loginState) {
            return 'flex';
        } else {
            return 'none';
        }
    }};
    min-width: 400px;
    min-height: 140px;
    color: white;
    font-size: 20px;
    transition: all 2s ease;
    background: rgba(0,0,0,.78);
    border-radius: 11px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 100;
`;

const KakaoButton = styled(KakaoLogin)`
    width: 25%;
    height: 25%;
    min-width: 100px;
    min-height: 100px;
    color: black;
    margin: 40px;
    background-color: #FFEB00;
    border-radius: 10px;
    font-size: 77px;
    text-align: center;
`;

const HomeImageContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    
    & img {
        z-index: -1;
    }
`;

const HomeContentContainer = styled.div`
    color: black;
    padding: 10px;
    display: flex;
    flex-direction: column;
    z-index: 1;
    align-items: center;

    & img {
        transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-5deg) skew(0deg, 0deg);
        transform-style: preserve-3d;
    }
`;

const MainTitleImage = styled.div`
    font-size: 7vw;
`;

const ContentContatiner = styled.p`
    font-size: 14px;
    padding: 15px;
    color: white;
    display: flex;
    justify-content: center;
`;


export default function Home() {
    const [loginButtonClick, setLoginButtonClick] = useState(false);

    //total-user Info
    const [userSocialId, setUserSocialId] = useState(null);
    const [userSocialName, setUserSocialName] = useState(null);
    const [provider, setProvider] = useState('' );

    console.log(userSocialId,userSocialName,provider);

    //set google-user Info
    const responseLogin = (response: any,tempProvider: any) => {
        
        var googleId = response.googleId;
        if(tempProvider=='google'){
            client.query({
                query:USER_EXIST,variables:{userId:googleId},
            }).then(res=>{
                if(res.data.User==null){
                    // 신규 사용자
                }else{
                    // 기존 사용자
                }
            });

            setUserSocialId(response.googleId);
            setUserSocialName(response.profileObj.name);
            setProvider('google');
            window.sessionStorage.setItem('id',response.googleId);
             
            
            //localStorage.setItem('user',response.googleId);
        }else if(tempProvider=='kakao'){
            setUserSocialName(response.profile.kakao_account.profile.nickname);
            //localStorage.setItem('user',response.profile.id);
            window.sessionStorage.setItem('id',response.profile.id);
            setProvider('kakao');
        }

        
    }

    return (
        <>
            <HomeContainer>
                <LoginNavContainer>
                    <span style={{ color: 'black', fontSize: '18px' }}>Hello {userSocialName}!</span>  
                </LoginNavContainer>
                <LoginButton onClick={() => setLoginButtonClick(!loginButtonClick)}>
                    로그인
                </LoginButton>
                    <LoginBox loginState={loginButtonClick}>
                        <GoogleLogin
                            clientId="578715869929-mutudhudc1bh26dmvljgko5ofo7f690j.apps.googleusercontent.com"
                            render={renderProps => (
                                <button
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    style={{
                                        background: 'none'
                                    }}
                                >
                                    <img src={google}
                                        alt='google_logo'
                                        style={{
                                            width: '50%',
                                            height: '50%',
                                        }}
                                    />
                                </button>
                            )}
                            buttonText="Login"
                            onSuccess={res=>responseLogin(res,'google')}
                            onFailure={res=>console.log(1)}
                            isSignedIn={true}
                            cookiePolicy={'single_host_origin'}
                        />
                        <KakaoButton
                            jsKey='0a72b63b122363029a9f28be03dc7b33'
                            buttonText='K'
                            onSuccess={res=>responseLogin(res,'kakao')}
                            onFailure={res=>console.log(1)}                        
                            getProfile={true}
                        />
                    </LoginBox>
                <HomeContentContainer>
                    <img src={sittingDoodle} alt='sittingDoodle' style={{ width: '40%'}} />
                    <MainTitleImage>
                        Lorem Ipsum
                    </MainTitleImage>
                    <ContentContatiner>
                    {/* 
                        google user info test view
                    */}
                    <span style={{ color: 'black', fontSize: '2.5vw' }}>자신의 스타일을 사람들에게 보여주세요</span>
                </ContentContatiner>
                </HomeContentContainer>
            </HomeContainer>
            <SelectMenu />
            <Winner />
        </>
    );
}