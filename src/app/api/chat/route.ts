import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { role } = await req.json();

    // 1. Initialize with your .env key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    // 2. Configure the model specifically for Gemini 2.5 Flash
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      // CRITICAL: Stop the API from blocking "dark" sci-fi content
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ],
      generationConfig: { 
        temperature: 0.8, 
        maxOutputTokens: 1000 // Increased to prevent truncation
      }
    });

    // 3. The Wisteria System Prompt
    const prompt = `
      ACT AS: WISTERIA ABYSSAL TERMINAL.
      ANALYZE PROFESSION: "${role}" 
      
      YOU MUST PROVIDE THE FOLLOWING SECTIONS IN ALL CAPS:
      
      ASSETS:
      > [Detailed survival trait 1]
      > [Detailed survival trait 2]

      VULNERABILITIES:
      > [Detailed fatal flaw 1]
      > [Detailed fatal flaw 2]
      
      STYLE: CLINICAL, DARK SCI-FI. NO INTRO OR OUTRO.
    `;

    // 4. Generate and await the FULL response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) throw new Error("EMPTY_RESPONSE_FROM_AI");

    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("Wisteria API Error:", error);
    
    // Fallback if the API is down or throttled
    return NextResponse.json({ 
      text: "ASSETS:\n> MANUAL OVERRIDE ACTIVE\n> CORE INSTINCTS ENGAGED\n\nVULNERABILITIES:\n> LOSS OF AI GUIDANCE\n> UNKNOWN BIOMETRIC DATA" 
    });
  }
}