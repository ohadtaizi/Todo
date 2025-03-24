
# TodoApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.4.

## Overview

TodoApp is a full-stack application using **Angular** (frontend) and **Node.js + Express + MongoDB** (backend). It allows for user registration, login via JWT tokens, and personal task management – each user only sees their own todos.

## Features

- Register and login securely (JWT authentication).
- Add, edit, and mark todos as completed.
- Search todos via query string filtering.
- Users can only view their own todos (OPP applied in API via userId matching).

## How to Download and Run

### 1. Clone the Repository

```
git clone <your-repo-url>
cd TodoApp
```

### 2. Install Dependencies

For Angular frontend:

```
cd todo-app
npm install
```

For Node.js backend:

```
cd server
npm install
```

### 3. Run the Application

- **Backend** (runs on port 5000):

```
node index.js
```

- **Frontend** (runs on port 4200):

```
cd todo-app
ng serve
```

Visit: `http://localhost:4200/`

## Unit Tests

### Functions Tested:

- **removeDuplicates(strings: string[])**:
  - Ensures duplicate titles are removed from a list.
- **findLongestWord(text: string)**:
  - Finds the longest word in a string of text.

Tests are written in `string-utils.spec.ts`. Run them using:

```
ng test
```

This uses the **Karma test runner** for Angular.

## OPP (Object-Oriented Programming) Explanation

- A `Todo` object is created per task, encapsulating `title`, `description`, `completed`, and `userId`.
- User-specific data isolation is achieved by associating each Todo with a `userId` (decoded from JWT).
- The backend enforces OPP by querying todos **only where userId matches** the authenticated user.

## Additional CLI Tools

Generate new Angular components easily:

```
ng generate component your-component-name
```

For help:

```
ng generate --help
```

## Building for Production

```
ng build
```

Artifacts will be in the `dist/` directory, optimized for performance.

## End-to-End Testing

```
ng e2e
```

Configure your preferred e2e framework (e.g., Cypress, Protractor).

## Conclusion

This project demonstrates practical full-stack development, integrating authentication, secure data access, and frontend-backend communication.
