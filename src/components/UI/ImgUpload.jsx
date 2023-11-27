import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import styled from 'styled-components';

const ImgUpload = ({ userProfileImgUrl }) => {
  const [selectedImg, setSelectedImg] = useState(userProfileImgUrl);

  const handleFileSelect = async (event) => {
    const imageFile = event.target.files[0];
    await handleUpload(imageFile);
  };

  const handleUpload = async (imageFile) => {
    if (imageFile) {
      const imageRef = ref(storage, `folder/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);

      const downloadURL = await getDownloadURL(imageRef);

      setSelectedImg(downloadURL);
    }
  };

  return (
    <>
      <Upload>
        <input type="file" onChange={handleFileSelect} />
        <ProfileImg src={selectedImg} alt="Selected Image" />
      </Upload>
    </>
  );
};

const Upload = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
  cursor: pointer;

  input {
    display: none;
  }
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export default ImgUpload;
