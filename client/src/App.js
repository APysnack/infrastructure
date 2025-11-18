import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import UserDashboard from './pages/auth/UserDashboard';
import ProtectedRoute from './ProtectedRoute';
import { isAuthenticated } from './utils/api';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated() ? <Navigate to="/members" replace /> : <Navigate to="/register" replace />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated() ? <Navigate to="/members" replace /> : <LoginPage />} 
        />
        <Route path="/members" element={<ProtectedRoute element={<UserDashboard />} />} />
      </Routes>
    </Router>
  );
}

export default App;
