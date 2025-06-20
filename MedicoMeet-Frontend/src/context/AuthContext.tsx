import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user and auth context types
type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  loading: false,
  error: null,
});

// Context provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would verify the JWT token with the backend
        const storedUser = localStorage.getItem('medicomeet_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Mock login function - would connect to Java backend in real implementation
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic - replace with actual API call
      if (email === 'admin@medicomeet.com' && password === 'admin123') {
        const adminUser = { 
          id: '1', 
          name: 'Admin User', 
          email: 'admin@medicomeet.com', 
          role: 'admin' as const 
        };
        setUser(adminUser);
        localStorage.setItem('medicomeet_user', JSON.stringify(adminUser));
      } else if (email === 'user@example.com' && password === 'password') {
        const regularUser = { 
          id: '2', 
          name: 'John Doe', 
          email: 'user@example.com', 
          role: 'user' as const 
        };
        setUser(regularUser);
        localStorage.setItem('medicomeet_user', JSON.stringify(regularUser));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError((err as Error).message);
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration logic - replace with actual API call
      const newUser = { 
        id: Math.random().toString(36).substring(2, 9), 
        name, 
        email, 
        role: 'user' as const 
      };
      
      setUser(newUser);
      localStorage.setItem('medicomeet_user', JSON.stringify(newUser));
    } catch (err) {
      setError((err as Error).message);
      console.error('Registration failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('medicomeet_user');
  };

  // Derived state
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  // Context value
  const value = {
    user,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);