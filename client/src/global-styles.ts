import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
   
    * {
        box-sizing: border-box;
        font-family: 'NanumSquare', sans-serif !important;
    }
    body {
        transition: all .25s linear;
        color: ${({ theme }: { theme: any }) => theme.textColor};
    }
    button { 
        
        cursor: pointer;
        border: none;
        outline: none;
        color: ${({ theme }: { theme: any }) => theme.bgColor};
        background: ${({ theme }: { theme: any }) => theme.textColor};
    }
    ol, ul, li {
        list-style: none;
    }
    a {
        text-decoration: none;
        cursor: pointer;
    }
`;
