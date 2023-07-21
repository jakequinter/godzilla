import { createContext, createEffect, JSX, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useNavigate } from '@solidjs/router';

type AuthState = {
  token: string | null;
};

type AuthActions = {
  setToken: (token: string) => void;
  login: (email: string, apiKey: string) => void;
};

type AuthContextValue = [AuthState, AuthActions];

export const AuthContext = createContext<AuthContextValue>([
  { token: '' },
  {
    setToken: () => {},
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
      login: (email: string, apiKey: string) => {
        const token = btoa(`${email}:${apiKey}`);
        setState('token', token);
        localStorage.setItem('token', token);
      },
    },
  ];

  return <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>;
}
