import React from 'react';
import Modal from 'components/UI/Modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { openInputmodal } from 'redux/modules/modal';
import PublicModal from './PublicModal';
import { closePublicModal, showPublicModal } from 'redux/modules/publicModal';

function InputformLayout({ isLoggedIn }) {
  const modal = useSelector((state) => state.modal);
  const publicModal = useSelector((state) => state.publicModal);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(openInputmodal());
  };

  const openModal_NOLogin = () => {
    dispatch(
      showPublicModal({
        isUse: true,
        title: '⭐로그인 필요⭐',
        message: '새 글 작성은 로그인 필요해요.',
        btnMsg: '확인',
        btnFn: () => dispatch(closePublicModal())
      })
    );
  };

  const handleClick = isLoggedIn ? openModal : openModal_NOLogin;

  return (
    <StSection>
      <Button onClick={handleClick}>
        <ButtonInner>
          {' '}
          새 글 작성시 여기를 클릭하세요!{' '}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M10.8571 20H20M17.7143 7.42856L18.8571 8.57142M19.4286 4.57142C19.6537 4.79652 19.8324 5.06377 19.9542 5.35791C20.0761 5.65205 20.1388 5.96732 20.1388 6.28571C20.1388 6.60409 20.0761 6.91936 19.9542 7.2135C19.8324 7.50764 19.6537 7.77489 19.4286 7.99999L8.57143 18.8571L4 20L5.14286 15.4926L16.0046 4.57599C16.4327 4.14579 17.0069 3.89229 17.6133 3.86583C18.2196 3.83936 18.8137 4.04187 19.2777 4.43313L19.4286 4.57142Z"
              stroke="#7579E7"
              strokeWidth="2.28571"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ButtonInner>
      </Button>
      {!isLoggedIn && publicModal.isUse && <PublicModal />}
      {isLoggedIn && modal.isUseInput && <Modal />}
    </StSection>
  );
}
const StSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin-top: 100px;
  margin-bottom: 20px;
  border: none;

  img {
    width: 50px;
    margin-right: 20px;
    border-radius: 100%;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  width: 640px;
  min-width: 550px;
  height: 50px;
  padding: 0 20px;
  background-color: #fff;
  cursor: pointer;
  border: 1px solid #7579e7;
  border-radius: 8px;

  &:hover {
    border: 1px solid #7579e7;
    box-shadow: rgba(117, 121, 231, 0.4) 0px 0px 0px 3px;
  }
  & div {
    color: #808080;
  }
`;
const ButtonInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default InputformLayout;
