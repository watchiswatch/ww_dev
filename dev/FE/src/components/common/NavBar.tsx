import '@/components/common/navbar.css';
import { NavLink } from 'react-router-dom';
import AuthContext from './AuthContext';
import AuthProvider from './AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext, FormEvent, ChangeEvent } from 'react';
import FormInput from './FormInput';

import managerLoginApi from '@/api/managerLoginApi';
export default function Root() {
  // 로그인 여부 확인용
  const { isLoggedIn, setLoggedIn } = useContext(AuthContext);

  // 라우터 이동시 해당 라우터에 css 활성화하는 로직 (현재 location 확인하여 비교)
  const [clickedLinks, setClickedLinks] = useState<number>(0);
  const pathList: string[] = ['/member', '/equipment', '/usage', '/waitlist'];
  const currentPath = useLocation().pathname;
  let currentPage: number = pathList.indexOf(currentPath);
  useEffect(() => {
    currentPage = pathList.indexOf(currentPath);
    setClickedLinks(currentPage);
  }, [currentPath]);

  if (currentPage === -1) {
    currentPage = 3;
  }
  const handleAnchorClick = (index: number) => {
    setClickedLinks((): number => {
      return index;
    });
  };

  // 로그인 정보 및 로그인 로직
  const navigate = useNavigate();
  const [managerId, setManagerId] = useState<string>('');
  const [placeName, setPlaceName] = useState<string | null>('');
  const [managerPassword, setManagerPassword] = useState<string>('');

  useEffect(() => {
    const localJSON = localStorage.getItem('managerToken');
    if (localJSON) {
      setPlaceName(JSON.parse(localJSON).name);
    }
    setClickedLinks(currentPage);
  }, []);

  const handleManagerLogIn = (event: FormEvent) => {
    event.preventDefault();
    managerLoginApi({ id: managerId, password: managerPassword })
      .then((response) => {
        const managerToken = {
          token: response.data.token,
          subject: response.data.subject,
          name: response.data.name,
        };
        localStorage.setItem('managerToken', JSON.stringify(managerToken));
        setPlaceName(response.data.name);
        setClickedLinks(0);
        setLoggedIn(true);
        navigate('/member');
      })
      .catch((error) => {
        console.log(error);
        alert('아이디 또는 비밀번호를 확인하세요!');
      });
  };

  const handleManagerIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setManagerId(event.target.value);
  };

  const handleManagerPasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setManagerPassword(event.target.value);
  };

  // 로그아웃 로직
  const handleManagerLogout = () => {
    localStorage.removeItem('managerToken');
    setLoggedIn(false);
    navigate('/');
    setManagerId('');
    setManagerPassword('');
  };

  return (
    <AuthProvider>
      <nav
        className="flex justify-between items-center w-[80%] md:w-[100%] mx-auto bg-CustomNavy shadow-md shadow-black"
        style={{ maxWidth: '1440px' }}
      >
        <div className="flex flex-col text-white font-Bungee ml-6 my-3 me-8">
          <span className="md:text-4xl md:ml-[7px] text-xl ml-[2px] tracking-widest">
            WAIT
          </span>
          <span className="md:text-3xl text-md">WEIGHT</span>
        </div>
        {isLoggedIn ? (
          <div className="w-full flex justify-between">
            <div className="flex">
              <span className="my-auto mx-4">
                <NavLink
                  to="/member"
                  className={
                    0 === clickedLinks
                      ? 'activeLink'
                      : 'noactive hover:text-CustomOrange'
                  }
                  onClick={() => handleAnchorClick(0)}
                >
                  회원 관리
                </NavLink>
              </span>
              <span className="my-auto mx-4">
                <NavLink
                  to="/equipment"
                  className={
                    1 === clickedLinks
                      ? 'activeLink'
                      : 'noactive hover:text-CustomOrange'
                  }
                  onClick={() => handleAnchorClick(1)}
                >
                  기구 관리
                </NavLink>
              </span>
              <span className="my-auto mx-4">
                <NavLink
                  to="/usage"
                  className={
                    2 === clickedLinks
                      ? 'activeLink'
                      : 'noactive hover:text-CustomOrange'
                  }
                  onClick={() => handleAnchorClick(2)}
                >
                  이용 현황
                </NavLink>
              </span>
              <span className="my-auto mx-4">
                <NavLink
                  to="/waitlist"
                  className={
                    3 == clickedLinks
                      ? 'activeLink'
                      : 'noactive hover:text-CustomOrange'
                  }
                  onClick={() => handleAnchorClick(3)}
                >
                  대기 현황
                </NavLink>
              </span>
            </div>
            <div className="flex items-center font-Jeju text-[20px] text-white">
              <span className="mr-4 font-bold italic">{placeName}</span>
              <span>님 환영합니다!</span>
              <button
                className="mx-3 text-[24px] bg-CustomNavy border-0 transition-colors duration-300 hover:text-CustomOrange"
                onClick={handleManagerLogout}
              >
                <p className="font-Bungee ">logout</p>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="md:block hidden">
              <div className="flex items-center">
                <span className="text-white font-Bungee text-2xl mx-3 ">
                  ID
                </span>
                <FormInput
                  type="text"
                  value={managerId}
                  width={150}
                  onChange={handleManagerIdChange}
                />
                <span className="text-white font-Bungee text-2xl ml-8 mr-3 ">
                  pw
                </span>
                <FormInput
                  type="password"
                  value={managerPassword}
                  width={150}
                  onChange={handleManagerPasswordChange}
                />
                <button
                  className="mx-5 py-1 px-4 bg-CustomNavy hover:bg-white text-white hover:text-CustomNavy text-2xl font-Bungee"
                  onClick={handleManagerLogIn}
                >
                  Login
                </button>
              </div>
            </div>
            <div className="md:hidden">
              <div className="flex items-center">
                <button
                  className="mx-5 py-2 px-4 flex flex-col items-center bg-white text-CustomNavy text-lg font-Jeju font-bold"
                  onClick={() => navigate('/user/information')}
                >
                  <span>GO</span>
                </button>
              </div>
            </div>
          </>
        )}
      </nav>
    </AuthProvider>
  );
}
