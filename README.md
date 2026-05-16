# Tastefully — Your Fitment Advisor for Car Enthusiasts

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
```bash
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
```

# ⚙️ Setup Instructions

---

This will be all done on the terminal.

Find an accessible location in your environment. For example, I have mine at:

PS C:\Users\Michael Bui\Desktop\

1. Clone the project repository
- git clone https://github.com/buimichaell/Tastefully.git

It should then look like this for example:

PS C:\Users\Michael Bui\Desktop\Tastefully-main

# Activating the Backend

2. Enter project folder
- cd Tastefully-main

3. Go into backend folder
- cd server

4. Install backend dependencies
- npm install

5. (IMPORTANT) While in the server folder, create a file named .env, as this will be how OpenAI API Key (required for AI functionality) will be used.

Go to this website: https://platform.openai.com/

Create an API key and copy it.

In the .env file, type this in: OPENAI_API_KEY=your_openai_api_key_here

Replace your_openai_api_key_here with your given API key.

6. Start Express backend server on port 3001
- node server.js

This is the backend url, don't worry about this as the frontend is how the project will work.
http://localhost:3001

# Activating the Frontend

Open a new window in the terminal, don't close the previous terminal, leave it open and running.

Go to project folder, again, the example:

PS C:\Users\Michael Bui\Desktop\Tastefully-main

and go into the project folder:

cd Tastefully-main

7. Go into frontend folder
- cd client

8. Install frontend dependencies
- npm install

10. Start Vite development server
- npm run dev

This is the frontend url, YOU WILL COPY THIS AND PASTE THIS INTO YOUR BROWSER TO USE THE PROJECT.
http://localhost:5173

# Evaluation Testing

Open yet, another terminal, so three will be running.

Go to project folder, again, the example:

PS C:\Users\Michael Bui\Desktop\Tastefully-main

and go into the project folder:

cd Tastefully-main

11. Go into evaluation folder
- cd eval

12. Install evaluation dependencies
- npm install

13. Run test suite
- node run_eval.js

```bash

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
