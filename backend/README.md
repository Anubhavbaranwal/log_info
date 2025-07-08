# Log Ingestion API - Modular Backend Architecture

## Project Structure

```
backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── controllers/           # Request handlers
│   │   └── logController.js   # Log-related controller functions
│   ├── models/               # Data models
│   │   └── LogModel.js       # Log data model for file operations
│   ├── routes/               # Route definitions
│   │   ├── index.js          # Main route aggregator
│   │   ├── logRoutes.js      # Log-related routes
│   │   └── healthRoutes.js   # Health check routes
│   ├── middleware/           # Custom middleware
│   │   ├── errorHandler.js   # Global error handling
│   │   └── validation.js     # Input validation middleware
│   └── utils/               # Utility functions
│       ├── ApiError.js      # Custom error class
│       ├── ApiResponse.js   # Standardized response format
│       └── asyncHandler.js  # Async error handling wrapper
├── tests/
│   └── api.test.js          # API tests
├── logs.json                # JSON file for log storage
├── package.json             # Project dependencies
└── server.js                # Server entry point
```

## Key Components

### 1. Utility Functions

#### `asyncHandler.js`
- Wraps async functions to automatically catch and forward errors
- Eliminates the need for try-catch blocks in controllers

#### `ApiError.js`
- Custom error class with standardized error format
- Includes status codes, messages, and additional error details

#### `ApiResponse.js`
- Standardized response format for all API endpoints
- Ensures consistent response structure across the application

### 2. Models

#### `LogModel.js`
- Handles all file operations for log data
- Provides methods for reading, writing, and filtering logs
- Singleton pattern for consistent file access

### 3. Controllers

#### `logController.js`
- Contains all business logic for log operations
- Uses asyncHandler for error handling
- Returns standardized ApiResponse objects

### 4. Middleware

#### `validation.js`
- Input validation using Joi schema
- Validates log entries before processing

#### `errorHandler.js`
- Global error handling middleware
- Catches and formats all errors consistently

### 5. Routes

#### Modular routing structure
- Separate route files for different resources
- Clean separation of concerns
- RESTful API design

## API Endpoints

All endpoints are prefixed with `/api/v1`

### Health Check
- `GET /api/v1/health` - Service health status

### Logs
- `GET /api/v1/logs` - Retrieve logs with optional filtering
- `POST /api/v1/logs` - Create a new log entry

## Response Format

All API responses follow a consistent format:

```json
{
  "statusCode": 200,
  "data": { ... },
  "message": "Success message",
  "success": true
}
```

Error responses:
```json
{
  "statusCode": 400,
  "data": null,
  "message": "Error message",
  "success": false,
  "errors": []
}
```

## Filter Parameters

The GET /logs endpoint supports the following query parameters:
- `level`: Filter by log level (error, warn, info, debug)
- `message`: Full-text search in log messages
- `resourceId`: Filter by specific resource ID
- `timestamp_start`: Filter logs after this timestamp
- `timestamp_end`: Filter logs before this timestamp
- `traceId`: Filter by trace ID
- `spanId`: Filter by span ID
- `commit`: Filter by commit hash

## Development

### Running the Server
```bash
npm start          # Production
npm run dev        # Development with nodemon
```

### Running Tests
```bash
npm test
```

## Benefits of This Architecture

1. **Separation of Concerns**: Each component has a single responsibility
2. **Maintainability**: Easy to modify and extend individual components
3. **Testability**: Each component can be tested independently
4. **Consistency**: Standardized error handling and response formats
5. **Scalability**: Easy to add new features and endpoints
6. **Professional Structure**: Follows industry best practices
