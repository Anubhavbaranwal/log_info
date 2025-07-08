<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Log Ingestion and Querying System - Development Guidelines

## Project Overview
This is a full-stack application consisting of:
- **Backend**: Node.js + Express API server with JSON file-based storage
- **Frontend**: React application with comprehensive filtering and search capabilities

## Key Requirements
- JSON file storage (no external databases)
- RESTful API design with proper HTTP status codes
- Comprehensive log filtering with multiple simultaneous filters
- React functional components with hooks
- Responsive, professional UI design
- Real-time filtering with debounced search

## Architecture Patterns
- **Backend**: MVC pattern with proper separation of concerns
- **Frontend**: Component-based architecture with hooks for state management
- **Data Flow**: Unidirectional data flow with controlled components
- **Error Handling**: Comprehensive error handling at both API and UI levels

## Development Standards
- Use modern ES6+ JavaScript features
- Follow RESTful API conventions
- Implement proper input validation and sanitization
- Use semantic HTML and accessible design patterns
- Maintain clean, readable code with meaningful variable names
- Include comprehensive error handling and loading states

## Performance Considerations
- Debounce text input searches to prevent excessive API calls
- Use efficient array methods for filtering operations
- Implement proper React rendering optimizations
- Handle large datasets gracefully

## Security Best Practices
- Validate all input data using Joi schema
- Use CORS middleware appropriately
- Implement proper error handling without exposing sensitive information
- Use HTTPS in production environments

## Testing Strategy
- Unit tests for critical business logic
- API endpoint testing with proper status codes
- Frontend component testing with React Testing Library
- Integration testing for complete user workflows

## Code Style Guidelines
- Use consistent indentation and formatting
- Follow JavaScript/React naming conventions
- Write self-documenting code with clear function names
- Use meaningful commit messages
- Keep functions small and focused on single responsibilities
