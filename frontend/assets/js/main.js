// Main JavaScript for Simple Go Messenger
// Common utilities and shared functionality

// Configuration
const CONFIG = {
    API_BASE_URL: 'http://localhost:8080',
    ENDPOINTS: {
        REGISTER: '/register',
        LOGIN: '/login',
        HEALTH: '/health'
    }
};

// Utility functions
const Utils = {
    // Show message to user
    showMessage(container, message, type = 'info') {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;
        
        // Clear previous messages
        container.innerHTML = '';
        container.appendChild(messageEl);
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 5000);
        }
    },

    // Clear all messages
    clearMessages(container) {
        container.innerHTML = '';
    },

    // Validate form fields
    validateField(field, validationRules) {
        const value = field.value.trim();
        const errors = [];

        // Check required
        if (validationRules.required && !value) {
            errors.push(`${validationRules.label} is required`);
        }

        // Check min length
        if (validationRules.minLength && value.length < validationRules.minLength) {
            errors.push(`${validationRules.label} must be at least ${validationRules.minLength} characters`);
        }

        // Check max length
        if (validationRules.maxLength && value.length > validationRules.maxLength) {
            errors.push(`${validationRules.label} must be no more than ${validationRules.maxLength} characters`);
        }

        // Check pattern
        if (validationRules.pattern && !validationRules.pattern.test(value)) {
            errors.push(validationRules.patternMessage || `${validationRules.label} format is invalid`);
        }

        return errors;
    },

    // Set field error state
    setFieldError(field, hasError) {
        if (hasError) {
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    },

    // Make API request
    async makeRequest(endpoint, options = {}) {
        const url = `${CONFIG.API_BASE_URL}${endpoint}`;
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const requestOptions = { ...defaultOptions, ...options };

        try {
            const response = await fetch(url, requestOptions);
            
            // Parse JSON response
            let data;
            try {
                data = await response.json();
            } catch (e) {
                // If response is not JSON, create a generic error
                data = { 
                    success: false, 
                    message: `Server returned ${response.status}: ${response.statusText}` 
                };
            }

            // Add status information to response data
            data.status = response.status;
            data.ok = response.ok;

            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            return {
                success: false,
                message: 'Network error: Unable to connect to server',
                error: error.message,
                ok: false,
                status: 0
            };
        }
    },

    // Format error message from API response
    formatErrorMessage(response) {
        if (response.message) {
            return response.message;
        }
        if (response.error) {
            return response.error;
        }
        if (!response.ok) {
            return `Server error (${response.status})`;
        }
        return 'An unexpected error occurred';
    },

    // Debounce function for input validation
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Sanitize HTML to prevent XSS
    sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
};

// Form handling utilities
const FormUtils = {
    // Set form loading state
    setFormLoading(form, isLoading) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const inputs = form.querySelectorAll('input');

        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            inputs.forEach(input => input.disabled = true);
            
            // Store original text
            if (!submitBtn.dataset.originalText) {
                submitBtn.dataset.originalText = submitBtn.textContent;
            }
            submitBtn.textContent = 'Please wait...';
        } else {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            inputs.forEach(input => input.disabled = false);
            
            // Restore original text
            if (submitBtn.dataset.originalText) {
                submitBtn.textContent = submitBtn.dataset.originalText;
            }
        }
    },

    // Get form data as object
    getFormData(form) {
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
        }
        return data;
    },

    // Reset form to initial state
    resetForm(form) {
        form.reset();
        
        // Remove error states
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            Utils.setFieldError(input, false);
        });

        // Clear any messages
        const messageContainer = document.getElementById('messageContainer');
        if (messageContainer) {
            Utils.clearMessages(messageContainer);
        }
    }
};

// Initialize common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add focus/blur animations to form inputs
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Set initial state for inputs with values
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to clear messages
        if (e.key === 'Escape') {
            const messageContainer = document.getElementById('messageContainer');
            if (messageContainer) {
                Utils.clearMessages(messageContainer);
            }
        }
    });

    console.log('Simple Go Messenger frontend initialized');
});

// Export utilities for use in other scripts
window.MessengerUtils = Utils;
window.MessengerFormUtils = FormUtils;
window.MessengerConfig = CONFIG;
