import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';  // ⬅ Add this

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}  // ⬅ Inject Router
// Injects HttpClient for API requests and Router for navigation

// Function triggered on login form submission
onLogin() {
  // Sends POST request to login endpoint with email and password
  this.http.post<any>('http://localhost:5000/api/login', { email: this.email, password: this.password })
    .subscribe({
      next: res => {
        this.message = res.message;                     // Show success message from server
        localStorage.setItem('token', res.token);       // Save JWT token in browser for future authenticated requests
        this.router.navigate(['/todos']);               // Redirect user to the /todos route (e.g., Todo List page)
      },
      error: err => {
        // Show error message returned from server, or default to 'Login failed'
        this.message = err.error?.error || 'Login failed';
      }
    });
}
}
