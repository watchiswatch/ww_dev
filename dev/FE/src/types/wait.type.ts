export interface EquipList {
  region: string;
  reader: string;
  name: string;
  gymCode: string | number;
  startTime: string | null;
  userId: string | null;
  waitingList: string[];
  waitingCount: number;
}

export type ReaderStateType = 'using' | 'waitnext' | 'empty';
