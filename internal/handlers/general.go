package handlers

import (
	"fmt"
	"net/http"

	"simple-go-server/pkg/response"
)

type GeneralHandler struct{}

// NewGeneralHandler creates a new general handler
func NewGeneralHandler() *GeneralHandler {
	return &GeneralHandler{}
}

// Home handles requests to the root path
func (h *GeneralHandler) Home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the Simple Go Server!\n")
	fmt.Fprintf(w, "Available endpoints:\n")
	fmt.Fprintf(w, "- GET /         - This home page\n")
	fmt.Fprintf(w, "- GET /hello    - Hello message\n")
	fmt.Fprintf(w, "- GET /health   - Health check\n")
	fmt.Fprintf(w, "- POST /register - Register a new user\n")
}

// Hello handles requests to /hello
func (h *GeneralHandler) Hello(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		name = "World"
	}
	fmt.Fprintf(w, "Hello, %s!\n", name)
}

// Health handles health check requests
func (h *GeneralHandler) Health(w http.ResponseWriter, r *http.Request) {
	response.Success(w, "Server is running", map[string]string{
		"status": "healthy",
	})
}
