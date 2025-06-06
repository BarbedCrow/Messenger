package auth

import (
	"fmt"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

// HashPassword hashes a password using bcrypt
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

// ValidatePassword validates password requirements
func ValidatePassword(password string) error {
	if strings.TrimSpace(password) == "" {
		return fmt.Errorf("password is required")
	}
	if len(password) < 6 {
		return fmt.Errorf("password must be at least 6 characters long")
	}
	if len(password) > 100 {
		return fmt.Errorf("password must be no more than 100 characters long")
	}
	return nil
}

// ValidateLogin validates login requirements
func ValidateLogin(login string) error {
	if strings.TrimSpace(login) == "" {
		return fmt.Errorf("login is required")
	}
	if len(login) < 3 {
		return fmt.Errorf("login must be at least 3 characters long")
	}
	if len(login) > 50 {
		return fmt.Errorf("login must be no more than 50 characters long")
	}
	return nil
}
