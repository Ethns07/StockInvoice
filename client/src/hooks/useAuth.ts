
import { useState, useEffect } from 'react';
import { mockUser } from '@/lib/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 1000);
  }, []);

  const login = async () => {
    setLoading(true);
    setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
}
