import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],  // Imports necessary Angular modules for template features
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
    todos: any[] = [];  // Holds the filtered todos to display

    allTodos: any[] = []; // Holds all todos from the database (used for search filtering)
    newTitle = ''; // Two-way bound to the Title input field
    newDescription = ''; // Two-way bound to the Description input field

    // Signals for state management (reactive variables)
    constructor(private http: HttpClient, private route: ActivatedRoute) {
        this.loadTodos();  // Load todos from DB

        // Listen to changes in query parameters
        this.route.queryParams.subscribe(params => {
            const search = params['search']?.toLowerCase() || '';
            this.applySearchFilter(search);
            // Filter todos based on the search query
        });
    }

    /**
    * Filters the todos based on the given search term.
    * If search term is empty, show all todos.
    * Otherwise, filter todos by title or description.
    */
    applySearchFilter(searchTerm: string) {
        if (!searchTerm) {
            this.todos = this.allTodos;       // If search is empty, reset to original todos

            return;
        }
        // Filter todos by checking if the title or description includes the search term
        this.todos = this.allTodos.filter(todo =>
            todo.title.toLowerCase().includes(searchTerm) ||
            todo.description.toLowerCase().includes(searchTerm)
        );
    }

    /**
     * Fetches todos from the server with user authentication (token).
    * Stores the data in both `allTodos` and `todos`.
    */
    loadTodos() {
        const token = localStorage.getItem('token');
         // Send GET request with Authorization header
        this.http.get<any[]>('http://localhost:5000/api/todos', { headers: { Authorization: `Bearer ${token}` } })
            .subscribe(todos => {
                this.allTodos = todos;       //  Store original todos for filtering
                this.todos = todos;          // Display todos
            });
    }

  /**
   * Adds a new todo to the server and updates UI.
   */
    addNewTodo() {
        const token = localStorage.getItem('token');
        console.log("token12", token)
        if (!token) {
            console.error('No token found');
            return;  // Stop execution if token is missing
        }
            // Decode JWT to extract userId (payload is in the 2nd part of the token)

        const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.id;

        const newTodo = {
            title: this.newTitle,
            description: this.newDescription,
            completed: false,
            userId
        };
 // Send POST request to create a new todo
        this.http.post<any>('http://localhost:5000/api/todo', newTodo, { headers: { Authorization: `Bearer ${token}` } })
            .subscribe(todo => {
                this.todos.push(todo);// Add new todo to UI
                this.newTitle = ''; // Clear form inputs
                this.newDescription = '';
            });
    }
  /**
   * Toggles the 'completed' status of a todo.
   * Sends a PUT request to update it on the server.
   */
    toggle(todo: any) {
        const token = localStorage.getItem('token');
        const updatedTodo = { ...todo, completed: !todo.completed };

        this.http.put<any>(`http://localhost:5000/api/todo/${todo._id}`, updatedTodo,{ headers: { Authorization: `Bearer ${token}` } })
            .subscribe(updated => {
                todo.completed = updated.completed;  // Update local UI
            });
    }

}
