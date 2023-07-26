import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Notepad } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/tauri';

import cn from 'utils/cn';

import useAuth from 'hooks/useAuth';
import useBoards from 'hooks/useBoards';

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
  const { token, jiraInstance } = useAuth();
  const { boards } = useBoards();

  const [boardId, setBoardId] = useState<string | null>();

  const { data } = useQuery({
    queryKey: ['current-sprint', boardId],
    queryFn: async () => await invoke('fetch_board', { token, jiraInstance, boardId }),
    enabled: !!token && !!jiraInstance && !!boardId,
  });

  return (
    <div className="flex h-screen flex-grow flex-col overflow-y-auto bg-white">
      <h1 className="py-4 text-center text-3xl font-bold text-violet-700">godzilla</h1>

      <div className="p-1">
        <select
          name="location"
          className="block w-full rounded-md border-0 p-0.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={e => setBoardId(e.target.value)}
        >
          {boards.map(board => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-grow flex-col">
        <nav className="mt-2.5 px-2" aria-label="Sidebar">
          <ul className="space-y-1">
            {routes.map(route => (
              <li key={route.name}>
                <Link
                  to={route.path}
                  className={cn(
                    pathname === route.path ? `bg-gray-100 text-gray-900 ` : '',
                    'group relative flex w-full cursor-default items-center space-x-2 rounded-md p-1 text-left text-sm font-medium hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-0'
                  )}
                >
                  <span>{route.icon}</span>
                  <h2>{route.name}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
