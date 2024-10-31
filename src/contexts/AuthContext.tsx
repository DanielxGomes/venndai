import { createContext, useContext, useState, ReactNode } from 'react';
import { verifyCredentials, registerUser, AuthError } from '../services/auth';

interface User {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await verifyCredentials(email, password);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      if (error instanceof AuthError) {
        throw new Error(error.message);
      }
      throw new Error('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would integrate with Google OAuth
      throw new Error('Login com Google ainda não está disponível');
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao fazer login com Google');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await registerUser(name, email, password);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      if (error instanceof AuthError) {
        throw new Error(error.message);
      }
      throw new Error('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        isLoading, 
        user, 
        login, 
        loginWithGoogle,
        register,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}