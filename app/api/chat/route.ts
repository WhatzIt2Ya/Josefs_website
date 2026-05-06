import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const rateLimit = new Map<string, { count: number; start: number }>();

export async function POST(req: Request) {
  //environment variable check
  if (!process.env.OPENROUTER_API_KEY) {
    return new Response("Server misconfiguration", { status: 500 });
  }

  //rate limiting
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const limit = 10;

  const user = rateLimit.get(ip) || { count: 0, start: now };

  if (now - user.start > windowMs) {
    user.count = 0;
    user.start = now;
  }

  user.count++;

  if (user.count > limit) {
    return new Response("Too many requests", { status: 429 });
  }

  rateLimit.set(ip, user);


  const { message } = await req.json();

    if (!message || typeof message !== "string" || message.length > 500) {
    return new Response("Invalid input", { status: 400 });
  }

  //prompt injection protection
  if (/ignore|override|system prompt|developer instructions/i.test(message)) {
    console.warn("⚠️ Prompt injection attempt:", message);
    return Response.json({
      reply: "I'm here to provide information about Josef's experience and skills."
    });
  }

  //suspicious activity logging
  if (/hack|exploit|bypass|attack/i.test(message)) {
    console.warn("⚠️ Suspicious query detected:", message);
  }

  const systemPrompt = process.env.SYSTEM_PROMPT;

if (!systemPrompt) {
  return new Response("Missing SYSTEM_PROMPT env var", { status: 500 });
}

  try {
    const response = await client.chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  //response hardening
    const reply =
      response.choices?.[0]?.message?.content ||
      "Something went wrong. Please try again.";

    return Response.json({ reply });

  } catch (err) {
    console.error("API Error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}