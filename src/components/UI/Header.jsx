import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMyPage = location.pathname === '/mypage';

  const logOut = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      alert('로그아웃 되었습니다.');
      navigate('/');
    } catch (error) {
      console.log('로그아웃 중 오류가 발생했습니다.', error.message);
    }
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        <Logo
          onClick={() => {
            navigate('/');
          }}
        >
          🏪편의점맛도리
        </Logo>
        <InfoText>🏪 여러분의 편의점 꿀조합을 추천해보세요! 🍽️</InfoText>
        <ButtonContainer>
          {isLoggedIn ? (
            <>
              <Link to={isMyPage ? '/' : '/mypage'}>
                <MypageButton>{isMyPage ? '홈으로' : '내 페이지'}</MypageButton>
              </Link>
              <Link>
                <Button onClick={logOut}>로그아웃</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button1>로그인</Button1>
              </Link>
              <Link to="/signup">
                <Button>회원가입</Button>
              </Link>
            </>
          )}
        </ButtonContainer>
      </HeaderInner>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  height: 60px;
  padding: 10px;
  margin: 0 auto;
  font-weight: bold;
  background-color: white;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.02);
`;
const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 1160px;
  height: 100%;
  margin: 0 auto;
`;

const Logo = styled.h1`
  padding: 10px;
  color: #7579e7;
  font-weight: 500;
  cursor: pointer;
`;

const InfoText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 390px;
  height: 32px;
  font-size: 13px;
  font-weight: normal;
  text-align: center;
  line-height: 32px;
  border-radius: 16px;
  border: 1px solid #e8eeff;
  background: #e8eeff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;
const MypageButton = styled.button`
  padding: 10px 20px;
  margin-right: 14px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #efefef;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #dfdfdf;
  }
  &:active {
    transform: scale(1.1);
  }
`;
const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #7579e7;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #4e53cf;
  }
  &:active {
    transform: scale(1.1);
  }
`;

const Button1 = styled.button`
  margin-right: 14px;
  padding: 10px 20px;
  background-color: white;
  color: #555555;
  border: 1px solid #efefef;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #dfdfdf;
  }
`;

export default Header;
