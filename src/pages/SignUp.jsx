import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { current_Email } from 'redux/modules/currentEmail';

const SignUp = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', displayName: '' });
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!isValidEmail(credentials.email)) {
      setError('올바른 형식의 이메일이 아닙니다.');
      setShowError(true);
      return;
    }

    const uppercaseRagex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!uppercaseRagex.test(credentials.password) || !specialCharRegex.test(credentials.password)) {
      setError('비밀번호는 대문자와 특수문자를 포함해야 합니다.');
      setShowError(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;
      const db = getFirestore();

      await setDoc(doc(db, 'users', user.uid), {
        email: credentials.email,
        displayName: credentials.displayName
      });
      dispatch(current_Email(credentials.email));

      alert('회원가입을 환영합니다.');
      navigate('/');
    } catch (error) {
      setError(`${error.message}`);
      setShowError(true);
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <LoginContainer>
        <FormContainer>
          <Title>회원가입</Title>
          <InputForm>
            <InputContainer>
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
            </InputContainer>
            <PwInputContainer>
              <label>Password : &nbsp;</label>
              <Input
                type="password"
                value={credentials.password}
                name="password"
                onChange={onChange}
                required
                placeholder="최소 8자 ~ 최대 16자"
                minLength={8}
                maxLength={16}
              ></Input>
            </PwInputContainer>
            <InputContainer>
              <label>Name : &nbsp;</label>
              <Input
                type="text"
                value={credentials.displayName}
                name="displayName"
                onChange={onChange}
                required
              ></Input>
            </InputContainer>
            <ErrorTextContainer>{showError && <ErrorText>{error}</ErrorText>}</ErrorTextContainer>
          </InputForm>
          <ButtonContainer>
            <LoginButton onClick={handleSignUp}>회원가입</LoginButton>
          </ButtonContainer>
        </FormContainer>
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

const FormContainer = styled.div`
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
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputContainer = styled.div`
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
const PwInputContainer = styled.div`
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0 0 0;
  width: 100%;
`;

const LoginButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background: #7579e7;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #4e53cf;
  }
`;

const ErrorTextContainer = styled.div`
  width: max-content;
`;

const ErrorText = styled.p`
  color: red;
  margin-bottom: 0 10px;
`;

export default SignUp;
