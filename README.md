# Simple Go Server

A well-structured HTTP server built with Go's standard library, following Go project layout best practices.

## Features

- Clean, modular Go project structure
- Simple HTTP server with multiple endpoints
- User registration with secure password hashing
- SQLite database for user storage
- Health check endpoint
- Query parameter support
- Proper error handling and validation
- Reusable response utilities

## Endpoints

- `GET /` - Home page with available endpoints
- `GET /hello?name=YourName` - Personalized hello message
- `GET /health` - Health check (returns JSON status)
- `POST /register` - Register a new user with login and password

## Getting Started

### Prerequisites

- Go 1.16 or higher

### Dependencies

This project uses the following Go modules:
- `golang.org/x/crypto/bcrypt` - For secure password hashing
- `github.com/mattn/go-sqlite3` - SQLite database driver

### Running the Server

1. Clone or download this project
2. Install dependencies:
   ```bash
   go mod tidy
   ```
3. Run the server:
   ```bash
   go run ./cmd/server
   # or using Makefile
   make run
   ```
4. Open your browser and visit `http://localhost:8080`

The server will automatically create a SQLite database file (`users.db`) to store user information.

### Building

To build an executable:
```bash
go build -o server ./cmd/server
./server

# or using Makefile
make build
./server
```

Or use the VS Code build task: `Cmd+Shift+P` → "Tasks: Run Task" → "Build Go Server"

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

# Register a new user
curl -X POST http://localhost:8080/register \
  -H "Content-Type: application/json" \
  -d '{"login": "testuser", "password": "password123"}'

# Register with validation error (password too short)
curl -X POST http://localhost:8080/register \
  -H "Content-Type: application/json" \
  -d '{"login": "user2", "password": "123"}'
```

## Project Structure

```
.
├── cmd/
│   └── server/
│       └── main.go              # Application entry point
├── internal/
│   ├── auth/
│   │   └── auth.go              # Authentication utilities
│   ├── database/
│   │   ├── database.go          # Database operations
│   │   └── errors.go            # Database error definitions
│   ├── handlers/
│   │   ├── general.go           # General HTTP handlers
│   │   └── user.go              # User-related HTTP handlers
│   └── models/
│       └── user.go              # Data models
├── pkg/
│   └── response/
│       └── response.go          # HTTP response utilities
├── .github/
│   └── copilot-instructions.md  # Copilot instructions
├── .vscode/
│   └── tasks.json               # VS Code tasks
├── go.mod                       # Go module file
├── go.sum                       # Go dependencies checksums
├── README.md                    # This file
└── users.db                     # SQLite database (created at runtime)
```

## Architecture

The project follows the standard Go project layout:

- **`cmd/`** - Main applications for this project
- **`internal/`** - Private application and library code
- **`pkg/`** - Library code that's safe to use by external applications
- **`internal/auth/`** - Authentication and validation logic
- **`internal/database/`** - Database layer with CRUD operations
- **`internal/handlers/`** - HTTP request handlers
- **`internal/models/`** - Data structures and business entities
- **`pkg/response/`** - Reusable HTTP response utilities
