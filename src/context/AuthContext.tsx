import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { invoke } from '@tauri-apps/api/tauri';

import type { User } from 'types/user';

type AuthContextProps = {
  token: string | null;
  jiraInstance: string | null;
  user: User | null;
  login: (jiraInstance: string, email: string, apiKey: string) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  jiraInstance: null,
  user: null,
  login: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [jiraInstance, setJiraInstance] = useState<string | null>(
    localStorage.getItem('jira-instance')
  );

  useEffect(() => {
    if (!token || !jiraInstance) {
      clearAuth();
      return;
    }

    navigate('/');
  }, []);

  useEffect(() => {
    const handleCookieChange = () => {
      const authToken = localStorage.getItem('token');
      const authInstance = localStorage.getItem('jira-instance');

      if (!authToken || !authInstance) {
        clearAuth();
      }
    };

    window.addEventListener('storage', handleCookieChange);

    return () => {
      window.removeEventListener('storage', handleCookieChange);
    };
  }, []);

  function clearAuth() {
    setToken(null);
    setJiraInstance(null);
    localStorage.removeItem('token');
    localStorage.removeItem('jira-instance');
    navigate('/login');
  }

  const login = async (jiraInstance: string, email: string, apiKey: string) => {
    const token = btoa(`${email}:${apiKey}`);

    try {
      const data = await invoke<User>('myself', { jiraInstance, token });
      setJiraInstance(jiraInstance);
      setToken(token);
      setUser(data);
      localStorage.setItem('token', token);
      localStorage.setItem('jira-instance', jiraInstance);
      navigate('/');
    } catch (error) {
      // TODO: show errors
      console.log('error', error);
    }
  };

  // const logout = () => {
  //   localStorage.removeItem('token');
  //   setToken(null);
  //   setUser(null);
  //   navigate('/login');
  // };

  return (
    <AuthContext.Provider
      value={{
        token,
        jiraInstance,
        user,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
