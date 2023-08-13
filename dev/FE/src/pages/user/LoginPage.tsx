import LoginForm from '@/components/user/login/LoginForm';
import OnboardingContainer from '@/components/common/OnboardingContainer';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <OnboardingContainer>
      <LoginForm />
      <div>
        <span className="mr-4">계정이 없으신가요?</span>
        <Link to={'/user/signup'}>
          <span className="italic text-CustomOrange underline">회원가입</span>
        </Link>
      </div>
    </OnboardingContainer>
  );
};

export default LoginPage;
