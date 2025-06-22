import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormSubmissionService } from '../../../services/form-submission.service';
import { FormSubmission } from '../../../models/form-submission.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-submissions-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './submissions-list.component.html',
  styleUrls: ['./submissions-list.component.scss']
})
export class SubmissionsListComponent implements OnInit {
  submissions$: Observable<FormSubmission[]> | undefined;
  displayedColumns = ['id', 'formType', 'userIdentity', 'timestamp', 'status', 'actions'];

  constructor(private submissions: FormSubmissionService) {}

  ngOnInit() {
    this.submissions$ = this.submissions.getAllSubmissions();
  }

  delete(id: string) {
    this.submissions.deleteSubmission(id).subscribe();
  }
}
