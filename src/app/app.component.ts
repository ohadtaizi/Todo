import { RouterOutlet, RouterModule } from '@angular/router';
// import { TodoListComponent } from './components/todo-list/todo-list.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  //  Import FormsModule
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterModule, FormsModule],  //  Add RouterModule


  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  showNavbar = true;  // Toggle for navbar visibility
  searchTerm = '';
  // Holds the value entered in the search input (starts empty)

  constructor(private router: Router) {
    // Listen to route changes and toggle navbar visibility
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;  // Use full resolved URL
        // Hide navbar on /login or /register
        this.showNavbar = !(url.startsWith('/login') || url.startsWith('/register'));
      });
  }
  // Injects Angular's Router so we can navigate/update URL manually
  logout() {
    localStorage.removeItem('token');         //  Remove stored JWT
    this.router.navigate(['/login']);         //  Navigate to login page
  }

  onSearchChange() {
    this.router.navigate([], {
      queryParams: { search: this.searchTerm },
      // Update or add the "search" query parameter with the value of searchTerm

      queryParamsHandling: 'merge',
    });
  }
}
