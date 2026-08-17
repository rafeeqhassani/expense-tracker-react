# Expense Tracker React

A full-stack responsive expense management application built with **React.js** and a RESTful backend API.

The application allows users to manage expenses, track spending patterns, set budgets, analyze categories, and monitor recent activity through a responsive dashboard.

The frontend communicates with a Node.js/Express.js backend backed by PostgreSQL for authentication, persistent data storage, server-side processing, and analytics.

---

## Live Demo

https://expense-tracker-react-eosin-ten.vercel.app/

## Source Code

https://github.com/rafeeqhassani/expense-tracker-react

## Backend API

https://expense-tracker-api-production-c311.up.railway.app

## API Documentation

Swagger UI:

https://expense-tracker-api-production-c311.up.railway.app/api-docs

---

## Screenshots

### Desktop

![Expenses Dashboard](public/expenses-dashboard.png)

![Expenses Table](public/expenses-table.png)

![Expenses Budget](public/expenses-budget.png)

### Mobile

![Expenses Mobile Dashboard](public/expenses-mob-dashboard.png)

---

## Features

### Authentication

- User registration and login
- Demo account login
- JWT authentication
- Protected routes
- Persistent authentication state
- User-specific data

### Expense Management

- Add, edit, and delete expenses
- Restore deleted expenses
- Clear all expenses
- Bulk delete selected expenses
- Soft-delete functionality
- Recurring expenses
- Automatic recurring expense generation

### Search, Filtering & Sorting

- Search by title, category, and amount
- Filter by month and date range
- Sort by date, amount, title, and category
- Ascending and descending sorting
- Server-side pagination

### Dashboard & Analytics

- Total and monthly spending
- Transaction and category statistics
- Spending analytics
- Monthly spending trend
- Category spending visualization
- Recent activity preview
- Dedicated category analytics page

### Budget Management

- Monthly budget limits
- Category-specific budget limits
- Budget progress tracking
- Budget alerts
- Category search
- Budget configuration

### Activity History

- Recent activity tracking
- Activity history page
- Activity pagination
- Clear activity history
- Automatic activity cleanup

### User Experience

- Responsive mobile-first design
- Desktop and mobile layouts
- Loading and error states
- Empty states
- Toast notifications
- Undo delete functionality
- Form validation
- Responsive navigation

---

## Technologies Used

### Frontend

- React.js
- JavaScript ES6+
- React Router
- React Hooks
- Context API
- useReducer
- Recharts
- CSS3

### Backend

- Node.js
- Express.js
- PostgreSQL
- REST API
- JWT
- bcrypt

### Deployment

- Vercel — Frontend
- Railway — Backend
- Neon PostgreSQL — Database
- GitHub Actions — CI

---

## Architecture

The frontend follows a component-based architecture with separation between UI components, application state, API services, reusable hooks, and utilities.

### State Management

- Context API for shared application state
- `useReducer` for complex state transitions
- Custom hooks for reusable application logic
- Derived state for calculated values

### Service Layer

API communication is separated into dedicated service modules for:

- Authentication
- Expenses
- Budgets
- Analytics
- Categories
- Category analytics
- Activities

This keeps HTTP and API logic separate from presentation components.

### Backend Integration

The backend handles:

- Authentication and authorization
- Database operations
- Server-side filtering
- Sorting and pagination
- Recurring expense processing
- Budget persistence
- Analytics
- Category analytics
- Activity history

---

## Engineering Decisions

### Component-Based Design

The application is divided into reusable components based on responsibility, including dashboard sections, expenses, budgets, analytics, charts, activities, forms, navigation, and UI feedback.

### Centralized State

`AppProviders` combines the major application hooks and exposes shared state through `useAppContext`.

### Custom Hooks

Reusable business logic is extracted into custom hooks for authentication, expenses, filtering, budgets, analytics, categories, activities, recurring expenses, and notifications.

### Server-Side Processing

Filtering, sorting, pagination, recurring expense processing, analytics, and persistent data operations are handled by the backend where appropriate.

This keeps the frontend focused on presentation, interaction, and application state.

---

## Project Background

The project was originally developed using **Vanilla JavaScript** and later rebuilt using **React.js**.

The migration provided practical experience with:

- Component architecture
- State management
- Custom hooks
- API integration
- Reusable components
- Scalable project organization
- Full-stack application development

---

## Project Status

Core functionality is complete and the application is deployed.

### Completed

- React frontend
- REST API backend
- PostgreSQL database
- JWT authentication
- Expense management
- Recurring expenses
- Budget management
- Analytics
- Category analytics
- Activity history
- Responsive desktop and mobile layouts
- Swagger API documentation
- Automated testing
- GitHub Actions CI
- Production deployment

The project is currently in the **polishing and portfolio-readiness stage**.

---

## Free Tier Notice

This project uses free-tier deployment services.

Due to free hosting limitations:

- The backend may take a few seconds to wake up after inactivity.
- Initial API requests may be slower after periods without traffic.
- Database resources are limited by the free-tier plan.
- The live demo may occasionally experience cold-start delays.

These limitations are related to the hosting environment and do not affect the application's core functionality when the services are active.

---

## Future Improvements

Potential future improvements include:

- Refresh token authentication
- Password reset and email verification
- CSV/PDF expense export
- Advanced financial insights
- Additional automated test coverage
- Performance monitoring
- Docker-based deployment
