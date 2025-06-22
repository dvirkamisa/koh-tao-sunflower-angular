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
  constructor(private db: Database) { }

  // Activities methods
  getActivities(): Observable<Activity[]> {
    const activitiesRef = ref(this.db, 'activities');
    return listVal<Activity>(activitiesRef, { keyField: 'id' });
  }

  getActivity(id: string): Observable<Activity | null> {
    const activityRef = ref(this.db, `activities/${id}`);
    return objectVal<Activity>(activityRef, { keyField: 'id' }).pipe(map(a => a ?? null));
  }

  createActivity(activity: Activity): Observable<Activity> {
    const activitiesRef = ref(this.db, 'activities');
    const promise = push(activitiesRef, activity).then(docRef => {
      return { id: docRef.key, ...activity } as Activity;
    });
    return from(promise);
  }

  updateActivity(id: string, activity: Activity): Observable<Activity> {
    const activityRef = ref(this.db, `activities/${id}`);
    const { id: _, ...activityData } = activity;
    const promise = update(activityRef, activityData).then(() => activity);
    return from(promise);
  }

  deleteActivity(id: string): Observable<void> {
    const activityRef = ref(this.db, `activities/${id}`);
    return from(remove(activityRef));
  }

  // Activity Registration methods
  registerForActivity(registration: ActivityRegistration): Observable<ActivityRegistration> {
    const registrationsRef = ref(this.db, 'activity_registrations');
    const promise = push(registrationsRef, registration).then(docRef => {
      return { id: docRef.key, ...registration } as ActivityRegistration;
    });
    return from(promise);
  }

  getActivityRegistrations(activityId: string): Observable<ActivityRegistration[]> {
    const registrationsRef = ref(this.db, 'activity_registrations');
    const q = query(registrationsRef, orderByChild('activityId'), equalTo(activityId));
    return listVal<ActivityRegistration>(q, { keyField: 'id' });
  }

  // Community methods
  getCommunityMembers(): Observable<CommunityMember[]> {
    const membersRef = ref(this.db, 'community_members');
    return listVal<CommunityMember>(membersRef, { keyField: 'id' });
  }

  addCommunityMember(member: CommunityMember): Observable<CommunityMember> {
    const membersRef = ref(this.db, 'community_members');
    const promise = push(membersRef, member).then(docRef => {
      return { id: docRef.key, ...member } as CommunityMember;
    });
    return from(promise);
  }

  updateCommunityMember(id: string, member: CommunityMember): Observable<CommunityMember> {
    const memberRef = ref(this.db, `community_members/${id}`);
    const { id: _, ...memberData } = member;
    const promise = update(memberRef, memberData).then(() => member);
    return from(promise);
  }

  deleteCommunityMember(id: string): Observable<void> {
    const memberRef = ref(this.db, `community_members/${id}`);
    return from(remove(memberRef));
  }
} 