import { getToken } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const UserAuthGuard = () => {
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    const token = getToken('userToken');
    if (!token) {
      navigate('/user/login');
    } else {
      setIsAuthChecked(true);
    }
  }, [navigate]);

  if (isAuthChecked) return <Outlet />;
  else return <div>로그인이 필요합니다.</div>;
};

export default UserAuthGuard;
