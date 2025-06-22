import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService, CommunityMember } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for managing community members using Firebase.
 */
export class CommunityService {
  constructor(private firebaseService: FirebaseService) { }

  /**
   * Get all community members.
   */
  getCommunityMembers(): Observable<CommunityMember[]> {
    return this.firebaseService.getCommunityMembers();
  }

  /**
   * Add a new community member.
   */
  addCommunityMember(member: CommunityMember): Observable<CommunityMember> {
    return this.firebaseService.addCommunityMember(member);
  }

  /**
   * Update an existing community member.
   */
  updateCommunityMember(id: string, member: CommunityMember): Observable<CommunityMember> {
    return this.firebaseService.updateCommunityMember(id, member);
  }

  /**
   * Delete a community member.
   */
  deleteCommunityMember(id: string): Observable<void> {
    return this.firebaseService.deleteCommunityMember(id);
  }
} 
