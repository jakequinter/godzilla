import { JSX } from 'solid-js';

import Nav from './Nav';

type Props = {
  children: JSX.Element;
};

export default function Container({ children }: Props) {
  return (
    <div>
      <div class="fixed inset-y-0 flex w-48 flex-col">
        <div class="flex min-h-0 flex-1 flex-col border-r">
          <Nav />
        </div>
      </div>
      <div class="flex flex-1 flex-col pl-48">
        <main class="min-h-screen flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
