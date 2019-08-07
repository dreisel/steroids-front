import React, { useState, useEffect } from 'react';
import { apiService } from '../services';

const isInitiallyAuthenticated: boolean = !!localStorage.getItem('isAuthenticated');

interface IAppContext {
    setAuthenticated(status: boolean): void
    authenticated: boolean
}

export const AppContext = React.createContext<IAppContext>({} as IAppContext);

export const AppContextProvider: React.FC<{}> = ({ children }) => {
    const [ authenticated, setAuthenticated ] = useState<boolean>(isInitiallyAuthenticated);

    useEffect(() => {
        apiService.subscribeToUnauthorized(() => {
            setAuthenticated(false);
        });
    }, []);

    useEffect(() => {
        localStorage.setItem('isAuthenticated', Date.now().toString());
    }, [authenticated]);
    return <AppContext.Provider
        value={{
            authenticated,
            setAuthenticated,
        }}
    >
        {children}
    </AppContext.Provider>;
};
