import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import type { UserLogin } from '../services/api';
import {
  FormContainer,
  FormCard,
  FormTitle,
  FormSubtitle,
  Form,
  FormGroup,
  Label,
  Input,
  FormHelp,
  FieldError,
  Button,
  MessageContainer,
  Message,
} from '../styles/components';

interface FormErrors {
  login?: string;
  password?: string;
}

interface FormData {
  login: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    login: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Validation rules
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'login':
        if (!value.trim()) return 'Username is required';
        break;
      case 'password':
        if (!value) return 'Password is required';
        break;
    }
    return undefined;
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Clear server messages when user starts typing
    if (message) {
      setMessage(null);
    }
  };

  // Handle input blur for real-time validation
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormData, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    newErrors.login = validateField('login', formData.login);
    newErrors.password = validateField('password', formData.password);
    
    setErrors(newErrors);
    
    return !Object.values(newErrors).some(error => error !== undefined);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any existing messages
    setMessage(null);
    
    // Validate form
    if (!validateForm()) {
        setMessage({ text: 'Please fill in all required fields', type: 'error' });
        return;
    }
    
    setIsLoading(true);
    
    try {
        const loginData: UserLogin = {
        login: formData.login.trim(),
        password: formData.password,
        };
      
        const response = await apiService.login(loginData);
        if (response.success !== false) {
            setMessage({ 
            text: 'You successfully signed in', 
            type: 'success' 
            });

            setFormData({ login: '', password: '' });
            setErrors({});
            if (response.data && response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }
            //   navigate('/dashboard');
        }   
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormCard>
        <FormTitle>Welcome Back</FormTitle>
        <FormSubtitle>Sign in to your account</FormSubtitle>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="login">Username</Label>
            <Input
              type="text"
              id="login"
              name="login"
              value={formData.login}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="Enter your username"
              $error={!!errors.login}
              disabled={isLoading}
            />
            {errors.login && <FieldError>{errors.login}</FieldError>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="Enter your password"
              $error={!!errors.password}
              disabled={isLoading}
            />
            {errors.password && <FieldError>{errors.password}</FieldError>}
          </FormGroup>
          
          <Button
            type="submit"
            $fullWidth
            $loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Form>
        
        <MessageContainer>
          {message && (
            <Message $type={message.type}>
              {message.text}
            </Message>
          )}
        </MessageContainer>
        
        <p style={{ textAlign: 'center', marginTop: '25px', color: '#718096', fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <a 
            href="/register" 
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
            style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}
          >
            Create one here
          </a>
        </p>
      </FormCard>
    </FormContainer>
  );
};

export default Login;
