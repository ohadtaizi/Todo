import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';  // ⬅ Add t
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  message = '';

 // Inject HttpClient to send HTTP requests and Router for navigation
 constructor(private http: HttpClient, private router: Router) {}

 // Triggered when the user submits the registration form
 onRegister() {
   // Send a POST request to the backend with email and password
   this.http.post<any>('http://localhost:5000/api/register', {
       email: this.email,
       password: this.password
     })
     .subscribe({
       next: res => {
         this.message = res.message;                           // Show success message from server
         this.router.navigate(['/todos']);                     // Redirect user to the /todos page
       },
       error: err => {
         // Display error message from server or fallback to a default message
         this.message = err.error?.error || 'Registration failed';
       }
     });
 }
}
