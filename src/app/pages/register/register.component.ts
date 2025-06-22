import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { FormSubmissionService } from '../../services/form-submission.service';
import { RegisterActivityFormData } from '../../models/form-submission.model';
import { activities, Activity } from './activities.data';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
/**
 * RegisterComponent allows visitors to sign up for selected activities.
 */
export class RegisterComponent {
  /** Reactive form used for registering to activities */
  registerForm: FormGroup<{
    full_name: FormControl<string>;
    phone: FormControl<string>;
    email: FormControl<string | null>;
    preferred_dates: FormControl<string | null>;
    additional_notes: FormControl<string | null>;
  }>;
  selectedInterests: string[] = [];
  isSubmitting = false;
  submitted = false;
  error = '';

  activities: Activity[] = activities;

  constructor(
    private fb: FormBuilder,
    private formSubmissionService: FormSubmissionService
  ) {
    this.registerForm = this.fb.group({
      full_name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2)]),
      phone: this.fb.nonNullable.control('', [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-\(\)]+$/)]),
      email: this.fb.control<string | null>('', [Validators.email]),
      preferred_dates: this.fb.control<string | null>(''),
      additional_notes: this.fb.control<string | null>('')
    });
  }

  isActivitySelected(activityValue: string): boolean {
    return this.selectedInterests.includes(activityValue);
  }

  onInterestChange(event: any, activityValue: string) {
    if (event.target.checked) {
      this.selectedInterests.push(activityValue);
    } else {
      this.selectedInterests = this.selectedInterests.filter(value => value !== activityValue);
    }
  }

  /**
   * Submit the registration form and register for selected activities.
   */
  async onSubmit() {
    if (this.registerForm.valid && this.selectedInterests.length > 0) {
      this.isSubmitting = true;
      this.error = '';

      try {
        const formData = this.registerForm.value;
        
        // Convert selected activity values to Hebrew labels
        const selectedActivityLabels = this.selectedInterests.map(activityValue => {
          const found = this.activities.find(activity => activity.value === activityValue);
          return found?.label || activityValue;
        });
        
        // Transform form data to match RegisterActivityFormData interface
        const submissionData: RegisterActivityFormData = {
          full_name: formData.full_name || '',
          phone: formData.phone || '',
          email: formData.email || '',
          selectedActivities: selectedActivityLabels,
          preferred_dates: formData.preferred_dates || '',
          additional_notes: formData.additional_notes || ''
        };

        await firstValueFrom(this.formSubmissionService.submitRegisterActivityForm(submissionData));
        this.submitted = true;
      } catch (error: any) {
        this.error = error.message || 'אירעה שגיאה בשליחת הטופס. אנא נסו שוב.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
} 