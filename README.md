# Business & Owner Management API

## Features

- **Business Management**

  - Create a business
  - Read (Get) business information
  - Update business information
  - Delete a business

- **Owner Management**

  - Create an owner
  - Read (Get) owner information
  - Update owner details
  - Delete an owner

- **OTP Generation and Verification**
  - Generate OTP for business email verification
  - Verify OTP to authenticate the business

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Validator for input validation

## API Endpoints

### Business Endpoints

#### 1. Create a Business

- **URL:** `/api/business`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "businessName": "Business Name",
    "country": "Country",
    "state": "State",
    "city": "City",
    "address": "Address",
    "openingTime": "09:00",
    "closingTime": "18:00",
    "email": "email@example.com",
    "mobileNumber": "1234567890",
    "imageUrl": "http://example.com/image.jpg"
  }
  ```

#### 2. Read all Businesses

- **URL:** `/api/business`
- **Method:** `GET`

### 3. Read one Business

- **URL:** `/api/business/:id`
- **Method:** `GET`

### 4. Update Business

- **URL:** `/api/business/:id`
- **Method:** `PATCH`
- **Request Body:**
  ```json
  {
    "country": "Spain",
    "city": "Madrid"
  }
  ```

### 5. Delete Business

- **URL:** `/api/business/:id`
- **Method:** `DELETE`

### 6. Upload Business Restaurant Image

- **URL:** `/api/business/upload-restuarant-image/:id`
- **Method:** `POST`
- **Form Data:**
  ```json
  {
    "image": "upload from local machine"
  }
  ```

### 7. Send OTP for Business Email

- **URL:** `/api/business/send-otp`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": ""
  }
  ```

### 8. Verify OTP of Business Email

- **URL:** `/api/business/verify-otp`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "",
    "otp": ""
  }
  ```

### Owner Endpoints

#### 1. Create a Owner

- **URL:** `/api/owner`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "fullName": "John Doe",
    "profilePic": "http://example.com/profile.jpg",
    "state": "State",
    "city": "City",
    "country": "Country",
    "address": "Owner Address",
    "email": "same_as_business_email",
    "mobileNumber": "same_as_business_mobile_number",
    "businessId": "_id from created business"
  }
  ```

#### 2. Read all Owners

- **URL:** `/api/owner`
- **Method:** `GET`

### 3. Read one Owner

- **URL:** `/api/owner/:id`
- **Method:** `GET`

### 4. Update Owner

- **URL:** `/api/owner/:id`
- **Method:** `PATCH`
- **Request Body:**
  ```json
  {
    "country": "Spain",
    "city": "Madrid"
  }
  ```

### 5. Delete Owner

- **URL:** `/api/owner/:id`
- **Method:** `DELETE`

### 6. Upload Owner Profile Pic

- **URL:** `/api/owner/upload-profile-pic/:id`
- **Method:** `POST`
- **Form Data:**
  ```json
  {
    "image": "upload from local machine"
  }
  ```

### 7. Send OTP for Owner Email

- **URL:** `/api/owner/send-otp`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": ""
  }
  ```

### 8. Verify OTP of Owner Email

- **URL:** `/api/owner/verify-otp`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "",
    "otp": ""
  }
  ```

## Setup Instructions

### Install Dependencies

- `npm install`

### Run application

- `npm start`

- `The application will be running on http://localhost:3000`
