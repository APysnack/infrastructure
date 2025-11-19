import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from '../components/ThemeSelector';

const Container = styled.div`
  min-height: calc(100vh - 64px);
  padding: 40px 20px;
  background: ${(p) => p.$background};
  color: ${(p) => p.$color};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
`;

const Card = styled.div`
  background: ${(p) => p.$card};
  border: 1px solid ${(p) => p.$border};
  border-radius: 12px;
  padding: 28px;
  max-width: 920px;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.12);
`;

const Heading = styled.h2`
  margin: 0 0 16px 0;
  color: ${(p) => p.$color};
  font-size: 20px;
`;

const Sub = styled.p`
  margin: 0 0 18px 0;
  color: ${(p) => p.$subColor};
`;

export default function SettingsPage() {
  const { theme } = useTheme();
  const colors = theme?.colors || {};

  return (
    <Container $background={colors.background} $color={colors.text}>
      <Card $card={colors.card} $border={colors.divider}>
        <Heading $color={colors.text}>Settings</Heading>
        <Sub $subColor={colors.textSecondary}>
          Adjust your preferences and theme settings. This page is a starting point — I can add
          toggles and controls you want (profile, notifications, security).
        </Sub>
        <section>
          <h3 style={{ marginTop: 0, color: colors.text }}>Theme</h3>
          <p style={{ color: colors.textSecondary }}>
            Change your app theme from the header selector.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 12 }}>
            <div style={{ minWidth: 120, fontWeight: 600, color: colors.text }}>Appearance</div>
            <ThemeSelector inline ariaLabel="Select appearance theme" />
          </div>
        </section>
      </Card>
    </Container>
  );
}
