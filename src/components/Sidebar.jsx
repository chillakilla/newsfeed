import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getAll, getCU, getGS, getSeven, getEmart, getMinistop } from 'redux/modules/filterConfig';
import cu from '../assets/cu.png';
import gs25 from '../assets/gs25.png';
import seven from '../assets/seven.png';
import ministop from '../assets/ministop.png';
import emart24 from '../assets/emart24.png';

const StSidebarDiv = styled.div`
  width: 240px;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.06);
  border-radius: 15px;

  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-580px);
  padding: 20px 0;

  @media (max-width: 1200px) {
    left: 10px;
    transform: unset;
  }
  @media (max-width: 850px) {
    display: none;
  }

  p {
    color: #7579e7;
    padding: 0 20px;
  }
  li {
    cursor: pointer;
    padding: 14px 20px;
    transition: all 0.2s;
  }
  li:nth-child(2) {
    position: relative;
  }
  li:nth-child(2)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    display: block;
    width: 38.961px;
    height: 24px;
    background: url(${cu}) no-repeat;
  }
  li:nth-child(3) {
    position: relative;
  }
  li:nth-child(3)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    display: block;
    width: 66px;
    height: 22px;
    background: url(${seven}) no-repeat;
  }
  li:nth-child(4) {
    position: relative;
  }
  li:nth-child(4)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    display: block;
    width: 41.227px;
    height: 13px;
    background: url(${gs25}) no-repeat;
  }
  li:nth-child(5) {
    position: relative;
  }
  li:nth-child(5)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    display: block;
    width: 30.984px;
    height: 20px;
    background: url(${ministop}) no-repeat;
  }
  li:nth-child(6) {
    position: relative;
  }
  li:nth-child(6)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    display: block;
    width: 59.564px;
    height: 12px;
    background: url(${emart24}) no-repeat;
  }
  li:nth-child(1):hover {
    background: #f1f4fd;
    font-weight: bold;
  }
  li:nth-child(2):hover {
    background: #bedd4d;
    color: #652b90;
    font-weight: bold;
  }
  li:nth-child(3):hover {
    background: #0fac4d;
    color: #ffa12e;
    font-weight: bold;
  }
  li:nth-child(4):hover {
    background: #1d88fc;
    color: #b9fffc;
    font-weight: bold;
  }
  li:nth-child(5):hover {
    background: #ffd21e;
    color: #1846a5;
    font-weight: bold;
  }
  li:nth-child(6):hover {
    background: #818181;
    color: #ffb035;
    font-weight: bold;
  }
`;

function Sidebar() {
  const dispatch = useDispatch();
  const onCUclick = () => {
    dispatch(getCU());
  };
  const onSevElevclick = () => {
    dispatch(getSeven());
  };
  const onGSclick = () => {
    dispatch(getGS());
  };
  const onMSclick = () => {
    dispatch(getMinistop());
  };
  const onEmartclick = () => {
    dispatch(getEmart());
  };
  const onAllclick = () => {
    dispatch(getAll());
  };

  return (
    <StSidebarDiv>
      <p>🎇편의점 선택</p>
      <br />
      <ul>
        <li onClick={onAllclick}>전체보기</li>
        <li onClick={onCUclick}>CU </li>
        <li onClick={onSevElevclick}>세븐일레븐</li>
        <li onClick={onGSclick}>GS</li>
        <li onClick={onMSclick}>미니스탑</li>
        <li onClick={onEmartclick}>이마트24</li>
      </ul>
    </StSidebarDiv>
  );
}

export default Sidebar;
