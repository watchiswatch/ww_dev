export interface MemberInfo {
  deviceCode: string | null;
  email: string;
  gymCode: number;
  id: string;
  name: string;
  password: string;
  phoneNumber: string;
  regist: number;
  sex: string;
  userId: number;
}

export interface UnAuthorizedUser {
  name: string;
  userId: string;
  id: string;
  date: string | null;
}

export interface aboutDevice {
  deviceCode: string;
  id: string;
}

export interface Device {
  deviceCode: string;
}
