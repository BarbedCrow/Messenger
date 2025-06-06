package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"simple-go-server/internal/auth"
	"simple-go-server/internal/database"
	"simple-go-server/internal/models"
	"simple-go-server/pkg/response"
)

type UserHandler struct {
	db *database.DB
}

// NewUserHandler creates a new user handler
func NewUserHandler(db *database.DB) *UserHandler {
	return &UserHandler{db: db}
}

// Register handles user registration requests
func (h *UserHandler) Register(w http.ResponseWriter, r *http.Request) {
	// Only allow POST requests
	if r.Method != http.MethodPost {
		response.MethodNotAllowed(w, "Only POST method is allowed")
		return
	}

	// Parse request body
	var userReg models.UserRegistration
	if err := json.NewDecoder(r.Body).Decode(&userReg); err != nil {
		response.BadRequest(w, "Invalid JSON format")
		return
	}

	// Validate login
	if err := auth.ValidateLogin(userReg.Login); err != nil {
		response.BadRequest(w, err.Error())
		return
	}

	// Validate password
	if err := auth.ValidatePassword(userReg.Password); err != nil {
		response.BadRequest(w, err.Error())
		return
	}

	// Hash password
	hashedPassword, err := auth.HashPassword(userReg.Password)
	if err != nil {
		response.InternalError(w, "Failed to process password")
		return
	}

	// Create user in database
	userID, err := h.db.CreateUser(userReg.Login, hashedPassword)
	if err != nil {
		if err == database.ErrUserExists {
			response.Conflict(w, "User with this login already exists")
			return
		}
		log.Printf("Failed to create user: %v", err)
		response.InternalError(w, "Failed to create user")
		return
	}

	// Success response
	response.Created(w, "User registered successfully", map[string]any{
		"id":    userID,
		"login": userReg.Login,
	})
}
