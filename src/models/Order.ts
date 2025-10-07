import mongoose, { Document } from "mongoose";

export interface OrderDocument extends mongoose.Document {
    customer_type: 'registered' | 'guest';
}

const orderSchema = new mongoose.Schema({
    order_number: {
        type: String,
        required: true,
        unique: true,
    },
    customer_type: {
        type: String,
        enum: ['registered', 'guest'],
        required: true,
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers',
        required: function(this: OrderDocument) {
            return this.customer_type === 'registered';
        },
    },
    // Guest customer fields
    guest_name: {
        type: String,
        required: function(this: OrderDocument) {
            return this.customer_type === 'guest';
        },
    },
    guest_email: {
        type: String,
        required: function(this: OrderDocument) {
            return this.customer_type === 'guest';
        },
    },
    guest_phone: {
        type: String,
        required: false,
    },
    products: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
        quantity: { type: Number, required: true, min: 1 },
        unit_price: { type: Number, required: true, min: 0 },
        total_price: { type: Number, required: true, min: 0 }
    }],
    total_price: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    shipping_address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        postal_code: { type: String, required: true },
        country: { type: String, required: true }
    },
    billing_address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        postal_code: { type: String, required: true },
        country: { type: String, required: true }
    },
    payment_method: {
        type: String,
        required: false,
    },
    payment_status: {
        type: String,
        default: 'Unpaid',
    },
},
{
    timestamps: true,
}
);

const Order = mongoose.models.Orders || mongoose.model("Orders", orderSchema);
export default Order;
