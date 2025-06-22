import { Injectable } from '@angular/core';
import { Database, ref, listVal, objectVal, push, update, remove, query, orderByChild, equalTo } from '@angular/fire/database';
import { Observable, from, map } from 'rxjs';
import { 
  FormSubmission, 
  JoinUsSubmission, 
  RegisterActivitySubmission,
  JoinUsFormData,
  RegisterActivityFormData,
  Activity,
  ActivityRegistration,
  CommunityMember
} from '../models/form-submission.model';

@Injectable({
  providedIn: 'root'
})
export class FormSubmissionService {
  constructor(private db: Database) { }

  // Form Submissions
  submitJoinUsForm(formData: JoinUsFormData): Observable<JoinUsSubmission> {
    const submission: JoinUsSubmission = {
      formType: 'join-us',
      formName: 'הצטרף אלינו',
      userIdentity: formData.full_name || formData.email || 'Unknown',
      timestamp: new Date().toISOString(),
      data: formData,
      status: 'pending'
    };

    const submissionsRef = ref(this.db, 'form_submissions');
    const promise = push(submissionsRef, submission).then(docRef => {
      return { id: docRef.key, ...submission } as JoinUsSubmission;
    });
    return from(promise);
  }

  submitRegisterActivityForm(formData: RegisterActivityFormData): Observable<RegisterActivitySubmission> {
    const submission: RegisterActivitySubmission = {
      formType: 'register-activity',
      formName: 'הרשמה לפעילות',
      userIdentity: formData.full_name || formData.email || 'Unknown',
      timestamp: new Date().toISOString(),
      data: formData,
      status: 'pending'
    };

    const submissionsRef = ref(this.db, 'form_submissions');
    const promise = push(submissionsRef, submission).then(docRef => {
      return { id: docRef.key, ...submission } as RegisterActivitySubmission;
    });
    return from(promise);
  }

  getAllSubmissions(): Observable<FormSubmission[]> {
    const submissionsRef = ref(this.db, 'form_submissions');
    return listVal<FormSubmission>(submissionsRef, { keyField: 'id' }).pipe(
      map(submissions => {
        console.log('FormSubmissionService: Retrieved submissions:', submissions);
        return submissions || [];
      })
    );
  }

  getSubmissionsByType(formType: 'join-us' | 'register-activity'): Observable<FormSubmission[]> {
    const submissionsRef = ref(this.db, 'form_submissions');
    const q = query(submissionsRef, orderByChild('formType'), equalTo(formType));
    return listVal<FormSubmission>(q, { keyField: 'id' }).pipe(
      map(submissions => {
        console.log(`FormSubmissionService: Retrieved ${formType} submissions:`, submissions);
        return submissions || [];
      })
    );
  }

  getSubmission(id: string): Observable<FormSubmission | null> {
    const submissionRef = ref(this.db, `form_submissions/${id}`);
    return objectVal<FormSubmission>(submissionRef, { keyField: 'id' }).pipe(
      map(submission => {
        console.log('FormSubmissionService: Retrieved submission:', submission);
        return submission ?? null;
      })
    );
  }

  updateSubmission(id: string, submission: Partial<FormSubmission>): Observable<void> {
    const submissionRef = ref(this.db, `form_submissions/${id}`);
    const promise = update(submissionRef, submission).then(() => {
      console.log('FormSubmissionService: Updated submission:', id, submission);
    });
    return from(promise);
  }

  deleteSubmission(id: string): Observable<void> {
    const submissionRef = ref(this.db, `form_submissions/${id}`);
    return from(remove(submissionRef)).pipe(
      map(() => {
        console.log('FormSubmissionService: Deleted submission:', id);
      })
    );
  }

  // Legacy methods for backward compatibility
  getActivities(): Observable<Activity[]> {
    const activitiesRef = ref(this.db, 'activities');
    return listVal<Activity>(activitiesRef, { keyField: 'id' }).pipe(
      map(activities => {
        console.log('FormSubmissionService: Retrieved activities:', activities);
        return activities || [];
      })
    );
  }

  getActivityRegistrations(): Observable<ActivityRegistration[]> {
    const registrationsRef = ref(this.db, 'activity_registrations');
    return listVal<ActivityRegistration>(registrationsRef, { keyField: 'id' }).pipe(
      map(registrations => {
        console.log('FormSubmissionService: Retrieved activity registrations:', registrations);
        return registrations || [];
      })
    );
  }

  getCommunityMembers(): Observable<CommunityMember[]> {
    const membersRef = ref(this.db, 'community_members');
    return listVal<CommunityMember>(membersRef, { keyField: 'id' }).pipe(
      map(members => {
        console.log('FormSubmissionService: Retrieved community members:', members);
        return members || [];
      })
    );
  }

  // Helper methods
  getFormDisplayName(formType: string): string {
    const names = {
      'join-us': 'הצטרף אלינו',
      'register-activity': 'הרשמה לפעילות'
    };
    return names[formType as keyof typeof names] || formType;
  }

