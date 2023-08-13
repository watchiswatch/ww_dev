import { getToken } from '@/utils/storage';
import { BASEURL } from '@/constants/url';
import axios from 'axios';

export const recordApi = async (date: Object) => {
  try {
    const token = getToken('userToken');
    const res = await axios.get(BASEURL + 'user/records', {
      params: date,
      headers: {
        Authorization: `Bearer ${token}`, // Token을 헤더에 추가
      },
    });
    return res.data;
  } catch (err) {}
};
export default recordApi;
