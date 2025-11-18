import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../utils/api';
import ThemeSelector from '../../components/ThemeSelector';
import {
  DashboardContainer,
  DashboardCard,
  DashboardTitle,
  LogoutButton,
} from './ThemeableDashboardComponents';

function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/', { replace: true });
    }
  };

  return (
    <DashboardContainer>
      <ThemeSelector />
      <DashboardCard>
        <DashboardTitle>Dashboard</DashboardTitle>
        <LogoutButton onClick={handleLogout}>
          Log Out
        </LogoutButton>
      </DashboardCard>
    </DashboardContainer>
  );
}

export default UserDashboard;
