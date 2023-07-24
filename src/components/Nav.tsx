import { For, useContext } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';
import { invoke } from '@tauri-apps/api/tauri';
import { CheckCircle, Diamond, Notepad } from 'phosphor-solid';

import { AuthContext } from '../context/AuthContext';
import { Board } from '../types/board';
import cn from '../utils/cn';

const routes = [
  {
    name: 'Tasks',
    path: '/',
    icon: <CheckCircle weight="fill" className="text-gray-900" />,
  },
  {
    name: 'Backlog',
    path: '/about',
    icon: <Notepad weight="fill" className="text-gray-900" />,
  },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [{ token, jiraInstance }] = useContext(AuthContext);

  const query = createQuery<Board>(
    () => ['projects'],
    async () => {
      const data = await invoke<Board>('fetch_boards', { jiraInstance, token });
      return data;
    }
  );

  return (
    <div class="flex h-screen flex-grow flex-col overflow-y-auto bg-white">
      <h1 class="py-4 text-center text-3xl font-bold text-violet-700">godzilla</h1>

      <div class="flex flex-grow flex-col">
        <nav class="mt-2.5 px-2" aria-label="Sidebar">
          <ul class="space-y-1">
            <For each={routes}>
              {route => (
                <li>
                  <A
                    href={route.path}
                    class={cn(
                      pathname === route.path ? `bg-gray-100 text-gray-900 ` : '',
                      'group relative flex w-full cursor-default items-center space-x-2 rounded-md p-1 text-left text-sm font-medium hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-0'
                    )}
                  >
                    <span>{route.icon}</span>
                    <h2>{route.name}</h2>
                  </A>
                </li>
              )}
            </For>
          </ul>

          <div class="mt-6 text-sm">
            <h3 class="mb-2 text-xs">Projects</h3>
            <ul class="space-y-1">
              <For each={query.data?.values}>
                {board => (
                  <li>
                    <A
                      href="/"
                      class={cn(
                        pathname === '/about' ? `bg-gray-100 text-gray-900 ` : '',
                        'group relative flex w-full cursor-default items-center space-x-2 rounded-md p-1 text-left font-medium hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-0'
                      )}
                    >
                      <Diamond weight="fill" class="text-gray-900" />
                      <h2>{board.name}</h2>
                    </A>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
