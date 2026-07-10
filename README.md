# Expense Tracker React

A full-featured responsive expense management application built with React.js.

## Live Demo

https://expense-tracker-react-eosin-ten.vercel.app/

## Source Code

https://github.com/rafeeqhassani/expense-tracker-react

---

## Screenshots

### Desktop View

![Expense Dashboard](public/expense-dashboard.png)

### Mobile View

![Mobile Dashboard](public/expense-mob-dashboard.png)

---

# About The Project

Expense Tracker is a React-based personal finance application designed to manage daily expenses, analyze spending patterns, and provide a structured dashboard experience.

The project was originally developed using Vanilla JavaScript and later rebuilt using React to improve scalability, component organization, and state management.

The goal was not only feature development but also understanding real-world frontend architecture, state flow, rendering behavior, and maintainable code structure.

---

# Features

## Expense Management

- Add, edit, and delete expenses
- Search expenses by title
- Sort expenses alphabetically and numerically
- Filter expenses by month
- Bulk select and remove expenses
- Load more pagination

## Dashboard & Analytics

- Total spending overview
- Expense statistics
- Spending analytics
- Expense charts
- Recent activity tracking

## Budget Management

- Monthly budget limits
- Category-based budget limits
- Spending monitoring

## Advanced Features

- Recurring expense generation
- Custom categories
- Form validation
- Toast notifications
- Undo delete functionality
- LocalStorage persistence
- Responsive mobile-first layout

---

# Technologies Used

- React.js
- JavaScript ES6+
- HTML5
- CSS3
- React Hooks
- Context API
- useReducer
- LocalStorage
- Vercel

---

# Architecture

The application follows a component-based architecture with separation between UI components, state management, and business logic.

## State Management

### Context API

Used for shared application state.

### useReducer

Used for complex form state:

- Form data
- Validation errors
- Edit mode
- Modal state
- Submission flow

### Custom Hooks

Created reusable logic for:

- Recurring expenses
- Application behavior management

---

# Engineering Decisions

## State Lifecycle Handling

During development, UI inconsistencies were debugged by tracing:

- Reducer actions
- State transitions
- Component rendering
- User interaction flow

The solution focused on maintaining predictable UI states instead of adding unnecessary complexity.

## Component Responsibility

Components were separated based on responsibility:

- Dashboard sections
- Expense management
- Forms
- Analytics
- Navigation
- UI feedback

This improved maintainability and future scalability.

---

# What I Learned

## JavaScript

- DOM manipulation
- Event handling
- Data processing
- LocalStorage management

## React

- Component architecture
- State-driven rendering
- Reducer patterns
- Context API
- Custom hooks
- Derived state
- UI lifecycle management

## Problem Solving

- Debugging complex state issues
- Understanding rendering behavior
- Improving architecture through refactoring

---

# Future Improvements

- Backend integration
- Authentication
- Database storage
- CSV/PDF export
- Dark mode
- Advanced financial insights

---

# Project Status

Core functionality completed.

Currently improving:

- UI design system
- Performance optimization
- Code scalability
- Advanced React patterns
