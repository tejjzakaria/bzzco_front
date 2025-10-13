# Team Management Guide

This guide explains how to manage team members displayed on the About page.

## Overview

The team section displays all active team members with their:
- Name
- Role/Position
- Profile photo (or initial if no photo)
- LinkedIn profile link

## Database Model

Team members are stored in the `teams` collection with the following fields:

```typescript
{
  name: string,           // Required
  role: string,           // Required
  status: 'active' | 'inactive',  // Default: 'active'
  email: string,          // Required (unique)
  linkedin?: string,      // Optional
  image?: string,         // Optional (S3 URL)
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Public Endpoints

#### GET `/api/team`
Get all active team members (public access).

**Query Parameters:**
- `status` - Filter by status (optional)

**Example:**
```bash
# Get all active team members
curl https://yourdomain.com/api/team

# Get inactive members (requires API key)
curl https://yourdomain.com/api/team?status=inactive
```

**Response:**
```json
{
  "teamMembers": [
    {
      "_id": "...",
      "name": "Moussa Baazizi",
      "role": "Founder & CEO",
      "status": "active",
      "linkedin": "https://linkedin.com/in/...",
      "image": "https://s3.amazonaws.com/..."
    }
  ],
  "total": 1
}
```

#### GET `/api/team/[id]`
Get single team member details.

**Example:**
```bash
curl https://yourdomain.com/api/team/[member-id]
```

---

### Admin Endpoints (Require API Key)

#### POST `/api/team`
Create a new team member.

**Headers:**
```
Content-Type: application/json
x-api-key: your_api_key_here
```

**Body:**
```json
{
  "name": "John Doe",
  "role": "Senior Developer",
  "email": "john@bzzco.com",
  "linkedin": "https://linkedin.com/in/johndoe",
  "image": "https://s3.amazonaws.com/bucket/image.jpg",
  "status": "active"
}
```

**Example:**
```bash
curl -X POST "https://yourdomain.com/api/team" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key_here" \
  -d '{
    "name": "John Doe",
    "role": "Senior Developer",
    "email": "john@bzzco.com",
    "linkedin": "https://linkedin.com/in/johndoe",
    "status": "active"
  }'
```

#### PATCH `/api/team/[id]`
Update an existing team member.

**Example:**
```bash
curl -X PATCH "https://yourdomain.com/api/team/[member-id]" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key_here" \
  -d '{
    "role": "CTO",
    "status": "active"
  }'
```

#### DELETE `/api/team/[id]`
Delete a team member.

**Example:**
```bash
curl -X DELETE "https://yourdomain.com/api/team/[member-id]" \
  -H "x-api-key: your_api_key_here"
```

---

## How to Add Team Members

### Method 1: Using API (Recommended)

Use the POST endpoint with your API key:

```bash
curl -X POST "https://yourdomain.com/api/team" \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "name": "Team Member Name",
    "role": "Position Title",
    "email": "email@bzzco.com",
    "linkedin": "https://linkedin.com/in/username",
    "image": "https://s3.amazonaws.com/your-bucket/photo.jpg",
    "status": "active"
  }'
```

### Method 2: Direct Database Insert

Connect to MongoDB and insert directly:

```javascript
db.teams.insertOne({
  name: "Team Member Name",
  role: "Position Title",
  status: "active",
  email: "email@bzzco.com",
  linkedin: "https://linkedin.com/in/username",
  image: "https://s3.amazonaws.com/your-bucket/photo.jpg",
  createdAt: new Date(),
  updatedAt: new Date()
});
```

---

## Image Upload

Team member photos should be uploaded to your S3 bucket:

1. **Upload image to S3:**
   - Path: `team-photos/{name}-{timestamp}.jpg`
   - Make the image publicly accessible
   - Recommended size: 400x400px or larger (square)
   - Supported formats: JPG, PNG, WebP

2. **Get the S3 URL:**
   ```
   https://s3.amazonaws.com/bzzcobucket/team-photos/john-doe-1234567890.jpg
   ```

3. **Use this URL in the `image` field** when creating/updating team members

### Example AWS CLI Upload:
```bash
aws s3 cp photo.jpg s3://bzzcobucket/team-photos/john-doe.jpg --acl public-read
```

---

## Managing Team Member Status

### Making a Member Inactive

Instead of deleting, you can mark members as inactive:

```bash
curl -X PATCH "https://yourdomain.com/api/team/[member-id]" \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{"status": "inactive"}'
```

Inactive members won't appear on the public team page but remain in the database.

---

## Security Notes

- **Email addresses are NOT exposed** in public API responses
- Only **active members** are shown on the public team page
- **API key required** for all create/update/delete operations
- **Rate limiting** is applied to all endpoints
- Emails must be **unique** in the database

---

## Features

### Automatic Fallback

If a team member doesn't have a profile photo:
- A colored circle with their **first initial** is displayed
- Uses your brand's orange color scheme

### LinkedIn Integration

- Optional LinkedIn URL field
- Displays a "Connect on LinkedIn" button if provided
- Opens in new tab with proper security attributes

### Responsive Design

- 1 column on mobile
- 2 columns on tablets
- 3 columns on large screens
- 4 columns on extra-large screens

---

## Troubleshooting

### Team members not showing up?

1. Check the member's status is `active`
2. Verify database connection
3. Check browser console for errors
4. Ensure API endpoint is accessible

### Images not loading?

1. Verify S3 URL is correct and accessible
2. Check S3 bucket permissions (must be public-read)
3. Ensure image format is supported (JPG, PNG, WebP)
4. Check CORS settings on S3 bucket

### API key not working?

1. Verify `API_SECRET_KEY` is set in `.env.local`
2. Check you're sending the key in `x-api-key` header
3. Restart your development server after changing `.env.local`

---

## Example: Complete Workflow

### Adding a New Team Member

1. **Take/obtain a professional photo**
   - Square aspect ratio (1:1)
   - Minimum 400x400px
   - Good lighting and quality

2. **Upload to S3**
   ```bash
   aws s3 cp john-doe.jpg s3://bzzcobucket/team-photos/john-doe.jpg --acl public-read
   ```

3. **Add to database via API**
   ```bash
   curl -X POST "https://bzzco.com/api/team" \
     -H "Content-Type: application/json" \
     -H "x-api-key: YOUR_API_KEY" \
     -d '{
       "name": "John Doe",
       "role": "Head of Engineering",
       "email": "john@bzzco.com",
       "linkedin": "https://linkedin.com/in/johndoe",
       "image": "https://s3.amazonaws.com/bzzcobucket/team-photos/john-doe.jpg",
       "status": "active"
     }'
   ```

4. **Verify on website**
   - Visit `/about` page
   - Check team section
   - Verify photo loads correctly
   - Test LinkedIn link

---

## Future Enhancements

Potential improvements to consider:

- Add bio/description field
- Add social media links (Twitter, GitHub, etc.)
- Team filtering by department/role
- Team member detail pages
- Admin dashboard for visual management
- Automatic image optimization/resizing
- Bulk import from CSV

---

## Support

For issues or questions:
- Check API logs for errors
- Review MongoDB connection
- Verify S3 bucket permissions
- Contact: support@bzzco.com
