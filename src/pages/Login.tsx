import { createSignal, useContext } from 'solid-js';

import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [jiraInstance, setJiraInstance] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [token, setToken] = createSignal('');
  const [, { login }] = useContext(AuthContext);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    login(jiraInstance(), email(), token());
  };

  return (
    <div class="flex min-h-screen flex-col items-center justify-center">
      <h1 class="mb-8 text-center text-2xl font-bold text-violet-700">godzilla</h1>

      <div class="mx-auto w-full max-w-sm">
        <form class="space-y-4" onsubmit={handleSubmit}>
          <div>
            <div class="flex items-center justify-between">
              <label for="jiraInstance" class="text-sm font-medium text-gray-950">
                JIRA organization
              </label>
            </div>
            <div class="mt-0.5">
              <input
                id="jiraInstance"
                name="jiraInstance"
                type="text"
                placeholder="whitespectre"
                required
                autofocus
                autocomplete="off"
                spellcheck={false}
                class="transorm-none block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 hover:ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm"
                onChange={e => setJiraInstance(e.currentTarget.value)}
              />
            </div>
          </div>

          <div>
            <label for="email" class="text-sm font-medium text-gray-950">
              JIRA account email
            </label>
            <div class="mt-0.5">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jake@mrryfield.com"
                required
                autocomplete="off"
                spellcheck={false}
                class="transorm-none block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 hover:ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm"
                onChange={e => setEmail(e.currentTarget.value)}
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="text-sm font-medium text-gray-950">
                API token
              </label>
            </div>
            <div class="mt-0.5">
              <input
                id="token"
                name="token"
                type="password"
                placeholder="gElzkvUaRmhcYIjOxWqS..."
                required
                autocomplete="off"
                spellcheck={false}
                class="transorm-none block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 hover:ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm"
                onChange={e => setToken(e.currentTarget.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="mt-8 flex w-full justify-center rounded-md bg-violet-700 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-violet-400"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
