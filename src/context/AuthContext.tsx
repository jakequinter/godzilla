import { createContext, createEffect, JSX, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useNavigate } from '@solidjs/router';
import { invoke } from '@tauri-apps/api/tauri';

import { User } from '../types/user';

type AuthState = {
  token: string | null;
  jiraInstance: string | null;
  user?: User;
};

type AuthActions = {
  setToken: (token: string) => void;
  setJiraInstance: (jiraInstance: string) => void;
  setUser: (user: User) => void;
  login: (jiraInstance: string, email: string, apiKey: string) => void;
};

type AuthContextValue = [AuthState, AuthActions];

export const AuthContext = createContext<AuthContextValue>([
  { token: '', jiraInstance: '' },
  {
    setToken: () => {},
    setJiraInstance: () => {},
    setUser: () => {},
    login: () => {},
  },
]);

export function AuthProvider(props: { children: JSX.Element }) {
  const navigate = useNavigate();
  const [state, setState] = createStore<AuthState>({
    token: localStorage.getItem('token') || null,
    jiraInstance: localStorage.getItem('jira-instance') || null,
  });

  createEffect(() => {
    if (!state.token || !state.jiraInstance) {
      clearAuth();
      return;
    }

    navigate('/');
  }, [state.token, state.jiraInstance]);

  createEffect(() => {
    const handleCookieChange = () => {
      const authToken = localStorage.getItem('token');
      const authInstance = localStorage.getItem('jira-instance');

      if (!authToken || !authInstance) {
        clearAuth();
      }
    };

    window.addEventListener('storage', handleCookieChange);
    onCleanup(() => {
      window.removeEventListener('storage', handleCookieChange);
    });
  });

  function clearAuth() {
    setState('token', null);
    setState('jiraInstance', null);
    localStorage.removeItem('token');
    localStorage.removeItem('jira-instance');
    navigate('/login');
  }

  const user: AuthContextValue = [
    state,
    {
      setToken: (token: string) => {
        setState('token', token);
      },
      setJiraInstance: (jiraInstance: string) => {
        setState('jiraInstance', jiraInstance);
      },
      setUser: (user: User) => {
        setState('user', user);
      },
      login: async (jiraInstance: string, email: string, apiKey: string) => {
        const token = btoa(`${email}:${apiKey}`);
        try {
          const data = await invoke<User>('myself', { jiraInstance, token });
          setState('jiraInstance', jiraInstance);
          setState('token', token);
          setState('user', data);
          localStorage.setItem('token', token);
          localStorage.setItem('jira-instance', jiraInstance);
        } catch (error) {
          // TODO: show errors
          console.log('error', error);
        }
      },
    },
  ];

  return <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>;
}
