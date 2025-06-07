import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import {
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  ButtonGroup,
  Button,
  FormCard,
  MessageContainer,
  Message,
} from '../styles/components';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [serverStatus, setServerStatus] = useState<'checking' | 'healthy' | 'error'>('checking');

  useEffect(() => {
    // Check server health on component mount
    const checkServerHealth = async () => {
      try {
        await apiService.healthCheck();
        setServerStatus('healthy');
      } catch (error) {
        console.error('Server health check failed:', error);
        setServerStatus('error');
      }
    };

    checkServerHealth();
  }, []);

  return (
    <>
      <HeroSection>
        <HeroTitle>Simple Go Messenger</HeroTitle>
        <HeroSubtitle>
          A modern, real-time messaging application built with Go backend and React frontend.
          Connect with friends and colleagues in a simple, secure environment.
        </HeroSubtitle>
        
        <ButtonGroup>
          <Button 
            $size="large" 
            onClick={() => navigate('/register')}
          >
            Get Started
          </Button>
          <Button 
            $variant="outline" 
            $size="large"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        </ButtonGroup>
      </HeroSection>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
        <FormCard>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#2d3748' }}>
            Server Status
          </h3>
          
          <MessageContainer>
            {serverStatus === 'checking' && (
              <Message $type="info">Checking server connection...</Message>
            )}
            {serverStatus === 'healthy' && (
              <Message $type="success">✅ Server is running and healthy</Message>
            )}
            {serverStatus === 'error' && (
              <Message $type="error">❌ Unable to connect to server. Please make sure the Go server is running on port 8080.</Message>
            )}
          </MessageContainer>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#4a5568', marginBottom: '15px' }}>Features:</h4>
            <ul style={{ color: '#718096', lineHeight: '1.8' }}>
              <li>🔐 Secure user registration and authentication</li>
              <li>💬 Real-time messaging (coming soon)</li>
              <li>👥 User management</li>
              <li>🎨 Modern, responsive React interface</li>
              <li>⚡ Fast Go backend with SQLite database</li>
              <li>🔒 Password hashing with bcrypt</li>
            </ul>
          </div>

          <div style={{ marginTop: '25px', textAlign: 'center' }}>
            <Button 
              $variant="secondary" 
              onClick={() => window.open('https://github.com', '_blank')}
            >
              View Source Code
            </Button>
          </div>
        </FormCard>
      </div>
    </>
  );
};

export default Home;
