type SettingKey = 'managerToken' | 'userToken';

export const getToken = (name: SettingKey): string | null => {
  const managerToken = localStorage.getItem(name);
  if (managerToken) {
    return JSON.parse(managerToken).token;
  } else {
    return null;
  }
};

export const getName = (name: SettingKey): string | null => {
  const managerToken = localStorage.getItem(name);
  if (managerToken) {
    return JSON.parse(managerToken).name;
  } else {
    return null;
  }
};

export const setStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
