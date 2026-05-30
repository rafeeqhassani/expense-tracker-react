## Expense Tracker (React Version)

# Live Demo

https://creative-seashore-797b70.netlify.app

# Source Code

https://https://github.com/rafeeqhassani/expense-tracker-react

# About the Project

A React-based Expense Tracker Application built to manage daily and monthly expenses with dynamic UI updates, filtering, sorting, validation, and persistent LocalStorage storage.

This project was not only focused on building features, but mainly on deeply understanding frontend architecture, React state management, UI behavior, rendering flow, debugging, and real-world project structure.

The project was originally built in Vanilla JavaScript and later refactored into React after learning component architecture and state-driven UI development.

---

# Features

- [x] Add, edit, and delete expenses
- [x] Load More pagination (40 items per batch)
- [x] Search expenses by title
- [x] Sort expenses (alphabetical & numeric)
- [x] Filter expenses by month
- [x] Bulk selection & removal
- [x] Real-time total calculation
- [x] Dynamic category management
- [x] Form validation
- [x] LocalStorage persistence
- [x] Dynamic UI rendering
- [x] State-driven rendering flow
- [x] Responsive UI behavior

---

# Technologies Used

- React
- JavaScript (ES6+)
- CSS3
- HTML5
- React Hooks
  - useState
  - useReducer
  - useEffect

---

# Project Architecture & Learning

This project helped me deeply understand:

## React Architecture

- Component-based structure
- Separating UI logic from business logic
- Organizing project folders by responsibility
- Scalable module structure
- Understanding when abstraction is actually needed

Instead of creating unnecessary modules for every small logic piece, I learned to separate modules only when project complexity truly requires it.

For example:

- Complex form logic was managed with `useReducer`
- Simpler logic like filtering, pagination, category computation, and totals were grouped logically instead of over-engineering separate modules

---

# State Management Understanding

A major learning focus of this project was understanding different types of state:

## UI State

Examples:

- `isFormOpen`
- `mode`
- `editingId`
- validation errors
- toast visibility

## Data State

Examples:

- expenses array
- categories
- filtered results

## App Flow State

Understanding how application behavior changes depending on user actions, submission flow, rendering conditions, and reducer actions.

---

# Form Complexity & Reducer Logic

I used `useReducer` for form handling because the form had multiple connected UI states:

- `formData`
- `errors`
- `mode`
- `editingId`
- `isFormOpen`

This helped me understand:

- reducer action flow
- event-driven rendering
- conditional UI behavior
- centralized state transitions

I also learned an important frontend architecture concept:

> One submit action should control one UI decision at a time.

For example:

- either validation should appear
- or success toast should appear
- not conflicting UI behaviors together

During debugging, I found that some inconsistent validation and toast behaviors were caused by UI state flow rather than data logic itself.

Closing the form after successful submission became a better UI decision because it simplified rendering behavior and prevented conflicting UI states.

This project helped me understand the difference between:

- UI behavior bugs
- application logic bugs
- rendering flow issues

---

# Problem Solving & Debugging

A large part of this project involved debugging and architecture decisions.

Through both Vanilla JavaScript and React versions, I practiced:

- tracing rendering flow
- debugging state updates
- understanding async behavior
- fixing conditional rendering conflicts
- using console logs and DevTools effectively
- understanding why UI bugs happen

Instead of only fixing bugs, I focused on understanding _why_ the bug happens internally.

---

# What I Learned

## Vanilla JavaScript

- DOM manipulation
- Event handling
- Dynamic rendering
- Application flow
- LocalStorage synchronization
- Real-world project structure

## React

- State-driven rendering
- useReducer architecture
- Component responsibility
- UI state management
- Conditional rendering
- Event-driven UI flow
- Derived state handling
- Project scalability decisions
- Hook organization
- Module responsibility separation

---

# Future Improvements

- Better UI/UX redesign
- Expense analytics charts
- Dark mode
- Export to CSV/PDF
- Backend integration
- Authentication system
- Database support
- Mobile optimization

---

# Project Status

Core functionality is complete.

Current focus:

- UI improvements
- architecture refinement
- scalability
- advanced React patterns

---

# Note

This project was built through consistent self-learning, debugging, experimentation, and problem solving over several months.

The goal was not only to complete features, but to deeply understand how frontend applications work internally, including rendering behavior, UI flow, state management, reducer architecture, and scalable project structure.
