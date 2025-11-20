import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import LoginPage from './pages/auth/LoginPage';
import UserDashboard from './pages/auth/UserDashboard';
import ProtectedRoute from './ProtectedRoute';
import SettingsPage from './pages/SettingsPage';
import Header from './components/Header';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/members" element={<ProtectedRoute element={<UserDashboard />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<SettingsPage />} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
