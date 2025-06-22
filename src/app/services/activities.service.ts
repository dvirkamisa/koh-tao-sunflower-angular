import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

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
  name: string;
  email: string;
  phone: string;
  message?: string;
  registrationDate: string;
}

@Injectable({
  providedIn: 'root'
})
/**
 * Service for managing activities and registrations.
 */
export class ActivitiesService {
  constructor(private apiService: ApiService) { }

  /**
   * Retrieve all activities from the backend.
   */
  getActivities(): Observable<Activity[]> {
    return this.apiService.get<Activity[]>('/activities');
  }

  /**
   * Get a specific activity by its identifier.
   */
  getActivity(id: string): Observable<Activity> {
    return this.apiService.get<Activity>(`/activities/${id}`);
  }

  /**
   * Create a new activity.
   */
  createActivity(activity: Activity): Observable<Activity> {
    return this.apiService.post<Activity>('/activities', activity);
  }

  /**
   * Update an existing activity.
   */
  updateActivity(id: string, activity: Activity): Observable<Activity> {
    return this.apiService.put<Activity>(`/activities/${id}`, activity);
  }

  /**
   * Delete an activity by its identifier.
   */
  deleteActivity(id: string): Observable<void> {
    return this.apiService.delete<void>(`/activities/${id}`);
  }

  /**
   * Register a user for an activity.
   */
  registerForActivity(registration: ActivityRegistration): Observable<ActivityRegistration> {
    return this.apiService.post<ActivityRegistration>('/activities/register', registration);
  }

  /**
   * Get registrations related to an activity.
   */
  getActivityRegistrations(activityId: string): Observable<ActivityRegistration[]> {
    return this.apiService.get<ActivityRegistration[]>(`/activities/${activityId}/registrations`);
  }
} 
