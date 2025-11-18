import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../utils/api';

function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/register', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/register', { replace: true });
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default UserDashboard;
