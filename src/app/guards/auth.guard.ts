import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../components/dialogs/login-dialog/login-dialog.component';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const dialog = inject(MatDialog);

  // Check if already authenticated
  if (authService.isAuthenticated()) {
    return true;
  }

  // Open login dialog
  const dialogRef = dialog.open(LoginDialogComponent, {
    width: '400px',
    disableClose: true,
    panelClass: 'login-dialog'
  });

  try {
    const result = await firstValueFrom(dialogRef.afterClosed());
    if (result === true) {
      return true;
    }
  } catch (error) {
    console.error('Login dialog error:', error);
  }

  // If login failed or cancelled, redirect to home
  router.navigate(['/']);
  return false;
}; 