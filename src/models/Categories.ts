import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "inactive"],
        default: "active"
    },
    icon: {
        type: String, // S3 URL to SVG icon
        required: false
    }
}, {
    timestamps: true
});

export default mongoose.models.Category || mongoose.model("Category", categorySchema);
