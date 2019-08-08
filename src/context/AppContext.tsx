import React, { useState, useEffect } from 'react';
import { apiService, authService } from '../services';
import { User } from '../types/auth';

interface IAppContext {
  isLoading: boolean;
  setUser(user: User): void;
  user?: User;
}

export const AppContext = React.createContext<IAppContext>({} as IAppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setLoading] = useState<boolean>(true);

  async function getUser() {
    setLoading(true);
    try {
      const user = await authService.getUser();
      setUser(user);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    apiService.subscribeToUnauthorized(() => {
      setUser(undefined);
    });
    getUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        user,
        setUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
