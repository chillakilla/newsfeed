import React, { Children } from 'react';
import styled from 'styled-components';
import Inputform from './Inputform';
import { openInputmodal, closeInputModal } from 'redux/modules/modal';
import { useDispatch, useSelector } from 'react-redux';
import { showPublicModal } from 'redux/modules/publicModal';
import PublicModal from './PublicModal';
import { closePublicModal } from 'redux/modules/publicModal';
import { useNavigate } from 'react-router-dom';

function Modal() {
  const publicmodal = useSelector((state) => state.publicModal);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const openPublicModal = () => {
    const goOut = () => {
      dispatch(closePublicModal());
      dispatch(closeInputModal());
      navigator('/');
    };

    const stayModal = () => {
      dispatch(closePublicModal());
    };

    dispatch(
      showPublicModal({
        isUse: true,
        title: '😯 정말 나가시겠어요?',
        message: '저장하지 않은 내용은 사라져요.',
        btnMsg: '계속 작성',
        btnFn: stayModal,
        btnMsg2: '나가기',
        btnFn2: goOut
      })
    );
  };

  const closeModal_outside = (event) => {
    if (event.target === event.currentTarget) {
      openPublicModal();
    }
  };

  return (
    <>
      {publicmodal.isUse && <PublicModal />}

      <BackGround onClick={(event) => closeModal_outside(event)}>
        <Container>
          <Button onClick={openPublicModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <g clip-path="url(#clip0_4_436)">
                <path
                  d="M17.7363 16.4628C17.8199 16.5464 17.8862 16.6457 17.9315 16.755C17.9767 16.8642 18 16.9813 18 17.0995C18 17.2178 17.9767 17.3349 17.9315 17.4441C17.8862 17.5534 17.8199 17.6526 17.7363 17.7363C17.6526 17.8199 17.5534 17.8862 17.4441 17.9315C17.3349 17.9767 17.2178 18 17.0995 18C16.9813 18 16.8642 17.9767 16.755 17.9315C16.6457 17.8862 16.5464 17.8199 16.4628 17.7363L9 10.2723L1.53716 17.7363C1.3683 17.9051 1.13926 18 0.90045 18C0.661636 18 0.432603 17.9051 0.263736 17.7363C0.0948685 17.5674 4.7076e-09 17.3384 0 17.0995C-4.7076e-09 16.8607 0.0948685 16.6317 0.263736 16.4628L7.72769 9L0.263736 1.53716C0.0948685 1.3683 -1.7793e-09 1.13926 0 0.90045C1.7793e-09 0.661636 0.0948685 0.432603 0.263736 0.263736C0.432603 0.0948685 0.661636 1.77931e-09 0.90045 0C1.13926 -1.7793e-09 1.3683 0.0948685 1.53716 0.263736L9 7.72769L16.4628 0.263736C16.6317 0.0948685 16.8607 -4.7076e-09 17.0995 0C17.3384 4.7076e-09 17.5674 0.0948685 17.7363 0.263736C17.9051 0.432603 18 0.661636 18 0.90045C18 1.13926 17.9051 1.3683 17.7363 1.53716L10.2723 9L17.7363 16.4628Z"
                  fill="#AAAAAA"
                />
              </g>
              <defs>
                <clipPath id="clip0_4_436">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Button>

          <Inputform />
        </Container>
      </BackGround>
    </>
  );
}

const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: saturate(180%) blur(8px);
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  border: none;
`;

const Container = styled.div`
  width: 560px;
  height: auto;
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
`;

const Button = styled.button`
  position: absolute;
  right: 10px;
  top: 20px;
  padding: 10px;
  font-weight: 700;
  border-radius: 12px;
  background: unset;
  cursor: pointer;
`;

export default Modal;
