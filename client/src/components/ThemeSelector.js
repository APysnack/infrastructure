import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const SelectorContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;

  border-color: ${(props) => props.$borderColor};
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: none;
  }

  option {
    background-color: #2c2f33;
    color: #dcddde;
  }
`;

export const ThemeSelector = () => {
  const { currentTheme, switchTheme, availableThemes } = useTheme();
  const { colors } = useTheme().theme;

  const themeLabels = {
    'discord-dark': 'Discord Dark',
    'modern-slate': 'Modern Slate',
    'minimalist-blue': 'Minimalist Blue',
    'modern-teal': 'Modern Teal',
    'purple': 'Purple',
  };

  return (
    <SelectorContainer>
      <Select
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
