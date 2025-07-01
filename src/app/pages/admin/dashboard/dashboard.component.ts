import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormSubmissionService } from '../../../services/form-submission.service';
import { FormSubmission } from '../../../models/form-submission.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private formService = inject(FormSubmissionService);
  
  // Observable for all submissions
  submissions$!: Observable<FormSubmission[]>;
  
  // Stats observables
  totalMembers$!: Observable<number>;
  totalActivities$!: Observable<number>;
  totalSubmissions$!: Observable<number>;
  pendingSubmissions$!: Observable<number>;
  todaySubmissions$!: Observable<number>;
  
  // Recent activity
  recentActivity$!: Observable<any[]>;

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Get all submissions
    this.submissions$ = this.formService.getAllSubmissions();
    
    // Calculate total members (unique users from join-us forms)
    this.totalMembers$ = this.submissions$.pipe(
      map(submissions => {
        const uniqueMembers = new Set();
        submissions.forEach(sub => {
          if (sub.formType === 'join-us' && sub.status === 'approved') {
            uniqueMembers.add(sub.data.email || sub.data.phone);
          }
        });
        return uniqueMembers.size;
      })
    );
    
    // Calculate total activities (unique activities from registrations)
    this.totalActivities$ = this.submissions$.pipe(
      map(submissions => {
        const activities = new Set();
        submissions.forEach(sub => {
          if (sub.formType === 'register-activity' && sub.data.selectedActivities) {
            sub.data.selectedActivities.forEach((activity: string) => {
              activities.add(activity);
            });
          }
        });
        return activities.size;
      })
    );
    
    // Total submissions
    this.totalSubmissions$ = this.submissions$.pipe(
      map(submissions => submissions.length)
    );
    
    // Pending submissions
    this.pendingSubmissions$ = this.submissions$.pipe(
      map(submissions => submissions.filter(s => s.status === 'pending').length)
    );
    
    // Today's submissions
    this.todaySubmissions$ = this.submissions$.pipe(
      map(submissions => {
        const today = new Date().toDateString();
        return submissions.filter(s => 
          new Date(s.timestamp).toDateString() === today
        ).length;
      })
    );
    
    // Recent activity (last 5 submissions)
    this.recentActivity$ = this.submissions$.pipe(
      map(submissions => {
        return submissions
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 5)
          .map(sub => ({
            type: sub.formType,
            title: this.getActivityTitle(sub),
            description: this.getActivityDescription(sub),
            time: this.getRelativeTime(sub.timestamp),
            icon: this.getActivityIcon(sub)
          }));
      })
    );
  }
  
  private getActivityTitle(submission: FormSubmission): string {
    if (submission.formType === 'join-us') {
      return 'חבר חדש הצטרף';
    } else if (submission.formType === 'register-activity') {
      return 'הרשמה לפעילות';
    }
    return 'פעילות חדשה';
  }
  
  private getActivityDescription(submission: FormSubmission): string {
    if (submission.formType === 'join-us') {
      return `${submission.data.full_name} הצטרף/ה לקהילה`;
    } else if (submission.formType === 'register-activity') {
      return `${submission.data.full_name} נרשם/ה לפעילות`;
    }
    return 'פעילות חדשה נוספה';
  }
  
  private getActivityIcon(submission: FormSubmission): string {
    const icons: { [key: string]: string } = {
      'join-us': 'person_add',
      'register-activity': 'event',
      'approved': 'check_circle',
      'rejected': 'cancel'
    };
    return icons[submission.formType] || 'assignment';
  }
  
  private getRelativeTime(timestamp: string): string {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now.getTime() - then.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `לפני ${diffMins} דקות`;
    } else if (diffHours < 24) {
      return `לפני ${diffHours} שעות`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `לפני ${diffDays} ימים`;
    }
  }
}
