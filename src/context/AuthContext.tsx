import { createContext, createEffect, JSX } from 'solid-js';
import { createStore } from 'solid-js/store';

type AuthState = {
  email: string;
  token: string;
};

type AuthActions = {
  setEmail: (email: string) => void;
  setToken: (token: string) => void;
  login: (email: string, token: string) => void;
};

type AuthContextValue = [AuthState, AuthActions];

export const AuthContext = createContext<AuthContextValue>([
  { email: '', token: '' },
  {
    setEmail: () => {},
    setToken: () => {},
    login: () => {},
  },
]);

export function AuthProvider(props: { children: JSX.Element }) {
  const [state, setState] = createStore<AuthState>({ email: '', token: '' });

  createEffect(() => {
    // TODO: figure out logic when we get there
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
  });

  const user: AuthContextValue = [
    state,
    {
      setEmail: (email: string) => {
        setState('email', email);
      },
      setToken: (token: string) => {
        setState('token', token);
      },
      login: (email: string, token: string) => {
        localStorage.setItem('email', email);
        localStorage.setItem('token', token);
      },
    },
  ];

  return <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>;
}
