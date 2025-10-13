import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  role: string;
  status: 'active' | 'inactive';
  email: string;
  linkedin?: string;
  image?: string; // S3 image URL
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  linkedin: {
    type: String,
    required: false,
    trim: true
  },
  image: {
    type: String,
    required: false,
    trim: true
  } // S3 image URL
}, {
  timestamps: true,
  collection: 'teams'
});

// Indexes for faster queries
teamSchema.index({ status: 1 });
teamSchema.index({ email: 1 }, { unique: true });

const Team = models.Team || model<ITeam>('Team', teamSchema);
export default Team;
