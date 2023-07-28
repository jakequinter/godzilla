import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Diamond, Notepad } from '@phosphor-icons/react';

import cn from 'utils/cn';

import useProjects from 'hooks/useProjects';

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
  const { projects } = useProjects();

  return (
    <div className="flex h-screen flex-grow flex-col overflow-y-auto bg-white">
      <h1 className="py-4 text-center text-3xl font-bold text-violet-700">godzilla</h1>

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

          <div className="mt-6 text-sm">
            <h3 className="mb-2 text-xs">Projects</h3>
            <ul className="space-y-1">
              {projects.map(project => (
                <li>
                  <Link
                    to={`/projects/${project.activeSprintId}`}
                    className={cn(
                      pathname.includes(project.activeSprintId.toString())
                        ? `bg-gray-100 text-gray-900 `
                        : '',
                      'group relative flex w-full cursor-default items-center space-x-2 rounded-md p-1 text-left font-medium hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-0'
                    )}
                  >
                    <Diamond weight="fill" className="text-gray-900" />
                    <h2>{project.name}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
