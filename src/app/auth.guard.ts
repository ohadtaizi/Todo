import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
// Makes this guard globally available without needing to add it to providers[]

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
    // Injects Angular's Router service for redirection

  canActivate(): boolean {
    
    const token = localStorage.getItem('token');
        // Checks if a JWT token is stored (user is logged in)

    if (token) return true;
    //  Token exists: allow route activation

    this.router.navigate(['/login']);   //  No token: redirect user to login page
    return false;  // Deny access to the protected route
  }
}
