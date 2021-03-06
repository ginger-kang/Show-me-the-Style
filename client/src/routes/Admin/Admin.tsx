import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled, { ThemeContext } from 'styled-components';
import client from '../../apollo';
import {
  UPLOAD_PHOTO_FOR_GAME,
  UPLOAD_PHOTO_FOR_FIND_STYLE_GAME,
} from '../../query';
import axios from 'axios';
import ParseDateString from '../../Services/ParseDateString';

const AdminContainer = styled('div')`
  font-size: 20px;
  width: 100vw;
  height: 100vh;
`;

type FormData = {
  topName: string;
  topPrice: string;
  bottomName: string;
  bottomPrice: string;
  shoesName: string;
  shoesPrice: string;
  instagram: string;
  photo: any;
  gender: string;
  likeNum: any;
};

function Admin() {
  const { register, setValue, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = handleSubmit(
    ({
      topName,
      topPrice,
      bottomName,
      bottomPrice,
      shoesName,
      shoesPrice,
      instagram,
      photo,
    }) => {
      var date = ParseDateString();

      var name2 = date + '-' + photo[0].name;
      var imageData = new FormData();

      imageData.append('image', photo[0]);
      imageData.append('imageId', name2);

      const config = {
        headers: { 'Content-type': 'multipart/form-data' },
      };

      axios
        .post('/upload', imageData, config)
        .then(function (response) {
          alert('이미지 업로드 성공');
        })
        .catch(function (error) {
          alert('업로드 실패');
        });

      client.mutate({
        variables: {
          owner: instagram,
          category: 'man',
          instagram: instagram,
          top1: topName,
          top2: Number(topPrice),
          bottom1: bottomName,
          bottom2: Number(bottomPrice),
          shoes1: shoesName,
          shoes2: Number(shoesPrice),
          url:
            'https://s3.ap-northeast-2.amazonaws.com/showmethestyle.com/man/' +
            name2,
          id: name2,
        },
        mutation: UPLOAD_PHOTO_FOR_GAME,
      });
    },
  );

  const onSubmit2 = handleSubmit(({ gender, likeNum, photo, instagram }) => {
    var date = ParseDateString();

    var name2 = date + '-' + photo[0].name;
    var imageData = new FormData();

    imageData.append('image', photo[0]);
    imageData.append('imageId', name2);

    const config = {
      headers: { 'Content-type': 'multipart/form-data' },
    };

    axios
      .post('/upload', imageData, config)
      .then(function (response) {
        alert('이미지 업로드 성공');
      })
      .catch(function (error) {
        alert('업로드 실패');
      });
    console.log(gender, likeNum, instagram, name2);
    client.mutate({
      variables: {
        gender: gender,
        likeNum: Number(likeNum),
        instagram: instagram,
        url:
          'https://s3.ap-northeast-2.amazonaws.com/showmethestyle.com/' +
          gender +
          '/' +
          name2,
        id: name2,
      },
      mutation: UPLOAD_PHOTO_FOR_FIND_STYLE_GAME,
    });
  });
  return (
    <>
      <AdminContainer>
        <form onSubmit={onSubmit}>
          상의
          <input type="text" id="topName" name="topName" ref={register} />
          <input type="text" id="topPrice" name="topPrice" ref={register} />
          <br></br>
          <br></br>
          하의
          <input type="text" id="bottomName" name="bottomName" ref={register} />
          <input
            type="text"
            id="bottomPrice"
            name="bottomPrice"
            ref={register}
          />
          <br></br>
          신발
          <input type="text" id="shoesName" name="shoesName" ref={register} />
          <input type="text" id="shoesPrice" name="shoesPrice" ref={register} />
          <br></br>
          인스타
          <input type="text" id="instagram" name="instagram" ref={register} />
          <br></br>
          <input type="file" id="photo" name="photo" ref={register} />
          <input type="submit" value="Submit" />
        </form>
        <form onSubmit={onSubmit2}>
          남/여
          <input type="text" id="gender" name="gender" ref={register} />
          좋아요수
          <input type="text" id="likeNum" name="likeNum" ref={register} />
          인스타
          <input type="text" id="instagram" name="instagram" ref={register} />
          <br></br>
          <input type="file" id="photo" name="photo" ref={register} />
          <input type="submit" value="Submit" />
        </form>
      </AdminContainer>
    </>
  );
}

export default Admin;
