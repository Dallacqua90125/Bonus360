import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se existe um token no localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Simular dados do usuário
      setUser({
        email: localStorage.getItem('userEmail'),
        name: 'Usuário Demo',
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simular uma chamada de API
    if (email && password) {
      const fakeToken = 'fake-jwt-token-' + Math.random();
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('userEmail', email);
      setUser({
        email,
        name: 'Usuário Demo',
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 