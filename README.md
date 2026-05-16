# Tastefully — AI Fitment Advisor

Tastefully is a full-stack AI-powered web application that helps car enthusiasts design wheel, tire, and suspension setups. Users input their car and goals (daily driving, aggressive stance, track use, etc.), and the system generates recommendations with safety warnings, tradeoffs, and explanations.

The system combines:
- OpenAI GPT API for reasoning and explanation
- A curated fitment dataset for grounding recommendations
- A scoring-based retrieval system (RAG-style)
- A custom evaluation system with test cases

---

# 🚀 Features

- OpenAI powered wheel/tire/suspension recommendations
- Safety warnings (tire stretch, rubbing, debeading risk)
- Tradeoff explanations (comfort vs stance vs performance)
- Retrieval-augmented generation using curated dataset
- Evaluation system with ≥10 test cases
- Structured UI with loading + error handling

---

# 🧠 Tech Stack

Frontend:
- React (Vite)

Backend:
- Node.js (REQUIRED Node.js 18 or higher)
- Express

AI:
- OpenAI API (GPT-4.1-mini or similar)

Data:
- Local JSON fitment dataset

Eval:
- Custom Node.js evaluation script

---

# 📁 Project Structure
tastefully/
├── client/ # React frontend
├── server/ # Express backend
│ ├── server.js
│ ├── .env.example
├── data/
│ └── fitments.json
├── eval/
│ ├── run_eval.js
│ ├── test_cases.json
├── README.md
├── REPORT.md


# ⚙️ Setup Instructions

---

## 1. Clone Repository

```bash
# Clone the project repository
git clone <YOUR_REPO_URL>

# Enter project folder
cd tastefully

# Go into backend folder
cd server

# Install backend dependencies
npm install

# OpenAI API Key (required for AI functionality)
OPENAI_API_KEY=your_openai_api_key_here

# Start Express backend server on port 3001
node server.js

#backend url
http://localhost:3001

# Go into frontend folder
cd client

# Install frontend dependencies
npm install

# Start Vite development server
npm run dev

#frontend url
http://localhost:5173

# Go into evaluation folder
cd eval

# Install evaluation dependencies
npm install

# Run test suite
node run_eval.js

Running evaluation...

Test 1: PASS
Test 2: FAIL
Test 3: PASS
Test 4: PASS
Test 5: PASS
Test 6: PASS
Test 7: FAIL
Test 8: PASS
Test 9: PASS
Test 10: PASS

=================
FINAL SCORE: X/10
=================