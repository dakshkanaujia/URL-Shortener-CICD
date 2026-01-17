# URL Shortener (CI/CD Focus)

A simple URL shortener API built with Node.js, Express, and a focus on CI/CD practices.

## Features

- **Simple API**: Only 2 endpoints for shortening and retrieving URLs.
- **In-Memory Storage**: Fast and simple (data resets on restart).
- **CI/CD Ready**:
    - **Tests**: Jest integration tests.
    - **Linting**: ESLint and Prettier configuration.
    - **Docker**: Ready-to-build Dockerfile.
    - **GitHub Actions**: Automated testing and building on push.

## Prerequisites

- Node.js (v18+)
- npm
- Docker (optional, for containerization)

## Installation

1.  Clone the repository.
2.  Install dependencies:

    ```bash
    npm install
    ```

## Running the Server

Start the server locally:

```bash
npm start
```

The server runs at `http://localhost:3000`.

## API Documentation

### 1. Shorten a URL

**Endpoint:** `POST /shorten`

**Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "slug": "AbCdEf",
  "url": "https://example.com"
}
```

### 2. Retrieve Original URL

**Endpoint:** `GET /url/:slug`

**Response:**
```json
{
  "slug": "AbCdEf",
  "url": "https://example.com"
}
```

## Development & CI/CD

### Run Tests
```bash
npm test
```

### Linting & Formatting
```bash
npm run lint
npm run format
```

### Docker Build
Build the container image:
```bash
docker build -t url-shortener .
```
