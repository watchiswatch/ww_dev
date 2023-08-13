import React, { ReactNode, useState } from 'react';
import AuthContext from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const loginCheck = () => {
    const loginData = localStorage.getItem('managerToken');
    if (loginData === null) {
      return false;
    } else {
      return true;
    }
  };

  const [isLoggedIn, setLoggedIn] = useState(loginCheck);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
