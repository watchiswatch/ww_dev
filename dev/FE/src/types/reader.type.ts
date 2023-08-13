export interface Reader {
  region: string | null;
  reader: string;
  name: string | null;
  gym_code: string;
}

export interface Zone {
  name: string;
  isSelected: boolean;
}
