// src/context/authContext.js

import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { getUsernameFromEmail } from '../utils/welcome';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return token && !isTokenExpired(token);
  });
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isOnAdminPage = window.location.pathname.startsWith('/admin');

    if (isOnAdminPage) {
      if (!token || isTokenExpired(token)) {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        navigate('/admin/login');
      } else {
        setIsAuthenticated(true);
        const decoded = jwtDecode(token);
        const email = decoded.email;
        setUsername(getUsernameFromEmail(email));
      }
    }
  }, [navigate]);

  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    const email = decoded.email;
    setUsername(getUsernameFromEmail(email));
    navigate('/admin');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (error) {
    return true;
  }
};
