import { A, useLocation } from '@solidjs/router';
import { CheckCircle, Notepad } from 'phosphor-solid';

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

const projects = [
  {
    name: 'Merryfield Web Apps',
    path: '/project1',
    icon: <CheckCircle weight="fill" className="text-gray-900" />,
  },
  {
    name: 'Merryfield Platform',
    path: '/project2',
    icon: <Notepad weight="fill" className="text-gray-900" />,
  },
];

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <div class="flex h-screen flex-grow flex-col overflow-y-auto bg-white">
      <h1 class="py-4 text-center text-3xl font-bold text-violet-700">godzilla</h1>

      <div class="flex flex-grow flex-col">
        <nav class="mt-2.5 px-2" aria-label="Sidebar">
          <ul class="space-y-1">
            {routes.map(route => (
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
            ))}
          </ul>

          <div class="mt-6 text-sm">
            <h3 class="mb-2 text-xs">Projects</h3>
            <ul class="space-y-1">
              {projects.map(route => (
                <li>
                  <A
                    href={route.path}
                    class={cn(
                      pathname === route.path ? `bg-gray-100 text-gray-900 ` : '',
                      'group relative flex w-full cursor-default items-center space-x-2 rounded-md p-1 text-left font-medium hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-0'
                    )}
                  >
                    <span>{route.icon}</span>
                    <h2>{route.name}</h2>
                  </A>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
