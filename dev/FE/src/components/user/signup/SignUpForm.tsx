import { checkUserId, signUpUser } from '@/api/userAccountApi';
import FormInput from '@/components/common/FormInput';
import SubmitButton from '@/components/common/SubmitButton';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const [idCheckResponse, setIdResponse] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!errorMessage) {
      // TODO: 회원 가입 처리
      const signUpParam = {
        id: id,
        password: password,
        name: name,
        email: email,
        phone_number: phoneNumber,
        sex: gender,
      };
      console.log(signUpParam);
      signUpUser(signUpParam).then(() => navigate('/user/login'));
    } else {
      alert(errorMessage);
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(event.target.value);
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleMaleClick = () => {
    setGender('남');
  };

  const handleFemaleClick = () => {
    setGender('여');
  };

  useEffect(() => {
    // 모든 필드가 채워졌는지 확인
    if (
      !name ||
      !id ||
      !password ||
      !passwordCheck ||
      !phoneNumber ||
      !email ||
      !gender
    ) {
      setErrorMessage('모든 필드를 채워주세요.');
      return;
    }

    // ID가 알파벳과 숫자로만 구성되어 있는지 확인
    if (!/^[A-Za-z0-9]+$/.test(id)) {
      setErrorMessage('ID는 알파벳과 숫자로만 구성되어야 합니다.');
      return;
    }

    // 비밀번호의 길이가 8자 이상 15자 이하인지 확인
    if (password.length < 8 || password.length > 15) {
      setErrorMessage('비밀번호는 8자 이상 15자 이하이어야 합니다.');
      return;
    }

    // 비밀번호가 일치하는지 확인
    if (password !== passwordCheck) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 전화번호 형식이 맞는지 확인
    if (!/^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/.test(phoneNumber)) {
      setErrorMessage('전화번호 형식이 올바르지 않습니다.');
      return;
    }
    setErrorMessage('');
  }, [name, id, password, passwordCheck, phoneNumber, email, gender]);

  useEffect(() => {
    if (id) {
      checkUserId(id).then((res) => setIdResponse(res));
    } else {
      setIdResponse('');
    }
  }, [id]);

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <FormInput
        type="text"
        value={name}
        onChange={handleNameChange}
        setValueEmpty={() => setName('')}
        placeholder="이 름"
        autoFocus={true}
      />
      <FormInput
        type="text"
        value={id}
        onChange={handleIdChange}
        setValueEmpty={() => setId('')}
        placeholder="아이디"
      />
      <div className="text-red-500">{idCheckResponse}</div>
      <FormInput
        type="password"
        value={password}
        onChange={handlePasswordChange}
        setValueEmpty={() => setPassword('')}
        placeholder="비밀번호 (8자~15자)"
      />
      <FormInput
        type="password"
        value={passwordCheck}
        onChange={handlePasswordCheckChange}
        setValueEmpty={() => setPasswordCheck('')}
        placeholder="비밀번호 확인"
      />
      <FormInput
        type="text"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        setValueEmpty={() => setPhoneNumber('')}
        placeholder="전화번호 (000-0000-000)"
      />
      <FormInput
        type="email"
        value={email}
        onChange={handleEmailChange}
        setValueEmpty={() => setEmail('')}
        placeholder="이메일"
      />
      <GenderSelectButton
        onMaleClick={handleMaleClick}
        onFemaleClick={handleFemaleClick}
        gender={gender}
      />
      <div className="mt-5">
        <SubmitButton
          title="회 원 가 입"
          color="CustomNavy"
          textColor="white"
          width="[200px]"
        />
      </div>
    </form>
  );
};

export default SignUpForm;

interface GenderSelectButtonProps {
  gender: string;
  onMaleClick: () => void;
  onFemaleClick: () => void;
}

const GenderSelectButton = ({
  gender,
  onMaleClick,
  onFemaleClick,
}: GenderSelectButtonProps) => {
  const selectedClass =
    'bg-CustomOrange text-white mx-2 my-2 px-10 py-2 rounded-xl hover:cursor-pointer';
  const unSelectedClass =
    'text-gray-400 bg-white mx-2 my-2 px-10 py-2 rounded-xl hover:cursor-pointer';
  return (
    <div className="flex ">
      <div
        onClick={onMaleClick}
        className={gender === '남' ? selectedClass : unSelectedClass}
      >
        남
      </div>
      <div
        onClick={onFemaleClick}
        className={gender === '여' ? selectedClass : unSelectedClass}
      >
        여
      </div>
    </div>
  );
};
