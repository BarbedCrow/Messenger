package models

// User represents a user in the system
type User struct {
	ID       int    `json:"id"`
	Login    string `json:"login"`
	Password string `json:"password_hash"` // Don't include in JSON responses
}

// UserRegistration represents the registration request
type UserRegistration struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

// UserLogin represents the login request
type UserLogin struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}
