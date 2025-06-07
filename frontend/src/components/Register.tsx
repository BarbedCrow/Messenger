import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import type { UserRegistration } from '../services/api';
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
  confirmPassword?: string;
}

interface FormData {
  login: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    login: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Validation rules
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'login':
        if (!value.trim()) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (value.length > 50) return 'Username must be no more than 50 characters';
        if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
          return 'Username can only contain letters, numbers, hyphens, and underscores';
        }
        break;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        if (value.length > 100) return 'Password must be no more than 100 characters';
        break;
      case 'confirmPassword':
        if (!value) return 'Password confirmation is required';
        if (value !== formData.password) return 'Passwords do not match';
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
    newErrors.confirmPassword = validateField('confirmPassword', formData.confirmPassword);
    
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
      setMessage({ text: 'Please fix the errors below before submitting', type: 'error' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const registrationData: UserRegistration = {
        login: formData.login.trim(),
        password: formData.password,
      };
      
      const response = await apiService.register(registrationData);
      
      if (response.success !== false) {
        setMessage({ 
          text: 'Account created successfully! You can now sign in.', 
          type: 'success' 
        });
        
        // Reset form
        setFormData({ login: '', password: '', confirmPassword: '' });
        setErrors({});
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
        
        // If it's a user exists error, highlight the login field
        if (errorMessage.toLowerCase().includes('exists')) {
          setErrors(prev => ({ ...prev, login: 'This username is already taken' }));
        }
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
        <FormTitle>Create Account</FormTitle>
        <FormSubtitle>Join Simple Go Messenger today</FormSubtitle>
        
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
            <FormHelp>Username must be 3-50 characters long</FormHelp>
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
            <FormHelp>Password must be at least 6 characters long</FormHelp>
            {errors.password && <FieldError>{errors.password}</FieldError>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="Confirm your password"
              $error={!!errors.confirmPassword}
              disabled={isLoading}
            />
            {errors.confirmPassword && <FieldError>{errors.confirmPassword}</FieldError>}
          </FormGroup>
          
          <Button
            type="submit"
            $fullWidth
            $loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
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
          Already have an account?{' '}
          <a 
            href="/login" 
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
            style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}
          >
            Sign in here
          </a>
        </p>
      </FormCard>
    </FormContainer>
  );
};

export default Register;