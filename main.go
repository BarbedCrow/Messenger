package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Define routes
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/hello", helloHandler)
	http.HandleFunc("/health", healthHandler)

	// Start server
	port := "8080"
	fmt.Printf("Server starting on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// homeHandler handles requests to the root path
func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the Simple Go Server!\n")
	fmt.Fprintf(w, "Available endpoints:\n")
	fmt.Fprintf(w, "- GET /        - This home page\n")
	fmt.Fprintf(w, "- GET /hello   - Hello message\n")
	fmt.Fprintf(w, "- GET /health  - Health check\n")
}

// helloHandler handles requests to /hello
func helloHandler(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		name = "World"
	}
	fmt.Fprintf(w, "Hello, %s!\n", name)
}

// healthHandler handles health check requests
func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, `{"status": "healthy", "message": "Server is running"}`)
}
