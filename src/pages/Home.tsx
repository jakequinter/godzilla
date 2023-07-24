import { A } from '@solidjs/router';

import Container from '../components/Container';

export default function Home() {
  return (
    <Container>
      <h1 class="text-3xl font-semibold text-violet-600">Home</h1>
      <A href="/about">go to about</A>
    </Container>
  );
}
