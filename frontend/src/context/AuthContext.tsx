import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { UserResponse } from '../types/auth';
import { getUser } from '../api/authApi';

interface AuthContextType {
  user: UserResponse | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  useEffect(() => {
    const fetchUser = async () => {
      // Token varsa ve henüz kullanıcı verisi yoksa kullanıcıyı getir
      if (token && !user) {
        try {
          const userData = await getUser();
          setUser(userData);
        } catch (error: any) {
          console.error("Failed to fetch user, logging out.", error);
          logout(); // Token geçersizse çıkış yap
        }
      }
    };
    fetchUser();
  }, [token, user]);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken); // 1. localStorage'a kaydet
    setToken(newToken);                    // 2. State'i güncelle
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  // Kullanıcının doğrulanıp doğrulanmadığını belirle
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};