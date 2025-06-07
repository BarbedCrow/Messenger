import styled from 'styled-components';

// Theme colors
export const colors = {
  primary: '#667eea',
  primaryDark: '#764ba2',
  secondary: '#4a5568',
  success: '#48bb78',
  error: '#e53e3e',
  warning: '#ed8936',
  info: '#4299e1',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  white: '#ffffff',
  gray50: '#f7fafc',
  gray100: '#edf2f7',
  gray200: '#e2e8f0',
  gray300: '#cbd5e0',
  gray400: '#a0aec0',
  gray500: '#718096',
  gray600: '#4a5568',
  gray700: '#2d3748',
  gray800: '#1a202c',
  gray900: '#171923',
};

// Layout Components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

// Header Components
export const Header = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  margin: 20px 0;
  padding: 20px 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const Title = styled.h1`
  color: ${colors.gray700};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 15px;
  text-align: center;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

export const NavLink = styled.a<{ $active?: boolean }>`
  color: ${props => props.$active ? colors.primary : colors.secondary};
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: ${props => props.$active ? '600' : '500'};
  background: ${props => props.$active ? 'rgba(102, 126, 234, 0.15)' : 'transparent'};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${colors.primary};
    background: rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
  }
`;

// Form Components
export const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
`;

export const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const FormTitle = styled.h2`
  color: ${colors.gray700};
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
`;

export const FormSubtitle = styled.p`
  color: ${colors.gray500};
  text-align: center;
  margin-bottom: 30px;
  font-size: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  color: ${colors.secondary};
  font-weight: 600;
  font-size: 0.9rem;
`;

export const Input = styled.input<{ $error?: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.$error ? colors.error : colors.gray200};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: ${props => props.$error ? `0 0 0 3px rgba(229, 62, 62, 0.1)` : 'none'};

  &:focus {
    outline: none;
    border-color: ${props => props.$error ? colors.error : colors.primary};
    box-shadow: 0 0 0 3px ${props => props.$error ? 'rgba(229, 62, 62, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
    background: white;
  }

  &::placeholder {
    color: ${colors.gray400};
  }
`;

export const FormHelp = styled.small`
  color: ${colors.gray500};
  font-size: 0.8rem;
  margin-top: 2px;
`;

export const FieldError = styled.small`
  color: ${colors.error};
  font-size: 0.8rem;
  margin-top: 4px;
`;

// Button Components
export const Button = styled.button<{ 
  $variant?: 'primary' | 'secondary' | 'outline';
  $size?: 'small' | 'medium' | 'large';
  $fullWidth?: boolean;
  $loading?: boolean;
}>`
  padding: ${props => {
    switch (props.$size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};
  border: ${props => {
    switch (props.$variant) {
      case 'outline': return `2px solid ${colors.primary}`;
      default: return 'none';
    }
  }};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.$loading ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  opacity: ${props => props.$loading ? 0.6 : 1};
  position: relative;
  overflow: hidden;

  background: ${props => {
    switch (props.$variant) {
      case 'secondary': return colors.gray200;
      case 'outline': return 'transparent';
      default: return `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`;
    }
  }};

  color: ${props => {
    switch (props.$variant) {
      case 'secondary': return colors.gray700;
      case 'outline': return colors.primary;
      default: return colors.white;
    }
  }};

  box-shadow: ${props => {
    switch (props.$variant) {
      case 'outline':
      case 'secondary': return 'none';
      default: return `0 4px 15px rgba(102, 126, 234, 0.3)`;
    }
  }};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${props => {
      switch (props.$variant) {
        case 'outline': return `0 4px 15px rgba(102, 126, 234, 0.2)`;
        case 'secondary': return `0 4px 15px rgba(0, 0, 0, 0.1)`;
        default: return `0 8px 25px rgba(102, 126, 234, 0.4)`;
      }
    }};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
    transform: none;
  }

  ${props => props.$loading && `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: loading 1.5s infinite;
    }

    @keyframes loading {
      to {
        left: 100%;
      }
    }
  `}
`;

// Message Components
export const MessageContainer = styled.div`
  margin: 20px 0;
  min-height: 20px;
`;

export const Message = styled.div<{ $type: 'success' | 'error' | 'info' | 'warning' }>`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-weight: 500;
  animation: slideIn 0.3s ease;

  background: ${props => {
    switch (props.$type) {
      case 'success': return 'rgba(72, 187, 120, 0.1)';
      case 'error': return 'rgba(229, 62, 62, 0.1)';
      case 'warning': return 'rgba(237, 137, 54, 0.1)';
      default: return 'rgba(66, 153, 225, 0.1)';
    }
  }};

  color: ${props => {
    switch (props.$type) {
      case 'success': return '#2f855a';
      case 'error': return '#c53030';
      case 'warning': return '#c05621';
      default: return '#2b6cb0';
    }
  }};

  border: ${props => {
    switch (props.$type) {
      case 'success': return '1px solid rgba(72, 187, 120, 0.2)';
      case 'error': return '1px solid rgba(229, 62, 62, 0.2)';
      case 'warning': return '1px solid rgba(237, 137, 54, 0.2)';
      default: return '1px solid rgba(66, 153, 225, 0.2)';
    }
  }};

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Footer Component
export const Footer = styled.footer`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  margin: 20px 0;
  padding: 20px;
  text-align: center;
  color: ${colors.gray500};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

// Home Page Components
export const HeroSection = styled.section`
  text-align: center;
  padding: 60px 20px;
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: ${colors.white};
  margin-bottom: 20px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

// Responsive breakpoints
export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px',
};