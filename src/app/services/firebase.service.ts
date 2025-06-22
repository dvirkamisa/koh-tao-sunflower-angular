import { Injectable } from '@angular/core';
import { Database, ref, listVal, objectVal, push, update, remove, query, orderByChild, equalTo } from '@angular/fire/database';
import { Observable, from, map } from 'rxjs';

export interface Activity {
  id?: string;
  title: string;
  description: string;
  date: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  price?: number;
  imageUrl?: string;
}

export interface ActivityRegistration {
  id?: string;
  activityId: string;
  full_name: string;
  phone: string;
  email?: string;
  preferred_dates?: string;
  additional_notes?: string;
  registrationDate: string;
}

export interface CommunityMember {
  id?: string;
  name: string;
  email: string;
  phone: string;
  interests: string[];
  joinDate: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: Database) { 
    console.log('FirebaseService: Initializing...');
    this.checkConfiguration();
  }

  // Activities methods
  getActivities(): Observable<Activity[]> {
    const activitiesRef = ref(this.db, 'activities');
    return listVal<Activity>(activitiesRef, { keyField: 'id' }).pipe(
      map(activities => {
        console.log('Firebase: Retrieved activities:', activities);
        return activities || [];
      })
    );
  }

  getActivity(id: string): Observable<Activity | null> {
    const activityRef = ref(this.db, `activities/${id}`);
    return objectVal<Activity>(activityRef, { keyField: 'id' }).pipe(
      map(activity => {
        console.log('Firebase: Retrieved activity:', activity);
        return activity ?? null;
      })
    );
  }

  createActivity(activity: Activity): Observable<Activity> {
    const activitiesRef = ref(this.db, 'activities');
    const promise = push(activitiesRef, activity).then(docRef => {
      const newActivity = { id: docRef.key, ...activity } as Activity;
      console.log('Firebase: Created activity:', newActivity);
      return newActivity;
    });
    return from(promise);
  }

  updateActivity(id: string, activity: Activity): Observable<Activity> {
    const activityRef = ref(this.db, `activities/${id}`);
    const { id: _, ...activityData } = activity;
    const promise = update(activityRef, activityData).then(() => {
      console.log('Firebase: Updated activity:', activity);
      return activity;
    });
    return from(promise);
  }

  deleteActivity(id: string): Observable<void> {
    const activityRef = ref(this.db, `activities/${id}`);
    return from(remove(activityRef)).pipe(
      map(() => {
        console.log('Firebase: Deleted activity:', id);
      })
    );
  }

  // Activity Registration methods
  registerForActivity(registration: ActivityRegistration): Observable<ActivityRegistration> {
    const registrationsRef = ref(this.db, 'activity_registrations');
    const promise = push(registrationsRef, registration).then(docRef => {
      const newRegistration = { id: docRef.key, ...registration } as ActivityRegistration;
      console.log('Firebase: Created registration:', newRegistration);
      return newRegistration;
    });
    return from(promise);
  }

  getActivityRegistrations(activityId: string): Observable<ActivityRegistration[]> {
    const registrationsRef = ref(this.db, 'activity_registrations');
    const q = query(registrationsRef, orderByChild('activityId'), equalTo(activityId));
    return listVal<ActivityRegistration>(q, { keyField: 'id' }).pipe(
      map(registrations => {
        console.log('Firebase: Retrieved registrations for activity:', activityId, registrations);
        return registrations || [];
      })
    );
  }

  // Community methods
  getCommunityMembers(): Observable<CommunityMember[]> {
    const membersRef = ref(this.db, 'community_members');
    return listVal<CommunityMember>(membersRef, { keyField: 'id' }).pipe(
      map(members => {
        console.log('Firebase: Retrieved community members:', members);
        return members || [];
      })
    );
  }

  addCommunityMember(member: CommunityMember): Observable<CommunityMember> {
    const membersRef = ref(this.db, 'community_members');
    const promise = push(membersRef, member).then(docRef => {
      const newMember = { id: docRef.key, ...member } as CommunityMember;
      console.log('Firebase: Created community member:', newMember);
      return newMember;
    });
    return from(promise);
  }

  updateCommunityMember(id: string, member: CommunityMember): Observable<CommunityMember> {
    const memberRef = ref(this.db, `community_members/${id}`);
    const { id: _, ...memberData } = member;
    const promise = update(memberRef, memberData).then(() => {
      console.log('Firebase: Updated community member:', member);
      return member;
    });
    return from(promise);
  }

  deleteCommunityMember(id: string): Observable<void> {
    const memberRef = ref(this.db, `community_members/${id}`);
    return from(remove(memberRef)).pipe(
      map(() => {
        console.log('Firebase: Deleted community member:', id);
      })
    );
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

    // Create all sample data
    const promises = [
      ...sampleActivities.map(activity => this.createActivity(activity).toPromise()),
      ...sampleRegistrations.map(registration => this.registerForActivity(registration).toPromise()),
      ...sampleMembers.map(member => this.addCommunityMember(member).toPromise())
    ];

    return from(Promise.all(promises)).pipe(map(() => void 0));
  }

  // Test Firebase connection
  testConnection(): Observable<boolean> {
    const testRef = ref(this.db, 'test_connection');
    const testData = { timestamp: new Date().toISOString(), test: true };
    
    return from(push(testRef, testData).then(() => {
      console.log('Firebase: Connection test successful');
      return true;
    }).catch(error => {
      console.error('Firebase: Connection test failed:', error);
      return false;
    }));
  }

  // Check Firebase configuration
  checkConfiguration(): void {
    console.log('Firebase: Checking configuration...');
    console.log('Database instance:', this.db);
    console.log('Database app:', this.db.app);
    console.log('Database URL:', this.db.app.options.databaseURL);
    
    // Test if we can create a reference
    try {
      const testRef = ref(this.db, 'test');
      console.log('Firebase: Reference creation successful:', testRef);
    } catch (error) {
      console.error('Firebase: Reference creation failed:', error);
    }
  }
} 