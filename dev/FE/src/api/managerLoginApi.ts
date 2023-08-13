import { BASEURL } from '@/constants/url';
import { LoginData } from '@/types/account.type';
import axios from 'axios';

const managerLoginApi = async (loginData: LoginData) => {
  const url = BASEURL + 'admin/login';
  const response = await axios.post(url, loginData);
  if (response.data.data === 'FAIL') throw Error('Login Failed');
  return response.data;
};

export default managerLoginApi;
