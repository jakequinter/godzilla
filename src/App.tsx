import { Route, Routes } from '@solidjs/router'; // 👈 Import the A component

import About from './pages/About';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </Routes>
  );
}

export default App;
