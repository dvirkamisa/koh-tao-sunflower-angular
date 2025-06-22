import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivitiesService } from '../../services/activities.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
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
      full_name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-\(\)]+$/)]],
      preferred_dates: [''],
      additional_notes: ['']
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

  async onSubmit() {
    if (this.registerForm.valid && this.selectedInterests.length > 0) {
      this.isSubmitting = true;
      this.error = '';

      try {
        const formData = this.registerForm.value;
        
        // Create registration data for each selected activity
        const registrations = this.selectedInterests.map(activityId => ({
          activityId: activityId,
          name: formData.full_name,
          email: formData.email || '',
          phone: formData.phone,
          message: `${formData.preferred_dates ? 'תאריכים מועדפים: ' + formData.preferred_dates + '\n' : ''}${formData.additional_notes ? 'הערות נוספות: ' + formData.additional_notes : ''}`,
          registrationDate: new Date().toISOString()
        }));

        // Register for each activity
        for (const registration of registrations) {
          await this.activitiesService.registerForActivity(registration).toPromise();
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