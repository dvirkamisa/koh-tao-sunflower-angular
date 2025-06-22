import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityRegistration extends Document {
  full_name: string;
  phone: string;
  interests: string[];
  preferred_dates?: string;
  additional_notes?: string;
  created_at: Date;
  updated_at: Date;
}

const ActivityRegistrationSchema: Schema = new Schema({
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
  interests: {
    type: [String],
    required: true,
    enum: [
      'diving',
      'parties_shows',
      'yoga_pilates',
      'ice_baths',
      'dry_sauna',
      'motorcycle_trips',
      'shabbat_dinners',
      'other'
    ]
  },
  preferred_dates: {
    type: String,
    trim: true
  },
  additional_notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model<IActivityRegistration>('ActivityRegistration', ActivityRegistrationSchema); 