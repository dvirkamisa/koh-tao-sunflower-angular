import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormSubmissionService } from '../../services/form-submission.service';
import { FormSubmission, JoinUsFormData } from '../../models/form-submission.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
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
    MatTooltipModule
  ],
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {
  submissions: FormSubmission[] = [];
  displayedColumns = ['user', 'formType', 'timestamp', 'status', 'actions'];

  private service = inject(FormSubmissionService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.loadSubmissions();
  }

  loadSubmissions() {
    this.service.getAllSubmissions().subscribe(data => {
      this.submissions = data;
    });
  }

  deleteSubmission(id: string) {
    this.service.deleteSubmission(id).subscribe(() => {
      this.snackBar.open('הפריט נמחק', 'סגור', { duration: 2000 });
      this.loadSubmissions();
    });
  }

  markProcessed(submission: FormSubmission) {
    if (!submission.id) return;
    this.service.updateSubmission(submission.id, { status: 'approved' }).subscribe(() => {
      this.snackBar.open('העודכן', 'סגור', { duration: 2000 });
      this.loadSubmissions();
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddSubmissionDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('נוסף בהצלחה', 'סגור', { duration: 2000 });
        this.loadSubmissions();
      }
    });
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

  viewSubmission(submission: FormSubmission) {
    // TODO: Implement view submission dialog
    console.log('View submission:', submission);
    this.snackBar.open('פונקציונליות צפייה תתווסף בקרוב', 'סגור', { duration: 2000 });
  }
}

@Component({
  selector: 'app-add-submission-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
  <h2 mat-dialog-title>הוספת הגשה</h2>
  <form [formGroup]="form" class="dialog-form" mat-dialog-content>
    <mat-form-field appearance="fill">
      <mat-label>שם מלא</mat-label>
      <input matInput formControlName="full_name" required />
    </mat-form-field>
    <mat-form-field appearance="fill">
      <mat-label>טלפון</mat-label>
      <input matInput formControlName="phone" required />
    </mat-form-field>
    <mat-form-field appearance="fill">
      <mat-label>אימייל</mat-label>
      <input matInput formControlName="email" />
    </mat-form-field>
  </form>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>ביטול</button>
    <button mat-flat-button color="primary" (click)="submit()" [disabled]="form.invalid">שמור</button>
  </div>
  `,
  styles: [
    `.dialog-form { display: flex; flex-direction: column; gap: 1rem; width: 100%; }`
  ]
})
export class AddSubmissionDialogComponent {
  private fb = inject(FormBuilder);
  private service = inject(FormSubmissionService);
  private dialogRef = inject(MatDialog);

  form = this.fb.nonNullable.group({
    full_name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['']
  });

  submit() {
    const data: JoinUsFormData = {
      full_name: this.form.value.full_name!,
      phone: this.form.value.phone!,
      email: this.form.value.email || '',
      specialty: 'other',
      availability: '',
      experience: '',
      specialty_other: ''
    };
    this.service.submitJoinUsForm(data).subscribe(() => {
      this.dialogRef.closeAll();
    });
  }
}
