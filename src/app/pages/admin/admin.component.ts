import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { FormSubmissionService } from '../../services/form-submission.service';
import { AuthService } from '../../services/auth.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private router = inject(Router);
  private formService = inject(FormSubmissionService);
  private authService = inject(AuthService);
  
  pendingSubmissionsCount = 0;

  ngOnInit() {
    // Subscribe to pending submissions count
    this.formService.getAllSubmissions().pipe(
      map(submissions => submissions.filter(s => s.status === 'pending').length)
    ).subscribe(count => {
      this.pendingSubmissionsCount = count;
    });
  }

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
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
