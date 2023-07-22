import { createContext, createEffect, JSX, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useNavigate } from '@solidjs/router';
import { invoke } from '@tauri-apps/api/tauri';

import { User } from '../types/user';

type AuthState = {
  token: string | null;
  user?: User;
};

type AuthActions = {
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  login: (email: string, apiKey: string) => void;
};

type AuthContextValue = [AuthState, AuthActions];

export const AuthContext = createContext<AuthContextValue>([
  { token: '' },
  {
    setToken: () => {},
    setUser: () => {},
    login: () => {},
  },
]);

export function AuthProvider(props: { children: JSX.Element }) {
  const navigate = useNavigate();
  const [state, setState] = createStore<AuthState>({
    token: localStorage.getItem('token') || null,
  });

  createEffect(() => {
    if (!state.token) {
      navigate('/login');
      return;
    }

    navigate('/');
  }, [state.token]);

  createEffect(() => {
    const handleCookieChange = () => {
      const newToken = localStorage.getItem('token');
      if (!newToken) {
        navigate('/login');
      }
    };

    window.addEventListener('storage', handleCookieChange);
    onCleanup(() => {
      window.removeEventListener('storage', handleCookieChange);
    });
  });

  const user: AuthContextValue = [
    state,
    {
      setToken: (token: string) => {
        setState('token', token);
      },
      setUser: (user: User) => {
        setState('user', user);
      },
      login: async (email: string, apiKey: string) => {
        const token = btoa(`${email}:${apiKey}`);
        try {
          const data = await invoke<User>('myself', { token });
          setState('token', token);
          setState('user', data);
          localStorage.setItem('token', token);
        } catch (error) {
          console.log('error', error);
        }
      },
    },
  ];

  return <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>;
}