  getUserIdentity(submission: FormSubmission): string {
    return submission.userIdentity || 'Unknown';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Test Firebase connection
  testConnection(): Observable<boolean> {
    const testRef = ref(this.db, 'test_connection');
    const testData = { timestamp: new Date().toISOString(), test: true };
    
    return from(push(testRef, testData).then(() => {
      console.log('FormSubmissionService: Connection test successful');
      return true;
    }).catch((error: any) => {
      console.error('FormSubmissionService: Connection test failed:', error);
      return false;
    }));
  }

  // Check Firebase configuration
  checkConfiguration(): void {
    console.log('FormSubmissionService: Checking configuration...');
    console.log('Database instance:', this.db);
    console.log('Database app:', this.db.app);
    console.log('Database URL:', this.db.app.options.databaseURL);
    
    // Test if we can create a reference
    try {
      const testRef = ref(this.db, 'test');
      console.log('FormSubmissionService: Reference creation successful:', testRef);
    } catch (error) {
      console.error('FormSubmissionService: Reference creation failed:', error);
    }
  }

  // Test method to create sample data
  createSampleData(): Observable<void> {
    const sampleActivities: Activity[] = [
      {
        title: 'צלילות',
        description: 'גלו את עולם המים הקסום של קו טאו',
        date: '2024-12-15',
        location: 'קו טאו',
        maxParticipants: 10,
        currentParticipants: 0,
        price: 1500,
        imageUrl: 'https://example.com/diving.jpg'
      },
      {
        title: 'יוגה ופילאטיס',
        description: 'התחברו לגוף ולנשמה מול הים',
        date: '2024-12-16',
        location: 'חוף קו טאו',
        maxParticipants: 15,
        currentParticipants: 0,
        price: 200,
        imageUrl: 'https://example.com/yoga.jpg'
      }
    ];

    const sampleRegistrations: ActivityRegistration[] = [
      {
        activityId: 'diving',
        full_name: 'יוסי כהן',
        phone: '+972-50-1234567',
        email: 'yossi@example.com',
        preferred_dates: '2024-12-15',
        additional_notes: 'מתחיל',
        registrationDate: new Date().toISOString()
      },
      {
        activityId: 'yoga',
        full_name: 'שרה לוי',
        phone: '+972-52-9876543',
        email: 'sarah@example.com',
        preferred_dates: '2024-12-16',
        additional_notes: 'מתקדמת',
        registrationDate: new Date().toISOString()
      }
    ];

    const sampleMembers: CommunityMember[] = [
      {
        name: 'דוד ישראלי',
        email: 'david@example.com',
        phone: '+972-54-1111111',
        interests: ['צלילות', 'יוגה'],
        joinDate: new Date().toISOString(),
        isActive: true
      },
      {
        name: 'מיכל רוזן',
        email: 'michal@example.com',
        phone: '+972-53-2222222',
        interests: ['מסיבות', 'טיולים'],
        joinDate: new Date().toISOString(),
        isActive: true
      }
    ];

    // Sample form submissions
    const sampleJoinUsSubmissions = [
      {
        full_name: 'אבי כהן',
        phone: '+972-50-1111111',
        email: 'avi@example.com',
        specialty: 'yoga',
        specialty_other: '',
        experience: '5 שנים',
        availability: 'בוקר וערב'
      },
      {
        full_name: 'מיכל לוי',
        phone: '+972-52-2222222',
        email: 'michal@example.com',
        specialty: 'diving',
        specialty_other: '',
        experience: 'מתחיל',
        availability: 'סופי שבוע'
      }
    ];

    const sampleRegisterActivitySubmissions = [
      {
        full_name: 'יוסי ישראלי',
        phone: '+972-54-3333333',
        email: 'yossi@example.com',
        selectedActivities: ['diving', 'yoga'],
        preferred_dates: '2024-12-15, 2024-12-16',
        additional_notes: 'מתחיל בצלילה'
      },
      {
        full_name: 'שרה רוזן',
        phone: '+972-53-4444444',
        email: 'sarah@example.com',
        selectedActivities: ['parties', 'shabbat'],
        preferred_dates: '2024-12-20',
        additional_notes: 'אוהבת מוזיקה'
      }
    ];

    // Create all sample data
    const promises = [
      ...sampleActivities.map(activity => this.createActivity(activity).toPromise()),
      ...sampleRegistrations.map(registration => this.createActivityRegistration(registration).toPromise()),
      ...sampleMembers.map(member => this.createCommunityMember(member).toPromise()),
      ...sampleJoinUsSubmissions.map(data => this.submitJoinUsForm(data).toPromise()),
      ...sampleRegisterActivitySubmissions.map(data => this.submitRegisterActivityForm(data).toPromise())
    ];

    return from(Promise.all(promises)).pipe(map(() => void 0));
  }

  // Helper methods for creating sample data
  private createActivity(activity: Activity): Observable<Activity> {
    const activitiesRef = ref(this.db, 'activities');
    const promise = push(activitiesRef, activity).then(docRef => {
      const newActivity = { id: docRef.key, ...activity } as Activity;
      console.log('FormSubmissionService: Created activity:', newActivity);
      return newActivity;
    });
    return from(promise);
  }

  private createActivityRegistration(registration: ActivityRegistration): Observable<ActivityRegistration> {
    const registrationsRef = ref(this.db, 'activity_registrations');
    const promise = push(registrationsRef, registration).then(docRef => {
      const newRegistration = { id: docRef.key, ...registration } as ActivityRegistration;
      console.log('FormSubmissionService: Created activity registration:', newRegistration);
      return newRegistration;
    });
    return from(promise);
  }

  private createCommunityMember(member: CommunityMember): Observable<CommunityMember> {
    const membersRef = ref(this.db, 'community_members');
    const promise = push(membersRef, member).then(docRef => {
      const newMember = { id: docRef.key, ...member } as CommunityMember;
      console.log('FormSubmissionService: Created community member:', newMember);
      return newMember;
    });
    return from(promise);
  }
} 