# TodoApp

This project is a full-stack Todo application built with Angular (frontend) and Node.js with Express (backend), using MongoDB for data storage.

---

## 1. How to Run the Project

### Prerequisites
- Node.js & npm installed
- Angular CLI installed globally (`npm install -g @angular/cli`)
- MongoDB Atlas account or local MongoDB setup

### Clone and Install Dependencies
```bash
git clone https://github.com/ohadtaizi/Todo.git
cd Todo
npm install
```

### Start Backend Server
1. Navigate to the backend server folder:
```bash
cd server
```
2. Start the server:
```bash
node index.js
```
> Server will run on `http://localhost:5000`

### Start Angular Frontend
In the project root folder:
```bash
ng serve
```
> Open your browser at `http://localhost:4200`

---

## 2. How to Use the Application

### Register/Login
- Navigate to `/register` to create an account or `/login` to sign in.
- Example credentials:
  - Email: `r@r`
  - Password: `1234`

### Add a Todo
- Enter title and description in the fields and click “Add Todo”.

### Mark as Complete
- Click the checkbox on any todo to toggle its completion status.

### Search Todos
- Use the search bar to filter todos by title or description.

### Algorithm Features
- Navigate to `/test` to use:
  - **Remove Duplicates**: Input strings to remove duplicates.
  - **Find Longest Word**: Input text to find the longest word.

---

## 3. Running Unit Tests

Run tests via Karma test runner:
```bash
ng test
```
Tests are written using Jasmine for Angular components and services.

---

## 4. OOP Explanation in the Project

- **Component-Based Architecture**: Each part of the UI (e.g., TodoList, TodoDetail) is modular, encapsulating its logic and state.
- **Reusability**: Functions like `removeDuplicates` and `findLongestWord` are utility-based and reusable.
- **Encapsulation**: Component properties (e.g., `todos`, `newTitle`) manage their own data.
- **Single Responsibility**: Each component handles a specific task (e.g., login, register, display todos).

---

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://www.mongodb.com/docs/)
