import mongoose from 'mongoose';

const merchantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    logo: { type: String, default: '' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
}, { timestamps: true });

export default mongoose.models.Merchant || mongoose.model('Merchant', merchantSchema);
