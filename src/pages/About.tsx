import { A } from '@solidjs/router';

import Container from '../components/Container';

export default function About() {
  return (
    <Container>
      <h1>About</h1>
      <A href="/">go home</A>
    </Container>
  );
}
