import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService, Activity, ActivityRegistration } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for managing activities and registrations using Firebase.
 */
export class ActivitiesService {
  constructor(private firebaseService: FirebaseService) { }

  /**
   * Retrieve all activities from Firebase.
   */
  getActivities(): Observable<Activity[]> {
    return this.firebaseService.getActivities();
  }

  /**
   * Get a specific activity by its identifier.
   */
  getActivity(id: string): Observable<Activity | null> {
    return this.firebaseService.getActivity(id);
  }

  /**
   * Create a new activity.
   */
  createActivity(activity: Activity): Observable<Activity> {
    return this.firebaseService.createActivity(activity);
  }

  /**
   * Update an existing activity.
   */
  updateActivity(id: string, activity: Activity): Observable<Activity> {
    return this.firebaseService.updateActivity(id, activity);
  }

  /**
   * Delete an activity by its identifier.
   */
  deleteActivity(id: string): Observable<void> {
    return this.firebaseService.deleteActivity(id);
  }

  /**
   * Register a user for an activity.
   */
  registerForActivity(registration: ActivityRegistration): Observable<ActivityRegistration> {
    return this.firebaseService.registerForActivity(registration);
  }

  /**
   * Get registrations related to an activity.
   */
  getActivityRegistrations(activityId: string): Observable<ActivityRegistration[]> {
    return this.firebaseService.getActivityRegistrations(activityId);
  }
} 
