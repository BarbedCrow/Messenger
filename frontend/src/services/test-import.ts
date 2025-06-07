// Test file to verify imports
import { apiService, UserRegistration, UserLogin } from './api';

console.log('apiService:', apiService);
console.log('UserRegistration type imported successfully');
console.log('UserLogin type imported successfully');

// Test type usage
const testUser: UserRegistration = {
  login: 'test',
  password: 'test123'
};

console.log('Test user created:', testUser);
