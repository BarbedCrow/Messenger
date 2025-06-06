# Simple Go Server

A minimal HTTP server built with Go's standard library.

## Features

- Simple HTTP server with multiple endpoints
- Health check endpoint
- Query parameter support
- Clean, readable code structure

## Endpoints

- `GET /` - Home page with available endpoints
- `GET /hello?name=YourName` - Personalized hello message
- `GET /health` - Health check (returns JSON status)

## Getting Started

### Prerequisites

- Go 1.16 or higher

### Running the Server

1. Clone or download this project
2. Run the server:
   ```bash
   go run main.go
   ```
3. Open your browser and visit `http://localhost:8080`

### Building

To build an executable:
```bash
go build -o server main.go
./server
```

## Development

This project uses Go modules for dependency management. The server runs on port 8080 by default.

### Testing Endpoints

```bash
# Home page
curl http://localhost:8080/

# Hello endpoint
curl http://localhost:8080/hello
curl http://localhost:8080/hello?name=Developer

# Health check
curl http://localhost:8080/health
```

## Project Structure

```
.
├── main.go                 # Main server file
├── go.mod                  # Go module file
├── README.md              # This file
└── .github/
    └── copilot-instructions.md  # Copilot instructions
```
