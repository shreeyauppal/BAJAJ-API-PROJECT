require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;
const CHITKARA_EMAIL = process.env.CHITKARA_EMAIL || "your.email@chitkara.edu.in";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

function generateFibonacci(n) {
  if (n < 0) throw new Error("Fibonacci index must be non-negative");
  if (!Number.isInteger(n)) throw new Error("Fibonacci index must be an integer");
  
  const result = [];
  let a = 0, b = 1;
  
  for (let i = 0; i < n; i++) {
    result.push(a);
    [a, b] = [b, a + b];
  }
  
  return result;
}

function filterPrimes(arr) {
  if (!Array.isArray(arr)) throw new Error("Prime input must be an array");
  
  const isPrime = (num) => {
    if (!Number.isInteger(num)) return false;
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i * i <= num; i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };
  
  return arr.filter(num => isPrime(num)).sort((a, b) => a - b);
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function calculateHCF(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("HCF input must be a non-empty array");
  }
  
  if (!arr.every(num => Number.isInteger(num))) {
    throw new Error("All HCF values must be integers");
  }
  
  return arr.reduce((acc, num) => gcd(acc, num));
}

function calculateLCM(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("LCM input must be a non-empty array");
  }
  
  if (!arr.every(num => Number.isInteger(num))) {
    throw new Error("All LCM values must be integers");
  }
  
  const lcm = (a, b) => {
    return Math.abs(a * b) / gcd(a, b);
  };
  
  return Math.round(arr.reduce((acc, num) => lcm(acc, num)));
}

async function getAIResponse(question) {
  if (!GEMINI_API_KEY) {
    throw new Error("AI API key not configured");
  }
  
  if (typeof question !== 'string' || question.trim().length === 0) {
    throw new Error("AI question must be a non-empty string");
  }
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(
      `Answer this question in exactly one word only, no explanation: "${question}"`
    );
    
    const response = result.response;
    const text = response.text().trim().split(/\s+/)[0];
    
    return text || "Unknown";
  } catch (error) {
    throw new Error(`AI API Error: ${error.message}`);
  }
}

app.get('/health', (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: CHITKARA_EMAIL
  });
});

app.post('/bfhl', async (req, res) => {
  try {
    const body = req.body;
    
    if (!body || typeof body !== 'object') {
      return res.status(400).json({
        is_success: false,
        official_email: CHITKARA_EMAIL,
        error: "Invalid request body"
      });
    }
    
    const operationKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
    const providedKeys = operationKeys.filter(key => key in body);
    
    if (providedKeys.length === 0) {
      return res.status(400).json({
        is_success: false,
        official_email: CHITKARA_EMAIL,
        error: `Request must contain exactly one of: ${operationKeys.join(', ')}`
      });
    }
    
    if (providedKeys.length > 1) {
      return res.status(400).json({
        is_success: false,
        official_email: CHITKARA_EMAIL,
        error: "Request must contain exactly one operation key"
      });
    }
    
    const operation = providedKeys[0];
    let data;
    
    switch(operation) {
      case 'fibonacci':
        if (typeof body.fibonacci !== 'number') {
          return res.status(400).json({
            is_success: false,
            official_email: CHITKARA_EMAIL,
            error: "fibonacci must be a number"
          });
        }
        data = generateFibonacci(body.fibonacci);
        break;
        
      case 'prime':
        if (!Array.isArray(body.prime)) {
          return res.status(400).json({
            is_success: false,
            official_email: CHITKARA_EMAIL,
            error: "prime must be an array"
          });
        }
        data = filterPrimes(body.prime);
        break;
        
      case 'lcm':
        if (!Array.isArray(body.lcm)) {
          return res.status(400).json({
            is_success: false,
            official_email: CHITKARA_EMAIL,
            error: "lcm must be an array"
          });
        }
        data = calculateLCM(body.lcm);
        break;
        
      case 'hcf':
        if (!Array.isArray(body.hcf)) {
          return res.status(400).json({
            is_success: false,
            official_email: CHITKARA_EMAIL,
            error: "hcf must be an array"
          });
        }
        data = calculateHCF(body.hcf);
        break;
        
      case 'AI':
        if (typeof body.AI !== 'string') {
          return res.status(400).json({
            is_success: false,
            official_email: CHITKARA_EMAIL,
            error: "AI must be a string (question)"
          });
        }
        data = await getAIResponse(body.AI);
        break;
        
      default:
        return res.status(400).json({
          is_success: false,
          official_email: CHITKARA_EMAIL,
          error: "Unknown operation"
        });
    }
    
    res.status(200).json({
      is_success: true,
      official_email: CHITKARA_EMAIL,
      data: data
    });
    
  } catch (error) {
    console.error("Error processing request:", error);
    
    let statusCode = 500;
    if (error.message.includes("must be")) {
      statusCode = 400;
    }
    
    res.status(statusCode).json({
      is_success: false,
      official_email: CHITKARA_EMAIL,
      error: error.message || "Internal server error"
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    official_email: CHITKARA_EMAIL,
    error: "Endpoint not found"
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    is_success: false,
    official_email: CHITKARA_EMAIL,
    error: "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 BFHL API Server running on http://localhost:${PORT}`);
  console.log(`GET  /health`);
  console.log(`POST /bfhl`);
});

module.exports = app;
