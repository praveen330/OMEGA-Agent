import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const MASTER_SYSTEM_PROMPT = `
You are part of ΩMEGA Agent — an AI marketing automation system.

Your job is NOT to be generic.
Your job is to generate high-converting, platform-specific, human-sounding marketing content.

STRICT RULES:
- Never sound like AI
- Use real buyer language
- Use pain-driven hooks
- Avoid generic phrases like “in today’s world”
- Write like a real founder/operator
- Be concise, sharp, outcome-focused

OUTPUT RULES:
- Always follow requested JSON format exactly
- No explanations outside JSON
- No markdown
- No extra text

CONTEXT:
User is a solopreneur selling a digital product.
Goal = generate traffic, clicks, and conversions.

You must optimize for:
1. Attention (scroll stopping)
2. Relatability (pain + reality)
3. Action (click or reply)
`;

export async function runStrategist(product: { name: string; description: string; price: string; goal: string }) {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: `
      ${MASTER_SYSTEM_PROMPT}
      
      You are the Strategist Agent.

      INPUT:
      Product Name: ${product.name}
      Description: ${product.description}
      Price: ${product.price}
      Goal: ${product.goal}

      TASK:
      Generate a complete marketing strategy using AIDA framework.

      OUTPUT JSON:
      {
        "positioning": "...",
        "target_audience": "...",
        "pain_points": ["...", "..."],
        "primary_hook": "...",
        "content_plan": {
          "awareness": ["Reddit post idea", "Twitter thread idea"],
          "interest": ["LinkedIn post idea"],
          "desire": ["Email idea"],
          "action": ["Direct CTA idea"]
        }
      }
    `,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function runResearch(productName: string, targetAudience: string) {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: `
      ${MASTER_SYSTEM_PROMPT}

      You are the Research Agent.

      INPUT:
      Product: ${productName}
      Audience: ${targetAudience}

      TASK:
      Generate realistic buyer language based on how users speak online.

      OUTPUT JSON:
      {
        "keywords": ["...", "..."],
        "reddit_phrases": [
          "I'm struggling with...",
          "Anyone knows how to..."
        ],
        "pain_statements": [
          "I waste hours on...",
          "I tried tools but..."
        ],
        "desired_outcomes": [
          "save time",
          "automate work"
        ]
      }
    `,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function runContentAgent(type: 'reddit' | 'linkedin' | 'twitter', data: any) {
  let prompt = "";
  
  if (type === 'reddit') {
    prompt = `
      You are the Content Agent.
      TASK: Generate 3 Reddit posts using PAS framework.
      INPUT:
      Product: ${data.productName}
      Pain Points: ${data.painPoints.join(', ')}
      RULES:
      - No direct selling
      - No links in body
      - Must feel human
      OUTPUT JSON:
      {
        "reddit_posts": [
          { "title": "...", "body": "...", "subreddit": "r/startups", "cta_comment": "..." }
        ]
      }
    `;
  } else if (type === 'linkedin') {
    prompt = `
      Generate 2 LinkedIn posts using BAB framework.
      RULES:
      - No links in body
      - Short paragraphs
      - Strong hook in first line
      OUTPUT:
      {
        "linkedin_posts": [
          { "hook": "...", "content": "...", "cta": "Comment 'AI' to get it" }
        ]
      }
    `;
  } else {
    prompt = `
      Generate 1 Twitter thread (7 tweets).
      RULES:
      - Each tweet < 280 chars
      - First tweet = strong hook
      OUTPUT:
      {
        "twitter_thread": [ "Tweet 1", "Tweet 2", "Tweet 3" ]
      }
    `;
  }

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: MASTER_SYSTEM_PROMPT + "\n" + prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text || "{}");
}

export async function validateContent(contentJson: any) {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: `
      ${MASTER_SYSTEM_PROMPT}
      You are the Content Validator.
      TASK: Fix platform issues.
      RULES:
      - LinkedIn → remove links → move to CTA
      - Reddit → no links in body
      - Twitter → max 280 chars
      INPUT: ${JSON.stringify(contentJson)}
      OUTPUT: Return corrected JSON only.
    `,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text || "{}");
}
