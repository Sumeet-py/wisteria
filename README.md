# WISTERIA: Abyssal Terminal 🌊
> **An AI-powered, cinematic profession simulator set in the Hadal Zone.**

## 🚀 Overview
Wisteria is a high-concept web interface that uses generative AI to simulate survival probability in a high-pressure "Abyssal" environment. It transforms a simple prompt into an immersive 10,000-meter descent.

## 🛠️ The Tech Stack
* **Frontend:** React (Next.js) & Tailwind CSS.
* **Animations:** Framer Motion (Spring physics & AnimatePresence).
* **Intelligence:** Integrated API (LLM-backed) to generate tactical survival reports.
* **State:** Managed loading/surfacing cycles with asynchronous fetch calls.

## ✨ Technical Highlights
* **AI Integration:** Implemented a `/api/chat` POST route to process user professions and return structured "Tactical Assets" and "Vulnerabilities."
* **The "Hiring Ocean":** A memoized background system of floating career-entities using custom spring physics.
* **Typewriter Engine:** A custom-built text renderer that handles conditional styling for AI-generated system logs.
