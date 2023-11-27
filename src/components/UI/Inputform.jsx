import { auth, db, storage } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { closeInputModal } from 'redux/modules/modal';

function Inputform() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [CVS, setCVS] = useState('CU');

  const currentEmail = useSelector((state) => state.currentEmail);
  let fileYN = '';

  const dispatch = useDispatch();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    fileYN = '첨부되었습니다.';
  };

  //이미지 파일 업로드
  const handleUpload = async () => {
    //[파일선택] 버튼 안눌러서 선택한 파일 없는경우
    if (selectedFile === '') {
      return '';
    }

    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    try {
      await uploadBytes(imageRef, selectedFile);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.log('Inputform.jsx (handleUpload): ', error);
      throw error;
    }
  };

  let formattedDate = new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'full',
    timeStyle: 'short'
  }).format(new Date());

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            //1. 이미지 파일 업로드
            const uploadImageUrl = await handleUpload();

            //2. 모달창에 입력된 새로운 데이터
            const newData = {
              email: 'test',
              content,
              CVS,
              date: formattedDate,
              title,
              image_url: uploadImageUrl,
              user: currentEmail
            };

            //3. 파이어스토어에 데이터 저장
            const collectionRef = collection(db, 'feeds');
            await addDoc(collectionRef, newData);

            //4. 모달닫기
            dispatch(closeInputModal());
          } catch (Error) {
            console.log('[form Error] (Inputform.jsx): ', Error);
          }
        }}
      >
        <StSection>
          <div>
            <NewFeed>새 글 작성</NewFeed>
          </div>

          <div>
            <p>{currentEmail}</p>
          </div>

          <StDiv>
            <span>🏪 편의점 선택</span>
            <select value={CVS} onChange={(event) => setCVS(event.target.value)}>
              <option>CU</option>
              <option>GS</option>
              <option>이마트24</option>
              <option>세븐일레븐</option>
              <option>미니스탑</option>
            </select>
          </StDiv>
          <StDiv>
            <TitleInput
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="제목을 입력해주세요."
              maxLength={30}
            ></TitleInput>
          </StDiv>

          <StContent
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(event) => {
              setContent(event.currentTarget.value);
            }}
          ></StContent>

          <FileUplod>
            <input type="file" name="fileSelect" id="fileAttach" onChange={handleFileSelect}></input>
            <label htmlFor="fileAttach">사진 첨부하기</label>
            <p>{fileYN}</p>
          </FileUplod>
          <BtnSection>
            <Button>등록하기</Button>
          </BtnSection>
        </StSection>
      </form>
    </>
  );
}

const FileUplod = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  & label {
    border: 1px solid #7579e7;
    background-color: #fff;
    color: #7579e7;
    border-radius: 8px;
    padding: 6px 14px;
    font-weight: 500;
    font-size: 14px;
    outline: none;
  }
`;

const StSection = styled.section`
  margin: 30px 20px;
  & div {
    padding-bottom: 10px;
  }

  & p {
    font-size: 14px;
    font-weight: 200;
    color: #bbb;
    text-align: left;
  }
  & select {
    height: 24px;
  }
`;

const StDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;

  & p {
    padding: 2px 0px;
  }
`;

const StContent = styled.textarea`
  min-height: 17vh;
  max-height: 30vh;
  overflow-y: auto;
  box-sizing: content-box;
  outline: none;
  line-height: 1.6em;
  margin-bottom: 20px;
  font-size: 15px;
  word-break: keep-all;

  resize: none;
  width: 100%;
  border: none;
  color: #555;

  &::placeholder {
    color: #bbb;
  }
`;
const BtnSection = styled.div`
  display: flex;
  justify-content: center;

  border-radius: 12px;
`;

const TitleInput = styled.input`
  width: 100%;
  outline: none;
  font-size: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
  padding-bottom: 10px;
  border: none;
  font-weight: 500;
  border-bottom: 1px solid #ededed;

  &::placeholder {
    color: #bbb;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  font-weight: 600;
  border-radius: 8px;
  font-size: 15px;
  background-color: #7579e7;
  color: white;
  &:hover {
    border: 1px solid #7579e7;
    box-shadow: rgba(117, 121, 231, 0.4) 0px 0px 0px 3px;
  }
`;

const NewFeed = styled.h4`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
`;

export default Inputform;
