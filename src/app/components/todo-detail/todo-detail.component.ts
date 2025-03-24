// src/app/components/todo-detail/todo-detail.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { TodoService } from '../../services/todo.service';
// import { Todo } from '../../models/todo.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent {
    todo: any;                // Holds the specific todo item to display
    allTodos: any[] = [];     // (Optional) Placeholder for all todos if needed in future
  
    // Constructor injects ActivatedRoute (to read route parameters) and HttpClient (for API requests)
    constructor(private route: ActivatedRoute, private http: HttpClient) {
      // Extract the "id" parameter from the URL
      const id = this.route.snapshot.paramMap.get('id');  // Example: /todo/123 → id = "123"
      this.fetchTodo(id);  // Fetch the todo item using the extracted ID
    }
  
    // Function to fetch a specific todo from the backend using its ID
    fetchTodo(id: string | null) {
      const token = localStorage.getItem('token');  // Retrieve JWT token from local storage
  
      // Guard clause: stop if no ID or token is found (e.g., unauthenticated or bad route)
      if (!id || !token) return;
  
      // Make GET request to backend API to retrieve the todo
      this.http.get<any>(`http://localhost:5000/api/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` }  // Pass token in Authorization header
      }).subscribe(todo => {
        this.todo = todo;  // Store the fetched todo in the component's state
      });
    }
  }
