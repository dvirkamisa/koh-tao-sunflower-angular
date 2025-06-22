import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ActivitiesService } from '../../services/activities.service';
import { ActivityRegistration } from '../../services/firebase.service';

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

  activities = [
    { id: 'diving', label: 'צלילות', icon: '🤿' },
    { id: 'yoga', label: 'יוגה ופילאטיס', icon: '🧘‍♀️' },
    { id: 'parties', label: 'מסיבות והופעות', icon: '🎵' },
    { id: 'ice_bath', label: 'אמבטיות קרח', icon: '❄️' },
    { id: 'sauna', label: 'סאונה יבשה', icon: '🔥' },
    { id: 'motorcycle', label: 'טיולי אופנועים', icon: '🏍️' },
    { id: 'shabbat', label: 'ארוחות שבת', icon: '🕯️' }
  ];

  constructor(
    private fb: FormBuilder,
    private activitiesService: ActivitiesService
  ) {
    this.registerForm = this.fb.group({
      full_name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2)]),
      phone: this.fb.nonNullable.control('', [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-\(\)]+$/)]),
      email: this.fb.control<string | null>('', [Validators.email]),
      preferred_dates: this.fb.control<string | null>(''),
      additional_notes: this.fb.control<string | null>('')
    });
  }

  isActivitySelected(activityId: string): boolean {
    return this.selectedInterests.includes(activityId);
  }

  onInterestChange(event: any, activityId: string) {
    if (event.target.checked) {
      this.selectedInterests.push(activityId);
    } else {
      this.selectedInterests = this.selectedInterests.filter(id => id !== activityId);
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
        
        // Create registration data for each selected activity
        const registrations = this.selectedInterests.map(activityId => ({
          activityId: activityId,
          full_name: formData.full_name || '',
          phone: formData.phone || '',
          email: formData.email || '',
          preferred_dates: formData.preferred_dates || '',
          additional_notes: formData.additional_notes || '',
          registrationDate: new Date().toISOString()
        } as ActivityRegistration));

        // Register for each activity
        for (const registration of registrations) {
          await firstValueFrom(this.activitiesService.registerForActivity(registration));
        }
        
        this.submitted = true;
      } catch (error: any) {
        this.error = error.message || 'אירעה שגיאה בשליחת הטופס. אנא נסו שוב.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
} 