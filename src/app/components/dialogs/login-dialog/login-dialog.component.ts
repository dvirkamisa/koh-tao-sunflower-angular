import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  private authService = inject(AuthService);
  
  username = '';
  password = '';
  showPassword = false;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  onLogin(): void {
    this.errorMessage = '';
    
    if (!this.username || !this.password) {
      this.errorMessage = 'אנא מלא את כל השדות';
      return;
    }

    const success = this.authService.login(this.username, this.password);
    
    if (success) {
      this.dialogRef.close(true);
    } else {
      this.errorMessage = 'שם משתמש או סיסמה שגויים';
      this.password = '';
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
} 