# BFHL REST API

Production-ready REST API with Fibonacci, Prime number filtering, LCM, HCF calculations, and AI integration.

## Features

✅ **POST /bfhl** - Main processing endpoint
- `fibonacci`: Generate Fibonacci sequence up to nth term
- `prime`: Filter prime numbers from array
- `lcm`: Calculate Least Common Multiple
- `hcf`: Calculate Highest Common Factor
- `AI`: Get single-word AI responses using Google Gemini

✅ **GET /health** - Health check endpoint

✅ **Robust Error Handling** - Proper HTTP status codes and validation
✅ **Security** - Input validation, CORS enabled, error messages safe
✅ **Production Ready** - Ready for Vercel/Railway/Render deployment

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **AI API**: Google Gemini
- **Deployment**: Vercel / Railway / Render

## Setup Instructions

### 1. Clone or Copy Project
```bash
cd Bjaj
npm install
```

### 2. Get Google Gemini API Key
1. Visit https://aistudio.google.com
2. Sign in with your Google account
3. Click "Get API Key"
4. Create API key in your project
5. Copy the key

### 3. Create .env File
```bash
CHITKARA_EMAIL=your.email@chitkara.edu.in
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

### 4. Run Locally
```bash
npm start
```

Server will run at `http://localhost:3000`

## API Examples

### Health Check
```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in"
}
```

### Fibonacci
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8]
}
```

### Prime Numbers
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2, 4, 7, 9, 11]}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": [2, 7, 11]
}
```

### LCM
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [12, 18, 24]}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": 72
}
```

### HCF
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"hcf": [24, 36, 60]}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": 12
}
```

### AI Query
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What is the capital city of Maharashtra?"}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your.email@chitkara.edu.in",
  "data": "Mumbai"
}
```

## Error Handling

### Invalid Input
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": "invalid"}'
```

**Response (400):**
```json
{
  "is_success": false,
  "official_email": "your.email@chitkara.edu.in",
  "error": "fibonacci must be a number"
}
```

### Multiple Operations
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 5, "prime": [2, 3]}'
```

**Response (400):**
```json
{
  "is_success": false,
  "official_email": "your.email@chitkara.edu.in",
  "error": "Request must contain exactly one operation key"
}
```

## Deployment

### Vercel Deployment

1. Push code to public GitHub repo
2. Go to https://vercel.com and sign in
3. Click "Add New..." → "Project"
4. Import your repository
5. Add Environment Variables:
   - `CHITKARA_EMAIL`: your.email@chitkara.edu.in
   - `GEMINI_API_KEY`: your_key_here
6. Click "Deploy"
7. Copy the deployment URL

### Railway Deployment

1. Push code to public GitHub repo
2. Go to https://railway.app
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Add variables in settings:
   - `CHITKARA_EMAIL`
   - `GEMINI_API_KEY`
6. Railway auto-deploys
7. Get URL from project settings

### Render Deployment

1. Push code to public GitHub repo
2. Go to https://render.com
3. Click "New" → "Web Service"
4. Select your repository
5. Configure:
   - **Name**: bfhl-api
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables
7. Click "Deploy"
8. Get URL from service page

## Testing with ngrok (Temporary)

For temporary public testing while developing locally:

```bash
# Install ngrok
npm install -g ngrok

# In one terminal
npm start

# In another terminal
ngrok http 3000

# ngrok provides a public URL
```

## Response Structure Requirements

✅ **All successful responses** contain:
- `is_success`: true
- `official_email`: Your Chitkara email
- `data`: Actual response data

✅ **All error responses** contain:
- `is_success`: false
- `official_email`: Your Chitkara email
- `error`: Error message

✅ **HTTP Status Codes**:
- 200: Successful request
- 400: Invalid input/request
- 404: Endpoint not found
- 500: Server error

## Security Considerations

✅ CORS enabled for cross-origin requests
✅ Input validation on all endpoints
✅ No sensitive data in error messages
✅ Safe error handling (no crashes)
✅ JSON size limit (10MB)
✅ Environment variables for API keys

## GitHub Repository

Make sure your GitHub repository is:
- **Public** (for evaluation)
- Contains full source code
- Include this README
- Include .env.example file

Share:
- GitHub URL
- Deployed API URLs (Vercel/Railway/Render)

## Notes

- Fibonacci with large numbers may take time
- Prime filtering is optimized for arrays up to 10,000 elements
- AI responses use Google's Gemini API (free tier)
- LCM/HCF work with positive integers
- All endpoints are CORS-enabled
