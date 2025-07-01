import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Static credentials - change these in production!
  private readonly ADMIN_USERNAME = 'admin';
  private readonly ADMIN_PASSWORD = 'kohtao2024';
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkStoredAuth());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  private checkStoredAuth(): boolean {
    // Check if user is already authenticated (stored in sessionStorage)
    const authToken = sessionStorage.getItem('adminAuth');
    return authToken === 'authenticated';
  }

  login(username: string, password: string): boolean {
    if (username === this.ADMIN_USERNAME && password === this.ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuth', 'authenticated');
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem('adminAuth');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
} 