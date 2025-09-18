import mongoose, { Schema, Document, models } from 'mongoose';

export interface IJobApplication extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  cvUrl: string;
  createdAt: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  cvUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const JobApplication = models.JobApplication || mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);
export default JobApplication;
