import { BASEURL } from '@/constants/url';
import { getToken } from '@/utils/storage';
import axios from 'axios';

export const getRank = async (date: string) => {
  try {
    const token = getToken('userToken');
    if (!token) return;
    const res = await axios.get(BASEURL + 'user/rank', {
      params: { date: date },
      headers: {
        Authorization: `Bearer ${token}`, // Token을 헤더에 추가
      },
    });
    return res.data;
  } catch (err) {
    console.log('getReaders err: ', err);
  }
};
