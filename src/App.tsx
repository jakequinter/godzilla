import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Container from './components/Container';
import { AuthProvider } from './context/AuthContext';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';

const client = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<AuthedRoute />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

const AuthedRoute = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};
