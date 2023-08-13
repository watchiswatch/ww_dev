import { BASEURL } from '@/constants/url';
import { LoginData, SignUpData } from '@/types/account.type';
import { setStorage } from '@/utils/storage';
import axios from 'axios';

export const loginUser = async (loginData: LoginData) => {
  const res = await axios.post(BASEURL + 'user/login', loginData);
  const setStorageValue = {
    token: res.data.data.token,
    name: res.data.data.name,
    subject: res.data.data.subject,
    gymName: res.data.data.gymName,
    regist: res.data.data.regist,
  };
  setStorage('userToken', setStorageValue);
  if (res.data.data === 'FAIL') throw Error('Login Failed');
  return res.data.data;
};

export const signUpUser = async (signupData: SignUpData) => {
  try {
    const res = await axios.post(BASEURL + 'user/signup', signupData);
    return res.data;
  } catch (err) {
    alert('다시 시도해주세요.');
    throw Error('회원가입 실패');
  }
};

export const checkUserId = async (id: string) => {
  const res = await axios.get(BASEURL + 'user/check?id=' + id);
  return res.data.msg;
};
