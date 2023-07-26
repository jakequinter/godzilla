import { useContext } from 'react';

import { AuthContext } from 'context/AuthContext';

export default function useAuth() {
  const { token, jiraInstance, user, login } = useContext(AuthContext);

  return { token, jiraInstance, user, login };
}
