import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { input } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a professional bio writer.' },
        { role: 'user', content: `Write a short professional bio for: ${input}` }
      ],
      model: 'gpt-4'
    });

    const output = completion.choices[0]?.message?.content || 'No output.';
    res.status(200).json({ bio: output });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate bio.' });
  }
}
