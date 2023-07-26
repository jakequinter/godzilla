import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import About from 'pages/About';
import Home from 'pages/Home';
import Login from 'pages/Login';

import { AuthProvider } from 'context/AuthContext';
import { ProjectProvider } from 'context/ProjectContext';

import Container from 'components/Container';

const client = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <ProjectProvider>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/" element={<AuthedRoute />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
              </Route>
            </Routes>
          </ProjectProvider>
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
