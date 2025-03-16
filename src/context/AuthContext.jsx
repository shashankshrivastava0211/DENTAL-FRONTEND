import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('simpleAuth') === 'true';
  });

  const login = () => {
    localStorage.setItem('simpleAuth', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('simpleAuth');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
