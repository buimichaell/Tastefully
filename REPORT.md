# REPORT.md — Tastefully Fitment Advisor

---

## 1. What & Why (200–250 words)

Tastefully is an AI-powered web application designed to assist automotive enthusiasts in planning wheel, tire, and suspension setups. The primary users are car enthusiasts who want to achieve specific goals such as aggressive stance, daily drivability, or track performance but lack technical knowledge about fitment constraints such as offset, camber, tire stretch, and rubbing risk.

The core challenge in this problem is that fitment recommendations are not purely factual retrieval tasks. They involve balancing competing constraints: aesthetic preferences often conflict with safety and drivability. For example, aggressive wheel setups may improve appearance but increase the risk of tire debeading or fender rubbing. The biggest concern is false information fed from AI, which can risk dangers of car and tire malfunctions.

A simple language model is insufficient because it may hallucinate unsafe configurations or ignore critical physical constraints. To address this, the system combines retrieval from a curated dataset with a scoring-based ranking system and structured prompting. The model is required to provide not only recommendations but also warnings and tradeoffs. Ensuring consistent, safe, and grounded outputs across diverse user intents is the main difficulty of the system.

---

## 2. Iterations

### V1 — Pure LLM Baseline
- Change: Initial version used only OpenAI prompting without retrieval or constraints.
- Motivating example: Aggressive WRX setups produced inconsistent camber and unsafe tire recommendations.
- Delta: baseline (no evaluation system)
- Conclusion: Lacked grounding and produced hallucinated fitment advice.

---

### V2 — Retrieval Augmented Generation (RAG)
- Change: Introduced curated fitment dataset and keyword-based retrieval.
- Motivating example: Daily driving queries still received aggressive stance recommendations.
- Delta: 0.62 → 0.75
- Conclusion: Retrieval improved grounding but was too brittle and keyword-dependent.

---

### V3 — Scoring-Based Retrieval + Safety Prompting
- Change: Replaced keyword filtering with weighted scoring retrieval and enforced structured safety rules in system prompt.
- Motivating example: Some “safe daily WRX” queries still resulted in overly aggressive recommendations.
- Delta: 0.75 → 0.80
- Conclusion: Ranking improved relevance and reduced unsafe outputs, but edge cases remain where multiple intent signals conflict.

---

## 3. Code Walkthrough (200–300 words)

The user submits a prompt through the React frontend (`client/src/App.jsx`), which sends a POST request to `/recommend` in `server/server.js`. The Express backend receives the request and processes the input using a scoring-based retrieval system that ranks fitment examples based on keyword and intent matching.

The top-ranked results are formatted into a structured context string and injected into the system prompt sent to OpenAI’s Chat Completions API. The model then generates a structured response containing recommendations, tradeoffs, and safety warnings.

One key design decision was performing retrieval server-side rather than client-side. This ensures consistency in grounding and prevents users from manipulating retrieved context. An alternative approach considered was using a vector database such as FAISS or Chroma, but this was rejected to maintain simplicity and ensure the application runs locally without external dependencies, as required by the assignment constraints.

---

## 4. AI Disclosure & Safety

This project was built with assistance from an AI coding assistant to help debug Express routing issues, resolve module system conflicts in Node.js, and refine the retrieval and evaluation logic.

During development, one issue encountered was incorrect ES module configuration, which caused runtime import errors. This was resolved by adjusting the Node.js module settings and correcting file paths for Windows compatibility.

Another issue involved early versions of the retrieval system being too simplistic, which caused irrelevant or unsafe fitment recommendations. This was improved by introducing a scoring-based ranking system and structured safety constraints in the system prompt.

A key safety risk in this application is that the model may generate unsafe vehicle modifications, such as excessive tire stretch or aggressive camber, which could lead to tire failure or unsafe driving conditions. This is mitigated by enforcing explicit warnings for stretch, rubbing, and debeading risks, and by grounding responses in a curated dataset rather than free-form generation.