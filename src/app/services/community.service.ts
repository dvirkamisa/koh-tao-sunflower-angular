import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

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
export class CommunityService {
  constructor(private apiService: ApiService) { }

  // Get all community members
  getMembers(): Observable<CommunityMember[]> {
    return this.apiService.get<CommunityMember[]>('/community/members');
  }

  // Get a specific member by ID
  getMember(id: string): Observable<CommunityMember> {
    return this.apiService.get<CommunityMember>(`/community/members/${id}`);
  }

  // Join the community
  joinCommunity(member: CommunityMember): Observable<CommunityMember> {
    return this.apiService.post<CommunityMember>('/community/join', member);
  }

  // Update member information
  updateMember(id: string, member: CommunityMember): Observable<CommunityMember> {
    return this.apiService.put<CommunityMember>(`/community/members/${id}`, member);
  }

  // Deactivate member
  deactivateMember(id: string): Observable<void> {
    return this.apiService.patch<void>(`/community/members/${id}/deactivate`, {});
  }

  // Reactivate member
  reactivateMember(id: string): Observable<void> {
    return this.apiService.patch<void>(`/community/members/${id}/reactivate`, {});
  }
} 