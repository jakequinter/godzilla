import Nav from './Nav';

export default function Container({ children }) {
  return (
    <div>
      <div class="fixed inset-y-0 flex w-44 flex-col">
        <div class="flex min-h-0 flex-1 flex-col border-r">
          <Nav />
        </div>
      </div>
      <div class="flex flex-1 flex-col pl-44">
        <main class="min-h-screen flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
