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
  return (
    <DashboardContainer>
      <DashboardCard>
        <DashboardTitle>Dashboard</DashboardTitle>
      </DashboardCard>
    </DashboardContainer>
  );
}

export default UserDashboard;
