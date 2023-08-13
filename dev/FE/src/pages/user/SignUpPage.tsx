import OnboardingContainer from '@/components/common/OnboardingContainer';
import SignUpForm from '@/components/user/signup/SignUpForm';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  return (
    <OnboardingContainer>
      <SignUpForm />
      <Link to="/user/login" className="mt-5 italic underline text-blue-600">
        {'<- 로그인으로 돌아가기'}
      </Link>
    </OnboardingContainer>
  );
};

export default SignUpPage;
