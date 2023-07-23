import { Route, Routes } from '@solidjs/router';

import { AuthProvider } from './context/AuthContext';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
