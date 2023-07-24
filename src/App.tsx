import { Route, Routes } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

import { AuthProvider } from './context/AuthContext';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
