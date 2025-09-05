import React, { createContext, useContext, useState } from 'react';
import type { AuthContextType, User, LoginFormData } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('authToken');
    return !!token;
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<void> => {
    // Demo login - acepta cualquier email y contraseña
    return new Promise((resolve) => {
      setTimeout(() => {
        // Crear usuario basado en el email proporcionado
        const mockUser: User = {
          id: Date.now().toString(),
          email: email,
          name: email.split('@')[0] || 'Usuario IoT',
          role: 'user'
        };
        
        const mockToken = 'demo-token-' + Date.now();
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setUser(mockUser);
        setIsAuthenticated(true);
        resolve();
      }, 1500); // Delay para mostrar la animación de "Conectando..."
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
