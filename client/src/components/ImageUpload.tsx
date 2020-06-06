import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import tempIcon from '../Images/VersusTemp.png'
import { AiOutlineUpload } from 'react-icons/ai';
import axios from 'axios';



const FileUploadContainer = styled.div`
    width: 20vw;
    display: flex;
`;

const Edit = styled.div`
    z-index: 1;
`;

const Upload = styled.div`
    position: relative;
    max-width: 205px;
`;

const Input = styled.input`
    display: none;
`;

const Preview = styled.label`
    for:imageUpload;
    display: inline-block;
    width: 10vw;
    height: 10vw;
    margin-bottom: 0;
    border-radius: 100%;
    background: #FFFFFF;
    border: 1px solid transparent;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    font-weight: normal;
    transition: all .2s ease-in-out;
        
    &:hover {
        background: #f1f1f1;
        border-color: #d6d6d6;
    }
    &:after {
        icon: ;
        font-family: 'fontawesome';
        color: #757575;
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        text-align: center;
        margin: auto;
    }
`;

const PreviewP = styled('div')<PrevImageProps>`
    background-image: url(${({ url }) => url});
    width: 100%;
    height: 100%;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

const Label = styled.label`
    for:imageUpload;
    display: inline-block;
    width: 34px;
    height: 34px;
    margin-bottom: 0;
    border-radius: 100%;
    background: #FFFFFF;
    border: 1px solid transparent;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    font-weight: normal;
    transition: all .2s ease-in-out;
        
    &:hover {
        background: #f1f1f1;
        border-color: #d6d6d6;
    }
    &:after {
        icon: ;
        font-family: 'fontawesome';
        color: #757575;
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        text-align: center;
        margin: auto;
    }
`;

interface PrevImageProps {
    
    url: string;
}


function ImageUpload() {
        
        const [uploadedFile, setUploadedFile] = useState({url:""});
    //It sends a request to upload to the server by storing the file object in the state
            //Post request to server when submitted 
        const handleSubmit = (e: any) => {
            e.preventDefault();
            const imageData = new FormData();
            //imageData.append("file", uploadedFile);
            console.log(imageData)
            if (imageData) {
                
            }
            //request
            axios.post(
                'S3 업로드할 url',
                imageData
            ).then((res) => {
                console.log(res.data);
            }).catch((error) => {
                console.log(error);
            });
        }

        const handleClick = (e: any) => {
            console.log(e.target);
        };

        const handleChange = (e: any) => {
            
            var file = e.target.files[0]
            
            
            setUploadedFile({
                url: URL.createObjectURL(file)});      
            
        };
    
    const uploadInput = useRef(null);
    return (
        <FileUploadContainer>
            <Upload>
                <Preview htmlFor='imageUpload'>
                    <PreviewP id="imagePreview" url={uploadedFile.url}>
                        <AiOutlineUpload  size={50}/>
                    </PreviewP>
                </Preview>
                <Input type='file' id='imageUpload' onChange={handleChange}/>
            </Upload>

        </FileUploadContainer>
    );
}

export default ImageUpload;