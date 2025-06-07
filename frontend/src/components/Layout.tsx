import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Header,
  Title,
  Nav,
  NavLink,
  Main,
  Footer,
} from '../styles/components';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <Container>
      <Header>
        <Title>Simple Go Messenger</Title>
        <Nav>
          <NavLink
            href="/"
            $active={isActive('/')}
            onClick={handleNavClick('/')}
          >
            Home
          </NavLink>
          <NavLink
            href="/register"
            $active={isActive('/register')}
            onClick={handleNavClick('/register')}
          >
            Register
          </NavLink>
          <NavLink
            href="/login"
            $active={isActive('/login')}
            onClick={handleNavClick('/login')}
          >
            Login
          </NavLink>
        </Nav>
      </Header>

      <Main>
        {children}
      </Main>

      <Footer>
        <p>&copy; 2024 Simple Go Messenger. Built with ❤️ using Go and React.</p>
      </Footer>
    </Container>
  );
};

export default Layout;
