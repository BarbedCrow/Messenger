package response

import (
	"encoding/json"
	"net/http"
)

// Response represents a generic API response
type Response struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Data    any    `json:"data,omitempty"`
}

// JSON sends a JSON response with the given status code
func JSON(w http.ResponseWriter, statusCode int, resp Response) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(resp)
}

// Success sends a successful JSON response
func Success(w http.ResponseWriter, message string, data any) {
	JSON(w, http.StatusOK, Response{
		Success: true,
		Message: message,
		Data:    data,
	})
}

// Created sends a created JSON response
func Created(w http.ResponseWriter, message string, data any) {
	JSON(w, http.StatusCreated, Response{
		Success: true,
		Message: message,
		Data:    data,
	})
}

// Error sends an error JSON response
func Error(w http.ResponseWriter, statusCode int, message string) {
	JSON(w, statusCode, Response{
		Success: false,
		Message: message,
	})
}

// BadRequest sends a bad request error response
func BadRequest(w http.ResponseWriter, message string) {
	Error(w, http.StatusBadRequest, message)
}

// InternalError sends an internal server error response
func InternalError(w http.ResponseWriter, message string) {
	Error(w, http.StatusInternalServerError, message)
}

// Conflict sends a conflict error response
func Conflict(w http.ResponseWriter, message string) {
	Error(w, http.StatusConflict, message)
}

// MethodNotAllowed sends a method not allowed error response
func MethodNotAllowed(w http.ResponseWriter, message string) {
	Error(w, http.StatusMethodNotAllowed, message)
}
