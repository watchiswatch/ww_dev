import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './userNavbar.css';
import moment from 'moment';
import { useState } from 'react';
import Modal from './Modal';

const UserNavBar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('userToken');
    navigate('/user/login');
  };
  const currentPath = useLocation().pathname;

  const currentMonth: string = moment(new Date()).format('YYYY-MM');
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <div className="fixed bottom-0 w-full">
      {isModal && (
        <Modal isOpen={isModal} onClose={() => setIsModal(false)}>
          <div className="w-[280px] h-[200px] bg-CustomNavy rounded-lg flex flex-wrap justify-evenly">
            <span className="w-[240px] h-[100px] py-10 text-lg font-bold align-middle text-center text-white">
              로그아웃 하시겠습니까?
            </span>
            <div
              className="w-[100px] h-[40px] bg-CustomOrange rounded-2xl flex justify-center items-center text-white font-bold"
              onClick={() => setIsModal(false)}
            >
              아니오
            </div>
            <button
              className="w-[100px] h-[40px] rounded-2xl flex justify-center items-center bg-white text-CustomNavy font-bold"
              onClick={logOut}
            >
              예
            </button>
          </div>
        </Modal>
      )}
      <nav className="h-[60px] bg-CustomNavy text-white userNavbar flex justify-evenly items-center text-center">
        <NavLink
          className={`w-[48px] ${
            currentPath.includes('record') &&
            !currentPath.includes('record/' + currentMonth)
              ? 'active'
              : ''
          }`}
          to="record/"
        >
          <span>운동</span>
          <br />
          <span>기록</span>
        </NavLink>
        <NavLink
          className={`w-[48px] ${
            currentPath.includes('information') ? 'active' : ''
          }`}
          to="information/"
        >
          <span>실시간</span>
          <br />
          <span>현황</span>
        </NavLink>
        <NavLink
          className={`w-[48px] ${
            currentPath.includes('record/' + currentMonth) ? 'active' : ''
          }`}
          to={`/user/record/${currentMonth}`}
        >
          <span>월별</span>
          <br />
          <span>통계</span>
        </NavLink>
        <div onClick={() => setIsModal(true)} className=" w-[48px] fontBungee">
          <img src="/img/navbar/sign-out.png" alt="" />
        </div>
      </nav>
    </div>
  );
};

export default UserNavBar;
