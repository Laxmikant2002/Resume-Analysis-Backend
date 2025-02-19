# Resume Analysis Backend

This is a mini backend project for a fictional resume analysis app. It uses Node.js with Express.js for the server, MongoDB for the database, and Google Gemini for LLM APIs. The project includes authentication, resume data enrichment, and resume search functionalities.

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd 
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a .env file in the src directory with the following :content**
   ```properties
   JWT_SECRET=
   MONGODB_URI=
   GEMINI_API_KEY=
   ENCRYPTION_KEY=
   ENCRYPTION_IV=
   ```

4. **Start the server:**
   ```sh
   node src/app.js
   ```

5. **The server will run on `http://localhost:3000`.**

## API Endpoints

### 1. Authentication API

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "username": "naval.ravikant",
  "password": "05111974"
}
```

**Response:**
- **200 OK:**
  ```json
  {
    "JWT": "<token>"
  }
  ```
- **401 Unauthorized:**
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

### 2. Resume Data Enrichment API

**Endpoint:** `POST /api/resume/enrich`

**Headers:**
- **Authorization:** `Bearer <token>`

**Request Body:**
```json
{
  "raw_text": "Scarlett Emerson has email-scarlett.emerson@hollywoodstudios.com. She went to UCLA...Bachelor of Fine Arts, Film Production in Acting specialization & passed out in 2015.Worked at Paramount Pictures...Assistant Director since June 2018 – still there. Shot movies, managed crews, post-production edits, the whole deal.Skills? Umm...Cinematography, editing (Final Cut Pro), screenwriting, directing stuff, VFX tricks, storyboards, all that jazz.Oh btw...Scarlett's all about crafting wild stories on screen, pulling audiences in with killer visuals and sharp scripts. Directed some big hits, knows her way around a set, and yeah...lives for film."
}
```

**Response:**
- **200 OK:**
  ```json
  {
    "name": "<encrypted_name>",
    "email": "<encrypted_email>",
    "education": {
      "degree": "<degree>",
      "branch": "<branch>",
      "institution": "<institution>",
      "year": "<year>"
    },
    "experience": {
      "job_title": "<job_title>",
      "company": "<company>"
    },
    "skills": ["<skill_1>", "<skill_2>", ...],
    "summary": "<summary>"
  }
  ```
- **401 Unauthorized:**
  ```json
  {
    "error": "Invalid token"
  }
  ```
- **404 Not Found:**
  ```json
  {
    "error": "No data detected"
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "error": "Data enrichment failed"
  }
  ```

### 3. Resume Search API

**Endpoint:** `POST /api/resume/search`

**Headers:**
- **Authorization:** `Bearer <token>`

**Request Body:**
```json
{
  "name": "<encrypted_name>"
}
```

**Response:**
- **200 OK:**
  ```json
  [
    {
      "name": "<encrypted_name>",
      "email": "<encrypted_email>",
      "education": {
        "degree": "<degree>",
        "branch": "<branch>",
        "institution": "<institution>",
        "year": "<year>"
      },
      "experience": {
        "job_title": "<job_title>",
        "company": "<company>"
      },
      "skills": ["<skill_1>", "<skill_2>", ...],
      "summary": "<summary>"
    },
    ...
  ]
  ```
- **401 Unauthorized:**
  ```json
  {
    "error": "Invalid token"
  }
  ```
- **404 Not Found:**
  ```json
  {
    "error": "No matches found"
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "error": "Search failed"
  }
  ```

## Deployment

1. **Deploy the application to a cloud platform like Vercel, Render, or Railway.**
2. **Ensure you set the environment variables in the deployment environment to keep your secrets safe.**
