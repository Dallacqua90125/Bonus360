import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Verificar se existe um token no localStorage
    const token = localStorage.getItem('token');
    
    // Se não estamos na página de login e não temos token, redireciona para login
    if (!token && location.pathname !== '/login') {
      navigate('/login');
    } else if (token) {
      // Se temos token, carrega os dados do usuário
      setUser({
        email: localStorage.getItem('userEmail'),
        name: 'Usuário Demo',
      });
    }
    
    setLoading(false);
  }, [navigate, location.pathname]);

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
      navigate('/dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
    navigate('/login');
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