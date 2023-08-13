import { BASEURL } from '@/constants/url';
import { Reader } from '@/types/reader.type';
import { getToken } from '@/utils/storage';
import axios from 'axios';

export const getReaders = async () => {
  try {
    const token = getToken('managerToken');
    if (!token) return;
    const res = await axios.get(BASEURL + 'readers', {
      headers: {
        Authorization: `Bearer ${token}`, // Token을 헤더에 추가
      },
    });
    return res.data;
  } catch (err) {
    console.log('getReaders err: ', err);
  }
};

export const putReaders = async (jsonData: Reader[]) => {
  try {
    const res = await axios.put(BASEURL + 'readers', jsonData);
    console.log('putReaders: ', res);
  } catch (err) {
    console.log('putReaders: ', err);
  }
};
