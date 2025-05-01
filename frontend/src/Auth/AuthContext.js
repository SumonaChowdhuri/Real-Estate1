import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Initial token check:', token);
    if (token) {
      setIsAuthenticated(true);
      // You could also fetch user data here if needed
    }
  }, []);

  const login = (token, userData = null) => {
    console.log('Saving token to localStorage:', token);
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    if (userData) {
      setUser(userData);
    }
    // Redirect to home page after login
    navigate('/', { replace: true });
  };

  const logout = () => {
    console.log('Logging out user');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    // Redirect to SignIn page after logout
    navigate('/SignIn', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 