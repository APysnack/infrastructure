import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { LogoutButton } from '../pages/auth/ThemeableDashboardComponents';
import { useTheme } from '../context/ThemeContext';
import { SIGN_OUT_MUTATION, GET_CURRENT_USER } from '../utils/graphqlQueries';
import { HeaderBar, Brand, Logo, Title, Actions, ActionItem } from './Header.styles';
import { MembersIcon, LogoutIcon, SettingsIcon, AtomLogo } from './icons';

function Header({ title }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const location = useLocation();
  const colors = theme?.colors || {};

  const [signOut, { loading: isLoggingOut }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      navigate('/', { replace: true });
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      navigate('/', { replace: true });
    },
  });

  const actionItems = [
    { label: 'Members', to: '/members', icon: MembersIcon },
    { label: 'Settings', to: '/settings', icon: SettingsIcon },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error during logout:', error);
      navigate('/', { replace: true });
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <HeaderBar $background={colors.card} $border={colors.divider}>
      <Brand onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <Logo $logoBackground={colors.primaryButton} $logoColor={colors.text}>
          <AtomLogo size={36} color={colors.text} />
        </Logo>
        <Title $color={colors.text}>{title || 'Ethos'}</Title>
      </Brand>

      <Actions>
        {actionItems.map((item) => {
          const isActive =
            location.pathname === item.to || location.pathname.startsWith(item.to + '/');
          return (
            <ActionItem
              key={item.to}
              onClick={() => navigate(item.to)}
              $active={isActive}
              $color={colors.textSecondary}
              $colorActive={colors.text}
              $activeBg={colors.primaryButtonHover || colors.primaryButton}
              $hoverBg={colors.primaryButtonHover || colors.primaryButton}
              title={item.label}
            >
              <item.icon color={isActive ? colors.text : colors.textSecondary} />
            </ActionItem>
          );
        })}
        <LogoutButton onClick={handleLogout} disabled={isLoggingOut} title="Log out">
          <LogoutIcon color="white" />
        </LogoutButton>
      </Actions>
    </HeaderBar>
  );
}

export default Header;
