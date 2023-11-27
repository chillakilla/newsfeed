import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { closePublicModal, showPublicModal } from 'redux/modules/publicModal';
import PublicModal from 'components/UI/PublicModal';
import smile from '../assets/smile.svg';

const StDetailSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 640px;
  padding: 30px;
  margin: 100px auto 0;
  background: #fff;
  border-radius: 16px;
`;

const StAuthorDiv = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 15px;
  border-radius: 8px;
  margin: 0 0 20px 0;
  position: relative;
  border-bottom: 1px solid #ededed;
  img {
    margin-right: 10px;
    width: 34px;
    height: 34px;
  }
`;
const StDivForNameAndStore = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  span {
    font-size: 14px;
    color: #999;
  }
`;
const StdateSpan = styled.span`
  position: absolute;
  right: 10px;
  font-size: 14px;
  width: 120px;
  line-height: 1.2;
  text-align: right;

  color: #7579e7;
`;
const StTitleH2 = styled.h2`
  padding-bottom: 20px;
  font-size: 24px;
`;
const StMainArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const StBtnDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
  button {
    padding: 0.3rem;
    height: 40px;
    cursor: pointer;
    font-size: large;
    border-radius: 8px;
    border-color: transparent;
  }
  button:first-of-type {
    background-color: #dddddd;
    width: calc(50% - 5px);
    color: #333;
  }
  button:last-of-type {
    background-color: #ff5353;
    color: white;
    width: calc(50% - 5px);
  }
`;
const StTextAreaForContent = styled.p`
  width: 100%;
  height: auto;
  margin-top: 15px;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap;
`;
const StTextAreaForEdit = styled.textarea`
  resize: none;
  width: 100%;
  min-height: 100px;
  margin-top: 15px;
  border-radius: 8px;
  border-color: transparent;
  line-height: 1.6;
  font-size: 16px;
  color: #555;
`;
const StTextAreaForTitleEdit = styled.textarea`
  resize: none;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 8px;
  border-color: transparent;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.6;
`;

function Detail() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const feeds = useSelector((state) => state.feeds);
  console.log(feeds);
  const params = useParams();
  const filteredFeed = feeds.filter((feed) => feed.id === params.id);
  const feed = filteredFeed[0];

  const dispatch = useDispatch();
  const publicmodal = useSelector((state) => state.publicModal);

  //제목+ 타이틀 한번에 수정완료
  const [editData, setEditData] = useState({ ...feed });

  const deletBtnHndlr = () => {
    dispatch(
      showPublicModal({
        isUse: true,
        title: '삭제할까요?',
        message: '삭제되면 복구가 불가능합니다.',
        btnMsg: '취소',
        btnFn: () => dispatch(closePublicModal()),
        btnMsg2: '삭제',
        btnFn2: () => {
          dispatch(closePublicModal());
          const feedRef = doc(db, 'feeds', feed.id);
          deleteDoc(feedRef);
          navigate(-1);
        }
      })
    );
  };

  const editBtnHndlr = () => {
    if (isEditing) {
      const feedRef = doc(db, 'feeds', feed.id);
      updateDoc(feedRef, {
        content: editData.content,
        title: editData.title
      });
    }
    setIsEditing((prev) => !prev);
  };

  const editChangeHndlr = (event, field) => {
    setEditData({ ...editData, [field]: event.target.value });
  };

  //lastlocation에 따라 수정/삭제 버튼을 조건부 렌더링 하기 위한 코드
  const getQueryParam = (name) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  };
  const lastLocation = getQueryParam('lastlocation');
  const isFromMyPage = lastLocation === '/mypage';

  return (
    <StDetailSection>
      <StAuthorDiv>
        <img src={smile} alt="" />
        <StDivForNameAndStore>
          <p>{feed.user}</p>
          <span>편의점 : {feed.CVS}</span>
        </StDivForNameAndStore>
        <StdateSpan>{feed.date}</StdateSpan>
      </StAuthorDiv>

      <StMainArea>
        {isEditing ? (
          <>
            <StTextAreaForTitleEdit onChange={(event) => editChangeHndlr(event, 'title')} value={editData.title} />
            <img src={feed.image_url} alt="" />
            <StTextAreaForEdit
              autoFocus
              onChange={(event) => editChangeHndlr(event, 'content')}
              value={editData.content}
            />
          </>
        ) : (
          <>
            <StTitleH2>{editData.title}</StTitleH2>
            <img src={feed.image_url} alt="" />
            <StTextAreaForContent disabled>{editData.content}</StTextAreaForContent>
          </>
        )}
        <br />
      </StMainArea>
      {isFromMyPage && (
        <StBtnDiv>
          <button onClick={editBtnHndlr}>{isEditing ? '수정완료' : '수정'}</button>
          <button onClick={deletBtnHndlr}>삭제</button>
          {publicmodal.isUse && <PublicModal />}
        </StBtnDiv>
      )}
    </StDetailSection>
  );
}

export default Detail;
