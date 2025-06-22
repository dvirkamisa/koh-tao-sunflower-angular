export interface BaseFormSubmission {
  id?: string;
  formType: 'join-us' | 'register-activity';
  formName: string;
  userIdentity: string; // name or email
  timestamp: string;
  data: { [key: string]: any };
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
}

export interface JoinUsFormData {
  full_name: string;
  phone: string;
  email?: string;
  specialty: string;
  experience?: string;
  availability?: string;
  // This field is used when 'other' is selected for specialty
  specialty_other?: string;
}

export interface RegisterActivityFormData {
  full_name: string;
  phone: string;
  email?: string;
  selectedActivities: string[];
  preferred_dates?: string;
  additional_notes?: string;
}

export interface JoinUsSubmission extends BaseFormSubmission {
  formType: 'join-us';
  data: JoinUsFormData;
}

export interface RegisterActivitySubmission extends BaseFormSubmission {
  formType: 'register-activity';
  data: RegisterActivityFormData;
}

export type FormSubmission = JoinUsSubmission | RegisterActivitySubmission;

// Activity and Community Member models for backward compatibility
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