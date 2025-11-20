import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import LoginForm from './pages/auth/LoginForm';
import SignupForm from './pages/auth/SignupForm';
import UserDashboard from './pages/auth/UserDashboard';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import SettingsPage from './pages/SettingsPage';
import Header from './components/Header';
import AuthRoute from './pages/auth/AuthRoute';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<AuthRoute element={<LoginForm />} />} />
          <Route path="/register" element={<AuthRoute element={<SignupForm />} />} />
          <Route path="/members" element={<ProtectedRoute element={<UserDashboard />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<SettingsPage />} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
