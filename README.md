# Simple Go Messenger

A modern full-stack messaging application built with **Go** backend and **React** frontend.

## Features

- 🔐 **Secure Authentication**: User registration with bcrypt password hashing
- 💬 **Real-time Messaging**: (Coming soon)
- 🎨 **Modern UI**: React with TypeScript and Styled Components
- ⚡ **Fast Backend**: Go with SQLite database
- 🔒 **Security**: CORS protection and input validation
- 📱 **Responsive Design**: Works on desktop and mobile

## Tech Stack

### Backend
- **Go 1.24+** - Server language
- **SQLite** - Database
- **bcrypt** - Password hashing
- **Standard library** - HTTP handling
 
### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Styled Components** - CSS-in-JS styling
- **React Router** - Navigation
- **Axios** - HTTP client

## Endpoints

- `GET /` - Home page with available endpoints
- `GET /hello?name=YourName` - Personalized hello message
- `GET /health` - Health check (returns JSON status)
- `POST /register` - Register a new user with login and password

## Getting Started

### Prerequisites

- Go 1.24 or higher
- Node.js 18+ and npm

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Messenger
   ```

2. **Start the backend (Go server)**
   ```bash
   go mod tidy
   go run ./cmd/server
   # Server runs on http://localhost:8080
   ```

3. **Start the frontend (React app)**
   ```bash
   cd frontend
   npm install
   npm run dev
   # App runs on http://localhost:5173
   ```

4. **Visit the application**
   - Open http://localhost:5173 in your browser
   - The React app will communicate with the Go API

### Using VS Code Tasks

This project includes VS Code tasks for easy development:

- **`Ctrl+Shift+P`** → "Tasks: Run Task" → "Run Go Server"
- **`Ctrl+Shift+P`** → "Tasks: Run Task" → "Run React Dev Server"
- **`Ctrl+Shift+P`** → "Tasks: Run Task" → "Start Full Application" (runs both)

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
