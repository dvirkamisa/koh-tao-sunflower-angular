import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { FormSubmissionService } from '../../services/form-submission.service';
import { JoinUsFormData } from '../../models/form-submission.model';

@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss']
})
/**
 * JoinUsComponent handles the community registration form.
 */
export class JoinUsComponent {
  /** Typed reactive form for joining the community */
  joinForm: FormGroup<{
    full_name: FormControl<string>;
    phone: FormControl<string>;
    email: FormControl<string | null>;
    specialty: FormControl<string>;
    specialty_other: FormControl<string | null>;
    experience: FormControl<string | null>;
    availability: FormControl<string | null>;
  }>;
  isSubmitting = false;
  submitted = false;
  error = '';

  specialties = [
    { value: 'yoga', label: 'יוגה ופילאטיס' },
    { value: 'diving', label: 'צלילה' },
    { value: 'music', label: 'מוזיקה והופעות' },
    { value: 'cooking', label: 'בישול ואוכל' },
    { value: 'photography', label: 'צילום' },
    { value: 'massage', label: 'עיסוי ורפואה משלימה' },
    { value: 'fitness', label: 'כושר גופני' },
    { value: 'art', label: 'אמנות ויצירה' },
    { value: 'language', label: 'הוראת שפות' },
    { value: 'tour_guide', label: 'מדריכי טיולים' },
    { value: 'other', label: 'אחר' }
  ];

  constructor(
    private fb: FormBuilder,
    private formSubmissionService: FormSubmissionService
  ) {
    this.joinForm = this.fb.group({
      full_name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2)]),
      phone: this.fb.nonNullable.control('', [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-\(\)]+$/)]),
      email: this.fb.control<string | null>('', [Validators.email]),
      specialty: this.fb.nonNullable.control('', Validators.required),
      specialty_other: this.fb.control<string | null>(''),
      experience: this.fb.control<string | null>(''),
      availability: this.fb.control<string | null>('')
    });
  }

  /**
   * Submit the join form if it is valid and send data to Firebase.
   */
  async onSubmit() {
    if (this.joinForm.valid) {
      this.isSubmitting = true;
      this.error = '';

      try {
        const formData = this.joinForm.value;
        
        // If specialty is 'other', use the specialty_other value
        if (formData.specialty === 'other' && formData.specialty_other) {
          formData.specialty = formData.specialty_other;
        }
        
        // Transform form data to match JoinUsFormData interface
        const submissionData: JoinUsFormData = {
          full_name: formData.full_name || '',
          phone: formData.phone || '',
          email: formData.email || '',
          specialty: formData.specialty || '',
          specialty_other: formData.specialty_other || '',
          experience: formData.experience || '',
          availability: formData.availability || ''
        };

        await firstValueFrom(this.formSubmissionService.submitJoinUsForm(submissionData));
        this.submitted = true;
      } catch (error: any) {
        this.error = error.message || 'אירעה שגיאה בשליחת הטופס. אנא נסו שוב.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
} 