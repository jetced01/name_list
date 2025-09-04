# Name Submission App

## Overview

A simple full-stack web application for collecting and displaying names. The app features a clean frontend interface where users can submit their names through a form, and view all previously submitted names in real-time. Built with Fastify for the backend API and vanilla JavaScript for the frontend, this is a lightweight demonstration of basic CRUD operations with in-memory data storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture
- **Framework**: Fastify web framework chosen for its performance and lightweight nature
- **API Design**: RESTful API with two endpoints:
  - `GET /api/names` - Retrieves all submitted names
  - `POST /api/names` - Adds a new name with validation
- **Data Storage**: In-memory array storage for simplicity (comments indicate database would be used in production)
- **Static File Serving**: Integrated static file serving for frontend assets using `@fastify/static`
- **Server Configuration**: Runs on port 5000 with host binding to `0.0.0.0` for external access

### Frontend Architecture
- **Technology Stack**: Vanilla HTML, CSS, and JavaScript without frameworks
- **UI Design**: Single-page application with gradient styling and responsive design
- **Form Handling**: Asynchronous form submission with client-side validation
- **State Management**: Dynamic DOM manipulation for real-time updates
- **User Experience**: Loading states and success feedback for better interaction

### API Communication
- **HTTP Methods**: Uses standard REST conventions (GET for retrieval, POST for creation)
- **Data Format**: JSON for request/response payloads
- **Error Handling**: Proper HTTP status codes and error messages
- **Client-Side Fetching**: Modern fetch API for asynchronous requests

### Data Validation
- **Backend Validation**: Checks for required fields, data types, and empty strings
- **Frontend Validation**: HTML5 form validation plus JavaScript checks
- **Data Processing**: Automatic trimming of whitespace from inputs

## External Dependencies

### Runtime Dependencies
- **fastify**: High-performance web framework for Node.js
- **@fastify/static**: Plugin for serving static files through Fastify
- **@types/node**: TypeScript definitions for Node.js (development support)

### Development Environment
- **Node.js**: JavaScript runtime environment
- **NPM**: Package manager for dependency management

### Browser Requirements
- **Modern Browser**: Requires support for ES6+ features (fetch API, async/await, DOM methods)
- **JavaScript**: Client-side functionality depends on enabled JavaScript

Note: The application currently uses in-memory storage which means data is lost when the server restarts. The architecture is designed to easily accommodate a database upgrade for persistent storage.