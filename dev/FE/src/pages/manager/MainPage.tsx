import AuthContext from '@/components/common/AuthContext';
import ContactSection from '@/components/manager/main/ContactSection';
import ServiceSection from '@/components/manager/main/ServiceSection';
import TitleSection from '@/components/manager/main/TitleSection';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const MainPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/member');
    }
  }, []);

  return (
    <>
      <div>
        <TitleSection />
        <ServiceSection />
        <ContactSection />
      </div>
    </>
  );
};

export default MainPage;
