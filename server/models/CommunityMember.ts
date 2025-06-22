import mongoose, { Schema, Document } from 'mongoose';

export interface ICommunityMember extends Document {
  full_name: string;
  phone: string;
  email?: string;
  specialty: string;
  specialty_other?: string;
  experience?: string;
  availability?: string;
  created_at: Date;
  updated_at: Date;
}

const CommunityMemberSchema: Schema = new Schema({
  full_name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  specialty: {
    type: String,
    required: true,
    enum: [
      'yoga_pilates_instructor',
      'boxing_fitness_trainer',
      'diving_instructor',
      'workshop_facilitator',
      'marketing_digital',
      'musician_artist',
      'chef_cook',
      'private_tutor',
      'beauty_services',
      'other'
    ]
  },
  specialty_other: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  availability: {
    type: String,
    trim: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model<ICommunityMember>('CommunityMember', CommunityMemberSchema); 