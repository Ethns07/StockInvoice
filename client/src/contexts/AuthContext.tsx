import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

interface AuthContextType {
  user: any;
  jwt: string | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState<string | null>(() =>
    localStorage.getItem("jwt")
  );
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const storedJwt = localStorage.getItem("jwt");
      if (storedJwt) {
        try {
          const { data } = await api.get("/users/me");
          setUser(data);
          setJwt(storedJwt);
        } catch (error) {
          localStorage.removeItem("jwt");
          setUser(null);
          setJwt(null);
        }
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const login = async (identifier: string, password: string) => {
    const { data } = await api.post("/auth/local", { identifier, password });
    localStorage.setItem("jwt", data.jwt);
    setUser(data.user);
    setJwt(data.jwt);
    navigate("/dashboard");
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    await api.post("/auth/local/register", { username, email, password });
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    setJwt(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        jwt,
        isAuthenticated: !!jwt,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
