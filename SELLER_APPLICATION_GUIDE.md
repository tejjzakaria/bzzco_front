# Seller Application System - Admin Guide

This guide explains how the seller application system works and how admins can manage applications.

## Overview

The system allows potential sellers to apply to sell on your marketplace. Applications must be reviewed and approved by an admin before sellers can start selling.

## System Components

### 1. **Seller Application Form** (`/become-a-seller`)
- Comprehensive form collecting all necessary seller information
- Validates required fields before submission
- Prevents duplicate applications
- Shows success message after submission

### 2. **Database Model** (`SellerApplication`)
Located at: `src/models/SellerApplication.ts`

**Application Status Flow:**
- `pending` → Initial status when submitted
- `under-review` → Admin is reviewing
- `approved` → Admin approved the application
- `rejected` → Admin rejected the application

### 3. **API Endpoints**

#### Public Endpoints:
```
POST /api/seller-applications
- Submit a new seller application
- Rate limited: 5 requests per minute
- No authentication required
```

#### Admin Endpoints (Require API Key):
```
GET /api/seller-applications
- Get all applications
- Query params: ?status=pending
- Returns: List of all applications

GET /api/seller-applications/[id]
- Get single application details

PATCH /api/seller-applications/[id]
- Update application status (approve/reject)
- Body: { status, rejectionReason, approvalNotes, reviewedBy }

DELETE /api/seller-applications/[id]
- Delete an application
```

## How to Manage Applications

### Setting Up API Access

1. Set your API key in `.env.local`:
```bash
API_SECRET_KEY=your_secure_api_key_here
```

2. Include this key in all admin API requests:
```bash
x-api-key: your_secure_api_key_here
```

### View All Pending Applications

```bash
curl -X GET "https://yourdomain.com/api/seller-applications?status=pending" \
  -H "x-api-key: your_secure_api_key_here"
```

### Approve an Application

```bash
curl -X PATCH "https://yourdomain.com/api/seller-applications/[application-id]" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_secure_api_key_here" \
  -d '{
    "status": "approved",
    "approvalNotes": "Great business profile, approved!",
    "reviewedBy": "admin-user-id"
  }'
```

### Reject an Application

```bash
curl -X PATCH "https://yourdomain.com/api/seller-applications/[application-id]" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_secure_api_key_here" \
  -d '{
    "status": "rejected",
    "rejectionReason": "Incomplete business registration information",
    "reviewedBy": "admin-user-id"
  }'
```

## Application Data Structure

Each application contains:

### Basic Information
- Shop Name
- Owner Name
- Email
- Phone Number

### Business Information
- Business Type (online/physical/both)
- Business Registration Number (KVK)
- Tax ID (BTW)
- Year Established
- Number of Employees
- Business Description
- Product Categories
- Estimated Monthly Revenue

### Address Information
- Street Address
- City
- Postal Code
- Country

### Online Presence (Optional)
- Website URL
- Social Media Links (Facebook, Instagram, LinkedIn, Twitter)

### Bank Information (Optional)
- Bank Name
- Account Holder Name
- IBAN

### Application Metadata
- Status (pending/under-review/approved/rejected)
- Submitted At
- Reviewed At
- Reviewed By
- Rejection Reason (if rejected)
- Approval Notes (if approved)

## Building an Admin Dashboard

To create a proper admin dashboard for managing applications, you can:

1. **Create an admin page** at `/admin/seller-applications`
2. **Fetch applications** using the GET endpoint
3. **Display in a table** with:
   - Shop Name
   - Owner Name
   - Email
   - Status
   - Submitted Date
   - Action buttons (View/Approve/Reject)
4. **Create detail modal** showing full application info
5. **Add approve/reject buttons** that call the PATCH endpoint

### Example React Admin Component Structure

```tsx
// pages/admin/seller-applications.tsx
'use client';
import { useState, useEffect } from 'react';

export default function AdminSellerApplications() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    const res = await fetch(`/api/seller-applications?status=${filter}`, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY
      }
    });
    const data = await res.json();
    setApplications(data.applications);
  };

  const handleApprove = async (id) => {
    await fetch(`/api/seller-applications/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY
      },
      body: JSON.stringify({
        status: 'approved',
        approvalNotes: 'Application approved'
      })
    });
    fetchApplications(); // Refresh list
  };

  const handleReject = async (id, reason) => {
    await fetch(`/api/seller-applications/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY
      },
      body: JSON.stringify({
        status: 'rejected',
        rejectionReason: reason
      })
    });
    fetchApplications(); // Refresh list
  };

  return (
    <div>
      {/* Filter tabs */}
      <div>
        <button onClick={() => setFilter('pending')}>Pending</button>
        <button onClick={() => setFilter('approved')}>Approved</button>
        <button onClick={() => setFilter('rejected')}>Rejected</button>
      </div>

      {/* Applications table */}
      <table>
        <thead>
          <tr>
            <th>Shop Name</th>
            <th>Owner</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td>{app.shopName}</td>
              <td>{app.ownerName}</td>
              <td>{app.email}</td>
              <td>{app.status}</td>
              <td>
                <button onClick={() => handleApprove(app._id)}>Approve</button>
                <button onClick={() => handleReject(app._id, 'Reason here')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Workflow

1. **Seller submits application** via `/become-a-seller`
2. **System validates** required fields
3. **Application saved** to database with status "pending"
4. **Admin reviews** application via admin dashboard
5. **Admin approves or rejects** with notes
6. **System updates** status and timestamps
7. **(Future) Send email notification** to seller about decision
8. **(If approved) Create seller account** and grant access

## Next Steps

### Recommended Enhancements:

1. **Email Notifications**
   - Send confirmation email when application submitted
   - Send approval/rejection email to applicant
   - Notify admins of new applications

2. **Admin Dashboard**
   - Build full admin UI for managing applications
   - Add search and filter capabilities
   - Show statistics (total, pending, approved, rejected)

3. **Seller Onboarding**
   - Upon approval, create seller account
   - Send welcome email with login credentials
   - Provide seller dashboard access

4. **Document Upload**
   - Allow sellers to upload business documents
   - Verify documents during review process

5. **Analytics**
   - Track application conversion rates
   - Monitor approval/rejection reasons
   - Measure time to review

## Security Notes

- All admin endpoints require API key authentication
- Rate limiting prevents abuse
- Origin validation blocks external direct calls
- All applications are validated before saving
- Duplicate email detection prevents spam

## Support

For questions or issues:
- Email: support@bzzco.com
- Check API logs for debugging
- Review rate limit headers for usage stats
