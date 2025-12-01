import { CSRFTokenQuery, currentUserQuery } from "@/api/authentication";
import type { User } from "@/graphql/graphql";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  loggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  user: null,
  login: (_) => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isSuccess: csrfReady } = useQuery(CSRFTokenQuery);

  const { data } = useQuery({
    ...currentUserQuery,
    enabled: csrfReady,
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (data?.me?.name) {
      setLoggedIn(true);
      setUser(data.me);
    } else {
      setLoggedIn(false);
      setUser(null);
    }
  }, [data]);

  const login = (user: User) => {
    setLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
