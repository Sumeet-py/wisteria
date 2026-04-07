# 🌊 WISTERIA: Abyssal Terminal
> **Cinematic AI Diagnostic Terminal built with Next.js 14 and Framer Motion. Features real-time LLM-streaming and physics-based UI.**
> Demo video: https://bit.ly/4meCWw9

## 🚀 Overview
Wisteria is a high-concept interactive terminal that simulates a 10,000-meter "Hadal Zone" descent. It uses generative AI to analyze user professions, calculating "Survival Probability" while visualizing tactical assets and vulnerabilities through a stylized submarine interface.

## 🛠️ Technical Stack
* **Framework:** React (Next.js 14)
* **Styling:** Tailwind CSS (Hadal Zone Aesthetic)
* **Animations:** Framer Motion (Spring Physics, AnimatePresence, Motion Values)
* **Icons:** React-Icons (FaUserTie, FaCode, etc.)
* **Intelligence:** Integrated POST-route API for real-time survival diagnostics.

## ✨ Key Engineering Features
* **The Hiring Ocean (Background Particle System):** A memoized `ProfessionFish` component that manages 35+ animated career-entities with randomized parallax and opacity cycles.
* **Bubble Physics Engine:** A custom-built loading system that simulates buoyancy. It utilizes a `direction` prop to toggle between "Descending" and "Surfacing" states during asynchronous API cycles.
* **Reactive Submarine Cursor:** An SVG-based custom cursor tracking with `useSpring` for a heavy, fluid "submerged" feel.
* **Typewriter Intelligence Engine:** A custom text-renderer that parses AI-generated strings, applying conditional formatting for "Vulnerabilities" (Red) and "Assets" (Cyan) in real-time.

## 📦 Installation & Usage
1. `npm install`
2. `npm run dev`
3. Enter your profession into the **ID PROFESSION...** terminal to begin the descent.
