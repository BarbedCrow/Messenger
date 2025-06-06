package database

import "errors"

var (
	// ErrUserExists is returned when trying to create a user that already exists
	ErrUserExists = errors.New("user already exists")

	// ErrUserNotFound is returned when a user is not found
	ErrUserNotFound = errors.New("user not found")
)
