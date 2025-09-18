import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IProduct extends Document {
  productTitle: string;
  description?: string;
  productSku: string;
  productBarcode?: string;
  images: string[];
  variants: {
    type: string;
    values: string[];
    option?: string;
    value?: string;
  }[];
  quantity: number;
  inStock: 'yes' | 'no';
  shippingType: 'seller' | 'company';
  globalDelivery: 'worldwide' | 'selected-countries' | 'local';
  selectedCountries?: string[];
  attributes: {
    fragile?: boolean;
    biodegradable?: boolean;
    frozen?: boolean;
    maxTemperature?: number;
    hasExpiryDate?: boolean;
    expiryDate?: Date;
  };
  productIdType?: 'ISBN' | 'UPC' | 'EAN' | 'JAN';
  productId?: string;
  productPrice: number;
  productDiscountedPrice?: number;
  chargeTax: 'yes' | 'no';
  vendor?: string;
  category: string;
  status: 'Published' | 'Scheduled' | 'Inactive';
  tags?: string[];
  weight?: number;
  manufacturer?: string;
  dimensions?: string;
}

const ProductSchema = new Schema<IProduct>({
  // Basic Product Information
  productTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  productSku: {
    type: String,
    required: true,
    unique: true,
  },
  productBarcode: {
    type: String,
    required: false,
  },
  // Images/Media
  images: [{
    type: String, // URLs to uploaded images
  }],
  // Variants - Updated to support flexible variant system
  variants: [{
    type: {
      type: String, // variant type like "Size", "Color", "Material", etc.
    },
    values: [{
      type: String // array of values like ["Small", "Medium", "Large"]
    }],
    // Backwards compatibility with old format
    option: {
      type: String, // old format
    },
    value: {
      type: String, // old format
    }
  }],
  // Inventory
  quantity: {
    type: Number,
    default: 0,
  },
  inStock: {
    type: String,
    enum: ['yes', 'no'],
    default: 'yes',
  },
  // Shipping
  shippingType: {
    type: String,
    enum: ['seller', 'company'],
    default: 'company',
  },
  // Global Delivery
  globalDelivery: {
    type: String,
    enum: ['worldwide', 'selected-countries', 'local'],
    default: 'local',
  },
  selectedCountries: [{
    type: String,
  }],
  // Attributes
  attributes: {
    fragile: {
      type: Boolean,
      default: false,
    },
    biodegradable: {
      type: Boolean,
      default: false,
    },
    frozen: {
      type: Boolean,
      default: false,
    },
    maxTemperature: {
      type: Number, // in Celsius
    },
    hasExpiryDate: {
      type: Boolean,
      default: false,
    },
    expiryDate: {
      type: Date,
    }
  },
  // Advanced
  productIdType: {
    type: String,
    enum: ['ISBN', 'UPC', 'EAN', 'JAN'],
  },
  productId: {
    type: String,
  },
  // Pricing
  productPrice: {
    type: Number,
    required: true,
  },
  productDiscountedPrice: {
    type: Number,
  },
  chargeTax: {
    type: String,
    enum: ['yes', 'no'],
    default: 'yes',
  },
  // Organization
  vendor: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Published', 'Scheduled', 'Inactive'],
    default: 'Published',
  },
  tags: [{
    type: String,
  }],
  // Additional Fields
  weight: {
    type: Number,
  },
  manufacturer: {
    type: String,
  },
  dimensions: {
    type: String,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields
});

const Product = models.Products || model<IProduct>('Products', ProductSchema);

export default Product;
