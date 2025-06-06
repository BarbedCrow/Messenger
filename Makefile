# Simple Go Server Makefile

.PHONY: run build clean test help

# Default target
help:
	@echo "Available commands:"
	@echo "  run    - Run the server"
	@echo "  build  - Build the server binary"
	@echo "  clean  - Clean built binaries and database"
	@echo "  test   - Run tests (when available)"
	@echo "  help   - Show this help message"

# Run the server
run:
	go run ./cmd/server

# Build the server
build:
	go build -o server ./cmd/server

# Clean built files
clean:
	rm -f server server.*
	rm -f users.db

# Run tests (placeholder for future tests)
test:
	go test ./...

# Install dependencies
deps:
	go mod tidy
	go mod download
