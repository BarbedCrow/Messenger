// Register page JavaScript for Simple Go Messenger
// Handles user registration form validation and submission

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const messageContainer = document.getElementById('messageContainer');
    
    if (!registerForm) {
        console.error('Register form not found');
        return;
    }

    // Form fields
    const loginField = document.getElementById('login');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');

    // Validation rules
    const validationRules = {
        login: {
            required: true,
            minLength: 3,
            maxLength: 50,
            label: 'Username',
            pattern: /^[a-zA-Z0-9_-]+$/,
            patternMessage: 'Username can only contain letters, numbers, hyphens, and underscores'
        },
        password: {
            required: true,
            minLength: 6,
            maxLength: 100,
            label: 'Password'
        },
        confirmPassword: {
            required: true,
            label: 'Password confirmation'
        }
    };

    // Real-time validation
    const validateLogin = MessengerUtils.debounce(function() {
        const errors = MessengerUtils.validateField(loginField, validationRules.login);
        MessengerUtils.setFieldError(loginField, errors.length > 0);
        
        if (errors.length > 0) {
            showFieldError(loginField, errors[0]);
        } else {
            clearFieldError(loginField);
        }
    }, 500);

    const validatePassword = MessengerUtils.debounce(function() {
        const errors = MessengerUtils.validateField(passwordField, validationRules.password);
        MessengerUtils.setFieldError(passwordField, errors.length > 0);
        
        if (errors.length > 0) {
            showFieldError(passwordField, errors[0]);
        } else {
            clearFieldError(passwordField);
        }
        
        // Also validate confirm password if it has a value
        if (confirmPasswordField.value) {
            validateConfirmPassword();
        }
    }, 500);

    const validateConfirmPassword = function() {
        const password = passwordField.value;
        const confirmPassword = confirmPasswordField.value;
        
        if (confirmPassword && password !== confirmPassword) {
            MessengerUtils.setFieldError(confirmPasswordField, true);
            showFieldError(confirmPasswordField, 'Passwords do not match');
            return false;
        } else {
            MessengerUtils.setFieldError(confirmPasswordField, false);
            clearFieldError(confirmPasswordField);
            return true;
        }
    };

    // Field error display helpers
    function showFieldError(field, message) {
        let errorEl = field.parentNode.querySelector('.field-error');
        if (!errorEl) {
            errorEl = document.createElement('small');
            errorEl.className = 'field-error';
            errorEl.style.color = '#e53e3e';
            errorEl.style.fontSize = '0.8rem';
            errorEl.style.marginTop = '4px';
            field.parentNode.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }

    function clearFieldError(field) {
        const errorEl = field.parentNode.querySelector('.field-error');
        if (errorEl) {
            errorEl.remove();
        }
    }

    // Event listeners for real-time validation
    loginField.addEventListener('input', validateLogin);
    passwordField.addEventListener('input', validatePassword);
    confirmPasswordField.addEventListener('input', validateConfirmPassword);

    // Form submission
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear any existing messages
        MessengerUtils.clearMessages(messageContainer);
        
        // Validate all fields
        const loginErrors = MessengerUtils.validateField(loginField, validationRules.login);
        const passwordErrors = MessengerUtils.validateField(passwordField, validationRules.password);
        const confirmPasswordErrors = MessengerUtils.validateField(confirmPasswordField, validationRules.confirmPassword);
        
        // Check password confirmation
        const passwordsMatch = validateConfirmPassword();
        
        // Show field errors
        MessengerUtils.setFieldError(loginField, loginErrors.length > 0);
        MessengerUtils.setFieldError(passwordField, passwordErrors.length > 0);
        MessengerUtils.setFieldError(confirmPasswordField, confirmPasswordErrors.length > 0 || !passwordsMatch);

        if (loginErrors.length > 0) {
            showFieldError(loginField, loginErrors[0]);
        } else {
            clearFieldError(loginField);
        }

        if (passwordErrors.length > 0) {
            showFieldError(passwordField, passwordErrors[0]);
        } else {
            clearFieldError(passwordField);
        }

        // If there are validation errors, stop here
        if (loginErrors.length > 0 || passwordErrors.length > 0 || confirmPasswordErrors.length > 0 || !passwordsMatch) {
            MessengerUtils.showMessage(messageContainer, 'Please fix the errors below before submitting', 'error');
            return;
        }

        // Set loading state
        MessengerFormUtils.setFormLoading(registerForm, true);

        try {
            // Prepare registration data
            const registrationData = {
                login: loginField.value.trim(),
                password: passwordField.value
            };

            // Make API request
            const response = await MessengerUtils.makeRequest(MessengerConfig.ENDPOINTS.REGISTER, {
                method: 'POST',
                body: JSON.stringify(registrationData)
            });

            // Handle response
            if (response.ok && response.success !== false) {
                // Success
                MessengerUtils.showMessage(messageContainer, 
                    'Account created successfully! You can now sign in.', 'success');
                
                // Reset form after successful registration
                setTimeout(() => {
                    MessengerFormUtils.resetForm(registerForm);
                    // Optionally redirect to login page
                    // window.location.href = 'login.html';
                }, 2000);
                
            } else {
                // Error from server
                const errorMessage = MessengerUtils.formatErrorMessage(response);
                MessengerUtils.showMessage(messageContainer, errorMessage, 'error');
                
                // If it's a user exists error, focus on the login field
                if (response.message && response.message.toLowerCase().includes('exists')) {
                    loginField.focus();
                    MessengerUtils.setFieldError(loginField, true);
                    showFieldError(loginField, 'This username is already taken');
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            MessengerUtils.showMessage(messageContainer, 
                'An unexpected error occurred. Please try again.', 'error');
        } finally {
            // Remove loading state
            MessengerFormUtils.setFormLoading(registerForm, false);
        }
    });

    // Enhanced UX: Clear server errors when user starts typing
    loginField.addEventListener('input', function() {
        clearFieldError(this);
    });

    passwordField.addEventListener('input', function() {
        clearFieldError(this);
    });

    confirmPasswordField.addEventListener('input', function() {
        clearFieldError(this);
    });

    // Password strength indicator (optional enhancement)
    function checkPasswordStrength(password) {
        let strength = 0;
        const checks = [
            { regex: /.{8,}/, message: 'At least 8 characters' },
            { regex: /[a-z]/, message: 'Lowercase letter' },
            { regex: /[A-Z]/, message: 'Uppercase letter' },
            { regex: /[0-9]/, message: 'Number' },
            { regex: /[^a-zA-Z0-9]/, message: 'Special character' }
        ];

        checks.forEach(check => {
            if (check.regex.test(password)) {
                strength++;
            }
        });

        return {
            score: strength,
            max: checks.length,
            percentage: (strength / checks.length) * 100
        };
    }

    // Optional: Add password strength indicator
    passwordField.addEventListener('input', function() {
        const password = this.value;
        if (password.length > 0) {
            const strength = checkPasswordStrength(password);
            
            // You can add a visual strength indicator here
            // For now, we'll just log it
            console.log(`Password strength: ${strength.score}/${strength.max} (${strength.percentage.toFixed(0)}%)`);
        }
    });

    console.log('Register page initialized');
});
