import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY not configured");
    return res.status(500).json({ error: "Server configuration error." });
  }

  const name = (req.body.name || "").trim();
  const role = (req.body.role || "").trim();

  if (!name || !role) {
    return res.status(400).json({ error: "Name and role are required." });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `Write a short professional bio for ${name}, who works as a ${role}. Make it polished, concise, and unique.`,
        },
      ],
    });

    const bio = response.choices[0].message.content;
    res.status(200).json({ bio });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to generate bio" });
  }
}
