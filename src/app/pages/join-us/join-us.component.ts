import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss']
})
export class JoinUsComponent {
  joinForm: FormGroup;
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
    private communityService: CommunityService
  ) {
    this.joinForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-\(\)]+$/)]],
      email: ['', [Validators.email]],
      specialty: ['', Validators.required],
      specialty_other: [''],
      experience: [''],
      availability: ['']
    });
  }

  async onSubmit() {
    if (this.joinForm.valid) {
      this.isSubmitting = true;
      this.error = '';

      try {
        const formData = this.joinForm.value;
        
        // If specialty is 'other', use the specialty_other value
        if (formData.specialty === 'other') {
          formData.specialty = formData.specialty_other;
        }
        
        // Remove specialty_other from the data
        delete formData.specialty_other;

        await this.communityService.joinCommunity(formData);
        this.submitted = true;
      } catch (error: any) {
        this.error = error.message || 'אירעה שגיאה בשליחת הטופס. אנא נסו שוב.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
} 