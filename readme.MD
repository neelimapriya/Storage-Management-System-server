# 📦 Storage Management System

A file storage system built with **Node.js**, **Express**, **MongoDB**, **Cloudinary**, and **TypeScript**. Users can upload, manage, and favorite folders, images, and PDFs.

Live Link- https://spark-tech-agency.vercel.app

---

## 🚀 Getting Started

### 📥 Install Dependencies

```bash
npm install
```

```
PORT=3000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

# For development
`npm run start:dev`

# For production
`npm run build`
`npm run start:prod`

## AuthApi
```
| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/sign-up`           | Register user     |
| POST   | `/login`             | Login user        |
| POST   | `/refresh-token`     | Refresh JWT token |
| PATCH  | `/change-password`   | Change password   |
| POST   | `/forgot-password`   | Send reset code   |
| POST   | `/verify-reset-code` | Verify reset code |
| POST   | `/reset-password`    | Reset password    |
```
## json data
```
 signin
{
  "name": "User",
  "email": "user@example.com",
  "password": "yourPassword123",
  "confirmPassword": "yourPassword123"
}

 login

{
  "email": "user@example.com",
  "password": "yourPassword123"
}

change password
{
  "oldPassword": "oldPass123",
  "newPassword": "newSecurePass456",
  "confirmPassword": "newSecurePass456"
}
```

## Folder Routes (/api/folder)

```
| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/`                    | Create folder        |
| GET    | `/`                    | Get all folders      |
| GET    | `/favorites`           | Get favorite folders |
| GET    | `/:id`                 | Get folder by ID     |
| PUT    | `/:id`                 | Update folder        |
| DELETE | `/:id`                 | Delete folder        |
| PATCH  | `/:id/toggle-favorite` | Toggle favorite      |
```

```
{
  "name": "Assignments",
  "user": "64f9f23456b7d4a5d8b00001",
  "favorite": false
}
```

##  File Routes (/api/image)
```
| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| POST   | `/`                    | Upload image/pdf   |
| GET    | `/`                    | Get all files      |
| GET    | `/favorites`           | Get favorite files |
| DELETE | `/:id`                 | Delete file        |
| PATCH  | `/:id/toggle-favorite` | Toggle favorite    |
```
```
{
  "type": "image",
  "url": "https://res.cloudinary.com/your-cloud/image.jpg",
  "user": "64f9f23456b7d4a5d8b00001"
}
```


## Authorization Header

```
Authorization: Bearer <your_token_here>
```