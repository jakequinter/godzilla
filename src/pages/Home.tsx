import { A } from '@solidjs/router';

export default function Home() {
  return (
    <div>
      <h1 class="text-3xl font-semibold text-violet-600">Home</h1>
      <A href="/about">go to about</A>
    </div>
  );
}
