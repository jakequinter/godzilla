import { A } from '@solidjs/router';
import { createQuery } from '@tanstack/solid-query';

import Container from '../components/Container';

export default function Home() {
  const query = createQuery(
    () => ['repoData'],
    async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      return response.json();
    }
  );

  console.log('query', query.data);

  return (
    <Container>
      <h1 class="text-3xl font-semibold text-violet-600">Home</h1>
      <A href="/about">go to about</A>
    </Container>
  );
}
