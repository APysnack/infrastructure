import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import LoginPage from './pages/auth/LoginPage';
import UserDashboard from './pages/auth/UserDashboard';
import ProtectedRoute from './ProtectedRoute';
import { isAuthenticated } from './utils/api';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated() ? <Navigate to="/members" replace /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/login" 
            element={isAuthenticated() ? <Navigate to="/members" replace /> : <LoginPage />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated() ? <Navigate to="/members" replace /> : <LoginPage />} 
          />
          <Route path="/members" element={<ProtectedRoute element={<UserDashboard />} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
