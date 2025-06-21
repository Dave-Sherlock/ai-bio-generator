export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const sampleBio = "Passionate about AI and tech innovation. Experienced developer and lifelong learner.";
    res.status(200).json({ bio: sampleBio });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
