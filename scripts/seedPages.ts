import mongoose from 'mongoose';
import Page from '../src/models/Page';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bzzco';

const defaultPages = [
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: `
# Privacy Policy

Last updated: ${new Date().toLocaleDateString()}

## Introduction

Welcome to Bzz Co. We respect your privacy and are committed to protecting your personal data.

## Information We Collect

We collect information that you provide directly to us, including:
- Name and contact information
- Payment information
- Order history
- Communication preferences

## How We Use Your Information

We use the information we collect to:
- Process and fulfill your orders
- Communicate with you about your orders
- Send you marketing communications (with your consent)
- Improve our services

## Data Security

We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.

## Your Rights

You have the right to:
- Access your personal data
- Correct inaccurate data
- Request deletion of your data
- Object to processing of your data
- Request data portability

## Contact Us

If you have any questions about this Privacy Policy, please contact us at:
- Email: support@bzzco.com
- Phone: +31 6 84385566
- Address: Mercuriusplein 1, 2340 Hoofddorp
    `,
    metaDescription: 'Learn how Bzz Co collects, uses, and protects your personal information.',
    metaKeywords: ['privacy', 'data protection', 'personal information'],
    status: 'published',
    pageType: 'legal',
    order: 1,
    isInMenu: true,
    template: 'default'
  },
  {
    title: 'Terms of Service',
    slug: 'terms-of-service',
    content: `
# Terms of Service

Last updated: ${new Date().toLocaleDateString()}

## Agreement to Terms

By accessing or using Bzz Co, you agree to be bound by these Terms of Service.

## Use of Service

You agree to use our service only for lawful purposes and in accordance with these Terms.

## Orders and Payment

- All orders are subject to acceptance and availability
- Prices are subject to change without notice
- Payment must be received before order processing

## Shipping and Delivery

- We ship to addresses within our service areas
- Delivery times are estimates and not guaranteed
- Risk of loss passes to you upon delivery

## Returns and Refunds

- Items may be returned within 30 days of delivery
- Items must be in original condition
- Refunds will be processed within 14 days of receiving returned items

## Intellectual Property

All content on this site is the property of Bzz Co and is protected by copyright laws.

## Limitation of Liability

Bzz Co shall not be liable for any indirect, incidental, special, or consequential damages.

## Changes to Terms

We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.

## Contact Information

For questions about these Terms, contact us at:
- Email: support@bzzco.com
- Phone: +31 6 84385566
    `,
    metaDescription: 'Read the Terms of Service for using Bzz Co marketplace.',
    metaKeywords: ['terms', 'conditions', 'legal', 'service'],
    status: 'published',
    pageType: 'legal',
    order: 2,
    isInMenu: true,
    template: 'default'
  },
  {
    title: 'About Us',
    slug: 'about-us',
    content: `
# About Bzz Co

## Our Story

Bzz Co is a modern marketplace connecting buyers with quality products from trusted merchants.

## Our Mission

To provide a seamless shopping experience that brings together the best products and sellers in one convenient platform.

## What We Do

- Curate quality products from verified merchants
- Ensure secure and reliable transactions
- Provide excellent customer service
- Support local and international sellers

## Our Values

**Quality**: We partner only with merchants who meet our quality standards.

**Trust**: We build trust through transparency and excellent service.

**Innovation**: We continuously improve our platform to serve you better.

**Community**: We support our community of buyers and sellers.

## Contact Us

Have questions? Reach out to us:
- Email: support@bzzco.com
- Phone: +31 6 84385566
- Address: Mercuriusplein 1, 2340 Hoofddorp
    `,
    metaDescription: 'Learn about Bzz Co, our mission, and how we connect buyers with quality products.',
    metaKeywords: ['about', 'company', 'mission', 'values'],
    status: 'published',
    pageType: 'general',
    order: 3,
    isInMenu: true,
    template: 'default'
  },
  {
    title: 'Help Center',
    slug: 'help-center',
    content: `
# Help Center

Welcome to the Bzz Co Help Center. Find answers to common questions below.

## Frequently Asked Questions

### How do I place an order?
Browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in.

### What payment methods do you accept?
We accept major credit cards, debit cards, and other payment methods as displayed at checkout.

### How long does shipping take?
Shipping times vary by product and location. Estimated delivery times are shown at checkout.

### Can I track my order?
Yes! Once your order ships, you'll receive a tracking number via email.

### What is your return policy?
We accept returns within 30 days of delivery. Items must be in original condition.

### How do I contact customer support?
You can reach us at support@bzzco.com or call +31 6 84385566.

## Still Need Help?

If you can't find the answer you're looking for, please contact our support team:
- Email: support@bzzco.com
- Phone: +31 6 84385566
- Hours: Monday-Friday, 9AM-6PM CET
    `,
    metaDescription: 'Get help with your Bzz Co orders, shipping, returns, and more.',
    metaKeywords: ['help', 'support', 'faq', 'customer service'],
    status: 'published',
    pageType: 'help',
    order: 4,
    isInMenu: true,
    template: 'default'
  },
  {
    title: 'Shipping Information',
    slug: 'shipping',
    content: `
# Shipping Information

## Shipping Methods

We offer several shipping options to meet your needs:

### Standard Shipping
- Delivery: 5-7 business days
- Cost: Calculated at checkout based on weight and destination

### Express Shipping
- Delivery: 2-3 business days
- Cost: Premium rates apply

### Same-Day Delivery
- Available in select areas
- Order before 12 PM for same-day delivery
- Additional fees apply

## Shipping Locations

We currently ship to:
- Netherlands and surrounding countries
- European Union
- Select international locations

## Tracking Your Order

Once your order ships, you'll receive:
- Shipping confirmation email
- Tracking number
- Estimated delivery date

## Shipping Costs

Shipping costs are calculated based on:
- Package weight and dimensions
- Delivery location
- Shipping method selected

## International Shipping

For international orders:
- Additional customs fees may apply
- Delivery times may vary
- Some products may have shipping restrictions

## Questions?

Contact our shipping team at support@bzzco.com or +31 6 84385566.
    `,
    metaDescription: 'Learn about Bzz Co shipping methods, costs, and delivery times.',
    metaKeywords: ['shipping', 'delivery', 'tracking', 'international'],
    status: 'published',
    pageType: 'help',
    order: 5,
    isInMenu: true,
    template: 'default'
  },
  {
    title: 'Returns & Refunds',
    slug: 'returns',
    content: `
# Returns & Refunds

## Return Policy

We want you to be completely satisfied with your purchase. If you're not happy, we offer easy returns.

### Return Window
- 30 days from delivery date
- Item must be unused and in original packaging
- Original receipt or proof of purchase required

### Non-Returnable Items
- Perishable goods
- Custom or personalized items
- Digital products
- Opened hygiene products

## How to Return an Item

1. Contact our support team at support@bzzco.com
2. Provide your order number and reason for return
3. Receive return authorization and instructions
4. Ship the item back using provided label
5. Receive confirmation once return is processed

## Refund Process

### Timeline
- Returns processed within 5-7 business days of receipt
- Refunds issued to original payment method
- Allow 5-10 business days for refund to appear

### Refund Amount
- Full product cost refunded
- Original shipping costs are non-refundable
- Return shipping costs are customer's responsibility (unless item is defective)

## Exchanges

We currently don't offer direct exchanges. Please return the item for a refund and place a new order.

## Damaged or Defective Items

If you receive a damaged or defective item:
- Contact us within 48 hours of delivery
- Provide photos of the damage
- We'll arrange free return shipping
- Receive full refund or replacement

## Questions?

Contact our returns team:
- Email: support@bzzco.com
- Phone: +31 6 84385566
    `,
    metaDescription: 'Learn about Bzz Co return policy, refund process, and how to return items.',
    metaKeywords: ['returns', 'refunds', 'exchanges', 'policy'],
    status: 'published',
    pageType: 'help',
    order: 6,
    isInMenu: true,
    template: 'default'
  }
];

async function seedPages() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Clearing existing pages...');
    await Page.deleteMany({});

    console.log('Seeding pages...');
    const createdPages = await Page.insertMany(defaultPages);
    console.log(`Successfully seeded ${createdPages.length} pages`);

    console.log('\nSeeded pages:');
    createdPages.forEach(page => {
      console.log(`- ${page.title} (/${page.slug})`);
    });

  } catch (error) {
    console.error('Error seeding pages:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

seedPages();
