import { useState } from 'react';

import useAuth from 'hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();

  const [jiraInstance, setJiraInstance] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(jiraInstance, email, token);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-center text-2xl font-bold text-violet-700">godzilla</h1>

      <div className="mx-auto w-full max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="jiraInstance" className="text-sm font-medium text-gray-950">
                JIRA organization
              </label>
            </div>
            <div className="mt-0.5">
              <input
                id="jiraInstance"
                name="jiraInstance"
                type="text"
                placeholder="whitespectre"
                required
                autoFocus
                autoComplete="off"
                spellCheck={false}
                className="transorm-none block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 hover:ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm"
                onChange={e => setJiraInstance(e.currentTarget.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-950">
              JIRA account email
            </label>
            <div className="mt-0.5">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jake@mrryfield.com"
                required
                autoComplete="off"
                spellCheck={false}
                className="transorm-none block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 hover:ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm"
                onChange={e => setEmail(e.currentTarget.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-gray-950">
                API token
              </label>
            </div>
            <div className="mt-0.5">
              <input
                id="token"
                name="token"
                type="password"
                placeholder="gElzkvUaRmhcYIjOxWqS..."
                required
                autoComplete="off"
                spellCheck={false}
                className="transorm-none block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 hover:ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm"
                onChange={e => setToken(e.currentTarget.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-8 flex w-full justify-center rounded-md bg-violet-700 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-violet-400"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
