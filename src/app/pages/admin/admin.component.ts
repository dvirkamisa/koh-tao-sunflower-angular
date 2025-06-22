import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private router: Router) {}

  getCurrentPageTitle(): string {
    const url = this.router.url;
    if (url.includes('dashboard')) return 'דשבורד';
    if (url.includes('submissions')) return 'הגשות';
    if (url.includes('activities')) return 'פעילויות';
    if (url.includes('members')) return 'חברי קהילה';
    if (url.includes('settings')) return 'הגדרות';
    return 'דשבורד';
  }

  logout(): void {
    // Add logout logic here
    console.log('Logout clicked');
    // Navigate to home page or login page
    this.router.navigate(['/']);
  }
}
