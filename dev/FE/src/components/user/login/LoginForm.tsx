import { loginUser } from '@/api/userAccountApi';
import FormInput from '@/components/common/FormInput';
import SubmitButton from '@/components/common/SubmitButton';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    loginUser({ id: id, password: password })
      .then(() => navigate('/user/information'))
      .catch(() => alert('아이디와 비밀번호를 확인해주세요.'));
  };

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <FormInput
        type="text"
        value={id}
        onChange={handleIdChange}
        setValueEmpty={() => setId('')}
        placeholder="아이디"
        autoFocus={true}
      />
      <FormInput
        type="password"
        value={password}
        onChange={handlePasswordChange}
        setValueEmpty={() => setPassword('')}
        placeholder="비밀번호"
      />
      <div className="my-10">
        <SubmitButton
          title="로 그 인"
          color="CustomOrange"
          textColor="white"
          width="[200px]"
        />
      </div>
    </form>
  );
};

export default LoginForm;
