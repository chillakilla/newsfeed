import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase';
import Header from 'components/UI/Header';
import { useDispatch } from 'react-redux';
import { current_Email } from 'redux/modules/currentEmail';
import google from '../assets/google.png';
import github from '../assets/github.png';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      dispatch(current_Email(user ? user.email : ''));
    });
    return () => unsubscribe();
  }, [dispatch]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAuth = async (event, authFunction, successMessage) => {
    event.preventDefault();

    if (!credentials.email.trim() || !credentials.password.trim()) {
      setError('이메일과 비밀번호를 입력하세요.');
      setShowError(true);
      return;
    }

    if (authFunction === signInWithEmailAndPassword && !isValidEmail(credentials.email)) {
      setError('올바른 형식의 이메일이 아닙니다.');
      setShowError(true);
      return;
    }
    try {
      const userCredential = await authFunction(auth, credentials.email, credentials.password);
      setIsLoggedIn(true);
      alert(successMessage);
      navigate('/');
    } catch (error) {
      setIsLoggedIn(false);
      setError(`${error.message}`);
      setShowError(true);
    }
  };

  const signIn = async (event) => handleAuth(event, signInWithEmailAndPassword, '로그인 성공');
  const logOut = async (event) => {
    event.preventDefault();
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      alert('로그아웃 되었습니다.');
      navigate('/');
    } catch (error) {
      console.log('로그아웃 중 오류가 발생했습니다.', error.message);
    }
  };

  const initializeAuthProvider = (provider) => {
    const authProvider = new provider();
    return authProvider;
  };

  const signWithProvider = async (event, provider, successMessage, errorMessage) => {
    try {
      const authProvider = initializeAuthProvider(provider);
      const result = await signInWithPopup(auth, authProvider);
      setIsLoggedIn(true);
      setError(successMessage);
      alert('로그인 되었습니다.');
      navigate('/');
    } catch (error) {
      setIsLoggedIn(false);
      setError(`${errorMessage} ${error.message}`);
      setShowError(true);
    }
  };

  const signWithGoogle = (event) =>
    signWithProvider(
      event,
      GoogleAuthProvider,
      'Google 계정으로 로그인 되었습니다.',
      'Google 로그인 중 오류가 발생했습니다.'
    );
  const signWithGithub = (event) =>
    signWithProvider(
      event,
      GithubAuthProvider,
      'Github 계정으로 로그인 되었습니다.',
      'Github 로그인 중 오류가 발생했습니다.'
    );

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <LoginContainer>
        <InputContainer>
          <Form>
            <Title>로그인</Title>
            <IdContainer>
              <label>Email : &nbsp;</label>
              <Input
                type="email"
                value={credentials.email}
                name="email"
                onChange={onChange}
                required
                placeholder="sparta@gmail.com"
                autoFocus
              ></Input>
            </IdContainer>
            <PasswordContainer>
              <label>Password : &nbsp;</label>
              <Input type="password" value={credentials.password} name="password" onChange={onChange} required></Input>
            </PasswordContainer>
            <ErrorTextContainer>{showError && <ErrorText>{error}</ErrorText>}</ErrorTextContainer>
          </Form>
          <ButtonContainer>
            {isLoggedIn ? (
              <LoginButton onClick={logOut}>로그아웃</LoginButton>
            ) : (
              <>
                <LoginButton onClick={signIn}>로그인</LoginButton>
                <BR>OR</BR>
                <LoginButton onClick={signWithGoogle}>Google 로그인</LoginButton>
                <LoginButton onClick={signWithGithub}>Github 로그인</LoginButton>
              </>
            )}
          </ButtonContainer>
        </InputContainer>
      </LoginContainer>
    </>
  );
};

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const InputContainer = styled.div`
  width: 440px;
  height: auto;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
  font-size: 16px;
`;

const IdContainer = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  width: 100%;
  label {
    font-weight: normal;
    color: #777;
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

const Input = styled.input`
  padding: 5px;
  border-radius: 8px;
  border: 1px solid #c7c7c7;
  height: 40px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  label {
    font-weight: normal;
    color: #777;
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
  width: 100%;
`;

const LoginButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  &:nth-child(1) {
    color: #fff;
    background: #7579e7;
  }
  &:nth-child(1):hover {
    background-color: #4e53cf;
  }
  &:nth-child(3) {
    position: relative;
    color: #333;
    background: #e6e6e6;
  }
  &:nth-child(3):hover {
    background-color: #cbcbcb;
  }
  &:nth-child(3)::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(-50%, -50%);
    display: block;
    width: 24px;
    height: 24px;
    background: url(${google});
  }
  &:nth-child(4) {
    position: relative;
    color: #fff;
    background: #333;
  }
  &:nth-child(4):hover {
    background-color: #000000;
  }
  &:nth-child(4)::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(-50%, -50%);
    display: block;
    width: 18px;
    height: 17.473px;
    background: url(${github});
  }
`;

const BR = styled.p`
  position: relative;
  color: #555;
  font-size: 14px;
  text-align: center;
  margin: 10px 0;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: calc(50% - 30px);
    height: 1px;
    background: #e8e8ea;
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: calc(50% - 30px);
    height: 1px;
    background: #e8e8ea;
  }
`;

const ErrorTextContainer = styled.div`
  width: max-content;
  height: auto;
`;

const ErrorText = styled.p`
  color: red;
  margin-bottom: 0 10px;
`;

export default Login;
