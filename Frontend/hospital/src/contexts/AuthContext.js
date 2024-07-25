import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:4000/protected', { withCredentials: true });
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    console.log("isAuthenticated: ", isAuthenticated);
    console.log("User: ", user);
  }, [isAuthenticated, user]);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:4000/login', { email, password }, { withCredentials: true });
    setUser(res.data.user);
    setIsAuthenticated(true);
  };

  const register = async (name, email, password) => {
    const res = await axios.post('http://localhost:4000/register', { name, email, password }, { withCredentials: true });
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post('http://localhost:4000/logout', {}, { withCredentials: true });
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
