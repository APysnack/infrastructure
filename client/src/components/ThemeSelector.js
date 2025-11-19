import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const SelectorContainer = styled.div`
  position: ${(p) => (p.$inline ? 'static' : 'absolute')};
  top: ${(p) => (p.$inline ? 'auto' : '20px')};
  right: ${(p) => (p.$inline ? 'auto' : '20px')};
  z-index: 1000;
  display: ${(p) => (p.$inline ? 'inline-block' : 'block')};
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.18s;

  border-color: ${(props) => props.$borderColor};
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};

  &:hover {
    opacity: 0.98;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.04);
  }

  option {
    /* keep default colors so the native select shows readable options */
  }
`;

export const ThemeSelector = ({ inline = false, ariaLabel = 'Select theme' }) => {
  const { currentTheme, switchTheme, availableThemes } = useTheme();
  const { colors } = useTheme().theme;

  const themeLabels = {
    'discord-dark': 'Discord Dark',
    'modern-slate': 'Modern Slate',
    'minimalist-blue': 'Minimalist Blue',
    'modern-teal': 'Modern Teal',
    'purple-theme': 'Purple Theme',
  };

  return (
    <SelectorContainer $inline={inline}>
      <Select
        aria-label={ariaLabel}
        value={currentTheme}
        onChange={(e) => switchTheme(e.target.value)}
        $backgroundColor={colors.card}
        $borderColor={colors.cardBorder || colors.inputBorder}
        $textColor={colors.text}
      >
        {availableThemes.map((theme) => (
          <option key={theme} value={theme}>
            {themeLabels[theme]}
          </option>
        ))}
      </Select>
    </SelectorContainer>
  );
};

export default ThemeSelector;
