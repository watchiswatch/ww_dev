export interface User {
  gymName: string;
  name: string;
  regist: number | null;
  subject: string;
}

export interface GymEquipments {
  reader: string;
  region: string;
  name: string;
  gymCode: number;
}

export interface SearchingData {
  now: number | null;
  week: number | null;
  week2: number | null;
  week3: number | null;
}

export interface RankData {
  userId: number;
  id: string;
  second: number;
}
