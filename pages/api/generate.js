export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Simulate AI bio generation
    const sampleBio = "Passionate about AI and tech innovation. Experienced developer and lifelong learner.";

    // Respond with generated bio
    res.status(200).json({ bio: sampleBio });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
