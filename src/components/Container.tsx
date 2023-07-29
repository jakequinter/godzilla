import { Spinner } from '@phosphor-icons/react';

import useProjects from 'hooks/useProjects';

import Nav from './Nav';

type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props) {
  const { loading } = useProjects();

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-1">
        <Spinner className="animate-spin text-violet-400" size={24} />
        <p className="text-violet-400">Loading your projects...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="fixed inset-y-0 flex w-48 flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r">
          <Nav />
        </div>
      </div>
      <div className="flex flex-1 flex-col pl-48">
        <main className="min-h-screen flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
