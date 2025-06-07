package database

import (
	"database/sql"
	"strings"

	"simple-go-server/internal/models"

	_ "github.com/mattn/go-sqlite3"
)

type DB struct {
	conn *sql.DB
}

// New creates a new database connection
func New(dbPath string) (*DB, error) {
	conn, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		return nil, err
	}

	db := &DB{conn: conn}

	// Initialize the database schema
	if err := db.initSchema(); err != nil {
		conn.Close()
		return nil, err
	}

	return db, nil
}

// Close closes the database connection
func (db *DB) Close() error {
	return db.conn.Close()
}

// initSchema creates the necessary tables
func (db *DB) initSchema() error {
	createTableQuery := `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		login TEXT UNIQUE NOT NULL,
		password_hash TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);`

	_, err := db.conn.Exec(createTableQuery)
	return err
}

// CreateUser creates a new user in the database
func (db *DB) CreateUser(login, passwordHash string) (int64, error) {
	query := "INSERT INTO users (login, password_hash) VALUES (?, ?)"
	result, err := db.conn.Exec(query, login, passwordHash)
	if err != nil {
		if strings.Contains(err.Error(), "UNIQUE constraint failed") {
			return 0, ErrUserExists
		}
		return 0, err
	}

	return result.LastInsertId()
}

// GetUserByLogin retrieves a user by login
func (db *DB) GetUserByLogin(login string) (*models.User, error) {
	query := "SELECT id, login, password_hash FROM users WHERE login = ?"
	row := db.conn.QueryRow(query, login)

	var user models.User
	err := row.Scan(&user.ID, &user.Login, &user.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrUserNotFound
		}
		return nil, err
	}

	return &user, nil
}

// GetUserByID retrieves a user by ID
func (db *DB) GetUserByID(id int) (*models.User, error) {
	query := "SELECT id, login, password_hash FROM users WHERE id = ?"
	row := db.conn.QueryRow(query, id)

	var user models.User
	err := row.Scan(&user.ID, &user.Login, &user.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrUserNotFound
		}
		return nil, err
	}

	return &user, nil
}
