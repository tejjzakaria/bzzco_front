import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ISeller extends Document {
  full_name: string;
  email: string;
  phone_number: string;
  company?: string;
  country: string;
  plan: string;
}

const sellerSchema = new Schema<ISeller>({
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  company: { type: String },
  country: { type: String, required: true },
  plan: { type: String, required: true },
}, { timestamps: true });

const Seller = models.Sellers || model<ISeller>('Sellers', sellerSchema);
export default Seller;
