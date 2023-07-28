import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AboutPage from 'pages/AboutPage';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import ProjectPage from 'pages/ProjectPage';

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
              <Route path="/login" element={<LoginPage />} />

              <Route path="/" element={<AuthedRoute />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="/projects/:projectId" element={<Outlet />}>
                  <Route index element={<ProjectPage />} />
                </Route>
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
