import { createContext } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setLoggedIn: (isLoggedIn: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: true,
  setLoggedIn: () => {},
});

export default AuthContext;
