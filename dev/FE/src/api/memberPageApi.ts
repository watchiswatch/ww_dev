import axios from 'axios';
import { MemberInfo, UnAuthorizedUser, Device } from '@/types/member.type';
import { getToken } from '@/utils/storage';
import { BASEURL } from '@/constants/url';

// 회원정보 리스트 불러오는 api
const getUserLists = async (): Promise<MemberInfo[]> => {
  const token = getToken('managerToken');
  const response = await axios.get<MemberInfo[]>(BASEURL + 'admin/users/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 미승인 회원 리스트 불러오는 api
const getUnAuthorizedUsers = async (): Promise<UnAuthorizedUser[]> => {
  const token = getToken('managerToken');
  const response = await axios.get<UnAuthorizedUser[]>(
    BASEURL + 'admin/unauthorized-users',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// 디바이스 매칭 제거 api
const deleteDevice = async (id: string, device_code: string | null) => {
  const token = getToken('managerToken');
  const response = await axios.put(
    BASEURL + 'devices/',
    {
      device_code: device_code,
      id: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// 디바이스 매칭 api
const matchDevice = async (id: string, device_code: string | null) => {
  const token = getToken('managerToken');
  const response = await axios.put(
    BASEURL + 'devices/match/',
    {
      device_code: device_code,
      id: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// 디바이스 리스트 api
const deviceLists = async (): Promise<Device[]> => {
  const token = getToken('managerToken');
  const response = await axios.get<Device[]>(BASEURL + 'devices/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 회원해제 api
const changeUserGym = async (id: string) => {
  const response = await axios.put(BASEURL + 'admin/users/', {
    id: id,
  });
  return response.data;
};

// 회원 승인 api
const approveUserGym = async (id: string) => {
  const token = getToken('managerToken');
  const response = await axios.put(
    BASEURL + 'admin/approval/',
    {
      id: id,
    },
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    },
  );

  return response.data;
};

export {
  getUserLists,
  getUnAuthorizedUsers,
  deleteDevice,
  matchDevice,
  deviceLists,
  changeUserGym,
  approveUserGym,
};
