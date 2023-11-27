import styled from 'styled-components';
import ImgUpload from 'components/UI/ImgUpload';
import Header from 'components/UI/Header';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import Feed from 'components/Feed';
import { useDispatch } from 'react-redux';
import { getByUser } from 'redux/modules/filterConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function MyPage() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser !== null);
  const [displayName, setDisplayName] = useState();
  console.log(auth.currentUser);

  const email = auth.currentUser.email;
  console.log(email);
  const userProfileImgUrl =
    auth.currentUser.photoURL === null
      ? 'https://firebasestorage.googleapis.com/v0/b/fir-e-9aec4.appspot.com/o/folder%2F_7fdc97b7-c89c-41b1-bd84-7cfb1b07a7d2.jpg?alt=media&token=e0c9e857-d8c8-49c2-931a-2b6fa45d8db0'
      : auth.currentUser.photoURL;

  let userInfo = {};
  useEffect(() => {
    dispatch(getByUser(email));
    const fetchTargetDoc = async () => {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userInfo = { ...doc.data() };
      });
      setDisplayName(auth.currentUser.displayName || userInfo.displayName || '이 글씨가 보이면 큰일난거임');
    };
    fetchTargetDoc();
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Container>
        <Profile>
          <ProfileImg>
            <ImgUpload userProfileImgUrl={userProfileImgUrl} />
            <EditImg>
              <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#ffffff"
                  d="M3.548 20.938h16.9a.5.5 0 0 0 0-1h-16.9a.5.5 0 0 0 0 1ZM9.71 17.18a2.587 2.587 0 0 0 1.12-.65l9.54-9.54a1.75 1.75 0 0 0 0-2.47l-.94-.93a1.788 1.788 0 0 0-2.47 0l-9.54 9.53a2.473 2.473 0 0 0-.64 1.12L6.04 17a.737.737 0 0 0 .19.72a.767.767 0 0 0 .53.22Zm.41-1.36a1.468 1.468 0 0 1-.67.39l-.97.26l-1-1l.26-.97a1.521 1.521 0 0 1 .39-.67l.38-.37l1.99 1.99Zm1.09-1.08l-1.99-1.99l6.73-6.73l1.99 1.99Zm8.45-8.45L18.65 7.3l-1.99-1.99l1.01-1.02a.748.748 0 0 1 1.06 0l.93.94a.754.754 0 0 1 0 1.06Z"
                />
              </svg>
            </EditImg>
          </ProfileImg>
          <InfoWrapper>
            <Nickname>{displayName}</Nickname>
            <Email>{email}</Email>
          </InfoWrapper>
        </Profile>
        <FeedArea>
          <FeedTitleArea>
            <FeedTitle>작성한 포스트</FeedTitle>
          </FeedTitleArea>

          <Feed />
        </FeedArea>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1080px;
  margin: 60px auto 0;
  padding: 40px 0;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 360px;
  height: 120px;
  padding: 32px 24px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
`;
const ProfileImg = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;
const EditImg = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 24px;
  height: 24px;
  padding: 4px;
  text-align: center;
  background: black;
  border-radius: 50%;
`;
const InfoWrapper = styled.div``;
const Nickname = styled.h3`
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 600;
`;
const Email = styled.span`
  font-size: 14px;
  color: #aaa;
`;
const FeedArea = styled.div`
  min-width: 680px;
  min-height: 260px;
  padding: 30px 20px;
  background-color: white;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
`;
const FeedTitleArea = styled.div`
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ededed;
  margin-bottom: 20px;
`;
const FeedTitle = styled.div`
  width: 146px;
  padding: 0 0 15px;
  text-align: center;
  font-weight: 500;
  border-bottom: 1px solid #333333;
`;

export default MyPage;
