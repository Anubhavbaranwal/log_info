# Log Ingestion and Querying System

A comprehensive full-stack application for ingesting, storing, and querying log data. Built with Node.js, Express, and React, this system provides a powerful interface for monitoring and debugging applications through structured log analysis.

## 🚀 Features

### Backend (Node.js + Express)
- **RESTful API** for log ingestion and querying
- **JSON file-based storage** for simplicity and portability
- **Comprehensive filtering** with support for multiple simultaneous filters
- **Structured log validation** using Joi schema validation
- **Error handling** with appropriate HTTP status codes
- **CORS enabled** for cross-origin requests

### Frontend (React)
- **Intuitive user interface** for log visualization
- **Real-time filtering** with debounced search input
- **Multiple filter types**: level, message search, resource ID, timestamp range, trace ID, span ID, commit
- **Responsive design** that works on various screen sizes
- **Visual log level indicators** with color-coded badges
- **Reverse chronological sorting** (most recent logs first)

## 📋 Requirements

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## 🛠️ Installation and Setup

### Quick Start (Recommended)

1. **Clone or download the project**
2. **Navigate to the project directory**
   ```bash
   cd log-ingestion-system
   ```
3. **Install all dependencies**
   ```bash
   npm run install-all
   ```
4. **Start both servers**

   ```bash
   npm start:backend 
   ```
   in new terminal
   ```bash
   npm start:frontend 
   ```

This will start:
- Backend server on `http://localhost:3001`
- Frontend application on `http://localhost:3000`

### Manual Setup

If you prefer to set up each component separately:

#### Backend Setup
```bash
cd backend
npm install
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🔧 Configuration

### Backend Configuration
- **Port**: Default `3001` (configurable via `PORT` environment variable)
- **Log Storage**: `backend/logs.json` (auto-created if not exists)
- **CORS**: Enabled for all origins (development setup)

### Frontend Configuration
- **API URL**: Defaults to `http://localhost:3001` (configurable via `REACT_APP_API_URL` environment variable)
- **Port**: Default `3000` (React development server)

## 📚 API Documentation

### POST /logs
Ingests a single log entry.

**Request Body:**
```json
{
  "level": "error",
  "message": "Database connection failed",
  "resourceId": "server-1234",
  "timestamp": "2023-09-15T08:00:00Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": {
    "parentResourceId": "server-5678"
  }
}
```

**Response:** `201 Created` with the stored log entry

### GET /logs
Retrieves logs with optional filtering.

**Query Parameters:**
- `level`: Filter by log level (error, warn, info, debug)
- `message`: Full-text search in log messages (case-insensitive)
- `resourceId`: Filter by resource identifier
- `timestamp_start`: Start of timestamp range (ISO 8601)
- `timestamp_end`: End of timestamp range (ISO 8601)
- `traceId`: Filter by trace identifier
- `spanId`: Filter by span identifier
- `commit`: Filter by commit hash

**Response:** `200 OK` with array of matching log entries

### GET /health
Health check endpoint.

**Response:** `200 OK` with server status

## 🧪 Testing

### Run all tests
```bash
npm test
```

### Run backend tests only
```bash
npm run test:backend
```

### Run frontend tests only
```bash
npm run test:frontend
```

## 🏗️ Architecture and Design Decisions

### Data Persistence
- **JSON file storage** was chosen over a database to meet the assignment requirements
- **Synchronous file operations** ensure data consistency
- **Auto-initialization** creates the logs.json file if it doesn't exist

### API Design
- **RESTful conventions** with clear HTTP methods and status codes
- **Comprehensive validation** using Joi schema
- **Flexible filtering** supports multiple simultaneous filters with AND logic
- **Error handling** provides meaningful error messages

### Frontend Architecture
- **Functional components** with React Hooks for state management
- **Debounced search** prevents excessive API calls during typing
- **Responsive design** using CSS Grid and Flexbox
- **Component separation** for maintainability

### Performance Considerations
- **Debounced filtering** (300ms) for text inputs
- **Efficient array operations** for client-side filtering
- **Optimized rendering** with React's virtual DOM

## 🎨 UI/UX Features

- **Clean, professional interface** inspired by modern logging tools
- **Color-coded log levels** for quick visual identification
- **Intuitive filter controls** with clear labeling
- **Responsive layout** that adapts to different screen sizes
- **Loading states** and error handling for better user experience

## 📁 Project Structure

```
log-ingestion-system/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── logs.json (auto-generated)
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── index.js
│       └── index.css
├── package.json
└── README.md
```

## 🚀 Building for Production

### Build the frontend
```bash
npm run build
```

### Serve the built application
You can serve the built frontend using any static file server. The backend will continue running as a separate service.

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in backend/server.js or set the PORT environment variable
   - For frontend, React will automatically suggest an alternative port

2. **Backend not responding**
   - Ensure the backend server is running on port 3001
   - Check console for error messages
   - Verify the logs.json file permissions

3. **CORS issues**
   - The backend includes CORS middleware for development
   - For production, configure CORS for your specific domain

### Logs Not Showing
- Check browser developer console for API errors
- Verify backend server is running and accessible
- Ensure logs.json file exists and is readable

## 📝 Development Notes

### Adding New Features
- Backend routes are defined in `backend/server.js`
- Frontend components are in `frontend/src/`
- API calls are handled in the main App component

### Database Schema
The log entry schema is strictly validated and includes:
- **level**: One of error, warn, info, debug
- **message**: String log message
- **resourceId**: Resource identifier
- **timestamp**: ISO 8601 timestamp
- **traceId**: Trace identifier for request correlation
- **spanId**: Span identifier for operation tracking
- **commit**: Git commit hash
- **metadata**: Additional structured data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built as a demonstration of full-stack development skills
- Inspired by professional logging tools like Grafana Loki and Datadog
- Designed with developer experience and usability in mind
