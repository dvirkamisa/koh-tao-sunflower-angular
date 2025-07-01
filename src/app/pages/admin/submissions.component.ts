import { Component, OnInit, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipListboxChange } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormSubmissionService } from '../../services/form-submission.service';
import { FormSubmission, JoinUsFormData, RegisterActivityFormData } from '../../models/form-submission.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatChipsModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {
  @ViewChild('viewDialog') viewDialog!: TemplateRef<any>;
  
  submissions: FormSubmission[] = [];
  filteredSubmissions: FormSubmission[] = [];
  displayedColumns = ['user', 'contact', 'formType', 'timestamp', 'status', 'actions'];
  selectedSubmission: FormSubmission | null = null;
  
  // Filter properties
  selectedStatus: string = 'all';
  selectedFormType: string = 'all';
  activeFilters: string[] = [];
  searchText: string = '';
  dateRange = {
    start: null as Date | null,
    end: null as Date | null
  };

  private service = inject(FormSubmissionService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.loadSubmissions();
  }

  loadSubmissions() {
    this.service.getAllSubmissions().subscribe(data => {
      this.submissions = data.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      this.applyFilters();
    });
  }

  // Filter methods
  onStatusFilterChange(event: MatChipListboxChange) {
    this.selectedStatus = event.value;
    this.applyFilters();
  }

  onFormTypeFilterChange(event: MatChipListboxChange) {
    this.selectedFormType = event.value;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredSubmissions = this.submissions.filter(submission => {
      // Status filter
      const statusMatch = this.selectedStatus === 'all' || submission.status === this.selectedStatus;
      
      // Form type filter
      const formTypeMatch = this.selectedFormType === 'all' || submission.formType === this.selectedFormType;
      
      // Search text filter
      let searchMatch = true;
      if (this.searchText) {
        const searchLower = this.searchText.toLowerCase();
        searchMatch = 
          submission.data.full_name?.toLowerCase().includes(searchLower) ||
          submission.data.phone?.toLowerCase().includes(searchLower) ||
          submission.data.email?.toLowerCase().includes(searchLower) ||
          submission.userIdentity?.toLowerCase().includes(searchLower);
      }
      
      // Date range filter
      let dateMatch = true;
      const submissionDate = new Date(submission.timestamp);
      if (this.dateRange.start) {
        dateMatch = dateMatch && submissionDate >= this.dateRange.start;
      }
      if (this.dateRange.end) {
        const endDate = new Date(this.dateRange.end);
        endDate.setHours(23, 59, 59, 999); // Include whole day
        dateMatch = dateMatch && submissionDate <= endDate;
      }
      
      return statusMatch && formTypeMatch && searchMatch && dateMatch;
    });
    
    // Update active filters
    this.updateActiveFilters();
  }

  updateActiveFilters() {
    this.activeFilters = [];
    
    if (this.selectedStatus !== 'all') {
      this.activeFilters.push(`סטטוס: ${this.getStatusText(this.selectedStatus)}`);
    }
    
    if (this.selectedFormType !== 'all') {
      this.activeFilters.push(`סוג: ${this.getFormTypeDisplayName(this.selectedFormType)}`);
    }
    
    if (this.searchText) {
      this.activeFilters.push(`חיפוש: "${this.searchText}"`);
    }
    
    if (this.dateRange.start || this.dateRange.end) {
      const dateFilter = [];
      if (this.dateRange.start) {
        dateFilter.push(`מ-${this.dateRange.start.toLocaleDateString('he-IL')}`);
      }
      if (this.dateRange.end) {
        dateFilter.push(`עד ${this.dateRange.end.toLocaleDateString('he-IL')}`);
      }
      this.activeFilters.push(`תאריך: ${dateFilter.join(' ')}`);
    }
  }

  removeFilter(filter: string) {
    if (filter.startsWith('סטטוס:')) {
      this.selectedStatus = 'all';
    } else if (filter.startsWith('סוג:')) {
      this.selectedFormType = 'all';
    } else if (filter.startsWith('חיפוש:')) {
      this.searchText = '';
    } else if (filter.startsWith('תאריך:')) {
      this.dateRange = { start: null, end: null };
    }
    this.applyFilters();
  }

  clearFilters() {
    this.selectedStatus = 'all';
    this.selectedFormType = 'all';
    this.searchText = '';
    this.dateRange = { start: null, end: null };
    this.applyFilters();
    this.snackBar.open('הסינון נוקה', 'סגור', { duration: 2000 });
  }

  deleteSubmission(id: string) {
    if (confirm('האם אתה בטוח שברצונך למחוק הגשה זו?')) {
      this.service.deleteSubmission(id).subscribe(() => {
        this.snackBar.open('ההגשה נמחקה בהצלחה', 'סגור', { duration: 2000 });
        this.loadSubmissions();
      });
    }
  }

  updateSubmissionStatus(submission: FormSubmission, status: 'pending' | 'approved' | 'rejected') {
    if (!submission.id) return;
    
    this.service.updateSubmission(submission.id, { 
      status,
      reviewedBy: 'Admin',
      reviewedAt: new Date().toISOString()
    }).subscribe(() => {
      const statusText = {
        'approved': 'אושרה',
        'rejected': 'נדחתה',
        'pending': 'עודכנה לממתינה'
      };
      this.snackBar.open(`ההגשה ${statusText[status]} בהצלחה`, 'סגור', { duration: 2000 });
      this.loadSubmissions();
    });
  }

  viewSubmission(submission: FormSubmission) {
    this.selectedSubmission = submission;
    this.dialog.open(this.viewDialog, {
      width: '600px',
      data: submission
    });
  }

  // Get contact info
  getContactInfo(submission: FormSubmission): { phone: string, email: string } {
    return {
      phone: submission.data.phone || '-',
      email: submission.data.email || '-'
    };
  }

  // Statistics methods
  getPendingCount(): number {
    return this.submissions.filter(s => s.status === 'pending').length;
  }

  getApprovedCount(): number {
    return this.submissions.filter(s => s.status === 'approved').length;
  }

  getRejectedCount(): number {
    return this.submissions.filter(s => s.status === 'rejected').length;
  }

  // UI Helper methods
  getFormTypeIcon(formType: string): string {
    const icons: { [key: string]: string } = {
      'join-us': 'person_add',
      'register-activity': 'event'
    };
    return icons[formType] || 'description';
  }

  getFormTypeDisplayName(formType: string): string {
    const names: { [key: string]: string } = {
      'join-us': 'הצטרף אלינו',
      'register-activity': 'הרשמה לפעילות'
    };
    return names[formType] || formType;
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'pending': 'schedule',
      'approved': 'check_circle',
      'rejected': 'cancel'
    };
    return icons[status] || 'help';
  }

  getStatusText(status: string): string {
    const texts: { [key: string]: string } = {
      'pending': 'ממתין',
      'approved': 'אושר',
      'rejected': 'נדחה'
    };
    return texts[status] || status;
  }

  // Format date
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Get submission details based on type
  getSubmissionDetails(submission: FormSubmission): any {
    if (submission.formType === 'join-us') {
      const data = submission.data as JoinUsFormData;
      return {
        'שם מלא': data.full_name,
        'טלפון': data.phone,
        'אימייל': data.email || '-',
        'תחום התמחות': this.getSpecialtyName(data.specialty),
        'התמחות אחרת': data.specialty_other || '-',
        'ניסיון': data.experience || '-',
        'זמינות': data.availability || '-'
      };
    } else if (submission.formType === 'register-activity') {
      const data = submission.data as RegisterActivityFormData;
      return {
        'שם מלא': data.full_name,
        'טלפון': data.phone,
        'אימייל': data.email || '-',
        'פעילויות': data.selectedActivities ? data.selectedActivities.map(a => this.getActivityName(a)).join(', ') : '-',
        'תאריכים מועדפים': data.preferred_dates || '-',
        'הערות': data.additional_notes || '-'
      };
    }
    return {};
  }

  getSpecialtyName(specialty: string): string {
    const specialties: { [key: string]: string } = {
      'diving': 'צלילה',
      'yoga': 'יוגה ופילאטיס',
      'hospitality': 'אירוח',
      'parties': 'אירועים ומסיבות',
      'other': 'אחר'
    };
    return specialties[specialty] || specialty;
  }

  getActivityName(activity: string): string {
    const activities: { [key: string]: string } = {
      'diving': 'צלילות',
      'yoga': 'יוגה ופילאטיס',
      'parties': 'אירועים ומסיבות',
      'shabbat': 'ארוחות שבת'
    };
    return activities[activity] || activity;
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
